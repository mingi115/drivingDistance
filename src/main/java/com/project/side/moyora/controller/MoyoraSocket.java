package com.project.side.moyora.controller;

import java.util.ArrayList;
import java.util.HashMap;
import javax.servlet.http.HttpSession;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Controller;

@Controller
@ServerEndpoint("/moyora/socket")
public class MoyoraSocket {
    private static final HashMap<Long, Session> sessionMap = new HashMap<>();


    @OnOpen
    public void connectRoom(Session wSession, HttpSession hSession){
        System.out.printf(String.valueOf(wSession));
        System.out.printf(String.valueOf(wSession));
    }
    @OnMessage
    public HashMap<String, Object> roomMessage(HttpSession hSession){
        HashMap<String, Object> result = new HashMap<>();

        return result;
    }
    @OnClose
    public void closeRoom(HttpSession session){

    }

    @OnError
    public void errorOnRoom(){

    }
}
