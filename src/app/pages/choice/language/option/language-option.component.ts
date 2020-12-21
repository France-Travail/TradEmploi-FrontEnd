import { ENGLISH, FRENCH } from 'src/app/data/sentence';
import { Choice } from 'src/app/models/vocabulary';
import { Component, EventEmitter, Output } from '@angular/core';
import { Role } from 'src/app/models/role';
import { SettingsService } from 'src/app/services/settings.service';

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

  constructor(private settingsService: SettingsService){
    this.wordings = this.settingsService.user.value.role === Role.GUEST ? ENGLISH.choice: FRENCH.choice;
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
