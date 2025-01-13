package com.example.reactbackend.WheelOfFortune;

public enum WheelOfFortune {
    SEVEN(3),
    BELL(-1),
    LEMON(3),
    WATERMELON(0),
    HALFMELON(-1),
    QUARTERMELON(3),
    STAR(0),
    CHERRY(-1);

    private int number;
    WheelOfFortune(int number) {
        this.number = number;
    }

    public int getNumber() {
        return number;
    }
}


