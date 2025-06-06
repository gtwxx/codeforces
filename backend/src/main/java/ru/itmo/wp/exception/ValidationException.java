package ru.itmo.wp.exception;

import org.springframework.validation.BindingResult;

public class ValidationException extends RuntimeException{

    private final BindingResult bindingResult;

    public BindingResult getBindingResult() {
        return bindingResult;
    }

    public ValidationException(BindingResult bindingResult) {
        this.bindingResult = bindingResult;
    }
}
