package application

import "github.com/alensaruga/ride-service/domain/entity"

type RideUseCase struct {
	rideRepo RideRepository
}

func NewRideUseCase(repo RideRepository) *RideUseCase {
	return &RideUseCase{
		rideRepo: repo,
	}
}

func (uc *RideUseCase) CreateRide(ride *entity.Ride) error {
	return uc.rideRepo.CreateRide(ride)
}

func (uc *RideUseCase) GetRide(rideID string) (*entity.Ride, error) {
	return uc.rideRepo.GetRide(rideID)
}

func (uc *RideUseCase) ListRides(driverID string) ([]*entity.Ride, error) {
	return uc.rideRepo.ListRides(driverID)
}
