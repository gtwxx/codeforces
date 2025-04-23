package ru.itmo.wp.service;


import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.itmo.wp.domain.User;

import java.util.Optional;

@Service
public class JwtService {
    private final Algorithm algorithm;
    private final UserService userService;

    public JwtService(
            UserService userService,
            Algorithm algorithm
    ) {
        this.userService = userService;
        this.algorithm = algorithm;
    }

    public String create(User user) {
        try {
            return JWT.create()
                    .withClaim("userId", user.getId())
                    .sign(algorithm);
        } catch (JWTCreationException exception) {
            throw new RuntimeException("Cant create jwt token");
        }
    }

    public Optional<User> find(String jwt) {

        try {
            JWTVerifier verifier = JWT.require(algorithm).build();

            DecodedJWT decodedJWT = verifier.verify(jwt);
            return Optional.of(userService.findById(decodedJWT.getClaim("userId").asLong()));
        } catch (JWTVerificationException exception) {
            return Optional.empty();
        }
    }
}
