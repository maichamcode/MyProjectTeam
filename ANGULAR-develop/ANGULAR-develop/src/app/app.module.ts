
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { DashbordComponent } from './component/admin/dashbord/dashbord.component';
import { ListProductComponent } from './component/admin/list-product/list-product.component';
import { ListCategoryComponent } from './component/admin/list-category/list-category.component';
import { AddCategoriesComponent } from './component/admin/add-categories/add-categories.component';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './component/admin/add-product/add-product.component';
import { EditProductComponent } from './component/admin/edit-product/edit-product.component';
import { ListUserComponent } from './component/admin/list-user/list-user.component';
import { BaseClientComponent } from './layout/base-client/base-client.component';
import { EditCategoriesComponent } from './component/admin/edit-categories/edit-categories.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomePageComponent } from './component/page/home-page/home-page.component';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './component/page/product-detail/product-detail.component';
import { ProductCatComponent } from './component/page/product-cat/product-cat.component';
import { AuthGuardService } from './prive-router.module';
import { ShopProductComponent } from './component/page/shop-product/shop-product.component';
import { AddToCartComponent } from './component/page/add-to-cart/add-to-cart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';

import { CheckOutComponent } from './component/page/check-out/check-out.component';
import { BillProductComponent } from './component/page/bill-product/bill-product.component';
import { ListBillComponent } from './component/page/list-bill/list-bill.component';
import { BillDetailComponent } from './component/page/bill-detail/bill-detail.component';
import { ListBillsComponent } from './component/admin/list-bill/list-bill.component';
import { RouterModule, Routes } from '@angular/router';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    DashbordComponent,
    ListProductComponent,
    ListCategoryComponent,
    AddCategoriesComponent,
    AddProductComponent,
    EditProductComponent,
    ListUserComponent,
    BaseClientComponent,
    EditCategoriesComponent,
    RegisterComponent,
    HomePageComponent,
    LoginComponent,
    ProductDetailComponent,
    ProductCatComponent,
    ShopProductComponent,
    AddToCartComponent,
    CheckOutComponent,
    BillProductComponent,
    ListBillComponent,
    BillDetailComponent,
    ListBillsComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NgbModule,
    BrowserAnimationsModule,
    MatSelectModule,
    RouterModule,
    BrowserModule

  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
