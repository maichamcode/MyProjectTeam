import { Component } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { ICategory } from 'src/app/interfaces/Category';
import { CategoryService } from 'src/app/services/category.service';
import * as toastr from 'toastr';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.scss']
})
export class AddCategoriesComponent {
  category: ICategory= {
    name: "",
    img:""
  }
  uploading: boolean = false;
  imageUrl: any = {

  }
  //
  categoryForm = this.formBuilder.group({
    name:['',[Validators.required,Validators.pattern(/^\S+(?:\s\S+)*$/),Validators.minLength(8)]],
    img: ['', [Validators.required]]
  })
  //
  get validateFormCategory(){
    return this.categoryForm.controls
  }
  //
  constructor(private categoryService: CategoryService, private route: Router, private formBuilder: FormBuilder, private http: HttpClient) {}
  // HandleAdd() {
  //   this.categoryService.addCategory(this.category).subscribe(category => {
  //     console.log(category);
  //     this.route.navigate(['/admin/category'])
  //     toastr.success('Thêm thành công danh mục !!')
  //   })
  // }
  HandleAdd(){
   
      this.category = {
        name: this.categoryForm.value.name || "",
        img:this.imageUrl
      }
      console.log(this.category);
      this.categoryService.addCategory(this.category).subscribe(data=>{
        this.route.navigate(['/admin/category'])
        toastr.success('Thêm thành công danh mục !!')
      })

    
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
    this.http.post(api, formdata)
      .subscribe((data: any) => {
        this.imageUrl = data.secure_url;
        console.log(this.imageUrl) // In đường dẫn URL của ảnh đã tải lên từ Cloudinary
        this.uploading = false; // Cập nhật biến cờ khi hoàn thành quá trình tải lên
        alert('thanh cong')
        // Gán giá trị vào thuộc tính product.img
        this.category.img = this.imageUrl;
        // this.productForm.patchValue({ img: imageUrl });

        // Tại đây, bạn có thể sử dụng đường dẫn URL để thực hiện các thao tác khác hoặc lưu vào biến trong ứng dụng của bạn

        // console.log(this.image)
      },
        (error: any) => {
          console.error('Error:', error);
        });
  }
}
