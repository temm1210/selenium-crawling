import { ShareModule } from './../share/share.module';
import { KospiRouting } from './kospi.routing';
import { KospiComponent } from './kospi.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KospiDayComponent } from './kospi-day/kospi-day.component';
import { KospiTimeComponent } from './kospi-time/kospi-time.component';

@NgModule({
    imports:[
        CommonModule,
        KospiRouting,
        ShareModule
    ],
    declarations:[
        KospiComponent,
        KospiDayComponent,
        KospiTimeComponent
    ]
})
export class KospiModule {}