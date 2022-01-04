// Angular
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Firebase
import { AngularFirestore } from '@angular/fire/firestore';

// Models
import { Conversation } from '../models/history/conversation';
import { User } from '../models/user';
import { Message } from '../models/history/message';


@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  public conversation: Conversation; // Where the conversation is stored
  private readonly db = 'conversations'; // The collection's name
  private messageId = 1;

  constructor(private readonly afs: AngularFirestore) {}

  /**
   * Add the message into the conversation for the speaker
   */
  public addMessage(isAdvisorMessage: boolean, rawMessage: string, translatedMessage: string): void {
    const message: Message = {
      id: this.messageId,
      isAdvisorMessage,
      time: new Date(),
      message: {
        raw: rawMessage,
        translation: translatedMessage
      }
    };
    this.conversation.conversation.push(message);
    this.messageId++;
  }

  /**
   * Initiate Conversation when is started
   */
  public startConversation(advisor: User, guest: User): void {
    // Reset the ID for the conversation messages
    this.resetMessageId();

    // Set the conversation Object
    this.conversation = {
      id: this.afs.createId(),
      startDate: new Date(),
      advisor,
      guest,
      conversation: []
    };
  }

  /**
   * This function is called when a new conversation is started
   */
  public resetMessageId() {
    this.messageId = 1;
  }

  /**
   * Save the conversation into Cloud Firestore
   */
  public saveConversation(): Promise<void> {
    this.conversation.endDate = new Date();
    return this.afs
      .collection(this.db)
      .doc<Conversation>(this.conversation.id)
      .set(this.conversation);
  }

  /**
   * Get All the conversation
   */
  public getConversations(): Observable<Conversation[]> {
    return this.afs.collection<Conversation>(this.db).valueChanges();
  }

  /**
   * Get conversation for today only
   */
  public getConversationForToday(): Observable<Conversation[]> {
    const date: Date = new Date();
    const first = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);

    return this.afs
      .collection<Conversation>(this.db, ref => ref.where('startDate', '>=', first))
      .valueChanges();
  }

  /**
   * Delete a conversation by ID
   */
  public deleteById(id: string): Promise<void> {
    return this.afs
      .collection(this.db)
      .doc<Conversation>(id)
      .delete();
  }
}
