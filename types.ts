interface PinpointLocations {
   link: string;
   name: string;
}

interface Forecast {
    dateLabel: string;
    telop: string;
    date: string;
    temperature: Object;
    image: Object;
}

interface Description {
    tet: string;
    publicTime: string;
}

interface Image {
    width: number;
    link: string;
    url: string;
    title: string;
    height: number;
}

interface Copyrigh {
    provider: Object[];
    link: string;
    title: string;
    image: Image;
}

interface Location {
    city: string;
    area: string;
    prefecture: string;
}

interface WeatherNewsResponse {
    pinpointLocations: PinpointLocations[];
    link: string;
    forecasts: Forecast[];
    location: Location;
    publicTime: string;
    copyright: string;
    title: string;
    description: Description;
}
