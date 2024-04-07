package com.kmou.server.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kmou.server.dto.PostDTO;
import com.kmou.server.entity.Post;
import com.kmou.server.entity.UserEntity;
import com.kmou.server.service.AIService;
import com.kmou.server.service.PostService;
import com.kmou.server.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.*;

@RestController
public class ImageController {
    private final AIService aiService;
    private final UserService userService;
    private final PostService postService;
    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);

    @Autowired
    public ImageController(AIService aiService, UserService userService, PostService postService) {
        this.aiService = aiService;
        this.userService = userService;
        this.postService = postService;
    }

    @PostMapping("/image")
    public ResponseEntity<Map<String, List<Map<String, Long>>>> analyzeImage(@RequestParam("image") MultipartFile image,
                                                                             Principal principal) throws JsonProcessingException {
        String analysisResult = aiService.analyzeImage(image);
        logger.info("Analysis result: " + analysisResult);

        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readTree(analysisResult);
        String resValue = rootNode.get("res").asText();
        logger.info("resValue: " + resValue);

        Map<String, List<Map<String, Long>>> response = getOptionsBasedOnAnalysis(resValue);
        logger.info("Response: " + response);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/selection")
    public ResponseEntity<PostDTO> saveSelection(@RequestParam("title") String title,
                                                 @RequestParam("content") String content,
                                                 @RequestParam("image") MultipartFile image,
                                                 @RequestParam("resValue") String resValue,
                                                 @RequestParam("selectedOption") Long price,
                                              Principal principal) throws IOException {
        String username = principal.getName();

        Optional<UserEntity> userOpt = Optional.ofNullable(userService.findByUsername(username));
        if (userOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        UserEntity user = userOpt.get();

        Post post = new Post();
        post.setTitle(title);
        post.setContent(content);
        post.setImage(image.getBytes());
        post.setUser(user);
        post.setPrice(price);
        post.setGarbageName(resValue);
        Post savedPost = postService.createPost(post);

        PostDTO responseDTO = new PostDTO();
        responseDTO.setId(savedPost.getId());
        responseDTO.setTitle(savedPost.getTitle());
        responseDTO.setContent(savedPost.getContent());
        responseDTO.setImage(savedPost.getImage());
        responseDTO.setPrice(savedPost.getPrice());
        responseDTO.setUserId(user.getUsername());
        responseDTO.setUsername(user.getName());
        responseDTO.setGarbageName(savedPost.getGarbageName());

        return ResponseEntity.ok(responseDTO);
    }

    private Map<String, List<Map<String, Long>>> getOptionsBasedOnAnalysis(String resValue) {
        Map<String, List<Map<String, Long>>> options = new HashMap<>();

        switch (resValue) {
            case "dog":
                List<Map<String, Long>> dogOptions = new ArrayList<>();
                dogOptions.add(Map.of("6인용 이상", 7000L));
                dogOptions.add(Map.of("6인용 미만", 5000L));
                dogOptions.add(Map.of("대리석 6인용 이상", 17000L));
                dogOptions.add(Map.of("대리석 6인용 미만", 13000L));
                options.put("dog", dogOptions);
                break;
            case "서랍장":
                List<Map<String, Long>> drawerOptions = new ArrayList<>();
                drawerOptions.add(Map.of("5단 이상", 10000L));
                drawerOptions.add(Map.of("5단 미만", 6000L));
                options.put("서랍장", drawerOptions);
                break;
            case "소파":
                List<Map<String, Long>> sofaOptions = new ArrayList<>();
                sofaOptions.add(Map.of("5인용이상", 17000L));
                sofaOptions.add(Map.of("3인용", 12000L));
                sofaOptions.add(Map.of("2인용", 9000L));
                sofaOptions.add(Map.of("1인용", 5000L));
                options.put("소파", sofaOptions);
                break;
            case "의자":
                List<Map<String, Long>> chairOptions = new ArrayList<>();
                chairOptions.add(Map.of("목재, 철제", 2000L));
                chairOptions.add(Map.of("목재, 철재 외", 3000L));
                chairOptions.add(Map.of("회전, 안락, 사무용의자", 5000L));
                chairOptions.add(Map.of("안마의자", 30000L));
                options.put("의자", chairOptions);
                break;
            case "장롱":
                List<Map<String, Long>> wardrobeOptions = new ArrayList<>();
                wardrobeOptions.add(Map.of("120cm 이상", 17000L));
                wardrobeOptions.add(Map.of("90cm 이상", 14000L));
                wardrobeOptions.add(Map.of("90cm 미만", 10000L));
                options.put("장롱", wardrobeOptions);
                break;
            case "책상":
                List<Map<String, Long>> deskOptions = new ArrayList<>();
                deskOptions.add(Map.of("서랍장 2개 혹은 1m 이상", 8000L));
                deskOptions.add(Map.of("서랍장 1개 혹은 1m 미만", 5000L));
                deskOptions.add(Map.of("책상 + 책장 세트", 12000L));
                options.put("책상", deskOptions);
                break;
        }

        return options;
    }

}
