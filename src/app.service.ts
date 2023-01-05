import { custDto } from './customer.dto';
import { demo1, demo2, cars } from './demo.dto';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class AppService {
  async createcar(dto: demo1) {
    const car = await prisma.demo1.create({
      data: dto,
    });
    return car;
  }

  async getCar(id: number) {
    const Getcar = await prisma.demo1.findUnique({
      where: {
        car_id: id,
      },
    });
    return Getcar;
  }

  async updateCar(id: number, dto: demo1) {
    const Updatecar = await prisma.demo1.update({
      where: {
        car_id: id,
      },
      data: dto,
    });
    return Updatecar;
  }

  async deleteCar(id: number) {
    const deleteCar = await prisma.demo1.delete({
      where: {
        car_id: id,
      },
    });
    return deleteCar;
  }

  async getAllCars() {
    const getall = await prisma.demo1.findMany();
    return getall;
  }

  async createbike(dto: demo2) {
    const customer = await prisma.demo2.create({
      data: dto,
    });
    return customer;
  }

  async createCust(dto: custDto) {
    const cust = await prisma.customer.create({
      data: dto,
    });
    return cust;
  }

  async getAllCustomer(startindex, noofitem) {
    const allcust = await prisma.customer.findMany({
      skip: startindex,
      take: noofitem,
      include: {
        demo1: true,
      },
    });
    return allcust;
  }

  async CreateImagedCar(dto: cars) {
    const allimg = await prisma.car_1_data.create({
      data: dto,
    });
    return allimg;
  }

  async getAllCarsimage() {
    const AllimgCar = await prisma.car_1_data.findMany();
    return AllimgCar;
  }
}
