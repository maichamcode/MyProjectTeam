import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import * as toastr from 'toastr';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent {
  product: any = {
    name: "",
    price: 0,
    img: "",
    desc: "",
    categoryId: ""
  }
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8),Validators.pattern(/^\S+(?:\s\S+)*$/

    )]],
    price: [0, [Validators.min(1)]],
    img: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    categoryId: ['', [Validators.required]]
  })
  categories: any = []
  uploading: boolean = false;
  imageUrl: any = {

  }
  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router, private categoryService: CategoryService, private http: HttpClient) {
    this.categoryService.getAllCat().subscribe(data => {
      this.categories = data
    })
  }
  // HandleAdd() {
  //   console.log(this.product)
  //   this.productService.AddPro(this.product).subscribe(data => {
  //     this.router.navigate(['/admin/products'])
  //     toastr.success('Bạn đã thêm sản phẩm thành công !')
  //   })
  // }

  // lay truong du lieu ra tu productForm
  get validateForm() {
    return this.productForm.controls
  }
  //
  onHandleSubmit() {
    if (this.productForm.valid) {


      this.product = {
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
        img: this.imageUrl,
        desc: this.productForm.value.desc || "",
        categoryId: this.productForm.value.categoryId || "",
      }

      console.log(this.product)
      this.productService.AddPro(this.product).subscribe(data => {
        // console.log(data);
        this.router.navigate(['/admin/products'])
        toastr.success('Bạn đã thêm sản phẩm thành công !')

      })
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
    this.http.post(api, formdata)
      .subscribe((data: any) => {
        this.imageUrl = data.secure_url;
        console.log(this.imageUrl) // In đường dẫn URL của ảnh đã tải lên từ Cloudinary
        this.uploading = false; // Cập nhật biến cờ khi hoàn thành quá trình tải lên
        alert('thanh cong')
        // Gán giá trị vào thuộc tính product.img
        this.product.img = this.imageUrl;
        // this.productForm.patchValue({ img: imageUrl });

        // Tại đây, bạn có thể sử dụng đường dẫn URL để thực hiện các thao tác khác hoặc lưu vào biến trong ứng dụng của bạn

        // console.log(this.image)
      },
        (error: any) => {
          console.error('Error:', error);
        });
  }
}
