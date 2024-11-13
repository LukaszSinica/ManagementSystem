package com.lukaszsinica.workplace.users;

public class UserDTO {
    private String username;
    private Boolean enabled;
    private String authority;
    private String email;
    private Long phone;

    public UserDTO(String username, Boolean enabled, String authority, String email, Long phone) {
        this.username = username;
        this.enabled = enabled;
        this.authority = authority;
        this.email = email;
        this.phone = phone;
    }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getAuthority() {
		return authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Long getPhone() {
		return phone;
	}

	public void setPhone(Long phone) {
		this.phone = phone;
	}
    
    
}
