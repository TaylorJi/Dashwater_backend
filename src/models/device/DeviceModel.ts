import Device from "../../config/schemas/Device";
import axios from "axios";

const createDevice = async (deviceId: Number, coordinates: [Number], metricList: metricListBoolean) => {
    try {
        const newDevice = await Device.create({ "deviceId": deviceId, "location.coordinates": coordinates, "metricList": metricList });

        if (newDevice) {
            return newDevice;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const updateDevice = async (deviceId: Number, updateData: deviceUpdateDataType) => {
    try {
        const updatedDevice = await Device.findOneAndUpdate({ "deviceId": deviceId }, updateData, { new: true })
            .select({ "deviceId": 1, "location.coordinates": 1, "metricList": 1, "_id": 0 });

        if (updatedDevice) {
            return updatedDevice;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const deleteDevice = async (deviceId: Number) => {
    try {
        const deletedDevice = await Device.findOneAndDelete({ "deviceId": deviceId })
            .select({ "deviceId": 1, "location.coordinates": 1, "metricList": 1, "_id": 0 });

        if (deletedDevice) {
            return deletedDevice;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getAllDevices = async () => {
    try {
        const devices = await Device.find({}).select({ "deviceId": 1, "location.coordinates": 1, "metricList": 1, "_id": 0 });

        if (devices.length !== 0) {
            return devices;
        }
        return false;
    } catch (err) {
        return null;
    }
}


const getSingleDevice = async (deviceId: Number) => {
    try {
        const device = await Device.findOne({ "deviceId": deviceId })
            .select({ "deviceId": 1, "location.coordinates": 1, "metricList": 1, "_id": 0 });

        if (device) {
            return device;
        }
        return false;

    } catch (err) {
        return null;
    }
}


const getDevicesWithinRadius = async (coordinates: [Number], radius: Number) => {
    try {

        const devices = await Device.find({
            location: {
                $near: {
                    $geometry: {
                        "type": "Point",
                        "coordinates": coordinates
                    },
                    $maxDistance: radius // Radius should be meter
                }
            }
        }).select({ "deviceId": 1, "location.coordinates": 1, "metricList": 1, "_id": 0 });

        if (devices.length !== 0) {
            return devices;
        }
        return false;

    } catch (err) {
        return null;
    }
}

const getAllDevicesSettings: any = async () => {
    try {
        // const apiGateway = process.env.AWS_DEVICES_API_GATEWAY;
        // const devicesResponse: any = await axios.get(`${apiGateway}/devices`, {
        //     headers: {
        //         'x-api-key': process.env.AWS_DEVICES_API_KEY,
        //         'authorizationToken': process.env.AWS_DEVICES_API_AUTH_TOKEN
        //     }
        // });
        const apiGateway = process.env.AWS_DEVICES_API_GATEWAY_TEST;
        const devicesResponse: any = await axios.post(`${apiGateway}`,
        {
            operation: "scan"
        });

        if (devicesResponse.status === 200) {
            let devicesResData = devicesResponse['data']['devices'];
            const devicesData: deviceSettingType[] = devicesResData.map((device: any) => {
                const newDeviceItem: deviceSettingType = {
                    id: parseInt(device['id']),
                    name: device['Name'],
                    description: device['Description'],
                    locationX: device['location']['latitude'],
                    locationY: device['location']['longitude'],
                    active: device['Device Status'],
                    // timeInterval: 11,
                    sensors: [],
                    sensor_ids: device['sensors']
                }
                return newDeviceItem;
            });

            const sensorsResponse: any = await axios.post(`${apiGateway}`, 
            {
                operation: "scan_sensors"
            });
            
            if (sensorsResponse.status === 200) {
                let devices = sensorsResponse['data']['devices'];
                devices.forEach((device: any) => {
                    let deviceId = parseInt(device['id']);
                    let sensorsResData = device['sensors'];
                    const sensorsData: sensorType[] = sensorsResData.map((sensor: any) => {
                        const newSensorItem: sensorType = {
                            id: sensor['id'],
                            deviceId: deviceId,
                            lastCalibrationDate: sensor['calibration']['dateLastCalibrated'],
                            // minCalibrationPts: sensor['minimum_required_calibration_points'],
                            metric: sensor['measurement'],
                            alerts: sensor['alerts'],
                            defaultUnit: sensor['units'],
                            threshold: sensor['threshold'],
                            // calibrated: sensor['calibrated'],
                            // enabled: sensor['enabled'],
                            minVal: sensor['min'],
                            maxVal: sensor['max'],
                            physicalValues: sensor['calibration']['physicalValue'],
                            calibratedValues: sensor['calibration']['digitalValue']
                        }
    
                        return newSensorItem;
                    });

                    devicesData.forEach((device: any) => {
                        sensorsData.forEach((sensor: any) => {
                            if (sensor.deviceId === device.id) {
                                device.sensors.push(sensor);
                            }
                        });
                    });
                });
                
                // let sensorsResData = devices['sensor'];
                // let sensorsResData = sensorsResponse['data']['devices'];
                // const sensorsData: sensorType[] = sensorsResData.map((sensor: any) => {
                //     console.log(sensor["id"]);
                //     const newSensorItem: sensorType = {
                //         id: sensor['id'],
                //         deviceId: deviceId,
                //         lastCalibrationDate: sensor['calibration']['dateLastCalibrated'],
                //         // minCalibrationPts: sensor['minimum_required_calibration_points'],
                //         metric: sensor['measurement'],
                //         alerts: sensor['alerts'],
                //         defaultUnit: sensor['units'],
                //         threshold: sensor['threshold'],
                //         // calibrated: sensor['calibrated'],
                //         // enabled: sensor['enabled'],
                //         minVal: sensor['min'],
                //         maxVal: sensor['max'],
                //         physicalValues: sensor['calibration']['physicalValue'],
                //         calibratedValues: sensor['calibration']['digitalValue']
                //     }

                //     return newSensorItem;
                // });

                // devicesData.forEach((device: any) => {
                //     sensorsData.forEach((sensor: any) => {
                //         if (sensor.deviceId === device.id) {
                //             device.sensors.push(sensor);
                //         }
                //     });
                // });

                // devicesData.forEach((device: any) => {
                //     sensorsData.forEach((sensor: any) => {
                //         if (device.sensor_ids.includes(sensor.id)) {
                //             device.sensors.push(sensor);
                //         }
                //     });
                // });
            }

            return devicesData;
        }

        // if (devicesResponse.status === 200) {
        //     let devicesResData = devicesResponse['data']['Devices'];

        //     const devicesData: deviceSettingType[] = devicesResData.map((device: any) => {

        //         const newDeviceItem: deviceSettingType = {
        //             id: device['device_id'],
        //             name: device['device_name'],
        //             description: device['device_description'],
        //             locationX: device['location_x'],
        //             locationY: device['location_y'],
        //             active: device['active'],
        //             timeInterval: device['time_interval'],
        //             sensors: []
        //         }

        //         return newDeviceItem;
        //     });

        //     const sensorsResponse: any = await axios.get(`${apiGateway}/sensors`, {
        //         headers: {
        //             'x-api-key': process.env.AWS_DEVICES_API_KEY,
        //             'authorizationToken': process.env.AWS_DEVICES_API_AUTH_TOKEN
        //         }
        //     });

        //     if (sensorsResponse.status === 200) {
        //         let sensorsResData = sensorsResponse['data']['sensors'];

        //         const sensorsData: sensorType[] = sensorsResData.map((sensor: any) => {

        //             const newSensorItem: sensorType = {
        //                 id: sensor['sensor_id'],
        //                 deviceId: sensor['device_id'],
        //                 lastCalibrationDate: sensor['last_calibration_date'],
        //                 minCalibrationPts: sensor['minimum_required_calibration_points'],
        //                 metric: sensor['metric_type'],
        //                 defaultUnit: sensor['default_metric_unit'],
        //                 calibrated: sensor['calibrated'],
        //                 enabled: sensor['enabled'],
        //                 minVal: sensor['min_val'],
        //                 maxVal: sensor['max_val'],
        //             }

        //             return newSensorItem;
        //         });

        //         devicesData.forEach((device: any) => {
        //             sensorsData.forEach((sensor: any) => {
        //                 if (sensor.deviceId === device.id) {
        //                     device.sensors.push(sensor);
        //                 }
        //             });
        //         });

        //         return devicesData;
        //     }
        // }
        return null;

    } catch (_err) {
        return null;
    }
}

const updateDeviceSettings: any = async (device: deviceSettingType) => {

    const newSettings = {
        'device_id': device['id'],
        'device_name': device['name'],
        'device_description': device['description'],
        'location_x': device['locationX'],
        'location_y': device['locationY'],
        'time_interval': null,      // unsure about time interval use right now, default to null
        'active': device['active']
    }

    try {
        const devicesResponse: any = await axios.put(`${process.env.AWS_DEVICES_API_GATEWAY}/devices/${device.id}`,
            newSettings,
            {
                headers: {
                    'x-api-key': process.env.AWS_DEVICES_API_KEY,
                    'authorizationToken': process.env.AWS_DEVICES_API_AUTH_TOKEN
                }
            });

        if (devicesResponse.status === 200) {
            return true
        }
    } catch (_err) {
        return false;
    }
    return false;
}

export default module.exports = {
    createDevice,
    updateDevice,
    deleteDevice,
    getAllDevices,
    getSingleDevice,
    getDevicesWithinRadius,
    getAllDevicesSettings,
    updateDeviceSettings
}