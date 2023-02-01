package com.project.side.moyora.service;

import com.project.side.moyora.service.repo.RoomRepository;
import com.project.side.moyora.vo.Coordinate;
import com.project.side.moyora.vo.GuestVo;
import com.project.side.moyora.vo.RoomVo;
import java.util.Arrays;
import java.util.List;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;


public class RoomService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    private final RoomRepository roomRepository;
    @Autowired
    public RoomService(RoomRepository roomRepository){
        this.roomRepository = roomRepository;
    }

    public Long createRoom(HttpSession mySession){
        GuestVo newGuest = new GuestVo(0);
        RoomVo newRoom = roomRepository.createRoom(newGuest);
        mySession.setAttribute("guestNo", newGuest.getGuestNo());
        mySession.setAttribute("roomNo", newRoom.getRoomNo());
        return newRoom.getRoomNo();
    }

    public RoomVo setDestinationOnRoom(HttpSession mySession, List<Double> coordinate) {
        Coordinate desti = new Coordinate(coordinate.get(0), coordinate.get(1));
        long roomNo = (long) mySession.getAttribute("roomNo");
        RoomVo myRoom = roomRepository.findRoom(roomNo);
        myRoom.setDestination(desti);
        return myRoom;
    }
}
