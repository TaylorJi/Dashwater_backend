import axios from "axios";

class AppCacheManager {

    // readonly timestreamRefreshRate = 3600000;
    // private cachedDeviceData: Array<JSON> | null;
    // private timestreamInterval: NodeJS.Timer | null;

    readonly tideRefreshRate = 10800000; // 3 hours
    readonly yvrLat = '49.1967';
    readonly yvrLong = '123.1815';

    private cachedTideData: rawTideDataType[] | null;
    private tideInterval: NodeJS.Timer | null;

    constructor() {
        // this.cachedDeviceData = null;
        // this.timestreamInterval = null;
        this.cachedTideData = null;
        this.tideInterval = null;

    };

    public getTideData = async () => {

        if (!this.cachedTideData) {
            await this.fetchTideData();
        }

        return this.cachedTideData;

    };

    public registerTideCache = async () => {

        const tideData = await this.fetchTideData();

        if (tideData) {
            this.cachedTideData = tideData;

        } else {
            return null;
        }

        this.tideInterval = setInterval(async () => {

            const refreshedTideData = await this.fetchTideData();
            this.cachedTideData = refreshedTideData;

        }, this.tideRefreshRate);

        return this.tideInterval;
    };

    private fetchTideData = async () => {

        try {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow =
                new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];

            const response = await axios.get(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${this.yvrLat}&lng=${this.yvrLong}&start=${today}&end=${tomorrow}`,
                { headers: { Authorization: process.env.TIDE_API_KEY } }
            );

            if (response.status === 200) {

                const data: rawTideDataType[] = response.data.data;

                return data;
            }
            return null;

        } catch (_err) {
            return null;
        }

    };


    // public registerTS = async () => {

    //     const deviceData = null;

    //     if (deviceData) this.cachedDeviceData = deviceData;

    //     this.timestreamInterval = setInterval(async () => {
    //         const newDeviceData = await this.fetchData();
    //         this.cachedDeviceData = newDeviceData;
    //     }, this.timestreamRefreshRate);

    //     return this.timestreamInterval;

    // };

    // private fetchTSData = async () => {
    //     try {

    //         // TODO: Write fetch query

    //     } catch (_err) {
    //         return null;
    //     }
    // };

    // public getCachedData = async () => {
    //     if (!this.cachedDeviceData) {
    //         this.cachedDeviceData = await this.fetchData();
    //     }
    //     return this.cachedDeviceData;
    // };
}

const AppCache = new AppCacheManager();

export default AppCache;
