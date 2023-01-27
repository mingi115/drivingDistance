package com.project.side.moyora.vo;

import java.util.ArrayList;
import java.util.List;

public class RoomVo {
    private final long roomNo;
    private Coordinate destination;
    private List<GuestVo> guestVoList = new ArrayList<>();

    public RoomVo(long roomNo, GuestVo guestVo) {
        this.roomNo = roomNo;
        this.guestVoList.add(guestVo);
    }

    public long getRoomNo() {
        return roomNo;
    }

    public Coordinate getDestination() {
        return destination;
    }

    public void setDestination(Coordinate destination) {
        this.destination = destination;
    }
}
