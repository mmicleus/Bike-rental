export class UtilityService {
  capitalize(word: string) {
    let firstLetter: string;
    let restOfWord: string;

    firstLetter = word.charAt(0).toUpperCase();
    restOfWord = word.slice(1);

    return firstLetter + restOfWord;
  }

  getBikeOptions(
    bikes?: {
      type: string;
      price: number;
      model: string;
      src: string;
      infoPage: string;
    }[]
  ): string[] | undefined {
    let bikeTypes: string[] | undefined;
    let bikeOptions: string[] | undefined = [];

    bikeTypes = bikes?.map((bike) => bike.type);

    bikeTypes?.forEach((bike) => {
      bikeOptions?.push(bike + ' - ' + 'Small');
      bikeOptions?.push(bike + ' - ' + 'Medium');
      bikeOptions?.push(bike + ' - ' + 'Large');
    });

    return bikeOptions;
  }

  appendZero(num: string) {
    if (Number.parseInt(num) <= 9) {
      num = '0' + num;
    }

    return num;
  }

  getCurrentDate() {
    let currentDate = new Date();

    let date = this.appendZero(currentDate.getDate().toString());
    let month = (currentDate.getMonth() + 1).toString();
    month = this.appendZero(month);
    let year = currentDate.getFullYear().toString();

    // console.log(`${year}-${month}-${date}`);

    return `${year}-${month}-${date}`;
  }

  getLaterDate(days: number) {
    const millisInDay: number = 86400000;

    let currentDate = new Date(new Date().getTime() + millisInDay * days);

    let date = this.appendZero(currentDate.getDate().toString());
    let month = (currentDate.getMonth() + 1).toString();
    month = this.appendZero(month);
    let year = currentDate.getFullYear().toString();

    // console.log(`${year}-${month}-${date}`);

    return `${year}-${month}-${date}`;
  }

  clampLow(num: number, min: number) {
    return num < min ? min : num;
  }

  getBikePrice(
    option: string,
    bikes?: {
      type: string;
      price: number;
      model: string;
      src: string;
      infoPage: string;
    }[]
  ) {
    // let type = option.split(' ')[0];

    let bike = bikes?.find((bike) => option.includes(bike.type));

    return bike?.price;
  }

  getTotalCost(bikePrice: number | undefined, quantity: string) {
    return bikePrice! * +quantity;
  }

  getFormattedDate(date: string) {
    let dateObj = new Date(date);

    let dateParts = dateObj.toString().split(' ');
    let result: string = '';

    for (let i = 0; i < 4; i++) {
      if (i === 3) result += ', ';
      result += dateParts[i] + ' ';
    }

    return result;
  }
}
