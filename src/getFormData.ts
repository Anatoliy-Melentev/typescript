import { getFieldValue, TDMYY } from './lib.js';
import { search } from './search.js';

export interface SearchFormData {
  city: string;
  checkInDate: TDMYY;
  checkOutDate: TDMYY;
  maxPrice: string;
}

export const getFormData = () => {
  const formData: SearchFormData = {
    city: getFieldValue('city'),
    checkInDate: <TDMYY>getFieldValue('check-in-date'),
    checkOutDate: <TDMYY>getFieldValue('check-out-date'),
    maxPrice: getFieldValue('max-price'),
  };

  search(formData, result => console.log(result));
}
