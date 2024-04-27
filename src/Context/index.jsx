
import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    })
    const [windSpeed, setWindSpeed] = useState("");
    const [place, setPlace] = useState('Meerut');
    const [condition, setcondition] = useState([]);

    const fetchWeather = async () => {
        // setPlace('');
        setWeather({ ...weather, loading: true });
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const api_key = 'f00c38e0279b7bc85480c3fe775d518c';
        await axios
            .get(url, {
                params: {
                    q: place,
                    units: 'metric',
                    appid: api_key,
                },
            })
            .then((res) => {
                // setWeather({ data: res.data, loading: false, error: false });
                const response = res.data;
                console.log('response:-', response);
                setPlace(response.name)
                setWindSpeed(response.wind)
                setWeather(response.main)
                setcondition(response.weather[0])
            })
            .catch((error) => {
                setWeather({ ...weather, data: {}, error: true });
                console.log('error', error);
            });
    };

    useEffect(() => {
        fetchWeather();
    }, [place])


    return (
        <StateContext.Provider value={{
            weather,
            windSpeed,
            place,
            condition,
            setPlace,
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)
