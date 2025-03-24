package application

import (
	"testing"

	"github.com/alensaruga/ride-service/domain/entity"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

type MockRideRepository struct {
	mock.Mock
}

func (m *MockRideRepository) CreateRide(ride *entity.Ride) error {
	args := m.Called(ride)
	return args.Error(0)
}

func (m *MockRideRepository) GetRide(rideID string) (*entity.Ride, error) {
	args := m.Called(rideID)
	return args.Get(0).(*entity.Ride), args.Error(1)
}

func (m *MockRideRepository) ListRides(driverID string) ([]*entity.Ride, error) {
	args := m.Called(driverID)
	return args.Get(0).([]*entity.Ride), args.Error(1)
}

func (m *MockRideRepository) UpdateRide(ride *entity.Ride) error {
	args := m.Called(ride)
	return args.Error(0)
}

func (m *MockRideRepository) DeleteRide(rideID string) error {
	args := m.Called(rideID)
	return args.Error(0)
}

func (m *MockRideRepository) FindRidesByLocation(startLocation string, endLocation string) ([]*entity.Ride, error) {
	args := m.Called(startLocation, endLocation)
	return args.Get(0).([]*entity.Ride), args.Error(1)
}

func (m *MockRideRepository) JoinRide(rideID string, passengerID string) error {
	args := m.Called(rideID, passengerID)
	return args.Error(0)
}

func (m *MockRideRepository) LeaveRide(rideID string, passengerID string) error {
	args := m.Called(rideID, passengerID)
	return args.Error(0)
}

func (m *MockRideRepository) ChangeRideStatus(rideID string, status string) error {
	args := m.Called(rideID, status)
	return args.Error(0)
}

func TestCreateRide(t *testing.T) {
	mockRepo := new(MockRideRepository)
	useCase := NewRideUseCase(mockRepo)

	ride := &entity.Ride{
		ID:            "1",
		DriverID:      "driver1",
		StartLocation: "Start",
		EndLocation:   "End",
		PassengerIDs:  []string{"passenger1"},
		DateTime:      "2025-03-24T10:00:00Z",
		Status:        entity.StatusScheduled,
	}

	mockRepo.On("CreateRide", ride).Return(nil)

	err := useCase.CreateRide(ride)
	assert.NoError(t, err)

	mockRepo.AssertExpectations(t)
}

func TestGetRide(t *testing.T) {
	mockRepo := new(MockRideRepository)
	useCase := NewRideUseCase(mockRepo)

	ride := &entity.Ride{
		ID:            "1",
		DriverID:      "driver1",
		StartLocation: "Start",
		EndLocation:   "End",
		PassengerIDs:  []string{"passenger1"},
		DateTime:      "2025-03-24T10:00:00Z",
		Status:        entity.StatusScheduled,
	}

	mockRepo.On("GetRide", "1").Return(ride, nil)

	result, err := useCase.GetRide("1")
	assert.NoError(t, err)
	assert.Equal(t, ride, result)

	mockRepo.AssertExpectations(t)
}

func TestListRides(t *testing.T) {
	mockRepo := new(MockRideRepository)
	useCase := NewRideUseCase(mockRepo)

	rides := []*entity.Ride{
		{
			ID:            "1",
			DriverID:      "driver1",
			StartLocation: "Start",
			EndLocation:   "End",
			PassengerIDs:  []string{"passenger1"},
			DateTime:      "2025-03-24T10:00:00Z",
			Status:        entity.StatusScheduled,
		},
		{
			ID:            "2",
			DriverID:      "driver1",
			StartLocation: "Start2",
			EndLocation:   "End2",
			PassengerIDs:  []string{"passenger2"},
			DateTime:      "2025-03-24T11:00:00Z",
			Status:        entity.StatusScheduled,
		},
	}

	mockRepo.On("ListRides", "driver1").Return(rides, nil)

	result, err := useCase.ListRides("driver1")
	assert.NoError(t, err)
	assert.Equal(t, rides, result)

	mockRepo.AssertExpectations(t)
}

func TestUpdateRide(t *testing.T) {
	mockRepo := new(MockRideRepository)
	useCase := NewRideUseCase(mockRepo)

	ride := &entity.Ride{
		ID:            "1",
		DriverID:      "driver1",
		StartLocation: "Start",
		EndLocation:   "End",
		PassengerIDs:  []string{"passenger1"},
		DateTime:      "2025-03-24T10:00:00Z",
		Status:        entity.StatusScheduled,
	}

	mockRepo.On("UpdateRide", ride).Return(nil)

	err := useCase.UpdateRide(ride)
	assert.NoError(t, err)

	mockRepo.AssertExpectations(t)
}

func TestDeleteRide(t *testing.T) {
	mockRepo := new(MockRideRepository)
	useCase := NewRideUseCase(mockRepo)

	mockRepo.On("DeleteRide", "1").Return(nil)

	err := useCase.DeleteRide("1")
	assert.NoError(t, err)

	mockRepo.AssertExpectations(t)
}

func TestChangeRideStatus(t *testing.T) {
	mockRepo := new(MockRideRepository)
	useCase := NewRideUseCase(mockRepo)

	mockRepo.On("ChangeRideStatus", "1", "completed").Return(nil)

	err := useCase.ChangeRideStatus("1", "completed")
	assert.NoError(t, err)

	mockRepo.AssertExpectations(t)
}
