package application

import (
	"context"
	"log"

	rideservice "github.com/alensaruga/ride-service"
	"github.com/alensaruga/ride-service/domain/entity"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// RideHandler handles ride-related operations.
type RideHandler struct {
	rideservice.UnimplementedRideServiceServer
	rideUseCase *RideUseCase
}

// NewRideHandler creates a new RideHandler.
func NewRideHandler(rideUC *RideUseCase) *RideHandler {
	return &RideHandler{rideUseCase: rideUC}
}

// CreateRide handles the creation of a new ride.
// @Summary Create a new ride
// @Description Create a new ride with driver and location details
// @Tags rides
// @Accept json
// @Produce json
// @Param ride body rideservice.CreateRideRequest true "Ride info"
// @Success 201 {object} rideservice.CreateRideResponse
// @Failure 400 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides [post]
func (h *RideHandler) CreateRide(ctx context.Context, req *rideservice.CreateRideRequest) (*rideservice.CreateRideResponse, error) {
	if req.DriverId == "" || req.StartLocation == "" || req.EndLocation == "" || req.DateTime == "" {
		return nil, status.Errorf(codes.InvalidArgument, "DriverID, StartLocation, EndLocation, and DateTime are required")
	}

	ride := &entity.Ride{
		// Do not set the ID manually; let the database generate it
		DriverID:      req.DriverId,
		StartLocation: req.StartLocation,
		EndLocation:   req.EndLocation,
		PassengerIDs:  req.PassengerIds,
		DateTime:      req.DateTime,
		Status:        entity.StatusScheduled,
	}

	err := h.rideUseCase.CreateRide(ride) // This method should handle ID generation
	if err != nil {
		log.Printf("Error creating ride: %v", err)
		return nil, status.Errorf(codes.Internal, "could not create ride: %v", err)
	}

	// After creating the ride, the ID should now be populated by the database
	return &rideservice.CreateRideResponse{RideId: ride.ID}, nil
}

// GetRide retrieves a ride by its ID.
// @Summary Get ride by ID
// @Description Retrieve a ride by its ID
// @Tags rides
// @Produce json
// @Param id path string true "Ride ID"
// @Success 200 {object} rideservice.GetRideResponse
// @Failure 404 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides/{id} [get]
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

// ListRides retrieves rides for a specific driver.
// @Summary List rides for a driver
// @Description Retrieve all rides for a specific driver
// @Tags rides
// @Produce json
// @Param driver_id query string true "Driver ID"
// @Success 200 {object} rideservice.ListRidesResponse
// @Failure 500 {object} status.Error
// @Router /rides [get]
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

// UpdateRide updates the details of an existing ride.
// @Summary Update an existing ride
// @Description Update ride details by ID
// @Tags rides
// @Accept json
// @Produce json
// @Param ride body rideservice.UpdateRideRequest true "Updated ride info"
// @Success 200 {object} rideservice.UpdateRideResponse
// @Failure 400 {object} status.Error
// @Failure 404 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides [put]
func (h *RideHandler) UpdateRide(ctx context.Context, req *rideservice.UpdateRideRequest) (*rideservice.UpdateRideResponse, error) {
	// Validate the request
	if req.RideId == "" || req.StartLocation == "" || req.EndLocation == "" || req.DateTime == "" {
		return nil, status.Errorf(codes.InvalidArgument, "RideID, StartLocation, EndLocation, and DateTime are required")
	}

	// Create the ride entity
	ride := &entity.Ride{
		ID:            req.RideId,
		DriverID:      req.DriverId,
		StartLocation: req.StartLocation,
		EndLocation:   req.EndLocation,
		PassengerIDs:  req.PassengerIds,
		DateTime:      req.DateTime,
		Status:        req.Status,
	}

	err := h.rideUseCase.UpdateRide(ride)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not update ride: %v", err)
	}

	return &rideservice.UpdateRideResponse{Success: true}, nil
}

// DeleteRide deletes a ride by its ID.
// @Summary Delete a ride
// @Description Delete a ride by its ID
// @Tags rides
// @Produce json
// @Param id path string true "Ride ID"
// @Success 200 {object} rideservice.DeleteRideResponse
// @Failure 404 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides/{id} [delete]
func (h *RideHandler) DeleteRide(ctx context.Context, req *rideservice.DeleteRideRequest) (*rideservice.DeleteRideResponse, error) {
	err := h.rideUseCase.DeleteRide(req.RideId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not delete ride: %v", err)
	}

	return &rideservice.DeleteRideResponse{Success: true}, nil
}

// FindRidesByLocation retrieves rides based on start and end locations.
// @Summary Find rides by location
// @Description Retrieve rides based on start and end locations
// @Tags rides
// @Produce json
// @Param start_location query string true "Start Location"
// @Param end_location query string true "End Location"
// @Success 200 {object} rideservice.FindRidesByLocationResponse
// @Failure 500 {object} status.Error
// @Router /rides/find [get]
func (h *RideHandler) FindRidesByLocation(ctx context.Context, req *rideservice.FindRidesByLocationRequest) (*rideservice.FindRidesByLocationResponse, error) {
	rides, err := h.rideUseCase.FindRidesByLocation(req.StartLocation, req.EndLocation)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not find rides: %v", err)
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

	return &rideservice.FindRidesByLocationResponse{Rides: responseRides}, nil
}

// JoinRide allows a passenger to join an existing ride.
// @Summary Join an existing ride
// @Description Allow a passenger to join a ride
// @Tags rides
// @Produce json
// @Param ride_id path string true "Ride ID"
// @Param passenger_id path string true "Passenger ID"
// @Success 200 {object} rideservice.JoinRideResponse
// @Failure 404 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides/join/{ride_id}/{passenger_id} [post]
func (h *RideHandler) JoinRide(ctx context.Context, req *rideservice.JoinRideRequest) (*rideservice.JoinRideResponse, error) {
	err := h.rideUseCase.JoinRide(req.RideId, req.PassengerId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not join ride: %v", err)
	}

	return &rideservice.JoinRideResponse{Success: true}, nil
}

// LeaveRide allows a passenger to leave a ride.
// @Summary Leave an existing ride
// @Description Allow a passenger to leave a ride
// @Tags rides
// @Produce json
// @Param ride_id path string true "Ride ID"
// @Param passenger_id path string true "Passenger ID"
// @Success 200 {object} rideservice.LeaveRideResponse
// @Failure 404 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides/leave/{ride_id}/{passenger_id} [post]
func (h *RideHandler) LeaveRide(ctx context.Context, req *rideservice.LeaveRideRequest) (*rideservice.LeaveRideResponse, error) {
	err := h.rideUseCase.LeaveRide(req.RideId, req.PassengerId)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not leave ride: %v", err)
	}

	return &rideservice.LeaveRideResponse{Success: true}, nil
}

// ChangeRideStatus changes the status of a ride.
// @Summary Change the status of a ride
// @Description Change the status of a ride by its ID
// @Tags rides
// @Produce json
// @Param ride_id path string true "Ride ID"
// @Param status path string true "New Status"
// @Success 200 {object} rideservice.ChangeRideStatusResponse
// @Failure 404 {object} status.Error
// @Failure 500 {object} status.Error
// @Router /rides/status/{ride_id}/{status} [post]
func (h *RideHandler) ChangeRideStatus(ctx context.Context, req *rideservice.ChangeRideStatusRequest) (*rideservice.ChangeRideStatusResponse, error) {
	err := h.rideUseCase.ChangeRideStatus(req.RideId, req.Status)
	if err != nil {
		return nil, status.Errorf(codes.Internal, "could not change ride status: %v", err)
	}

	return &rideservice.ChangeRideStatusResponse{Success: true}, nil
}
