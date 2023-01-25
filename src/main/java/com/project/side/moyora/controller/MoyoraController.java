package com.project.side.moyora.controller;

import com.project.side.moyora.service.RoomService;
import com.project.side.range.mapper.rangeMapper;
import java.util.HashMap;
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

    RoomService roomService;
    @Autowired
    public MoyoraController(RoomService roomService) {
        this.roomService = roomService;
    }

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @GetMapping(value = "/moyo")
    public String moyoraPage(Model model, @RequestParam(name = "roomNo", required = false) String roomNo){
        boolean hasRoomNo = roomNo != null;
        model.addAttribute("hasRoomNo", hasRoomNo);
        return "/moyora/moyo";
    }



    @ResponseBody
    @PostMapping(value = "/room/create")
    public HashMap<String, String> createRoom(HttpSession mySession){
        HashMap<String, String> result = new HashMap<>();
        System.out.println(mySession.getId());
        //roomService.createRoom();
        return result;
    }
}
