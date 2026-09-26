import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from "./admin-login/admin-login.component";
import { AdminComponent } from "./admin.component";


const route: Routes = [
    {
        path: '', component: AdminComponent, children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          { path: 'login', component: AdminLoginComponent },
          {
              path:'sadmin',
            loadChildren:()=>import('./sadmin/sadmin.module').then((m)=>m.SadminModule)
          },
          {
            path:'nadmin',
            loadChildren : ()=>import('./nadmin/nadmin.module').then(m=>m.NadminModule)
          },       
          {
            path: 'manager',
            loadChildren : ()=>import('./manager/manager.module').then(m=>m.ManagerModule)
          },
          {
            path: 'padmin', 
            loadChildren :()=> import('./padmin/padmin.module').then(m=>m.PadminModule)
          },
        ],
      }
];


@NgModule({
    imports:[
        RouterModule.forChild(route)
    ],
    exports:[
        RouterModule
    ]
})

export class AdminRoutingModule {}