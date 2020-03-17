// Angular
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';

// Services
import { TranslateService } from 'src/app/services/translate.service';
import { NavbarItem } from 'src/app/models/navbar-item';
@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  public navBarItems: NavbarItem[] = [];
  constructor(private translateService: TranslateService, public dialog: MatDialog, private router: Router) {
    if (this.translateService.guest.audioLanguage === '') {
      this.goto('choice');
    }
    this.setNavBar();
  }

  public goto(where: string): void {
    this.router.navigate([where]);
  }

  public setNavBar(): void {
    this.navBarItems = [
      {
        icon: 'assets/icons/icon-languages-black.svg',
        infoTitle: 'LANGUES',
        link: 'choice',
        isDisplayed: true
      },
      {
        icon: 'assets/icons/icon-chat-black.svg',
        infoTitle: 'HISTORIQUE',
        link: 'conversation',
        isDisplayed: true
      },
      {
        icon: 'assets/icons/icon-settings-black.svg',
        infoTitle: 'PARAMÈTRES',
        link: 'settings/translation',
        isDisplayed: true
      }
    ];
  }

  /**
   * Close conversation and redirection to rate page
   */
  public closeConversation() {
    this.goto('rate');
  }

  // /**
  //  * This function is called when the speaker wants to talk
  //  */
  // public async talk(user: string): Promise<void> {
  //   // Check if the microphone is enabled
  //   if (!this.permissionsService.isAllowed) {
  //     try {
  //       this.permissionsService.isAllowed = await this.permissionsService.check();
  //     } catch (error) {
  //       this.toastService.showToast("L'accès au microphone n'est pas autorisé.");
  //     }
  //   }

  //   if (this.permissionsService.isAllowed) {
  //     // Set the language
  //     const lang = user === 'advisor' ? this.translateService.advisor : this.translateService.guest.writtenLanguage;

  //     // If the user is not speaking
  //     if (!this.isTalking) {
  //       this.speechData = '';
  //       this.isStopTalking = false;

  //       // Change Mic button
  //       this.isTalking = !this.isTalking;

  //       // Start audio recording
  //       await this.audioRecordingService.record('start');

  //       // Start Speech Recognition
  //       this.speechRecognitionService.record(lang).subscribe(
  //         // listener
  //         value => {
  //           this.error = false;
  //           this.speechData = value;
  //         },
  //         // error
  //         err => {
  //           console.log(err);
  //           if (err.error === 'no-speech') {
  //             console.log('Erreur');
  //             this.error = true;
  //           }
  //         },
  //         // completion
  //         () => {
  //           console.log('Complete');
  //           setTimeout(() => {
  //             if (this.inProgress) {
  //               this.isStopTalking = true;
  //             }
  //           }, 3000);
  //         }
  //       );
  //     } else {
  //       // Change Mic button
  //       this.isTalking = !this.isTalking;

  //       // Display progressive spinner
  //       this.inProgress = true;

  //       // Stop audio recording
  //       await this.audioRecordingService.record('stop');

  //       const end = setInterval(() => {
  //         if (this.speechData !== '') {
  //           this.translate(this.speechData, user);
  //           clearInterval(end);
  //         } else if (!this.isTalking && !this.inProgress) {
  //           clearInterval(end);
  //         } else if (this.speechData === '' && !this.isTalking && this.isStopTalking) {
  //           this.inProgress = false;
  //           this.isStopTalking = false;
  //           this.toastService.showToast('Erreur, veuillez réessayer');
  //           clearInterval(end);
  //         }
  //       }, 100);

  //       this.speechRecognitionService.DestroySpeechObject();
  //     }
  //   } else {
  //     this.toastService.showToast('L\'accès au microphone n\'est pas autorisé.');
  //   }
  // }

  // /**
  //  * This function is called to translate data from keyboard
  //  */
  // public translateFromKeyboard(user: string) {
  //   if (this.keyboardData !== '') {
  //     this.translate(this.keyboardData, user);
  //   }
  // }

  // /**
  //  * This function is called when a user want to listen the speaker
  //  */
  // public listen(user: string): void {
  //   this.isListening = !this.isListening;

  //   if (this.speechData !== '' && !this.isKeyboardActivated) {
  //     if (this.isListening) {
  //       this.audioRecordingService.audioSpeech.play();

  //       const end = setInterval(() => {
  //         if (this.audioRecordingService.audioSpeech === undefined) {
  //           this.isListening = false;
  //           clearInterval(end);
  //         } else {
  //           if (this.audioRecordingService.audioSpeech.paused) {
  //             this.isListening = false;
  //             clearInterval(end);
  //           }
  //         }
  //       }, 10);
  //     } else {
  //       this.audioRecordingService.audioSpeech.pause();
  //       this.audioRecordingService.audioSpeech.currentTime = 0;
  //     }
  //   } else if (this.keyboardData !== '' && this.textToSpeechService.keyboardSpeech !== undefined) {
  //     if (this.isListening) {
  //       this.textToSpeechService.keyboardSpeech.play();

  //       const end = setInterval(() => {
  //         if (this.textToSpeechService.keyboardSpeech.paused) {
  //           this.isListening = false;
  //           clearInterval(end);
  //         }
  //       }, 10);
  //     } else {
  //       // Stop the audio
  //       this.textToSpeechService.keyboardSpeech.pause();
  //       this.textToSpeechService.keyboardSpeech.currentTime = 0;
  //     }
  //   } else if (this.keyboardData !== '' && this.keyboardAudioFailed) {
  //     // tslint:disable-next-line: quotemark
  //     this.toastService.showToast("La version audio n'est pas disponible dans cette langue.");
  //     this.isListening = false;
  //   } else {
  //     this.isListening = false;
  //   }
  // }

  // /**
  //  * This function is called when someone want to listen the translation
  //  */
  // public listenTranslation() {
  //   // If the translated speech is ready to be listening
  //   if (this.isTranslatedSpeechReady) {
  //     // Change the icon of the button
  //     this.isTranslationListening = !this.isTranslationListening;

  //     // If the audio hasn't start yet
  //     if (this.isTranslationListening) {
  //       this.textToSpeechService.audioSpeech.play(); // HERE

  //       // Check when the audio is ended
  //       const end = setInterval(() => {
  //         if (this.textToSpeechService.audioSpeech.paused || this.textToSpeechService.audioSpeech === undefined) {
  //           // Change the icon of the button
  //           this.isTranslationListening = false;
  //           clearInterval(end);
  //         }
  //       }, 10);
  //     } else {
  //       // Stop the audio
  //       this.textToSpeechService.audioSpeech.pause(); // HERE
  //       this.textToSpeechService.audioSpeech.currentTime = 0;
  //     }
  //   } else if (this.audioTranslationFailed) {
  //     // tslint:disable-next-line: quotemark
  //     this.toastService.showToast("L'audio n'est pas accessible suite à un problème technique.", 5000);
  //   } else {
  //     console.log('NOT READY');
  //   }
  // }

  // /**
  //  * Simulate meeting and return to choice
  //  */
  // public meeting(): void {
  //   this.dialog
  //     .open(MeetingComponent, {
  //       width: '800px'
  //     })
  //     .afterClosed()
  //     .subscribe(response => {
  //       if (response === 'saved') {
  //         this.goto('rate');
  //       }
  //     });
  // }

  // /**
  //  * Enable or disable the abality to use the keyboard instead of the voice.
  //  */
  // public activateKeyboard(): void {
  //   this.isKeyboardActivated = !this.isKeyboardActivated;
  //   this.navBarItems[1].icon = this.isKeyboardActivated ? 'mic' : 'keyboard';
  //   this.navBarItems[1].infoTitle = this.isKeyboardActivated ? 'Activer le micro' : 'Activer le clavier';
  // }

  // public onPressEnter(event, user): void {
  //   if (event.which === this.enterKey || event.keyCode === this.enterKey) {
  //     this.keyboardData = event.currentTarget.value;
  //     this.translate(this.keyboardData, user);
  //   }
  // }

  // /**
  //  * This function is called to send data as text to translation
  //  */
  // private translate(text: string, user: string): void {
  //   // Activate the spinner
  //   this.inProgress = true;

  //   // Send the text to translation
  //   this.translateService.translate(text, user).subscribe(res => {
  //     // Set the language
  //     const lang = user === 'guest' ? this.translateService.advisor : this.translateService.guest.audioLanguage;

  //     // If no error
  //     if (res !== undefined) {
  //       this.speechTranslated = res;
  //       this.historyService.addMessage(user !== 'guest', text, this.speechTranslated);

  //       // Send speech as text to audio conversion
  //       this.textToSpeechService
  //         .getSpeech(this.speechTranslated, lang, user, false)
  //         .then(response => {
  //           if (response) {
  //             // Translated speech is ready to be listening
  //             this.isTranslatedSpeechReady = true;
  //             this.audioTranslationFailed = false;
  //             if (this.settingsService.audio) {
  //               this.listenTranslation();
  //             }
  //           } else {
  //             // Audio translation has failed
  //             this.audioTranslationFailed = true;
  //           }
  //         })
  //         .catch(error => {
  //           console.log('Erreur : ', error);
  //         });
  //     } else {
  //       // If error, display this message
  //       this.toastService.showToast('Erreur, veuillez réessayer');
  //       this.speechTranslated = 'Erreur, veuillez réessayer';
  //     }
  //     // Set translated variable to true
  //     this.translated = true;

  //     // Hide the spinner
  //     this.inProgress = false;
  //   }, (error) => {
  //     // Display Error in toast
  //     this.toastService.showToast(error);

  //     // Hide the spinner
  //     this.inProgress = false;
  //   });

  //   if (this.isKeyboardActivated) {
  //     // Set the language
  //     const lang = user === 'advisor' ? this.translateService.advisor : this.translateService.guest.audioLanguage;

  //     // Send keyboardData to audio conversion
  //     this.textToSpeechService
  //       .getSpeech(this.keyboardData, lang, user, true)
  //       .then(response => {
  //         if (response) {
  //           // Translated speech is ready to be listening
  //           this.isKeyboardSpeechReady = true;
  //           this.keyboardAudioFailed = false;
  //         } else {
  //           // Audio translation has failed
  //           this.keyboardAudioFailed = true;
  //         }
  //       })
  //       .catch(error => {
  //         console.log('Erreur : ', error);
  //       });
  //   }
  // }

  // /**
  //  * Reset the data when user is switched
  //  */
  // public changeUser(event: MatTabChangeEvent) {
  //   this.keyboardData = '';
  //   this.speechData = '';
  //   this.speechTranslated = '';
  //   this.textToSpeechService.audioSpeech = undefined;
  //   this.textToSpeechService.keyboardSpeech = undefined;
  //   this.audioTranslationFailed = false;
  //   this.keyboardAudioFailed = false;
  //   this.isAdvisorTurn = !this.isAdvisorTurn;
  // }

  // /**
  //  * Get the translation for a specific word or sentence
  //  */
  // public getWordTranslation(user: string, word: string): string {
  //   const lang: string = user === 'advisor' ? this.translateService.advisor : this.translateService.guest.writtenLanguage;

  //   const element = this.titles.find(title => title.value === lang);
  //   if (element === undefined) {
  //     return 'TODO';
  //   }

  //   if (word === 'request') {
  //     return VOCABULARY.find(v => v.isoCode === lang).words.request;
  //   }

  //   if (word === 'translation') {
  //     return VOCABULARY.find(v => v.isoCode === lang).words.translate;
  //   }
  // }

  // /**
  //  * Allow user to switch interface
  //  */
  // public disableSwitch(): boolean {
  //   if (this.isListening) {
  //     return true;
  //   } else if (this.isTranslationListening) {
  //     return true;
  //   } else if (this.inProgress) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
