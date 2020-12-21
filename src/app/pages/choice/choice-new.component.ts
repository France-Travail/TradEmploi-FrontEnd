import { ENGLISH, FRENCH } from 'src/app/data/sentence';
import { Choice, Vocabulary } from 'src/app/models/vocabulary';
import { AfterContentInit, Component } from '@angular/core';
import { Role } from 'src/app/models/role';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { VOCABULARY } from 'src/app/data/vocabulary';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-choice-new',
  templateUrl: './choice-new.component.html',
  styleUrls: ['./choice-new.component.scss'],
})
export class ChoiceNewComponent implements AfterContentInit{

  public search:String;
  public listSelected:Boolean = false;

  public optionList:Boolean = false;
  public optionAll:Boolean = false;
  public wordings: Choice;

  constructor(private navService: NavbarService, private settingsService: SettingsService){
    this.navService.handleTabsChoice();
    this.wordings = this.settingsService.user.value.role === Role.GUEST ? ENGLISH.choice: FRENCH.choice;
  }

  ngAfterContentInit(): void {
    this.navService.show();
  }

  public applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
  }

  public emitOptionAll(optionAllEvent: Boolean){
    this.optionAll = optionAllEvent;
  }

  public emitOptionList(optionListEvent: Boolean){
    this.optionList = optionListEvent;
  }
}
