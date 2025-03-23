package entity

type Ride struct {
	ID            string
	DriverID      string
	StartLocation string
	EndLocation   string
	PassengerIDs  []string
	DateTime      string
	Status        string
}
