package com.coyoapp.tinytask.persistence.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "tasks")
public class TaskEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator="tasks_gen")
	@SequenceGenerator(name = "tasks_gen", sequenceName = "tasks_seq")
	@Column(name = "task_id")
	private Integer id;
	
	@Column(name = "task_name", nullable = false, length = 25)
	private String name;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
