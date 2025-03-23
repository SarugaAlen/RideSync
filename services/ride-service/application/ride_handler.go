package application

import (
	"context"

	rideservice "github.com/alensaruga/ride-service"
	"github.com/alensaruga/ride-service/domain/entity"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

type RideHandler struct {
	rideservice.UnimplementedRideServiceServer
	rideUseCase *RideUseCase
}

func NewRideHandler(rideUC *RideUseCase) *RideHandler {
	return &RideHandler{rideUseCase: rideUC}
}

func (h *RideHandler) CreateRide(ctx context.Context, req *rideservice.CreateRideRequest) (*rideservice.CreateRideResponse, error) {
	ride := &entity.Ride{
		DriverID:      req.DriverId,
		StartLocation: req.StartLocation,
		EndLocation:   req.EndLocation,
		PassengerIDs:  req.PassengerIds,
		DateTime:      req.DateTime,
		Status:        "scheduled",
	}
	err := h.rideUseCase.CreateRide(ride)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not create ride: %v", err)
	}
	return &rideservice.CreateRideResponse{RideId: ride.ID}, nil
}

func (h *RideHandler) GetRide(ctx context.Context, req *rideservice.GetRideRequest) (*rideservice.GetRideResponse, error) {
	ride, err := h.rideUseCase.GetRide(req.RideId)
	if err != nil {
		return nil, status.Errorf(codes.NotFound, "ride not found: %v", err)
	}
	return &rideservice.GetRideResponse{
		RideId:        ride.ID,
		DriverId:      ride.DriverID,
		StartLocation: ride.StartLocation,
		EndLocation:   ride.EndLocation,
		PassengerIds:  ride.PassengerIDs,
		DateTime:      ride.DateTime,
		Status:        ride.Status,
	}, nil
}

func (h *RideHandler) ListRides(ctx context.Context, req *rideservice.ListRidesRequest) (*rideservice.ListRidesResponse, error) {
	rides, err := h.rideUseCase.ListRides(req.DriverId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not list rides: %v", err)
	}
	var responseRides []*rideservice.GetRideResponse
	for _, ride := range rides {
		responseRides = append(responseRides, &rideservice.GetRideResponse{
			RideId:        ride.ID,
			DriverId:      ride.DriverID,
			StartLocation: ride.StartLocation,
			EndLocation:   ride.EndLocation,
			PassengerIds:  ride.PassengerIDs,
			DateTime:      ride.DateTime,
			Status:        ride.Status,
		})
	}
	return &rideservice.ListRidesResponse{Rides: responseRides}, nil
}
