package ru.itmo.wp.configuration;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.security.MessageDigest;

@Configuration
public class AppConfiguration {

    @Bean
    public Algorithm jwtAlgorithm(@Value("${password-salt}") String secret) {
        return Algorithm.HMAC256(secret);
    }
}
