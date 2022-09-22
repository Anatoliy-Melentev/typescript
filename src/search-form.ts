import {
  renderBlock, createDT, TDate, getCurDate, getLastDayOfMonth, dateToYMD, addDays
} from './lib.js';

export function renderSearchFormBlock(startDate?: TDate, endDate?: TDate) {
  const startDT = startDate ? createDT(startDate) : addDays(getCurDate(), 1);
  const endDT = endDate ? createDT(endDate) : addDays(typeof startDT !== 'boolean' ? new Date(startDT) : getCurDate(), 2);

  const nextMonth = getCurDate();
  nextMonth.setMonth(nextMonth.getMonth() + 1);

  renderBlock(
    'search-form-block',
    `
    <form>
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>-->
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input
              id="check-in-date"
              type="date"
              value="${typeof startDT !== 'boolean' ? dateToYMD(startDT) : ''}"
              min="${dateToYMD(getCurDate())}"
              max="${dateToYMD(getLastDayOfMonth(nextMonth))}"
              name="checkin"
            />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input
              id="check-out-date"
              type="date"
              value="${typeof endDT !== 'boolean' ? dateToYMD(endDT) : ''}"
              min="${dateToYMD(getCurDate())}"
              max="${dateToYMD(getLastDayOfMonth(nextMonth))}"
              name="checkout"
            />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  )
}
