package com.example.reactbackend.controllers;

import com.example.reactbackend.CardGame.Card;
import com.example.reactbackend.CardGame.CardService;
import com.example.reactbackend.SlotMachine.SlotMachineService;
import com.example.reactbackend.SlotMachine.SpinRequest;
import com.example.reactbackend.SlotMachine.SpinResult;
import com.example.reactbackend.Users.BodyRequest;
import com.example.reactbackend.Users.User;
import com.example.reactbackend.Users.UserService;
import com.example.reactbackend.WheelOfFortune.WOFService;
import com.example.reactbackend.games.Bet;
import com.example.reactbackend.games.GameResult;
import com.example.reactbackend.games.GameService;
import com.example.reactbackend.others.Tokens;
import org.springframework.boot.autoconfigure.web.ServerProperties;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.core.io.Resource;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api")
public class GameController {
    private final SlotMachineService slotMachineService;
    private final WOFService wofService;
    private final CardService cardService;
    private final UserService userService;
    private final GameService gameService;
    private String token;
    private String email;
    private int amount;
    private int randomNumber;

    public GameController(SlotMachineService slotMachineService, WOFService wofService, CardService cardService, UserService userService, GameService gameService) {
        this.slotMachineService = slotMachineService;
        this.wofService = wofService;
        this.cardService = cardService;
        this.userService = userService;
        this.gameService = gameService;
    }

    @PostMapping("/spin")
    public ResponseEntity<?> spin(@RequestBody SpinRequest request) {
        SpinResult result = slotMachineService.generateSpinResult(request.getColumns());
        result.printResult();
        int number = result.result();
        GameResult gameResult = new GameResult();
        gameResult.setGame(gameService.getGame("SlotMachine"));
        if(number == -1)
            gameResult.setOutcome("Prehra");
        else if(number == 0 )
            gameResult.setOutcome("Remiza");
        else gameResult.setOutcome("Vyhra");

        gameService.saveGameResult(gameResult);
        User user = userService.getUser(email);
        user.setMoney(number * amount);
        userService.saveUser(user);
        result.setMoney(number * amount);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/symbols")
    public List<String> getSymbols() {
        return slotMachineService.getSymbols();
    }

    @GetMapping("/wheel/spin")
    public int[] spinWheel() {
        int[] numbers = new int[2];
        numbers[0] = wofService.spinWheel();
        numbers[1] = wofService.getResult();
        GameResult gameResult = new GameResult();
        gameResult.setGame(gameService.getGame("WheelOfFortune"));

        if(numbers[1] == -1)
            gameResult.setOutcome("Prehra");
        else if( numbers[1] == 0 )
            gameResult.setOutcome("Remiza");
        else gameResult.setOutcome("Vyhra");

        System.out.println("Vysledok: " + gameResult.getOutcome());

        gameService.saveGameResult(gameResult);
        User user = userService.getUser(email);
        System.out.println("penaze " + user.getMoney());
        System.out.println("penazepreUser " + numbers[1] * amount);
        user.setMoney(numbers[1] * amount);
        userService.saveUser(user);
        System.out.println("penaze " + user.getMoney());
        numbers[1] = user.getMoney();
        return numbers;
    }

    @PostMapping("/cards/getCard")
    public ResponseEntity<?>  getRandomCard(@RequestBody BodyRequest request, @RequestHeader("code") int code) {
        Card card = cardService.getRandomCard();
        int value = cardService.getScore(card);
        Map<String, Object> response = new HashMap<>();
        response.put("money", 0);
        if(randomNumber <= value) {
            Bet bet = new Bet();
            bet.setAmount(randomNumber);
            bet.setUser(userService.getUser(request.getEmail()));
            switch (code) {
                case 1 -> bet.setGame(gameService.getGame("SlotMachine"));
                case 2 -> bet.setGame(gameService.getGame("WheelOfFortune"));
                case 3 -> bet.setGame(gameService.getGame("Blackjack"));
            }
            bet.setTime(LocalDateTime.now());
            gameService.saveBet(bet);

            GameResult gameResult = new GameResult();
            User user = userService.getUser(request.getEmail());
            gameResult.setGame(gameService.getGame("Blackjack"));

            if(randomNumber == value) {
                gameResult.setOutcome("Vyhra");
                user.setMoney(randomNumber);
            } else {
                gameResult.setOutcome("Prehra");
                user.setMoney(-randomNumber);
            }

            gameService.saveGameResult(gameResult);
            userService.saveUser(user);

            response.put("money", user.getMoney());
        }
        response.put("card", card);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/cards/getNumber")
    public int getRandomNumber(@RequestBody BodyRequest request) {
        Random random = new Random();
        User user = userService.getUser(request.getEmail());
        randomNumber = random.nextInt(user.getMoney());
        cardService.resetScore();
        return randomNumber;

    }

    @PostMapping("/cards/stop")
    public int stop(@RequestBody BodyRequest request, @RequestHeader("code") int code) {
        Bet bet = new Bet();
        User user = userService.getUser(request.getEmail());
        bet.setAmount(randomNumber);
        bet.setUser(user);


        switch (code) {
            case 1 -> bet.setGame(gameService.getGame("SlotMachine"));
            case 2 -> bet.setGame(gameService.getGame("WheelOfFortune"));
            case 3 -> bet.setGame(gameService.getGame("Blackjack"));
        }

        bet.setTime(LocalDateTime.now());
        gameService.saveBet(bet);

        GameResult gameResult = new GameResult();

        gameResult.setGame(gameService.getGame("Blackjack"));

        int value = cardService.getScore();
        System.out.println("value " + value);
        int money = 0;
        if(randomNumber == value - 1) {
            gameResult.setOutcome("vyhra");
            user.setMoney(randomNumber/2);
            money = user.getMoney();
        } else if(randomNumber == value - 2) {
            gameResult.setOutcome("vyhra");
            user.setMoney(randomNumber/3);
            money = user.getMoney();
        } else {
            gameResult.setOutcome("prehra");
            user.setMoney(-randomNumber);
            money = user.getMoney();
        }
        userService.saveUser(user);
        gameService.saveGameResult(gameResult);

        return money;
    }

    @PostMapping("/money")
    public ResponseEntity<?> UserMoney(@RequestBody BodyRequest request, @RequestHeader("Authorization") String authHeader, @RequestHeader("code") int code) {

        if(validation(authHeader) != null)
            return validation(authHeader);

        try {
            boolean money = userService.userMoney(request.getEmail(), request.getMoney());
            this.email = request.getEmail();

            if(money) {
                Bet bet = new Bet();
                bet.setAmount(request.getMoney());
                bet.setUser(userService.getUser(request.getEmail()));
                switch (code) {
                    case 1 -> bet.setGame(gameService.getGame("SlotMachine"));
                    case 2 -> bet.setGame(gameService.getGame("WheelOfFortune"));
                    case 3 -> bet.setGame(gameService.getGame("Blackjack"));
                }
                bet.setTime(LocalDateTime.now());
                gameService.saveBet(bet);
                amount = bet.getAmount();
            }

            return ResponseEntity.ok(Map.of(
                "money",money
            ));

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("message", e.getMessage()));
        }
    }

    private ResponseEntity<?> validation(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Chýba JWT token");
        }

        token = authHeader.replace("Bearer ", "");
        if (!Tokens.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Neplatný alebo expirovaný token");
        }
        return null;
    }

}
