### **Description**  
The `advent-event` library provides a customizable and flexible way to manage advent-style countdowns or unlockable content systems. Ideal for projects like event calendars, daily challenges, or reward systems, it allows you to define a starting date and manage days programmatically.

Package name: `advent-event`


### **Features**  
- **Customizable Length**: Define the number of days for your calendar (default: 24 days).  
- **Unlockable Days**: Determine if a specific day is unlocked based on the current time.  
- **Time Calculation**: Get precise unlock times for each day.  
- **Countdown Timer**: Calculate the remaining time until a specific day is unlocked.  
- **Dynamic State Management**: Check if the advent period is over and retrieve the last unlocked day.  
- **Remaining Days**: Calculate how many days are left in the advent period.


### **Usage Example**  
```typescript
import { AdventEvent } from 'advent-event';

// Initialize with a start time and default length of 24 days
const calendar = new AdventEvent(new Date('2025-12-01T00:00:00Z'));

// Check if day 5 is unlocked
console.log(calendar.isUnlocked(5)); // true or false

// Get unlock time for day 10
console.log(new Date(calendar.getTime(10)));

// Calculate countdown for day 15
console.log(calendar.getCountdown(15)); // Time remaining in milliseconds

// Check if the calendar period is over
console.log(calendar.isLastDayUnlocked());

// Retrieve the last unlocked day
console.log(calendar.getLastUnlockedDay());

// Get the number of remaining days in the advent calendar
console.log(calendar.getRemainingDays());
```


### **Use Cases**  
- Create advent calendars for games or websites.  
- Manage time-gated rewards, events, or challenges.  
- Implement unlockable content systems for marketing or engagement.


### **API Reference**
- **`constructor(startTime: Date, length: number = 24)`**: Initializes the calendar.  
- **`isUnlocked(day: number, currentTime?: Date): boolean`**: Checks if a specific day is unlocked.  
- **`getTime(day: number): number`**: Gets the unlock time for a day (as a timestamp).  
- **`getCountdown(day: number, currentTime?: Date): number`**: Calculates the time remaining until a day is unlocked.  
- **`isOver(currentTime?: Date): boolean`**: Checks if the calendar period is over.  
- **`getLastUnlockedDay(currentTime?: Date): number`**: Finds the most recent unlocked day.  
- **`getRemainingDays(currentTime?: Date): number`**: Gets the number of days left in the advent calendar.
