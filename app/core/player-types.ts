export enum PlayerRole {
  Host = 1,
  Player = 2,
  Watcher = 3,
}

export interface IPlayer {
  name: string;
  id: string;
  role: PlayerRole;
}
