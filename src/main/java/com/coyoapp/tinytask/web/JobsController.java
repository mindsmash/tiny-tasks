package com.coyoapp.tinytask.web;

import com.coyoapp.tinytask.domain.Jobs;
import com.coyoapp.tinytask.dto.JobsRequest;
import com.coyoapp.tinytask.dto.JobsRequestUpdate;
import com.coyoapp.tinytask.service.JobsService;
import com.coyoapp.tinytask.util.Utils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;


@Slf4j
@RestController
@RequestMapping("/jobs")
@RequiredArgsConstructor
public class JobsController {

  private final JobsService jobsService;

  @PostMapping
  public Jobs createJob(@RequestBody @Valid JobsRequest jobsRequest) {
    log.debug("createJob(createJob={})", jobsRequest);
    return jobsService.createJob(jobsRequest);
  }

  @PutMapping
  public Jobs updateJob(@RequestBody @Valid JobsRequestUpdate job) {
    log.debug("updateJob(updateJob={})", job);
    return jobsService.updateJob(job);
  }

  @GetMapping
  public List<Jobs> getJobs() {
    log.debug("getJobs()");
    return jobsService.getAllJobs();
  }

  @GetMapping("/user")
  public Jobs getJobsByUser(@RequestParam String token) {
    log.debug("getJobsByUser()");
    return jobsService.getByUsername(Utils.decrypt(token));
  }
}
