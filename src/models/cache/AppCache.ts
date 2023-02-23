class AppCacheManager {
    /**
     * AppCacheManager is the AppCache class meant to be instantiated as a singleton cache
     * with a given cacheRefreshRate.
     */

    readonly cacheRefreshRate = 3600000;

    private cachedDeviceData: Array<JSON> | null;
    private interval: NodeJS.Timer | null;

    constructor() {
        this.cachedDeviceData = this.fetchData;
        this.interval = null;
    };

    public register = async () => {

        const deviceData = null;

        if (deviceData) this.cachedDeviceData = deviceData;

        this.interval = setInterval(async () => {
            const newDeviceData = this.fetchData;
            this.cachedDeviceData = newDeviceData;
        }, this.cacheRefreshRate);

        return this.interval;

    };

    private fetchData = async () => {
        try {

            // TODO: Write fetch query

        } catch (_err) {
            return null;
        }
    };

    public getCachedData = async() => {
        if (!this.cachedDeviceData) {
            this.cachedDeviceData = this.fetchData;
        }
        return this.cachedDeviceData;
    };
}

const AppCache = new AppCacheManager();

export default AppCache;
