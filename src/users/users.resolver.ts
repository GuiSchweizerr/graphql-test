import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '@prisma/client';
import { UseGuards } from '@nestjs/common';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation('createUser')
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  findAll(): Promise<User[]> {
    return this.usersService.findAll({});
  }

  @Query('user')
  findOne(@Args('id') id: string): Promise<User> {
    return this.usersService.findOne({ id: Number(id) });
  }

  @Mutation('updateUser')
  update(@Args('updateUserInput') id: string, name: string, email: string) {
    return this.usersService.update({
      where: { id: Number(id) },
      data: { name, email },
    });
  }

  @Mutation('removeUser')
  remove(@Args('id') id: number) {
    return this.usersService.remove({ id });
  }
}
