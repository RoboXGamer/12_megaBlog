import conf from "../conf/conf.js";
import { Client, Account, ID } from "appwrite";

export class AuthService {
	client = new Client();
	account;

	constructor() {
		this.client
			.setEndpoint(conf.appwriteUrl)
			.setProject(conf.appwriteProjectId);
		this.account = new Account(this.client);
	}

	async createAccount({ email, password, name }) {
		try {
			const userAccount = await this.account.create(
				ID.unique(),
				email,
				password,
				name
			);
			if (userAccount) {
				// Call another method to login also
				return this.login({ email, password });
			} else {
				return userAccount;
			}
		} catch (error) {
			console.log("Appwrite service :: Create account :: Error ::", error);
		}
	}

	async login({ email, password }) {
		try {
			return await this.account.createEmailSession(email, password);
		} catch (error) {
			console.log("Appwrite service :: Login :: Error ::", error);
		}
	}

	async getCurrentUser() {
		try {
			return await this.account.get();
		} catch (error) {
			console.log("Appwrite service :: Get current user :: Error ::", error);
		}

		return null;
	}

	async logout() {
		try {
			return await this.account.deleteSession("current");
		} catch (error) {
			console.log("Appwrite service :: Logout :: Error ::", error);
		}
	}
}

const authService = new AuthService();

export default authService;
