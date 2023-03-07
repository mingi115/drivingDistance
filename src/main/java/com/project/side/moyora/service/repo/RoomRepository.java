package com.project.side.moyora.service.repo;

import com.project.side.moyora.service.RoomRepositoryService;
import com.project.side.moyora.vo.GuestVo;
import com.project.side.moyora.vo.RoomVo;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class RoomRepository implements RoomRepositoryService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    HashMap<Long, RoomVo> roomStore = new HashMap<>();
    @Override
    public RoomVo createRoom(GuestVo guest, long roomNo, String pw) {
        RoomVo newRoom = new RoomVo(roomNo, guest, pw);
        logger.debug("new room number is :: " + roomNo);
        roomStore.put(roomNo, newRoom);
        return newRoom;
    }

    @Override
    public void deleteRoom(Long roomNo) {
        roomStore.remove(roomNo);
    }

    @Override
    public RoomVo findRoom(Long roomNo) {
        return  roomStore.get(roomNo);
    }

    @Override
    public boolean isRoomAvailable(Long paramRoomNo) {
        return roomStore.get(paramRoomNo) == null;
    }
}
