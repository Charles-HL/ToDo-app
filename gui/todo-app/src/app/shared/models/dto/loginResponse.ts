
/**
 * Definition of a login response.
 */
export interface LoginResponse { 
    /**
     * Username
     */
    username: string;
    /**
     * If the authentification successed.
     */
    success: boolean;
    /**
     * Resonse message.
     */
    message: string;
    /**
     * JWT token.
     */
    token: string;
}

