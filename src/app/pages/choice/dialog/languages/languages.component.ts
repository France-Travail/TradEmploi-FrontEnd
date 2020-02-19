// Angular
import { Component,ViewChild,OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
// Services
import { VoicesService } from 'src/app/services/voices.service';
import { TranslateService } from 'src/app/services/translate.service';

// Data
import { COUNTRIES } from 'src/app/data/countries';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})

export class LanguagesComponent implements OnInit {

  public displayedColumns: string[] = ['traduction','country','language','flag'];
  public Countries: { country: string; traduction: string; code: { audioLanguage: string; writtenLanguage: string }; language: string }[] = COUNTRIES;
  dataSource = new MatTableDataSource(this.Countries);
 
  
  constructor(public dialogRef: MatDialogRef<LanguagesComponent>, private translateService: TranslateService, private voicesService: VoicesService) {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatSort,{static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static:true}) paginator:MatPaginator;
 
  ngOnInit(){
    this.sort.direction = 'asc'
    this.sort.active = 'traduction'
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  /**
   * Method called when user close the modal
   */
  public close(): void {
    this.dialogRef.close('closed');
  }

  /**
   * Set the language for services and close the modal
   */
  public chooseLanguage(selectedCountry: string) {
    let voice = this.Countries.filter(country => country.country == selectedCountry)[0]
    this.voicesService.guest = voice.code;
    this.translateService.guest = voice.code;
    this.close()
  } 
}
