DROP TABLE task;

create table tasks (
   id varchar(255) not null constraint tasks_pkey primary key,
   created_at timestamp,
   updated_at timestamp,
   name varchar(255) constraint uk_s90mh6056fm69w0ilwka74vut unique
);

alter table tasks owner to tiny_task;

create table users (
    id varchar(255) not null constraint users_pkey primary key,
    email varchar(255) constraint uk_6dotkott2kjsp8vw4d0m25fb7 unique,
    user_name varchar(255) constraint uk_k8d0f2n7n88w1a16yhua64onx unique,
    user_notification_period_in_hours integer
);

alter table users owner to tiny_task;

create table user_tasks (
     id varchar(255) not null constraint user_tasks_pkey primary key,
     created_at timestamp,
     updated_at timestamp,
     due_date timestamp,
     is_done boolean,
     last_notified timestamp,
     task_id varchar(255) constraint fkd365e5kqm9ekl0dhslnnck8f7 references tasks,
     user_id varchar(255) constraint fksrpyfa9asu2ymkcqr7jol85o2 references users
);

alter table user_tasks owner to tiny_task;
