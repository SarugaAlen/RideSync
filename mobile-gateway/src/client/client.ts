import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import path from 'path';

const PROTO_PATH = path.resolve(__dirname, '../proto/ride.proto');
const packageDefinition = loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

// Load the gRPC object
const grpcObject = loadPackageDefinition(packageDefinition) as any;

// Create and export the RideService client
const RideServiceClient = new grpcObject.rideservice.RideService(
  'localhost:50051',
  credentials.createInsecure()
);

export default RideServiceClient;