package com.example.reactbackend.CardGame;

public class Card {
    private String path;
    private int value;
    public Card(String path, int value) {
        this.path = path;
        this.value = value;
    }
    public String getPath() {
        return path;
    }
    public int getValue() {
        return value;
    }
}
