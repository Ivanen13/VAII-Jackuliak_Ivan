package com.example.reactbackend.others;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Reward")
public class Reward {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reward_id;

    @Column(nullable = false)
    private int count;

    @Column(nullable = false)
    private String description;

    public void setCount(int count) {
        this.count = count;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public int getCount() {
        return count;
    }

    public String getDescription() {
        return description;
    }

    public Long getReward_id(){return reward_id;}
}
