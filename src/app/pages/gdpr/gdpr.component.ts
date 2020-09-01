import { Component } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
import { Router } from '@angular/router';
import { ENGLISH } from 'src/app/data/sentence';
import { FRENCH } from '../../data/sentence';

@Component({
  selector: 'app-gdpr',
  templateUrl: './gdpr.component.html',
  styleUrls: ['./gdpr.component.scss'],
})
export class GdprComponent {

  public selected = 'english';
  public isMoreOptions:boolean = false;
  public privacyText:string = ENGLISH.gdpr.privacityText;
  public confirmTitle:string = ENGLISH.gdpr.confirmTitle;
  public confirmText:string = ENGLISH.gdpr.confirmText;

  constructor(
    private navbarService: NavbarService,
    private router: Router
  ) {
    
  }

  ngOnInit(): void {
    this.navbarService.hide();
  }

  agree(){
    const url = this.router.url;
    const roomId = url.substring(url.lastIndexOf('/') + 1, url.length);
    this.router.navigateByUrl('invite/' + roomId);
  }

  moreOptions(){
    this.isMoreOptions = true
  }

  language(option){
    if(!this.isMoreOptions){
      this.privacyText = (option.value === "english") ? ENGLISH.gdpr.privacityText : FRENCH.gdpr.privacityText 
    }else{
      this.confirmTitle = (option.value === "english") ? ENGLISH.gdpr.confirmTitle : FRENCH.gdpr.confirmTitle 
      this.confirmText = (option.value === "english") ? ENGLISH.gdpr.confirmText : FRENCH.gdpr.confirmText 
    }
  }
}
