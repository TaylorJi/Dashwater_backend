import queryBuilder from "../../helpers/timestreamAPI/functions/queryBuilder";

// const testRoute = async () => {
//     console.log("Test route success!")
//     return true
// }

const getGraphHistory = async (buoyIdList: string, measureName: string, start: string, end: string) => {
  
    try {
      const query = queryBuilder.buildHistoricalQuery(buoyIdList, measureName, start, end);
      console.log(query)
  
      const [timestreamQuery, queryParams] = queryBuilder.createTSQuery(query);
  
      const data = await timestreamQuery.query(queryParams).promise();
  
      if (data) {
        return data;
      }
  
      return null;
  
    } catch (_err) {
      return null;
    }
  };

export default module.exports = {
    getGraphHistory
};