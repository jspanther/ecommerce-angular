import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import {  HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { ForgetComponent } from './auth/forget/forget.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserListComponent } from './pages/user-management/user-list/user-list.component';
import { UserDetailsComponent } from './pages/user-management/user-details/user-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProductListComponent } from './pages/product-management/product-list/product-list.component';
import { ViewProductComponent } from './pages/product-management/view-product/view-product.component';
import { EditProductComponent } from './pages/product-management/edit-product/edit-product.component';
import { AddProductComponent } from './pages/product-management/add-product/add-product.component';
import { SubadminListComponent } from './pages/subadmin-management/subadmin-list/subadmin-list.component';
import { ViewSubadminComponent } from './pages/subadmin-management/view-subadmin/view-subadmin.component';
import { EditSubadminComponent } from './pages/subadmin-management/edit-subadmin/edit-subadmin.component';
import { AddSubadminComponent } from './pages/subadmin-management/add-subadmin/add-subadmin.component';
import { AddBannerComponent } from './pages/banner-management/add-banner/add-banner.component';
import { ViewBannerComponent } from './pages/banner-management/view-banner/view-banner.component';
import { EditBannerComponent } from './pages/banner-management/edit-banner/edit-banner.component';
import { BannerListComponent } from './pages/banner-management/banner-list/banner-list.component';
import { StaticContentManagementComponent } from './pages/static-content/static-content-management/static-content-management.component';
import { ViewStaticContentComponent } from './pages/static-content/view-static-content/view-static-content.component';
import { EditStaticContentComponent } from './pages/static-content/edit-static-content/edit-static-content.component';
import { AddStaticContentComponent } from './pages/static-content/add-static-content/add-static-content.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ViewProfileComponent } from './pages/profile/view-profile/view-profile.component';
import { EditProfileComponent } from './pages/profile/edit-profile/edit-profile.component';
import { EditUserComponent } from './pages/user-management/edit-user/edit-user.component';
import { SettingComponent } from './pages/setting/setting.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { CKEditorComponent } from 'ckeditor4-angular';


   


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgetComponent,
    DashboardComponent,
    UserListComponent,
    UserDetailsComponent,
    HeaderComponent,
    SidebarComponent,
    ProductListComponent,
    ViewProductComponent,
    EditProductComponent,
    AddProductComponent,
    SubadminListComponent,
    ViewSubadminComponent,
    EditSubadminComponent,
    AddSubadminComponent,
    AddBannerComponent,
    ViewBannerComponent,
    EditBannerComponent,
    BannerListComponent,
    StaticContentManagementComponent,
    ViewStaticContentComponent,
    EditStaticContentComponent,
    AddStaticContentComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
    ViewProfileComponent,
    EditProfileComponent,
    EditUserComponent,
    SettingComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    AngularEditorModule
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
