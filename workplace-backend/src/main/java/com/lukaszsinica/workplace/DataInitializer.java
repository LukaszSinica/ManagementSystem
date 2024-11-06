package com.lukaszsinica.workplace;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.lukaszsinica.workplace.users.UsersService;

@Component
public class DataInitializer implements CommandLineRunner {

    private final UsersService usersService;

    public DataInitializer(UsersService usersService) {
        this.usersService = usersService;
    }

    @Override
    public void run(String... args) throws Exception {
    	usersService.createDefaultUsers();
    }
}