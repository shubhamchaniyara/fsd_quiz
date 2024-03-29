package com.example.ram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class RamApplication {

	public static void main(String[] args) {
		SpringApplication.run(RamApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer configurer(){
		return new WebMvcConfigurer() {

			@Override
			public void addCorsMappings(CorsRegistry registry){
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
						.allowedHeaders("*")
						.allowCredentials(true);
			}
		};
	}

}
