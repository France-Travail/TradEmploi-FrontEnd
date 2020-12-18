import { ENGLISH, FRENCH } from 'src/app/data/sentence';
import { Choice } from 'src/app/models/vocabulary';
import { AfterContentInit, Component } from '@angular/core';
import { Role } from 'src/app/models/role';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-choice-new',
  templateUrl: './choice-new.component.html',
  styleUrls: ['./choice-new.component.scss'],
})
export class ChoiceNewComponent implements AfterContentInit{

  public search:String;
  public listSelected:Boolean = false;
  public displayAll:Boolean = false;
  public wordings: Choice;
  public listGridWording: String;

  constructor(private navService: NavbarService, private settingsService: SettingsService){
    this.navService.handleTabsChoice();
    this.wordings = this.settingsService.user.value.role === Role.GUEST ? ENGLISH.choice: FRENCH.choice;
    this.listGridWording = this.wordings.gridBtn;
  }

  ngAfterContentInit(): void {
    this.navService.show();
  }

  public applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
  }

  public getMost(){
    console.log('Most');
    this.displayAll = false;
  }

  public getAll(){
    console.log('All');
    this.displayAll = true;
  }

  public getList(){
    console.log("getList");
    this.listSelected = this.listSelected ? false: true;
    this.listGridWording = this.listSelected ? this.wordings.gridBtn: this.wordings.listBtn;
  }
}
