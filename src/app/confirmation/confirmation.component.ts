import { Component } from '@angular/core';
import { DataService } from '../shared/data.service';
import { Booking } from '../shared/booking.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  bookings: Booking[] = [];
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit() {
    this.bookings = this.dataService.getBookings();
    this.dataService.bookingChanged.subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  browseInventory() {
    this.router.navigate(['/']);
  }

  getSubtotal() {
    let sum = 0;
    this.bookings.forEach((booking) => {
      sum += booking.cost!;
    });

    return sum;
  }
}
