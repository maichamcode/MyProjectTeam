import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../interfaces/Category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  getOneCat(id:any){
    return this.http.get(`http://localhost:8080/api/category/${id}`)
  }
  getAllCat() {
    return this.http.get(`http://localhost:8080/api/category`)
  }
  RemoveCat(id:any) {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.delete(`http://localhost:8080/api/category/${id}`,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  addCategory(category: ICategory): Observable<ICategory> {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.post<ICategory>(`http://localhost:8080/api/category/add`, category,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
  updateCategory(category: ICategory): Observable<ICategory> {
    const user = JSON.parse(localStorage.getItem('user')!)
    const accessToken = user ? user.accessToken : undefined;
    return this.http.put<ICategory>(`http://localhost:8080/api/category/${category._id}/edit`, category,{
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
  }
}
