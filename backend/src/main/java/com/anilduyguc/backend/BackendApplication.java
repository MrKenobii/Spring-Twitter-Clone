package com.anilduyguc.backend;

import com.anilduyguc.backend.models.AppUser;
import com.anilduyguc.backend.models.Role;
import com.anilduyguc.backend.repositories.RoleRepository;
import com.anilduyguc.backend.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.HashSet;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }
    @Bean
    CommandLineRunner run(RoleRepository roleRepository, UserService userService){
        return args -> {
          roleRepository.save(new Role(1, "USER"));
      /*    AppUser user = new AppUser();
          user.setFirstName("unknown");
          user.setLastName("coder");
            userService.registerUser(user);*/
        };
    }
}
