package ch.donkeycode.tools.stutz;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/greeting")
public class GreetingController {

    @GetMapping
    public String me() {
        return "Hi you!";
    }
}
