import { AfterContentInit, Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-choice-new',
  templateUrl: './choice-new.component.html',
  styleUrls: ['./choice-new.component.scss'],
})
export class ChoiceNewComponent implements AfterContentInit{

  public search:String;
  public listSelected:Boolean = false;
  public displayAll:Boolean = false;

  constructor(private navService: NavbarService){
    this.navService.handleTabsChoice();
  }

  ngAfterContentInit(): void {
    this.navService.show();
  }

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
