interface Answer {
    readonly answer: string;
    readonly id: number;
  }
interface Question {
    readonly allAnswers: Answer[];
    readonly questionText: string;
    readonly correctAnswer: string;
    readonly id: number;
  }

export {Answer, Question};