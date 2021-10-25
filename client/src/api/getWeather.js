import axios from 'axios'

const URL = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '65809b45c52c8746d60558f425eb4f08'

export const getWeather = async (query) => {
    //destructure response.data
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            appid: API_KEY
        }
    })

    return data
   
}
