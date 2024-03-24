import type { IntervalTimer } from '$lib/server/db/schema';

function calculateTotalRoutineTime(intervalTimer: IntervalTimer) {
	return (
		intervalTimer.preparationTime +
		(intervalTimer.goTime + intervalTimer.stopTime) * intervalTimer.intervals -
		intervalTimer.stopTime +
		intervalTimer.cooldownTime
	);
}

export default calculateTotalRoutineTime;
