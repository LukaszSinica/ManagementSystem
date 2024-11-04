package com.lukaszsinica.workplace.authorities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="authorities")
public class Authorities {

	@Id
	private String username;
	private String authority;
	
	public Authorities(String username, String authority) {
		super();
		this.username = username;
		this.authority = authority;
	}
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}
	
	
}
