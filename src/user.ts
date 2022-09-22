import { renderBlock } from './lib.js'

export function renderUserBlock(name: string, link: string, count: number) {
  const isFavorite = !!count;

  renderBlock(
    'user-block',
    `
    <div class="header-container">
      <img class="avatar" src="/img/${link}" alt="${name}" />
      <div class="info">
          <p class="name">${name}</p>
          <p class="fav">
            <i class="heart-icon${isFavorite ? ' active' : ''}"></i>${isFavorite ? count : 'ничего нет'}
          </p>
      </div>
    </div>
    `
  )
}
