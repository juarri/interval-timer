function currentTime() {
	const now = Date.now();
	const formatter = new Intl.DateTimeFormat('en-US', {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	});
	return formatter.format(now);
}

export default currentTime;
