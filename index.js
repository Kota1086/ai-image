import java.util.Random;

public class SignalProcessor {

    public String generateSignal(String pair) {
        String[] directions = {"STRONG BUY 🟢", "BUY 🟢", "SELL 🔴", "STRONG SELL 🔴"};
        Random random = new Random();
        return directions[random.nextInt(directions.length)];
    }

    public static void main(String[] args) {
        SignalProcessor processor = new SignalProcessor();
        System.out.println(processor.generateSignal("BTC"));
    }
}