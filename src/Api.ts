import { IData } from './sdk/flat-rent-sdk.js';
import { FlatRentSdk } from './sdk/scripts/flat-rent-sdk.js';
import { renderToast } from './lib.js';

export interface IPlace {
  bookedDates: number[];
  description: string;
  id: string;
  image: string;
  name: string;
  price: number;
  remoteness: number;
  isFavorite?: boolean;
  type: string;
}

interface IArrayError {
  message: string;
  path: string[];
  type: string;
  context: {
    key: string;
    label: string;
  };
}

export interface IError {
  className: string;
  code: number;
  data: IArrayError;
  message: string;
  name: string;
}

interface ISearchFormParams {
  checkInDate: string;
  checkOutDate: string;
  maxPrice: string;
  coordinates?: string;
  city?: string;
}

interface IApiParams {
  checkInDate: string;
  checkOutDate: string;
  maxPrice: string;
  coordinates: string;
}

interface ISdkParams {
  checkInDate: string;
  checkOutDate: string;
  maxPrice: string;
  city: string;
}

interface IBookData {
  checkInDate: string;
  checkOutDate: string;
}

class Api {
  params: ISearchFormParams;
  apiParams: IApiParams;
  apiAddress: string;
  apiUrl: string;
  apiData?: IError | IPlace[];
  sdk: FlatRentSdk;
  sdkParams: ISdkParams;
  sdkData?: IData | IError;

  constructor() {
    this.params = {
      checkInDate: '',
      checkOutDate: '',
      maxPrice: '',
      coordinates: '',
      city: '',
    }
    this.apiParams = {
      checkInDate: '',
      checkOutDate: '',
      maxPrice: '',
      coordinates: '',
    };
    this.apiAddress = 'http://localhost:3030/';
    this.apiUrl = '';
    this.sdkParams = {
      checkInDate: '',
      checkOutDate: '',
      maxPrice: '',
      city: '',
    };
    this.sdk = new FlatRentSdk();
  }
  async getData(params: ISearchFormParams, callback: (v: IError | IPlace[]) => void) {
    this.params = params;

    const apiData: IError | IPlace[] = await this.getApiData();

    if (typeof apiData === 'object') {
      callback(apiData);
    }

    const sdkData: IError | IData[] | unknown = await this.getSdkData();

    if (sdkData !== null && typeof sdkData === 'object') {
      callback(<IError>sdkData);
    }
    if (Array.isArray(apiData) && Array.isArray(sdkData)) {
      callback([
        ...apiData,
        ...sdkData.map(data => ({
          bookedDates: data.bookedDates,
          description: data.details,
          id: data.id,
          image: '/img/' + data.photos[0].split('/')[data.photos[0].split('/').length - 1],
          name: data.title,
          price: data.totalPrice,
          remoteness: 0,
          type: 'sdk',
        }))
      ])
    }
  }
  createApiData() {
    if (this.params) {
      for (const key in this.params) {
        if (key in this.apiParams && typeof this.params.coordinates === 'string' && this.params.coordinates.length > 0) {
          this.apiParams = {
            checkInDate: this.params.checkInDate,
            checkOutDate: this.params.checkOutDate,
            maxPrice: typeof this.params.maxPrice === 'number' ? this.params.maxPrice : '',
            coordinates: this.params.coordinates,
          };
        }
      }
    }
  }
  createApiLink() {
    this.createApiData();
    if (Object.entries(this.apiParams).every(([key, value]) => key === 'maxPrice' || value.length > 0)) {
      this.apiUrl = `${this.apiAddress}places?${Object.entries(this.apiParams).map(([key, value]) => value && `${key}=${value}`).join('&')}`;
    }
  }
  responseToJson(url: string, method?: string) {
    return fetch(url, {
      method: method || 'GET',
    })
      .then((response) => {
        return response.text()
      })
      .then((response) => {
        return JSON.parse(response)
      })
  }
  async getApiData() {
    this.createApiLink();
    if (this.apiUrl.length > this.apiAddress.length) {
      return await this.responseToJson(this.apiUrl);
    }

    return false;
  }
  createApiBookParams(params: IBookData) {
    if (params && Object.values(params).every(value => value.length > 0)) {
      return Object.entries(params).map(([key, value]) => value && `${key}=${value}`).join('&');
    }

    return '';
  }
  createApiBookLink(id: string, params: IBookData) {
    const paramsStr = this.createApiBookParams(params);

    if (paramsStr.length > 0 && id.length) {
      return `${this.apiAddress}places/${id}?${paramsStr}`;
    }

    return '';
  }
  async book(id: string, type: string, params: IBookData) {
    let message = '';
    if (!id.length) {
      message = 'Не передат id';
    } else {
      if (type !== 'sdk') {
        const link = this.createApiBookLink(id, params);

        if (link.length === 0) {
          return false;
        }

        const data = await this.responseToJson(link, 'PATCH');
        if (data.message) {
          message = data.message;
        } else {
          message = 'ok';
        }
      } else {
        try {
          await this.sdk.book(id, new Date(params.checkInDate), new Date(params.checkOutDate))
            //@ts-ignore;
            .then((result) => {
              message = 'ok';
            })
        } catch (e: unknown) {
          message = e instanceof Error ? e.message : 'Ошибка';
        }

      }
    }

    if (message !== 'ok') {
      renderToast({
        text: message,
        type: 'error'
      }, {
        name: 'Понял',
        handler: () => console.log('ok'),
      });
    } else {
      renderToast({
        text: 'Готово',
        type: 'success'
      }, {
        name: 'Ура',
        handler: () => console.log('ok'),
      });
    }

    return true;
  }
  createSdkData() {
    if (this.params) {
      for (const key in this.params) {
        if (key in this.sdkParams && typeof this.params.city === 'string' && this.params.city.length > 0) {
          this.sdkParams = {
            checkInDate: this.params.checkInDate,
            checkOutDate: this.params.checkOutDate,
            maxPrice: typeof this.params.maxPrice === 'number' ? this.params.maxPrice : '',
            city: this.params.city,
          };
        }
      }
    }
  }
  async getSdkData() {
    this.createSdkData();
    if (Object.entries(this.sdkParams).every(([key, value]) => key === 'maxPrice' || value.length > 0)) {
      return new Promise((resolve, reject) => this.sdk.search({
        city: this.sdkParams.city,
        checkInDate: new Date(this.sdkParams.checkInDate),
        checkOutDate: new Date(this.sdkParams.checkOutDate),
        priceLimit: +this.sdkParams.maxPrice > 0 ? +this.sdkParams.maxPrice : undefined,
      })
        //@ts-ignore
        .then((data: IData) => resolve(data))
        .catch((error: Error) => reject(error)));
    }

    return false;
  }
}

export const api = new Api();
