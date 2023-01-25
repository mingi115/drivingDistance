package com.project.side.moyora.service;

import com.project.side.moyora.vo.RoomVo;

public interface RoomRepositoryService {
    RoomVo createRoom();
    void deleteRoom(int roomNo);
    RoomVo findRoom(int roomNo);
}
