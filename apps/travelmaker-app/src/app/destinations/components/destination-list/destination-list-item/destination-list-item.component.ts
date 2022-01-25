import { Component, Input } from '@angular/core';
import { DestinationsEntity } from '../../../+state/destinations.models';

@Component({
  selector: 'travelmaker-destination-list-item',
  templateUrl: './destination-list-item.component.html',
  styleUrls: ['./destination-list-item.component.scss']
})
export class DestinationListItemComponent {
  @Input() destination: DestinationsEntity | undefined;
}
