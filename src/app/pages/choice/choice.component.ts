import { ENGLISH, FRENCH } from 'src/app/data/sentence';
import { Choice } from 'src/app/models/vocabulary';
import { AfterContentInit, Component, HostListener } from '@angular/core';
import { Role } from 'src/app/models/role';
import { NavbarService } from 'src/app/services/navbar.service';
import { SettingsService } from 'src/app/services/settings.service';
import { ChatService } from 'src/app/services/chat.service';
import { Router } from '@angular/router';
import { EndComponent } from '../translation/dialogs/end/end.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { User } from 'src/app/models/user';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss'],
})
export class ChoiceComponent implements AfterContentInit{

  public search:String;

  public optionAll:boolean = false;
  public optionList:boolean = false;
  public isGuest:boolean = true;
  public wordings: Choice;

  private endIdDialogRef: MatDialogRef<any, any>;
  private user: User;
  public isSmallScreen: Boolean = false;

  constructor(
    private navService: NavbarService, 
    private settingsService: SettingsService,
    private chatService: ChatService,
    private router: Router,
    private dialog: MatDialog,
    private breakpointObserver: BreakpointObserver
  ){
    this.navService.handleTabsChoice();
    this.wordings = this.settingsService.user.value.role === Role.GUEST ? ENGLISH.choice: FRENCH.choice;
    this.breakpointObserver.observe(['(max-width: 820px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });

    this.settingsService.user.subscribe((user) => {
      if (user != null) {
        this.isGuest = user.role === Role.GUEST;
        if (user.isMultiDevices && this.isGuest) {
          this.endConversation(user.roomId);
        }
        this.user = user;
      } else {
        this.router.navigate(['/auth']);
      }
    });
  }

  ngAfterContentInit(): void {
    this.navService.show();
  }

  public applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.optionAll = this.search !== "";
  }

  public getMost(){
    this.optionAll = !this.optionAll;
  }

  public getList(){
    this.optionList = !this.optionList;
  }

  @HostListener('window:beforeunload', ['$event'])
  public openPopUp(event): any {
    const confirmationMessage = 'Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?';
    (event || window.event).returnValue = confirmationMessage; // Gecko + IE
    return confirmationMessage;
  }

  @HostListener('window:unload')
  public canDeactivate(): any {
    this.deactivate();
  }

  private deactivate() {
    if (this.user.isMultiDevices) {
      this.deactivateMulti();
    } else {
      this.deactivateMono();
    }
    localStorage.setItem('isLogged', 'false');
    this.settingsService.reset();
  }

  private deactivateMulti() {
    if (this.user.role === Role.GUEST) {
      const isEndClosed: boolean = this.endIdDialogRef === undefined;
      if (isEndClosed) {
        this.chatService.notifyAdvisor(this.user.roomId, this.user.firstname);
      }
    } else {
      this.chatService.updateChatStatus(this.user.roomId, false);
    }
  }

  private deactivateMono() {
    this.chatService.initChatMono(this.user.roomId, this.user.role);
  }

  private endConversation(roomId: string) {
    this.chatService.getChatStatus(roomId).subscribe((active) => {
      if (active !== null && !active) {
        this.openModal(EndComponent, '300px', true);
      }
    });
  }

  private openModal(component, height, disableClose) {
    return this.dialog.open(component, {
      width: '800px',
      height,
      panelClass: 'customDialog',
      disableClose,
    });
  }

}
