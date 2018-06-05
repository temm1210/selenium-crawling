import { KospiComponent } from './kospi.component';

import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {path:'', component: KospiComponent}
];
export const KospiRouting = RouterModule.forChild(routes);