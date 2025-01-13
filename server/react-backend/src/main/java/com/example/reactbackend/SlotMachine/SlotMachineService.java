package com.example.reactbackend.SlotMachine;

import com.example.reactbackend.games.Game;
import com.example.reactbackend.games.GameRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;


@Service
public class SlotMachineService {
    private final List<String> symbols = List.of("🍒", "⭐", "🔔", "🍋", "7️⃣", "🍉");
    List<List<String>> columnResults = new ArrayList<>();
    private GameRepository gameRepository;

    public SpinResult generateSpinResult(int columns) {
        Random random = new Random();
        List<String> columnResults = new ArrayList<>();
        List<Integer> spinDurations = new ArrayList<>();

        for (int i = 0; i < columns; i++) {
            columnResults.add(symbols.get(random.nextInt(symbols.size())));
            spinDurations.add(2000 + random.nextInt(3000));
        }
        return new SpinResult(columnResults, spinDurations);
    }

    public List<String> getSymbols() {
        return symbols;
    }

    public Game getGame() {
        return gameRepository.findByname("SlotMachine");
    }
}
