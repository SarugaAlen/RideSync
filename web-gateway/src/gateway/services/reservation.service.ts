import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ReservationService {
  constructor(private readonly http: HttpService) {}

  async getAllReservations() {
    const res = await lastValueFrom(this.http.get('http://localhost:4000/reservations'));
    return res.data;
  }

  async getReservation(reservationId: number) {
    const res = await lastValueFrom(this.http.get(`http://localhost:4000/reservations/${reservationId}`));
    return res.data;
  }

  async getReservationsByUser(userId: number) {
    const res = await lastValueFrom(this.http.get(`http://localhost:4000/reservations/user/${userId}`));
    return res.data;
  }

  async getReservationsByRide(rideId: number) {
    const res = await lastValueFrom(this.http.get(`http://localhost:4000/reservations/ride/${rideId}`));
    return res.data;
  }

  async createReservation(data: any) {
    const res = await lastValueFrom(this.http.post('http://localhost:4000/reservations', data));
    return res.data;
  }

  async updateReservation(id: number, data: any) {
    const res = await lastValueFrom(this.http.put(`http://localhost:4000/reservations/${id}`, data));
    return res.data;
  }

  async updateReservationStatus(id: number, status: string) {
    const res = await lastValueFrom(this.http.put(`http://localhost:4000/reservations/${id}/status/${status}`));
    return res.data;
  }

  async deleteReservation(id: number) {
    const res = await lastValueFrom(this.http.delete(`http://localhost:4000/reservations/${id}`));
    return res.data;
  }
}