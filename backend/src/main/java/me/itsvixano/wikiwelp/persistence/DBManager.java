package me.itsvixano.wikiwelp.persistence;

import me.itsvixano.wikiwelp.persistence.dao.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Component
public class DBManager {
    private Connection connection = null;
    private IUserDao userDao = null;
    private IPageDao pageDao = null;
    private ITagDao tagDao = null;
    private IRevisionDao revisionDao = null;

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

    public ITagDao getTagDao() {
        if (tagDao == null) {
            tagDao = new TagDao(getConnection());
        }
        return tagDao;
    }

    public IRevisionDao getRevisionDao() {
        if (revisionDao == null) {
            revisionDao = new RevisionDao(getConnection());
        }
        return revisionDao;
    }

    public IPageDao getPageDao() {
        if (pageDao == null) {
            pageDao = new PageDao(getConnection(), getTagDao(), getRevisionDao());
        }
        return pageDao;
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
