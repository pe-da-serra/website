export enum BookingPage {
  Search,
  GuestForm,
  PaymentForm,
  // PixForm,
}

export type GatewayType = 'Unknown' | 'ApiPix' | 'MockPix' | 'OpenPix' | 'Stripe';
export type PaymentMethod = 'Pix' | 'CreditCard';
export type PaymentStatus = 'Requested' | 'Paid' | 'Canceled' | 'Refunded';

export type Payment = {
  id: string,
  bookingId: string,
  amount: number,
  gatewayType: GatewayType,
  method: PaymentMethod,
  status: PaymentStatus,
  additionalInformation: PaymentData,
  createdAt: string,
}

export type PaymentData = {
  pixCode?: string,
  expiration?: string,
  clientSecret?: string,
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
  photos: string[],
}

export type RoomAvailability = {
  roomTypeId: string,
  availableRooms: number,
  checkin: string,
  checkout: string,
  ratePlans: {
    ratePlanId: string,
    rates: RoomRate[],
    pricePerOccupancy: { [key: number]: number }
  }[],
};

export type RoomRate = {
  date: string,
  guests: number,
  price: number,
}

export type RoomTypeBooking = {
  roomId: string,
  guestsPerRoom: number,
  totalRooms: number,
  pricePerRoom: number,
  ratePlanId: string,
}
