import axios from 'axios'

const URL = process.env.REACT_APP_URL
const API_KEY = process.env.REACT_APP_API_KEY

export const getWeather = async (query) => {
    //destructure response.data
    try {
        const { data } = await axios.get(URL, {
            params: {
                q: query,
                units: 'metric',
                appid: API_KEY
            }
        })
        
        return data
    } catch (error) {
        
        return {error: true }
    }
   
}
