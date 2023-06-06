import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterCustomerComponent} from './components/register-customer/register-customer.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {CustomerRoutingModule} from './customer-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from "@angular/material/icon";
import { MyCustomerAccountComponent } from './components/my-customer-account/my-customer-account.component';
import {MatCardModule} from "@angular/material/card";


@NgModule(
    {
        declarations: [
            RegisterCustomerComponent,
            MyCustomerAccountComponent,
        ],
        imports: [
            CommonModule,

            // routing
            CustomerRoutingModule,

            // importing reactive form
            FormsModule,
            ReactiveFormsModule,

            // users modules
            MatInputModule,
            MatButtonModule,
            MatProgressSpinnerModule,
            MatCheckboxModule,
            MatDialogModule,
            MatIconModule,
            MatCardModule
        ],
        exports: [
            RegisterCustomerComponent
        ],
        providers: [
            {
                provide: MAT_DIALOG_DEFAULT_OPTIONS,
                useValue: {
                    hasBackdrop: true
                }
            }
        ]
    }
)
export class CustomerModule {
}
