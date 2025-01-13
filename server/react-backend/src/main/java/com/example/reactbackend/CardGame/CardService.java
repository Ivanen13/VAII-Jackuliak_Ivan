package com.example.reactbackend.CardGame;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Random;

@Service
public class CardService {
    private ArrayList<Card> cards = new ArrayList<>();
    private int score = 0;

    @PostConstruct
    public void init() {
        int number = 36;
        int value = 2;

        for (int i = 1; i <= number; i++) {
            cards.add(new Card("cards/" + i, value));
            value++;
            if (value > 10) {
                value = 2;
            }
        }
    }
    public Card getRandomCard() {
        if (cards.isEmpty())
            return null;

        Random random = new Random();
        return cards.get(random.nextInt(cards.size()));
    }
    public int getScore(Card card) {
        score += card.getValue();
        return score;
    }

    public int getScore() {
        return score;
    }
    public void resetScore() {
        this.score = 0;
    }
}
