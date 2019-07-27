package com.coyoapp.tinytask.dto;

public class TaskUsers {
	
  private String taskTitle;
  private String userName;
  private String email;

  public TaskUsers(String taskTitle, String userName, String email){
    this.taskTitle = taskTitle;
    this.userName = userName;
    this.email = email;
  }

  public String getTaskTitle() {
    return taskTitle;
  }

  public void setTaskTitle(String taskTitle) {
    this.taskTitle = taskTitle;
  }

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
