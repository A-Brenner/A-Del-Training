export module questionModule {
  export class Question {
    questionNo: number;
    question: string;
    choices: string[];
    answer: number; // index within choices array
    constructor(
      questionNo: number,
      question: string,
      choices: string[],
      answer: number
    ) {
      this.questionNo = questionNo;
      this.question = question;
      this.choices = choices;
      this.answer = answer;
    }
  }
}
