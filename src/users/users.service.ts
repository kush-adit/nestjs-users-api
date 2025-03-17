// import { Injectable } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { NotFoundException } from '@nestjs/common';

// @Injectable()
// export class UsersService {
//   private users = [
//     {
//       id: 1,
//       name: 'Alice Johnson',
//       email: 'alice.johnson@example.com',
//       role: 'ADMIN',
//     },
//     {
//       id: 2,
//       name: 'Bob Smith',
//       email: 'bob.smith@example.com',
//       role: 'ENGINEER',
//     },
//     {
//       id: 3,
//       name: 'Charlie Davis',
//       email: 'charlie.davis@example.com',
//       role: 'INTERN',
//     },
//     {
//       id: 4,
//       name: 'Diana Lee',
//       email: 'diana.lee@example.com',
//       role: 'ENGINEER',
//     },
//     {
//       id: 5,
//       name: 'Ethan Brown',
//       email: 'ethan.brown@example.com',
//       role: 'ADMIN',
//     },
//   ];

//   findByRole(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
//     if (role) {
//       const rolesArray = this.users.filter((user) => user.role === role);
//       if (rolesArray.length === 0) {
//         throw new NotFoundException('User role Not Found');
//       }
//       return rolesArray;
//     }
//     return this.users;
//   }

//   findById(id: number) {
//     const user = this.users.find((user) => user.id === id);

//     if (!user) throw new NotFoundException('User not found');

//     return user;
//   }

//   create(createUserDto: CreateUserDto) {
//     const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
//     const newUser = {
//       id: usersByHighestId[0].id + 1,
//       ...createUserDto,
//     };
//     this.users.push(newUser);
//     return newUser;
//   }

//   update(id: number, updateUserDto: UpdateUserDto) {
//     this.users = this.users.map((user) => {
//       if (user.id === id) {
//         return { ...user, ...updateUserDto };
//       }
//       return user;
//     });
//     return this.findById(id);
//   }

//   delete(id: number) {
//     const removedUser = this.findById(id);

//     this.users = this.users.filter((user) => user.id !== id);

//     return removedUser;
//   }
// }

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as fs from 'fs';
import * as path from 'path';
import { User } from './interface/user.interface';

const USERS_FILE_PATH = path.join(__dirname, 'users.json');

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    try {
      const data = fs.readFileSync(USERS_FILE_PATH, 'utf8');
      this.users = JSON.parse(data) as User[];
    } catch {
      this.users = [];
    }
  }

  private saveUsers() {
    fs.writeFileSync(
      USERS_FILE_PATH,
      JSON.stringify(this.users, null, 2),
      'utf8',
    );
  }

  findByRole(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0) {
        throw new NotFoundException('User role Not Found');
      }
      return rolesArray;
    }
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const newId = this.users.length
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
    const newUser: User = { id: newId, ...createUserDto };
    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) throw new NotFoundException('User not found');

    this.users[index] = { ...this.users[index], ...updateUserDto };
    this.saveUsers();
    return this.users[index];
  }

  delete(id: number) {
    const removedUser = this.findById(id);
    this.users = this.users.filter((user) => user.id !== id);
    this.saveUsers();
    return removedUser;
  }
}
