import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(username: string, password: string): Promise<any> {
    const defaultUsername = 'admin';
    const defaultPassword = 'admin';
    if (username !== defaultUsername || password !== defaultPassword) {
      return false;
    }
    // Your logic to validate the user's credentials (e.g., querying the database)
    return true;
  }
}
