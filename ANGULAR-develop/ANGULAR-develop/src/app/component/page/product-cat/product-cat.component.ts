import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-cat',
  templateUrl: './product-cat.component.html',
  styleUrls: ['./product-cat.component.scss']
})
export class ProductCatComponent {
  products: any = []
  detailedProducts:any=[]
  defaultImageURL = 'path/to/default-image.jpg';

  constructor(private categoryService: CategoryService, private param: ActivatedRoute, private productService: ProductService) {
    this.param.paramMap.subscribe(data => {
      const id = String(data.get('id'));
      this.categoryService.getOneCat(id).subscribe((data:any) => {
        this.products = data.products
        this.getDetailedProducts();
      })
    })

  }
  getDetailedProducts() {
    // Lấy thông tin chi tiết của từng sản phẩm từ danh sách id
    for (const productId of this.products) {
      this.productService.getOne(productId).subscribe((data: any) => {
        if (!data.data.img || data.data.img === '') {
          data.img = this.defaultImageURL;
        }
        this.detailedProducts.push(data.data);
        console.log(this.detailedProducts);

      });
    }
  }
}
