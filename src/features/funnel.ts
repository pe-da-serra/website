import { BookingDetails, PaymentMethod } from "./booking.types";

// GA4 recommended ecommerce events, so the booking funnel shows up in GA4's
// funnel/checkout reports and can be imported into Google Ads.

export type FunnelItem = {
  item_id: string,
  item_name?: string,
  price?: number,
  quantity?: number,
  index?: number,
};

const purchaseStorageKey = 'ga-tracked-purchases';

const send = (event: string, params: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  window.gtag?.('event', event, { currency: 'BRL', ...params });
};

const sumValue = (items: FunnelItem[]) =>
  items.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1), 0);

export function trackViewRooms(items: FunnelItem[]) {
  send('view_item_list', { item_list_id: 'booking_search', item_list_name: 'Busca de quartos', items });
}

export function trackAddRoom(item: FunnelItem) {
  send('add_to_cart', { value: sumValue([item]), items: [item] });
}

export function trackRemoveRoom(item: FunnelItem) {
  send('remove_from_cart', { value: sumValue([item]), items: [item] });
}

export function trackBeginCheckout(items: FunnelItem[]) {
  send('begin_checkout', { value: sumValue(items), items });
}

export function trackGuestInfo(items: FunnelItem[]) {
  send('add_guest_info', { value: sumValue(items), items });
}

export function trackPaymentInfo(items: FunnelItem[], paymentMethod: PaymentMethod) {
  send('add_payment_info', { value: sumValue(items), payment_type: paymentMethod, items });
}

export function trackPurchase(booking: BookingDetails) {
  const tracked = readTrackedPurchases();
  if (tracked.includes(booking.id)) return;

  const quantities: Record<string, number> = {};
  booking.rooms.forEach(id => { quantities[id] = (quantities[id] ?? 0) + 1; });

  send('purchase', {
    transaction_id: booking.id,
    value: booking.price,
    items: Object.entries(quantities).map(([item_id, quantity]) => ({ item_id, quantity })),
  });

  localStorage.setItem(purchaseStorageKey, JSON.stringify([...tracked, booking.id].slice(-50)));
}

const readTrackedPurchases = (): string[] => {
  try {
    const value = JSON.parse(localStorage.getItem(purchaseStorageKey) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
