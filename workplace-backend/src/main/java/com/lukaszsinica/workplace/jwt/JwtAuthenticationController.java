package com.lukaszsinica.workplace.jwt;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JwtAuthenticationController {
    
    private final JwtTokenService tokenService;
    
    private final AuthenticationManager authenticationManager;

    public JwtAuthenticationController(JwtTokenService tokenService, 
            AuthenticationManager authenticationManager) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<JwtTokenResponse> generateToken(
            @RequestBody JwtTokenRequest jwtTokenRequest) {
    	

    	UsernamePasswordAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(
                        jwtTokenRequest.username(), 
                        jwtTokenRequest.password());
        
        Authentication authentication = 
                authenticationManager.authenticate(authenticationToken);
        
        String token = tokenService.generateToken(authentication);
        List<String> authorities = authentication.getAuthorities()
                .stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority())
                .toList();
        
        return ResponseEntity.ok(new JwtTokenResponse(token, authorities));
    }
}

