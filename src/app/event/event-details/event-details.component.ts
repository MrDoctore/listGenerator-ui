import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit {
  public id: any;
  event: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.event = history.state.data;
    this.route.params.subscribe((params: any) => {
      this.id = params['id'];
    });
  }
}
