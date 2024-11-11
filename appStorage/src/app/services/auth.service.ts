import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  UserCredential
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register({ email, password }: { email: string; password: string }): Promise<UserCredential | null> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error in registration:", error);
      return null;
    }
  }

  async login({ email, password }: { email: string; password: string }): Promise<UserCredential | null> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error) {
      console.error("Error in login:", error);
      return null;
    }
  }

  logout(): Promise<void> {
    return signOut(this.auth).catch(error => {
      console.error("Error in logout:", error);
      throw error;
    });
  }
}
