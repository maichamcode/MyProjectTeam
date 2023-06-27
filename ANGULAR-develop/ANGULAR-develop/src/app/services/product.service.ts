import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  getAll(){

    return this.http.get(`http://localhost:8080/api/product`)
  }
  getNewproduct() {
    return this.http.get(`http://localhost:8080/api/product?_sort=createdAt&_order=desc&_limit=8&_page=1`)
  }
  getTrandy() {
    return this.http.get(`http://localhost:8080/api/product?_sort=createdAt&_order=asc&_limit=8&_page=1`)
  }
  getOne(id: string | number) {
    return this.http.get(`http://localhost:8080/api/product/${id}`)
  }
  getById(id:string | number){
    return this.http.get(`http://localhost:8080/api/product/${id}`)
  }
  //xoa
  Remove(id:string|number) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.delete(`http://localhost:8080/api/product/${id}`,{
      headers:{
            Authorization: `Bearer ${ accessToken }`
        }
    })
  }
  //them
  AddPro(pro:any) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.post(`http://localhost:8080/api/product/add`,pro,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  //sua
  EditPro(pro: any) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.put(`http://localhost:8080/api/product/${pro._id}/edit`, pro,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  //getProductPriceAscending
  getProductPriceAscending(){
    return this.http.get(`http://localhost:8080/api/product/ascend`)
  }
  //getProductPriceDescending
  getProductPriceDescending(){
    return this.http.get(`http://localhost:8080/api/product/Descend`)
  }
  //search product
  searchProduct(){
    return this.http.get(`http://localhost:8080/api/product/search`)
  }


}
