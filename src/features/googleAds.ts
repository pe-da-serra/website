import { BookingDetails } from "./booking.types";

// e.g. "AW-16766003824/2YCaCPjCnbkdEPDU07o-". Unset outside production, which disables tracking.
const conversionSendTo: string | undefined = import.meta.env.VITE_GOOGLE_ADS_SEND_TO;
const trackedStorageKey = 'google-ads-tracked-bookings';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function installGoogleAds() {
  if (!conversionSendTo || !window.gtag) return;

  window.gtag('config', conversionSendTo.split('/')[0]);
}

export function trackBookingConversion(booking: BookingDetails) {
  if (!conversionSendTo || !window.gtag) return;

  const tracked = readTrackedBookings();
  if (tracked.includes(booking.id)) return;

  window.gtag('event', 'conversion', {
    send_to: conversionSendTo,
    value: booking.price,
    currency: 'BRL',
    transaction_id: booking.id,
  });

  localStorage.setItem(trackedStorageKey, JSON.stringify([...tracked, booking.id].slice(-50)));
}

const readTrackedBookings = (): string[] => {
  try {
    const value = JSON.parse(localStorage.getItem(trackedStorageKey) ?? '[]');
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
}
