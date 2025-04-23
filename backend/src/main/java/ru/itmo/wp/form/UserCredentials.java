package ru.itmo.wp.form;

import javax.validation.constraints.*;

public record UserCredentials (
    @NotBlank
    @Size(min = 2, max = 30)
    @Pattern(regexp = "[a-z]+", message = "Expected lowercase Latin letters")
    String login,

    @NotNull
    @NotEmpty
    @Size(min = 1, max = 60)
    String password
    ) {}
