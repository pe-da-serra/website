import { useMutation, useQuery } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import { Ref, computed, ref } from "vue";
import { BookingDetails, BookingPage, BookingStatus, Payment, PaymentMethod, Person, Room, RoomAvailability, RoomTypeBooking } from "./booking.types";
import { http } from "./http";
import { VForm } from "vuetify/components";
import { useDateFormat, useStorageAsync } from "@vueuse/core";
import { useRouter } from "vue-router";
import { routeNames } from "@/router";
import { FunnelItem, guestsVariant, toStay, trackAddRoom, trackBeginCheckout, trackGuestInfo, trackPaymentInfo, trackRemoveRoom, trackSearch } from "./funnel";

const hotelId = import.meta.env.VITE_HOTEL_ID;

const checkin = useStorageAsync<Date>('checkin', null);
const checkout = useStorageAsync<Date>('checkout', null);
const page = ref(BookingPage.Search);
const mainGuest = useStorageAsync<Person>('main-guest', { fullName: '', email: '', phone: '', document: '' });
const payer = useStorageAsync<Person>('payer', { fullName: '', email: '', phone: '', document: '' });
const selectedRooms = useStorageAsync<RoomTypeBooking[]>('selected-rooms', []);
const ratePlanId = useStorageAsync<string>('rate-plan-id', '');
const paymentMethod = useStorageAsync<PaymentMethod>('payment-method', 'Pix');
// const paymentId = useStorageAsync<string>('payment-id', '');

const guestForm = ref<VForm>();
const paymentForm = ref<VForm>();

export const reset = () => {
  checkin.value = null;
  checkout.value = null;
  page.value = BookingPage.Search;
  mainGuest.value = { fullName: '', email: '', phone: '', document: '' };
  payer.value = { fullName: '', email: '', phone: '', document: '' };
  selectedRooms.value = [];
  paymentMethod.value = 'Pix';
}

export function useBooking() {
  const { rooms } = useRooms();

  const summaryList = computed(() => {
    if (!rooms.value) return [];

    return selectedRooms.value.map(room => ({
      roomId: room.roomId,
      name: rooms.value?.find(r => r.id === room.roomId)?.name ?? '',
      quantity: room.totalRooms,
      guestsPerRoom: room.guestsPerRoom,
      amount: room.pricePerRoom * room.totalRooms,
    }))
  });

  const totalAmount = computed(() =>
    summaryList.value.reduce((acc, listItem) => acc + listItem.amount, 0)
  );

  const roomName = (roomId: string) => rooms.value?.find(r => r.id === roomId)?.name;

  const funnelItem = (room: RoomTypeBooking): FunnelItem => ({
    item_id: room.roomId,
    item_name: roomName(room.roomId),
    item_variant: guestsVariant(room.guestsPerRoom),
    price: room.pricePerRoom,
    quantity: room.totalRooms,
  });
  const funnelItems = () => selectedRooms.value.map(funnelItem);
  const funnelStay = () => toStay(checkin.value, checkout.value);

  const totalGuests = computed(() =>
    summaryList.value.reduce((acc, listItem) => acc + (listItem.guestsPerRoom * listItem.quantity), 0)
  );

  function selectRoom(room: RoomTypeBooking, checkinDate: Date, checkoutDate: Date) {
    trackAddRoom(funnelItem(room), toStay(checkinDate, checkoutDate));
    checkin.value = checkinDate;
    checkout.value = checkoutDate;
    ratePlanId.value = room.ratePlanId;

    const index = selectedRooms.value.findIndex(r => r.roomId === room.roomId && r.guestsPerRoom === room.guestsPerRoom);
    if (index >= 0) {
      selectedRooms.value[index].totalRooms += room.totalRooms;
      return;
    }

    selectedRooms.value.push(room);
  }

  function removeRoom(roomId: string, guestsPerRoom: number) {
    // remove room from selectedRooms
    const index = selectedRooms.value.findIndex(r => r.roomId === roomId && r.guestsPerRoom === guestsPerRoom);
    if (index >= 0) {
      trackRemoveRoom(funnelItem(selectedRooms.value[index]), funnelStay());
      selectedRooms.value.splice(index, 1);
    }

    if (selectedRooms.value.length === 0) {
      checkin.value = undefined;
      checkout.value = undefined;
    }
  }

  const preBookAction = usePreBook();
  async function nextStep() {
    if (page.value === BookingPage.Search) {
      trackBeginCheckout(funnelItems(), funnelStay());
      page.value = BookingPage.GuestForm;
    } else if (page.value === BookingPage.GuestForm) {
      const result = await guestForm.value?.validate();
      if (result?.valid) {
        trackGuestInfo(funnelItems(), funnelStay());
        payer.value = { ...mainGuest.value };
        page.value = BookingPage.PaymentForm;
      }
    } else if (page.value === BookingPage.PaymentForm) {
      const result = await paymentForm.value?.validate();
      if (result?.valid) {
        trackPaymentInfo(funnelItems(), paymentMethod.value, funnelStay());
        await preBookAction.mutateAsync();
        // page.value = BookingPage.PixForm;
      }
    }
  }

  function previousStep() {
    if (page.value === BookingPage.Search) {
      return;
    } else if (page.value === BookingPage.GuestForm) {
      page.value = BookingPage.Search;
    } else if (page.value === BookingPage.PaymentForm) {
      page.value = BookingPage.GuestForm;
    // } else if (page.value === BookingPage.PixForm) {
    //   return;
    }
  }

  const isNextStepLoading = computed<boolean>(() => {
    if (page.value === BookingPage.PaymentForm) {
      return preBookAction.isPending.value;
    }

    return false;
  })

  function clearRooms() {
    if (selectedRooms.value.length > 0) {
      checkin.value = undefined;
      checkout.value = undefined;
      selectedRooms.value = [];
    }
  }

  return {
    page,
    mainGuest,
    payer,
    selectedRooms,
    paymentMethod,
    summaryList,
    totalAmount,
    totalGuests,
    checkin,
    checkout,
    // paymentId,
    guestForm,
    paymentForm,
    isNextStepLoading,
    selectRoom,
    removeRoom,
    nextStep,
    previousStep,
    clearRooms,
  }
}

export const useSearch = (checkin: Ref<DateTime>, checkout: Ref<DateTime>) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['search', checkin, checkout],
    queryFn: async () => {
      trackSearch(toStay(checkin.value.toJSDate(), checkout.value.toJSDate()));
      return await fetchSearch(checkin.value, checkout.value);
    },
  });

  return {
    searchResult: data,
    isLoadingSearch: isPending,
    searchError: error,
    searchHasError: isError,
  };
}

export const useRooms = () => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      return await fetchRooms();
    }
  });

  return {
    rooms: data,
    isLoadingRooms: isPending,
    roomsError: error,
    roomsHasError: isError,
  };
}

export const usePreBook = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: preBook,
    onSuccess: (data) => {
      router.push({ name: routeNames.bookPayment, params: { paymentId: data.paymentId } })
        .then(() => {
          reset();
          page.value = BookingPage.Success;
        });
    },
  });
}

export const usePayment = (paymentId: Ref<string>) => {
  const { data, error, isPending, isFetching, isError, refetch } = useQuery({
    queryKey: ['payment', paymentId],
    queryFn: async () => {
      return await fetchPayment(paymentId.value);
    },
  });

  return {
    payment: data,
    isLoadingPayment: isPending,
    isFetchingPayment: isFetching,
    paymentError: error,
    paymentIsError: isError,
    refetchPayment: refetch,
  };
}

const bookingPollIntervalMs = 3_000;
const bookingMaxPolls = 40;

export const isBookingProcessing = (status: BookingStatus | undefined) =>
  status === 'WaitingPreBook' || status === 'PreBooked';

export const useBookingDetails = (bookingId: Ref<string>) => {
  const fetchCount = ref(0);
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['booking', bookingId],
    queryFn: async () => {
      fetchCount.value++;
      return await fetchBooking(bookingId.value);
    },
    // The booking may still be confirming right after the payment is marked as paid
    refetchInterval: (query) =>
      isBookingProcessing(query.state.data?.status) && fetchCount.value < bookingMaxPolls
        ? bookingPollIntervalMs
        : false,
  });

  const isProcessing = computed(() => isBookingProcessing(data.value?.status));
  const processingTimedOut = computed(() => isProcessing.value && fetchCount.value >= bookingMaxPolls);

  return {
    booking: data,
    isLoadingBooking: isPending,
    bookingError: error,
    bookingIsError: isError,
    isBookingProcessing: isProcessing,
    bookingProcessingTimedOut: processingTimedOut,
  };
}

export const setPage = (newPage: BookingPage) => {
  page.value = newPage;
}

const preBook = async () => {
  const bookResponse = await http.post(`/public/hotels/${hotelId}/pre-book`, {
    checkIn: useDateFormat(checkin.value, 'YYYY-MM-DD').value,
    checkOut: useDateFormat(checkout.value, 'YYYY-MM-DD').value,
    paymentMethod: paymentMethod.value,
    mainGuest: mainGuest.value,
    payer: payer.value,
    rooms: selectedRooms.value,
    ratePlanId: ratePlanId.value,
  });

  return bookResponse.data;
}

export const summaryButtonText = (page: BookingPage) => {
  if (page === BookingPage.Search) return 'Reservar';
  if (page === BookingPage.GuestForm) return 'Continuar';
  if (page === BookingPage.PaymentForm) return 'Continuar';

  return '';
}

const fetchSearch = async (checkin: DateTime, checkout: DateTime): Promise<RoomAvailability[]> => {
  const response = await http.get<RoomAvailability[]>(`/public/hotels/${hotelId}/search`, {
    params: {
      checkin: checkin.toISODate(),
      checkout: checkout.toISODate(),
    }
  });
  return response.data;
}

const fetchRooms = async (): Promise<Room[]> => {
  const response = await http.get<Room[]>(`/public/hotels/${hotelId}/rooms`);
  return response.data;
}

const fetchPayment = async (paymentId: string): Promise<Payment> => {
  const response = await http.get<Payment>(`/public/payments/${paymentId}`);
  return response.data;
}

const fetchBooking = async (bookingId: string): Promise<BookingDetails> => {
  const response = await http.get(`/public/hotels/${hotelId}/bookings/${bookingId}`);
  return response.data;
}

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
