import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { NgModule} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {SplitButtonModule} from 'primeng/splitbutton';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {CheckboxModule} from 'primeng/checkbox';
import {InputTextModule} from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {DropdownModule} from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import {DialogModule} from 'primeng/dialog';
import {SidebarModule} from 'primeng/sidebar';
import {FullCalendarModule} from 'primeng/fullcalendar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TasksComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    AppRoutingModule,
    PanelModule ,
    SplitButtonModule,
    ToastModule,
    TableModule,
    SidebarModule,
    HttpClientModule,
    CheckboxModule,
    InputTextModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    FullCalendarModule,
    ReactiveFormsModule
    
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
