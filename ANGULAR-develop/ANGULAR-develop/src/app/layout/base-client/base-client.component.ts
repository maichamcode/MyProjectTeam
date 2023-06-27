import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';

import * as toastr from 'toastr';
@Component({
  selector: 'app-base-client',
  templateUrl: './base-client.component.html',
  styleUrls: ['./base-client.component.scss']
})
export class BaseClientComponent {
  user: any = {
    name: "",
    image: "",
    email: "",
    password: "",
  };
  categories: any = []
  quantity: any = {}
  constructor(private router: Router, private cartservice: CartService, private categoryService: CategoryService) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const accessToken = user ? user.accessToken : undefined;
    const idUser = user && user.user ? user.user.cart : undefined;
    this.cartservice.getOneCat(idUser).subscribe((data: any) => {
      // console.log(data.products);
      this.quantity = data.products

    })
    this.categoryService.getAllCat().subscribe(data => {
      this.categories = data
      console.log(data);

    })
  }
  HandleLogOut() {
    localStorage.removeItem('user')
    toastr.success('Bạn đã đăng xuất .')
    this.router.navigate(['/'])

  }
  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    const accessToken = user ? user.accessToken : undefined;
    this.user = user;
    // console.log(this.user);
    if (accessToken) {
      return true;
    }
    return false;
  }
  logout() {
    // Xử lý đăng xuất
    localStorage.removeItem('user')
    alert('Bạn đã đăng xuất.')
    this.router.navigate(['/'])
  }

  selectedCategory: any = null;

  onCategoryChange() {
    if (this.selectedCategory) {
      // Router sang trang khác với tham số là ID của danh mục đã chọn
      this.router.navigate(['/product/category', this.selectedCategory]);
    } else {
      // Router sang trang khác khi không có danh mục được chọn
      this.router.navigate(['/']);
    }
  }

}
