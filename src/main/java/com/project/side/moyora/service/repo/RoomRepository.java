package com.project.side.moyora.service.repo;

import com.project.side.moyora.service.RoomRepositoryService;
import com.project.side.moyora.vo.GuestVo;
import com.project.side.moyora.vo.RoomVo;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Optional;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;

@Repository
public class RoomRepository implements RoomRepositoryService {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    HashMap<Long, RoomVo> roomStore = new HashMap<>();
    @Override
    public RoomVo createRoom(GuestVo guest, String pw) {
        Long roomNo = getEmptyRoomNo();
        RoomVo newRoom = new RoomVo(roomNo, guest, pw);
        logger.debug("new room number is :: " + roomNo);
        roomStore.put(roomNo, newRoom);
        return newRoom;
    }

    public Long getEmptyRoomNo(){
//        if (roomStore.size() == 0) return 0L;
        Set<Long> ks = roomStore.keySet();
        Long maxVal = ks.stream().max(Comparator.comparing(x -> x)).orElse(0L);;
        if(maxVal + 1 == ks.size()){
            return maxVal + 1;
        }else{
            Long prev = null;
            for(Long curr : ks){
                if(prev != null && curr - prev >1){
                    return prev +1;
                }
                prev = curr;
            }
        }

        return maxVal + 1;
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

    @Override
    public GuestVo getGuestInfo(Long roomNo, Long guestId) {
        RoomVo room = findRoom(roomNo);
        return room.getOneGuestInfo(guestId);
    }
}
