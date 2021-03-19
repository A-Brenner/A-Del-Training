export module sectionModule {
  export class Section {
    sectionNo: number;
    sectionName: string;
    completed: boolean;
    link: string;
    constructor(
      sectionNo: number,
      sectionName: string,
      completed: boolean,
      link: string
    ) {
      this.sectionNo = sectionNo;
      this.sectionName = sectionName;
      this.completed = completed;
      this.link = link;
    }
  }
}
