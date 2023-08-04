import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  user :any
  constructor (private route: Router, public dialog: MatDialog,private AuthService : AuthService,private authServiceso: SocialAuthService,) {

  }
  ngOnInit(){
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  logout(){
    this.AuthService.setIsAuthenticated(false)
    this.AuthService.setUser({})
      
      // this.route.navigate(['auth']).then(() => window.location.reload());
      this.authServiceso.signOut();
      this.route.navigate(['auth'])
  }
}
