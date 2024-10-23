package com.lukaszsinica.workplace.timer;

import java.sql.Timestamp;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "timer", schema = "workplace")
public class Timer {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String username;
	private LocalDate date;
	private Long time;
	private Timestamp from_time;
	private Timestamp to_time;

	protected Timer() {}

	public Timer(String username, LocalDate date, Long time, Timestamp from_time, Timestamp to_time) {
		super();
		this.username = username;
		this.date = date;
		this.time = time;
		this.from_time = from_time;
		this.to_time = to_time;
	}
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public LocalDate getDate() {
		return date;
	}
	public void setDate(LocalDate date) {
		this.date = date;
	}
	public Long getTime() {
		return time;
	}
	public void setTime(Long time) {
		this.time = time;
	}
	
	public Timestamp getFrom_time() {
		return from_time;
	}

	public void setFrom_time(Timestamp from_time) {
		this.from_time = from_time;
	}

	public Timestamp getTo_time() {
		return to_time;
	}

	public void setTo_time(Timestamp to_time) {
		this.to_time = to_time;
	}

	@Override
	public String toString() {
		return "Timer [id=" + id + ", username=" + username + ", date=" + date + ", timestamp=" + time + "]";
	}
	
	
}
