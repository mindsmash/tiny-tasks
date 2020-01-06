package com.coyoapp.tinytask.utils;

import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.Map;
import java.util.stream.Collectors;

@Component
public class SharedUtils {

    public static Map<String, String> getFieldMapErrors(BindingResult validation) {
        return validation.getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
    }
}
