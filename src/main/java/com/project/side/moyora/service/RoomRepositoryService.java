package com.project.side.moyora.service;

import com.project.side.moyora.vo.GuestVo;
import com.project.side.moyora.vo.RoomVo;

public interface RoomRepositoryService {
    RoomVo createRoom(GuestVo guest);
    void deleteRoom(int roomNo);
    RoomVo findRoom(int roomNo);
}
