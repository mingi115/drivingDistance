package com.project.side.moyora.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;

public class RoomVo {
    @JsonProperty
    private final long roomNo;
    @JsonProperty
    private Coordinate destination;
    @JsonProperty
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
