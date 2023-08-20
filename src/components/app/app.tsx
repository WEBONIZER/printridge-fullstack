import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Modal from '../modal/modal'
import FeedbackForm from '../forms/feedback-form/feedback-form'
//import { useDispatch } from "react-redux";
import Layout from '../../pages/layout/layout'
import Main from '../../pages/main/main'
import Repair from '../../pages/repair/repair'
import Refill from '../../pages/refill/refill'
import Contacts from '../../pages/contacts/contacts'
import RefillItemPage from '../../pages/refill-item-page/refill-item-page'
import RepairItemPage from '../../pages/repair-item-page/repair-item-page'
import NotFound404 from '../../pages/not-found/not-found'

const App: React.FC = () => {
  
  //const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    navigate(-1);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/repair" element={<Repair />} />
          <Route path="/repair/:vendor" element={<Repair />} />
          <Route path="/repair/:vendor/:model" element={<RepairItemPage />} />
          <Route path="/refill" element={<Refill />} />
          <Route path="/refill/:vendor" element={<Refill />} />
          <Route path="/refill/:vendor/:model" element={<RefillItemPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
      {
        background && (
          <Routes>
            <Route
              path='/'
              element={
                <Modal onClose={handleModalClose} closeButton={handleModalClose}>
                  <FeedbackForm />
                </Modal>
              }
            />
          </Routes>
        )
      }
    </>
  );
}

export default App;