// Function to format the timestamp
export const formatTimestamp = (timestamp) => {
    const currentDate = new Date();
    const itemDate = new Date(timestamp);
  
    // Calculate the time difference in minutes
    const timeDifference = Math.floor((currentDate - itemDate) / (1000 * 60));
  
    // If the difference is less than 1 hour, show minutes ago
    if (timeDifference < 60) {
      return `${timeDifference} minute${timeDifference !== 1 ? 's' : ''} ago`;
    }
  
    // If the difference is less than 24 hours, show hours ago
    if (timeDifference < 1440) {
      const hours = Math.floor(timeDifference / 60);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    }
  
    // If it's more than 24 hours, show the date in a specific format
    const day = itemDate.getDate();
    const month = itemDate.getMonth() + 1; // Month is 0-indexed
    const year = itemDate.getFullYear();
  
    return `${day}-${month < 10 ? '0' : ''}${month}-${year}`;
  };
  