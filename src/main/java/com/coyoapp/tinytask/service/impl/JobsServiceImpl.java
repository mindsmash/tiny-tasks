package com.coyoapp.tinytask.service.impl;

import com.coyoapp.tinytask.domain.Jobs;
import com.coyoapp.tinytask.dto.JobsRequest;
import com.coyoapp.tinytask.dto.JobsRequestUpdate;
import com.coyoapp.tinytask.repository.JobsRepository;
import com.coyoapp.tinytask.service.JobsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.glasnost.orika.MapperFacade;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class JobsServiceImpl implements JobsService {

  private final JobsRepository jobsRepository;

  private final MapperFacade mapperFacade;

  private final ApplicationEventPublisher eventPublisher;

  @Override
  public Jobs createJob(JobsRequest jobsRequest) {
    Jobs job = mapperFacade.map(jobsRequest, Jobs.class);
    jobsRepository.save(job);
    eventPublisher.publishEvent(job);
    return job;
  }

  @Override
  public Jobs updateJob(JobsRequestUpdate jobRequest) {
    LocalTime t = LocalTime.parse(jobRequest.getSchedule());
    Jobs job = getByUsername(jobRequest.getUsername());
    DateFormat formatter = new SimpleDateFormat("HH:mm");
    try {
      Time timeValue = new Time(formatter.parse(jobRequest.getSchedule()).getTime());
      job.setSchedule(timeValue);
    } catch (ParseException e) {
      e.printStackTrace();
    }
    jobsRepository.save(job);
    eventPublisher.publishEvent(job);
    return job;
  }

  @Override
  public List<Jobs> getAllJobs() {
    return jobsRepository.findAll();
  }

  @Override
  public Jobs getByUsername(String username) {
    return jobsRepository.findByUsername(username);
  }

}
