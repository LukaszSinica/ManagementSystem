package com.lukaszsinica.workplace.users;


import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lukaszsinica.workplace.timer.Timer;

@RestController
public class UserController {
	
	private UsersRepository usersRepository;
	private UsersService usersService;
	
	public UserController(UsersRepository usersRepository, UsersService usersService) {
		this.usersRepository = usersRepository;
		this.usersService = usersService;
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
	
	@PutMapping("/users/reset/{username}")
	public ResponseEntity<String> resetPasswordByUsername(@PathVariable String username) {
		Optional<Users> userOpt  = usersRepository.findById(username);
	    if (userOpt .isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	    }
	    
	    usersService.resetUserPassword(username);
	    
		return ResponseEntity.ok("password for user: " + username + "  reset");
	}
	

}
