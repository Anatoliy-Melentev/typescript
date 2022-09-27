import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { getFavoritesAmount, getUserData, renderToast } from './lib.js';

window.addEventListener('DOMContentLoaded', () => {
  window.localStorage.setItem('user', JSON.stringify({
    username: 'Вася Пупкин',
    avatarUrl: 'avatar.png',
  }));

  const { username, avatarUrl } = getUserData();
  const favoritesAmount = getFavoritesAmount();

  renderUserBlock(username, avatarUrl, favoritesAmount);
  renderSearchFormBlock('2022-09-24', '2022-09-26');
  renderSearchStubBlock();
  renderToast({
      text: 'Это пример уведомления. Используйте его при необходимости',
      type: 'success'
    }, {
      name: 'Понял',
      handler: () => {
        console.log('Уведомление закрыто')
      }
  });
})
