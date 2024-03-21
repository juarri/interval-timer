import { Temporal } from '@js-temporal/polyfill';

function secondsToDuration(seconds: number) {
	if (seconds < 0) {
		throw new Error('seconds must be a positive number');
	}

	return Temporal.Duration.from({ seconds });
}

export default secondsToDuration;
