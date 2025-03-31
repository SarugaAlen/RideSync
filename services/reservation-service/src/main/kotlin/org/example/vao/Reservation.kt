package org.example.vao

import io.quarkus.hibernate.reactive.panache.PanacheEntity
import jakarta.persistence.*

@Entity
@Table(name = "reservations")
class Reservation : PanacheEntity() {
    var userId: Int? = null
    var rideId: Int? = null

    @Enumerated(EnumType.STRING)
    var status: ReservationStatus? = null
}
