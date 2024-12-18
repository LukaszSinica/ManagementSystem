package com.lukaszsinica.workplace.timer;

import java.sql.Timestamp;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TimerController {

	TimerRepository timerRepository;
	TimerService timerService;
	
	
	public TimerController(TimerRepository timerRepository, TimerService timerService) {
		super();
		this.timerRepository = timerRepository;
		this.timerService = timerService;
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
	private ResponseEntity<String> deleteUserTimerById(@PathVariable String username, @PathVariable Long id) {
		Optional<Timer> userTimerOpt  = timerRepository.findById(id);
		
	    if (userTimerOpt .isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timer not found");
	    }
	    
	    Timer userTimer = userTimerOpt.get();

		System.out.println(userTimer);
		if(userTimer.getUsername() != null && userTimer.getUsername().equals(username)) { 
			timerRepository.deleteById(id);
			return ResponseEntity.ok("timer was removed successfully");
		} 			
		return ResponseEntity.badRequest().body("timer was not removed");
	}
	
	@PutMapping("/timer/{username}/{id}")
	private ResponseEntity<String> updateUsernameTimerById(@PathVariable String username, @PathVariable Long id, @RequestBody PutTimerRequest request) {
		Optional<Timer> userTimerOpt  = timerRepository.findById(id);
	    if (userTimerOpt .isEmpty()) {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Timer not found");
	    }
	    Timer userTimer = userTimerOpt.get();

		if(userTimer.getUsername() != null && userTimer.getUsername().equals(username)) { 
            // Define formatters for date and time parts
            DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd.MM.yyyy");
            DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");

            // Parse date and time components
            LocalDate parsedDate = LocalDate.parse(request.date(), dateFormatter);
            LocalTime parsedFromTime = LocalTime.parse(request.from_time(), timeFormatter);
            LocalTime parsedToTime = LocalTime.parse(request.to_time(), timeFormatter);

            // Combine date and time parts into LocalDateTime, then convert to Timestamp
            LocalDateTime fromDateTime = LocalDateTime.of(parsedDate, parsedFromTime);
            LocalDateTime toDateTime = LocalDateTime.of(parsedDate, parsedToTime);

            Timestamp fromTime = Timestamp.valueOf(fromDateTime);
            Timestamp toTime = Timestamp.valueOf(toDateTime);

            // Set timestamps and calculate time difference
            userTimer.setFrom_time(fromTime);
            userTimer.setTo_time(toTime);
            userTimer.setDate(parsedDate);
            long durationInSeconds = Duration.between(fromDateTime, toDateTime).getSeconds();
            userTimer.setTime(durationInSeconds);
			timerRepository.save(userTimer);
			return ResponseEntity.ok("Timer was updated successfully");
		} 			
		
		return ResponseEntity.badRequest().body("timer was not updated");
	}
}

