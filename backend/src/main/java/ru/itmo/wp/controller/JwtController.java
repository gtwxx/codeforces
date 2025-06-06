package ru.itmo.wp.controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import ru.itmo.wp.domain.User;
import ru.itmo.wp.exception.ValidationException;
import ru.itmo.wp.form.UserCredentials;
import ru.itmo.wp.form.validator.UserCredentialsEnterValidator;
import ru.itmo.wp.service.JwtService;
import ru.itmo.wp.service.UserService;

import javax.validation.Valid;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class JwtController {

    private final UserService userService;
    private final JwtService jwtService;
    private final UserCredentialsEnterValidator enterValidator;

    public JwtController(UserService userService, JwtService jwtService, UserCredentialsEnterValidator enterValidator) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.enterValidator = enterValidator;
    }

    @InitBinder("userCredentials")
    public void initBinder(WebDataBinder webDataBinder){
        webDataBinder.addValidators(enterValidator);
    }


    @PostMapping("/jwt")
    public String create(@RequestBody @Valid UserCredentials userCredentials, BindingResult bindingResult){
        if (bindingResult.hasErrors()){
            throw new ValidationException(bindingResult);
        }
        return userService.findByLoginAndPassword(userCredentials.login(), userCredentials.password())
                .map(jwtService::create).orElse(null);
    }

    @GetMapping("/jwt")
    public Optional<User> find(@RequestParam String jwt){
        return jwtService.find(jwt);
    }

}
