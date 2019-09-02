package com.coyoapp.tinytask.domain;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@Table(name = "task")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Task {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String name;
  @ManyToOne(fetch = FetchType.LAZY, optional = false)
  @JoinColumn(name = "id_user", insertable = false, updatable = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private User user; 
  
  @CreatedDate
  private Instant created;

public String getName() {
	return name;
}

public void setName(String name) {
	this.name = name;
}


public User getUser() {
	return user;
}

public void setUser(User user) {
	this.user = user;
}
}
