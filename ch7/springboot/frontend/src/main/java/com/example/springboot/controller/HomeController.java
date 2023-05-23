package com.example.springboot.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;

@RestController
public class HomeController {

	@GetMapping("/")
	public String index(@AuthenticationPrincipal OidcUser oauth2User) {
		return "Greetings " + oauth2User.getPreferredUsername();
	}

}