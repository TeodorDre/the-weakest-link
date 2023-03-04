export enum LocalStorageKey {
  AuthToken = 'auth.token',
  Role = 'game.role',
}

export type LocalStorageValue<T = any> = {
  value: T;
  expires?: number;
};
