package com.kmou.server.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
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
    private boolean isPaid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private UserEntity user;

    private String garbageName;

    private Long price;

    @OneToOne(mappedBy = "post", cascade = CascadeType.ALL)
    private PaymentInfo paymentInfo;
}