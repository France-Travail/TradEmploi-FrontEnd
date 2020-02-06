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

const routes: Routes = [
  { path: '', redirectTo: 'start', pathMatch: 'full' },
  {
    path: 'start',
    component: StartComponent
  },
  {
    path: 'choice',
    component: ChoiceComponent
  },
  {
    path: 'history',
    component: HistoricComponent
  },
  {
    path: 'conversation',
    component: ConversationComponent
  },
  {
    path: 'translation',
    component: TranslationComponent
  },
  {
    path: 'rate',
    component: RateComponent
  },
  {
    path: 'thanks',
    component: ThanksComponent
  },
  {
    path: 'settings/:from',
    component: SettingsComponent
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
