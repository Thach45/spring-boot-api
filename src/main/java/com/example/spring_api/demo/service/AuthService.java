package com.example.spring_api.demo.service;

import com.example.spring_api.demo.dto.SignupRequest;

public interface AuthService {
    String registerUser(SignupRequest signUpRequest);
}
