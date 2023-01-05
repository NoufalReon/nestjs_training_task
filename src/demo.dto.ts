import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class demo1 {
  car_name: string;
  car_type: string;
  car_created: Date;
  car_updated: Date;
}

export class demo2 {
  bike_name: string;
  bike_created: Date;
  bike_updated: Date;
  bike_type: string;
}

export class cars {
  @IsString()
  car_1_name: string;
  car_1_created: Date;
  car_1_updated: Date;
  @IsString()
  car_1_type: string;
  car_1_img: any;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  car_1_price: number;
}
