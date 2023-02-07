package com.project.side.moyora.socket;

import javax.servlet.http.HttpSession;
import javax.websocket.HandshakeResponse;
import javax.websocket.server.HandshakeRequest;
import javax.websocket.server.ServerEndpointConfig;
import javax.websocket.server.ServerEndpointConfig.Configurator;

public class SocketSessionConfig extends Configurator {

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request,
        HandshakeResponse response) {
        HttpSession session = (HttpSession) request.getHttpSession();

        if(session != null){
            sec.getUserProperties().put("hSession", session);
        }
        super.modifyHandshake(sec, request, response);
    }
}
