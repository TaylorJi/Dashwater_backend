// import axios from 'axios';

// const getSensorCalibrationPoints = async (sensorId: Number) => {
//     try {
//         const calibrationResponse: any = await axios.get(`${process.env.AWS_DEVICES_API_GATEWAY}/calibration_points/${sensorId}`, {
//             headers: {
//                 'x-api-key': process.env.AWS_DEVICES_API_KEY,
//                 'authorizationToken': process.env.AWS_DEVICES_API_AUTH_TOKEN
//             }
//         });

//         if (calibrationResponse.status === 200) {
//             const calibrationData = calibrationResponse['data']['calibration_points'];

//             // Ensure that calibration points are sorted asc by id as order of points
//             return calibrationData.sort((a: calibrationPointType, b: calibrationPointType) => a.id - b.id);
//         }
//         return null;

//     } catch (_err) {
//         return null;
//     }
// }

// export default module.exports = {
//     getSensorCalibrationPoints
// };
