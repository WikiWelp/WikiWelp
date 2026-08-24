package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.PageDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public record PageDao(Connection connection) implements IPageDao {

    @Override
    public PageDTO savePage(PageDTO page) {
        String query = "INSERT INTO pages (title, content) VALUES (?, ?) " +
                "ON CONFLICT (title) DO UPDATE SET content = EXCLUDED.content RETURNING id, title, content";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, page.getTitle());
            ps.setString(2, page.getContent());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    page.setId(rs.getLong("id"));
                    page.setTitle(rs.getString("title"));
                    page.setContent(rs.getString("content"));
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return page;
    }

    @Override
    public PageDTO findByTitle(String title) {
        String query = "SELECT * FROM pages WHERE LOWER(title) = LOWER(?)";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setString(1, title);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    PageDTO page = new PageDTO();
                    page.setId(rs.getLong("id"));
                    page.setTitle(rs.getString("title"));
                    page.setContent(rs.getString("content"));
                    return page;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
