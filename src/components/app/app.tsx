import './app.module.css';
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux"
import Modal from '../modal/modal'
import FeedbackForm from '../forms/feedback-form/feedback-form'
import Layout from '../../pages/layout/layout'
import Main from '../../pages/main/main'
import RepairComponent from '../../components/repair-component/repair-component'
import RefillComponent from '../../components/refill-component/refill-component'
import ContactsComponent from '../../components/contacts-component/contacts-component'
import RefillItemComponent from '../../components/refill-component/refill-item-component/refill-item-component'
import RepairItemComponent from '../../components/repair-component/repair-item-component/repair-item-component'
import NotFound404 from '../../pages/not-found/not-found'
import MainMenu from '../main-menu/main-menu'
import SitemapGenerator from '../sitemap-generator/sitemap-generator'
import RepairLaptopsComponent from '../repair-laptops-component/repair-laptops-component'
import RepairLaptopsItemComponent from '../repair-laptops-component/repair-laptops-item-component/repair-laptops-item-component'

const App: React.FC = () => {  
  
  const location = useLocation();
  const background = location.state && location.state.background;
  const { mobileMenuButton } = useSelector((state: any) => state.buttons);

  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/map" element={<SitemapGenerator />} />
          <Route path="/repair/:vendor" element={<RepairComponent />} />
          <Route path="/repair/:vendor/:model" element={<RepairItemComponent />} />
          <Route path="/refill/:vendor" element={<RefillComponent />} />
          <Route path="/refill/:vendor/:model" element={<RefillItemComponent />} />
          <Route path="/remont-noutbukov/:vendor" element={<RepairLaptopsComponent />} />
          <Route path="/remont-noutbukov/:vendor/:model" element={<RepairLaptopsItemComponent />} />
          <Route path="/contacts" element={<ContactsComponent />} />
          <Route path="/404" element={<NotFound404 />} />
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
        {mobileMenuButton && (
          <Routes>
            <Route
              path={`${location.pathname}`}
              element={
                <Modal >
                  <MainMenu position={'footer'} />
                </Modal>
              }
            />
          </Routes>
        )}
    </>
  );
}

export default App;