package com.project.side.moyora.service;

import com.project.side.moyora.service.repo.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;


public class RoomService {
    private final RoomRepository roomRepository;
    @Autowired
    public RoomService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }


}
