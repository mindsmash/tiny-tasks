package com.coyoapp.tinytask.dto;

import javax.validation.constraints.NotEmpty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class UserRequest {

    @NotEmpty
    private String username;

    @NotEmpty
    private String pwd;

}
