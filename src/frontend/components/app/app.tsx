import "./app.module.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "../../pages/layout/layout";
import Main from "../../pages/main/main";
import RepairPrintersPage from "../../pages/repair-printers-page/repair-printers-page";
import RefillCartridgesPage from "../../pages/refill-cartridges-page/refill-cartridges-page";
import ContactsPage from "../../pages/contacts-page/contacts-page";
import RefillItemComponent from "../../pages/refill-cartridges-page/refill-item-component/refill-item-component";
import RepairItemComponent from "../../pages/repair-printers-page/repair-item-component/repair-item-component";
import NotFound404 from "../../pages/not-found/not-found";
import RepairLaptopsPage from "../../pages/repair-laptops-page/repair-laptops-page";
import RepairLaptopsItemComponent from "../../pages/repair-laptops-page/repair-laptops-item-component/repair-laptops-item-component";
import { ScrollToTop } from '../scroll-to-top/scroll-to-top'
import { FirstVisitModal } from '../modal-components/first-visit-modal/first-visit-modal'
import { Modal } from "../modal/modal";
import { modalSlice } from "../../services/slices/modal";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { Login } from "../../pages/login/login";
import { Profile } from "../../pages/profile/profile";
import { BlogsPage } from '../../pages/blog-page/blog-page'
import { BlogItemPage } from '../../pages/blog-page/blog-item-page/blog-item-page'

export const App: React.FC = () => {

  const dispatch = useDispatch_();

  const { firstVisitModal } = useSelector_((state: any) => state.modalSlice);

  const location = useLocation();
  const background = location.state && location.state.background;

  useEffect(() => {
    // Проверяем только на клиенте, чтобы избежать проблем с SSR hydration
    if (typeof window !== 'undefined' && !localStorage.getItem('printridgeFirstVisit')) {
      dispatch(modalSlice.actions.firstVisitModalState(true));
    }
  }, [dispatch])

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
          <Route path="/blog" element={<BlogsPage />} />
          <Route path="/blog/:itemRoute" element={<BlogItemPage />} />
          <Route path="/repair/:vendor" element={<RepairPrintersPage />} />
          <Route path="/repair/:vendor/:model" element={<RepairItemComponent />} />
          <Route path="/refill/:vendor" element={<RefillCartridgesPage />} />
          <Route path="/refill/:vendor/:model" element={<RefillItemComponent />} />
          <Route path="/remont-noutbukov/:vendor" element={<RepairLaptopsPage />} />
          <Route path="/remont-noutbukov/:vendor/:model" element={<RepairLaptopsItemComponent />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<NotFound404 />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/profile/*" element={<Profile />} />
      </Routes>
    </>
  );
};
