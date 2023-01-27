package com.project.side.moyora.vo;

import java.text.DateFormat;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.springframework.cglib.core.Local;

public class GuestVo {

    private int guestNo;

    private final LocalDateTime startTime;
    private LocalDateTime endTime;
    private List<Coordinate> movingLog;

    public GuestVo(int guestNo){
        this.guestNo = guestNo;
        this.startTime = LocalDateTime.now();
//        this.movingLog = new ArrayList<>();
    }
    void setGuestNo(int guestNo){ this.guestNo = guestNo; }
    public int getGuestNo(){ return this.guestNo; }

    String getStartTime(){
        return startTime.format(DateTimeFormatter.ofPattern("a HH시 mm분"));
    }

    void setEndTime(){
        this.endTime = LocalDateTime.now();
    }

    String getMovingTime(){
        String movingTime = null;
        if(endTime != null){
            Duration duration = Duration.between(startTime, endTime);
            long hours = duration.toHours();
            long minutes = duration.minusHours(hours).toMinutes();
            long seconds = duration.minusMinutes(minutes).getSeconds();
            movingTime = String.format("%d시간 %d분 %d초", hours, minutes, seconds);
        }

        return movingTime;
    }
    String getEndTime(){
        return endTime.format(DateTimeFormatter.ofPattern("a HH시 mm분"));
    }
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

    @Override
    public String toString() {
        return "GuestVo{" +
            "guestNo=" + guestNo +
            ", startTime=" + startTime +
            ", endTime=" + endTime +
            ", movingLog=" + movingLog +
            '}';
    }
}
