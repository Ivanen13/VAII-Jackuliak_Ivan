package com.example.reactbackend.others;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewardService {
    @Autowired
    private RewardRepository rewardRepository;
    public void createReward(int count, String description) {
        Reward reward = new Reward();
        reward.setCount(count);
        reward.setDescription(description);
        rewardRepository.save(reward);
    }

    public List<Reward> getAllRewards() {
        List<Reward> rewards = rewardRepository.findAll();
        return rewardRepository.findAll();
    }
}
