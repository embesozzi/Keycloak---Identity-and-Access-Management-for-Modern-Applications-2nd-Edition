package com.example.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

@RestController
public class HomeController {

	@GetMapping("/")
	public String index() {
		return "Greetings from Spring Boot!";
	}

}