export enum GameQuestionType {
  Opened = 'opened',
  WithMultipleVariants = 'closed'
}

export interface IGameSimpleQuestion {
  question_type: GameQuestionType;
  question_text: string;
  question_answer: string;
  question_answer_variants: string[];
}
