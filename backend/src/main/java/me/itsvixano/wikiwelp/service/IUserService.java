package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.UserDTO;

public interface IUserService {
    UserDTO createUser(UserDTO user);

    UserDTO findByEmail(String email);
}
