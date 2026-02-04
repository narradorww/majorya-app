import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

class AuthService {
  /**
   * Register a new user with email and password
   * @param email User email
   * @param password User password
   * @returns UserCredential
   */
  async signUp(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const result = await auth().createUserWithEmailAndPassword(email, password);
      return result;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este endereço de e-mail já está em uso.');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('O endereço de e-mail é inválido.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('A senha é muito fraca. Tente uma senha mais forte.');
      }
      throw error;
    }
  }

  /**
   * Log in an existing user with email and password
   * @param email User email
   * @param password User password
   * @returns UserCredential
   */
  async signIn(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      return result;
    } catch (error: any) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('E-mail ou senha inválidos.');
      }
      if (error.code === 'auth/user-disabled') {
        throw new Error('Usuário desabilitado.');
      }
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  async signOut(): Promise<void> {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Erro ao sair:', error);
      throw error;
    }
  }

  /**
   * Observe authentication state changes
   * @param callback Function called on auth state change
   * @returns Unsubscribe function
   */
  onAuthStateChanged(callback: (user: FirebaseAuthTypes.User | null) => void): () => void {
    return auth().onAuthStateChanged(callback);
  }

  /**
   * Get current user
   * @returns Current user or null
   */
  getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth().currentUser;
  }
}

export const authService = new AuthService();
