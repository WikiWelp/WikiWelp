package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.UserDTO;

import java.util.List;

public interface IUserService {
    UserDTO createUser(UserDTO user);

    UserDTO findByEmail(String email);

    List<UserDTO> findAll();

    boolean deleteByEmail(String email);
}
