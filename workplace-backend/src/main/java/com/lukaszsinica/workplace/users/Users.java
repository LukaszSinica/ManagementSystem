package com.lukaszsinica.workplace.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukaszsinica.workplace.authorities.Authorities;
import com.lukaszsinica.workplace.usersdetails.UsersDetails;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class Users {

	@Id
	private String username;
		
	@JsonIgnore
	private String password;
	private Boolean enabled;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private Authorities authority;
    
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private UsersDetails userDetails;
	
	public Users() {}
	
	public Users(String username, String password, Boolean enabled,UsersDetails userDetails, Authorities authority) {
		super();
		this.username = username;
		this.password = password;
		this.enabled = enabled;
		this.authority = authority;
		this.userDetails = userDetails;
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
	
	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	
	@JsonProperty("authority")
    public String getAuthority() {
        return authority != null ? authority.getAuthority() : null;
    }
    
    public void setAuthority(Authorities authority) {
		this.authority = authority;
	}
	

	public UsersDetails getUserDetails() {
		return userDetails;
	}

	public void setUserDetails(UsersDetails userDetails) {
		this.userDetails = userDetails;
	}

	@Override
	public String toString() {
		return "Users [username=" + username + ", password=" + password + ", enabled=" + enabled + ", authority="
				+ authority + ", userDetails=" + userDetails + "]";
	}

}
