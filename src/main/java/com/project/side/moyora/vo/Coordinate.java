package com.project.side.moyora.vo;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.io.Serializable;

public class Coordinate implements Serializable {

    @JsonProperty
    private double x;
    @JsonProperty
    private double y;

    public Coordinate(double x, double y){this.x = x; this.y = y;}

    double getX() {return this.x;}
    double getY() {return this.y;}

    void setX(double x) { this.x = x;}
    void setY(double y) { this.y = y;}
    void setXY(double x, double y) { this.x = x; this.y = y;}

    String toStringWithSpace(){
        return x + " " + y;
    }

    String toStringWithComma(){
        return x + ", " + y;
    }

    String getCoordFormatWkt(){
        return "POINT(" + toStringWithSpace() + ")";
    }
}
