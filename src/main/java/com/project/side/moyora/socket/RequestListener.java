package com.project.side.moyora.socket;

import javax.servlet.ServletRequestEvent;
import javax.servlet.ServletRequestListener;
import javax.servlet.annotation.WebListener;
import javax.servlet.http.HttpServletRequest;

@WebListener
public class RequestListener implements ServletRequestListener {

    @Override
    public void requestDestroyed(ServletRequestEvent sre) {
        //ServletRequestListener.super.requestDestroyed(sre);
    }

    @Override
    public void requestInitialized(ServletRequestEvent sre) {
        ((HttpServletRequest) sre.getServletRequest()).getSession();
    }
}
