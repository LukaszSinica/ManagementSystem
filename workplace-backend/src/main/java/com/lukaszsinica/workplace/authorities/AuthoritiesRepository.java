package com.lukaszsinica.workplace.authorities;

import org.springframework.data.repository.CrudRepository;

import com.lukaszsinica.workplace.users.Users;

public interface AuthoritiesRepository extends CrudRepository<Authorities, Long> {

	Authorities findByUser(Users users);

}
