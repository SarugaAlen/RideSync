package org.example

import io.quarkus.test.junit.QuarkusTest
import io.restassured.RestAssured.given
import jakarta.ws.rs.core.MediaType
import org.hamcrest.Matchers.*
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestMethodOrder
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation

@QuarkusTest
@TestMethodOrder(OrderAnnotation::class)
class ReservationResourceTest {

    companion object {
        var reservationId: Long = 0
    }

    @Test
    @Order(1)
    fun testCreateReservation() {
        val response = given()
            .contentType(MediaType.APPLICATION_JSON)
            .body("""{"userId": 1, "rideId": 101, "status": "PENDING"}""")
            .post("/reservations")
            .then()
            .statusCode(201)
            .body("id", notNullValue())
            .body("status", equalTo("PENDING"))
            .extract().response()

        reservationId = response.jsonPath().getLong("id")
    }

    @Test
    @Order(2)
    fun testGetAllReservations() {
        given()
            .get("/reservations")
            .then()
            .statusCode(200)
            .body("", not(empty<List<Any>>()))
    }


    @Test
    @Order(3)
    fun testGetReservationById() {
        given()
            .get("/reservations/$reservationId")
            .then()
            .statusCode(200)
            .body("id", equalTo(reservationId.toInt()))
    }

    @Test
    @Order(4)
    fun testUpdateReservationStatus() {
        given()
            .contentType(MediaType.APPLICATION_JSON)
            .put("/reservations/$reservationId/status/CONFIRMED")
            .then()
            .statusCode(200)
            .body("status", equalTo("CONFIRMED"))
    }

    @Test
    @Order(5)
    fun testDeleteReservation() {
        given()
            .delete("/reservations/$reservationId")
            .then()
            .statusCode(204)
    }
}
