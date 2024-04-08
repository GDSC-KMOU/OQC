package com.kmou.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPostDTO {
    Long Id;
    String title;
    String username;
    boolean isPaid;
    boolean isAccepted;
}
