package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.UserDTO;

import java.util.List;

public interface IUserDao {
    UserDTO createUser(UserDTO user);

    UserDTO findByEmail(String email);

    List<UserDTO> findAll();

    boolean deleteByEmail(String email);
}