import { Client, Account, ID } from 'appwrite';
import config from '../Key/key';

class Auth {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(config.url).setProject(config.projectid);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if (userAccount) {
        await this.account.createEmailPasswordSession(email, password);
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      return await this.account.deleteSession('current');
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const user = this.account.get('current');
      if(user){
        return user
      }
    } catch (error) {
      throw error;
    }
  }
}

const authService = new Auth();
export default authService;
