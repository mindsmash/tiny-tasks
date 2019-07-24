package com.coyoapp.tinytask.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:53
 */
@JsonIgnoreProperties(ignoreUnknown = true)
@Getter
public class FieldErrorResource {

  private String resource;
  private String field;
  private String code;
  private String message;


  public FieldErrorResource(String resource, String field, String code, String message) {

    this.resource = resource;
    this.field = field;
    this.code = code;
    this.message = message;
  }

}
