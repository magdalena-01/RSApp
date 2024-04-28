package com.marko.rsbackend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class InvalidEmployeeIdException extends RuntimeException {

    public InvalidEmployeeIdException() {

        super("This employee id doesn't exist.");
    }
}
