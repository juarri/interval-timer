import type { Temporal } from '@js-temporal/polyfill';

function timerDuration(duration: Temporal.Duration): string {
	const roundedDuration = duration.round({ smallestUnit: 'second', largestUnit: 'hour' });

	const hours = roundedDuration.hours;
	const minutes = roundedDuration.minutes;
	const seconds = roundedDuration.seconds;

	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = seconds.toString().padStart(2, '0');

	if (hours > 0) {
		return `${hours}:${formattedMinutes}:${formattedSeconds}`;
	}

	if (minutes > 0) {
		return `${minutes}:${formattedSeconds}`;
	}

	return `${seconds}`;
}

export default timerDuration;
