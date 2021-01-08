import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EventDetailsComponent } from "./event-details/event-details.component";
import { EventComponent } from "./event.component";
import { PeopleComponent } from "./people/people.component";

const eventRoutes: Routes = [
  {path: 'eventos', component: EventComponent},
  {path: 'eventos/:id', component: EventDetailsComponent}
  //{path: 'eventos/:id/pessoas', component: PeopleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(eventRoutes)],
  exports: [RouterModule]
})
export class EventRoutingModule{}