import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Booking } from 'src/app/shared/booking.model';
import { DataService } from 'src/app/shared/data.service';
import { NetworkService } from 'src/app/shared/network.service';
import { UserDetails } from 'src/app/shared/user-details.model';

@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css'],
})
export class CheckoutFormComponent {
  // form: FormGroup = new FormGroup({});
  form?: FormGroup;
  submitted: boolean = false;

  constructor(
    private dataService: DataService,
    private networkService: NetworkService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, [Validators.required]),
      joinList: new FormControl(false),
      termsAgreed: new FormControl(false, [Validators.requiredTrue]),
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form?.invalid) return;

    let data: { userDetails: UserDetails; bookings: Booking[] } = {
      userDetails: new UserDetails(
        this.form?.get('firstName')?.value,
        this.form?.get('surname')?.value,
        this.form?.get('email')?.value,
        this.form?.get('phone')?.value,
        this.form?.get('joinList')?.value
      ),
      bookings: this.dataService.getBookings(),
    };

    this.networkService.registerBooking(data).subscribe((response) => {
      this.dataService.deleteBookings();
      this.router.navigate(['/success']);
    });
  }
}
