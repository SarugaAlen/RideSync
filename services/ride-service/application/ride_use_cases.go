package application

import (
	"github.com/alensaruga/ride-service/domain/entity"
)

type RideUseCase struct {
	rideRepo RideRepository
}

// NewRideUseCase creates a new RideUseCase.
func NewRideUseCase(repo RideRepository) *RideUseCase {
	return &RideUseCase{
		rideRepo: repo,
	}
}

// CreateRide creates a new ride.
func (uc *RideUseCase) CreateRide(ride *entity.Ride) error {
	return uc.rideRepo.CreateRide(ride)
}

// GetRide retrieves a ride by its ID.
func (uc *RideUseCase) GetRide(rideID string) (*entity.Ride, error) {
	return uc.rideRepo.GetRide(rideID)
}

// ListRides retrieves rides for a specific driver.
func (uc *RideUseCase) ListRides(driverID string) ([]*entity.Ride, error) {
	return uc.rideRepo.ListRides(driverID)
}

// UpdateRide updates the details of an existing ride.
func (uc *RideUseCase) UpdateRide(ride *entity.Ride) error {
	return uc.rideRepo.UpdateRide(ride)
}

// DeleteRide deletes a ride by its ID.
func (uc *RideUseCase) DeleteRide(rideID string) error {
	return uc.rideRepo.DeleteRide(rideID)
}

// FindRidesByLocation retrieves rides that match the specified start and end locations.
func (uc *RideUseCase) FindRidesByLocation(startLocation string, endLocation string) ([]*entity.Ride, error) {
	return uc.rideRepo.FindRidesByLocation(startLocation, endLocation)
}

// JoinRide allows a passenger to join an existing ride.
func (uc *RideUseCase) JoinRide(rideID string, passengerID string) error {
	return uc.rideRepo.JoinRide(rideID, passengerID)
}

// LeaveRide allows a passenger to leave a ride.
func (uc *RideUseCase) LeaveRide(rideID string, passengerID string) error {
	return uc.rideRepo.LeaveRide(rideID, passengerID)
}

// ChangeRideStatus changes the status of a ride.
func (uc *RideUseCase) ChangeRideStatus(rideID string, status string) error {
	return uc.rideRepo.ChangeRideStatus(rideID, status)
}
