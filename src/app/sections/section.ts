export module sectionModule {
  export class Section {
    sectionNo: number;
    sectionName: string;
    completed: boolean;
    link: string;
    videoWatched: boolean;
    constructor(
      sectionNo: number,
      sectionName: string,
      completed: boolean,
      link: string,
      videoWatched: boolean
    ) {
      this.sectionNo = sectionNo;
      this.sectionName = sectionName;
      this.completed = completed;
      this.link = link;
      this.videoWatched = videoWatched;
    }
  }
}
