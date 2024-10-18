package com.lukaszsinica.workplace.timer;

import java.sql.Date;
import java.sql.Timestamp;

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
	private Date date;
	private Timestamp timestamp;
	
	protected Timer() {}

	public Timer(Integer id, String username, Date date, Timestamp timestamp) {
		super();
		this.id = id;
		this.username = username;
		this.date = date;
		this.timestamp = timestamp;
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
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Timestamp getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}

	@Override
	public String toString() {
		return "Timer [id=" + id + ", username=" + username + ", date=" + date + ", timestamp=" + timestamp + "]";
	}
	
	
}
