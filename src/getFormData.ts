import { getDateFieldValue, getFieldValue } from './lib.js';
import { search } from './search.js';
import { emitter } from './index.js';

export const getFormData = (e?: Event) => {
  if (e) {
    e.preventDefault();
  }

  search({
    checkInDate: getDateFieldValue('check-in-date'),
    checkOutDate: getDateFieldValue('check-out-date'),
    maxPrice: getFieldValue('max-price'),
    coordinates: getFieldValue('coordinates'),
  }, result => emitter.emit('event:changed-date', result));
}
