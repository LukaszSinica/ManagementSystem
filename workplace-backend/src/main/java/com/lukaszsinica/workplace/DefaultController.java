package com.lukaszsinica.workplace;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultController {
	
	@PostMapping("/login")
	public void login(@RequestParam String username) {
	    System.out.println("Username submitted: " + username);
	}
}
