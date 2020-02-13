// Angular
import { Component } from '@angular/core';
import { MatTabChangeEvent, MatDialog } from '@angular/material';
import { Router } from '@angular/router';

// Services
import { TranslateService } from 'src/app/services/translate.service';
import { SpeechRecognitionService } from 'src/app/services/speech-recognition.service';
import { AudioRecordingService } from 'src/app/services/audio-recording.service';
import { TextToSpeechService } from 'src/app/services/text-to-speech.service';
import { ToastService } from 'src/app/services/toast.service';
import { HistoryService } from 'src/app/services/history.service';
import { MeetingComponent } from './dialogs/meeting/meeting.component';
import { PermissionsService } from 'src/app/services/permissions.service';
import { SettingsService } from 'src/app/services/settings.service';

// Models
import { NavbarItem } from 'src/app/models/navbar-item';

// Data
import { VOCABULARY } from 'src/app/data/vocabulary';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.scss']
})
export class TranslationComponent {
  // Number
  public speaker: number = 0;
  public enterKey: number = 13;

  // Boolean
  public isAdvisorTurn: boolean = true; // True if the interface is advisor one
  public isTalking: boolean = false; // True if the user is talking
  public isKeyboardActivated: boolean = false; // True if the user has activate the keyboard mode
  public isListening: boolean = false; // True if the user is listening what he just said
  public isTranslationListening: boolean = false; // True if the user is listening the translation
  public translated: boolean = false; // True when the text is translated
  public inProgress: boolean = false; // True when the translation is in progress
  public error: boolean = false; // True if there is an error
  public isStopTalking: boolean = false; // True when the user stop talking
  public isTranslatedSpeechReady: boolean = false; // True when the audio of the translated text is ready to be listen
  public audioTranslationFailed: boolean = false; // True when the application couldn't get audio from text
  public isKeyboardSpeechReady: boolean = false; // True when the keyboard audio is ready to be listen
  public keyboardAudioFailed: boolean = false; // True when the application couldn't get audio from keyboard

  // String
  public keyboardData: string = '';
  public speechData: string = '';
  public speechTranslated: string = '';

  // Array
  public titles: { displayedValue: { translation: string; request: string }; value: string }[] = [
    { displayedValue: { translation: 'Traduction', request: 'Votre demande :' }, value: 'fr-FR' }, // Français
    { displayedValue: { translation: 'Translation', request: 'Your request:' }, value: 'en-GB' }, // Anglais
    { displayedValue: { translation: 'Übersetzung', request: 'Ihre Anfrage:' }, value: 'de-DE' }, // Allemand
    { displayedValue: { translation: 'traducción', request: 'Su solicitud :' }, value: 'ca-ES' }, // Espagnol
    { displayedValue: { translation: 'ترجمة', request: 'طلبك :' }, value: 'ar-DZ' }, // Arabe
    { displayedValue: { translation: '翻译', request: '您的要求：' }, value: 'zh-ZH' }, // Chinois
    { displayedValue: { translation: 'tradução', request: 'O seu pedido:' }, value: 'pt-PT' }, // Portugais
    { displayedValue: { translation: 'перевод', request: 'Ваш запрос:' }, value: 'ru-RU' } // Russe
  ];

  public navBar: NavbarItem[] = [];

  constructor(
    private translateService: TranslateService,
    private speechRecognitionService: SpeechRecognitionService,
    private audioRecordingService: AudioRecordingService,
    private textToSpeechService: TextToSpeechService,
    private toastService: ToastService,
    private historyService: HistoryService,
    private settingsService: SettingsService,
    private permissionsService: PermissionsService,
    public dialog: MatDialog,
    private router: Router
  ) {
    if (this.translateService.guest.audioLanguage === '') {
      this.goto('choice');
    }
    this.setNavBar();
  }

  /**
   * Redirect to a page
   */
  public goto(where: string): void {
    this.router.navigate([where]);
  }

  public handleAction(event: any): void {
    event.call(this);
  }

  public setNavBar(): void {
    this.navBar = [
      {
        icon: 'home',
        infoTitle: 'Changer la langue',
        link: 'choice',
        isDisplayed: true
      },
      {
        icon: this.isKeyboardActivated ? 'mic' : 'keyboard',
        infoTitle: this.isKeyboardActivated ? 'Activer le micro' : 'Activer le clavier',
        action: this.activateKeyboard,
        isDisplayed: true
      },
      {
        icon: 'date_range',
        infoTitle: 'Prendre un RDV',
        action: this.meeting,
        isDisplayed: true
      },
      {
        icon: 'speaker_notes',
        infoTitle: 'Historique',
        link: 'conversation',
        isDisplayed: true
      },
      {
        icon: 'settings',
        infoTitle: 'Paramètres',
        link: 'settings/translation',
        isDisplayed: true
      }
    ];
  }

  /**
   * This function is called when the speaker wants to talk
   */
  public async talk(user: string): Promise<void> {
    // Check if the microphone is enabled
    if (!this.permissionsService.isAllowed) {
      try {
        this.permissionsService.isAllowed = await this.permissionsService.check();
      } catch (error) {
        this.toastService.showToast('L\'accès au microphone n\'est pas autorisé.');
      }
    }

    if (this.permissionsService.isAllowed) {
      // Set the language
      const lang = user === 'advisor' ? this.translateService.advisor : this.translateService.guest.writtenLanguage;

      // If the user is not speaking
      if (!this.isTalking) {
        this.speechData = '';
        this.isStopTalking = false;

        // Change Mic button
        this.isTalking = !this.isTalking;

        // Start audio recording
        await this.audioRecordingService.record('start');

        // Start Speech Recognition
        this.speechRecognitionService.record(lang).subscribe(
          // listener
          value => {
            this.error = false;
            this.speechData = value;
          },
          // error
          err => {
            console.log(err);
            if (err.error === 'no-speech') {
              console.log('Erreur');
              this.error = true;
            }
          },
          // completion
          () => {
            console.log('Complete');
            setTimeout(() => {
              if (this.inProgress) {
                this.isStopTalking = true;
              }
            }, 3000);
          }
        );
      } else {
        // Change Mic button
        this.isTalking = !this.isTalking;

        // Display progressive spinner
        this.inProgress = true;

        // Stop audio recording
        await this.audioRecordingService.record('stop');

        const end = setInterval(() => {
          if (this.speechData !== '') {
            this.translate(this.speechData, user);
            clearInterval(end);
          } else if (!this.isTalking && !this.inProgress) {
            clearInterval(end);
          } else if (this.speechData === '' && !this.isTalking && this.isStopTalking) {
            this.inProgress = false;
            this.isStopTalking = false;
            this.toastService.showToast('Erreur, veuillez réessayer');
            clearInterval(end);
          }
        }, 100);

        this.speechRecognitionService.DestroySpeechObject();
      }
    } else {
      this.toastService.showToast("L'accès au microphone n'est pas autorisé.");
    }
  }

  /**
   * This function is called to translate data from keyboard
   */
  public translateFromKeyboard(user: string) {
    if (this.keyboardData !== '') {
      this.translate(this.keyboardData, user);
    }
  }

  /**
   * This function is called when a user want to listen the speaker
   */
  public listen(user: string): void {
    this.isListening = !this.isListening;

    if (this.speechData !== '' && !this.isKeyboardActivated) {
      if (this.isListening) {
        this.audioRecordingService.audioSpeech.play();

        const end = setInterval(() => {
          if (this.audioRecordingService.audioSpeech === undefined) {
            this.isListening = false;
            clearInterval(end);
          } else {
            if (this.audioRecordingService.audioSpeech.paused) {
              this.isListening = false;
              clearInterval(end);
            }
          }
        }, 10);
      } else {
        this.audioRecordingService.audioSpeech.pause();
        this.audioRecordingService.audioSpeech.currentTime = 0;
      }
    } else if (this.keyboardData !== '' && this.textToSpeechService.keyboardSpeech !== undefined) {
      if (this.isListening) {
        this.textToSpeechService.keyboardSpeech.play();

        const end = setInterval(() => {
          if (this.textToSpeechService.keyboardSpeech.paused) {
            this.isListening = false;
            clearInterval(end);
          }
        }, 10);
      } else {
        // Stop the audio
        this.textToSpeechService.keyboardSpeech.pause();
        this.textToSpeechService.keyboardSpeech.currentTime = 0;
      }
    } else if (this.keyboardData !== '' && this.keyboardAudioFailed) {
      // tslint:disable-next-line: quotemark
      this.toastService.showToast("La version audio n'est pas disponible dans cette langue.");
      this.isListening = false;
    } else {
      this.isListening = false;
    }
  }

  /**
   * This function is called when someone want to listen the translation
   */
  public listenTranslation() {
    // If the translated speech is ready to be listening
    if (this.isTranslatedSpeechReady) {
      // Change the icon of the button
      this.isTranslationListening = !this.isTranslationListening;

      // If the audio hasn't start yet
      if (this.isTranslationListening) {
        this.textToSpeechService.audioSpeech.play(); // HERE

        // Check when the audio is ended
        const end = setInterval(() => {
          if (this.textToSpeechService.audioSpeech.paused || this.textToSpeechService.audioSpeech === undefined) {
            // Change the icon of the button
            this.isTranslationListening = false;
            clearInterval(end);
          }
        }, 10);
      } else {
        // Stop the audio
        this.textToSpeechService.audioSpeech.pause(); // HERE
        this.textToSpeechService.audioSpeech.currentTime = 0;
      }
    } else if (this.audioTranslationFailed) {
      // tslint:disable-next-line: quotemark
      this.toastService.showToast("L'audio n'est pas accessible suite à un problème technique.", 5000);
    } else {
      console.log('NOT READY');
    }
  }

  /**
   * Simulate meeting and return to choice
   */
  public meeting(): void {
    this.dialog
      .open(MeetingComponent, {
        width: '800px'
      })
      .afterClosed()
      .subscribe(response => {
        if (response === 'saved') {
          this.goto('rate');
        }
      });
  }

  /**
   * Enable or disable the abality to use the keyboard instead of the voice.
   */
  public activateKeyboard(): void {
    this.isKeyboardActivated = !this.isKeyboardActivated;
  }

  public onPressEnter(event, user): void {
    if (event.which === this.enterKey || event.keyCode === this.enterKey) {
      this.keyboardData = event.currentTarget.value;
      this.translate(this.keyboardData, user);
    }
  }

  /**
   * This function is called to send data as text to translation
   */
  private translate(text: string, user: string): void {
    // Activate the spinner
    this.inProgress = true;

    // Send the text to translation
    this.translateService.sendTextToTranslation(text, user).subscribe(serverResponse => {
      // Set the language
      const lang = user === 'guest' ? this.translateService.advisor : this.translateService.guest.audioLanguage;

      // If no error
      if (serverResponse.find(r => r.translatedText !== '').translatedText !== undefined) {
        this.speechTranslated = serverResponse.find(r => r.translatedText !== '').translatedText;
        this.historyService.addMessage(user === 'guest' ? false : true, text, this.speechTranslated);

        // Send speech as text to audio conversion
        this.textToSpeechService
          .getSpeech(this.speechTranslated, lang, user, false)
          .then(response => {
            if (response) {
              // Translated speech is ready to be listening
              this.isTranslatedSpeechReady = true;
              this.audioTranslationFailed = false;
              if (this.settingsService.audio) {
                this.listenTranslation();
              }
            } else {
              // Audio translation has failed
              this.audioTranslationFailed = true;
            }
          })
          .catch(error => {
            console.log('Erreur : ', error);
          });
      } else {
        // If error, display this message
        this.toastService.showToast('Erreur, veuillez réessayer');
        this.speechTranslated = 'Erreur, veuillez réessayer';
      }
      // Set translated variable to true
      this.translated = true;

      // Hide the spinner
      this.inProgress = false;
    });

    if (this.isKeyboardActivated) {
      // Set the language
      const lang = user === 'advisor' ? this.translateService.advisor : this.translateService.guest.audioLanguage;

      // Send keyboardData to audio conversion
      this.textToSpeechService
        .getSpeech(this.keyboardData, lang, user, true)
        .then(response => {
          if (response) {
            // Translated speech is ready to be listening
            this.isKeyboardSpeechReady = true;
            this.keyboardAudioFailed = false;
          } else {
            // Audio translation has failed
            this.keyboardAudioFailed = true;
          }
        })
        .catch(error => {
          console.log('Erreur : ', error);
        });
    }
  }

  /**
   * Reset the data when user is switched
   */
  public changeUser(event: MatTabChangeEvent) {
    this.keyboardData = '';
    this.speechData = '';
    this.speechTranslated = '';
    this.textToSpeechService.audioSpeech = undefined;
    this.textToSpeechService.keyboardSpeech = undefined;
    this.audioTranslationFailed = false;
    this.keyboardAudioFailed = false;
    this.isAdvisorTurn = !this.isAdvisorTurn;
  }

  /**
   * Get the translation for a specific word or sentence
   */
  public getWordTranslation(user: string, word: string): string {
    const lang: string = user === 'advisor' ? this.translateService.advisor : this.translateService.guest.writtenLanguage;

    const element = this.titles.find(title => title.value === lang);
    if (element === undefined) {
      return 'TODO';
    }

    if (word === 'request') {
      return VOCABULARY.find(v => v.isoCode === lang).words.request;
    }

    if (word === 'translation') {
      return VOCABULARY.find(v => v.isoCode === lang).words.translate;
    }
  }

  /**
   * Allow user to switch interface
   */
  public disableSwitch(): boolean {
    if (this.isListening) {
      return true;
    } else if (this.isTranslationListening) {
      return true;
    } else if (this.inProgress) {
      return true;
    } else {
      return false;
    }
  }
}
