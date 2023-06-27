import { Component } from '@angular/core';
import { BillService } from '../../../services/bill.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillComponent {
  bills:any=[]
  constructor(private BillService:BillService){
  const user = JSON.parse(localStorage.getItem('user')!);
  const accessToken = user ? user.accessToken : undefined;
  this.BillService.SearchBill(user.user._id).subscribe((data:any) => {
    console.log(data.data);
   this.bills=data.data
  })
}
}
