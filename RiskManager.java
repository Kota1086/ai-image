// RiskManager.java
public class RiskManager {
    private static final double MAX_RISK = 0.02;
    
    public String validateTrade(double volatility, double balance) {
        if (volatility > 5.0) return "HIGH VOLATILITY";
        if (balance < 100) return "INSUFFICIENT FUNDS";
        return "APPROVED";
    }
    
    public double positionSize(double entry, double stopLoss, double balance) {
        double riskAmount = balance * MAX_RISK;
        return riskAmount / Math.abs(entry - stopLoss);
    }
}