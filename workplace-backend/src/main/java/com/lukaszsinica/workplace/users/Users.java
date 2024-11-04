package com.lukaszsinica.workplace.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lukaszsinica.workplace.authorities.Authorities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Users {

	@Id
	private String username;
	@JsonIgnore
	private String password;
	private boolean enabled;
	
	@ManyToOne
	private Authorities authorities; 
	
	public Users() {}
	
	public Users(String username, String password, boolean enabled) {
		super();
		this.username = username;
		this.password = password;
		this.enabled = enabled;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public boolean isEnabled() {
		return enabled;
	}
	
	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	@Override
	public String toString() {
		return "Users [username=" + username + ", password=" + password + ", enabled=" + enabled + "]";
	}
	
	
}
