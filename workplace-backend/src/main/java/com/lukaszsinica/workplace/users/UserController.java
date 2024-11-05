package com.lukaszsinica.workplace.users;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	private UsersRepository usersRepository;
	
	public UserController(UsersRepository usersRepository) {
		this.usersRepository = usersRepository;
	}
	
	@GetMapping("/users")
	public Iterable<Users> listAllUsers() {
		return usersRepository.findAll();
	}

}
