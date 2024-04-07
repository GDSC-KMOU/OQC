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
    String userName;
    String userId;
    Long price;
    String garbageName;
    boolean isAccepted;
}
