package com.web.JobPortal.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.web.JobPortal.model.Company;
import com.web.JobPortal.model.User;
import com.web.JobPortal.repository.CompanyRepository;
import com.web.JobPortal.repository.UserRepository;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.crypto.SecretKey;

@Component
public class JwtUtils {

	private static final SecretKey SECRET_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // Token validity set to 1 hour
    
    @Autowired
    private CompanyRepository companyRepository;
    
    @Autowired
    private UserRepository userRepository;

    // Generate token
    public String generateToken(UserDetails userDetails) {
        System.out.println("Hi in login jwt create");
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", userDetails.getAuthorities().toArray()[0].toString());
        
        if (userDetails.getAuthorities().toArray()[0].toString().equals("ROLE_COMPANY")) {
        	System.out.println("mail is : "+userDetails.getUsername());
            String companyEmail = userDetails.getUsername();
            Company company = companyRepository.findByCompanyEmail(companyEmail);
            if (company != null) {
                claims.put("companyId", company.getCompanyId()); // Add company ID to claims
            }
        }
        else {
        	User user = userRepository.findByEmail(userDetails.getUsername());
        	if (user != null) {
                claims.put("role", user.getRole()); // Add company ID to claims
            }
        }
        
        return createToken(claims, userDetails.getUsername());
    }

    // Create token with claims
    private String createToken(Map<String, Object> claims, String subject) {
    	System.out.println(SECRET_KEY);
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SECRET_KEY) // Use the SECRET_KEY directly
                .compact();
    }

    // Extract username from the token
    public String extractUsername(String token) {
    	System.out.println("Token is "+token);
        return extractAllClaims(token).getSubject();
    }

    // Validate token with UserDetails
    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Check if token is expired
    private boolean isTokenExpired(String token) {
        return extractAllClaims(token).getExpiration().before(new Date());
    }

    // Extract all claims from token
    private Claims extractAllClaims(String token) {
    	System.out.println("Final try here");
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    // Simple validate token
    public boolean validateToken(String token) {
        try {
            extractAllClaims(token);
            return !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }
}
