package com.coyoapp.tinytask.web;

import java.util.ArrayList;


import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.coyoapp.tinytask.domain.Customer;
import com.coyoapp.tinytask.repository.CustomerRepository;
import com.coyoapp.tinytask.service.AccountService;


@CrossOrigin(origins = "*")
@RequestMapping("/users")
@RestController
public class CustomerController {
	@Autowired 
	private CustomerRepository userRepository;
	
	@Autowired
	private AccountService accountService;
	
	@Autowired
	private PasswordEncoder bCryptPasswordEncoder;

	
	
	
	
	@PostMapping("/register")
	public Customer register(@RequestBody Customer customer) {
	
		Customer user = accountService.findUserByUsername(customer.getLogin());

		
		if(user != null) throw new RuntimeException("this user already exist");
		else {
			accountService.saveUser(customer);
		}
	
		
		 return customer;
	}
	
	
	@RequestMapping(value="/allusers" ,method = RequestMethod.GET)
	public List<Customer> getUsers() {
		return  (List<Customer>) userRepository.findAll();
				}
	
	
	
	
	@RequestMapping(value="/userbyid/{id}" ,method = RequestMethod.GET)
	public Customer getUser(@PathVariable Long id) {
		return userRepository.findById(id).get();
				}
	
	@RequestMapping(value="/userbylogin/{username}" ,method = RequestMethod.GET)
	public Customer getUserByLogin(@PathVariable String username) {
		return userRepository.findByLogin(username);
				}
	
	

	@RequestMapping(value="/connecteduser" ,method = RequestMethod.GET)
	 public Customer getConnectedUser(HttpServletRequest httpServletRequest)
	 {
		Customer customer = new Customer();
		HttpSession httpSession =httpServletRequest.getSession();
		SecurityContext context=(SecurityContext) httpSession.getAttribute("SPRING_SECURITY_CONTEXT");
		String username=context.getAuthentication().getName();
		
		 try{ 
			 customer= userRepository.findByLogin(username);
			 
		 }
		 catch(Exception exception){
			 System.out.println("ME EXCPTION---"+exception.getMessage());
			 return null;
		 }
		 
		 
		return customer;
	
	 }


	@RequestMapping(value="/resetpassword" ,method = RequestMethod.PUT)
	public String resetPassword(@RequestParam String login,@RequestParam String oldpassword, @RequestParam String newpassword) {
		Customer customer=userRepository.findByLogin(login);
		
		if(bCryptPasswordEncoder.matches(oldpassword,customer.getPassword()) ) {
		customer.setPassword(newpassword);
		System.out.println("after customer : "+ customer);
		 accountService.saveUser(customer);
		 return "password reset successful";
		}
		else return "passwords do not match";
				}
	

	
}
