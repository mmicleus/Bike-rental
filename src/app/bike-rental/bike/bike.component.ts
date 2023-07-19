import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bike',
  templateUrl: './bike.component.html',
  styleUrls: ['./bike.component.css'],
})
export class BikeComponent {
  @Input() bike?: {
    type: string;
    price: number;
    model: string;
    src: string;
    infoPage: string;
  };

  ngOnInit() {
    // this.bike = {
    //   type: 'HardTail',
    //   price: 35,
    //   model: 'Vitus Sentier 29 VR',
    //   src: 'https://storage.googleapis.com/cf-public-eu/biking-32277/media/264-2?t=1656628557608996',
    //   infoPage:
    //     'https://vitusbikes.com/products/vitus-sentier-29-vr-mountain-bike',
    // };
  }
}
