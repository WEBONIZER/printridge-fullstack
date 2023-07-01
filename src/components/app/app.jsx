import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Layout from '../../pages/layout/layout'
import Main from '../../pages/main/main'
import Repair from '../../pages/repair/repair'
import Refill from '../../pages/refill/refill'
import Contacts from '../../pages/contacts/contacts'
import NotFound404 from '../../pages/not-found/not-found'


function App() {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/refill" element={<Refill />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;