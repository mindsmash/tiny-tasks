package com.coyoapp.tinytask.dto;

import org.junit.Assert;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import static org.hamcrest.Matchers.is;

public class TinyTaskTest {

  @Rule
  public ExpectedException thrown = ExpectedException.none();

  @Test
  public void testCreateTaskSuccess() {
    TinyTask task1 = new TinyTask("newTask1");
    Assert.assertThat(task1.getName(), is("newTask1"));
    Assert.assertThat(task1.getReminder(), is(0));
    Assert.assertNull(task1.getEndTime());
    Assert.assertNull(task1.getStartTime());
  }

  @Test
  public void testCreateTaskFail() {
    thrown.expect(NullPointerException.class);
    thrown.expectMessage(is("Task must have a name"));
    new TinyTask(null);

  }

}
