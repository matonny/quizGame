interface IAnswer {
    readonly answer: string;
    readonly id: number;
  }
interface IQuestion {
    readonly allAnswers: IAnswer[];
    readonly questionText: string;
    readonly correctAnswer: string;
    readonly id: number;
  }

export {IAnswer, IQuestion};