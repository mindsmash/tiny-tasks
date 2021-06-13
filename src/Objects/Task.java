package Objects;


import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "task_table")
public class Task implements Serializable {

	private static final long serialVersionUID = -2482702629108741558L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@Column(nullable = false, length = 50)
	private String name;

	@Column(nullable = false, length = 50)
	private String title;

	@Column(nullable = false, length = 50)
	private String description;
	
    @ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name = "user_id", nullable = false)
    private User user;

	public Task(Long id, String name, String title, String description, User user) {
		this.id = id;
		this.name = name;
		this.title = title;
		this.description = description;
		this.user = user;
	}
	
	public Task () {}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String get_description() {
		return description;
	}

	public void set_description(String description) {
		this.description = description;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", name=" + name + ", title=" + title + ", description=" + description + ", user_id="
				+ user.getId() + "]";
	}

	
}
