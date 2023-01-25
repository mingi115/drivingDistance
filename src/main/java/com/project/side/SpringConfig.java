package com.project.side;

import com.project.side.moyora.service.RoomRepositoryService;
import com.project.side.moyora.service.RoomService;
import com.project.side.moyora.service.repo.RoomRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringConfig {
    @Bean
    public RoomService roomService() {
        return new RoomService((RoomRepository) roomRepositoryService());
    }

    @Bean
    public RoomRepositoryService roomRepositoryService() {
        return new RoomRepository();
    }
}
