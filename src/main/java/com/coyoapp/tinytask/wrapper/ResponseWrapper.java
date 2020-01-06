package com.coyoapp.tinytask.wrapper;

import java.io.Serializable;
import java.util.Date;

/**
 * @author Owori Juma
 * A generic class to wrap responses
 */
public class ResponseWrapper<T> implements Serializable {

  private int code;
  private String message;
  private T data;
  private Long timestamp;

  public ResponseWrapper() {
    this.code = 200;
    this.message = "Request was successful";
    this.timestamp = new Date().getTime();
  }

  public int getCode() {
    return code;
  }

  public void setCode(int code) {
    this.code = code;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public Long getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(Long timestamp) {
    this.timestamp = timestamp;
  }

}
