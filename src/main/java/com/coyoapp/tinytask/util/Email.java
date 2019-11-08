package com.coyoapp.tinytask.util;

import lombok.*;

@Data
@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Email {
    private String subject;
    private String toEmail;
    private String body;
}
