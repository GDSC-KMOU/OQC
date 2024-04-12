package com.kmou.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminPostDTO {
    Long Id;
    String address;
    boolean isPaid;
    boolean isAccepted;
}
