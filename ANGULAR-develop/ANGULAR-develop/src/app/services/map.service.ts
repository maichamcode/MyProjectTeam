import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private apiUrl = 'https://vapi.vnappmob.com/api/province/';

  constructor(private http: HttpClient) { }

  getAllProvinces(): Observable<any[]> {
    const url = `${this.apiUrl}`;
    return this.http.get<any[]>(url);
  }

  getDistrictsByProvinceId(provinceId: number): Observable<any[]> {
    const url = `${this.apiUrl}district/${provinceId}`;
    return this.http.get<any[]>(url);
  }

  getWardsByDistrictId(districtId: number): Observable<any[]> {
    const url = `${this.apiUrl}ward/${districtId}`;
    return this.http.get<any[]>(url);
  }

}

