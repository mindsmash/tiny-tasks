package com.coyoapp.tinytask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ImageTaskNotFoundException extends RuntimeException {
    public ImageTaskNotFoundException(String message) {
        super(message);
    }

    public ImageTaskNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}