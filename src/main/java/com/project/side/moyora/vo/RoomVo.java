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

    public GuestVo setNewGuest(){
        long newGuestNo = getNewGuestNo();
        GuestVo itsMe = new GuestVo(newGuestNo);
        guestVoList.add(itsMe);
        return itsMe;
    }

    public long getNewGuestNo(){
        Long newGuestNo = null;
        if(guestVoList.size() > 0){
            for(GuestVo guest : guestVoList ){
                long gNo = guest.getGuestNo();
                if(newGuestNo == null || newGuestNo < gNo ){
                    newGuestNo = gNo;
                }
            }
        }
        return newGuestNo == null ? 0 : newGuestNo;
    }
}
