package com.lukaszsinica.workplace.timer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimerRepository extends CrudRepository<com.lukaszsinica.workplace.timer.Timer, Long> {
	List<com.lukaszsinica.workplace.timer.Timer> findByUsername(String username);
	Optional<Timer> findById(Long id);
}
