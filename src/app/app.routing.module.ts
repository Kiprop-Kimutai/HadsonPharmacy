import {NgModule} from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {LayoutComponent} from './layout/layout.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DeviceListComponent} from './device/device-list.component';
import {DeviceFirmwareComponent} from './device_firmware/device_firmware';
import {DeviceComponent} from './device/device.component';
import {ProductsComponent} from './stock/products/products.component';
import {ProductCatalogueComponent} from './stock/product-catalogue/product-catalogue.component';
import {LpoListComponent} from './stock/lpo-list/lpo-list.component';
import {LpoComponent} from './stock/lpo/lpo.component';
import {LpoDetailComponent} from './stock/lpo-list/lpo-detail.component';
import {WedComponent} from './stock/lpo/wed.component';
import {SalesComponent} from './sales/sales.component';
import {CustomersComponent} from './customers/customers.component';
import {SuppliersComponent} from './stock/suppliers/suppliers.component';
import {SalesReportComponent} from './reports/salesreport/salesreport.component';
import {StockReportComponent} from './reports/stockreport/stockreport.component';
import {PageNotFoundComponent} from './page-not-found.component';
import {AuthGuardService} from './auth-guard.service';
import {CanDeactivateGuard} from './can-deactivate-guard.service';

const appRoutes:Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'layout',
    component:LayoutComponent,
    children:[
      {
      path:'',
      canActivate:[AuthGuardService],
      children:[
      {
        path:'',
        component:DashboardComponent
      },
      {
        path:'devices',
        children:[
          {
            path:'device-list',
            component:DeviceListComponent
          },
          {
            path:'device_firmware',
            component:DeviceFirmwareComponent
          },
          {
            path:'device-list/:id',
            component:DeviceComponent,
            canDeactivate:[CanDeactivateGuard]
          },
          {
            path:'',
            component:DeviceListComponent
          }
        ]
      },
     /* {
        path:'devices',
        component:DeviceListComponent
      },
      {
        path:'device_firmware',
        component:DeviceFirmwareComponent
      },
      {
        path:'device/:id',
        component:DeviceComponent,
        canDeactivate:[CanDeactivateGuard]
      },*/
      {
        path:'dashboard',
        component:DashboardComponent
      },
      {
        path:'stock-management',
        children:[
          {
            path:'purchase_order',
            component:LpoComponent
          },
          {
            path:'lpolist',
            component:LpoListComponent
          },
          {
            path:'lpolist/:id',
            component:LpoDetailComponent
          },
          {
          path:'products',
          component:ProductsComponent
          },
          {
            path:'suppliers',
            component:SuppliersComponent
          },
          {
            path:'catalogue',
            component:ProductCatalogueComponent
          }
        ]
      },

      /*{
        path:'purchase_order',
        component:LpoComponent
      },
      {
        path:'products',
        component:ProductsComponent
      },*/
      {
        path:'sales',
        component:SalesComponent
      },
      {
        path:'customers',
        component:CustomersComponent
      },
      {
        path:'suppliers',
        component:SuppliersComponent
      },
      {
        path:'reports',
        children:[
          {
            path:'salesreport',
            component:SalesReportComponent
          },
          {
            path:'stockreport',
            component:StockReportComponent
          }
        ]
      },
      {
        path:'firmware',
        loadChildren:'app/firmware/firmware-module#FirmwareModule'
      }
    ]
    }
    ]
  },
  {
    path:'**',
    component:PageNotFoundComponent
  }
]
@NgModule({
  imports:[RouterModule.forRoot(appRoutes/*,{enableTracing:true}*/)],
  declarations:[],
  providers:[],
  exports:[RouterModule]
})
export class AppRoutingModule{}
