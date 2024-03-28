import { DateTime, Settings } from 'luxon';

export const timezone = 'America/Sao_Paulo';
Settings.defaultZone = timezone;

export const useToday = () => DateTime.now();

export const fromIsoDate = (dateString: string) => DateTime.fromISO(dateString);

