import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  CreateRideRequest,
  CreateRideResponse,
  GetRideRequest,
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
  RideService as GrpcRideService,
} from '../../proto/ride';
import { Observable, from } from 'rxjs';

@Injectable()
export class RideService implements OnModuleInit {
  private rideService: GrpcRideService;

  constructor(@Inject('RIDE_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.rideService = this.client.getService<GrpcRideService>('RideService');
  }

  CreateRide(data: CreateRideRequest): Observable<CreateRideResponse> {
    return from(this.rideService.CreateRide(data));
  }

  GetRide(rideId: string): Observable<GetRideResponse> {
    return from(this.rideService.GetRide({ rideId }));
  }

  ListRides(driverId: string): Observable<ListRidesResponse> {
    return from(this.rideService.ListRides({ driverId }));
  }

  UpdateRide(data: UpdateRideRequest): Observable<UpdateRideResponse> {
    return from(this.rideService.UpdateRide(data));
  }

  DeleteRide(rideId: string): Observable<DeleteRideResponse> {
    return from(this.rideService.DeleteRide({ rideId }));
  }

  FindRidesByLocation(
    startLocation: string,
    endLocation: string,
  ): Observable<FindRidesByLocationResponse> {
    return from(this.rideService.FindRidesByLocation({ startLocation, endLocation })); 
  }

  JoinRide(rideId: string, passengerId: string): Observable<JoinRideResponse> {
    return from(this.rideService.JoinRide({ rideId, passengerId }));
  }

  LeaveRide(rideId: string, passengerId: string): Observable<LeaveRideResponse> {
    return from(this.rideService.LeaveRide({ rideId, passengerId }));
  }

  ChangeRideStatus(rideId: string, status: string): Observable<ChangeRideStatusResponse> {
    return from(this.rideService.ChangeRideStatus({ rideId, status })); 
  }
}