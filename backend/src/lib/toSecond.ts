export function timeStringToSeconds(timeString: string) {
  const [hours, minutes, rest] = timeString.split(":");
  const [seconds, milliseconds] = rest!.split(".");
  
  return (
      parseInt(hours!, 10) * 3600 +
      parseInt(minutes!, 10) * 60 +
      parseInt(seconds!, 10) +
      (milliseconds ? parseFloat("0." + milliseconds) : 0)
  );
}