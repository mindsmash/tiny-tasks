/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.coyoapp.tinytask.configuration;


import com.coyoapp.tinytask.exception.GeneralError;
import com.coyoapp.tinytask.exception.TaskNotFoundException;
import com.coyoapp.tinytask.utils.CustomEntry;
import com.coyoapp.tinytask.wrapper.ResponseWrapper;
import org.hibernate.exception.ConstraintViolationException;
import org.postgresql.util.PSQLException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.InvalidDataAccessApiUsageException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.CredentialsExpiredException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * Controller advice to translate the server side exceptions to client-friendly
 * json structures.
 */
@ControllerAdvice
public class ExceptionConfigs {

  private final Logger log = LoggerFactory.getLogger(this.getClass());

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<ResponseWrapper> processSpringValidationError(HttpMessageNotReadableException ex) {
    log.error(ex.getMessage(), ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    //response.setData(ex.getMessage());
    response.setMessage("Bad request please check your input before trying again");
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(org.springframework.web.client.HttpClientErrorException.class)
  public ResponseEntity<ResponseWrapper> restTemplateErrors(org.springframework.web.client.HttpClientErrorException ex) {
    log.error(ex.getMessage(), ex);
    ResponseWrapper response = new ResponseWrapper();
    if (ex.getStatusCode().value() == 404) {
      response.setCode(404);
      response.setMessage("Failed to locate third party resources");
      return new ResponseEntity(response, HttpStatus.NOT_FOUND);
    }
    response.setCode(500);
    //response.setData(ex.getMessage());
    response.setMessage("Internal server error occured");
    return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(org.springframework.web.bind.MissingServletRequestParameterException.class)
  public ResponseEntity<ResponseWrapper> processSpringValidationError(org.springframework.web.bind.MissingServletRequestParameterException ex) {
    log.error(ex.getMessage(), ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setData(new CustomEntry("description", ex.getMessage()));
    response.setMessage("Missing request parameters");
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
  public ResponseEntity<ResponseWrapper> processExpectationError(HttpMediaTypeNotSupportedException ex) {
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(417);
    response.setMessage("Sorry unsupported media type");
    return new ResponseEntity(response, HttpStatus.EXPECTATION_FAILED);
  }

  @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
  public ResponseEntity<ResponseWrapper> processMethodNotSupportedException(HttpRequestMethodNotSupportedException ex) {
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(405);
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.METHOD_NOT_ALLOWED);
  }

  @ExceptionHandler({NullPointerException.class, org.springframework.orm.jpa.JpaSystemException.class,
    java.sql.SQLException.class, javax.persistence.PersistenceException.class})
  public ResponseEntity<ResponseWrapper> processNullPointerError(NullPointerException ex) {
    log.error("Null pointer exception occured", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(500);
    response.setMessage("Sorry internal server error occured please check your request before trying again");
    return new ResponseEntity(response, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(org.hibernate.AssertionFailure.class)
  public ResponseEntity<ResponseWrapper> processNullId(org.hibernate.AssertionFailure ex) {
    log.error("Trying to reference id that doesn't exist", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setMessage("Sorry bad request, the specified id not found");
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ResponseWrapper> processBadCredentials(BadCredentialsException ex) {
    log.error("Trying to reference id that doesn't exist", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(CredentialsExpiredException.class)
  public ResponseEntity<ResponseWrapper> processCredentialsExpired(CredentialsExpiredException ex) {
    log.error("Trying to reference id that doesn't exist", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(410);
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }


  @ExceptionHandler(TaskNotFoundException.class)
  public ResponseEntity<ResponseWrapper> entityNotFound(TaskNotFoundException ex) {
    log.error("Task not found", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(404);
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }


  @ExceptionHandler(UnsupportedOperationException.class)
  public ResponseEntity<ResponseWrapper> unImplementedException(UnsupportedOperationException ex) {
    log.debug("Unsupported exception: ", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(HttpStatus.NOT_IMPLEMENTED.value());
    response.setMessage("Sorry the requested resource is not yet implemented");
    return new ResponseEntity(response, HttpStatus.NOT_IMPLEMENTED);
  }

  @ExceptionHandler(InvalidDataAccessApiUsageException.class)
  public ResponseEntity<ResponseWrapper> deselectException(InvalidDataAccessApiUsageException ex) {
    log.error("Invalid API Usage", ex);
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(GeneralError.class)
  public ResponseEntity<ResponseWrapper> generalBadException(GeneralError ex) {
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setData(new CustomEntry("description", ex.getMessage()));
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.NOT_FOUND);
  }

  //PSQLException
  @ExceptionHandler(PSQLException.class)
  public ResponseEntity<ResponseWrapper> psqlException(PSQLException ex) {
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setData(new CustomEntry("description", ex.getMessage()));
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.NOT_FOUND);
  }

  //ConstraintViolationException
  @ExceptionHandler(ConstraintViolationException.class)
  public ResponseEntity<ResponseWrapper> constraint(ConstraintViolationException ex) {
    ResponseWrapper response = new ResponseWrapper();
    response.setCode(400);
    response.setData(new CustomEntry("description", ex.getMessage()));
    response.setMessage(ex.getMessage());
    return new ResponseEntity(response, HttpStatus.NOT_FOUND);
  }
}
