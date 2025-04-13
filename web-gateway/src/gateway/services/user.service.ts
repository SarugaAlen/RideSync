import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private readonly http: HttpService) {}

  async registerUser(data: any) {
    const res = await lastValueFrom(this.http.post('http://localhost:5000/users/register', data));
    return res.data;
  }

  async updateUser(userId: number, updateData: any) {
    const res = await lastValueFrom(this.http.put(`http://localhost:5000/users/${userId}`, updateData));
    return res.data;
  }

  async deleteUser(userId: number) {
    const res = await lastValueFrom(this.http.delete(`http://localhost:5000/users/${userId}`));
    return res.data;
  }

  async findUserById(userId: number) {
    const res = await lastValueFrom(this.http.get(`http://localhost:5000/users/${userId}`));
    return res.data;
  }

  async findAllUsers() {
    const res = await lastValueFrom(this.http.get('http://localhost:5000/users'));
    return res.data;
  }

  async findUserByEmail(email: string) {
    const res = await lastValueFrom(this.http.get(`http://localhost:5000/users/email/${email}`));
    return res.data;
  }
}