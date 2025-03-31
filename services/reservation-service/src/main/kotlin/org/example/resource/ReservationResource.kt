package org.example.resource

import io.smallrye.mutiny.Multi
import io.smallrye.mutiny.Uni
import jakarta.inject.Inject
import jakarta.ws.rs.*
import jakarta.ws.rs.core.MediaType
import jakarta.ws.rs.core.Response
import org.example.service.ReservationService
import org.example.vao.Reservation
import org.example.vao.ReservationStatus

@Path("/reservations")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
class ReservationResource {

    @Inject
    lateinit var reservationService: ReservationService

    @GET
    fun getAllReservations(): Multi<Reservation> {
        return reservationService.getAllReservations()
    }

    @GET
    @Path("/{id}")
    fun getReservationById(@PathParam("id") id: Int): Uni<Response> {
        return reservationService.getReservationById(id)
            .onItem().transform { reservation ->
                if (reservation != null) {
                    Response.ok(reservation).build()
                } else {
                    Response.status(Response.Status.NOT_FOUND).build()
                }
            }
    }

    @GET
    @Path("/user/{userId}")
    fun getReservationsByUserId(@PathParam("userId") userId: Int): Multi<Reservation> {
        return reservationService.getReservationsByUserId(userId)
    }

    @GET
    @Path("/ride/{rideId}")
    fun getReservationsByRideId(@PathParam("rideId") rideId: Int): Multi<Reservation> {
        return reservationService.getReservationsByRideId(rideId)
    }

    @POST
    fun createReservation(reservationRequest: ReservationRequest): Uni<Response> {
        return reservationService.createReservation(reservationRequest.userId, reservationRequest.rideId)
            .onItem().transform { reservation ->
                Response.status(Response.Status.CREATED)
                    .entity(reservation)
                    .build()
            }
    }

    @PUT
    @Path("/{id}/status")
    fun updateReservationStatus(
        @PathParam("id") id: Int,
        statusRequest: StatusUpdateRequest
    ): Uni<Response> {
        return reservationService.updateReservationStatus(id, statusRequest.status)
            .onItem().transform { reservation ->
                Response.ok(reservation).build()
            }
            .onFailure().recoverWithItem { error ->
                Response.status(Response.Status.NOT_FOUND)
                    .entity(mapOf("error" to error.message))
                    .build()
            }
    }

    @DELETE
    @Path("/{id}")
    fun deleteReservation(@PathParam("id") id: Int): Uni<Response> {
        return reservationService.deleteReservation(id)
            .onItem().transform { deleted ->
                if (deleted) {
                    Response.noContent().build()
                } else {
                    Response.status(Response.Status.NOT_FOUND).build()
                }
            }
    }
}

data class ReservationRequest(
    val userId: Int,
    val rideId: Int
)

data class StatusUpdateRequest(
    val status: ReservationStatus
)