package com.coyoapp.tinytask.domain;

import java.io.Serializable;
import java.util.List;
import javax.persistence.Access;
import javax.persistence.AccessType;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

@Entity(name = "users")
@Table
@Data
@NoArgsConstructor
@AllArgsConstructor
@Access(AccessType.FIELD)
public class User implements Serializable {

  @Id
  @GeneratedValue(generator = "uuid2")
  @GenericGenerator(name = "uuid2", strategy = "uuid2")
  @Column(name = "id", nullable = false, updatable = false)
  private String id;

  private String username;

  private String password;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Task> tasks;

  public void removeTask(Task task) {
    // prevent endless loop
    if (!tasks.contains(task)) {
      return;
    }
    tasks.remove(task);
    task.setUser(null);
  }
}
