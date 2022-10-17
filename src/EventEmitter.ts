interface IEvents {
  [key: string]: any[]
}

export class EventEmitter {
  events: IEvents;
  constructor() {
    this.events = {};
  }

  subscribe(eventName: string, fn: any) {
    if(!this.events[eventName]) {
      this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return () => {
      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
  }

  emit(eventName: string, data: any) {
    const event = this.events[eventName];
    if( event ) {
      event.forEach(fn => {
        fn.call(null, data);
      });
    }
  }
}
