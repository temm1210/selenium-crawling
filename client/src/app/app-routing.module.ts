import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
    {path:'', component: HomeComponent},
    {path:'kospi', loadChildren:'./kospi/kospi.module#KospiModule'}
];

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[
        RouterModule
    ]    
})
export class AppRoutingModule{}