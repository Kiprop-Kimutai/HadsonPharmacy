import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app.routing.module';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AppComponent } from './app.component';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {NavListComponent} from './layout/nav-list.component';
import {PageDirective} from './common/PageDirective';
import {UsersPageComponent} from './users/users-page.component';
import {UserFormService} from './users/user-forms.service';
import {LoginFormComponent} from './login/login-form.component';
import {RegisterFormComponent} from './login/register-form.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {DeviceListComponent} from './device/device-list.component';
import {DeviceComponent} from './device/device.component';
import {DeviceFirmwareComponent} from './device_firmware/device_firmware';
import {ProductsComponent} from './stock/products/products.component';
import {ProductDialog} from './stock/products/products.dialog';
import {LpoComponent} from './stock/lpo/lpo.component';
import {StockService} from './stock/stock.service';
import {WedComponent} from './stock/lpo/wed.component';
import {ProductCatalogueComponent} from './stock/product-catalogue/product-catalogue.component';
import {LpoListComponent} from './stock/lpo-list/lpo-list.component';
import {LpoDetailComponent} from './stock/lpo-list/lpo-detail.component';
import {SalesComponent,SalesOrderComponent1} from './sales/sales.component';
import {SalesOrderComponent} from './sales/salesorder.component';
import {TestComponent} from './stock/lpo/test.component';
import {SalesDialog} from './sales/sales-dialog';
import {CustomersComponent} from './customers/customers.component';
import {CustomerDialog} from './customers/customer.dialog';
import {SuppliersComponent} from './stock/suppliers/suppliers.component';
import {SupplierDialogComponent} from './stock/suppliers/suppliers.dialog';
import {SalesReportComponent} from './reports/salesreport/salesreport.component';
import {StockReportComponent} from './reports/stockreport/stockreport.component';
import {FilterDevicess} from './device/filterDevices';
import {DeviceDialog} from './device/device-dialog';
import {ServiceModule} from './services.module';
import {MaterialModule} from './material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';
import {DialogService} from './dialog.service';
import {HttpClientModule} from '@angular/common/http';
import { LPOService } from './stock/lpo/lpo.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersPageComponent,
    LayoutComponent,
    NavListComponent,
    LoginFormComponent,
    RegisterFormComponent,
    DashboardComponent,DeviceFirmwareComponent,ProductsComponent,SalesComponent,SalesOrderComponent,SalesDialog,ProductDialog,
    PageDirective,DeviceDialog,DeviceComponent,DeviceListComponent,FilterDevicess,PageNotFoundComponent,
    CustomersComponent,CustomerDialog,SupplierDialogComponent,SuppliersComponent,SalesReportComponent,StockReportComponent,
    SalesOrderComponent1,LpoComponent,TestComponent,WedComponent,ProductCatalogueComponent,LpoListComponent,LpoDetailComponent
  ],
  imports: [
    BrowserModule,CommonModule,BrowserAnimationsModule,AppRoutingModule,ReactiveFormsModule,FormsModule,MaterialModule,
    FlexLayoutModule,ChartsModule,ServiceModule,HttpClientModule

  ],
  providers: [UserFormService,DialogService,StockService,LPOService],
  entryComponents:[LoginFormComponent,RegisterFormComponent,DeviceDialog,ProductDialog,SalesDialog,CustomerDialog,
  SupplierDialogComponent],
  exports:[FlexLayoutModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
