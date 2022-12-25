package com.project.side.range.mapper;

import java.util.HashMap;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface rangeMapper {
    HashMap<String,Object> selectDrivingDistance(HashMap<String,Object> map);
}
