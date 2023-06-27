import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list-product-by-cate',
  templateUrl: './list-product-by-cate.component.html',
  styleUrls: ['./list-product-by-cate.component.scss']
})
export class ListProductByCateComponent implements OnInit {
  products: any = [];
  detailedProducts: any = [];
  defaultImageURL = 'path/to/default-image.jpg';

  constructor(private categoryService: CategoryService, private param: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
    this.param.paramMap.subscribe(data => {
      const id = String(data.get('id'));
      this.categoryService.getOneCat(id).toPromise()
        .then((data: any) => {
          this.products = data.products;
          this.getDetailedProducts();
        })
        .catch(error => {
          console.error(error);
        });
    });
  }

  getDetailedProducts() {
    // Lấy thông tin chi tiết của từng sản phẩm từ danh sách id
    const promises = this.products.map((productId: string | number) =>
      this.productService.getOne(productId).toPromise()
    );

    Promise.all(promises)
      .then((data: any[]) => {
        this.detailedProducts = data.map(item => {
          if (!item.data.img || item.data.img === '') {
            item.img = this.defaultImageURL;
          }
          return item;
        });
        console.log(this.detailedProducts);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
