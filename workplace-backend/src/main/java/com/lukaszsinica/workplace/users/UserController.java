package com.lukaszsinica.workplace.users;


import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	
	private UsersRepository usersRepository;
	
	public UserController(UsersRepository usersRepository) {
		this.usersRepository = usersRepository;
	}
	
	@GetMapping("/users")
	public List<UserDTO> listAllUsers() {
		List<Users> userList = (List<Users>) usersRepository.findAll(); // Casting to List
		List<UserDTO> userDTOList = userList.stream()
		    .map(user -> new UserDTO(
		        user.getUsername(),
		        user.getEnabled(),
		        user.getAuthority(),
		        user.getUserDetails() != null ? user.getUserDetails().getEmail() : null,
		        user.getUserDetails() != null ? user.getUserDetails().getPhone() : null
		    ))
		    .collect(Collectors.toList());
		
		return userDTOList;
	             
	}

}
