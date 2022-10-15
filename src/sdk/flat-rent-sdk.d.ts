export interface IParams {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit?: number | undefined;
}

export interface IData {
  id: string;
  title: string;
  details: string;
  photos: [string, string];
  coordinates: [number, number];
  bookedDates: [];
  totalPrice: number;
}

export interface FlatRentSdk {
  get: (id: string) => Promise;
  search: (params: IParams) => Promise;
  book: (id: string, checkInDate: number, checkOutDate: number) => Promise;
}
