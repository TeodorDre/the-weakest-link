export function formatTime(seconds: number) {
  const displayedHours = Math.floor(Math.abs(seconds) / (60 * 60));
  const displayedMinutes = Math.floor(Math.abs(seconds) / 60) % 60;
  const displayedSeconds = Math.floor(Math.abs(seconds) % 60);

  const sign = seconds < 0 && Math.floor(Math.abs(seconds)) ? '-' : '';

  return displayedHours
    ? `${sign}${displayedHours}:${displayedMinutes.toString().padStart(2, '0')}:${displayedSeconds
      .toString()
      .padStart(2, '0')}`
    : `${sign}${displayedMinutes}:${displayedSeconds.toString().padStart(2, '0')}`;
}
