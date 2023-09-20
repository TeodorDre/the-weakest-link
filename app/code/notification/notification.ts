export enum NotificationLevel {
  Ignore = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
  Success,
}

export type NotificationPosition = 'top' | 'bottom';

export interface IBaseNotification {
  level: NotificationLevel;
  message: string | Error;
  position?: NotificationPosition;
  action?: VoidFunction;
  hideTimeoutMs?: number;
}

export interface ISimpleNotification extends IBaseNotification {
  id: string;
}
