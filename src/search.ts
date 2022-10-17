import { responseToJson } from "./responseToJson.js";

export interface IPlace {
  bookedDates: number[];
  description: string;
  id: number;
  image: string;
  name: string;
  price: number;
  remoteness: number;
  isFavorite?: boolean;
}

interface IArrayError {
  message: string;
  path: string[];
  type: string;
  context: {
    key: string;
    label: string;
  };
}

export interface IError {
  className: string;
  code: number;
  data: IArrayError;
  message: string;
  name: string;
  length?: number;
}

export interface SearchFormData {
  checkInDate: string;
  checkOutDate: string;
  maxPrice: string;
  coordinates: string;
}

export const search = async (params: SearchFormData, callback: (v: IError | IPlace[]) => void) => {
  const data: unknown = await responseToJson(`http://localhost:3030/places?${
    Object.entries(params).map(([key, value]) => value && `${key}=${value}`).join('&')
  }`);

  if (data && (Array.isArray(data) || typeof data === 'object')) {
    callback(data);
    // Как проверить что дата подходит для типов IError | IPlace[]?
  }
}
