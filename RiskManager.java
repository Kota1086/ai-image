// RiskManager.java
public class RiskManager {
    private static final double MAX_RISK = 0.02;
    
    public static void main(String[] args) {
        if(args.length < 1) return;
        
        String signal = args[0];
        double volatility = Math.random() * 10; // Mock volatility
        double balance = 1000.0; // Mock balance
        
        if (volatility > 5.0) {
            System.out.print("HIGH VOLATILITY");
        } else if (balance < 100) {
            System.out.print("INSUFFICIENT FUNDS");
        } else if (!signal.equals("HOLD")) {
            System.out.print("APPROVED");
        } else {
            System.out.print("NO ACTION NEEDED");
        }
    }
}