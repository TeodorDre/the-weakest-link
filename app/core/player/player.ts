export enum PlayerRole {
  Host,
  Player,
  Watcher,
}

export interface IPlayer {
  role: PlayerRole;
}
