package com.example.spring_api.demo.controller;

import com.example.spring_api.demo.dto.SignupRequest;
import com.example.spring_api.demo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class AuthController {
    @Autowired
    AuthService authService;

    @GetMapping("/signup")
    public String signupForm(Model model) {
        model.addAttribute("signupRequest", new SignupRequest());
        return "signup";
    }

    @PostMapping("/signup")
    public String registerUser(@Valid SignupRequest signUpRequest, BindingResult result, 
                              RedirectAttributes redirectAttributes) {
        if (result.hasErrors()) {
            return "signup";
        }
        
        String message = authService.registerUser(signUpRequest);
        redirectAttributes.addFlashAttribute("message", message);
        return "redirect:/login";
    }
}
