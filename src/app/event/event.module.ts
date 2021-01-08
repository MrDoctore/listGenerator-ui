import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EventRoutingModule } from './event-routing.module';
import { EventComponent } from './event.component';
import { PeopleComponent } from './people/people.component';
import { HttpClientModule } from '@angular/common/http';
import { EventDetailsComponent } from './event-details/event-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EventRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
  ],
  exports: [],
  declarations: [EventComponent, PeopleComponent, EventDetailsComponent],
  providers: [],
})
export class EventModule {}
