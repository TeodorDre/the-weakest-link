import mockQuestions from '@/mocks/simple-questions.json';
import { Disposable } from '@/base/lifecycle';
import { nanoid } from 'nanoid';
import { getRandomElement } from '@/base/array';
import { ApplicationError } from '@/code/errors/application-error';

export enum GameQuestionType {
  Opened = 'opened',
  WithMultipleVariants = 'closed'
}

export interface IGameSimpleQuestion {
  question_type: GameQuestionType;
  question_text: string;
  question_answer: string;
  question_answer_variants: string[];
  id: string;
}

export class QuestionStorageError extends ApplicationError {
  public readonly name = 'QuestionStorageError';
}

export const MOCK_QUESTIONS = mockQuestions as unknown as IGameSimpleQuestion[];

class QuestionStorage extends Disposable {
  private readonly questions: IGameSimpleQuestion[];

  private readonly excludedQuestionIds = new Set<string>();

  constructor() {
    super();

    this.questions = MOCK_QUESTIONS.map((question) => ({
      ...question,
      id: nanoid(5),
    }))
  }

  public getRandomQuestion(): IGameSimpleQuestion {
    const question = getRandomElement(this.questions);

    if (!question) {
      throw new QuestionStorageError('question expect to be defined');
    }

    if (this.excludedQuestionIds.size === this.questions.length) {
      throw new QuestionStorageError('All questions are asked');
    }

    if (this.excludedQuestionIds.has(question.id)) {
      return this.getRandomQuestion();
    }

    this.excludedQuestionIds.add(question.id);

    return question;
  }
}

export const questionStorage = new QuestionStorage();
