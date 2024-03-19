function readableDuration(seconds: number): string {
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const remainingSeconds = seconds % 60;
	const duration = [];

	if (hours > 0) {
		duration.push(`${hours} hour${hours > 1 ? 's' : ''}`);
	}
	if (minutes > 0) {
		duration.push(`${minutes} minute${minutes > 1 ? 's' : ''}`);
	}
	if (remainingSeconds > 0) {
		duration.push(`${remainingSeconds} second${remainingSeconds > 1 ? 's' : ''}`);
	}

	return duration.join(', ');
}

export default readableDuration;
