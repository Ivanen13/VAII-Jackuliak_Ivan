package com.example.reactbackend.others;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;


public class Tokens {
    private static final String SECRET_KEY = "tajne-heslo";

    public static String generateToken(String username) {
        String header = Base64.getUrlEncoder().withoutPadding()
            .encodeToString("{\"alg\":\"HS256\",\"typ\":\"JWT\"}".getBytes());

        String payload = Base64.getUrlEncoder().withoutPadding()
            .encodeToString(("{\"sub\":\"" + username + "\",\"exp\":" + (System.currentTimeMillis() / 1000 + 3600) + "}").getBytes());

        String signature = sign(header + "." + payload);

        return header + "." + payload + "." + signature;
    }

    private static String sign(String data) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(new SecretKeySpec(SECRET_KEY.getBytes(), "HmacSHA256"));
            return Base64.getUrlEncoder().withoutPadding().encodeToString(mac.doFinal(data.getBytes()));
        } catch (Exception e) {
            throw new RuntimeException("Chyba pri podpisovaní tokenu.");
        }
    }
    public static boolean validateToken(String token) {
        String[] parts = token.split("\\.");
        if (parts.length != 3) {
            return false;
        }

        String header = parts[0];
        String payload = parts[1];
        String signature = parts[2];

        if (!sign(header + "." + payload).equals(signature)) {
            return false;
        }

        String payloadJson = new String(Base64.getUrlDecoder().decode(payload));
        long exp = Long.parseLong(payloadJson.split("\"exp\":")[1].split("}")[0]);
        if (System.currentTimeMillis() / 1000 > exp) {
            return false;
        }

        return true;
    }
}
