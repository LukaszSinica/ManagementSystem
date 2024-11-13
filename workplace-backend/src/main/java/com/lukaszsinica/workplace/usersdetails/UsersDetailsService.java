package com.lukaszsinica.workplace.usersdetails;

import java.util.Optional;
import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lukaszsinica.workplace.users.Users;

@Service
public class UsersDetailsService {

	@Autowired
	private UsersDetailsRepository usersDetailsRepository;
	
	
	public void createDetailsForUser(Users tempUser) {
		Optional<UsersDetails> user = usersDetailsRepository.findByUser(tempUser);
		if (!user.isEmpty()) {
			return;
		}
		String email = tempUser.getUsername() + "@wokrplace.com";
		int phoneNumber = ThreadLocalRandom.current().nextInt(100_000_000, 1_000_000_000);
		UsersDetails usersDetails = new UsersDetails(tempUser, email, phoneNumber);
		usersDetailsRepository.save(usersDetails);
	}
	
}
