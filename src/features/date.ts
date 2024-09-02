import { DateTime, Interval, Settings } from 'luxon';
import Adapter from '@date-io/luxon';

const adapter = new Adapter();

export const timezone = 'America/Sao_Paulo';
Settings.defaultZone = timezone;

export const useToday = () => DateTime.now();

export const fromIsoDate = (dateString: string) => DateTime.fromISO(dateString);

export const addDays = (date: DateTime, days: number) => adapter.addDays(date, days);

export const toString = (date: DateTime|undefined) => date?.toFormat('dd/LL/yyyy', { locale: 'pt-BR' });
export const toShortString = (date: DateTime|undefined) => date?.toFormat('dd LLL', { locale: 'pt-BR' });

export const intervalDates = (checkin: DateTime, checkout: DateTime): DateTime[] =>
  Interval.fromDateTimes(checkin, checkout).splitBy({ day: 1 }).map(d => d.start!);
