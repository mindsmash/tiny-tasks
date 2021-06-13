package Repositories;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import Objects.User;

@Repository
public interface UserRepository 
	extends CrudRepository<User, Long>{
	
	@Query("SELECT u FROM user_table u WHERE u.username = ?1 and u.password = ?2")
	public User getUserIfExists(String username, String password);
	
	
	@Modifying
	@Query("UPDATE user_table SET password = ?2 WHERE id = ?1")
	public int resetPasswordIfPossible(Long id, String password);
	
	
	@Query("SELECT u from user_table u Where u.username = ?1")
	public User checkIfUsernameAlreadyExists(String username);
}
