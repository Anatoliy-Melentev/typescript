import {join} from 'path';
import {Place} from '../place/Place.js';
import {Storage} from '../database/Storage.js';
import { DateHelper } from '../helpers/DateHelper.js';

export async function restoreData() {
  const dbPath = join(__dirname, '../../data/db.json');

  const placeStorage = new Storage<Place>(dbPath, 'places');
  const bookingStorage = new Storage<Record<string, [number[], number[]]>>(dbPath, 'bookings');
  await placeStorage.read();
  await bookingStorage.read();

  const now = new Date();
  const dateFrom = new Date(now.getFullYear(), now.getMonth(), 1);
  const dateTo = new Date(now.getFullYear(), now.getMonth(), 28);
  const availableRange = DateHelper.generateDateRange(dateFrom, dateTo);

  const keys = Object.keys(placeStorage.data);
  for (const key of keys) {
    const place = placeStorage.data[key];
    // const dates: number[] =
    // place.availableDates = '';
    // Эти строки были сломаны в начальном файле,хз что они должны делать?
  }

  await placeStorage.write();
  return placeStorage;
}
