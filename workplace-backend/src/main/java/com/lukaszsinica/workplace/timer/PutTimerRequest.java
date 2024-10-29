package com.lukaszsinica.workplace.timer;


public record PutTimerRequest(Long id, String date, String from_time, String to_time) {}
