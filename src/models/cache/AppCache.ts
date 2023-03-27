import axios from "axios";

class AppCacheManager {

    // readonly timestreamRefreshRate = 3600000;
    // private cachedDeviceData: Array<JSON> | null;
    // private timestreamInterval: NodeJS.Timer | null;

    readonly tideRefreshRate = 18000000; // 5 hours
    readonly yvrLat = '49.1967';
    readonly yvrLong = '123.1815';

    private cachedTideData: rawTideDataType[] | null;
    private cachedTideExtremeData: rawTideExtremeDataType[] | null;
    private tideInterval: NodeJS.Timer | null;

    constructor() {
        // this.cachedDeviceData = null;
        // this.timestreamInterval = null;
        this.cachedTideData = null;
        this.tideInterval = null;
        this.cachedTideExtremeData = null;

    };

    public getTideData = async () => {

        if (!this.cachedTideData || !this.cachedTideExtremeData) {
            await this.fetchTideData();
        }

        return { 'tideData': this.cachedTideData, 'tideExtremes': this.cachedTideExtremeData };;

    };

    public registerTideCache = async () => {

        const tideData = await this.fetchTideData();

        if (tideData) {
            this.cachedTideData = tideData['tideData'];
            this.cachedTideExtremeData = tideData['tideExtremes']

        } else {
            return null;
        }

        this.tideInterval = setInterval(async () => {

            const refreshedTideData = await this.fetchTideData();

            if (refreshedTideData) {
                this.cachedTideData = refreshedTideData['tideData'];
                this.cachedTideExtremeData = tideData['tideExtremes'];
            }


        }, this.tideRefreshRate);

        return this.tideInterval;
    };

    private fetchTideData = async () => {

        try {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow =
                new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0];


            const tideLevelsResponse = await axios.get(`https://api.stormglass.io/v2/tide/sea-level/point?lat=${this.yvrLat}&lng=${this.yvrLong}&start=${today}&end=${tomorrow}`,
                { headers: { Authorization: process.env.TIDE_API_KEY } }
            );

            const tideExtremesResponse = await axios.get(`https://api.stormglass.io/v2/tide/extremes/point?lat=${this.yvrLat}&lng=${this.yvrLong}&start=${today}&end=${tomorrow}`,
                { headers: { Authorization: process.env.TIDE_API_KEY } }
            );

            if (tideLevelsResponse.status === 200 && tideExtremesResponse.status === 200) {

                const tideData: rawTideDataType[] = tideLevelsResponse.data.data;
                const tideExtremes: rawTideExtremeDataType[] = tideExtremesResponse.data.data;

                return { 'tideData': tideData, 'tideExtremes': tideExtremes };
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
