// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Post,
//   Query,
//   ParseIntPipe,
//   ValidationPipe,
//   Put,
// } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

// @Controller('users')
// export class UsersController {
//   // @Get()
//   // findAll() {
//   //   return [];
//   // }
//   constructor(private readonly usersService: UsersService) {}
//   @Get()
//   findByRole(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
//     return this.usersService.findByRole(role);
//   }

//   @Get(':id')
//   findByID(@Param('id', ParseIntPipe) id: number) {
//     return this.usersService.findById(id);
//   }

//   @Post()
//   create(
//     @Body(ValidationPipe)
//     createUserDto: CreateUserDto,
//   ) {
//     return this.usersService.create(createUserDto);
//   }

//   @Put(':id')
//   update(
//     @Param('id', ParseIntPipe) id: number,
//     @Body(ValidationPipe)
//     updateUserDto: UpdateUserDto,
//   ) {
//     return this.usersService.update(id, updateUserDto);
//   }

//   @Delete(':id')
//   delete(@Param('id', ParseIntPipe) id: number) {
//     return this.usersService.delete(id);
//   }
// }
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interface/user.interface'; // Import User interface

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): User[] {
    return this.usersService.findByRole();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string): User {
    return this.usersService.findById(Number(id));
  }

  @Get(':role')
  findByRole(@Query('role') role: 'INTERN' | 'ENGINEER' | 'ADMIN'): User[] {
    return this.usersService.findByRole(role);
  }

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto): User {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ): User {
    return this.usersService.update(Number(id), updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string): User {
    return this.usersService.delete(Number(id));
  }
}
