export const useTimeConvert = (milliseconds: number) => {
	const now = new Date().getTime();
	const distance = milliseconds - now;

	const dayMilliseconds = 86400000;
	const hourMilliseconds = 3600000;
	const date = new Date(milliseconds * 1000).toLocaleDateString();
	const hours = Math.floor(
		(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

	return hourMilliseconds > distance
		? `${String(minutes).substr(1, 2)} minutes ago`
		: dayMilliseconds > distance
		? `${String(hours).substr(1, 2)} hours ago`
		: date;
};
