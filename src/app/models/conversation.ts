interface Conversation {
  id: string;
  startDate: Date | any;
  endDate?: Date | any;
  advisor: User;
  guest: User;
  conversation: Message[];
}