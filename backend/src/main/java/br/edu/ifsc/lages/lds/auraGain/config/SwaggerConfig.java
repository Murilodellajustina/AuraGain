package br.edu.ifsc.lages.lds.auraGain.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI auraGainOpenAPI(){
        return new OpenAPI()
            .info(new Info()
                .title("AuraGain API")
                .description("Official API documentation for the AuraGain system (Workout Management).")
                .version("v1.0.0"));
    }
}
