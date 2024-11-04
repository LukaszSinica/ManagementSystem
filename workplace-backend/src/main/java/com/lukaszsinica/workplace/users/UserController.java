package com.lukaszsinica.workplace.users;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	private UsersRepository usersRepository;
	
	public UserController(UsersRepository usersRepository) {
		super();
		this.usersRepository = usersRepository;
	}
	
	@PreAuthorize("hasAuthority('ROLE_ADMINISTRATOR')")
	@GetMapping("/users")
	public Iterable<Users> listAllUsers() {
		return usersRepository.findAll();
	}

}
