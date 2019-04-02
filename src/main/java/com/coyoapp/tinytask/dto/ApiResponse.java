package com.coyoapp.tinytask.dto;

public class ApiResponse<T> {

  T data;
  AppError error;

  public ApiResponse() {
  }

  public T getData() {
    return data;
  }

  public void setData(T data) {
    this.data = data;
  }

  public AppError getError() {
    return error;
  }

  public void setError(AppError error) {
    this.error = error;
  }

  public static ApiResponse error(AppError error){
    ApiResponse response = new ApiResponse<>();
    response.setError(error);
    return response;
  }

  public static ApiResponse response(Object data){
    ApiResponse response = new ApiResponse<>();
    response.setData(data);
    return response;
  }

}
