package com.coyoapp.tinytask.web;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/")
@RestController
public class IndexController {
  @GetMapping
  public String getIndexContent() {
    return "Tiny Task Server is up and running.";
    //one could redirect to swagger
  }
}
