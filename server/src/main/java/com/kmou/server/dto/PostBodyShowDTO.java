package com.kmou.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostBodyShowDTO {
    Long Id;
    String title;
    String content;
    byte[] image;
    String username;
    Long price;
    boolean isAccepted;
}
