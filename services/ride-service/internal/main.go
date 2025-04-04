package main

import (
	"log"
	"net"
	"sync"

	pb "github.com/alensaruga/ride-service"
	"github.com/alensaruga/ride-service/application"
	"github.com/alensaruga/ride-service/infrastructure"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

func main() {
	var wg sync.WaitGroup

	sqliteRepo, err := infrastructure.NewSQLiteRideRepository("rides.db")
	if err != nil {
		log.Fatalf("failed to initialize SQLite repository: %v", err)
	}
	defer sqliteRepo.Close()

	rideUseCase := application.NewRideUseCase(sqliteRepo)

	lis, err := net.Listen("tcp", ":8080")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	rideHandler := application.NewRideHandler(rideUseCase)
	pb.RegisterRideServiceServer(grpcServer, rideHandler)

	reflection.Register(grpcServer)

	wg.Add(1)
	go infrastructure.StartConsumer(&wg)

	log.Printf("gRPC Server is running on port :8080")
	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}

	wg.Wait()
}
