import { Injectable } from '@nestjs/common';
import { RideService } from './services/ride.service';
import { UserService } from './services/user.service';
import { ReservationService } from './services/reservation.service';
import { Observable } from 'rxjs';
import {
  CreateRideRequest,
  CreateRideResponse,
  GetRideResponse,
  ListRidesRequest,
  ListRidesResponse,
  UpdateRideRequest,
  UpdateRideResponse,
  DeleteRideRequest,
  DeleteRideResponse,
  FindRidesByLocationRequest,
  FindRidesByLocationResponse,
  JoinRideRequest,
  JoinRideResponse,
  LeaveRideRequest,
  LeaveRideResponse,
  ChangeRideStatusRequest,
  ChangeRideStatusResponse,
} from '../proto/ride';

@Injectable()
export class GatewayService {
  constructor(
    private readonly rideService: RideService,
    private readonly userService: UserService,
    private readonly reservationService: ReservationService,
  ) {}

  getRide(ride_id: string): Observable<GetRideResponse> {
    return this.rideService.GetRide(ride_id);
  }

  createRide(data: CreateRideRequest): Observable<CreateRideResponse> {
    return this.rideService.CreateRide(data);
  }

  listRides(driver_id: string): Observable<ListRidesResponse> {
    return this.rideService.ListRides(driver_id);
  }

  updateRide(data: UpdateRideRequest): Observable<UpdateRideResponse> {
    return this.rideService.UpdateRide(data);
  }

  deleteRide(ride_id: string): Observable<DeleteRideResponse> {
    return this.rideService.DeleteRide(ride_id);
  }

  findRidesByLocation(
    start_location: string,
    end_location: string,
  ): Observable<FindRidesByLocationResponse> {
    return this.rideService.FindRidesByLocation(start_location, end_location);
  }

  joinRide(ride_id: string, passenger_id: string): Observable<JoinRideResponse> {
    return this.rideService.JoinRide(ride_id, passenger_id);
  }

  leaveRide(ride_id: string, passenger_id: string): Observable<LeaveRideResponse> {
    return this.rideService.LeaveRide(ride_id, passenger_id);
  }

  changeRideStatus(ride_id: string, status: string): Observable<ChangeRideStatusResponse> {
    return this.rideService.ChangeRideStatus(ride_id, status);
  }

  // User-related (delegate to UserService)
  async registerUser(data: any) {
    return this.userService.registerUser(data);
  }

  async updateUser(userId: number, updateData: any) {
    return this.userService.updateUser(userId, updateData);
  }

  async deleteUser(userId: number) {
    return this.userService.deleteUser(userId);
  }

  async findUserById(userId: number) {
    return this.userService.findUserById(userId);
  }

  async findAllUsers() {
    return this.userService.findAllUsers();
  }

  async findUserByEmail(email: string) {
    return this.userService.findUserByEmail(email);
  }

  // Reservation-related (delegate to ReservationService)
  async getAllReservations() {
    return this.reservationService.getAllReservations();
  }

  async getReservation(reservationId: number) {
    return this.reservationService.getReservation(reservationId);
  }

  async getReservationsByUser(userId: number) {
    return this.reservationService.getReservationsByUser(userId);
  }

  async getReservationsByRide(rideId: number) {
    return this.reservationService.getReservationsByRide(rideId);
  }

  async createReservation(data: any) {
    return this.reservationService.createReservation(data);
  }

  async updateReservation(id: number, data: any) {
    return this.reservationService.updateReservation(id, data);
  }

  async updateReservationStatus(id: number, status: string) {
    return this.reservationService.updateReservationStatus(id, status);
  }

  async deleteReservation(id: number) {
    return this.reservationService.deleteReservation(id);
  }
}