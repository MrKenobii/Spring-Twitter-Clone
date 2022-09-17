package com.anilduyguc.backend.exceptions;

public class EmailAlreadyTakenException extends RuntimeException {
    private static final long serialVersionUID = 1L;
    public EmailAlreadyTakenException(){
        super("The email is already taken");
    }
}
