import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as toastr from 'toastr';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: any = {
    name: "",
    email: "",
    password: "",
    confirmpassword:"",
    image: "",
  }

  userForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(225), Validators.minLength(8), Validators.pattern(/^\S+(?:\s\S+)*$/)]],
    email:['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password:['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
    confirmpassword:['', [Validators.required]],
    image:['',[Validators.required]]
  })

  uploading: any = [];

  constructor(
    private http: HttpClient,
    private signupService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  get validateForm() {
    return this.userForm.controls;
  }

  HandleSignup() {
    if (this.userForm.valid) {
      this.user = {
        name: this.userForm.value.name || "",
        email: this.userForm.value.email || "",
        password: this.userForm.value.password || "",
        confirmpassword: this.userForm.value.confirmpassword || "",
        image: this.user.image || "",
      }
      console.log(this.user);
      
      this.signupService.Signup(this.user).subscribe(data => {
        this.router.navigate(['/login']);
        toastr.success('Bạn đăng ký thành công. Hãy đăng nhập !');
      });
    }
  }

  HandleUpload(fileInput: any) {
    this.uploading = true;
    const file: File = fileInput.files[0];
    console.log(file)
    const cloud_name = 'dw6wgytc3';
    const preset_name = 'demo_upload';
    const folder_name = 'NODEJS';
    const api = `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`
    const formdata = new FormData();
    formdata.append('upload_preset', preset_name)
    formdata.append('folder', folder_name)
    formdata.append('file', file)
    this.http.post(api, formdata).subscribe((data: any) => {
        const imageUrl = data.secure_url;
        console.log(imageUrl);
        this.user.image = imageUrl;
        this.uploading = false;
        alert('thanh cong');
      },
      (error: any) => {
        console.error('Error:', error);
      });
  }


}
