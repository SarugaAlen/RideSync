// src/gateway/controllers/reservation.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { GatewayService } from '../gateway.service';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Get()
  getAllReservations() {
    return this.gatewayService.getAllReservations();
  }

  @Get('/:id')
  getReservation(@Param('id') id: number) {
    return this.gatewayService.getReservation(id);
  }

  @Get('/user/:userId')
  getReservationsByUser(@Param('userId') userId: number) {
    return this.gatewayService.getReservationsByUser(userId);
  }

  @Get('/ride/:rideId')
  getReservationsByRide(@Param('rideId') rideId: number) {
    return this.gatewayService.getReservationsByRide(rideId);
  }

  @Post()
  createReservation(@Body() body: any) {
    return this.gatewayService.createReservation(body);
  }

  @Post('/full')
async createFullReservation(@Body() body: any) {
  const { userId, rideId, status } = body;

  if (!userId || !rideId || !status) {
    throw new Error('userId, rideId, and status are required');
  }

  const user = await this.gatewayService.findUserById(userId);
  if (!user) {
    throw new Error(`User with ID ${userId} not found`);
  }

  const ride = await this.gatewayService.getRide(rideId).toPromise();
  if (!ride) {
    throw new Error(`Ride with ID ${rideId} not found`);
  }

  const reservation = await this.gatewayService.createReservation({ userId, rideId, status });

  return {
    message: 'Reservation created successfully',
    reservation,
    user,
    ride,
  };
}

  @Put('/:id')
  updateReservation(@Param('id') id: number, @Body() body: any) {
    return this.gatewayService.updateReservation(id, body);
  }

  @Put('/:id/status/:status')
  updateReservationStatus(@Param('id') id: number, @Param('status') status: string) {
    return this.gatewayService.updateReservationStatus(id, status);
  }

  @Delete('/:id')
  deleteReservation(@Param('id') id: number) {
    return this.gatewayService.deleteReservation(id);
  }
}