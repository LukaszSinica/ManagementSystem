package com.lukaszsinica.workplace.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.lukaszsinica.workplace.authorities.Authorities;
import com.lukaszsinica.workplace.authorities.AuthoritiesRepository;

@Service
public class UsersService {
	
	@Autowired
	private UsersRepository usersRepository;
	
    @Autowired
    private AuthoritiesRepository authoritiesRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public void createDefaultUsers() {
    	 Users user = new Users("user", "user@workplace.com", passwordEncoder.encode("password"), true, null);
         Authorities userAuthority = new Authorities();
         userAuthority.setUser(user);
         userAuthority.setAuthority("ROLE_USER");

         user.setAuthority(userAuthority);

         usersRepository.save(user);
         authoritiesRepository.save(userAuthority);

         Users admin = new Users("admin", "admin@workplace.com", passwordEncoder.encode("password"), true, null);
         Authorities adminAuthority = new Authorities();
         adminAuthority.setUser(admin);
         adminAuthority.setAuthority("ROLE_ADMIN");

         admin.setAuthority(adminAuthority);

         usersRepository.save(admin);
         authoritiesRepository.save(adminAuthority);
    }
}
