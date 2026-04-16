package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.UserDTO;

public interface IUserDao {
    UserDTO createUser(UserDTO user);

    UserDTO findByEmail(String email);
}