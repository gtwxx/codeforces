package ru.itmo.wp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import ru.itmo.wp.domain.User;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    int countByLogin(String login);

    @Modifying
    @Query(value = "UPDATE user SET passwordSha=?3 WHERE id=?1", nativeQuery = true)
    void updatePasswordSha(long id, String passwordSha);

    @Query(value = "SELECT * FROM user WHERE login=?1 AND passwordSha=?2", nativeQuery = true)
    User findByLoginAndPassword(String login, String passwordSha);

    List<User> findAllByOrderByIdDesc();
}
