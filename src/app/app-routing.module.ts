// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ChoiceComponent } from './pages/choice/choice.component';
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

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full', canDeactivate: [PendingChangesGuard] },
  {
    path: 'start',
    component: StartComponent,
  },
  {
    path: 'auth',
    component: AuthenticationComponent,
  },
  {
    path: 'auth/:id',
    component: AnonymousComponent,
  },
  {
    path: 'invite/:id',
    component: GdprComponent,
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
