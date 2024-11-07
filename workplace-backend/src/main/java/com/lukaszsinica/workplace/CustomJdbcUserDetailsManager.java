package com.lukaszsinica.workplace;

import javax.sql.DataSource;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.provisioning.JdbcUserDetailsManager;

import com.lukaszsinica.workplace.authorities.Authorities;
import com.lukaszsinica.workplace.authorities.AuthoritiesRepository;
import com.lukaszsinica.workplace.users.Users;
import com.lukaszsinica.workplace.users.UsersRepository;

public class CustomJdbcUserDetailsManager extends JdbcUserDetailsManager{

	
    private final UsersRepository usersRepository;
    private final AuthoritiesRepository authoritiesRepository;
    
    public CustomJdbcUserDetailsManager(DataSource dataSource, UsersRepository usersRepository, AuthoritiesRepository authoritiesRepository) {
        super.setDataSource(dataSource);
        this.usersRepository = usersRepository;
        this.authoritiesRepository = authoritiesRepository;
    }

    @Override
    public Users loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
    }
    
    public void createUserWithDetails(Users user) {
        if (userExists(user.getUsername())) {
        	Authorities userAuthority = authoritiesRepository.findByUser(user);
        	authoritiesRepository.deleteById(userAuthority.getId());
            usersRepository.deleteById(user.getUsername());
        }

        usersRepository.save(user);
    }
}
