package me.itsvixano.wikiwelp.controller;

import me.itsvixano.wikiwelp.exception.DuplicateEmailException;
import me.itsvixano.wikiwelp.model.UserDTO;
import me.itsvixano.wikiwelp.service.IUserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final IUserService userService;

    public UserController(IUserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserDTO user) {
        try {
            UserDTO created = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (DuplicateEmailException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDTO user) {
        UserDTO existing = userService.findByEmail(user.getEmail());
        if (existing == null || !existing.getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(existing);
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUser(@PathVariable String email) {
        UserDTO user = userService.findByEmail(email);
        return (user == null) ?
                ResponseEntity.notFound().build() :
                ResponseEntity.ok(user);
    }
}
