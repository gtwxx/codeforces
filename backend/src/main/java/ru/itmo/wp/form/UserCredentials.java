package ru.itmo.wp.form;

import javax.validation.constraints.*;

public class UserCredentials {
    @NotBlank
    @Size(min = 2, max = 30)
    @Pattern(regexp = "[a-z]+", message = "Expected lowercase Latin letters")
    private String login;

    @NotNull
    @NotEmpty
    @Size(min = 1, max = 60)
    private String password;

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
