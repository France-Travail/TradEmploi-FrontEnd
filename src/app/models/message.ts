export interface Message {
  id: number;
  isAdvisorMessage: boolean;
  time: Date | any;
  message: {
    raw: string;
    translation: string
  }
}