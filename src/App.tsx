import CoreHeader from './core/header/header';
import AppHome from './modules/home/home';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <CoreHeader></CoreHeader>
      <AppHome></AppHome>
    </div>
  );
}

export default App;
