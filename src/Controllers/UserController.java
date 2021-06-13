package Controllers;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import Objects.User;
import Repositories.UserRepository;

@Controller
@RequestMapping("/user")
public class UserController{
	
	@Autowired
	private UserRepository ur;
	
	@Transactional
	@PostMapping(path="/login")
	public @ResponseBody String Login(@RequestParam String username, @RequestParam String password) {
		User user =  ur.getUserIfExists(username, password);
		if (user!=null) return user.toString();
		else return "No any user with the provided username and/or password exists";
	}

	@Transactional
	@PostMapping(path="/reset/password")
	public @ResponseBody String resetPassword(@RequestParam Long id, @RequestParam String newpassword) {
		if (ur.resetPasswordIfPossible(id, newpassword) == 1) return "The password was successfully changed";
		else return "The password could not be changed.";
	}

	
	@PostMapping(path="/register")
	public @ResponseBody String registerUser(@RequestBody User user) {
		if (ur.checkIfUsernameAlreadyExists(user.getUsername()) != null) 
			return "There is already another user with the same username. Please, choose another username";	
		ur.save(user);
		return "The user was successfully registered";
	}
}
