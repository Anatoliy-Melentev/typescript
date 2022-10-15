export function renderBlock (elementId: string, html: string) {
  const element = <HTMLElement>document.getElementById(elementId)
  element.innerHTML = html
}

interface IMsg {
  type: string;
  text: string;
}
interface IAction {
  name?: string;
  handler: () => void;
}

export function renderToast (message: IMsg | null, action: IAction) {
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

  return typeof user === 'string' ? JSON.parse(user) : {
    username: '',
    avatarUrl: '',
  };
}

export function getFavoriteItems(): string[] {
  const favoriteItems: unknown = window.localStorage.getItem('favoriteItems');
  let favorites: string[] = [];

  if (typeof favoriteItems === 'string') {
    const parse = JSON.parse(favoriteItems);
    favorites = Array.isArray(parse) ? parse : [];
  }

  return favorites;
}

export const getFieldValue = (name: string): string | TDMYY => {
  const el = <HTMLInputElement>document.getElementById(name);

  return el.value ? el.value : '';
}

export function dateToUnixStamp(date: Date): number {
  return date.getTime() / 1000
}

export const getDateFieldValue = (name: string): string => {
  if (!name) {
    return '';
  }
  const value = <TDMYY>getFieldValue(name);
  const DT = typeof value !== 'boolean' ? createDT(value) : null;

  return DT instanceof Date ? dateToUnixStamp(DT).toString() : '';
}

export let timeout: ReturnType<typeof setTimeout>;

export const createToast = (fn: () => void) => {
  timeout = setTimeout(fn, 5 * 1000);
}

export const clearToast = () => clearTimeout(timeout);

