import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from '../../../services/category.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [NgbCarouselConfig]
})

export class HomePageComponent {
  products: any = []
  producttrandy: any = []
  categories: any = []
  constructor(private productService: ProductService, private categoryService: CategoryService, config: NgbCarouselConfig) {

    // Cấu hình các tùy chọn của carousel tại đây nếu cần
    config.interval = 2000; // Đặt thời gian chuyển đổi giữa các slide
    config.wrap = true; // Cho phép quay lại slide đầu tiên sau khi chạm đến slide cuối cùng
    config.keyboard = false; // Vô hiệu hóa điều khiển bằng bàn phím

    this.productService.getNewproduct().subscribe((data: any) => {
      this.products = data.data
    })
    this.productService.getTrandy().subscribe((data: any) => {
      this.producttrandy = data.data
    })
    this.categoryService.getAllCat().subscribe(data => {
      this.categories = data
      console.log(data);

    })
  }
}
