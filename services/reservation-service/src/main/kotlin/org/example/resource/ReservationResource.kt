package org.example.resource

import io.smallrye.mutiny.Uni
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.example.dao.ReservationRepository
import org.example.vao.Reservation
import org.example.vao.ReservationStatus
import org.example.messaging.RideReservationProducer
import org.jboss.logging.Logger

@Path("/reservations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class ReservationResource {

    private val logger = Logger.getLogger(ReservationResource::class.java)

    @Inject
    lateinit var reservationRepository: ReservationRepository

    @Inject
    lateinit var rideReservationProducer: RideReservationProducer

    @GET
    fun getAllReservations(): Uni<Response> {
        return reservationRepository.listAllReservations()
            .onItem().transform { reservations ->
                Response.ok(reservations).build()
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to get all reservations", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @GET
    @Path("/{id}")
    fun getReservationById(@PathParam("id") id: Long): Uni<Response> {
        return reservationRepository.findByReservationId(id)
            .onItem().transform { reservation ->
                if (reservation != null) {
                    Response.ok(reservation).build()
                } else {
                    Response.status(Response.Status.NOT_FOUND)
                        .entity(mapOf("error" to "Reservation with id $id not found"))
                        .build()
                }
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to get reservation with id $id", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @GET
    @Path("/user/{userId}")
    fun getReservationsByUserId(@PathParam("userId") userId: Int): Uni<Response> {
        return reservationRepository.findByUserId(userId)
            .onItem().transform { reservations ->
                Response.ok(reservations).build()
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to get reservations for user $userId", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @GET
    @Path("/ride/{rideId}")
    fun getReservationsByRideId(@PathParam("rideId") rideId: Int): Uni<Response> {
        return reservationRepository.findByRideId(rideId)
            .onItem().transform { reservations ->
                Response.ok(reservations).build()
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to get reservations for ride $rideId", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @POST
    fun createReservation(reservation: Reservation): Uni<Response> {
        if (reservation.status == null) {
            reservation.status = ReservationStatus.PENDING
        }

        logger.info("Creating reservation: $reservation")
        return reservationRepository.createReservation(reservation)
            .onItem().transform { created ->
                logger.info("Created reservation: ${created.id}")

                rideReservationProducer.sendReservationMessage(created.id.toString())

                Response.status(Response.Status.CREATED)
                    .entity(created)
                    .build()
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to create reservation", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @PUT
    @Path("/{id}")
    fun updateReservation(@PathParam("id") id: Long, reservation: Reservation): Uni<Response> {
        reservation.id = id
        logger.info("Updating reservation with id $id: $reservation")

        return reservationRepository.updateReservation(reservation)
            .onItem().transform { updated ->
                logger.info("Updated reservation: $id")
                Response.ok(updated).build()
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to update reservation with id $id", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @PUT
    @Path("/{id}/status/{status}")
    fun updateReservationStatus(@PathParam("id") id: Long, @PathParam("status") status: String): Uni<Response> {
        logger.info("Updating reservation status with id $id to $status")

        try {
            ReservationStatus.valueOf(status)
        } catch (e: IllegalArgumentException) {
            return Uni.createFrom().item(
                Response.status(Response.Status.BAD_REQUEST)
                    .entity(mapOf("error" to "Invalid status value: $status"))
                    .build()
            )
        }

        return reservationRepository.updateStatus(id, status)
            .onItem().transform { updated ->
                logger.info("Updated reservation status: $id to $status")
                Response.ok(updated).build()
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to update reservation status for id $id", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }

    @DELETE
    @Path("/{id}")
    fun deleteReservation(@PathParam("id") id: Long): Uni<Response> {
        logger.info("Deleting reservation with id $id")

        return reservationRepository.deleteReservation(id)
            .onItem().transform { deleted ->
                if (deleted) {
                    logger.info("Deleted reservation: $id")
                    Response.noContent().build()
                } else {
                    logger.info("Reservation not found for deletion: $id")
                    Response.status(Response.Status.NOT_FOUND)
                        .entity(mapOf("error" to "Reservation with id $id not found"))
                        .build()
                }
            }
            .onFailure().recoverWithItem { e ->
                logger.error("Failed to delete reservation with id $id", e)
                Response.serverError().entity(mapOf("error" to e.message)).build()
            }
    }
}