package me.itsvixano.wikiwelp.service;

import me.itsvixano.wikiwelp.model.UserDTO;
import me.itsvixano.wikiwelp.persistence.DBManager;
import me.itsvixano.wikiwelp.persistence.dao.IUserDao;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService implements IUserService {
    private final IUserDao userDao;

    public UserService(DBManager dbManager) {
        userDao = dbManager.getUserDao();
    }

    @Override
    public UserDTO createUser(UserDTO user) {
        if (user.getEmail() == null || user.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }

        user.setEmail(user.getEmail().trim());
        user.setAdmin(false);
        return userDao.createUser(user);
    }

    @Override
    public UserDTO findByEmail(String email) {
        return userDao.findByEmail(email);
    }

    @Override
    public List<UserDTO> findAll() {
        return userDao.findAll();
    }

    @Override
    public boolean deleteByEmail(String email) {
        if (email == null || email.isBlank()) {
            return false;
        }
        return userDao.deleteByEmail(email.trim());
    }
}
