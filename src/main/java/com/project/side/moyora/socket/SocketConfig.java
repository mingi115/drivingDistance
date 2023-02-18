package com.project.side.moyora.socket;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;

public class SocketConfig {
    @Configuration
    public static class ServerEndpointConfigurator extends javax.websocket.server.ServerEndpointConfig.Configurator implements
        ApplicationContextAware {
        private static volatile BeanFactory context;

        @Override
        public <T> T getEndpointInstance(Class<T> clazz)  {
            return context.getBean(clazz);
        }

        @Override
        public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
            ServerEndpointConfigurator.context = applicationContext;
        }
    }
}
