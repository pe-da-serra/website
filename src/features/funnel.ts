import posthog from "posthog-js";
import { DateTime } from "luxon";
import { BookingDetails, PaymentMethod } from "./booking.types";

// Booking funnel events, sent to both GA4 and PostHog with identical names and
// params. Names and params follow GA4's recommended ecommerce events, so the
// funnel works with GA4's checkout reports and Google Ads conversion imports.

export type FunnelItem = {
  item_id: string,
  item_name?: string,
  item_variant?: string,
  price?: number,
  quantity?: number,
  index?: number,
};

// Stay dates as YYYY-MM-DD, using GA4's travel params
export type FunnelStay = {
  start_date?: string,
  end_date?: string,
};

const purchaseStorageKey = 'ga-tracked-purchases';

const send = (event: string, params: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  const payload = { currency: 'BRL', ...params };
  window.gtag?.('event', event, payload);
  posthog.capture(event, payload);
};

const sumValue = (items: FunnelItem[]) =>
  items.reduce((acc, item) => acc + (item.price ?? 0) * (item.quantity ?? 1), 0);

export const toStay = (checkin?: Date | string | null, checkout?: Date | string | null): FunnelStay => ({
  start_date: toIsoDate(checkin),
  end_date: toIsoDate(checkout),
});

const toIsoDate = (date?: Date | string | null) => {
  if (!date) return undefined;
  const parsed = typeof date === 'string' ? DateTime.fromISO(date) : DateTime.fromJSDate(date);
  return parsed.isValid ? parsed.toISODate() ?? undefined : undefined;
};

export const guestsVariant = (guests: number) => `${guests} hóspede${guests > 1 ? 's' : ''}`;

export function trackSearch(stay: FunnelStay) {
  send('search', { search_term: `${stay.start_date} - ${stay.end_date}`, ...stay });
}

export function trackViewRooms(items: FunnelItem[], stay: FunnelStay) {
  send('view_item_list', { item_list_id: 'booking_search', item_list_name: 'Busca de quartos', items, ...stay });
}

export function trackAddRoom(item: FunnelItem, stay: FunnelStay) {
  send('add_to_cart', { value: sumValue([item]), items: [item], ...stay });
}

export function trackRemoveRoom(item: FunnelItem, stay: FunnelStay) {
  send('remove_from_cart', { value: sumValue([item]), items: [item], ...stay });
}

export function trackBeginCheckout(items: FunnelItem[], stay: FunnelStay) {
  send('begin_checkout', { value: sumValue(items), items, ...stay });
}

// Not a GA4 recommended event (GA4 has none for this step); named in the same style
export function trackGuestInfo(items: FunnelItem[], stay: FunnelStay) {
  send('add_guest_info', { value: sumValue(items), items, ...stay });
}

export function trackPaymentInfo(items: FunnelItem[], paymentMethod: PaymentMethod, stay: FunnelStay) {
  send('add_payment_info', { value: sumValue(items), payment_type: paymentMethod, items, ...stay });
}

export function trackPurchase(booking: BookingDetails, roomName: (roomId: string) => string | undefined) {
  const tracked = readTrackedPurchases();
  if (tracked.includes(booking.id)) return;

  const quantities: Record<string, number> = {};
  booking.rooms.forEach(id => { quantities[id] = (quantities[id] ?? 0) + 1; });

  send('purchase', {
    transaction_id: booking.id,
    value: booking.price,
    items: Object.entries(quantities).map(([item_id, quantity]) => ({ item_id, item_name: roomName(item_id), quantity })),
    ...toStay(booking.checkIn, booking.checkOut),
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
