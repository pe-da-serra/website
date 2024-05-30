export enum BookingPage {
  Search,
  GuestForm,
  PaymentForm,
  PixForm,
}

export type PaymentMethod = 'Pix';
export type PaymentStatus = 'Requested' | 'Paid' | 'Canceled' | 'Refunded';

export type Payment = {
  id: string,
  bookingId: string,
  amount: number,
  method: PaymentMethod,
  status: PaymentStatus,
  additionalInformation: PaymentData,
  createdAt: string,
}

export type PaymentData = {
  pixCode?: string,
  expiration?: string,
}

export type Person = {
  fullName: string,
  email: string,
  phone: string,
  document: string,
};

export type Room = {
  id: string,
  name: string,
  description: string,
  capacity: number,
  // beds: number,
  // photos: string[],
}

export type RoomRates = {
  roomId: string,
  availableRooms: number,
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
