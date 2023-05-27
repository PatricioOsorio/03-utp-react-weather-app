import Footer from './components/Footer';
import NavBar from './components/NavBar';
import WeatherCard from './components/WeatherCard';

const App = () => {
  return (
    <>
      <div className="container">
        <header>
          <NavBar />
        </header>
      </div>

      <main className="flex-shrink-0">
        <div className="container">
          <div className="row mt-5 pt-4">
            <h1>Weather App</h1>
            <div className="col">
              <WeatherCard city="Puebla" country="MX" />
              <WeatherCard city="Yucatan" country="MX" />
              <WeatherCard city="Veracruz" country="MX" />
            </div>
          </div>
        </div>
      </main>

      <footer className="d-block mt-auto py-3 bg-light">
        <Footer />
      </footer>
    </>
  );
};

export default App;
