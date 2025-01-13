package com.example.reactbackend.WheelOfFortune;

import com.example.reactbackend.games.GameRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Random;
@Service
public class WOFService {
    private int number;
    WheelOfFortune[] wheel;
    private GameRepository gameRepository;
    public int spinWheel() {
        Random random = new Random();
        wheel = WheelOfFortune.values();
        number = random.nextInt(wheel.length);
        return number + 1;
    }

    public int getResult() {
        return wheel[number].getNumber();
    }

}
