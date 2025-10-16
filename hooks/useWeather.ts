import { useState, useEffect } from 'react';

// Mock weather data for "Fatih, TR" (Istanbul) to simulate an API response
const mockWeatherData = {
    temp: '24',
    description: 'Parçalı Bulutlu',
    icon: 'fas fa-cloud-sun', // Font Awesome icon class
    condition: 'partly-cloudy',
};

export const useWeather = (location) => {
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate an API call to fetch weather data
        const fetchWeather = () => {
            console.log(`Fetching weather for: ${location}`);
            setTimeout(() => {
                if (location === "Fatih, TR") {
                    setWeather(mockWeatherData);
                } else {
                    setError('Weather data for this location is not available.');
                }
            }, 500); // 0.5 second delay to mimic network request
        };

        fetchWeather();
    }, [location]);

    return { weather, error };
};
