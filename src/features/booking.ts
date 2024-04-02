import { useQuery } from "@tanstack/vue-query";
import { DateTime } from "luxon";
import { computed, ref } from "vue";

export const bookingUrl = (options: BookingOptions = {}) => {
  const phone = "552433847550";

  var text = "Olá, gostaria fazer uma reserva no *Pé da Serra Hotel*.\n";

  if (options.start && options.end) {
    text += `\n*Chegada:* ${options.start.toLocaleDateString()}\n*Saída:* ${options.end.toLocaleDateString()}`;
  }

  if (options.room) {
    text += `\n*Quarto:* ${transalateRoomType(options.room)}`;
  }

  if (options.guests) {
    text += `\n*Hóspedes:* ${options.guests}`;
  }

  return encodeURI(`https://api.whatsapp.com/send?phone=${phone}&text=${text}`);
}

type BookingOptions = {
  start?: Date;
  end?: Date;
  room?: RoomType;
  guests?: number;
}

export enum RoomType {
  Single = 'single',
  Double = 'double',
  DoubleSharedBathroom = 'double-shared-bathroom',
  Couple = 'couple',
  Triple = 'triple',
  Apartment = 'apartment',
}

const transalateRoomType = (room: RoomType) => {
  switch (room) {
    case RoomType.Single:
      return "Solteiro";
    case RoomType.Double:
      return "Duplo";
    case RoomType.DoubleSharedBathroom:
      return "Duplo - banheiro compartilhado";
    case RoomType.Couple:
      return "Casal";
    case RoomType.Triple:
      return "Triplo";
    case RoomType.Apartment:
      return "Apartamento";
  }
}

export const booking = ref<{
  page: 'search' | 'guestForm' | 'paymentForm' | 'pixForm',
  mainGuest: {
    name: string,
    email: string,
    phone: string,
    document: string,
  },
  payer: {
    name: string,
    email: string,
    phone: string,
    document: string,
  },
  paymentMethod: PaymentMethod,
  selectedRooms: RoomTypeBooking[],
}>({
  page: "search",
  mainGuest: { name: "", email: "", phone: "", document: "" },
  payer: { name: "", email: "", phone: "", document: "" },
  paymentMethod: 'pix',
  selectedRooms: [],
});

export const selectRoom = (room: RoomTypeBooking) => {
  // add room to selectedRooms. if the roomId is already in the list with the same number of guests, increment the totalRooms
  const index = booking.value.selectedRooms.findIndex(r => r.roomId === room.roomId && r.guestsPerRoom === room.guestsPerRoom);
  if (index >= 0) {
    booking.value.selectedRooms[index].totalRooms += room.totalRooms;
  } else {
    booking.value.selectedRooms.push(room);
  }
}

export const removeRoom = (roomId: string, guestsPerRoom: number) => {
  // remove room from selectedRooms
  const index = booking.value.selectedRooms.findIndex(r => r.roomId === roomId && r.guestsPerRoom === guestsPerRoom);
  if (index >= 0) {
    booking.value.selectedRooms.splice(index, 1);
  }
}

export type PaymentMethod = 'pix';

export type Room = {
  id: string,
  name: string,
  description: string,
  capacity: number,
  beds: number,
  photos: string[],
}

export type RoomRates = {
  roomId: string,
  availableQuantity: number,
  checkin: string,
  checkout: string,
  rates: {
    date: string,
    defaultPrice: number,
    prices: {
      amount: number,
      guests: number,
      paymentMethod: string,
    }[],
  }[],
};

export type RoomTypeBooking = {
  roomId: string,
  guestsPerRoom: number,
  totalRooms: number,
  pricePerRoom: number,
}

export const search = (checkin: DateTime, checkout: DateTime) => {
  return ref(useQuery({
    queryKey: ['search', checkin.toISODate(), checkout.toISODate()],
    queryFn: async () => {
      return fetchSearch(checkin, checkout);
    }
  }));
}

export const listRooms = () => {
  return ref(useQuery({
    queryKey: ['rooms'],
    queryFn: async () => {
      return fetchRooms();
    }
  }));
}

const fetchSearch = async (checkin: DateTime, checkout: DateTime): Promise<RoomRates[]> => {
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
  await sleep(2000);
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
