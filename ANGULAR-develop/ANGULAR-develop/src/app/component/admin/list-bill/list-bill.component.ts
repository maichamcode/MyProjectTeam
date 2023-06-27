import { Component } from '@angular/core';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-list-bill',
  templateUrl: './list-bill.component.html',
  styleUrls: ['./list-bill.component.scss']
})
export class ListBillsComponent {
  bills: any = []
  constructor(private BillService: BillService) {
    
    this.BillService.GetAllBill().subscribe((data: any) => {
      console.log(data);
      this.bills = data
    })
  }
}
