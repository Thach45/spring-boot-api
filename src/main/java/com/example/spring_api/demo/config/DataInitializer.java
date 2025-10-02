package com.example.spring_api.demo.config;

import com.example.spring_api.demo.entity.Role;
import com.example.spring_api.demo.entity.RoleName;
import com.example.spring_api.demo.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create roles if they don't exist
        if (!roleRepository.findByName(RoleName.USER).isPresent()) {
            Role userRole = new Role();
            userRole.setName(RoleName.USER);
            roleRepository.save(userRole);
        }

        if (!roleRepository.findByName(RoleName.ADMIN).isPresent()) {
            Role adminRole = new Role();
            adminRole.setName(RoleName.ADMIN);
            roleRepository.save(adminRole);
        }
    }
}
