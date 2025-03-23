package infrastructure

import (
	"database/sql"
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
        status TEXT
    );`

	if _, err = db.Exec(createRidesTableSQL); err != nil {
		return nil, fmt.Errorf("failed to create rides table: %v", err)
	}

	createPassengersTableSQL := `CREATE TABLE IF NOT EXISTS passengers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ride_id TEXT,
        passenger_id TEXT,
        FOREIGN KEY(ride_id) REFERENCES rides(id)
    );`

	if _, err = db.Exec(createPassengersTableSQL); err != nil {
		return nil, fmt.Errorf("failed to create passengers table: %v", err)
	}

	return &SQLiteRideRepository{db: db}, nil
}

func (repo *SQLiteRideRepository) CreateRide(ride *entity.Ride) error {
	tx, err := repo.db.Begin()
	if err != nil {
		return err
	}

	insertRideSQL := `INSERT INTO rides (id, driver_id, start_location, end_location, date_time, status) 
                      VALUES (?, ?, ?, ?, ?, ?);`
	_, err = tx.Exec(insertRideSQL, ride.ID, ride.DriverID, ride.StartLocation, ride.EndLocation, ride.DateTime, ride.Status)
	if err != nil {
		tx.Rollback()
		return err
	}

	for _, passengerID := range ride.PassengerIDs {
		insertPassengerSQL := `INSERT INTO passengers (ride_id, passenger_id) VALUES (?, ?);`
		_, err = tx.Exec(insertPassengerSQL, ride.ID, passengerID)
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	return tx.Commit()
}

func (repo *SQLiteRideRepository) GetRide(rideID string) (*entity.Ride, error) {
	querySQL := `SELECT id, driver_id, start_location, end_location, date_time, status FROM rides WHERE id = ?;`
	row := repo.db.QueryRow(querySQL, rideID)

	var ride entity.Ride
	err := row.Scan(&ride.ID, &ride.DriverID, &ride.StartLocation, &ride.EndLocation, &ride.DateTime, &ride.Status)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	passengerIDs, err := repo.ListPassengersForRide(ride.ID)
	if err != nil {
		return nil, err
	}
	ride.PassengerIDs = passengerIDs

	return &ride, nil
}

func (repo *SQLiteRideRepository) ListPassengersForRide(rideID string) ([]string, error) {
	querySQL := `SELECT passenger_id FROM passengers WHERE ride_id = ?;`
	rows, err := repo.db.Query(querySQL, rideID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var passengerIDs []string
	for rows.Next() {
		var passengerID string
		if err := rows.Scan(&passengerID); err != nil {
			return nil, err
		}
		passengerIDs = append(passengerIDs, passengerID)
	}
	return passengerIDs, nil
}

func (repo *SQLiteRideRepository) ListRides(driverID string) ([]*entity.Ride, error) {
	querySQL := `SELECT id, driver_id, start_location, end_location, date_time, status FROM rides WHERE driver_id = ?;`
	rows, err := repo.db.Query(querySQL, driverID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var ridesList []*entity.Ride
	for rows.Next() {
		var ride entity.Ride
		err := rows.Scan(&ride.ID, &ride.DriverID, &ride.StartLocation, &ride.EndLocation, &ride.DateTime, &ride.Status)
		if err != nil {
			return nil, err
		}
		ride.PassengerIDs, _ = repo.ListPassengersForRide(ride.ID)
		ridesList = append(ridesList, &ride)
	}
	return ridesList, nil
}

func (repo *SQLiteRideRepository) Close() error {
	return repo.db.Close()
}
