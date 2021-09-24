// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatIconModule,
  MatTooltipModule,
  MatListModule,
  MatMenuModule,
} from '@angular/material';

// Custom Components
import { AudioAnimationComponent } from './components/audio-animation/audio-animation.component';
import { TranslationTitleComponent } from './components/translation-title/translation-title.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import {TagDirective} from '../lib/atinternet/_directives/tag.directive';
import {HoldableDirective} from '../pages/translation/components/message-wrapper/holdable.directive';

const COMPONENTS = [AudioAnimationComponent, TranslationTitleComponent, HeaderComponent, SidenavComponent, TagDirective, HoldableDirective];

const MATERIAL_MODULES = [
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatIconModule,
  MatTooltipModule,
  MatSidenavModule,
  MatToolbarModule,
  MatListModule,
  MatMenuModule,
];

const MODULES = [RouterModule, CommonModule, ReactiveFormsModule, FormsModule, ...MATERIAL_MODULES];

@NgModule({
  declarations: [...COMPONENTS, HeaderComponent, SidenavComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {}
