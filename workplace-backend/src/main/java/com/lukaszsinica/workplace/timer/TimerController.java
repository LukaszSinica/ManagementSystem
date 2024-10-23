package com.lukaszsinica.workplace.timer;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TimerController {

	TimerRepository timerRepository;
	
	public TimerController(TimerRepository timerRepository) {
		super();
		this.timerRepository = timerRepository;
	}

	@GetMapping("/timer/{username}")
	private List<Timer> listTimersByUsername(@PathVariable String username) {
		List<Timer> listUsernameTimer = timerRepository.findByUsername(username);
		
		return listUsernameTimer;
	}
	
	@PostMapping("/timer/{username}")
	private ResponseEntity<String> addNewTimer(@RequestBody AddTimerRequest request, @PathVariable String username) {
	    LocalDate date = LocalDate.now();
	    LocalDateTime now = LocalDateTime.now();
	    LocalDateTime timestampFrom = now.minus(request.time(), ChronoUnit.SECONDS);

	    Timestamp timestamp_from = Timestamp.valueOf(timestampFrom);
	    Timestamp timestamp_to = Timestamp.valueOf(now);

		Timer newTimer = new Timer(username, date, request.time(), timestamp_from, timestamp_to);
		timerRepository.save(newTimer);

		return ResponseEntity.ok("timer added successfully");
	}
	
	@DeleteMapping("/timer/{username}/{id}")
	private ResponseEntity<String> deleteUserTimerById(@PathVariable String username, @PathVariable String id) {
		
		
		
		return ResponseEntity.ok("timer was removed successfully");

	}
}

