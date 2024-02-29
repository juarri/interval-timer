import type { Temporal } from '@js-temporal/polyfill';

function formatDuration(duration: Temporal.Duration): string {
	const roundedDuration = duration.round({ smallestUnit: 'second', largestUnit: 'hour' });

	const hours = roundedDuration.hours;
	const minutes = roundedDuration.minutes;
	const seconds = roundedDuration.seconds;

	const formattedHours = hours.toString().padStart(2, '0');
	const formattedMinutes = minutes.toString().padStart(2, '0');
	const formattedSeconds = seconds === 0 ? seconds.toString().padStart(2, '0') : seconds.toString();

	if (hours > 0) {
		return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
	}

	if (minutes > 0) {
		return `${formattedMinutes}:${formattedSeconds}`;
	}

	return `${formattedSeconds}`;
}

export default formatDuration;
