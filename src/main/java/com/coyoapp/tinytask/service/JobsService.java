package com.coyoapp.tinytask.service;

import com.coyoapp.tinytask.domain.Jobs;
import com.coyoapp.tinytask.dto.JobsRequest;
import com.coyoapp.tinytask.dto.JobsRequestUpdate;

import java.util.List;

public interface JobsService {

  Jobs createJob(JobsRequest job);

  Jobs updateJob(JobsRequestUpdate jobRequest);

  List<Jobs> getAllJobs();

  Jobs getByUsername(String username);

}
