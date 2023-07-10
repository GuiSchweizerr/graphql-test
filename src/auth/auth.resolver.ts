import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { CreateAuthInput } from './dto/create-auth.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation('createAuth')
  create(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    return this.authService.create(createAuthInput);
  }

  @Mutation('login')
  async login(@Args('createAuthInput') createAuthInput: CreateAuthInput) {
    const response = await this.authService.login(createAuthInput);
    console.log(response)
    return response
  }
}
