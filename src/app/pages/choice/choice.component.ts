import { AfterContentInit, Component, HostListener, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Choice } from '../../models/vocabulary';
import { User } from '../../models/user';
import { NavbarService } from '../../services/navbar.service';
import { SettingsService } from '../../services/settings.service';
import { ChatService } from '../../services/chat.service';
import { ToastService } from '../../services/toast.service';
import { Role } from '../../models/role';
import { ENGLISH, FRENCH } from '../../data/sentence';
import { MatDialogRef } from '@angular/material/dialog';
import { params } from '../../../environments/params';

@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.scss']
})
export class ChoiceComponent implements OnDestroy {
  public search: string;

  public optionAll = false;
  public optionList = false;
  public isGuest = true;
  public wordings: Choice;

  private readonly endIdDialogRef: MatDialogRef<any>;
  private user: User;
  public isSmallScreen = false;

  constructor(
    private readonly navService: NavbarService,
    private readonly settingsService: SettingsService,
    private readonly chatService: ChatService,
    private readonly router: Router,
    private readonly breakpointObserver: BreakpointObserver,
    private readonly toastService: ToastService
  ) {
    this.navService.handleTabsChoice();
    this.wordings = this.settingsService.user.value.role === Role.GUEST ? ENGLISH.choice : FRENCH.choice;
    this.breakpointObserver.observe(['(max-width: 820px)']).subscribe((result) => {
      this.isSmallScreen = result.matches;
    });

    this.settingsService.user.subscribe((user) => {
      if (user !== null) {
        this.isGuest = user.role === Role.GUEST;
        this.user = user;
      } else {
        this.router.navigate(['/auth']);
      }
    });
    this.navService.show();
  }

  ngOnDestroy() {
    this.toastService.closeToast();
  }

  public applyFilter(event: Event) {
    this.search = (event.target as HTMLInputElement).value;
    this.optionAll = this.search !== '';
  }

  public getMost() {
    this.optionAll = !this.optionAll;
  }

  public getList() {
    this.optionList = !this.optionList;
  }

  @HostListener('window:beforeunload', ['$event'])
  public openPopUp(event): any {
    const confirmationMessage = 'Warning: Leaving this page will result in any unsaved data being lost. Are you sure you wish to continue?';
    (event).returnValue = confirmationMessage; // Gecko + IE
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

  private async deactivateMulti() {
    if (this.user.role === Role.GUEST) {
      const isEndClosed: boolean = this.endIdDialogRef === undefined;
      if (isEndClosed) {
        await this.chatService.notifyAdvisor(this.user.roomId, this.user.firstname);
      }
    } else {
      await this.chatService.updateChatStatus(this.user.roomId, false);
    }
  }

  private async deactivateMono() {
    await this.chatService.initChatMono(this.user.roomId, this.user.role);
  }

  protected readonly params = params;
}
