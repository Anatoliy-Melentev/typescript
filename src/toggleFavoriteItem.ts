import { getFavoriteItems } from "./lib.js";
import { getFormData } from "./getFormData.js";
import { emitter } from "./index.js";


export const toggleFavoriteItem = (id: number) => {
  let favorites = getFavoriteItems();

  if (!favorites.find(val => val === id)) {
    favorites.push(id);
  } else {
    favorites = favorites.filter(val => val !== id);
  }

  window.localStorage.setItem('favoriteItems', JSON.stringify(favorites));

  getFormData();
  emitter.emit('event:changed-user', 'update')
}
