package org.example.dao

import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import org.example.vao.Reservation
import org.example.vao.ReservationStatus

interface ReservationRepository {
    fun findById(id: Int): Uni<Reservation?>
    fun findByUserId(userId: Int): Multi<Reservation>
    fun findByRideId(rideId: Int): Multi<Reservation>
    fun findAllReservations(): Multi<Reservation>
    fun create(reservation: Reservation): Uni<Reservation>
    fun update(reservation: Reservation): Uni<Reservation>
    fun delete(id: Int): Uni<Boolean>
    fun updateStatus(id: Int, status: ReservationStatus): Uni<Reservation>

}
