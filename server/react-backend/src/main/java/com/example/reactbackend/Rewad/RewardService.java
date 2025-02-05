package com.example.reactbackend.Rewad;

import com.example.reactbackend.Rewad.Reward;
import com.example.reactbackend.Rewad.RewardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

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
        return rewardRepository.findAll();
    }

    public Reward editReward(Long id, Reward newRewardData) {
        Optional<Reward> reward = rewardRepository.findById(id);
        if (!reward.isPresent()) {
            return null;
        }
        Reward changeReward = reward.get();
        changeReward.setCount(newRewardData.getCount());
        changeReward.setDescription(newRewardData.getDescription());
        return rewardRepository.save(changeReward);
    }
    @Transactional
    public boolean deleteReward(Long id) {
        if (!rewardRepository.existsById(id)) {
            return false;
        }
        rewardRepository.deleteById(id);
        return true;
    }

}
