import { useState } from 'react'
import './App.css'
import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import { BackgroundLayout, WeatherCard, MiniCard } from './Components'
import { useDate } from './Utils/useDate'

function App() {

  const [input, setInput] = useState('')
  const { weather, windSpeed, place, condition, setPlace } = useStateContext();


  const submitCity = (event) => {
    if (event.key === 'Enter') {
      setPlace(input);
      setInput('');
    }
  }
  const { time } = useDate();

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
          <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]' />
          <input 
           type="text" 
           placeholder='Search city' 
           className='focus:outline-none w-full text-[#212121] text-lg' 
           name='query'
           value={input} 
           onChange={(event) => setInput(event.target.value)}
           onKeyPress={submitCity}
          />
        </div>
      </nav>
      <BackgroundLayout></BackgroundLayout>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <WeatherCard
          place={place}
          windspeed={windSpeed.speed}
          humidity={weather.humidity}
          temperature={weather.temp}
          heatIndex={weather.feels_like}
          iconString={condition.main}
          conditions={condition.main}
        />

        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          <MiniCard
            time={time}
            temp={weather.temp}
            iconString={condition.main}
          />
        </div>
      </main>
    </div>
  )
}

export default App;
