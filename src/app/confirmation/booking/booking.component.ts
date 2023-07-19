import { Component, Input } from '@angular/core';
import { Booking } from 'src/app/shared/booking.model';
import { DataService } from 'src/app/shared/data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  @Input() booking?: Booking;
  @Input() isLast: boolean = false;
  @Input() index: number = 0;

  constructor(private dataService: DataService) {}

  onRemove() {
    this.dataService.removeBooking(this.index);
    
  }
}
