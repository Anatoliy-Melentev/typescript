import { renderSearchFormBlock } from './search-form.js';
import { renderEmptyOrErrorSearchBlock, renderSearchResultsBlock, renderSearchStubBlock } from './search-results.js';
import { renderUserBlock } from './user.js';
import { EventEmitter } from './EventEmitter.js';
import { clearToast, createToast, renderToast } from './lib.js';
import { getFormData } from './getFormData.js';
import { IError, IPlace } from './Api.js';

export const emitter = new EventEmitter();

window.addEventListener('DOMContentLoaded', () => {
  window.localStorage.setItem('user', JSON.stringify({
    username: 'Вася Пупкин',
    avatarUrl: 'avatar.png',
  }));

  renderUserBlock();
  renderSearchFormBlock();
  renderSearchStubBlock();

  emitter.subscribe('event:changed-date', (data: IError | IPlace[]) => {
    if (data) {
      if (Array.isArray(data)) {
        renderSearchResultsBlock(data);
      } else {
        renderEmptyOrErrorSearchBlock(data.message || 'Ничего не найдено');
      }
    }
  });

  emitter.subscribe('event:changed-user', () => {
    renderUserBlock();
  });

  emitter.subscribe('event:touched-date', () => {
    clearToast();
    createToast(() => renderToast({
      text: 'Необходимо обновить данные поиска',
      type: 'success'
    }, {
      name: 'Обновить',
      handler: () => getFormData(),
    }));
  });
})
