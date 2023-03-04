import { ApplicationError } from './application-error';

export class UnexpectedComponentStateError extends ApplicationError {
  public readonly name = 'UnexpectedComponentStateError';

  constructor(public readonly property: string) {
    super(`Expected ${property} to be defined`);
  }
}
