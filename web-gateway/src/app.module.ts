import { Module } from '@nestjs/common';
import { GatewayService } from './gateway/gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios';
import { join } from 'path';
import { RideController } from './gateway/controllers/ride.controller';
import { UserController } from './gateway/controllers/user.controller';
import { ReservationController } from './gateway/controllers/reservation.controller';
import { RideService } from './gateway/services/ride.service'; 
import { UserService } from './gateway/services/user.service'; 
import { ReservationService } from './gateway/services/reservation.service';

@Module({
  imports: [
    HttpModule,
    ClientsModule.register([
      {
        name: 'RIDE_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'rideservice',
          protoPath: join(__dirname, '../src/proto/ride.proto'),
          url: 'localhost:8080',
        },
      },
    ]),
  ],
  controllers: [RideController, UserController, ReservationController],
  providers: [GatewayService, RideService, UserService, ReservationService],
})
export class AppModule {}