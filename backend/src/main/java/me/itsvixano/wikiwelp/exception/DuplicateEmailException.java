package me.itsvixano.wikiwelp.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(Throwable cause) {
        super(cause);
    }
}