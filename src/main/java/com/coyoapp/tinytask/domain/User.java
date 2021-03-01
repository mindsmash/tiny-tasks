package com.coyoapp.tinytask.domain;

import java.time.Instant;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import javax.persistence.Transient;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@Table(name = "usr")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class User {

  @Id
  //@GeneratedValue(generator = "uuid2")
  //@GenericGenerator(name = "uuid2", strategy = "uuid2")
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", nullable = false, updatable = false)
  private int id;

  @Column(name = "usrname")
  private String username;

  public String uuid;

  public String userpw;

  @Transient
  public String token;

  @CreatedDate
  private Instant created;


  public String getUuid() {
    return this.uuid;
  }

  public String getUsername() {
    return this.username;
  }

  public String getPassword() {
    return this.userpw;
  }
}
