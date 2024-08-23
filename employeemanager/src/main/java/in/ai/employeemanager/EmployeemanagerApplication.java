package in.ai.employeemanager;

import java.util.Arrays;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
public class EmployeemanagerApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeemanagerApplication.class, args);
	}

	@Bean
	public CorsFilter corsFilter() {
	    CorsConfiguration corsConfiguration = new CorsConfiguration();
	    
	    // Allow credentials (e.g., cookies, authorization headers) to be included in the requests
	    corsConfiguration.setAllowCredentials(true);
	    
	    // Set the origins that are allowed to make requests to your server
	    corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:4200"));
	    
	    // Specify the headers that are allowed in requests
	    corsConfiguration.setAllowedHeaders(Arrays.asList(
	        "Origin", 
	        "Content-Type", 
	        "Accept", 
	        "Authorization",
	        "X-Requested-With", 
	        "Access-Control-Request-Method", 
	        "Access-Control-Request-Headers"
	    ));
	    
	    // Specify which headers can be exposed to the client (i.e., included in the response)
	    corsConfiguration.setExposedHeaders(Arrays.asList(
	        "Origin", 
	        "Content-Type", 
	        "Accept", 
	        "Authorization",
	        "Access-Control-Allow-Origin", 
	        "Access-Control-Allow-Credentials"
	    ));
	    
	    // Define the HTTP methods that are allowed in requests
	    corsConfiguration.setAllowedMethods(Arrays.asList(
	        "GET", 
	        "POST", 
	        "PUT", 
	        "DELETE", 
	        "OPTIONS"
	    ));
	    
	    // Apply the CORS configuration to all endpoints
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    source.registerCorsConfiguration("/**", corsConfiguration);
	    
	    // Return a new CorsFilter with the defined configuration
	    return new CorsFilter(source);
	}

}
