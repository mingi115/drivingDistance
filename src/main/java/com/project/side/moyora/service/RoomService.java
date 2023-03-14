package com.project.side.moyora.service;

import com.project.side.moyora.service.repo.RoomRepository;
import com.project.side.moyora.vo.Coordinate;
import com.project.side.moyora.vo.GuestVo;
import com.project.side.moyora.vo.RoomVo;
import java.util.HashMap;
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

    public HashMap<String, Object> createRoom(HttpSession mySession, HashMap<String, String> param){
        HashMap<String, Object> result = new HashMap<>();
        String pw = param.get("pw");
        GuestVo newGuest = new GuestVo(0);
        RoomVo newRoom = roomRepository.createRoom(newGuest, pw);
        mySession.setAttribute("guestNo", newGuest.getGuestNo());
        mySession.setAttribute("roomNo", newRoom.getRoomNo());
        result.put("roomNo", newRoom.getRoomNo());
        result.put("code", true);
        return result;
    }

    public RoomVo setDestinationOnRoom(HttpSession mySession, List<Double> coordinate) {
        Coordinate desti = new Coordinate(coordinate.get(0), coordinate.get(1));
        Long roomNo = (long) mySession.getAttribute("roomNo");
        RoomVo myRoom = roomRepository.findRoom(roomNo);
        myRoom.setDestination(desti);
        return myRoom;
    }

    public HashMap<String, Object> getMyInfoInRoom(HttpSession mySession) {
        HashMap<String, Object> result = new HashMap<>();
        if(mySession.getAttribute("roomNo") != null){
            long roomNo = (long) mySession.getAttribute("roomNo");
            RoomVo myRoom = roomRepository.findRoom(roomNo);

            result.put("destination", myRoom.getDestination());
            result.put("roomNo", roomNo);
            result.put("guestList", myRoom.getGuestVoList());

            if(mySession.getAttribute("guestNo") == null){
                GuestVo itsMe = myRoom.setNewGuest();
                mySession.setAttribute("guestNo", itsMe.getGuestNo());
                result.put("guestNo", itsMe.getGuestNo());
            }else{
                long guestNo = (long) mySession.getAttribute("guestNo");
                result.put("guestNo", guestNo);
            }
        }
        return result;
    }

    public void addPointOnUser(HttpSession mySession, HashMap<String, Object> message){
        if(mySession.getAttribute("roomNo") != null) {
            long roomNo = (long) mySession.getAttribute("roomNo");
            long guestNo = (long) mySession.getAttribute("guestNo");
            RoomVo myRoom = roomRepository.findRoom(roomNo);
            double x = (double) message.get("longitude");
            double y = (double) message.get("latitude");
            myRoom.addPointOnGuest(guestNo, x, y);
        }
    }

    public HashMap<String, Object> participateRoom(HttpSession mySession, HashMap<String, String> param) {
        HashMap<String, Object> result = new HashMap<>();
        Long paramRoomNo =  Long.parseLong(param.get("roomNo"));
        String pw = param.get("pw");
        if(roomRepository.isRoomAvailable(paramRoomNo)){
            result.put("code", false);
            result.put("message", "존재하지 않는 방입니다.");
        }else{
            RoomVo room = roomRepository.findRoom(paramRoomNo);
            if(room.comaprePassword(pw)){
                GuestVo gv = room.setNewGuest();
                mySession.setAttribute("roomNo", room.getRoomNo());
                mySession.setAttribute("guestNo", gv.getGuestNo());
                result.put("code", true);
                result.put("message", room.getRoomNo() +"번 방에 참가하였습니다.");
            }else{
                result.put("code", false);
                result.put("message", "비밀번호가 틀렸습니다.");
            }
        }
        return result;
    }

    public HashMap<String, Object> getUserInfo(HashMap<String, String> param) {
        HashMap<String, Object> result = new HashMap<>();
        Long roomNo =  Long.parseLong(param.get("roomNo"));
        Long guestId =  Long.parseLong(param.get("guestId"));

        result.put("guestInfo", roomRepository.getGuestInfo(roomNo, guestId));
        return result;
    }
}
