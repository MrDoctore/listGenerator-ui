import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from './event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit {
  event: any = {};
  events: any = [];

  constructor(
    private eventService: EventService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  setEvent(event: any) {
    this.event = event;
  }

  list() {
    this.eventService
      .list()
      .subscribe((response) => (this.events = <any>response));
  }

  addEvent() {
    this.eventService.add(this.event).subscribe(
      () => {
        this.toastr.success('Registro inserido');
        this.list();
      },
      (response) => {
        let msg = 'Erro inesperado';
        if (response.error.fieldMessage) {
          msg = response.error.fieldMessage;
        }
        this.toastr.error(msg, 'Erro!');
      }
    );
  }

  updateEvent() {
    this.eventService.update(this.event).subscribe(() => {
      this.toastr.success('Registro atualizado');
      this.clear();
      this.list();
    });
  }

  deleteEvent() {
    this.eventService.delete(this.event.id).subscribe(() => {
      this.clear();
      this.list();
      this.toastr.success('Registro excluído');
    });
  }

  access(event: any) {
    this.router.navigate(['eventos/', event.id], { state: { data: event } });
    this.event = event;
  }

  clear() {
    this.event = {};
  }
}
