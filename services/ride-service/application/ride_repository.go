package application

import "github.com/alensaruga/ride-service/domain/entity"

type RideRepository interface {
	CreateRide(ride *entity.Ride) error
	GetRide(rideID string) (*entity.Ride, error)
	ListRides(driverID string) ([]*entity.Ride, error)
}
