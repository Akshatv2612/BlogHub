import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async register(name, email, password) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name)
            if (user) {
                console.log(user)
                return await this.login(email,password)
            }
            else {
                return user
            }
        } catch (error) {
            console.log('Error while registering',error)
            throw error
        }
    }

    async login(email, password){
        try {
            const user=await this.account.createEmailPasswordSession(email,password)
            return user
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async logout(){
        try {
            await this.account.deleteSessions()
        } catch (error) {
            throw error
        }
    }

    async getCurrentUser(){
        try {
            const user=await this.account.get()
            return user
        } catch (error) {
            return null
        }
    }

    async updateUserName(name){
        try {
            const user=await this.account.updateName(name)
            return user
        } catch (error) {
            throw error
        }
    }
}

const authService = new AuthService();
export default authService