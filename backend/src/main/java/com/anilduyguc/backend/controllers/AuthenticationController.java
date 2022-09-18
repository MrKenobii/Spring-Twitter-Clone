package com.anilduyguc.backend.controllers;

import com.anilduyguc.backend.exceptions.EmailAlreadyTakenException;
import com.anilduyguc.backend.exceptions.IncorrectVerificationCodeException;
import com.anilduyguc.backend.exceptions.UserDoesNotExistException;
import com.anilduyguc.backend.models.AppUser;
import com.anilduyguc.backend.models.RegistrationObject;
import com.anilduyguc.backend.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserService userService;

    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleEmailTaken(){
        return new ResponseEntity<String>("The email you provided is already in user", HttpStatus.CONFLICT);
    }

    @PostMapping("/register")
    public AppUser registerUser(@RequestBody RegistrationObject registrationObject){
        return userService.registerUser(registrationObject);
    }
    @ExceptionHandler({UserDoesNotExistException.class})
    public ResponseEntity<String> handleUserDoesntExist(){
        return new ResponseEntity<String>("The user does not exist", HttpStatus.NOT_FOUND);
    }
    @PutMapping("/update/phone")
    public AppUser updatePhoneNumber(@RequestBody LinkedHashMap<String, String> body){
        String username = body.get("username");
        String phone = body.get("phone");
        AppUser user = userService.getUserByUsername(username);
        user.setPhone(phone);
        return userService.updateUser(user);
    }
    @ExceptionHandler({EmailAlreadyTakenException.class})
    public ResponseEntity<String> handleFailedEmail(){
        return new ResponseEntity<String>("Email failed to send, try again", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @PostMapping("/email/code")
    public ResponseEntity<String> createEmailVerification(@RequestBody LinkedHashMap<String, String> body){
        userService.generateEmailVerification(body.get("username"));
        return new ResponseEntity<String>("Verification code generated, email sent", HttpStatus.OK);
    }
    @ExceptionHandler({IncorrectVerificationCodeException.class})
    public ResponseEntity<String> incorrectCodeHandler(){
        return new ResponseEntity<String>("The code provided does not match the users code", HttpStatus.CONFLICT);
    }
    @PostMapping("/email/verify")
    public AppUser verifyEmail(@RequestBody LinkedHashMap<String, String> body){
        Long code = Long.parseLong(body.get("code"));
        String username = body.get("username");
        return userService.verifyEmail(username, code);
    }
    @PutMapping("/update/password")
    public AppUser updatePassword(@RequestBody LinkedHashMap<String, String> body){
        String username = body.get("username");
        String password = body.get("password");
        return userService.setPassword(username, password);
    }


}
