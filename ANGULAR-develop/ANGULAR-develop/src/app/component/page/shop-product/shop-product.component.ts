import { Component } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { CartService } from 'src/app/services/cart.service';
import * as toastr from 'toastr';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-shop-product',
  templateUrl: './shop-product.component.html',
  styleUrls: ['./shop-product.component.scss']
})

export class ShopProductComponent {
  products: any = [];
  searchKeyword: string = '';
  noProductsFound: boolean = false;

  dataCart: any = {
    _id: '',
    price: 0
  }

  password: any = ''
  user: any = {}
  showPasswordInput: boolean = true;
  datalogin: any = {
    email: '',
    password: '',
  }
  initialProducts: any = [];

  constructor(private productService: ProductService, private cartService: CartService, private router: Router, private authService: AuthService, private userService: UserService) {
    this.productService.getAll().subscribe((data: any) => {
      this.products = data.data;
      this.initialProducts = data.data;
    })
  }

  HandleAddToCart(id: any) {
    console.log(id);

    const user = JSON.parse(localStorage.getItem('user')!);
    const accessToken = user ? user.accessToken : undefined;
    if (!user) {
      alert('Bạn cần đăng nhập mới có thể mua hàng !!')
      this.router.navigate(['/login']);
      return
    }
    const idUser = user && user.user ? user.user._id : undefined;
    this.dataCart._id = id;
    const carrt = user && user.user ? user.user.cart : undefined
    this.dataCart._id = id
    // if (!carrt) {
    // alert("okok")
    // ... các thao tác khác

    //   const pass: any = prompt('Hãy nhập mật khẩu để tạo giỏ hàng')
    //   if (pass !== null) {
    //     console.log(pass); // In ra giá trị người dùng đã nhập khi nhấn OK
    //     this.password = pass
    //     // Thực hiện xử lý với giá trị pass ở đây
    //     console.log(user);
    //     this.user = user
    //     const idUser = user && user.user ? user.user._id : undefined;
    //     // console.log(id);


    //     this.userService.getOneUser(idUser).subscribe((data: any) => {
    //       this.datalogin.email = data.email
    //       this.datalogin.password = this.password

    //       // localStorage.removeItem('user')
    //       // localStorage.setItem('user', JSON.stringify(data))
    //       console.log(this.datalogin);
    //       this.productService.getOne(id).subscribe((data: any) => {
    //         console.log(data);
    //         this.dataCart._id = id
    //         this.dataCart.price = data.data.price
    //         console.log(this.dataCart);


    //         this.cartService.AddToCart(this.dataCart).subscribe(data => {
    //           console.log('addtocart thanh cong');
    //           alert('Bạn đã thêm sản phẩm vào giỏ hàng')
    //         })
    //         this.authService.Signin(this.datalogin).subscribe(data => {
    //           console.log(data);
    //           localStorage.setItem('user', JSON.stringify(data))
    //         })
    //         return
    //       })
    //     })
    //     return
    //   } else {
    //     console.log('Bạn đã bỏ qua nhập mật khẩu'); // In ra khi người dùng nhấn Cancel
    //     return
    //     // Thực hiện xử lý khi người dùng bỏ qua nhập mật khẩu ở đây
    //   }
    //   this.showPasswordInput = false;
    // }
    this.productService.getOne(id).subscribe((data: any) => {

      this.dataCart._id = id
      this.dataCart.price = data.data.price
      console.log(this.dataCart);

      this.cartService.AddToCart(this.dataCart).subscribe(data => {
        console.log('addtocart thanh cong');
        const ok = confirm('Bạn đã thêm sản phẩm vào giỏ hàng. Hãy kiểm tra !')
        if (ok == true) {
          this.router.navigate(['/cart'])
        }
        if (!user.user.cart) {
          this.userService.getOneUser(idUser).subscribe(data => {
            console.log(data);
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(data))
          })
        }
      });
    })
  }
  //ascend
  async HandleGetByPriceAscend() {
    try {
      this.products = [];
      const data: any = await this.productService.getProductPriceAscending().toPromise();
      console.log("Ascend");
      this.products = data.productPriceAscend;
    } catch (error) {
      console.error(error);
    }
  }
  //descend
  async HandleGetByPriceDescend() {
    try {
      this.products = [];
      const data: any = await this.productService.getProductPriceDescending().toPromise();
      console.log("Descend");
      this.products = data.productPriceDescend;
    } catch (error) {
      console.error(error);
    }
  }

  handleSortSelection(event: any) {
    const value = event.target.value;
    if (value === '1') {
      this.HandleGetByPriceAscend();
    } else if (value === '2') {
      this.HandleGetByPriceDescend();
    } else if (value === '3') {
      // quay lai trạng thái ban đầu của các sản phẩm
      this.products = this.initialProducts;
    }
  }


  // search Product
  HandleSearchProduct() {
    if (this.searchKeyword.trim() !== '') {
      this.products = this.initialProducts.filter((product: any) =>
        product.name.toLowerCase().includes(this.searchKeyword.toLowerCase())
      );
      this.noProductsFound = this.products.length === 0; // Kiểm tra nếu không có kết quả tìm kiếm
    } else {
      this.products = this.initialProducts;
      this.noProductsFound = false; // Đặt lại giá trị khi không có từ khóa tìm kiếm
    }
  }

}


