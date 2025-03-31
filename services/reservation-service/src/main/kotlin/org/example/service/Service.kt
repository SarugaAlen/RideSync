package org.example.service

import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.example.dao.ReservationRepository
import org.example.vao.Reservation
import org.example.vao.ReservationStatus

@ApplicationScoped
class ReservationService {

    @Inject
    lateinit var reservationRepository: ReservationRepository

    fun getReservationById(id: Int): Uni<Reservation?> {
        return reservationRepository.findById(id)
    }

    fun getReservationsByUserId(userId: Int): Multi<Reservation> {
        return reservationRepository.findByUserId(userId)
    }

    fun getReservationsByRideId(rideId: Int): Multi<Reservation> {
        return reservationRepository.findByRideId(rideId)
    }

    fun getAllReservations(): Multi<Reservation> {
        return reservationRepository.findAllReservations()
    }

    fun createReservation(userId: Int, rideId: Int): Uni<Reservation> {
        val reservation = Reservation()
        reservation.userId = userId
        reservation.rideId = rideId
        reservation.status = ReservationStatus.PENDING

        return reservationRepository.create(reservation)
    }

    fun deleteReservation(id: Int): Uni<Boolean> {
        return reservationRepository.delete(id)
    }

    fun updateReservationStatus(id: Int, status: ReservationStatus): Uni<Reservation> {
        return reservationRepository.updateStatus(id, status)
    }
}
