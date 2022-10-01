import {getFavoriteItems, getUserData, renderBlock} from './lib.js'

export function renderUserBlock() {
  const { username: name, avatarUrl: link } = getUserData();
  const isFavorite = getFavoriteItems().length;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="/img/${link}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${isFavorite ? ' active' : ''}"></i>${isFavorite ? isFavorite : 'ничего нет'}
          </p>
      </div>
    </div>
    `
  )
}
