package com.lukaszsinica.workplace;

import javax.sql.DataSource;

import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.session.jdbc.config.annotation.web.http.EnableJdbcHttpSession;

@Configuration
@EnableWebSecurity
@EnableJdbcHttpSession
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests((authorize) -> authorize
                .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults())
            .formLogin(Customizer.withDefaults())
            .sessionManagement((session) -> session
                .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                .sessionFixation().migrateSession()
                .maximumSessions(1)
                .maxSessionsPreventsLogin(true)
            );

        return http.build();
    }

    @Bean
    UserDetailsManager users(DataSource dataSource, PasswordEncoder passwordEncoder) {
    	UserDetails user = User.builder()
    		.username("user")
    		.password(passwordEncoder.encode("password"))
    		.roles("USER")
    		.build();
    	UserDetails admin = User.builder()
    		.username("admin")
    		.password(passwordEncoder.encode("password"))
    		.roles("USER", "ADMIN")
    		.build();
    	JdbcUserDetailsManager users = new JdbcUserDetailsManager(dataSource);
    	users.createUser(user);
    	users.createUser(admin);
    	return users;
    }
    
    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    DataSource dataSource() {
    	  return DataSourceBuilder.create()
    	            .driverClassName("com.mysql.cj.jdbc.Driver")
    	            .url("jdbc:mysql://localhost:3306/workplace")
    	            .username("workplace-user")
    	            .password("password")
    	            .build();
    }
}