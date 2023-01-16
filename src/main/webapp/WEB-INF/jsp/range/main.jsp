<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!doctype html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>DrivingDistance 테스트</title>
    <script src="https://cdn.jsdelivr.net/npm/ol@v7.2.2/dist/ol.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ol@v7.2.2/ol.css">
    <link rel="stylesheet" type="text/css" href="/css/common.css">
    <link rel="stylesheet" type="text/css" href="/css/range.css">
</head>
<body>

    <div id="map">
        <div id="list-wrapper">
            <button type="button" id="feature-list-btn">△</button>
            <label for="range-input">주행거리<input id="range-input" value="3" type="number" />KM</label>
            <div id="feature-list">
                <ol>
                    <li id="feature1" class="active">
                        <div>
                            <label>레이어 색상:<input type="color" value="#FF0000">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                    <li id="feature2" >
                        <div>
                            <label>레이어 색상:<input type="color" value="#FF7F00">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                    <li id="feature3">
                        <div>
                            <label>레이어 색상:<input type="color" value="#FFFF00">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                    <li id="feature4">
                        <div>
                            <label>레이어 색상:<input type="color" value="#00FF00">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                    <li id="feature5">
                        <div>
                            <label>레이어 색상:<input type="color" value="#0000FF">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                    <li id="feature6">
                        <div>
                            <label>레이어 색상:<input type="color" value="#4B0082">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                    <li id="feature7">
                        <div>
                            <label>레이어 색상:<input type="color" value="#9400D3">,</label>
                            <label>선택 x좌표 :<input class="x" type="number" disabled>,</label>
                            <label>선택 y좌표 :<input class="y" type="number" disabled></label>
                        </div>
                    </li>
                </ol>
            </div>
        </div>
    </div>
    <script src="/js/common/common.js"></script>
    <script src="/js/range/jsts.min.js"></script>
    <script src="/js/range/range.js"></script>
</body>
</html>
