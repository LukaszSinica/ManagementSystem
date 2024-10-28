package com.lukaszsinica.workplace.timer;

import java.sql.Timestamp;

import org.springframework.stereotype.Service;

@Service
public class TimerService {
	
    public long calculateDifferenceInSeconds(Timestamp from_time, Timestamp to_time) {
        long millisecondsDiff = Math.abs(to_time.getTime() - from_time.getTime());

        return millisecondsDiff / 1000;
    }
}
