package com.project.side.range.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "/range")
public class RangeController {

    @GetMapping(value = "/main")
    public String rangePage(){
        return "/range/main";
    }
}
