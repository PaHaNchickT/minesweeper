export const timerFormatter = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds - 60 * mins;

  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

