package com.lukaszsinica.workplace.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsersService {

	@Autowired
	private UsersRepository usersRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public void resetUserPassword(String userId) {
		Users user = usersRepository.findByUsername(userId);
		user.setPassword(passwordEncoder.encode("passwordReset"));
		usersRepository.save(user);
	}
	
	public void changeUserPassword(String userId, String password) {
		Users user = usersRepository.findByUsername(userId);
		user.setPassword(passwordEncoder.encode(password));
		usersRepository.save(user);
	}
}
