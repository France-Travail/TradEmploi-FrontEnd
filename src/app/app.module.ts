// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
//Keyboard
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatKeyboardModule } from 'angular-onscreen-material-keyboard';
// Handle Navigation Tree
import { AppRoutingModule } from './app-routing.module';

// Handle firebase connection
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule, FUNCTIONS_ORIGIN } from '@angular/fire/functions';

// Environment loaded
import { environment } from 'src/environments/environment';

// Handle Animations for Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Allow to use French date format
import { MAT_DATE_LOCALE, MatSortModule, MatTableModule } from '@angular/material';

// Import shared module and components
import { SharedModule } from './shared/shared.module';

// Main Components
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';
import { ChoiceComponent } from './pages/choice/choice.component';
import { TranslationComponent } from './pages/translation/translation.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { RateComponent } from './pages/rate/rate.component';

// Dialogs
import { LanguagesComponent } from './pages/choice/dialog/languages/languages.component';
import { MeetingComponent } from './pages/translation/dialogs/meeting/meeting.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RemoveComponent } from './pages/historic/dialogs/remove/remove.component';
import { ShowComponent } from './pages/historic/dialogs/show/show.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { MessageWrapperComponent } from './pages/translation/components/message-wrapper/message-wrapper.component';
import { ConversationThreadComponent } from './pages/translation/components/conversation-thread/conversation-thread.component';
import { RateDialogComponent } from './pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { SentryErrorHandler } from './utils/sentry-error-handler';
@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent,
    HistoricComponent,
    TranslationComponent,
    LanguagesComponent,
    StartComponent,
    RateComponent,
    MeetingComponent,
    SettingsComponent,
    RemoveComponent,
    ShowComponent,
    ThanksComponent,
    ConversationComponent,
    MessageWrapperComponent,
    ConversationThreadComponent,
    RateDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    FormsModule,
    MatButtonModule,
    MatKeyboardModule,
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR',
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
  ],
  bootstrap: [AppComponent],
  entryComponents: [LanguagesComponent, MeetingComponent, RemoveComponent, ShowComponent, RateDialogComponent],
})
export class AppModule {}
