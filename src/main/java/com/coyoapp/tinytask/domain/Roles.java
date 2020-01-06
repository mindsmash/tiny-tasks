package com.coyoapp.tinytask.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.Entity;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import java.util.Set;

@Getter
@Setter
@Table(name = "roles")
@Entity
public class Roles extends BaseEntity implements GrantedAuthority {

    private String authority;

    @ManyToMany(mappedBy = "roles")
    private Set<Users> users;

    @Override
    public String getAuthority() {
        return authority;
    }

    public Roles(String authority) {
        this.authority = authority;
    }

    public Roles() {
    }
}
