import React, { useEffect } from "react";
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { useDispatch_, useSelector_ } from "../../services/reducers/root-reducer";
import { fetchCurrentUser } from "../../services/slices/auth";
import { CartridgesPage } from "../cartridges/cartridges";
import { PrintersPage } from "../printers/printers";
import { ExamplesPage } from "../examples/examples";
import { LaptopsPage } from "../laptops/laptops";
import styles from "./profile.module.css";

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch_();
  const { isAuthenticated, isLoading } = useSelector_((state) => state.auth);

  useEffect(() => {
    // Проверяем авторизацию при монтировании компонента
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    // Редиректим только если не загружается и не авторизован
    if (!isLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Показываем загрузку или ничего, пока проверяется авторизация
  // На сервере всегда показываем loading для избежания hydration mismatch
  if (typeof window === 'undefined' || isLoading || !isAuthenticated) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <nav className={styles.nav}>
          <NavLink
            to="/profile/cartridges"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Картриджи
          </NavLink>
          <NavLink
            to="/profile/printers"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Принтеры
          </NavLink>
          <NavLink
            to="/profile/laptops"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Ноутбуки
          </NavLink>
          <NavLink
            to="/profile/examples"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            Примеры
          </NavLink>
        </nav>
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="cartridges" element={<CartridgesPage />} />
          <Route path="printers" element={<PrintersPage />} />
          <Route path="laptops" element={<LaptopsPage />} />
          <Route path="examples" element={<ExamplesPage />} />
          <Route index element={<div className={styles.welcome}>Выберите раздел в меню</div>} />
        </Routes>
      </div>
    </div>
  );
};
