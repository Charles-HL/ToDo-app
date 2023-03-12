export interface ServerError { 
    /**
     * Message of the error.
     */
    message?: string;
    /**
     * Exception error message.
     */
    exceptionMessage?: string;
    /**
     * Stacktrace of the message.
     */
    stacktrace?: string;
}

