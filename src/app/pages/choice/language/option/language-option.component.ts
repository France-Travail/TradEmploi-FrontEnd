import { ENGLISH, FRENCH } from 'src/app/data/sentence';
import { Choice } from 'src/app/models/vocabulary';
import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from 'src/app/models/role';
import { SettingsService } from 'src/app/services/settings.service';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-language-option',
  templateUrl: './language-option.component.html',
  styleUrls: ['./language-option.component.scss'],
})
export class LanguageOptionComponent{

  @Output() optionListEmit = new EventEmitter<Boolean>();
  @Output() optionAllEmit = new EventEmitter<Boolean>();
  
  public optionList:Boolean = false;
  public optionAll:Boolean = false;
  public wordings: Choice;
  public isSmallScreen: Boolean = false;

  constructor(private settingsService: SettingsService,  private breakpointObserver: BreakpointObserver){
    this.wordings = this.settingsService.user.value.role === Role.GUEST ? ENGLISH.choice: FRENCH.choice;
    this.breakpointObserver.observe(['(max-width: 820px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
      //this.isSmallScreen ? this.optionListEmit.emit(true): this.optionListEmit.emit(this.optionList);
    });
  }

  public getMost(){
    this.optionAll = !this.optionAll;
    this.optionAllEmit.emit(this.optionAll);
  }

  public getList(){
    this.optionList =  !this.optionList;
    this.optionListEmit.emit(this.optionList );
  }
}
