// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { HistoricComponent } from './pages/historic/historic.component';
import { TranslationComponent } from './pages/translation/translation.component';
import { StartComponent } from './pages/start/start.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AnonymousComponent } from './pages/anonymous/anonymous.component';
import { GdprComponent } from './pages/gdpr/gdpr.component';
import { AuthGuard } from './guards/auth.guard';
import { PendingChangesGuard } from './guards/pending-changes.guard';
import { ChoiceComponent } from './pages/choice/choice.component';
import { ModalityComponent } from './pages/modality/modality.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { CallbackComponent } from './pages/callback/callback.component';
import { IndicatorsComponent } from './indicators/indicators.component';
import { TradtondocComponent } from './pages/tradtondoc/tradtondoc.component';

export const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full', canDeactivate: [PendingChangesGuard] },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'callback',
    component: CallbackComponent,
  },
  {
    path: 'invite/:id',
    component: WelcomeComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'modality',
    component: ModalityComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gdpr/mono',
    component: GdprComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'auth/:id',
    component: AnonymousComponent,
  },
  {
    path: 'gdpr/:id',
    component: GdprComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'choice',
    component: ChoiceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'history',
    component: HistoricComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'conversation',
    component: ConversationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'translation',
    component: TranslationComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'thanks',
    component: ThanksComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'indicators',
    component: IndicatorsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tradtondoc',
    component: TradtondocComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];

@NgModule({
  providers: [PendingChangesGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
