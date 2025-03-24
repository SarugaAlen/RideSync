package infrastructure

import (
	"database/sql"
	"encoding/json"
	"fmt"

	"github.com/alensaruga/ride-service/domain/entity"
	_ "github.com/mattn/go-sqlite3"
)

type SQLiteRideRepository struct {
	db *sql.DB
}

func NewSQLiteRideRepository(dataSourceName string) (*SQLiteRideRepository, error) {
	db, err := sql.Open("sqlite3", dataSourceName)
	if err != nil {
		return nil, fmt.Errorf("failed to open database: %v", err)
	}

	createRidesTableSQL := `CREATE TABLE IF NOT EXISTS rides (
        id TEXT PRIMARY KEY,
        driver_id TEXT,
        start_location TEXT,
        end_location TEXT,
        date_time TEXT,
        status TEXT,
        passenger_ids TEXT  -- Store passenger IDs as a JSON string
    );`

	if _, err = db.Exec(createRidesTableSQL); err != nil {
		return nil, fmt.Errorf("failed to create rides table: %v", err)
	}

	return &SQLiteRideRepository{db: db}, nil
}

func (repo *SQLiteRideRepository) CreateRide(ride *entity.Ride) error {
	passengerIDsJSON, err := json.Marshal(ride.PassengerIDs)
	if err != nil {
		return err
	}

	insertRideSQL := `INSERT INTO rides (id, driver_id, start_location, end_location, date_time, status, passenger_ids) 
                      VALUES (?, ?, ?, ?, ?, ?, ?);`
	_, err = repo.db.Exec(insertRideSQL, ride.ID, ride.DriverID, ride.StartLocation, ride.EndLocation, ride.DateTime, ride.Status, string(passengerIDsJSON))
	return err
}

func (repo *SQLiteRideRepository) GetRide(rideID string) (*entity.Ride, error) {
	querySQL := `SELECT id, driver_id, start_location, end_location, date_time, status, passenger_ids FROM rides WHERE id = ?;`
	row := repo.db.QueryRow(querySQL, rideID)

	var ride entity.Ride
	var passengerIDsJSON string
	err := row.Scan(&ride.ID, &ride.DriverID, &ride.StartLocation, &ride.EndLocation, &ride.DateTime, &ride.Status, &passengerIDsJSON)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	err = json.Unmarshal([]byte(passengerIDsJSON), &ride.PassengerIDs)
	if err != nil {
		return nil, err
	}

	return &ride, nil
}

func (repo *SQLiteRideRepository) ListRides(driverID string) ([]*entity.Ride, error) {
	querySQL := `SELECT id, driver_id, start_location, end_location, date_time, status, passenger_ids FROM rides WHERE driver_id = ?;`
	rows, err := repo.db.Query(querySQL, driverID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ridesList []*entity.Ride
	for rows.Next() {
		var ride entity.Ride
		var passengerIDsJSON string
		err := rows.Scan(&ride.ID, &ride.DriverID, &ride.StartLocation, &ride.EndLocation, &ride.DateTime, &ride.Status, &passengerIDsJSON)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal([]byte(passengerIDsJSON), &ride.PassengerIDs)
		if err != nil {
			return nil, err
		}

		ridesList = append(ridesList, &ride)
	}
	return ridesList, nil
}

func (repo *SQLiteRideRepository) UpdateRide(ride *entity.Ride) error {
	passengerIDsJSON, err := json.Marshal(ride.PassengerIDs)
	if err != nil {
		return err
	}

	updateRideSQL := `UPDATE rides SET driver_id = ?, start_location = ?, end_location = ?, date_time = ?, status = ?, passenger_ids = ? WHERE id = ?;`
	_, err = repo.db.Exec(updateRideSQL, ride.DriverID, ride.StartLocation, ride.EndLocation, ride.DateTime, ride.Status, string(passengerIDsJSON), ride.ID)
	return err
}

func (repo *SQLiteRideRepository) DeleteRide(rideID string) error {
	deleteRideSQL := `DELETE FROM rides WHERE id = ?;`
	_, err := repo.db.Exec(deleteRideSQL, rideID)
	return err
}

func (repo *SQLiteRideRepository) FindRidesByLocation(startLocation string, endLocation string) ([]*entity.Ride, error) {
	querySQL := `SELECT id, driver_id, start_location, end_location, date_time, status, passenger_ids 
				  FROM rides 
				  WHERE start_location = ? OR end_location = ?;`
	rows, err := repo.db.Query(querySQL, startLocation, endLocation)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ridesList []*entity.Ride
	for rows.Next() {
		var ride entity.Ride
		var passengerIDsJSON string
		err := rows.Scan(&ride.ID, &ride.DriverID, &ride.StartLocation, &ride.EndLocation, &ride.DateTime, &ride.Status, &passengerIDsJSON)
		if err != nil {
			return nil, err
		}

		err = json.Unmarshal([]byte(passengerIDsJSON), &ride.PassengerIDs)
		if err != nil {
			return nil, err
		}

		ridesList = append(ridesList, &ride)
	}
	return ridesList, nil
}

func (repo *SQLiteRideRepository) JoinRide(rideID string, passengerID string) error {
	ride, err := repo.GetRide(rideID)
	if err != nil {
		return err
	}

	ride.PassengerIDs = append(ride.PassengerIDs, passengerID)

	return repo.UpdateRide(ride)
}

func (repo *SQLiteRideRepository) LeaveRide(rideID string, passengerID string) error {
	ride, err := repo.GetRide(rideID)
	if err != nil {
		return err
	}

	for i, id := range ride.PassengerIDs {
		if id == passengerID {
			ride.PassengerIDs = append(ride.PassengerIDs[:i], ride.PassengerIDs[i+1:]...)
			break
		}
	}

	return repo.UpdateRide(ride)
}

func (repo *SQLiteRideRepository) ChangeRideStatus(rideID string, status string) error {
	updateSQL := `UPDATE rides SET status = ? WHERE id = ?;`
	_, err := repo.db.Exec(updateSQL, status, rideID)
	return err
}

func (repo *SQLiteRideRepository) Close() error {
	return repo.db.Close()
}
