import { renderSearchFormBlock } from './search-form.js';
import { renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { renderToast } from './lib.js';

window.addEventListener('DOMContentLoaded', () => {
  renderUserBlock('Вася Пупкин', 'avatar.png', Math.round(Math.random()));
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
