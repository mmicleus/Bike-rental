export class Booking {
  //   model: string;
  //   quantity: number;
  //   cost: number;
  //   date: string;

  constructor(
    public model: string,
    public quantity: number,
    public price: number | undefined,
    public cost: number | undefined,
    public date: string,
    public time: string
  ) {}
}
