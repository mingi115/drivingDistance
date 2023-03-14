package com.project.side.moyora.service;

import com.project.side.moyora.vo.GuestVo;
import com.project.side.moyora.vo.RoomVo;

public interface RoomRepositoryService {
    RoomVo createRoom(GuestVo guest, String pw);
    void deleteRoom(Long roomNo);
    RoomVo findRoom(Long roomNo);
    boolean isRoomAvailable(Long paramRoomNo);
    GuestVo getGuestInfo(Long roonNo, Long guestId);
}
