import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as toastr from 'toastr';
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
constructor(private router:Router){}
  HandleLogOut(){
    localStorage.removeItem('user')
    toastr.success('Bạn đã đăng xuất .')
    this.router.navigate(['/'])

  }
}
