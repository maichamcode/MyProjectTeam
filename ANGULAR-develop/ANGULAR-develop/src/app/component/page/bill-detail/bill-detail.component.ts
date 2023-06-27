import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillService } from '../../../services/bill.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent {
  bill:any
  products:any=[]
constructor(private router:ActivatedRoute, private BillService:BillService,private ProductService:ProductService){
  this.router.paramMap.subscribe(data=>{
    const id = String(data.get('id'));
    this.BillService.GetOneBill(id).subscribe((data:any)=>{
      console.log(data.data);
      this.bill=data.data
      console.log(this.bill);
      
      const tempProducts: any[] = [];
      for (let productId of this.bill.products) {
        this.ProductService.getById(productId).subscribe((productData: any) => {
          console.log(productData);
          tempProducts.push(productData.data);
          console.log(tempProducts);
        });
      }

      this.products = tempProducts;
    })
 
     
    
  })
}
}
