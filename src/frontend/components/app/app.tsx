import "./app.module.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "../../pages/layout/layout";
import Main from "../../pages/main/main";
import RepairComponent from "../repair-component/repair-component";
import RefillComponent from "../refill-component/refill-component";
import ContactsComponent from "../contacts-component/contacts-component";
import RefillItemComponent from "../refill-component/refill-item-component/refill-item-component";
import RepairItemComponent from "../repair-component/repair-item-component/repair-item-component";
import NotFound404 from "../../pages/not-found/not-found";
import SitemapGenerator from "../sitemap-generator/sitemap-generator";
import RepairLaptopsComponent from "../repair-laptops-component/repair-laptops-component";
import RepairLaptopsItemComponent from "../repair-laptops-component/repair-laptops-item-component/repair-laptops-item-component";
import { ScrollToTop } from '../scroll-to-top/scroll-to-top'
import { FirstVisitModal } from '../modal-components/first-visit-modal/first-visit-modal'
import { Modal } from "../modal/modal";
import { modalSlice } from "../../services/slices/modal";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";

export const App: React.FC = () => {

  const dispatch = useDispatch_();

  const { firstVisitModal } = useSelector_((state: any) => state.modalSlice);

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    if (!localStorage.getItem('printridgeFirstVisit')) {
      dispatch(modalSlice.actions.firstVisitModalState(true));
    }
  }, [firstVisitModal])

  return (
    <>
      {
        firstVisitModal &&
        <Modal action={modalSlice.actions.firstVisitModalState}>
          <FirstVisitModal />
        </Modal>
      }
      <ScrollToTop />
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
          <Route path="*" element={<NotFound404 />} />
        </Route>
      </Routes>
    </>
  );
};
