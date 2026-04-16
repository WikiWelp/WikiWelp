package me.itsvixano.wikiwelp.persistence;

import me.itsvixano.wikiwelp.persistence.dao.IUserDao;
import me.itsvixano.wikiwelp.persistence.dao.UserDao;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Component
public class DBManager {
    private Connection connection = null;
    private IUserDao userDao = null;

    @Value("${spring.datasource.url}")
    private String url;
    @Value("${spring.datasource.username}")
    private String username;
    @Value("${spring.datasource.password}")
    private String password;

    public IUserDao getUserDao() {
        if (userDao == null) {
            userDao = new UserDao(getConnection());
        }
        return userDao;
    }

    public Connection getConnection() {
        try {
            if (connection == null || connection.isClosed()) {
                connection = DriverManager.getConnection(url, username, password);
            }
            return connection;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
