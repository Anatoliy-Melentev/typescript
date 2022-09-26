export function renderBlock (elementId, html) {
  const element = document.getElementById(elementId)
  element.innerHTML = html
}

export function renderToast (message, action) {
  let messageText = ''
  
  if (message != null) {
    messageText = `
      <div id="info-block" class="info-block ${message.type}">
        <p>${message.text}</p>
        <button id="toast-main-action">${action?.name || 'Закрыть'}</button>
      </div>
    `
  }
  
  renderBlock(
    'toast-block',
    messageText
  )

  const button = document.getElementById('toast-main-action')
  if (button != null) {
    button.onclick = function() {
      if (action != null && action.handler != null) {
        action.handler()
      }
      renderToast(null, action)
    }
  }
}

type TYear = `${number}${number}`;
type TMonth = `${'0' | '1'}${number}`;
type TDay = `${'0' | '1' | '2' | '3'}${number}`;

type TDMY = `${TDay}.${TMonth}.${TYear}`;
export type TDMYY = `${TDay}.${TMonth}.20${TYear}`;
type TYMD = `20${TYear}-${TMonth}-${TDay}`;

export type TDate = TDMY | TDMYY | TYMD

export const createDT = (date: TDate): Date | boolean => {
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return new Date(Date.parse(date));
  }
  if (/^\d{2}.\d{2}.\d{2,4}$/.test(date)) {
    return new Date(Date.parse(date.split('.').reverse().map((v, i) => !i && v.length === 2 ? `20${v}` : v).join('-')));
  }

  return false;
}

export const dateToDMY = (date: Date): string => (
  `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
);

export const dateToYMD = (date: Date): string => (
  `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
);

export const getCurDate = (): Date => (new Date());

export const getLastDayOfMonth = (date: Date): Date => (new Date(date.getFullYear(), date.getMonth() + 1, 0));

export const addDays = (date: Date, days: number): Date => new Date(date.setDate(date.getDate() + days));

export interface IUser {
  username: string;
  avatarUrl: string;
}

export function getUserData(): IUser {
  const user: unknown = window.localStorage.getItem('user');

  if (typeof user === 'string') {
    return JSON.parse(user);
  }
}

export function getFavoritesAmount(): number {
  const favoritesAmount: unknown = window.localStorage.getItem('favoritesAmount');

  if (favoritesAmount === null) {
    return 0;
  }

  if (typeof favoritesAmount === 'string') {
    return Number(favoritesAmount);
  }
}

export const getFieldValue = (name: string): string | TDMYY => {
  const el = <HTMLInputElement>document.getElementById(name);

  if (el.value) {
    return el.value || '';
  }
}
