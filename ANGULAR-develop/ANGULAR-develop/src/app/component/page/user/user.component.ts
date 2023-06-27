import { Component } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  user: any = {}
  quantitycart: any
  quantitybill: any
  constructor(private CartService: CartService, private BillService: BillService) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const accessToken = user ? user.accessToken : undefined;
    this.user = user.user
    this.CartService.getOneCat(user.user.cart).subscribe((data: any) => {
      console.log(data);
      this.quantitycart = data.products
    })
    this.BillService.SearchBill(user.user._id).subscribe(data => {
      console.log(data);
      this.quantitybill = data
    })
  }
}
