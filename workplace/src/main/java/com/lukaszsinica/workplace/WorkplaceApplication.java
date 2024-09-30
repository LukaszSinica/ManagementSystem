package com.lukaszsinica.workplace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.lukaszsinica.test")
public class WorkplaceApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorkplaceApplication.class, args);
	}

}
