package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.exception.DuplicateEmailException;
import me.itsvixano.wikiwelp.model.UserDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public record UserDao(Connection connection) implements IUserDao {

    @Override
    public UserDTO createUser(UserDTO user) {
        String query = "INSERT INTO users (email, password, admin) VALUES (?, ?, ?) RETURNING id";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, user.getEmail());
            ps.setString(2, user.getPassword());
            ps.setBoolean(3, user.getAdmin());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    user.setId(rs.getLong("id"));
                }
            }
        } catch (SQLException e) {
            if (SQLErrors.SQL_DUPLICATE_KEY.equals(e.getSQLState())) {
                throw new DuplicateEmailException(e);
            }
            throw new RuntimeException(e);
        }
        return user;
    }

    // TODO: We probably don't want to fetch the password as in ...
    //       (We don't really care about security as for now)
    @Override
    public UserDTO findByEmail(String email) {
        String query = "SELECT id, email, password, admin FROM users WHERE email = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, email);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    UserDTO user = new UserDTO();
                    user.setId(rs.getLong("id"));
                    user.setEmail(rs.getString("email"));
                    user.setPassword(rs.getString("password"));
                    user.setAdmin(rs.getBoolean("admin"));
                    return user;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public List<UserDTO> findAll() {
        List<UserDTO> list = new ArrayList<>();
        String query = "SELECT id, email, password, admin FROM users ORDER BY id ASC";
        try (PreparedStatement ps = connection.prepareStatement(query);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                UserDTO user = new UserDTO();
                user.setId(rs.getLong("id"));
                user.setEmail(rs.getString("email"));
                user.setPassword(rs.getString("password"));
                user.setAdmin(rs.getBoolean("admin"));
                list.add(user);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }

    @Override
    public boolean deleteByEmail(String email) {
        String query = "DELETE FROM users WHERE email = ?";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, email);
            return ps.executeUpdate() > 0;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}