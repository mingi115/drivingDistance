package com.project.side.moyora.socket;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.side.moyora.socket.SocketConfig.ServerEndpointConfigurator;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;
import javax.servlet.http.HttpSession;
import javax.websocket.EndpointConfig;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.PathParam;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

@Component
@ServerEndpoint(value = "/moyora/socket/{roomNo}", configurator = SocketSessionConfig.class)
public class MoyoraSocket {
    private static final Set<Session> clients =
        Collections.synchronizedSet(new HashSet<>());

    public MoyoraSocket() {}

    @OnOpen
    public void connectRoom(Session wSession, EndpointConfig ec, @PathParam(value = "roomNo")Long roomNo){
        HttpSession hSession = (HttpSession) ec.getUserProperties().get("hSession");
        System.out.println("hSession : " + hSession.getAttribute("roomNo"));
        System.out.println("open session : " + wSession.toString());
        if(!clients.contains(wSession)) {
            clients.add(wSession);
            System.out.println("session open : " + wSession);
        }else {
            System.out.println("이미 연결된 session 임!!!");
        }
    }
    @OnMessage
    public String roomMessage(String message, Session session) throws JsonProcessingException {
        HashMap<String, Object> result = new HashMap<>();
        System.out.printf(message);
        result.put("message", message);
        ObjectMapper om = new ObjectMapper();
        return om.writeValueAsString(result);
    }
    @OnClose
    public void closeRoom(Session session){

    }

    @OnError
    public void errorOnRoom(Session session, Throwable throwable){

    }
}
