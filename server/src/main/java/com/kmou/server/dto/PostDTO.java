package com.kmou.server.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostDTO {
    private Long Id;
    private String title;
    private String content;
    private byte[] image;
    private String username;
    private String userId;
    private Long price;
    private String garbageName;
}
