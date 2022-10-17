export interface Place {
  id: number;
  image: string;
  name: string;
  description: string;
  remoteness: number;
  bookedDates: number[];
  availableDates?: number[];
  price: number;
} 
