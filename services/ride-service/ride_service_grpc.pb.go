// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.5.1
// - protoc             v6.30.1
// source: proto/ride_service.proto

package rideservice

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.64.0 or later.
const _ = grpc.SupportPackageIsVersion9

const (
	RideService_CreateRide_FullMethodName          = "/rideservice.RideService/CreateRide"
	RideService_GetRide_FullMethodName             = "/rideservice.RideService/GetRide"
	RideService_ListRides_FullMethodName           = "/rideservice.RideService/ListRides"
	RideService_UpdateRide_FullMethodName          = "/rideservice.RideService/UpdateRide"
	RideService_DeleteRide_FullMethodName          = "/rideservice.RideService/DeleteRide"
	RideService_FindRidesByLocation_FullMethodName = "/rideservice.RideService/FindRidesByLocation"
	RideService_JoinRide_FullMethodName            = "/rideservice.RideService/JoinRide"
	RideService_LeaveRide_FullMethodName           = "/rideservice.RideService/LeaveRide"
	RideService_ChangeRideStatus_FullMethodName    = "/rideservice.RideService/ChangeRideStatus"
)

// RideServiceClient is the client API for RideService service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type RideServiceClient interface {
	CreateRide(ctx context.Context, in *CreateRideRequest, opts ...grpc.CallOption) (*CreateRideResponse, error)
	GetRide(ctx context.Context, in *GetRideRequest, opts ...grpc.CallOption) (*GetRideResponse, error)
	ListRides(ctx context.Context, in *ListRidesRequest, opts ...grpc.CallOption) (*ListRidesResponse, error)
	UpdateRide(ctx context.Context, in *UpdateRideRequest, opts ...grpc.CallOption) (*UpdateRideResponse, error)
	DeleteRide(ctx context.Context, in *DeleteRideRequest, opts ...grpc.CallOption) (*DeleteRideResponse, error)
	FindRidesByLocation(ctx context.Context, in *FindRidesByLocationRequest, opts ...grpc.CallOption) (*FindRidesByLocationResponse, error)
	JoinRide(ctx context.Context, in *JoinRideRequest, opts ...grpc.CallOption) (*JoinRideResponse, error)
	LeaveRide(ctx context.Context, in *LeaveRideRequest, opts ...grpc.CallOption) (*LeaveRideResponse, error)
	ChangeRideStatus(ctx context.Context, in *ChangeRideStatusRequest, opts ...grpc.CallOption) (*ChangeRideStatusResponse, error)
}

type rideServiceClient struct {
	cc grpc.ClientConnInterface
}

func NewRideServiceClient(cc grpc.ClientConnInterface) RideServiceClient {
	return &rideServiceClient{cc}
}

func (c *rideServiceClient) CreateRide(ctx context.Context, in *CreateRideRequest, opts ...grpc.CallOption) (*CreateRideResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(CreateRideResponse)
	err := c.cc.Invoke(ctx, RideService_CreateRide_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) GetRide(ctx context.Context, in *GetRideRequest, opts ...grpc.CallOption) (*GetRideResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(GetRideResponse)
	err := c.cc.Invoke(ctx, RideService_GetRide_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) ListRides(ctx context.Context, in *ListRidesRequest, opts ...grpc.CallOption) (*ListRidesResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(ListRidesResponse)
	err := c.cc.Invoke(ctx, RideService_ListRides_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) UpdateRide(ctx context.Context, in *UpdateRideRequest, opts ...grpc.CallOption) (*UpdateRideResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(UpdateRideResponse)
	err := c.cc.Invoke(ctx, RideService_UpdateRide_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) DeleteRide(ctx context.Context, in *DeleteRideRequest, opts ...grpc.CallOption) (*DeleteRideResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(DeleteRideResponse)
	err := c.cc.Invoke(ctx, RideService_DeleteRide_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) FindRidesByLocation(ctx context.Context, in *FindRidesByLocationRequest, opts ...grpc.CallOption) (*FindRidesByLocationResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(FindRidesByLocationResponse)
	err := c.cc.Invoke(ctx, RideService_FindRidesByLocation_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) JoinRide(ctx context.Context, in *JoinRideRequest, opts ...grpc.CallOption) (*JoinRideResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(JoinRideResponse)
	err := c.cc.Invoke(ctx, RideService_JoinRide_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) LeaveRide(ctx context.Context, in *LeaveRideRequest, opts ...grpc.CallOption) (*LeaveRideResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(LeaveRideResponse)
	err := c.cc.Invoke(ctx, RideService_LeaveRide_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

func (c *rideServiceClient) ChangeRideStatus(ctx context.Context, in *ChangeRideStatusRequest, opts ...grpc.CallOption) (*ChangeRideStatusResponse, error) {
	cOpts := append([]grpc.CallOption{grpc.StaticMethod()}, opts...)
	out := new(ChangeRideStatusResponse)
	err := c.cc.Invoke(ctx, RideService_ChangeRideStatus_FullMethodName, in, out, cOpts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// RideServiceServer is the server API for RideService service.
// All implementations must embed UnimplementedRideServiceServer
// for forward compatibility.
type RideServiceServer interface {
	CreateRide(context.Context, *CreateRideRequest) (*CreateRideResponse, error)
	GetRide(context.Context, *GetRideRequest) (*GetRideResponse, error)
	ListRides(context.Context, *ListRidesRequest) (*ListRidesResponse, error)
	UpdateRide(context.Context, *UpdateRideRequest) (*UpdateRideResponse, error)
	DeleteRide(context.Context, *DeleteRideRequest) (*DeleteRideResponse, error)
	FindRidesByLocation(context.Context, *FindRidesByLocationRequest) (*FindRidesByLocationResponse, error)
	JoinRide(context.Context, *JoinRideRequest) (*JoinRideResponse, error)
	LeaveRide(context.Context, *LeaveRideRequest) (*LeaveRideResponse, error)
	ChangeRideStatus(context.Context, *ChangeRideStatusRequest) (*ChangeRideStatusResponse, error)
	mustEmbedUnimplementedRideServiceServer()
}

// UnimplementedRideServiceServer must be embedded to have
// forward compatible implementations.
//
// NOTE: this should be embedded by value instead of pointer to avoid a nil
// pointer dereference when methods are called.
type UnimplementedRideServiceServer struct{}

func (UnimplementedRideServiceServer) CreateRide(context.Context, *CreateRideRequest) (*CreateRideResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method CreateRide not implemented")
}
func (UnimplementedRideServiceServer) GetRide(context.Context, *GetRideRequest) (*GetRideResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method GetRide not implemented")
}
func (UnimplementedRideServiceServer) ListRides(context.Context, *ListRidesRequest) (*ListRidesResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ListRides not implemented")
}
func (UnimplementedRideServiceServer) UpdateRide(context.Context, *UpdateRideRequest) (*UpdateRideResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method UpdateRide not implemented")
}
func (UnimplementedRideServiceServer) DeleteRide(context.Context, *DeleteRideRequest) (*DeleteRideResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method DeleteRide not implemented")
}
func (UnimplementedRideServiceServer) FindRidesByLocation(context.Context, *FindRidesByLocationRequest) (*FindRidesByLocationResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method FindRidesByLocation not implemented")
}
func (UnimplementedRideServiceServer) JoinRide(context.Context, *JoinRideRequest) (*JoinRideResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method JoinRide not implemented")
}
func (UnimplementedRideServiceServer) LeaveRide(context.Context, *LeaveRideRequest) (*LeaveRideResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method LeaveRide not implemented")
}
func (UnimplementedRideServiceServer) ChangeRideStatus(context.Context, *ChangeRideStatusRequest) (*ChangeRideStatusResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method ChangeRideStatus not implemented")
}
func (UnimplementedRideServiceServer) mustEmbedUnimplementedRideServiceServer() {}
func (UnimplementedRideServiceServer) testEmbeddedByValue()                     {}

// UnsafeRideServiceServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to RideServiceServer will
// result in compilation errors.
type UnsafeRideServiceServer interface {
	mustEmbedUnimplementedRideServiceServer()
}

func RegisterRideServiceServer(s grpc.ServiceRegistrar, srv RideServiceServer) {
	// If the following call pancis, it indicates UnimplementedRideServiceServer was
	// embedded by pointer and is nil.  This will cause panics if an
	// unimplemented method is ever invoked, so we test this at initialization
	// time to prevent it from happening at runtime later due to I/O.
	if t, ok := srv.(interface{ testEmbeddedByValue() }); ok {
		t.testEmbeddedByValue()
	}
	s.RegisterService(&RideService_ServiceDesc, srv)
}

func _RideService_CreateRide_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(CreateRideRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).CreateRide(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_CreateRide_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).CreateRide(ctx, req.(*CreateRideRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_GetRide_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(GetRideRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).GetRide(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_GetRide_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).GetRide(ctx, req.(*GetRideRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_ListRides_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ListRidesRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).ListRides(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_ListRides_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).ListRides(ctx, req.(*ListRidesRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_UpdateRide_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(UpdateRideRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).UpdateRide(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_UpdateRide_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).UpdateRide(ctx, req.(*UpdateRideRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_DeleteRide_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(DeleteRideRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).DeleteRide(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_DeleteRide_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).DeleteRide(ctx, req.(*DeleteRideRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_FindRidesByLocation_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(FindRidesByLocationRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).FindRidesByLocation(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_FindRidesByLocation_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).FindRidesByLocation(ctx, req.(*FindRidesByLocationRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_JoinRide_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(JoinRideRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).JoinRide(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_JoinRide_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).JoinRide(ctx, req.(*JoinRideRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_LeaveRide_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(LeaveRideRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).LeaveRide(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_LeaveRide_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).LeaveRide(ctx, req.(*LeaveRideRequest))
	}
	return interceptor(ctx, in, info, handler)
}

func _RideService_ChangeRideStatus_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(ChangeRideStatusRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RideServiceServer).ChangeRideStatus(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: RideService_ChangeRideStatus_FullMethodName,
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RideServiceServer).ChangeRideStatus(ctx, req.(*ChangeRideStatusRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// RideService_ServiceDesc is the grpc.ServiceDesc for RideService service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var RideService_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "rideservice.RideService",
	HandlerType: (*RideServiceServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "CreateRide",
			Handler:    _RideService_CreateRide_Handler,
		},
		{
			MethodName: "GetRide",
			Handler:    _RideService_GetRide_Handler,
		},
		{
			MethodName: "ListRides",
			Handler:    _RideService_ListRides_Handler,
		},
		{
			MethodName: "UpdateRide",
			Handler:    _RideService_UpdateRide_Handler,
		},
		{
			MethodName: "DeleteRide",
			Handler:    _RideService_DeleteRide_Handler,
		},
		{
			MethodName: "FindRidesByLocation",
			Handler:    _RideService_FindRidesByLocation_Handler,
		},
		{
			MethodName: "JoinRide",
			Handler:    _RideService_JoinRide_Handler,
		},
		{
			MethodName: "LeaveRide",
			Handler:    _RideService_LeaveRide_Handler,
		},
		{
			MethodName: "ChangeRideStatus",
			Handler:    _RideService_ChangeRideStatus_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/ride_service.proto",
}
