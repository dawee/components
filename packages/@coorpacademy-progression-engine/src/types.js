// @flow

export type Step = {
  current: number,
  total: number
};

export type GenericContent = {
  ref: string,
  type: string,
  version?: string
};

export type ResourceContent = {
  ref: string,
  type: 'resource',
  chapter_ref: string,
  version?: string
};

export type Content = GenericContent | ResourceContent;

export type State = {
  content?: Content,
  nextContent: Content,
  lives: number,
  isCorrect: boolean,
  slides: Array<string>,
  requestedClues: Array<string>,
  viewedResources: Array<string>,
  stars: number,
  step: Step
};

export type AskClueAction = {
  type: 'clue',
  payload: {
    content: Content
  }
};

export type ChapterResourceViewedAction = {
  type: 'resource',
  payload: {
    content: ResourceContent
  }
};

export type AnswerAction = {
  type: 'answer',
  payload: {
    content: Content,
    nextContent: Content,
    isCorrect: boolean
  }
};

export type InitAction = {
  type: 'init'
};

export type Action = InitAction | AnswerAction | AskClueAction | ChapterResourceViewedAction;

export type Engine = {
  ref: string,
  version: string
};

export type Progression = {
  content: Content,
  initialState: State,
  state: State,
  actions: Array<Action>,
  engine: Engine
};

export type Answer = Array<string>;
export type AcceptedAnswers = Array<Answer>;

export type QCMQuestion = {
  type: 'qcm' | 'qcmDrag',
  content: {
    answers: AcceptedAnswers
  }
};

export type BasicQuestion = {
  type: 'basic',
  content: {
    maxTypos?: ?number,
    answers: AcceptedAnswers
  }
};

export type UnknownQuestion = {
  type: 'unknown',
  content: {
    answers: AcceptedAnswers
  }
};

export type Question = QCMQuestion | BasicQuestion | UnknownQuestion;

export type Slide = {
  _id: string,
  chapter_id: string,
  question: Question
};

export type MicroLearningConfig = {
  version: string,
  lives: number,
  maxTypos: number,
  slidesToComplete: number,
  answerBoundaryLimit: number,
  starsPerAskingClue: number,
  starsPerCorrectAnswer: number,
  starsPerResourceViewed: number
};

export type Config = MicroLearningConfig;
