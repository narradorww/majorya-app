import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged as firebaseOnAuthStateChanged, 
  sendPasswordResetEmail as firebaseSendPasswordResetEmail,
  signInWithCredential,
  GoogleAuthProvider,
  FirebaseAuthTypes 
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const auth = getAuth();

// Initialize Google Sign-In
GoogleSignin.configure({
  webClientId: '829019566858-igdl3m61s8p54d939kk76st0d9g948hu.apps.googleusercontent.com',
});

class AuthService {
  /**
   * SignIn with Google
   */
  async signInWithGoogle(): Promise<FirebaseAuthTypes.UserCredential | null> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      console.log('[AuthDebug] Google Sign-In Response:', JSON.stringify(response, null, 2));

      const idToken = response.data?.idToken;
      
      if (!idToken) {
        console.error('[AuthDebug] Token ID ausente na resposta:', response);
        throw new Error('Falha ao obter token do Google. Verifique o console para mais detalhes.');
      }

      const googleCredential = GoogleAuthProvider.credential(idToken);
      return await signInWithCredential(auth, googleCredential);
    } catch (error) {
      console.error('Google Sign-In Error', error);
      throw error;
    }
  }

  /**
   * Register a new user with email and password
   * @param email User email
   * @param password User password
   * @returns UserCredential
   */
  async signUp(email: string, password: string): Promise<FirebaseAuthTypes.UserCredential> {
    try {
      const result = await createUserWithEmailAndPassword(auth, email.trim(), password);
      return result;
    } catch (error: any) {
      console.error('Firebase signUp error (RAW):', JSON.stringify(error, null, 2));
      console.error('Firebase signUp error (DETAILS):', {
        code: error?.code,
        message: error?.message,
        nativeErrorMessage: error?.nativeErrorMessage,
        userInfo: error?.userInfo,
      });

      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este endereço de e-mail já está em uso.');
      }
      if (error.code === 'auth/invalid-email') {
        throw new Error('O endereço de e-mail é inválido.');
      }
      if (error.code === 'auth/weak-password') {
        throw new Error('A senha é muito fraca. Tente uma senha mais forte.');
      }
      if (error.code === 'auth/internal-error') {
        throw new Error('Erro interno ao cadastrar. Verifique a configuração do Firebase e tente novamente.');
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
    const trimmedEmail = email.trim();
    console.log('[AuthDebug] Iniciando login para:', trimmedEmail); // Log para debug
    
    try {
      const result = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      console.log('[AuthDebug] Login com sucesso!', result.user.uid);
      return result;
    } catch (error: any) {
      console.error('[AuthDebug] Erro no login (RAW):', JSON.stringify(error, null, 2));
      console.error('[AuthDebug] Erro no login (DETAILS):', {
        code: error?.code,
        message: error?.message,
        nativeErrorMessage: error?.nativeErrorMessage,
        userInfo: error?.userInfo,
      });

      if (error.code === 'auth/invalid-email' || error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        throw new Error('E-mail ou senha inválidos.');
      }
      if (error.code === 'auth/user-disabled') {
        throw new Error('Usuário desabilitado.');
      }
      if (error.code === 'auth/internal-error') {
        throw new Error('Erro interno ao entrar. Verifique a configuração do Firebase e tente novamente.');
      }
      throw error;
    }
  }

  /**
   * Log out the current user
   */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(auth);
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
    return firebaseOnAuthStateChanged(auth, callback);
  }

  /**
   * Get current user
   * @returns Current user or null
   */
  getCurrentUser(): FirebaseAuthTypes.User | null {
    return auth.currentUser;
  }
  /**
   * Send password reset email
   * @param email User email
   */
  async sendPasswordResetEmail(email: string): Promise<void> {
    try {
      await firebaseSendPasswordResetEmail(auth, email.trim());
    } catch (error: any) {
      console.error('Firebase sendPasswordResetEmail error (RAW):', JSON.stringify(error, null, 2));
      console.error('Firebase sendPasswordResetEmail error', error);
      if (error.code === 'auth/invalid-email') {
        throw new Error('O endereço de e-mail é inválido.');
      }
      if (error.code === 'auth/user-not-found') {
        throw new Error('Usuário não encontrado.');
      }
      throw error;
    }
  }
}

export const authService = new AuthService();
