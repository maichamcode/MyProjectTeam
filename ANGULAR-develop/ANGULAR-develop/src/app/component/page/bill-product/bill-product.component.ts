import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
@Component({
  selector: 'app-bill-product',
  templateUrl: './bill-product.component.html',
  styleUrls: ['./bill-product.component.scss']
})
export class BillProductComponent {
  products:any=[]
  bill: any = {
    name: '',
    email: '',
    province: '',
    district: '',
    ward: '',
    phone: '',
    numberHouse: '',
    products: [],
    payment: '',
    date: ''
  }
  constructor(private router: Router, private productService: ProductService){
    const bill = JSON.parse(localStorage.getItem('bill')!);
    const listBill  = bill ? bill.data : undefined;
    this.bill=bill.data;
  //  console.log(listBill.products);
   
    for (let id of this.bill.products){
        this.productService.getById(id).subscribe((data:any)=>{
          console.log(data);
         this.products.push(data.data);
         console.log(this.products);
         
        })
    }

    
  }

  HandleRemoveBill(){
    localStorage.removeItem('bill')
    this.router.navigate(['/shop'])
    
  }
  exportAsPDF() {
    const element = document.getElementById('invoice');
    if (!element) {
      console.error("Element with ID 'invoice' not found");
      return;
    }
    html2canvas(element).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('invoice.pdf');
    });
  }
}
