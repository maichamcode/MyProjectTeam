import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = [];
  constructor(private http: HttpClient) { }
  AddToCart(pro: string) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.post(`http://localhost:8080/api/cart/add`,pro,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  getOneCat(id: any) {
    return this.http.get(`http://localhost:8080/api/cart/${id}`)
  }
  RemoveFormCart(id: any) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.delete(`http://localhost:8080/api/cart/${id}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  DeleteAllProductAndPriceInCart(id:any){
    return this.http.delete(`http://localhost:8080/api/cart/${id}/product`)
  }
}
