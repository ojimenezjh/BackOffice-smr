import { Component, OnInit, SimpleChanges, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { Corp } from 'src/models/auth/Corp';
import { LoginPage } from "../../pages/auth/login/login.page";


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.page.html',
  styleUrls: ['./navigation.page.scss'],
})

export class NavigationPage implements OnInit {

  corps: Corp[] = [];

  corp: Corp = {
    id: 1,
    name: '',
    logo: '',
  };

  nombreCorp;
  logoCorp;

  isLoggedIn$: Observable<boolean>; // {1}

  isProfileAdm$: Observable<boolean>;

  constructor(private authService: AuthService,  private login: LoginPage) { }

  ngOnInit() {
    this.login.getImg();
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isProfileAdm$ = this.authService.profileAdm;
    this.login.subscriber$.subscribe((corp: Corp) => {
      this.logoCorp = corp.logo;
      this.nombreCorp = corp.name;
    });
  }
  
  onLogout(){
    this.authService.logout();                      // {3}
  }

  user_Type(){

    
  }
   
}

   

