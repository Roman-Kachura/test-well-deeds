export class UsersResponseDto {
  readonly email: string;
  readonly name: string;
  readonly token: string;
  readonly nick: string;
  readonly friends: string[];
  readonly uid: string;
}