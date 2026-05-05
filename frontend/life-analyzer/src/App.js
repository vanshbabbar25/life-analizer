import { Routes,Route } from 'react-router'

import Dashboard from "./pages/Dashboard.jsx"
import AddData from './pages/AddData.jsx';
import Insight from './pages/Insight.jsx';
import Analysis from './pages/Analysis.jsx';
import History from './pages/History.jsx';
import Profile from './pages/Profile.jsx';

function App() {
  return (
     <div>
      <Routes>
        <Route path="/"element={<Dashboard></Dashboard>}></Route>
        <Route path="/add-data"element={<AddData></AddData>}></Route>
        <Route path="/insights"element={<Insight></Insight>}></Route>
        <Route path="/analysis"element={<Analysis></Analysis>}></Route>
        <Route path="/history"element={<History></History>}></Route>
        <Route path="/profile"element={<Profile></Profile>}></Route>
      </Routes>
     </div>
  );
}

export default App;
