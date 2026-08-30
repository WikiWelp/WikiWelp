package me.itsvixano.wikiwelp.controller;

import me.itsvixano.wikiwelp.model.TagDTO;
import me.itsvixano.wikiwelp.service.ITagService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tag")
public class TagController {
    private final ITagService tagService;

    public TagController(ITagService tagService) {
        this.tagService = tagService;
    }

    @GetMapping
    public ResponseEntity<?> getAllTags() {
        return ResponseEntity.ok(tagService.findAll());
    }

    @PostMapping
    public ResponseEntity<?> saveTag(@RequestBody TagDTO tag) {
        try {
            TagDTO saved = tagService.saveTag(tag);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping("/{name}")
    public ResponseEntity<?> getTag(@PathVariable String name) {
        TagDTO tag = tagService.findByName(name);
        return (tag == null) ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(tag);
    }
}
