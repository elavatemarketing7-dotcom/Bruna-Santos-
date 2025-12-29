
export enum ViewState {
  INITIAL = 'INITIAL',
  QUIZ = 'QUIZ',
  RESULT = 'RESULT',
  MAIN = 'MAIN'
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface UserAnswers {
  [key: number]: string;
}
