import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  product:any={
    name:"",
    price:0,
    img:"",
    desc:"",
    categoryId:""
  }
  constructor (private productService:ProductService,private route:ActivatedRoute){
    this.route.paramMap.subscribe(res=>{
      const id = String(res.get('id'))
      console.log(id);

      this.productService.getById(id).subscribe((product:any)=>{
        console.log(product);
        this.product = product.data
      })
    })
  }
}
