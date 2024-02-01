import './app.module.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Modal from '../modal/modal'
import FeedbackForm from '../forms/feedback-form/feedback-form'
import Layout from '../../pages/layout/layout'
import Main from '../../pages/main/main'
import RepairComponent from '../../components/repair-component/repair-component'
import RefillComponent from '../../components/refill-component/refill-component'
import Contacts from '../../pages/contacts/contacts'
import RefillItemComponent from '../../components/refill-component/refill-item-component/refill-item-component'
import RepairItemComponent from '../../components/repair-component/repair-item-component/repair-item-component'
import NotFound404 from '../../pages/not-found/not-found'

const App: React.FC = () => {
  
  const location = useLocation();
  const background = location.state && location.state.background;

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/repair/:vendor" element={<RepairComponent />} />
          <Route path="/repair/:vendor/:model" element={<RepairItemComponent />} />
          <Route path="/refill/:vendor" element={<RefillComponent />} />
          <Route path="/refill/:vendor/:model" element={<RefillItemComponent />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
      {background && (
          <Routes>
            <Route
              path={`${location.pathname}`}
              element={
                <Modal >
                  <FeedbackForm />
                </Modal>
              }
            />
          </Routes>
        )}
    </>
  );
}

export default App;