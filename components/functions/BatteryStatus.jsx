export function getBatteryPercentage(voltage) {
    // Define voltage ranges for 3-cell LiPo
    const fullChargeVoltage = 12.6;
    const lowVoltageCutoff = 9.0;
    const nominalVoltage = 11.1;
  
    // Check if the voltage is within a valid range
    if (voltage >= fullChargeVoltage) {
      return 100; // Fully charged
    } else if (voltage <= lowVoltageCutoff) {
      return 0; // Low or empty battery
    } else {
      // Calculate percentage based on voltage between low cutoff and full charge
      const percentage = ((voltage - lowVoltageCutoff) / (fullChargeVoltage - lowVoltageCutoff)) * 100;
      return Math.round(percentage); // Round the percentage for a cleaner result
    }
  }

  //export default getBatteryPercentage;
  
  // Example usage:
  //const voltage = 11.4;  // You can change this to any voltage value
  //console.log(getBatteryPercentage(voltage));  // Output: Battery percentage based on the voltage
  