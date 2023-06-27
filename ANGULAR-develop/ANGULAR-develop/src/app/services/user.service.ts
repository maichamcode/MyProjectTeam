import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  getAllUser() {
    return this.http.get(`http://localhost:8080/api/users`)
  }
  getOneUser(id:any) {
    return this.http.get(`http://localhost:8080/api/users/${id}`)
  }
  getAllUserByRole() {
    return this.http.get(`http://localhost:8080/api/role`)
  }
  RemoveUser(id:any) {
    return this.http.delete(`http://localhost:8080/api/user/${id}`)
  }
}
