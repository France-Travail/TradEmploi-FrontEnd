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
  MatIconModule
} from '@angular/material';
import { AudioAnimationComponent } from './components/audio-animation/audio-animation.component';

const COMPONENTS = [AudioAnimationComponent];

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
  MatIconModule
];

const MODULES = [
  CommonModule,
  ReactiveFormsModule,
  FormsModule,
  ...MATERIAL_MODULES
];

@NgModule({
  declarations: [...COMPONENTS, AudioAnimationComponent],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES]
})
export class SharedModule {}
