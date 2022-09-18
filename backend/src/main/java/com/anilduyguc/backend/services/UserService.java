package com.anilduyguc.backend.services;

import com.anilduyguc.backend.exceptions.EmailAlreadyTakenException;
import com.anilduyguc.backend.exceptions.EmailFailedToSendException;
import com.anilduyguc.backend.exceptions.IncorrectVerificationCodeException;
import com.anilduyguc.backend.exceptions.UserDoesNotExistException;
import com.anilduyguc.backend.models.AppUser;
import com.anilduyguc.backend.models.RegistrationObject;
import com.anilduyguc.backend.models.Role;
import com.anilduyguc.backend.repositories.RoleRepository;
import com.anilduyguc.backend.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final MailService mailService;
    private final PasswordEncoder passwordEncoder;

    public AppUser registerUser(RegistrationObject registrationObject){
        AppUser user = new AppUser();
        user.setFirstName(registrationObject.getFirstName());
        user.setLastName(registrationObject.getLastName());
        user.setEmail(registrationObject.getEmail());
        user.setDateOfBirth(registrationObject.getDob());

        String name = user.getFirstName() + user.getLastName();
        boolean nameTaken = true;
        String tempName = "";
        while (nameTaken){
            tempName=generateUsername(name);
            if (userRepository.findByUsername(tempName).isEmpty()) nameTaken=false;
        }
        user.setUsername(tempName);

        Set<Role> roles = user.getAuthorities();
        roles.add(roleRepository.findByAuthority("USER").get());
        user.setAuthorities(roles);
        try {
            return userRepository.save(user);
        } catch (Exception e){
            throw new EmailAlreadyTakenException();
        }

    }
    private String generateUsername(String name){
        long generatedNumber = (long) Math.floor(Math.random() * 1_000_000_000);
        return name+generatedNumber;
    }

    public AppUser getUserByUsername(String username) {
        return userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
    }

    public AppUser updateUser(AppUser user) {
        try {
            return userRepository.save(user);
        } catch (Exception e) {
            throw new EmailAlreadyTakenException();
        }
    }

    public void generateEmailVerification(String username) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        user.setVerification(generateVerificationNumber());
        try {
            mailService.sendEmail(user.getEmail(), "Your verification code", "Here is your verification code: " + user.getVerification());
            userRepository.save(user);
        } catch (Exception e) {
            throw new EmailFailedToSendException();
        }
        userRepository.save(user);
    }

    private Long generateVerificationNumber() {
        return (long) Math.floor(Math.random() * 100_000_000);
    }

    public AppUser verifyEmail(String username, Long code) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        if(code.equals(user.getVerification())){
            user.setEnabled(true);
            user.setVerification(null);
            return userRepository.save(user);
        }
        throw new IncorrectVerificationCodeException();
    }

    public AppUser setPassword(String username, String password) {
        AppUser user = userRepository.findByUsername(username).orElseThrow(UserDoesNotExistException::new);
        String encodingPassword = passwordEncoder.encode(password);
        user.setPassword(encodingPassword);
        return userRepository.save(user);
    }
}
