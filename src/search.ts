import { SearchFormData } from "./getFormData.js";

interface Place {
  array: [],
}

export const search = (data: SearchFormData, callback: (v: string | Place) => void) => {
  setTimeout(() => callback(Math.round(Math.random()) ? 'Ошибка' : { array: [] }), 3000);

  console.log(data);
}
