package org.example.dao.impl

import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import io.quarkus.hibernate.reactive.panache.PanacheRepositoryBase
import jakarta.enterprise.context.ApplicationScoped
import org.example.vao.Reservation
import org.example.dao.ReservationRepository
import org.example.vao.ReservationStatus

@ApplicationScoped
class ReservationDao : ReservationRepository, PanacheRepositoryBase<Reservation, Int> {

    override fun findById(id: Int): Uni<Reservation?> {
        return findById(id)
    }

    override fun findByUserId(userId: Int): Multi<Reservation> {
        return find("userId", userId).list<Reservation>()
            .onItem().transformToMulti { Multi.createFrom().iterable(it) }
    }

    override fun findByRideId(rideId: Int): Multi<Reservation> {
        return find("rideId", rideId).list<Reservation>()
            .onItem().transformToMulti { Multi.createFrom().iterable(it) }
    }

    override fun findAllReservations(): Multi<Reservation> {
        return findAll().list<Reservation>()
            .onItem().transformToMulti { Multi.createFrom().iterable(it) }
    }

    override fun create(reservation: Reservation): Uni<Reservation> {
        return persist(reservation).replaceWith(reservation)
    }

    override fun update(reservation: Reservation): Uni<Reservation> {
        return persist(reservation).replaceWith(reservation)
    }

    override fun delete(id: Int): Uni<Boolean> {
        return findById(id)
            .chain { reservation ->
                if (reservation == null) {
                    return@chain Uni.createFrom().item(false)
                }
                delete(reservation)
                    .map { true }
            }
    }

    override fun updateStatus(id: Int, status: ReservationStatus): Uni<Reservation> {
        return findById(id)
            .chain { reservation ->
                if (reservation == null) {
                    return@chain Uni.createFrom().failure(RuntimeException("Reservation not found"))
                }
                reservation.status = status
                update(reservation)
            }
    }
}
