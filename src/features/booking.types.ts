export enum BookingPage {
  Search,
  GuestForm,
  PaymentForm,
  PixForm,
}

export type PaymentMethod = 'pix';

export type Person = {
  name: string,
  email: string,
  phone: string,
  document: string,
};

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
