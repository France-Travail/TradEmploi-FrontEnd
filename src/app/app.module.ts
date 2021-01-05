// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
// Keyboard
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatKeyboardModule } from 'angular-onscreen-material-keyboard';
import { MatCardModule } from '@angular/material/card';

// Handle Navigation Tree
import { AppRoutingModule } from './app-routing.module';

// Handle firebase connection
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireFunctionsModule } from '@angular/fire/functions';

// Environment loaded
import { environment } from 'src/environments/environment';

// Handle Animations for Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Allow to use French date format
import { MAT_DATE_LOCALE, MatSortModule, MatTableModule } from '@angular/material';

// Import shared module and components
import { SharedModule } from './shared/shared.module';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { ShareComponent } from './pages/translation/dialogs/share/share.component';
import { EndComponent } from './pages/translation/dialogs/end/end.component';

// Main Components
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';
import { TranslationComponent } from './pages/translation/translation.component';
import { HistoricComponent } from './pages/historic/historic.component';

// Dialogs
import { LanguageGridComponent } from './pages/choice/language/grid/language-grid.component';
import { MeetingComponent } from './pages/translation/dialogs/meeting/meeting.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { RemoveComponent } from './pages/historic/dialogs/remove/remove.component';
import { ShowComponent } from './pages/historic/dialogs/show/show.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { MessageWrapperComponent } from './pages/translation/components/message-wrapper/message-wrapper.component';
import { ChatComponent } from './pages/translation/components/chat/chat.component';
import { RateDialogComponent } from './pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { SentryErrorHandler } from './utils/sentry-error-handler';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AnonymousComponent } from './pages/anonymous/anonymous.component';
import { GdprComponent } from './pages/gdpr/gdpr.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { NavbarService } from './services/navbar.service';
import { ChatMultiDevicesComponent } from './pages/translation/components/chat-multi-devices/chat-multi-devices.component';
import { QRCodeModule } from 'angularx-qrcode';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoaderComponent } from './pages/settings/loader/loader.component';
import { ChoiceComponent } from './pages/choice/choice.component';
import { ModalityComponent } from './pages/modality/modality.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent,
    LanguageGridComponent,
    HistoricComponent,
    TranslationComponent,
    StartComponent,
    MeetingComponent,
    SettingsComponent,
    RemoveComponent,
    ShowComponent,
    ThanksComponent,
    ConversationComponent,
    MessageWrapperComponent,
    RateDialogComponent,
    LogoutComponent,
    AuthenticationComponent,
    AnonymousComponent,
    GdprComponent,
    ChatComponent,
    ChatMultiDevicesComponent,
    ShareComponent,
    EndComponent,
    LoaderComponent,
    ModalityComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    MatSortModule,
    MatTableModule,
    MatCardModule,
    FormsModule,
    MatButtonModule,
    MatKeyboardModule,
    LayoutModule,
    QRCodeModule,
    DeviceDetectorModule.forRoot(),
    OverlayModule,
  ],
  providers: [
    NavbarService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR',
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler },
  ],
  bootstrap: [AppComponent],
  entryComponents: [MeetingComponent, RemoveComponent, ShowComponent, RateDialogComponent],
})
export class AppModule {}
