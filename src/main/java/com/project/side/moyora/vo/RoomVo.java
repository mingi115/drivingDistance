package com.project.side.moyora.vo;

import java.util.ArrayList;
import java.util.List;

public class RoomVo {
    private final int roomNo;
    private Coordinate destination;
    private List<GuestVo> guestVoList;

    public RoomVo(int roomNo, Coordinate destination, GuestVo guestVo) {
        this.roomNo = roomNo;
        this.destination = destination;
        this.guestVoList.add(guestVo);
    }

    public int getRoomNo() {
        return roomNo;
    }

    public Coordinate getDestination() {
        return destination;
    }

    public void setDestination(Coordinate destination) {
        this.destination = destination;
    }
}
