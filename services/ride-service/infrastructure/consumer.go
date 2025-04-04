package infrastructure

import (
	"context"
	"fmt"
	"log"
	"sync"

	"github.com/vcabbage/amqp"
)

func StartConsumer(wg *sync.WaitGroup) {
	defer wg.Done()
	client, err := amqp.Dial("amqp://artemis:artemis@activemq:5672")
	if err != nil {
		log.Fatalf("Dialing AMQP failed: %v", err)
	}
	defer client.Close()

	session, err := client.NewSession()
	if err != nil {
		log.Fatalf("Creating session failed: %v", err)
	}

	receiver, err := session.NewReceiver(
		amqp.LinkSourceAddress("reservationQueue"),
		amqp.LinkTargetAddress("reservationQueue"),
	)
	if err != nil {
		log.Fatalf("Creating receiver failed: %v", err)
	}
	defer receiver.Close(context.Background())

	fmt.Println("Waiting for messages...")

	for {
		msg, err := receiver.Receive(context.Background())
		if err != nil {
			log.Fatalf("Receiving message failed: %v", err)
		}
		fmt.Printf("Message received: %s\n", msg.Value)
		msg.Accept()
	}
}
