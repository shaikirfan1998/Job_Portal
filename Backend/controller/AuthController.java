package com.web.JobPortal.controller;

import com.web.JobPortal.dto.AuthRequest;
import com.web.JobPortal.dto.AuthResponse;
import com.web.JobPortal.model.User;
import com.web.JobPortal.security.JwtUtils;
import com.web.JobPortal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        System.out.println("Attempting login for: " + request.getEmail());
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            
            // Generate JWT token
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            String token = jwtUtils.generateToken(userDetails);
            
            // Return token in response
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException e) {
            // Invalid credentials
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        } catch (Exception e) {
            // Other errors
            e.printStackTrace(); // Consider using a logger here
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again later.");
        }
    }
    
 // Company login endpoint
    @PostMapping("/companies/login")
    public ResponseEntity<?> companyLogin(@RequestBody AuthRequest request) {
        System.out.println("Attempting login for company: " + request.getEmail());
        try {
            // Authenticate the company using email and password
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );

            // Load company details from the database
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();  // UserDetails will now be for Company
            String token = jwtUtils.generateToken(userDetails); // Generate JWT token

            // Return the token in the response
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred. Please try again later.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
    	System.out.println(user.getSkillsIds());
        User registeredUser = userService.registerUser(user);
        return ResponseEntity.ok(registeredUser);
    }
}
