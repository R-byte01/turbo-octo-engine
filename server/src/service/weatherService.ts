import dotenv from 'dotenv';
dotenv.config();
import dayjs, { Dayjs } from 'dayjs';
import { response } from 'express';

interface Coordinates {
  zip?: number;
  name?: string;
  lat?: number;
  lon?: number;
  state?: string;
  country?: string;
};

class Weather {
  temp: number;
  date: Dayjs;
  wind: number;
  humidity: number;
  id?: number;
  main?: string;
  description?: string;
  icon?: string;

  constructor(
    temp: number,
    date: Dayjs,
    wind: number,
    humidity: number,
    id: number,
    main: string,
    description: string,
    icon: string,
  ) {
    this.temp = temp;
    this.date = date;
    this.wind = wind;
    this.humidity = humidity;
    this.id = id;
    this.main = main;
    this.description = description;
    this.icon = icon;
  }
}

class WeatherService implements Coordinates {
  private baseURL?: string;
  private apiKey?: string;
  private city? = "";
  zip: number;
  name: string;
  lat: number;
  lon: number;
  state?: string;
  country: string;

  constructor(zip: number, country: string, name: string, lat: number, lon: number, state: string) {
    this.baseURL = process.env.API_BASE_URL || '';
    this.apiKey = process.env.API_KEY || '';
    this.zip = zip;
    this.name = name;
    this.lat = lat;
    this.lon = lon;
    this.state = state;
    this.country = country;
  }
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {

      const response = await fetch(query);
      if (response.ok) {
        const query = await response.json();
        return query;
      } else {
        throw new Error('Unable to fetch location data');
      }
    } catch (error) { console.error(error); }
  }


  // TODO: Create destructureLocationData method

  private destructureLocationData(locationData: Coordinates): Coordinates {
    if (!locationData) {
      throw new Error('Unable to fetch location data');
    }
    const { zip, name, lat, lon, state, country } = locationData;
    const coordinates: Coordinates = {
      zip, name, lat, lon, state, country
    };
    return coordinates;
  };

  // TODO: Create buildGeocodeQuery method

  private buildGeocodeQuery(): string {

    const geocodeQuery = `${this.baseURL}geo/1.0/direct?q=${this.name}&limit=1&appid=${this.apiKey}`;
    return geocodeQuery;
  }

  // TODO: Create buildWeatherQuery method

  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `api.openweathermap.org/data/2.5/forecast?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}`
    return weatherQuery;
  }

  // TODO: Create fetchAndDestructureLocationData method

  private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery()).then(locationData => this.destructureLocationData(locationData))
  }

  // TODO: Create fetchWeatherData method

  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates)).then(res => res.json());
    if (!response.ok) {
      throw new Error('Unable to fetch location data');
    }

    return query;
  } else {

  const query = await response.json();
  const currentWeather: Weather = this.parseCurrentWeather(response.list[0]);
  const forecast: Weather[] = this.buildForecastArray(currentWeather, response.list);
  return forecast;

} catch (error) {
  console.error(error);
  return error;
}
  }

  // TODO: Build parseCurrentWeather method

  private parseCurrentWeather(response: any) {

  const parsedDate = dayjs.unix(response.dt).format("MM/DD/YYYY");
  const currentWeather = new Weather(
    this.city, parsedDate,
    response.main.temp,
    response.wind.speed,
    response.main.humidity,
    respones.weather[0].icon,
    response.weather[0].description || response.weather[0].main,
  );

  return currentWeather;
}

  // TODO: Complete buildForecastArray method

  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
 const weatherForcast: Weather[] = [currentWeather];
const filteredWeatherData = weatherData.filter((data:any) => data.dt_txt.includes("12:00:00"));

for (const day of filteredWeatherData){
  weatherForcast.push(new Weather(this.city, dayjs.unix(day.dt)format("MM/DD/YYYY")))
}

  return weatherForcast;
}

  // TODO: Complete getWeatherForCity method

  async getWeatherForCity(city: string) {
  try {
   this.city
    );
    const weatherForCity = response.json();
    this.buildForecastArray(currentWeather, weatherData);
  }
  }
}

export default new WeatherService();
