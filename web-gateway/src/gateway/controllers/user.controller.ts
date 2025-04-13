import { Controller, Post, Put, Delete, Get, Param, Body } from '@nestjs/common';
import { GatewayService } from '../gateway.service';

@Controller('users')
export class UserController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post()
  registerUser(@Body() data: { name: string; email: string; password: string; role: string }) {
    return this.gatewayService.registerUser(data);
  }

  @Put('/:id')
  updateUser(@Param('id') id: number, @Body() updateData: { name?: string; email?: string; password?: string }) {
    return this.gatewayService.updateUser(id, updateData);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: number) {
    return this.gatewayService.deleteUser(id);
  }

  @Get('/:id')
  getUserById(@Param('id') id: number) {
    return this.gatewayService.findUserById(id);
  }

  @Get()
  getAllUsers() {
    return this.gatewayService.findAllUsers();
  }

  @Get('/email/:email')
  getUserByEmail(@Param('email') email: string) {
    return this.gatewayService.findUserByEmail(email);
  }
}