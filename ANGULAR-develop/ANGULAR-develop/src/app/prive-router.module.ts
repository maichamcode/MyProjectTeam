import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private router: Router) { }

    canActivate(): boolean {
        // Kiểm tra xem người dùng đã đăng nhập hay chưa
        const user = JSON.parse(localStorage.getItem('user')!)
        const accessToken = user ? user.accessToken : undefined;
        if (user && user.accessToken) {
            if(user.user.role=='admin'){
                return true;
            }else{
                this.router.navigate(['/'])
                return false;
            }
            // Người dùng đã đăng nhập và có quyền admin
            return true;
        } else {
            // Người dùng chưa đăng nhập hoặc không có quyền admin
            // Chuyển hướng đến trang không cho phép truy cập (ví dụ: trang chủ)
            this.router.navigate(['/']);
            return false;
        }
    }
}