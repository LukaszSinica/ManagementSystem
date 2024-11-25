package com.lukaszsinica.workplace;

import java.sql.Timestamp;
import java.time.LocalDateTime;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.lukaszsinica.workplace.timer.TimerService;

@SpringBootTest
class WorkplaceApplicationTests {

	@Test
	void contextLoads() {
	}
	
	@Test
	void calculateDifferenceInSecondsTest() {
        TimerService timerService = new TimerService();
        Timestamp fromTimestamp = Timestamp.valueOf(LocalDateTime.now());
        Timestamp toTimestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(2));
        long expectedDifference = 2 * 24 * 60 * 60;
		long timeDiffrence = timerService.calculateDifferenceInSeconds(fromTimestamp, toTimestamp);
        assertEquals(expectedDifference, timeDiffrence,  "The difference in seconds is incorrect");
	}
	
	@Test
	void calculateDifferenceInSecondsMockitoTest() {
	    TimerService timerService = mock(TimerService.class);
	    Timestamp fromTimestamp = Timestamp.valueOf(LocalDateTime.now());
	    Timestamp toTimestamp = Timestamp.valueOf(LocalDateTime.now().plusDays(2));

	    when(timerService.calculateDifferenceInSeconds(fromTimestamp, toTimestamp))
	        .thenReturn(172800L);

	    long actualDifference = timerService.calculateDifferenceInSeconds(fromTimestamp, toTimestamp);
	    assertEquals(1728000L, actualDifference, "The difference in seconds is incorrect");
	}
}
