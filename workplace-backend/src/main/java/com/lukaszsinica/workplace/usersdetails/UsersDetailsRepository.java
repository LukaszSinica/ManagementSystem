package com.lukaszsinica.workplace.usersdetails;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.lukaszsinica.workplace.users.Users;

@Repository
public interface UsersDetailsRepository extends CrudRepository<UsersDetails, Long> {
	Optional<UsersDetails> findByUser(Users user); 
}
