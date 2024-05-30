import { useMutation, useQuery } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import { Ref, computed, ref } from "vue";
import { BookingPage, Payment, PaymentData, PaymentMethod, Person, Room, RoomRates, RoomTypeBooking } from "./booking.types";
import { http } from "./http";

const hotelId = import.meta.env.VITE_HOTEL_ID;

const checkin = ref<DateTime>();
const checkout = ref<DateTime>();
const page = ref<BookingPage>(BookingPage.Search);
const mainGuest = ref<Person>({ fullName: '', email: '', phone: '', document: '' });
const payer = ref<Person>({ fullName: '', email: '', phone: '', document: '' });
const selectedRooms = ref<RoomTypeBooking[]>([]);
const paymentMethod = ref<PaymentMethod>('Pix');
const paymentId = ref<string>('');
// const paymentData = ref<PaymentData>({});

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

  const totalGuests = computed(() =>
    summaryList.value.reduce((acc, listItem) => acc + (listItem.guestsPerRoom * listItem.quantity), 0)
  );

  function selectRoom(room: RoomTypeBooking, checkinDate: DateTime, checkoutDate: DateTime) {
    checkin.value = checkinDate;
    checkout.value = checkoutDate;

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
      selectedRooms.value.splice(index, 1);
    }

    if (selectedRooms.value.length === 0) {
      checkin.value = undefined;
      checkout.value = undefined;
    }
  }

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
    // paymentData,
    paymentId,
    // methods
    selectRoom,
    removeRoom,
    clearRooms,
  }
}

export const useSearch = (checkin: Ref<DateTime>, checkout: Ref<DateTime>) => {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['search', checkin, checkout],
    queryFn: async () => {
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
  return ref(useMutation({
    mutationFn: preBook,
    onSuccess: (data) => {
      paymentId.value = data.paymentId;
    }
  }));
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

const preBook = async () => {
  const bookResponse = await http.post(`/public/hotels/${hotelId}/pre-book`, {
    checkIn: checkin.value?.toISODate(),
    checkOut: checkout.value?.toISODate(),
    paymentMethod: paymentMethod.value,
    mainGuest: mainGuest.value,
    payer: payer.value,
    rooms: selectedRooms.value,
  });

  return bookResponse.data;
  // const paymentId = bookResponse.data.paymentId;

  // const paymentResponse = await http.get(`/public/payments/${paymentId}`);

  // return paymentResponse.data;
}

const fetchSearch = async (checkin: DateTime, checkout: DateTime): Promise<RoomRates[]> => {
  const response = await http.get<RoomRates[]>(`/public/hotels/${hotelId}/search`, {
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

// const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
