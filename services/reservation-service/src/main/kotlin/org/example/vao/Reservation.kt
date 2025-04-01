package org.example.vao

import io.quarkus.hibernate.reactive.panache.PanacheEntity
import jakarta.persistence.*

@Entity
@Cacheable
@Table(name = "reservations")
class Reservation : PanacheEntity() {
    @Column(name = "user_id", nullable = false)
    var userId: Long? = null

    @Column(name = "ride_id", nullable = false)
    var rideId: Long? = null

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    var status: ReservationStatus? = null
}
