import { Subject } from 'rxjs';
import { Booking } from './booking.model';

export class DataService {
  bookings: Booking[] = [];
  // new Booking('Hard-tail - medium', 2, 35, 70, '2020-01-01', '10am - 4pm'),
  // new Booking(
  //   'Full-Suspension - medium',
  //   10,
  //   10,
  //   100,
  //   '2020-01-01',
  //   '10am - 4pm'
  // ),

  bookingChanged: Subject<Booking[]> = new Subject();

  addBooking(booking: Booking) {
    this.bookings.push(booking);
    this.bookingChanged.next([...this.bookings]);
  }

  getBookings() {
    return [...this.bookings];
  }

  removeBooking(index: number) {
    this.bookings.splice(index, 1);
    this.bookingChanged.next([...this.bookings]);
  }

  deleteBookings() {
    this.bookings = [];
    this.bookingChanged.next([...this.bookings]);
  }
}
