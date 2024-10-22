package com.lukaszsinica.workplace.timer;

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
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Integer id;
	private String username;
	private LocalDate date;
	private Long time;
	
	protected Timer() {}

	public Timer(String username, LocalDate date, Long time) {
		super();
		this.username = username;
		this.date = date;
		this.time = time;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
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

	@Override
	public String toString() {
		return "Timer [id=" + id + ", username=" + username + ", date=" + date + ", timestamp=" + time + "]";
	}
	
	
}
