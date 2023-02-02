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
    public RoomVo createRoom(GuestVo guest) {
        Set<Long> keys = roomStore.keySet();
        Long bigKey = keys.stream().max(Comparator.comparing(x -> x)).orElse(0L);
        logger.debug("new room number is :: " + bigKey);
        RoomVo newRoom = new RoomVo(bigKey, guest);
        roomStore.put(bigKey, newRoom);
        return newRoom;
    }

    @Override
    public void deleteRoom(long roomNo) {
        roomStore.remove(roomNo);
    }

    @Override
    public RoomVo findRoom(long roomNo) {
        return  roomStore.get(roomNo);
    }
}
