export const formatTime = (isoString: string, timezone: string = "Asia/Bangkok"): string => {
    if (!isoString) return ""; 
  
    try {
      const date = new Date(isoString);
  
      if (isNaN(date.getTime())) {
        throw new Error(`Invalid date: ${isoString}`);
      }
  
      const formattedTime = new Intl.DateTimeFormat('en-GB', {
        hour: 'numeric',
        minute: '2-digit',
        hourCycle: 'h23', 
        timeZone: timezone, 
      }).format(date);
  
      return formattedTime.replace(":", ".");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Error formatting time: ${error.message}`)
      }
      return "";
    }
  };
  
  