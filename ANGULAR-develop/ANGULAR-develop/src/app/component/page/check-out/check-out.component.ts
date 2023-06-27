import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { MapService } from 'src/app/services/map.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { BillService } from 'src/app/services/bill.service';
import { Router } from '@angular/router';
import { error } from 'toastr';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent {
  // isBankTransferSelected: boolean = true;
  products: any = []
  provinces: any[] = [];
  districts: any[] = [];
  wards: any[] = [];
  wardId: any
  districtId: any
  provinceId: any = {}
  result: any
  checkout: any = {
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
  constructor(private provinceApiService: MapService, private cartService: CartService, private productService: ProductService, private billService: BillService,private router:Router) {
    const user = JSON.parse(localStorage.getItem('user')!);
    const accessToken = user ? user.accessToken : undefined;
    const idUser = user && user.user ? user.user._id : undefined;
   
    this.cartService.getOneCat(user.user.cart).subscribe((data: any) => {
      let checkprice = 0;
      for (let price of data.price) {
        checkprice += price
      }

      for (let id of data.products) {
        this.checkout.products.push(id)
        this.productService.getById(id).subscribe((data: any) => {
          console.log(data.data);
          this.products.push(data.data)
        })

      }
      console.log(this.provinceId);

      this.checkout.name = user.user.name;
      this.checkout.email = user.user.email;
      this.checkout.cart = user.user.cart
      this.checkout.price = checkprice+10


    })




  }
  handlePhone() {
    console.log(this.checkout.phone);
  }
  handleNumberHouse() {
    console.log(this.checkout.numberHouse);
  }
  ngOnInit() {
    console.log(this.checkout);
    this.getProvinces();

  }
  getProvinces() {
    this.provinceApiService.getAllProvinces().subscribe(
      (data: any) => {
        this.provinces = data.results
      },
      error => {
        console.log(error);
      }
    );
    console.log(this.checkout.province);
    this.defaulBill()
  }

  async getDistrictsByProvinceId(provinceId: any) {
    console.log(this.provinceId);

    try {
      const data: any = await this.provinceApiService.getDistrictsByProvinceId(this.provinceId.value).toPromise();
      this.districts = data.results;
      console.log(data);
      
      this.checkout.province = this.provinceId.name;
    } catch (error) {
      console.log(error);
    }
  }
  async getWardsByDistrictId(districtId: any) {

    try {
      const data: any = await this.provinceApiService.getWardsByDistrictId(this.districtId.value).toPromise();
      this.wards = data.results;
      this.checkout.district = this.districtId.name;
    } catch (error) {
      console.log(error);
    }
  }
  HandlePay(value: any) {
    console.log(value.target.value);
    this.checkout.payment = value.target.value;

  }
  defaulBill() {
    this.checkout.ward = this.wardId.name
    const currentDate = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    const vietnamDateTime = currentDate.toLocaleString('en-US', options);
    this.checkout.date = (vietnamDateTime);
    console.log(this.checkout);

  }
  addToBill() {

    this.billService.AddBill(this.checkout).subscribe(data => {
      // alert('Add bill successfully')
      console.log(data);
      localStorage.setItem('bill', JSON.stringify(data));

      const user = JSON.parse(localStorage.getItem('user')!);
      const accessToken = user ? user.accessToken : undefined;
      const idCart = user && user.user ? user.user.cart : undefined;
      this.cartService.DeleteAllProductAndPriceInCart(idCart).subscribe(data => {

      })
      this.router.navigate(['/bill'])
    },error=>{
      alert('Bạn phải nhập tất cả trường và phương thức thanh toán !')
    })
   
  }
}
