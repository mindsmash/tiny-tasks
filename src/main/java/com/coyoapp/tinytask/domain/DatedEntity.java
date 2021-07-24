package com.coyoapp.tinytask.domain;

import java.time.LocalDateTime;
import javax.persistence.MappedSuperclass;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

@MappedSuperclass
@EqualsAndHashCode(callSuper = true, onlyExplicitlyIncluded = true)
@ToString(callSuper = true, onlyExplicitlyIncluded = true)
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
public class DatedEntity extends BaseEntity {

  protected LocalDateTime createdAt;

  protected LocalDateTime updatedAt;

  @PrePersist
  protected void onBaseCreate() {
    setCreatedAt(LocalDateTime.now());
    setUpdatedAt(LocalDateTime.now());
  }

  @PreUpdate
  protected void onBaseUpdate() {
    setUpdatedAt(LocalDateTime.now());
  }
}
