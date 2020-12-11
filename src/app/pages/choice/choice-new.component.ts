import { Component } from '@angular/core';

@Component({
  selector: 'app-choice-new',
  templateUrl: './choice-new.component.html',
  styleUrls: ['./choice-new.component.scss'],
})
export class ChoiceNewComponent {

  public displayAll:Boolean = false;
  public search:String;


  public applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    //this.search = filterValue
    //this.dataCountriesSource.filter = filterValue.trim().toLowerCase();
  }

  public getMost(){
    this.displayAll = false
  }

  public getAll(){
    this.displayAll = true
  }

  public getList(){
    
  }

  public getGrid(){
    
  }
}
