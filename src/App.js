import { useState } from 'react';
import { Navbar, Footer, Routes } from './components';
function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [searchTream, setSearchTream] = useState('elon+musk');
  return (
    <div className={darkTheme ? 'dark' : ''}>
      <div className="dark:bg-gray-900 bg-gray-100 dark:text-gray-200 black min-h-screen">
        <Navbar darkTheme={darkTheme} setDarkTheme={setDarkTheme} setSearchTream={setSearchTream} />
        <Routes searchTream={searchTream} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
