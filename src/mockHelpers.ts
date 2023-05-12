/**
 * This module contains functions to send an email from the server
 */

import UserThresholdModel from './models/userThreshold/UserThresholdModel';
import UserModel from './models/user/UserModel';

const createTestUser = (userEmail: String) => {
    UserModel.createUser(userEmail, "Turkey2021!").then((result) => {
            if (result != null) {
                UserThresholdModel.createUserThreshold(result, 1, 'do').then((finish) =>{
                    if (finish != null) {
                        UserThresholdModel.updateUserThreshold(result, 1, 'do', -5, 79)
                    }
                    
                })

                UserThresholdModel.createUserThreshold(result, 1, 'ec').then((finish) =>{
                    if (finish != null) {
                        UserThresholdModel.updateUserThreshold(result, 1, 'ec', 260, 450)
                    }
                    
                })

                UserThresholdModel.createUserThreshold(result, 1, 'ph').then((finish) =>{
                    if (finish != null) {
                        UserThresholdModel.updateUserThreshold(result, 1, 'ph', 0, 6)
                    }
                    
                })

            } else {
                console.log("failed")
            }
            
        })
    UserThresholdModel.updateUserThreshold("645997521a95e72b5724748b", 123, "do", -5, 20)
        UserThresholdModel.getAllThreshold();
};

const retrieveMockUserTresholdData = () => {
    return [
        {
            userId: "645d74bedc0258b56913dcc6",
            deviceId: 1,
            metricId: 'do',
            customMin: -5,
            customMax: 79,
            trigger: false,
            emailSent: false,
            __v: 0
        },
        {
            userId: "645d74bedc0258b56913dcc6",
            deviceId: 1,
            metricId: 'ph',
            customMin: 0,
            customMax: 6,
            trigger: false,
            emailSent: false,
            __v: 0
        },
        {
            userId: "645d74bedc0258b56913dcc6",
            deviceId: 1,
            metricId: 'ec',
            customMin: 260,
            customMax: 450,
            trigger: false,
            emailSent: false,
            __v: 0
        }
    ]
}

export default module.exports = {
    createTestUser,
    retrieveMockUserTresholdData
}