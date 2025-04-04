package org.example.messaging

import jakarta.enterprise.context.ApplicationScoped
import jakarta.inject.Inject
import jakarta.annotation.PostConstruct
import jakarta.annotation.PreDestroy
import org.apache.activemq.artemis.jms.client.ActiveMQConnectionFactory
import jakarta.jms.Connection
import jakarta.jms.MessageProducer
import jakarta.jms.Session
import jakarta.jms.TextMessage
import org.eclipse.microprofile.config.inject.ConfigProperty

@ApplicationScoped
class RideReservationProducer {

    @Inject
    @ConfigProperty(name = "quarkus.artemis.url")
    lateinit var brokerUrl: String

    @Inject
    @ConfigProperty(name = "quarkus.artemis.username", defaultValue = "artemis")
    lateinit var username: String

    @Inject
    @ConfigProperty(name = "quarkus.artemis.password", defaultValue = "artemis")
    lateinit var password: String

    @Inject
    @ConfigProperty(name = "reservation.queue.name", defaultValue = "reservationQueue")
    lateinit var queueName: String

    private lateinit var connectionFactory: ActiveMQConnectionFactory
    private lateinit var connection: Connection
    private lateinit var session: Session
    private lateinit var producer: MessageProducer

    @PostConstruct
    fun initialize() {
        connectionFactory = ActiveMQConnectionFactory(brokerUrl, username, password)
        connection = connectionFactory.createConnection()
        connection.start()
        session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE)
        val destination = session.createQueue(queueName)
        producer = session.createProducer(destination)
    }

    fun sendReservationMessage(reservationId: String) {
        try {
            val message: TextMessage = session.createTextMessage("New reservation: $reservationId")
            producer.send(message)
        } catch (e: Exception) {
            e.printStackTrace()
        }
    }

    @PreDestroy
    fun cleanup() {
        producer.close()
        session.close()
        connection.close()
    }
}

