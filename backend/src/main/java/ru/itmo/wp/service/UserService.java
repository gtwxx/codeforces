package ru.itmo.wp.service;

import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ru.itmo.wp.domain.Post;
import ru.itmo.wp.domain.User;
import ru.itmo.wp.form.UserCredentials;
import ru.itmo.wp.repository.UserRepository;

import javax.xml.crypto.dsig.DigestMethod;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;


@Service
public class UserService {
    private final UserRepository userRepository;
    private final MessageDigest digest;
    private final String secret;

    /**
     * @noinspection FieldCanBeLocal, unused
     */

    public UserService(
            UserRepository userRepository,
            @Value("${password-salt}") String secret
    ) throws NoSuchAlgorithmException {
        this.userRepository = userRepository;
        this.digest = MessageDigest.getInstance("SHA-256");
        this.secret = secret;
    }

    public User register(UserCredentials userCredentials) {
        User user = new User();
        user.setLogin(userCredentials.login());
        userRepository.save(user);
        userRepository.updatePasswordSha(user.getId(),
                countPasswordSha(userCredentials.login(), userCredentials.password()));
        return user;
    }

    public boolean isLoginVacant(String login) {
        return userRepository.countByLogin(login) == 0;
    }

    public Optional<User> findByLoginAndPassword(String login, String password) {
        return login.isBlank() || password.isBlank() ?
                Optional.empty() :
                Optional.of(userRepository.findByLoginAndPassword(login, password));
    }

    public User findById(Long id) {
        return id == null ? null : userRepository.findById(id).orElse(null);
    }

    public List<User> findAll() {
        return userRepository.findAllByOrderByIdDesc();
    }

    public void writePost(User user, Post post) {
        user.addPost(post);
        post.setUser(user);
        userRepository.save(user);
    }

    private String countPasswordSha(String login, String password) {
        return new String(
                digest.digest((secret + login + password).getBytes(StandardCharsets.UTF_8)),
                StandardCharsets.UTF_8
        );
    }
}
