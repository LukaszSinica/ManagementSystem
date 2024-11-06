package com.lukaszsinica.workplace.users;



import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.lukaszsinica.workplace.authorities.Authorities;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "users")
public class Users implements UserDetails{

	@Id
	private String username;
	
	private String email;
	
	@JsonIgnore
	private String password;
	private boolean enabled;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Authorities authority;
	
	public Users() {}
	
	public Users(String username, String email, String password, boolean enabled, Authorities authority) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.enabled = enabled;
		this.authority = authority;
	}
	
	public String getUsername() {
		return username;
	}
	
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	
	@JsonProperty("authority")
    public String getAuthority() {
        return authority != null ? authority.getAuthority() : null;
    }
    
    public void setAuthority(Authorities authority) {
		this.authority = authority;
	}
	
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(authority);
    }

	@Override
	public String toString() {
		return "Users [username=" + username + ", email=" + email + ", password=" + password + ", enabled=" + enabled
				+ ", authority=" + authority + "]";
	}
    

	
}
