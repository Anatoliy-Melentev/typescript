import {getDateFieldValue, getFavoriteItems, getFieldValue, renderBlock} from './lib.js'
import { IPlace } from "./search.js";
import { toggleFavoriteItem } from "./toggleFavoriteItem.js";
import {book} from "./book.js";

export function renderSearchStubBlock () {
  renderBlock(
    'search-results-block',
    `
    <div class="before-results-block">
      <img src="img/start-search.png" />
      <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
    </div>
    `
  )
}

export function renderEmptyOrErrorSearchBlock(reasonMessage: string) {
  renderBlock(
    'search-results-block',
    `
    <div class="no-results-block">
      <img src="img/no-results.png" />
      <p>${reasonMessage}</p>
    </div>
    `
  )
}

export function renderSearchResultsBlock(data: IPlace[]) {
  const favorites = getFavoriteItems();

  renderBlock(
    'search-results-block',
    `
    <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select>
                <option selected="">Сначала дешёвые</option>
                <option selected="">Сначала дорогие</option>
                <option>Сначала ближе</option>
            </select>
        </div>
    </div>
    <ul class="results-list" id="results-list">
      ${data.map(place => renderPosBlock({
        ...place,
        isFavorite: favorites.includes(place.id),
      })).join('')}
    </ul>
    `
  );

  const resultsList = document.getElementById('results-list');
  if (resultsList) {
    resultsList.addEventListener('click', (e: Event) => {
      if (!e) {
        return false;
      }
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        if (e.target?.classList?.contains('favorites') && e.target?.id) {
          const id = e.target.id.split('-')[1];
          toggleFavoriteItem(Number(id));
        }
        if (e.target?.classList?.contains('book') && e.target?.id) {
          const id = e.target.id.split('-')[1];
          book(id,{
            checkInDate: getDateFieldValue('check-in-date'),
            checkOutDate: getDateFieldValue('check-out-date'),
          });
        }
      }
    });
  }
}

function renderPosBlock({ description, id, image, name, price, isFavorite }: IPlace) {
  return `
      <li class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div id="fav-${id}" class="favorites${isFavorite ? ' active' : ''}"></div>
            <img class="result-img" src="${image}" alt="">
          </div>
          <div class="result-info">
            <div class="result-info--header">
              <p>${name}</p>
              <p class="price">${price}&#8381;</p>
            </div>
            <div class="result-info--map"><i class="map-icon"></i> 1.1км от вас</div>
            <div class="result-info--descr">${description}</div>
            <div class="result-info--footer">
              <div>
                <button class="book" id="book-${id}">Забронировать</button>
              </div>
            </div>
          </div>
        </div>
      </li>
  `;
}
