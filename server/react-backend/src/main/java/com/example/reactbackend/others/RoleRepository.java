package com.example.reactbackend.others;

import com.example.reactbackend.Users.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Role findByRoleId(int roleId);
}
