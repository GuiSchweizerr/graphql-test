import { Injectable } from '@nestjs/common';
import { CreateAuthInput } from './dto/create-auth.input';
import axios from 'axios';

const SIGN_UP_GOOGLE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.API_KEY}`
const LOGIN_GOOGLE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`

@Injectable()
export class AuthService {
  create(createAuthInput: CreateAuthInput) {
    axios.post(SIGN_UP_GOOGLE_URL, {
      email: createAuthInput.email,
      password: createAuthInput.password,
      returnSecureToken: true,
    })
      .then(response => {
        // Handle the response from the external API
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });

    return 'This action adds a new auth';
  }

  async login(createAuthInput: CreateAuthInput) {
    await axios.post(LOGIN_GOOGLE_URL, {
      email: createAuthInput.email,
      password: createAuthInput.password,
      returnSecureToken: true,
    })
      .then(response => {
        // Handle the response from the external API
        console.log(response.data);
        return {
          email: response.data.email,
          refreshToken: response.data.refreshToken,
          expiresIn: response.data.expiresIn,
          token: response.data.token
        }
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }

}
