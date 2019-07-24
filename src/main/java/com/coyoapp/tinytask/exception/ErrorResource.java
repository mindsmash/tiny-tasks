package com.coyoapp.tinytask.exception;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonRootName;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import java.util.List;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:52
 */
@JsonSerialize(using = ErrorResourceSerializer.class)
@JsonIgnoreProperties(ignoreUnknown = true)
@lombok.Getter
@JsonRootName("errors")
public class ErrorResource
{
  private List<FieldErrorResource> fieldErrors;


  public ErrorResource(List<FieldErrorResource> fieldErrorResources)
  {
    this.fieldErrors = fieldErrorResources;
  }
}
