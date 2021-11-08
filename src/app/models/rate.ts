export interface Rate {
  grades?: number[];
  language: string;
  comment?: string;
  offerLinked: string;
  date: Date;
  hour: string;
  conversationDuration: string;
  typeEntretien: string;
  nbMessagesAdvisor: number;
  nbMessagesGuest: number;
  user: string;
  agency: string;
  cloudSTT: string;
}
