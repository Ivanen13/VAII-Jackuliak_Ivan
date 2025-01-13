package com.example.reactbackend.games;
import jakarta.persistence.*;

@Entity
@Table(name = "gameResult")
public class GameResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long resultId;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;
    @Column
    private String outcome;

    public void setGame(Game game) {
        this.game = game;
    }

    public void setOutcome(String outcome) {
        this.outcome = outcome;
    }

    public String getOutcome() {
        return this.outcome;
    }

}
