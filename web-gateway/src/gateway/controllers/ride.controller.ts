import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { GatewayService } from '../gateway.service';
import { Observable } from 'rxjs';
import {
  CreateRideRequest,
  CreateRideResponse,
  GetRideResponse,
  ListRidesResponse,
  UpdateRideRequest,
  UpdateRideResponse,
  DeleteRideResponse,
  FindRidesByLocationResponse,
  JoinRideResponse,
  LeaveRideResponse,
  ChangeRideStatusResponse,
} from '../../proto/ride';

@Controller('rides')
export class RideController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  createRide(@Body() createRideDto: CreateRideRequest): Observable<CreateRideResponse> {
    return this.gatewayService.createRide(createRideDto);
  }

  @Get('/:id')
  getRide(@Param('id') id: string): Observable<GetRideResponse> {
    return this.gatewayService.getRide(id);
  }

  @Get('/driver/:driverId')
  listRides(@Param('driverId') driverId: string): Observable<ListRidesResponse> {
    return this.gatewayService.listRides(driverId);
  }

  @Put('/:id')
  updateRide(
    @Param('id') id: string,
    @Body() updateRideDto: UpdateRideRequest,
  ): Observable<UpdateRideResponse> {
    updateRideDto.rideId = id;
    return this.gatewayService.updateRide(updateRideDto);
  }

  @Delete('/:id')
  deleteRide(@Param('id') id: string): Observable<DeleteRideResponse> {
    return this.gatewayService.deleteRide(id);
  }

  @Get('/location')
  findRidesByLocation(
    @Query('start') start_location: string,
    @Query('end') end_location: string,
  ): Observable<FindRidesByLocationResponse> {
    return this.gatewayService.findRidesByLocation(start_location, end_location);
  }

  @Post('/:rideId/join/:passengerId')
  joinRide(
    @Param('rideId') rideId: string,
    @Param('passengerId') passengerId: string,
  ): Observable<JoinRideResponse> {
    return this.gatewayService.joinRide(rideId, passengerId);
  }

  @Post('/:rideId/leave/:passengerId')
  leaveRide(
    @Param('rideId') rideId: string,
    @Param('passengerId') passengerId: string,
  ): Observable<LeaveRideResponse> {
    return this.gatewayService.leaveRide(rideId, passengerId);
  }

  @Put('/:rideId/status/:status')
  changeRideStatus(
    @Param('rideId') rideId: string,
    @Param('status') status: string,
  ): Observable<ChangeRideStatusResponse> {
    return this.gatewayService.changeRideStatus(rideId, status);
  }
}