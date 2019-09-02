package com.coyoapp.tinytask.domain;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import lombok.Getter;
import lombok.Setter;

@Table(name = "user_task")
@Entity
@Setter
@Getter
@EntityListeners(AuditingEntityListener.class)
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@GenericGenerator(name = "uuid2", strategy = "uuid2")
	@Column(name = "id", nullable = false, updatable = false)
	private Integer id;

	private String name;

	private String email;
	
	private String password; 
	
	@OneToMany(mappedBy = "user")
	private List<Task> taks;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Task> getTaks() {
		return taks;
	}

	public void setTaks(List<Task> taks) {
		this.taks = taks;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", name=" + name + ", email=" + email + ", taks=" + taks + "]";
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
