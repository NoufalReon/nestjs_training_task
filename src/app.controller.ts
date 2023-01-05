import { custDto } from './customer.dto';
import { cars, demo1, demo2 } from './demo.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileTransform } from './common/pipes/parse-file.pipe';
import { diskStorage } from 'multer';
import { editFileName } from './utils/randomFileNameCreator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post()
  createcar(@Body() dto: demo1) {
    console.log(dto);
    dto.car_created = new Date();
    dto.car_updated = new Date();
    return this.appService.createcar(dto);
  }

  @Get(':id')
  getCar(@Param('id', ParseIntPipe) id: number) {
    return this.appService.getCar(id);
  }

  @Patch('/:id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() dto: demo1) {
    console.log(id);
    return this.appService.updateCar(id, dto);
  }

  @Delete('/:id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.appService.deleteCar(id);
  }

  @Get()
  getAllCars() {
    return this.appService.getAllCars();
  }

  // @Post('bike')
  // createBike(@Body() dto: demo2) {
  //   dto.bike_created = new Date();
  //   dto.bike_updated = new Date();
  //   return this.appService.createbike(dto);
  // }

  @Post('/customer')
  creteCustomer(@Body() dto: custDto) {
    dto.customer_created = new Date();
    dto.cutomer_updated = new Date();
    return this.appService.createCust(dto);
  }

  @Get('customer/allcustomer/:startindex/:noofitem')
  getAll(
    @Param('startindex') startindex: string,
    @Param('noofitem') noofitem: string,
  ) {
    return this.appService.getAllCustomer(
      parseInt(startindex),
      parseInt(noofitem),
    );
  }

  @Post('upload/img')
  @UseInterceptors(
    FilesInterceptor('car_1_img', 20, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  uploadFile(
    @Body() dto: cars,
    @UploadedFiles(new FileTransform(false, 0.5, ['jpeg', 'png', 'jpg']))
    file: Array<Express.Multer.File>,
  ) {
    console.log(file);
    dto.car_1_created = new Date();
    dto.car_1_updated = new Date();
    dto.car_1_img = file && file.length > 0 ? file[0].filename : null;
    console.log(dto);
    return this.appService.CreateImagedCar(dto);
  }

  @Get('cars/allcarimg')
  getAllimgCar() {
    return this.appService.getAllCarsimage();
  }
}
