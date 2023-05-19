export const metricRef: deviceMetricType = {
    'do': 'Dissolved Oxygen',
    'ec': 'Electrical Conductivity',
    'ph': 'pH',
    'tds': 'Total Dissolved Solids',
    'temp': 'Temperature',
    'tbd': 'Turbidity',
    'wf': 'Water Flow',
    'wp': 'Water Pressure'
};

export const metricUnitRef: deviceMetricUnitsType = {
    'Dissolved Oxygen': {
        'xAxisName': 'Time',
        'yAxisName': 'mg/L'
    },
    'Electrical Conductivity': {
        'xAxisName': 'Time',
        'yAxisName': 'mS/cm'
    },
    'pH': {
        'xAxisName': 'Time',
        'yAxisName': 'pH'
    },
    'Total Dissolved Solids': {
        'xAxisName': 'Time',
        'yAxisName': 'ppm'
    },
    'Temperature': {
        'xAxisName': 'Time',
        'yAxisName': '°C'
    },
    'Turbidity': {
        'xAxisName': 'Time',
        'yAxisName': 'NTU'
    },
    'Water Flow': {
        'xAxisName': 'Time',
        'yAxisName': 'L/s'
    },
    'Water Pressure': {
        'xAxisName': 'Time',
        'yAxisName': 'kPa'
    }
};

export const VALUE_NOT_FOUND = -9999;

export const logDataRef: deviceMetricType = {
    'Dissolved Oxygen': 'dissolvedOxygen',
    'Temperature': 'temperature',
    'Electrical Conductivity': 'electricalConductivity',
    'pH': 'pH',
    'Turbidity': 'turbidity',
    'Total Dissolved Solids': 'totalDissolvedSolids',
    'Water Flow': 'waterFlow',
    'Water Pressure': 'waterPressure'
};

export const DEVICE_IDS = ['0', '1'];