// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
// Keyboard
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { MatCardModule } from '@angular/material/card';
// Handle Navigation Tree
import { AppRoutingModule } from './app-routing.module';
// Environment loaded
import { environment } from '../environments/environment';
// Handle Animations for Angular Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// Import shared module and components
import { SharedModule } from './shared/shared.module';
import { LogoutComponent } from './shared/components/logout/logout.component';
import { ShareComponent } from './pages/translation/dialogs/share/share.component';
import { AuthorizeComponent } from './pages/translation/dialogs/authorize/authorize.component';
import { WelcomeDeComponent } from './pages/translation/dialogs/welcome-de/welcome-de.component';
import { EndComponent } from './pages/translation/dialogs/end/end.component';
// Main Components
import { AppComponent } from './app.component';
import { TranslationComponent } from './pages/translation/translation.component';
import { HistoricComponent } from './pages/historic/historic.component';
// Dialogs
import { LanguageGridComponent } from './pages/choice/language/grid/language-grid.component';
import { MeetingComponent } from './pages/translation/dialogs/meeting/meeting.component';
import { RemoveComponent } from './pages/historic/dialogs/remove/remove.component';
import { ShowComponent } from './pages/historic/dialogs/show/show.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { MessageWrapperComponent } from './pages/translation/components/message-wrapper/message-wrapper.component';
import { RecordComponent } from './pages/translation/components/record/record.component';
import { ChatComponent } from './pages/translation/components/chat/chat.component';
import { RateDialogComponent } from './pages/translation/dialogs/rate-dialog/rate-dialog.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AnonymousComponent } from './pages/anonymous/anonymous.component';
import { NavbarService } from './services/navbar.service';
import {
  ChatMultiDevicesComponent
} from './pages/translation/components/chat-multi-devices/chat-multi-devices.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoaderComponent } from './pages/loader/loader.component';
import { ChoiceComponent } from './pages/choice/choice.component';
import { ModalityComponent } from './pages/modality/modality.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { OnboardingComponent } from './pages/translation/dialogs/onboarding/onboarding.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from './pages/translation/dialogs/onboarding/carousel/carousel.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { BarChartModule, PieChartModule } from '@swimlane/ngx-charts';
import { VoicesService } from './services/voices.service';
import { ErrorService } from './services/error.service';
import { TokenBrokerService } from './services/token-broker.service';
import { TextToSpeechMicrosoftService } from './services/text-to-speech-microsoft.service';
import { TextToSpeechGcpService } from './services/text-to-speech-gcp.service';
import { TextToSpeechService } from './services/text-to-speech.service';
import { TokenAzureService } from './services/token-azure.service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/compat/functions';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { QRCodeModule } from 'angularx-qrcode';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TradtondocComponent } from './pages/tradtondoc/tradtondoc.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { ModalComponent } from './pages/modal/modal.component';

if (!environment.firebaseConfig.authDomain) {
  environment.firebaseConfig.authDomain = window.location.host;
}

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent,
    LanguageGridComponent,
    HistoricComponent,
    TranslationComponent,
    MeetingComponent,
    RemoveComponent,
    ShowComponent,
    ThanksComponent,
    ConversationComponent,
    MessageWrapperComponent,
    RecordComponent,
    RateDialogComponent,
    LogoutComponent,
    AuthenticationComponent,
    AnonymousComponent,
    ChatComponent,
    ChatMultiDevicesComponent,
    ShareComponent,
    AuthorizeComponent,
    WelcomeDeComponent,
    EndComponent,
    LoaderComponent,
    ModalityComponent,
    WelcomeComponent,
    OnboardingComponent,
    CallbackComponent,
    CarouselComponent,
    IndicatorsComponent,
    TradtondocComponent,
    ModalComponent
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
    LayoutModule,
    OverlayModule,
    HttpClientModule,
    CommonModule,
    MatGridListModule,
    BarChartModule,
    PieChartModule,
    QRCodeModule,
    OAuthModule.forRoot(),
    NgbModule,
    /*ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),*/
    ImageCropperComponent
  ],
  providers: [
    NavbarService,
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'fr-FR'
    },
    {
      provide: TextToSpeechService,
      useFactory: TextToSpeechFactory,
      deps: [VoicesService, ErrorService, TokenBrokerService, TokenAzureService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function TextToSpeechFactory(voicesService: VoicesService, errorService: ErrorService, tbs: TokenBrokerService, tokenAzureService: TokenAzureService) {
  if (environment.microsoftSpeechConfig.textToSpeechEnabled) {
    return new TextToSpeechMicrosoftService(errorService, tokenAzureService);
  }
  return new TextToSpeechGcpService(voicesService, errorService, tbs);
}
