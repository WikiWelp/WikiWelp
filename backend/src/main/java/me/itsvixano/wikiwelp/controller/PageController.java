package me.itsvixano.wikiwelp.controller;

import me.itsvixano.wikiwelp.model.PageDTO;
import me.itsvixano.wikiwelp.service.IPageService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/page")
public class PageController {
    private final IPageService pageService;

    public PageController(IPageService pageService) {
        this.pageService = pageService;
    }

    @PostMapping
    public ResponseEntity<?> savePage(@RequestBody PageDTO page) {
        try {
            PageDTO saved = pageService.savePage(page);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllPages() {
        return ResponseEntity.ok(pageService.findAll());
    }

    @GetMapping("/{title}")
    public ResponseEntity<?> getPage(@PathVariable String title) {
        PageDTO page = pageService.findByTitle(title);
        return (page == null) ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(page);
    }

    @GetMapping("/tag/{tag}")
    public ResponseEntity<?> getPagesByTag(@PathVariable String tag) {
        return ResponseEntity.ok(pageService.findByTag(tag));
    }

    @DeleteMapping("/{title}")
    public ResponseEntity<?> deletePage(@PathVariable String title) {
        boolean deleted = pageService.deleteByTitle(title);
        return deleted ? ResponseEntity.ok().build() : ResponseEntity.notFound().build();
    }
}
