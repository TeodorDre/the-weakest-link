import { IDisposable, Disposable } from '@/base/lifecycle';
import { EventEmitter } from '@/base/event-emitter';
import { isUndefinedOrNull } from '@/base/std';
import { ApplicationError } from '@/code/errors/application-error';

/* eslint-disable @typescript-eslint/no-explicit-any */

export enum LogLevel {
  Trace,
  Debug,
  Info,
  Warning,
  Error,
  Critical,
  Off,
}

interface ILogMessageOptions {
  levelStr: string;
  css: string;
  message: string;
  args: any[];
}

export interface ILogger {
  setLevel(level: LogLevel): void;

  getLevel(): LogLevel;

  trace(message: string, ...args: any[]): void;

  debug(message: string, ...args: any[]): void;

  info(message: string, ...args: any[]): void;

  warn(message: string, ...args: any[]): void;

  error(message: string, ...args: any[]): void;

  critical(message: string, ...args: any[]): void;
}

export class LogMessage extends Disposable {
  public readonly date = Date.now();

  constructor(
    public readonly levelStr: string,
    public readonly css: string,
    public readonly message: string,
    public readonly args: any[],
  ) {
    super();
  }

  public [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): unknown {
    if (hint === 'string') {
      return this.toString();
    }

    return true;
  }

  public toString(): string {
    return this.message;
  }

  public log(): void {
    const { levelStr, css, message, args } = this;
    console.log(levelStr, css, message, ...args);
  }
}

interface LoggerEventMap {
  'message': LogMessage;
}

class LogBuffer extends Disposable {
  private _buffer: LogMessage[] = [];
  private readonly _MAX_BUFFER_SIZE: number = 200;

  constructor() {
    super();
  }

  public add(log: LogMessage): void {
    if (this._buffer.length >= this._MAX_BUFFER_SIZE) {
      this._buffer.shift();
    }

    this._buffer.push(log);
  }

  public get messages(): LogMessage[] {
    return this._buffer;
  }

  private clear(): void {
    this._buffer = [];
  }

  public dispose() {
    this.clear();
  }
}

class Logger implements ILogger {
  #level: LogLevel = LogLevel.Info;
  readonly #emitter: EventEmitter<LoggerEventMap> = new EventEmitter<LoggerEventMap>();
  readonly #buffer: LogBuffer = new LogBuffer();

  public setLevel(level: LogLevel): void {
    if (isUndefinedOrNull(level)) {
      throw new ApplicationError('AbstractLogService#setLevel - no log level provided');
    }

    if (this.#level !== level) {
      this.#level = level;
      this.doCreateLogMessage({
        levelStr: '%c INFO',
        css: 'color: #33f',
        message: `Log level was change to: ${LogLevel[level]}`,
        args: [],
      });
    }
  }

  public subscribe(callback: (log: LogMessage) => void): IDisposable {
    const disposable = this.#emitter.on('message', callback);
    this.logExistBuffer();

    return disposable;
  }

  public getLevel(): LogLevel {
    return this.#level;
  }

  constructor(logLevel: LogLevel = LogLevel.Off) {
    this.setLevel(logLevel);
  }

  public trace(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Trace) {
      this.doCreateLogMessage({
        levelStr: '%c TRACE',
        css: 'color: #888',
        message,
        args,
      });
    }
  }

  public debug(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Debug) {
      this.doCreateLogMessage({
        levelStr: '%c DEBUG',
        css: 'background: #eee; color: #888',
        message,
        args,
      });
    }
  }

  public info(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Info) {
      this.doCreateLogMessage({
        levelStr: '%c INFO',
        css: 'color: #33F',
        message,
        args,
      });
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Warning) {
      this.doCreateLogMessage({
        levelStr: '%c WARN',
        css: 'color: #993',
        message,
        args,
      });
    }
  }

  public error(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Error) {
      this.doCreateLogMessage({
        levelStr: '%c ERR',
        css: 'color: #f33',
        message,
        args,
      });
    }
  }

  public critical(message: string, ...args: any[]): void {
    if (this.getLevel() <= LogLevel.Critical) {
      this.doCreateLogMessage({
        levelStr: '%c CRITI',
        css: 'background: #f33; color: white',
        message,
        args,
      });
    }
  }

  private logExistBuffer(): void {
    this.#buffer.messages
      .forEach(
        (msg) => this.#emitter.emit('message', msg),
      );
  }

  private doCreateLogMessage(options: ILogMessageOptions): void {
    const { levelStr, css, message, args } = options;

    const logMessage = new LogMessage(
      levelStr,
      css,
      message,
      args,
    );

    this.#buffer.add(logMessage);
    logMessage.log();

    this.#emitter.emit('message', logMessage);
  }
}

export default new Logger();
