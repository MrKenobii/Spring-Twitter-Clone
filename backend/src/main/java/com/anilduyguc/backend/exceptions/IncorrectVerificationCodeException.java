package com.anilduyguc.backend.exceptions;

public class IncorrectVerificationCodeException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public IncorrectVerificationCodeException() {
        super("The code passes did not match the users verification code");
    }
}
