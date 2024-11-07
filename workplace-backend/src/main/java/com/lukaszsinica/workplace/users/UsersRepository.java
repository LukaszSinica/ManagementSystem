package com.lukaszsinica.workplace.users;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UsersRepository extends CrudRepository<Users, String> {
	Optional<Users> findByUsername(String username);
}
