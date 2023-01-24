package com.project.side.moyora.vo;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class GuestVo {

    private int guestNo;
    private List<Coordinate> movingLog;

    GuestVo(int guestNo){
        this.guestNo = guestNo;
        this.movingLog = new ArrayList<>();
    }
    void setGuestNo(int guestNo){ this.guestNo = guestNo; }
    int getGuestNo(){ return this.guestNo; }

    void appendCoordAtMovingLog(Coordinate coord){
        this.movingLog.add(coord);
    }

    void appendCoordAtMovingLog(double x, double y){
        this.movingLog.add(new Coordinate(x, y));
    }

    Optional<Coordinate> getStartPoint(){
        return Optional.ofNullable(movingLog.get(0));
    }

    Optional<Coordinate> getLastPoint(){
        return Optional.ofNullable(movingLog.get(movingLog.size()-1));
    }
}
