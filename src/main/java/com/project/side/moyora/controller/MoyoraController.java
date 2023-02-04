package com.project.side.moyora.controller;

import com.project.side.moyora.service.RoomService;
import com.project.side.moyora.vo.RoomVo;
import com.project.side.range.mapper.rangeMapper;
import java.util.HashMap;
import java.util.List;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.web.ServerProperties.Reactive.Session;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping(value = "/moyora")
public class MoyoraController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    RoomService roomService;
    @Autowired
    public MoyoraController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping(value = "/moyo")
    public String moyoraPage(Model model, @RequestParam(name = "roomNo", required = false) String roomNo){
        boolean hasRoomNo = roomNo != null;
        model.addAttribute("hasRoomNo", hasRoomNo);
        return "/moyora/moyo";
    }



    @ResponseBody
    @PostMapping(value = "/room/create")
    public HashMap<String, Object> createRoom(HttpSession mySession){
        HashMap<String, Object> result = new HashMap<>();
        result.put("roomNo", roomService.createRoom(mySession));
        return result;
    }

    @ResponseBody
    @PostMapping(value = "/room/setDestination")
    public HashMap<String, Object> setDestination(HttpSession mySession,
            @RequestBody HashMap<String, Object> param){
        HashMap<String, Object> result = new HashMap<>();
        List<Double> coordinate = (List<Double>) param.get("coordinate");
        RoomVo myRoom = roomService.setDestinationOnRoom(mySession, coordinate);
        result.put("room", myRoom);
        return result;
    }
}