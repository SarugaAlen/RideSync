package org.example.dao

import io.quarkus.hibernate.reactive.panache.PanacheRepository
import io.smallrye.mutiny.Uni
import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import org.example.vao.Reservation
import org.example.vao.ReservationStatus
import org.hibernate.reactive.mutiny.Mutiny

@ApplicationScoped
class ReservationRepository : PanacheRepository<Reservation> {

    @Inject
    lateinit var entityManager: Mutiny.SessionFactory

    fun listAllReservations(): Uni<List<Reservation>> {
        return listAll()
    }

    fun findByReservationId(id: Long): Uni<Reservation?> {
        return findById(id)
    }

    fun createReservation(reservation: Reservation): Uni<Reservation> {
        return entityManager.withTransaction { _ ->
            persist(reservation)
                .onItem().transform { reservation }
        }.onFailure().invoke { e ->
            println("Failed to create reservation: ${e.message}")
            e.printStackTrace() // Add stack trace for more debugging info
        }
    }

    fun updateReservation(reservation: Reservation): Uni<Reservation> {
        return entityManager.withTransaction { _ ->
            findById(reservation.id!!).onItem().ifNotNull().transformToUni { existingReservation ->
                existingReservation.userId = reservation.userId
                existingReservation.rideId = reservation.rideId
                existingReservation.status = reservation.status
                persist(existingReservation).replaceWith(existingReservation)
            }
        }
    }

    fun deleteReservation(id: Long): Uni<Boolean> {
        return entityManager.withTransaction { _ ->
            findById(id).onItem().ifNotNull().transformToUni { reservation ->
                delete(reservation).replaceWith(true)
            }.onItem().ifNull().continueWith(false)
        }
    }

    fun updateStatus(id: Long, status: String): Uni<Reservation> {
        return entityManager.withTransaction { _ ->
            findById(id).onItem().ifNotNull().transformToUni { reservation ->
                reservation.status = ReservationStatus.valueOf(status)
                persist(reservation).replaceWith(reservation)
            }
        }
    }

    fun findByUserId(userId: Int): Uni<List<Reservation>> {
        return find("userId", userId.toLong()).list()
    }

    fun findByRideId(rideId: Int): Uni<List<Reservation>> {
        return find("rideId", rideId.toLong()).list()
    }
}