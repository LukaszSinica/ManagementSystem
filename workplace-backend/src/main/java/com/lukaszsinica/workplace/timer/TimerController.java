package com.lukaszsinica.workplace.timer;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

import org.springframework.http.ResponseEntity;
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

		Timer newTimer = new Timer(username, date, request.time());
		timerRepository.save(newTimer);
		
		return ResponseEntity.ok("timer added to database");
	}
}

