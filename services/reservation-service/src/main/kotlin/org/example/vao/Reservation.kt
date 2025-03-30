package org.example.vao

class Reservation {
    var id: Int? = null
    var userId: Int? = null
    var rideId: Int? = null
    var status: ReservationStatus? = null

}

enum class ReservationStatus {
    PENDING,
    CONFIRMED,
    CANCELED
}