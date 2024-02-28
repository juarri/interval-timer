import type { Temporal } from '@js-temporal/polyfill';

function formatDuration(duration: Temporal.Duration): string {
	const roundedDuration = duration.round({ smallestUnit: 'second', largestUnit: 'hour' });

	const hours = roundedDuration.hours;
	const minutes = roundedDuration.minutes;
	const seconds = roundedDuration.seconds;

	if (hours > 0) {
		return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
	}

	if (minutes > 0) {
		return `${minutes}:${seconds.toString().padStart(2, '0')}`;
	}

	return `${seconds.toString()}`;
}

export default formatDuration;
