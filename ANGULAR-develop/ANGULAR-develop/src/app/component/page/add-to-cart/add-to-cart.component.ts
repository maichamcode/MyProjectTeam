import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from '../../../services/product.service';
import * as toastr from 'toastr';

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})
export class AddToCartComponent {
  carts: any = []
  products: any = []
  defaultImageURL = 'path/to/default-image.jpg';
  detailedProducts: any = []
  totalPrice: number = 0;
  quantity: number = 1;
  soluong: number = 1
  productTotalPrice: number = 0;
  constructor(private cartService: CartService, private productService: ProductService) {



    const user = JSON.parse(localStorage.getItem('user')!);
    const accessToken = user ? user.accessToken : undefined;
    const idUser = user && user.user ? user.user.cart : undefined;
    this.cartService.getOneCat(idUser).subscribe((data: any) => {
      console.log(data.products);
      this.carts = data.products
      this.getDetailedProducts();
    })
  }
  getDetailedProducts() {
    // Lấy thông tin chi tiết của từng sản phẩm từ danh sách id
    for (const productId of this.carts) {
      this.productService.getOne(productId).subscribe((data: any) => {
        if (!data.data.img || data.data.img === '') {
          data.img = this.defaultImageURL;
        }
        this.detailedProducts.push(data.data);
        console.log(this.detailedProducts);

      });
    }
  }
  HandleRemove(id: any) {
    console.log(id);
    const ok = confirm('Bạn có muốn xóa product khỏi cart ?')
    if (ok == true) {
      this.cartService.RemoveFormCart(id).subscribe(data => {
        this.detailedProducts = this.detailedProducts.filter((data: any) => data._id !== id)
        toastr.success('Thanh cong')
      })

    }


  }
  handleQuantityChange() {

    this.soluong = this.quantity++;
    console.log(this.soluong);
    const user = JSON.parse(localStorage.getItem('user')!);
    const idUser = user && user.user ? user.user.cart : undefined;
    this.cartService.getOneCat(idUser).subscribe((data: any) => {
      // Tính tổng giá trị của các sản phẩm
      let total = 0;
      let total1 = 0

      // console.log(soluong);
      for (let product of data.products) {
        this.productService.getOne(product).subscribe((data: any) => {
          // console.log(data.data.price * this.quantity);
          this.productTotalPrice = data.data.price
          // const price = data.data.price * this.quantity


          // const price = data.data.price * this.quantity;


          total += this.productTotalPrice;
          this.totalPrice = total
         
          

        })
      }
    
    });

  }
  calculateProductTotalPrice(product: any) {

    // console.log(this.productTotalPrice);

  }
  ngOnInit() {
    // Lấy thông tin cart từ service
    this.handleQuantityChange()

  }

}
