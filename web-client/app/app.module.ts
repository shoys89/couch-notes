import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule }    from '@angular/http';
import {FormsModule} from '@angular/forms';
import { routing } from './app.routes';
 import { PrivateComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import {AuthenticationService} from './_services/auth.service'
import {TruncatePipe} from './_pipes/truncate.pipe'

@NgModule({
    imports: [ BrowserModule,HttpModule,FormsModule,routing ],
    declarations: [ AppComponent,PrivateComponent, LoginComponent, RegisterComponent,TruncatePipe],
    bootstrap:    [ AppComponent ],
    providers: [AuthenticationService]
})
export class AppModule { }