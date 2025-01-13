package com.example.reactbackend.SlotMachine;

import java.util.List;
public class SpinResult {
    private List<String> columns;
    private List<Integer> spinDurations;
    private int money;

    public SpinResult(List<String> columns, List<Integer> spinDurations) {
        this.columns = columns;
        this.spinDurations = spinDurations;
    }

    public void printResult() {
        for (int i = 0; i < columns.size(); i++) {
            System.out.println("skuska" + columns.get(i));
        }
    }
    public int result() {
        if(columns.get(0).equals(columns.get(1)) && columns.get(1).equals(columns.get(2)))
            return 3;
        if(columns.get(0).equals(columns.get(1)))
            return 0;
        if(columns.get(0).equals(columns.get(2)))
            return 0;
        if(columns.get(1).equals(columns.get(2)))
            return 0;
        return -1;
    }
    public List<String> getColumns() {
        return columns;
    }
    public List<Integer> getSpinDurations() {
        return spinDurations;
    }
    public void setMoney(int money) {
        this.money = money;
    }
    public int getMoney() {
        return this.money;
    }
}
