/**
 * This module contains functions to create alerts for users
 */

import mailSender from "./mailSender";
import queryParser from "../../helpers/timestreamAPI/functions/queryParser";
import TimestreamModel from "../timestreamAPI/TimestreamModel";
import UserThresholdModel from "../userThreshold/UserThresholdModel";
import { CronJob } from "cron";

// Map to store the last notification timestamps for each threshold
const lastNotificationTimestamps = new Map();

const compareThresholds = async () => {
    console.log('Comparing thresholds...');
    try {
        const sensorData = await retrieveTimestreamData();
        const thresholdData = await UserThresholdModel.getAllThreshold() //retrieveThresholdData(); retrieveMockTresholdData()

        console.log('Sensor data:', sensorData);
        console.log('Threshold data:', thresholdData);
        await checkThresholdExceeded(sensorData, thresholdData);
    } catch (error) {
        console.error('Error comparing thresholds:', error);
        throw error;
    }
}
const cronJob = new CronJob('*/2 * * * *', async () => {
    try {
      await compareThresholds();
    } catch (error) {
      console.error('Error comparing thresholds:', error);
      throw error;
    }
  });
  
  cronJob.start();

const retrieveTimestreamData = async () => {
    console.log('Retrieving timestream data...');
    try {
        const buoyIdList = '1';
        const response = await TimestreamModel.getBuoyData(buoyIdList);//fetch('http://localhost:8085/api/ts/getAllBuoyIds');
        let data = queryParser.parseQueryResult(response)
        return data;

    } catch (error) {
        console.error('Error retrieving timestream data:', error);
        throw error;
    }
  }

const checkThresholdExceeded = async (sensorData: any[], thresholdData: any[] | null) => {
    console.log("Checking tresholds")
    sensorData.forEach((sensorReading) => {
        thresholdData?.forEach((threshold) => {
            if (isMatchingMetricAndDevice(threshold, sensorReading.measure_name, sensorReading.buoy_id)) {
                console.log("\nThreshold Device + Metric matched");
                if (isExceedingThreshold(threshold, sensorReading['measure_value::double'])) {
                    console.log("Threshold exceeded!");
                    // Check if the threshold has been triggered within the past 24 hours
                    const lastNotificationTimestamp = lastNotificationTimestamps.get(threshold.id);
                    const currentTime = new Date().getTime();
                    if (!lastNotificationTimestamp || (currentTime - lastNotificationTimestamp) >= 24 * 60 * 60 * 1000) {
                    sendNodeMailerEmail(threshold, sensorReading);
                    console.log("Email sent successfully")
                    lastNotificationTimestamps.set(threshold.id, currentTime);
                    } else {
                        console.log("Notification has already been sent within the last 24 hours!")
                    }
                }

            }
        })
    })

}

const isMatchingMetricAndDevice = (threshold:any, measureName: any, deviceId: any) => {
    let thr_metricId: String = threshold.metricId;
    let thr_deviceId: Number = parseInt(threshold.deviceId);
    let sensor_metricId: String = measureName;
    let sensor_deviceId: Number = parseInt(deviceId);

    if (thr_metricId === sensor_metricId && thr_deviceId === sensor_deviceId) {
        return true;
    }
    return false;
}

const isExceedingThreshold = (threshold: any, measureValue: any) => {
    console.log("Checking if threshold is exceeded")
    
    let thr_customMin: Number = parseFloat(threshold.customMin);
    let thr_customMax: Number = parseFloat(threshold.customMax);
    let sensorMeasureValue: Number = parseFloat(measureValue);

    console.log("thr_min:", thr_customMin, ",thr_max:", thr_customMax, "Sensor Value:", sensorMeasureValue)
    if (sensorMeasureValue < thr_customMin || sensorMeasureValue > thr_customMax) {
        return true;
    }
    return false;
}

const sendNodeMailerEmail = (threshold: any, sensorReading: any) => {
    console.log("Sending email notification")
    let recepient = "adedeji.toki@gmail.com"
    let subject = "IMPORTANT: Sensor Threshold Exceeded"
    let text = `Sensor ${sensorReading.buoy_id} has exceeded the threshold for ${sensorReading.measure_name}. The current value is ${sensorReading['measure_value::double']}. The threshold is ${threshold.customMin} to ${threshold.customMax}.`
    mailSender.sendEmail(recepient, subject, text);
}

export default module.exports = {
    compareThresholds
}