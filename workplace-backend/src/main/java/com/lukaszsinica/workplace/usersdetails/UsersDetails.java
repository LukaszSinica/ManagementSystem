package com.lukaszsinica.workplace.usersdetails;

import com.lukaszsinica.workplace.users.Users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class UsersDetails {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
    @OneToOne
    @JoinColumn(name = "username", nullable = false)
    private Users user;
    
    private String email;
    private Long phone;
    
    protected UsersDetails() {}
    
    public UsersDetails(Users user, String email, long phone) {
		super();
		this.user = user;
		this.email = email;
		this.phone = phone;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public Users getUser() {
		return user;
	}

	public void setUser(Users user) {
		this.user = user;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long phone) {
		this.phone = phone;
	}

	@Override
	public String toString() {
		return "UsersDetails [id=" + id + ", user=" + user + ", email=" + email + ", phone=" + phone + "]";
	}

    
    
}
