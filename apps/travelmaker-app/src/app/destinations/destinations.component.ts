import { Component, OnInit } from '@angular/core';
import { DestinationsFacade } from './+state/destinations.facade';


@Component({
  selector: 'travelmaker-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  constructor(public facade: DestinationsFacade) { }

  ngOnInit(): void {
    this.facade.init()
  }

}
