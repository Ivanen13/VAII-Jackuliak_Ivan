package com.example.reactbackend.others;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "reward")
public class reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reward_id;

    @Column(nullable = false)
    private int count;

    @Column(nullable = false)
    private String description;
}
