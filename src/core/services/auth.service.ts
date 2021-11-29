import { User } from 'core/models/userModel';

export class AuthService {
  private LS_KEY = 'login-with-metamask:auth';

  async getUser(publicAddress: string): Promise<User> {
    try {
      const res = await fetch(
        `http://localhost:8080/api/users/${publicAddress}`
      );
      if (res.status === 204) {
        console.log('no user found with this address.');
        console.log('Creating new user...');
        const userData = await this.signUp(publicAddress);
        return Promise.resolve(userData);
      } else if (res.status === 200) {
        const userData = await res.json();
        return Promise.resolve(userData);
      } else {
        return Promise.reject('could not find/create a user with this address');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  private async signUp(publicAddress: string): Promise<User> {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ publicAddress: publicAddress }),
    };
    try {
      const res = await fetch(
        `http://localhost:8080/api/createUser`,
        requestOptions
      );
      const userData = await res.json();
      return Promise.resolve(userData);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async authenticateWithSignature(publicAddress: string, signature: string) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        publicAddress: publicAddress,
        signature: signature,
      }),
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/authenticateWithSignature`,
        requestOptions
      );
      if (res.status === 200) {
        const userData = await res.json();
        localStorage.setItem(this.LS_KEY, userData.token);
        return Promise.resolve(userData);
      } else {
        return Promise.reject('could not authenticate');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async authenticateWithJWT() {
    const jwt = localStorage.getItem(this.LS_KEY);
    if (!jwt) {
      console.log('no jwt exists');
      return undefined;
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-access-token': jwt },
    };

    try {
      const res = await fetch(
        `http://localhost:8080/api/authenticateWithJWT`,
        requestOptions
      );
      if (res.status === 200) {
        const userData = await res.json();
        return Promise.resolve(userData);
      } else {
        return Promise.reject('could not authenticate');
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  logout() {
    localStorage.removeItem(this.LS_KEY);
  }
}
