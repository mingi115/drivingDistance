package com.project.side.moyora.service.repo;

import com.project.side.moyora.service.RoomRepositoryService;
import com.project.side.moyora.vo.RoomVo;
import java.util.HashMap;
import org.springframework.stereotype.Repository;

@Repository
public class RoomRepository implements RoomRepositoryService {

    HashMap<Long, RoomVo> roomStore = new HashMap<>();
    @Override
    public RoomVo createRoom() {
        return null;
    }

    @Override
    public void deleteRoom(int roomNo) {

    }

    @Override
    public RoomVo findRoom(int roomNo) {
        return null;
    }
}
