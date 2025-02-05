package com.example.reactbackend.games;

import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GameService {
    private final BetRepository betRepository;
    private final GameRepository gameRepository;

    private final GameResultRepository gameResultRepository;

    public GameService(BetRepository betRepository, GameRepository gameRepository, GameResultRepository gameResultRepository) {
        this.betRepository = betRepository;
        this.gameRepository = gameRepository;
        this.gameResultRepository = gameResultRepository;
    }

    public List<Bet> getAllBets() {
        return betRepository.findAll();
    }

    public Bet saveBet(Bet bet) {
        return betRepository.save(bet);
    }

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public Game saveGame(Game game) {
        return gameRepository.save(game);
    }

    public List<GameResult> getAllGamesGameResults() {
        return gameResultRepository.findAll();
    }

    public GameResult saveGameResult(GameResult gameResult) {
        return gameResultRepository.save(gameResult);
    }

    public Game getGame(String name) {
        return gameRepository.findByname(name);
    }

}
