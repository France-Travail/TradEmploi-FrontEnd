// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
  MatTooltipModule
} from '@angular/material';

// Custom Components
import { AudioAnimationComponent } from './components/audio-animation/audio-animation.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RecordComponent } from './components/record/record.component';
import { TranslationTitleComponent } from './components/translation-title/translation-title.component';
import { RouterModule } from '@angular/router';

const COMPONENTS = [AudioAnimationComponent, NavbarComponent, RecordComponent, TranslationTitleComponent];

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
  MatTooltipModule
];

const MODULES = [
  RouterModule,
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  ...MATERIAL_MODULES
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES ],
  exports: [...COMPONENTS, ...MODULES]
})
export class SharedModule {} 
