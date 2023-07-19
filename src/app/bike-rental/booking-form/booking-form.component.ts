import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth.service';
import { Booking } from 'src/app/shared/booking.model';
import { DataService } from 'src/app/shared/data.service';
import { UtilityService } from 'src/app/shared/utility.service';

@Component({
  selector: 'app-booking-form',
  templateUrl: './booking-form.component.html',
  styleUrls: ['./booking-form.component.css'],
})
export class BookingFormComponent {
  constructor(
    public utilityService: UtilityService,
    public dataService: DataService,
    public router: Router,
    private authService:AuthService
  ) {}

  form: FormGroup = new FormGroup({});

  @ViewChild('timeframes') timeframes?: ElementRef;

  @Input() bikes?: {
    type: string;
    price: number;
    model: string;
    src: string;
    infoPage: string;
  }[];

  time: string | null = '10:00 am - 1:00pm';

  booking: Booking = new Booking(
    'Road Bike',
    2,
    35,
    70,
    '2020-01-01',
    '10 am - 4pm'
  );

  notificationOn: boolean = false;

  onTimeframeClicked(event: MouseEvent) {
    let elem = event.target as HTMLElement;

    (this.timeframes?.nativeElement as HTMLElement)
      .querySelectorAll('.timeframe')
      .forEach((elem) => elem.classList.remove('selected'));

    elem.classList.add('selected');

    this.time = elem.textContent;

    this.createBooking();
  }

  ngOnInit() {
    this.form = new FormGroup({
      bikeOptions: new FormControl(null, Validators.required),
      quantity: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(9),
      ]),
      date: new FormControl(this.utilityService.getCurrentDate()),
    });

    this.createBooking();
    this.form.valueChanges.subscribe((value) => {
      this.createBooking();
    });
  }

  minus() {
    let quantityControl = this.form.get('quantity');

    console.log(this.form);

    this.form.patchValue({
      quantity: this.utilityService.clampLow(quantityControl?.value - 1, 0),
    });
  }

  plus() {
    let quantityControl = this.form.get('quantity');

    console.log(this.form);

    this.form.patchValue({
      quantity: quantityControl?.value + 1,
    });
  }

  lowerThanOne(control: FormControl): { [s: string]: boolean } | null {
    if (control.value == 0) {
      return { quantityIsZero: true };
    }

    return null;
  }

  createBooking() {
    this.booking.model = this.form.get('bikeOptions')?.value;

    this.booking.price = this.utilityService.getBikePrice(
      this.form.get('bikeOptions')?.value,
      this.bikes
    );

    this.booking.quantity = this.form.get('quantity')?.value;

    this.booking.cost = this.booking.price! * this.booking.quantity;

    this.booking.date = this.utilityService.getFormattedDate(
      this.form.get('date')?.value
    );

    this.booking.time = this.time!;

    console.log(this.booking);
  }

  addToCart() {
    if(!this.authService.account) {
      this.router.navigate(["/auth"],{queryParams:{'alertMessage':'You must log in!'}});
      return;
    }

    this.dataService.addBooking({ ...this.booking });
    this.notificationOn = true;
  }

  onAlertClose() {
    this.notificationOn = false;
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }
}
