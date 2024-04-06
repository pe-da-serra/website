import { useMutation, useQuery } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import { Ref, computed, ref } from "vue";
import { BookingPage, PaymentMethod, Person, Room, RoomRates, RoomTypeBooking } from "./booking.types";
import { useToday } from "./date";

const today = useToday();

const checkin = ref<DateTime>();
const checkout = ref<DateTime>();
const page = ref<BookingPage>(BookingPage.Search);
const mainGuest = ref<Person>({ name: '', email: '', phone: '', document: '' });
const payer = ref<Person>({ name: '', email: '', phone: '', document: '' });
const selectedRooms = ref<RoomTypeBooking[]>([]);
const paymentMethod = ref<PaymentMethod>('pix');
const paymentData = ref({});

export function useBooking() {
  const rooms = useRooms();

  const summaryList = computed(() => {
    if (!rooms.value.data) return [];

    return selectedRooms.value.map(room => ({
      roomId: room.roomId,
      name: rooms.value.data?.find(r => r.id === room.roomId)?.name ?? '',
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
    paymentData,
    // methods
    selectRoom,
    removeRoom,
    clearRooms,
  }
};

export const useSearch = (checkin: Ref<DateTime>, checkout: Ref<DateTime>) => {
  const result = ref(useQuery({
    queryKey: ['search', checkin, checkout],
    queryFn: async () => {
      return fetchSearch(checkin.value, checkout.value);
    }
  }));

  return result;
}

export const useRooms = () => {
  return ref(useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      return fetchRooms();
    }
  }));
}

export const preBook = () => {
  return ref(useMutation({
    mutationFn: preBookMock,
    onSuccess: (data) => {
      paymentData.value = data.additionalInformation;
    }
  }));
}

const preBookMock = async () => {
  await sleep(1000);
  return {
    bookingId: "b8beef9f-6de3-4270-9ddf-ec7e4e21f2b8",
    paymentMethod: "pix",
    additionalInformation: {
      expiration: DateTime.now().plus( { minutes: 10 }).toISO(),
      pixCode: '00020101021226820014br.gov.bcb.pix2560pix.stone.com.br/pix/v2/3c63d4a3-ab96-4571-a1a3-6f6c931e7ee7520400005303986540527.205802BR5914Conta primaria6014RIO DE JANEIRO62290525pacluap9wq1fzlh1fk3gkpy5363043797',
    }
  }
}

const fetchSearch = async (checkin: DateTime, checkout: DateTime): Promise<RoomRates[]> => {
  console.log('fetch search', checkin.toISODate(), checkout.toISODate());
  await sleep(2000);
  return [
    {
        "roomId": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
        "availableQuantity": 7,
        "checkin": "2024-03-20",
        "checkout": "2024-03-22",
        "rates": [
            {
                "date": "2024-03-20",
                "defaultPrice": 119.80,
                "prices": [
                    { "amount": 119.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 109.80, "guests": 1, "paymentMethod": "pix" },
                ]
            },
            {
                "date": "2024-03-21",
                "defaultPrice": 129.80,
                "prices": [
                    { "amount": 129.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 119.80, "guests": 1, "paymentMethod": "pix" },
                ]
            }
        ]
    },
    {
        "roomId": "0de12f36-6816-468e-ba6a-ffe33632212a",
        "availableQuantity": 3,
        "checkin": "2024-03-20",
        "checkout": "2024-03-22",
        "rates": [
            {
                "date": "2024-03-20",
                "defaultPrice": 139.80,
                "prices": [
                    { "amount": 139.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 129.80, "guests": 1, "paymentMethod": "pix" },
                ]
            },
            {
                "date": "2024-03-21",
                "defaultPrice": 149.80,
                "prices": [
                    { "amount": 149.80, "guests": 2, "paymentMethod": "pix" },
                    { "amount": 139.80, "guests": 1, "paymentMethod": "pix" },
                ]
            }
        ]
    },
  ];
}

const fetchRooms = async (): Promise<Room[]> => {
  await sleep(100);
  return [
    {
        "id": "3a266b79-9e90-43a7-9ceb-338cbf8207cc",
        "name": "Quarto Solteiro",
        "description": "Quarto com cama de solteiro, ar condicionado, TV, frigobar e banheiro privativo.",
        "capacity": 1,
        "beds": 1,
        "photos": [
            "https://via.placeholder.com/300x200"
        ]
    },
    {
        "id": "0de12f36-6816-468e-ba6a-ffe33632212a",
        "name": "Quarto Duplo",
        "description": "Quarto com cama de casal, ar condicionado, TV, frigobar e banheiro privativo.",
        "capacity": 2,
        "beds": 2,
        "photos": [
            "https://via.placeholder.com/300x200"
        ]
    }
  ];
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
