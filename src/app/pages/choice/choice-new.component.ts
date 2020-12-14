import { Component } from '@angular/core';

@Component({
  selector: 'app-choice-new',
  templateUrl: './choice-new.component.html',
  styleUrls: ['./choice-new.component.scss'],
})
export class ChoiceNewComponent {

  public search:String;
  public listSelected:Boolean = false;
  public displayAll:Boolean = false;

  public applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
  }

  public getMost(){
    this.displayAll = false;
  }

  public getAll(){
    this.displayAll = true;
  }

  public getList(){
    this.listSelected = true;
    console.log('listSelected :>> ', this.listSelected);
  }

  public getGrid(){
    this.listSelected = false;
    console.log('listSelected :>> ', this.listSelected);
  }
}
