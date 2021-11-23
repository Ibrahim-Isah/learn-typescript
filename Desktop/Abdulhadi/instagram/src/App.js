import './App.css';
import './styles/app.css';
import React, { lazy, Suspense } from 'react';
import Logo from './components/Logo';
import Home from './pages/Home';

// const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <div className="">
      <Home>
        <Logo />
      </Home>
    </div>
  );
}

export default App;
