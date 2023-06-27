import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';
import * as toastr from 'toastr';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent {
  product: any = {
    _id: "",
    name: "",
    price: 0,
    img: "",
    desc: "",
    categoryId: ""
  }
  productForm = this.formBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8), Validators.pattern(/^\S+(?:\s\S+)*$/

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
  _id = "";

  constructor(private productService: ProductService, private formBuilder: FormBuilder, private router: Router, private categoryService: CategoryService, private http: HttpClient, private param: ActivatedRoute) {
    this.param.paramMap.subscribe(data => {
      this._id = String(data.get('id'));
      this.productService.getOne(this._id).subscribe((data: any) => {
        this.product = data.data
        console.log(this.product);

      })
    })
    this.categoryService.getAllCat().subscribe((data: any) => {
      this.categories = data
    })
  }
  // HandleEdit() {
  //   console.log(this.product)
  //   this.productService.EditPro(this.product).subscribe(data => {
  //     this.router.navigate(['/admin/products'])
  //     toastr.success('Bạn đã update sản phẩm thành công !')
  //   })
  // }

  get validateForm() {
    return this.productForm.controls
  }
  //
  onHandleSubmit() {
    if (this.productForm.valid) {


      this.product = {
        _id: this._id,
        name: this.productForm.value.name || "",
        price: this.productForm.value.price || 0,
        img: this.product.img,
        desc: this.productForm.value.desc || "",
        categoryId: this.productForm.value.categoryId || "",
      }

      console.log(this.product)
      this.productService.EditPro(this.product).subscribe(data => {
        console.log(data);
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
        const imageUrl = data.secure_url;
        console.log(imageUrl) // In đường dẫn URL của ảnh đã tải lên từ Cloudinary
        // Gán giá trị vào thuộc tính product.img
        this.product.img = imageUrl;
        // Tại đây, bạn có thể sử dụng đường dẫn URL để thực hiện các thao tác khác hoặc lưu vào biến trong ứng dụng của bạn
        this.uploading = false; // Cập nhật biến cờ khi hoàn thành quá trình tải lên
        alert('thanh cong')
        // console.log(this.image)
      },
        (error: any) => {
          console.error('Error:', error);
        });
  }
}
