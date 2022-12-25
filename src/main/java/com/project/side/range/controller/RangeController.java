package com.project.side.range.controller;

import com.project.side.range.mapper.rangeMapper;
import java.util.HashMap;
import javax.annotation.Resource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/range")
public class RangeController {

    @Resource(name="rangeMapper")
    private rangeMapper rangeDao;
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @GetMapping(value = "/main")
    public String rangePage(){
        return "/range/main";
    }

    @PostMapping(value = "/reqDrivingDistance")
    @ResponseBody
    public HashMap<String, Object> reqDrivingDistance(@RequestBody HashMap<String, Object> paramMap){
        logger.debug(paramMap.toString());
        HashMap<String, Object> result = rangeDao.selectDrivingDistance(paramMap);
        return result;
    }
}
