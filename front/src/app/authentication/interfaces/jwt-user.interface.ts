import { User } from 'src/app/shared/interfaces/User.interface';
import { Tokens } from 'src/app/authentication/interfaces/Tokens.interface';

export interface JWTUser {
  user: User,
  tokens: Tokens
}
