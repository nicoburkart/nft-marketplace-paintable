import { User } from 'core/models/userModel';
import Web3 from 'web3';
import { AuthService } from './auth.service';

declare let window: any;

export class Web3Service {
  private web3: any;

  constructor() {
    if (Web3.givenProvider) {
      this.web3 = new Web3(Web3.givenProvider);
    }
  }

  async getProviderAccountIfExists(): Promise<string | undefined> {
    try {
      const publicAddresses: string[] = await this.web3.eth.getAccounts();
      //true -> user is connected with his wallet
      if (publicAddresses.length > 0) {
        return Promise.resolve(publicAddresses[0]);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async loginWithMetamaks(
    walletIsConnected = false
  ): Promise<User | undefined> {
    let authService = new AuthService();

    try {
      let publicAddress: string | undefined;
      if (!walletIsConnected) {
        //get public address of connected provider + connects wallet to website
        publicAddress = await this.connectWallet();
      } else {
        publicAddress = await this.getProviderAccountIfExists();
      }

      if (!publicAddress) {
        return undefined;
      }

      //gets a user object from the db for the provided public address
      let user = await authService.getUser(publicAddress);

      if (!walletIsConnected) {
        //authenticates that user holds the private key to the public address
        //returns unser with jwt
        const signedMessage = await this.signMessage(publicAddress, user.nonce);
        user = await authService.authenticateWithSignature(
          publicAddress,
          signedMessage
        );
      } else {
        user = await authService.authenticateWithJWT();
        //user has changed accounts and needs to sign new message
        if (user.publicAddress !== publicAddress) {
          authService.logout();
          return undefined;
        }
      }

      return user;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  private async connectWallet(): Promise<string> {
    if (window.ethereum && Web3.givenProvider) {
      try {
        await window.ethereum.enable();
        const accounts: string[] = await this.web3.eth.getAccounts();
        return Promise.resolve(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    }
    return Promise.reject('User denied account access');
  }

  private async signMessage(publicAddress: string, nonce: number) {
    return await this.web3.eth.personal.sign(
      this.web3.utils.fromUtf8('Please sign this number to login: ' + nonce),
      publicAddress
    );
  }
}
