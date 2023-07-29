import * as PIXI from 'pixi.js';
import * as PIXISound from '@pixi/sound';

import mainLoopBackgroundSound from '@/assets/audio/main_loop_background.mp3';
import firstRoundStart from '@/assets/audio/first_round_short.mp3';
import roundBackground from '@/assets/audio/round_background.mp3';
import endRoundShort from '@/assets/audio/end_round_short.mp3';

import playersVotingBackground from '@/assets/audio/players_voting_background.mp3';
import playersVotedShort from '@/assets/audio/players_voted_short.mp3';
import playerKickedBackground from '@/assets/audio/player_kicked_background.mp3';

import preFinalRoundBackground from '@/assets/audio/90_sec_round_background.mp3';

import finalRoundStart from '@/assets/audio/final_round_start.mp3';
import finalRoundPlayersBackground from '@/assets/audio/final_round_background.mp3';
import finalRoundEnd from '@/assets/audio/final_round_end.mp3';

import playerWonBackground from '@/assets/audio/player_won_background.mp3';

type GameAudioType =
  'mainLoopBackground' |
  'firstRoundStart' |
  'roundBackground' |
  'endRoundShort' |
  'playersVotingBackground' |
  'playerKickedBackground' |
  'preFinalRoundBackground' |
  'finalRoundStart' |
  'finalRoundPlayersBackground' |
  'finalRoundEnd' |
  'playerWonBackground' | 'playersVotedShort'

class GameSoundController {
  public mainLoopBackground: PIXISound.Sound;
  public firstRoundStart: PIXISound.Sound;
  public roundBackground: PIXISound.Sound;
  public endRoundShort: PIXISound.Sound;

  public playersVotingBackground: PIXISound.Sound;
  public playersVotedShort: PIXISound.Sound;
  public playerKickedBackground: PIXISound.Sound;

  public preFinalRoundBackground: PIXISound.Sound;

  public finalRoundStart: PIXISound.Sound;
  public finalRoundPlayersBackground: PIXISound.Sound;
  public finalRoundEnd: PIXISound.Sound;

  public playerWonBackground: PIXISound.Sound;

  constructor() {
    this.mainLoopBackground = PIXISound.Sound.from(mainLoopBackgroundSound);
    this.firstRoundStart = PIXISound.Sound.from(firstRoundStart);
    this.roundBackground = PIXISound.Sound.from(roundBackground);
    this.endRoundShort = PIXISound.Sound.from(endRoundShort);

    this.playersVotingBackground = PIXISound.Sound.from(playersVotingBackground);
    this.playersVotedShort = PIXISound.Sound.from(playersVotedShort);
    this.playerKickedBackground = PIXISound.Sound.from(playerKickedBackground);

    this.preFinalRoundBackground = PIXISound.Sound.from(preFinalRoundBackground);

    this.finalRoundStart = PIXISound.Sound.from(finalRoundStart);
    this.finalRoundPlayersBackground = PIXISound.Sound.from(finalRoundPlayersBackground);
    this.finalRoundEnd = PIXISound.Sound.from(finalRoundEnd);

    this.playerWonBackground = PIXISound.Sound.from(playerWonBackground);
  }
}

export default class AudioService {
  private readonly _core: PIXI.Application;
  private resources: Record<string, PIXI.LoaderResource> = {};
  public audioController: GameSoundController;
  public currentAudio: PIXISound.Sound;

  constructor() {
    // Выставляем разрешение сцены (берем текущее значение ретины)
    // И включаем сглаживание, к черту эти лесенки.
    this._core = new PIXI.Application({ resolution: 1, antialias: true, backgroundColor: 0xcecece });
  }

  public get core() {
    return this._core;
  }

  public play(type: GameAudioType, stopCurrent = true) {
    if (this.currentAudio && stopCurrent) {
      this.currentAudio.stop();
    }

    this.currentAudio = this.audioController[type];
    this.currentAudio.play({ loop: false });
  }

  public async init() {
    this.core.loader.add('mainLoopBackground', mainLoopBackgroundSound);
    this.core.loader.add('firstRoundStart', firstRoundStart);
    this.core.loader.add('roundBackground', roundBackground);
    this.core.loader.add('endRoundShort', endRoundShort);

    this.core.loader.add('playersVotingBackground', playersVotingBackground);
    this.core.loader.add('playersVotedShort', playersVotedShort);
    this.core.loader.add('playerKickedBackground', playerKickedBackground);

    this.core.loader.add('preFinalRoundBackground', preFinalRoundBackground);

    this.core.loader.add('finalRoundStart', finalRoundStart);
    this.core.loader.add('finalRoundPlayersBackground', finalRoundPlayersBackground);
    this.core.loader.add('finalRoundEnd', finalRoundEnd);

    this.core.loader.add('playerWonBackground', playerWonBackground);

    // Мы также можем получать текущий прогресс загрузки ресурсов (например, чтобы красиво выводить его юзеру)
    this.core.loader.onProgress.add((data) => {
      const currentPercentProgress = data.progress;

      console.log(`Current progress: ${currentPercentProgress}% .`);
    });

    return new Promise<void>((resolve) => {
      this.core.loader.load(async (_, resources) => {
        // Ок, загрузились - теперь нас ничто не остановит чтобы начать рисовать!
        this.doInit(resources);
        resolve();
      });
    });
  }

  private doInit(resourcesDict: Record<string, PIXI.LoaderResource | undefined>): void {
    this.audioController = new GameSoundController();

    Object.values(resourcesDict)
      .forEach((resource) => {
        if (!resource) {
          return;
        }

        // Если какой-то из ресурсов не загрузился, то мы можем посмотреть какой именно, и почему.
        // По хорошему надо бы об этом сообщить юзеру, так как текстуры для на всегда критичны.
        if (resource.error) {
          console.log(`${resource.name} wasn't loaded due error: ${resource.error.message}`);
        }

        if (!resource.error) {
          this.resources[resource.name] = resource;
        }
      });

    this.start();
  }

  private async start() {
    this.audioController.mainLoopBackground.play({ loop: true });
    this.currentAudio = this.audioController.mainLoopBackground;
  }
}
