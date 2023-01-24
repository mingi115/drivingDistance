package com.project.side.moyora.vo;

public class Coordinate {

    private double x;
    private double y;

    Coordinate (double x, double y){this.x = x; this.y = y;}

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
