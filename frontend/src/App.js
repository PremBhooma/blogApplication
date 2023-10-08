import './App.css';
import { AllRoutes } from './Routes/AllRoutes';
import Footer from './components/Footer';
import Header from './components/Header';

function App() {
  return (
    <main>
      <Header />
      <AllRoutes />
      <Footer />
    </main>
  );
}

export default App;
