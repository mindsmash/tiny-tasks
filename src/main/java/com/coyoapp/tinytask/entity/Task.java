package com.coyoapp.tinytask.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Task {
  @Id
  String id;

  String number;
  String content;

  public Task() {
  }

  public Task(String number, String content) {
    this.number = number;
    this.content = content;
  }

  public String getId() {
    return id;
  }

  public String getNumber() {
    return number;
  }

  public void setNumber(String number) {
    this.number = number;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }
}
