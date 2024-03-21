function readableDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	const duration = [];

	if (hours > 0) {
		duration.push(`${hours}h`);
	}
	if (minutes > 0) {
		duration.push(`${minutes}m`);
	}
	if (remainingSeconds > 0) {
		duration.push(`${remainingSeconds}s`);
	}

	if (duration.length === 0) {
		return '0s';
	}

	return duration.join(' ');
}

export default readableDuration;
