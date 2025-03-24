package entity

const (
	StatusScheduled = "scheduled"
	StatusOngoing   = "ongoing"
	StatusCompleted = "completed"
	StatusCanceled  = "canceled"
)

type Ride struct {
	ID            string   `json:"id"`
	DriverID      string   `json:"driver_id"`
	StartLocation string   `json:"start_location"`
	EndLocation   string   `json:"end_location"`
	PassengerIDs  []string `json:"passenger_ids"`
	DateTime      string   `json:"date_time"`
	Status        string   `json:"status"`
}
