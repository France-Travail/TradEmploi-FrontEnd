// Angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { ChoiceComponent } from './pages/choice/choice.component';
import { HistoricComponent } from './pages/historic/historic.component';
import { TranslationComponent } from './pages/translation/translation.component';
import { StartComponent } from './pages/start/start.component';
import { RateComponent } from './pages/rate/rate.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ThanksComponent } from './pages/thanks/thanks.component';
import { ConversationComponent } from './pages/conversation/conversation.component';
import { AuthenticationComponent } from './pages/authentication/authentication.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'auth',
    component: AuthenticationComponent
  },
  {
    path: 'choice',
    component: ChoiceComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'history',
    component: HistoricComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'conversation',
    component: ConversationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'translation',
    component: TranslationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'rate',
    component: RateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'thanks',
    component: ThanksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'settings/:from',
    component: SettingsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'start',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
