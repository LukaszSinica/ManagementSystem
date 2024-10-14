package com.lukaszsinica.workplace;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DefaultController {
	
	@PostMapping("/login")
	public String login(@RequestParam("username") String username) {
	    System.out.println("Username submitted: " + username);
	    return "redirect:/home";
	}
}
