package com.coyoapp.tinytask.dto;

import com.coyoapp.tinytask.exception.ErrorResource;
import lombok.Data;

/**
 * author: acerbk
 * Date: 2019-07-24
 * Time: 11:51
 */
@Data
public class ErrorResponse
{
  private String message;
  ErrorResource errorResource;


  public ErrorResponse(String message)
  {
    this.message = message;
  }


  public ErrorResponse(String message, ErrorResource errorResource)
  {
    this.message = message;
    this.errorResource = errorResource;
  }
}
