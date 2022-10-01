import { responseToJson } from "./responseToJson.js";
import { renderToast } from "./lib.js";

export interface IBookData {
  checkInDate: string;
  checkOutDate: string;
}

export const book = async (id: string, params: IBookData) => {
  const data: unknown = await responseToJson(`http://localhost:3030/places/${id}?${
    Object.entries(params).map(([key, value]) => value && `${key}=${value}`).join('&')
  }`, 'PATCH');

  if (data && typeof data === 'object' && data.message) {
    // Перечеркивает message Как убедить ТС что оно там может быть?
    renderToast({
      text: data.message,
      type: 'error'
    }, {
      name: 'Понял',
      handler: () => {},
    });
  } else {
    renderToast({
      text: 'Готово',
      type: 'success'
    }, {
      name: 'Ура',
      handler: () => {},
    });
  }
}
