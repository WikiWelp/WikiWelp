package me.itsvixano.wikiwelp.persistence.dao;

import me.itsvixano.wikiwelp.model.RevisionDTO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public record RevisionDao(Connection connection) implements IRevisionDao {

    @Override
    public RevisionDTO createRevision(Long pageId, String content) {
        String query = "INSERT INTO page_revisions (page_id, content) VALUES (?, ?) RETURNING id, page_id, content, created_at";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, pageId);
            ps.setString(2, content);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    RevisionDTO rev = new RevisionDTO();
                    rev.setId(rs.getLong("id"));
                    rev.setPageId(rs.getLong("page_id"));
                    rev.setContent(rs.getString("content"));
                    rev.setCreatedAt(rs.getTimestamp("created_at"));
                    return rev;
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    public List<RevisionDTO> findByPageId(Long pageId) {
        List<RevisionDTO> list = new ArrayList<>();
        String query = "SELECT * FROM page_revisions WHERE page_id = ? ORDER BY created_at DESC";
        try (PreparedStatement ps = connection.prepareStatement(query)) {
            ps.setLong(1, pageId);
            try (ResultSet rs = ps.executeQuery()) {
                while (rs.next()) {
                    RevisionDTO rev = new RevisionDTO();
                    rev.setId(rs.getLong("id"));
                    rev.setPageId(rs.getLong("page_id"));
                    rev.setContent(rs.getString("content"));
                    rev.setCreatedAt(rs.getTimestamp("created_at"));
                    list.add(rev);
                }
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return list;
    }
}
