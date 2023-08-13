import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { INotificationData } from 'types/types.dict';

interface Event {
  name: string;
  data: any;
}

class EventListener<T> {
  private eventSubject: Subject<Event>;

  constructor(private eventName: string) {
    this.eventSubject = new Subject<Event>();
  }

  public subscribe(callback: (data: T) => void): Subscription {
    return this.eventSubject
      .pipe(
        filter((event) => event.name === this.eventName),
        map((event) => event.data)
      )
      .subscribe(callback);
  }

  public unsubscribe(subscription: Subscription): void {
    subscription.unsubscribe();
  }

  public emit(data: T): void {
    this.eventSubject.next({ name: this.eventName, data });
  }
}

const eventListeners: { [key: string]: EventListener<any> } = {};

export function createEventListener<T>(eventName: string): EventListener<T> {
  if (!eventListeners[eventName]) {
    eventListeners[eventName] = new EventListener<T>(eventName);
  }
  return eventListeners[eventName];
}

export function sendNotification(
  eventName: string,
  data: INotificationData
): void {
  if (eventListeners[eventName]) {
    eventListeners[eventName].emit(data);
  }
}

// Создаем слушателя события "notification"
// const notificationListener = createEventListener<string>('notification');

// // Подписываемся на событие "notification" и обрабатываем полученные данные
// const subscription = notificationListener.subscribe((data) => {
//   console.log('Получено уведомление:', data);
// });

// // Отправляем уведомление
// sendNotification('notification', 'Привет, мир!');

// // Отписываемся от события "notification"
// notificationListener.unsubscribe(subscription);
