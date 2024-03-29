package com.kmou.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String content;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    private boolean isAccepted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private Long price;
}
