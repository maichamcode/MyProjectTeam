import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as toastr from 'toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user: any = {
    email: '',
    password: ''
  };
  //
  userForm = this.formBuilder.group({
    email:['',[Validators.required,Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password:['',[Validators.required,Validators.minLength(8)]]
  })
  get validateForm(){
    return this.userForm.controls
  }

  constructor(private http: HttpClient, private authService: AuthService, private router: Router,private formBuilder:FormBuilder) { }




  HandleLogin() {
    this.user ={
      email:this.userForm.value.email || "",
      password:this.userForm.value.password || ""
    }
   

    this.user = {
      email: this.userForm.value.email || "",
      password: this.userForm.value.password || 0
    }
    console.log(this.user);
    this.authService.Signin(this.user).subscribe((data: any) => {
      console.log(this.user.email);
      let check = false;
      if (this.user.email != data.user.email && this.user.password != data.user.password) {
        toastr.error('Thông tin đăng nhập sai. Hãy kiểm tra lại !');
        check = true;
      } else {
        if (data.user.role == 'admin') {
          localStorage.setItem('user', JSON.stringify(data))
          this.router.navigate(['/admin']);
          toastr.success('Đăng nhập thành công Admin');
        } else {
          localStorage.setItem('user', JSON.stringify(data))
          this.router.navigate(['/']);
          toastr.success('Đăng nhập thành công');
        }

        check = true;
      }

      if (check) {
        return
      }
    })

  }
}
