package application

import "github.com/alensaruga/ride-service/domain/entity"

type RideRepository interface {
	CreateRide(ride *entity.Ride) error
	GetRide(rideID string) (*entity.Ride, error)
	ListRides(driverID string) ([]*entity.Ride, error)
	UpdateRide(ride *entity.Ride) error
	DeleteRide(rideID string) error
	FindRidesByLocation(startLocation string, endLocation string) ([]*entity.Ride, error)
	JoinRide(rideID string, passengerID string) error
	LeaveRide(rideID string, passengerID string) error
	ChangeRideStatus(rideID string, status string) error
}
