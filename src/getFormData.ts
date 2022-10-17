import { getDateFieldValue, getFieldValue } from './lib.js';
import { emitter } from './index.js';
import { api } from './Api.js';

export const getFormData = (e?: Event) => {
  if (e) {
    e.preventDefault();
  }

  api.getData({
    checkInDate: getDateFieldValue('check-in-date'),
    checkOutDate: getDateFieldValue('check-out-date'),
    maxPrice: getFieldValue('max-price'),
    coordinates: getFieldValue('coordinates'),
    city: getFieldValue('city'),
  }, result => emitter.emit('event:changed-date', result));
}
