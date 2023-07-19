import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserDetails } from './user-details.model';
import { Booking } from './booking.model';

@Injectable()
export class NetworkService {
  constructor(private http: HttpClient) {}

  fetchData() {
    return this.http.get<{
      [st: string]: {
        bikes: {
          type: string;
          price: number;
          model: string;
          src: string;
          infoPage: string;
        }[];
      };
    }>(
      'https://biking-80c26-default-rtdb.europe-west1.firebasedatabase.app/data.json'
    );
  }

  registerBooking(data: { userDetails: UserDetails; bookings: Booking[] }) {
    return this.http.put(
      'https://biking-80c26-default-rtdb.europe-west1.firebasedatabase.app/registration.json',
      data
    );
  }
}
