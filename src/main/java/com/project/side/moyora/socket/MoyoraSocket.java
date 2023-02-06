package com.project.side.moyora.socket;

import com.project.side.moyora.socket.SocketConfig.ServerEndpointConfigurator;
import java.util.HashMap;
import javax.servlet.http.HttpSession;
import javax.websocket.OnClose;
import javax.websocket.OnError;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import org.springframework.stereotype.Component;

@Component
@ServerEndpoint(value = "/moyora/socket", configurator = ServerEndpointConfigurator.class)
public class MoyoraSocket {
    private static final HashMap<Long, Session> sessionMap = new HashMap<>();

    public MoyoraSocket() {}

    @OnOpen
    public void connectRoom(Session wSession){
        System.out.printf(wSession.toString());
    }
    @OnMessage
    public HashMap<String, Object> roomMessage(String message, Session session){
        HashMap<String, Object> result = new HashMap<>();

        return result;
    }
    @OnClose
    public void closeRoom(Session session){

    }

    @OnError
    public void errorOnRoom(Session session, Throwable throwable){

    }
}
