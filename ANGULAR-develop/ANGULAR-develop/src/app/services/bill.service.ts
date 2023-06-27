import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http: HttpClient) { }
  AddBill(dataBill: any) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.post(`http://localhost:8080/api/bill/add`, dataBill, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  SearchBill(id: any) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.get(`http://localhost:8080/api/bill/${id}/search`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  GetOneBill(id: any) {
    return this.http.get(`http://localhost:8080/api/bill/${id}`)
  }
  GetAllBill() {
    return this.http.get(`http://localhost:8080/api/bill`)
  }


}
