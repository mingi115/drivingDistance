package com.project.side.moyora.controller;

import java.util.HashMap;
import javax.servlet.http.HttpSession;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.server.ServerEndpoint;

@ServerEndpoint("/moyora/socket")
public class MoyoraSocket {
    @OnOpen
    public void connectRoom(HttpSession session){

    }
    @OnMessage
    public HashMap<String, Object> roomMessage(HttpSession session){
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
