package com.example.reactbackend.Users;

public class BodyRequest {
    private String username;
    private String email;
    private String password;
    private int money;
    private int count;
    private String description;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public int getMoney() {
        return money;
    }
    public int getCount() {
        return count;
    }
    public String getDescription() {
        return description;
    }
}
