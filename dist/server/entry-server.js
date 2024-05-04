import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server.mjs";
import { useEffect, useState, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { useDispatch, useSelector, Provider } from "react-redux";
import { useLocation, Link, NavLink, useParams, Outlet, Navigate, useNavigate, Routes, Route, BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { v4 } from "uuid";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
const MENU_MOBILE_BUTTON = "MENU_MOBILE_BUTTON";
const PHOTO_BUTTON = "PHOTO_BUTTON";
const VIDEO_BUTTON = "VIDEO_BUTTON";
const open_modal = "_open_modal_1g27s_1";
const modal_position = "_modal_position_1g27s_11";
const close_icon = "_close_icon_1g27s_35";
const site_name = "_site_name_1g27s_143";
const style$3 = {
  open_modal,
  modal_position,
  close_icon,
  site_name
};
const modal_overlay = "_modal_overlay_1c9nt_1";
const styles$D = {
  modal_overlay
};
const ModalOverlay = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: MENU_MOBILE_BUTTON,
      mobileMenuButton: false
    });
  };
  return /* @__PURE__ */ jsx(
    Link,
    {
      className: styles$D.modal_overlay,
      state: null,
      to: `${location.pathname}`,
      onClick: handleClick
    }
  );
};
let modalRoot;
if (typeof window !== "undefined") {
  modalRoot = document.getElementById("react-modals");
}
const Modal = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({
      type: MENU_MOBILE_BUTTON,
      mobileMenuButton: false
    });
  };
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsxs("div", { className: style$3.modal_position, children: [
      /* @__PURE__ */ jsx(ModalOverlay, {}),
      /* @__PURE__ */ jsxs("div", { className: style$3.open_modal, children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            className: style$3.close_icon,
            state: null,
            to: `${location.pathname}`,
            onClick: handleClick,
            children: "X"
          }
        ),
        children,
        /* @__PURE__ */ jsx("p", { className: style$3.site_name, children: "Printridge" })
      ] })
    ] }),
    modalRoot
  );
};
const conteiner = "_conteiner_4zdj7_1";
const title$6 = "_title_4zdj7_29";
const nputs_conteiner = "_nputs_conteiner_4zdj7_37";
const button$4 = "_button_4zdj7_51";
const styles$C = {
  conteiner,
  title: title$6,
  nputs_conteiner,
  button: button$4
};
const FeedbackForm = () => {
  const location = useLocation();
  const link2 = location.state.background.pathname;
  const service = link2.includes("repair") ? "ремонт принтера" : link2.includes("refill") ? "заправку картриджа" : null;
  return /* @__PURE__ */ jsxs("div", { className: styles$C.conteiner, children: [
    /* @__PURE__ */ jsx("h2", { className: styles$C.title, children: "Напишите нам" }),
    /* @__PURE__ */ jsx("p", { children: `Вы хотите заказать ${service}?` }),
    /* @__PURE__ */ jsxs("div", { className: styles$C.nputs_conteiner, children: [
      /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Введите ваше имя", name: "username", required: true }),
      /* @__PURE__ */ jsx("input", { type: "email", placeholder: "Введите ваш e-mail" }),
      /* @__PURE__ */ jsx("input", { type: "tel", placeholder: "Введите ваш номер телефона" }),
      /* @__PURE__ */ jsx("textarea", { rows: "8", cols: "50", placeholder: "Введите текст", name: "description", required: true })
    ] }),
    /* @__PURE__ */ jsx("button", { className: styles$C.button, children: "Отправить" })
  ] });
};
const container$i = "_container_qre2o_1";
const logo_container = "_logo_container_qre2o_19";
const info_box$3 = "_info_box_qre2o_37";
const logo_and_menu = "_logo_and_menu_qre2o_55";
const logo_and_menu_mobile = "_logo_and_menu_mobile_qre2o_73";
const link$5 = "_link_qre2o_81";
const phone_social_box = "_phone_social_box_qre2o_97";
const slogan_box = "_slogan_box_qre2o_111";
const slogan_big = "_slogan_big_qre2o_127";
const slogan_small = "_slogan_small_qre2o_141";
const images_box$1 = "_images_box_qre2o_155";
const mail_box = "_mail_box_qre2o_173";
const phone_box = "_phone_box_qre2o_197";
const phone_box_image = "_phone_box_image_qre2o_217";
const phone_text = "_phone_text_qre2o_225";
const image$5 = "_image_qre2o_155";
const logo_and_menu_mobile_button = "_logo_and_menu_mobile_button_qre2o_441";
const mobile_menu_button = "_mobile_menu_button_qre2o_489";
const styles$B = {
  container: container$i,
  logo_container,
  info_box: info_box$3,
  logo_and_menu,
  logo_and_menu_mobile,
  link: link$5,
  phone_social_box,
  slogan_box,
  slogan_big,
  slogan_small,
  images_box: images_box$1,
  mail_box,
  phone_box,
  phone_box_image,
  phone_text,
  image: image$5,
  logo_and_menu_mobile_button,
  mobile_menu_button
};
const main_menu_horisontal = "_main_menu_horisontal_15pvk_1";
const main_menu_vertical = "_main_menu_vertical_15pvk_17";
const link$4 = "_link_15pvk_33";
const link_footer = "_link_footer_15pvk_49";
const link_invisible = "_link_invisible_15pvk_73";
const main_menu_center_align = "_main_menu_center_align_15pvk_215";
const styles$A = {
  main_menu_horisontal,
  main_menu_vertical,
  link: link$4,
  link_footer,
  link_invisible,
  main_menu_center_align
};
function MainMenu({ position }) {
  const dispatch = useDispatch();
  const { mobileMenuButton } = useSelector((state) => state.buttons);
  const handleClick = () => {
    dispatch({
      type: MENU_MOBILE_BUTTON,
      mobileMenuButton: false
    });
  };
  return /* @__PURE__ */ jsxs("nav", { className: position === "header" && styles$A.main_menu_horisontal || (position === "footer" && mobileMenuButton ? styles$A.main_menu_center_align : styles$A.main_menu_vertical), children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: position === "footer" ? styles$A.link_footer : styles$A.link_invisible,
        to: "/",
        onClick: handleClick,
        children: "Главная"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: position === "header" && styles$A.link || position === "footer" && styles$A.link_footer,
        to: "/refill/hp",
        onClick: handleClick,
        children: "Заправка картриджей"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: position === "header" && styles$A.link || position === "footer" && styles$A.link_footer,
        to: "/repair/hp",
        onClick: handleClick,
        children: "Ремонт принтеров"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: position === "header" && styles$A.link || position === "footer" && styles$A.link_footer,
        to: "/remont-noutbukov/hp",
        onClick: handleClick,
        children: "Ремонт ноутбуков"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        className: position === "header" && styles$A.link || position === "footer" && styles$A.link_footer,
        to: "/contacts",
        onClick: handleClick,
        children: "Контакты"
      }
    )
  ] });
}
const imageCall = "data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_276_321'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='30'%20height='30'%3e%3crect%20width='30'%20height='30'%20fill='%23D9D9D9'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_276_321)'%3e%3cpath%20d='M24.9375%2026.25C22.3333%2026.25%2019.7604%2025.6823%2017.2188%2024.5469C14.6771%2023.4115%2012.3646%2021.8021%2010.2812%2019.7188C8.19792%2017.6354%206.58854%2015.3229%205.45313%2012.7812C4.31771%2010.2396%203.75%207.66667%203.75%205.0625C3.75%204.6875%203.875%204.375%204.125%204.125C4.375%203.875%204.6875%203.75%205.0625%203.75H10.125C10.4167%203.75%2010.6771%203.84896%2010.9062%204.04688C11.1354%204.24479%2011.2708%204.47917%2011.3125%204.75L12.125%209.125C12.1667%209.45833%2012.1562%209.73958%2012.0938%209.96875C12.0312%2010.1979%2011.9167%2010.3958%2011.75%2010.5625L8.71875%2013.625C9.13542%2014.3958%209.63021%2015.1406%2010.2031%2015.8594C10.776%2016.5781%2011.4062%2017.2708%2012.0938%2017.9375C12.7396%2018.5833%2013.4167%2019.1823%2014.125%2019.7344C14.8333%2020.2865%2015.5833%2020.7917%2016.375%2021.25L19.3125%2018.3125C19.5%2018.125%2019.7448%2017.9844%2020.0469%2017.8906C20.349%2017.7969%2020.6458%2017.7708%2020.9375%2017.8125L25.25%2018.6875C25.5417%2018.7708%2025.7812%2018.9219%2025.9688%2019.1406C26.1562%2019.3594%2026.25%2019.6042%2026.25%2019.875V24.9375C26.25%2025.3125%2026.125%2025.625%2025.875%2025.875C25.625%2026.125%2025.3125%2026.25%2024.9375%2026.25ZM7.53125%2011.25L9.59375%209.1875L9.0625%206.25H6.28125C6.38542%207.10417%206.53125%207.94792%206.71875%208.78125C6.90625%209.61458%207.17708%2010.4375%207.53125%2011.25ZM18.7188%2022.4375C19.5313%2022.7917%2020.3594%2023.0729%2021.2031%2023.2812C22.0469%2023.4896%2022.8958%2023.625%2023.75%2023.6875V20.9375L20.8125%2020.3438L18.7188%2022.4375Z'%20fill='white'/%3e%3c/g%3e%3c/svg%3e";
const imageEarth = "data:image/svg+xml,%3csvg%20width='30'%20height='30'%20viewBox='0%200%2030%2030'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_276_326'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='30'%20height='30'%3e%3crect%20width='30'%20height='30'%20fill='%23D9D9D9'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_276_326)'%3e%3cpath%20d='M15%2027.5C13.2917%2027.5%2011.6771%2027.1719%2010.1562%2026.5156C8.63542%2025.8594%207.30729%2024.9635%206.17188%2023.8281C5.03646%2022.6927%204.14063%2021.3646%203.48438%2019.8438C2.82812%2018.3229%202.5%2016.7083%202.5%2015C2.5%2013.2708%202.82812%2011.651%203.48438%2010.1406C4.14063%208.63021%205.03646%207.30729%206.17188%206.17188C7.30729%205.03646%208.63542%204.14063%2010.1562%203.48438C11.6771%202.82812%2013.2917%202.5%2015%202.5C16.7292%202.5%2018.349%202.82812%2019.8594%203.48438C21.3698%204.14063%2022.6927%205.03646%2023.8281%206.17188C24.9635%207.30729%2025.8594%208.63021%2026.5156%2010.1406C27.1719%2011.651%2027.5%2013.2708%2027.5%2015C27.5%2016.7083%2027.1719%2018.3229%2026.5156%2019.8438C25.8594%2021.3646%2024.9635%2022.6927%2023.8281%2023.8281C22.6927%2024.9635%2021.3698%2025.8594%2019.8594%2026.5156C18.349%2027.1719%2016.7292%2027.5%2015%2027.5ZM15%2024.9375C15.5417%2024.1875%2016.0104%2023.4063%2016.4062%2022.5938C16.8021%2021.7812%2017.125%2020.9167%2017.375%2020H12.625C12.875%2020.9167%2013.1979%2021.7812%2013.5938%2022.5938C13.9896%2023.4063%2014.4583%2024.1875%2015%2024.9375ZM11.75%2024.4375C11.375%2023.75%2011.0469%2023.0365%2010.7656%2022.2969C10.4844%2021.5573%2010.25%2020.7917%2010.0625%2020H6.375C6.97917%2021.0417%207.73438%2021.9479%208.64062%2022.7188C9.54688%2023.4896%2010.5833%2024.0625%2011.75%2024.4375ZM18.25%2024.4375C19.4167%2024.0625%2020.4531%2023.4896%2021.3594%2022.7188C22.2656%2021.9479%2023.0208%2021.0417%2023.625%2020H19.9375C19.75%2020.7917%2019.5156%2021.5573%2019.2344%2022.2969C18.9531%2023.0365%2018.625%2023.75%2018.25%2024.4375ZM5.3125%2017.5H9.5625C9.5%2017.0833%209.45312%2016.6719%209.42188%2016.2656C9.39062%2015.8594%209.375%2015.4375%209.375%2015C9.375%2014.5625%209.39062%2014.1406%209.42188%2013.7344C9.45312%2013.3281%209.5%2012.9167%209.5625%2012.5H5.3125C5.20833%2012.9167%205.13021%2013.3281%205.07812%2013.7344C5.02604%2014.1406%205%2014.5625%205%2015C5%2015.4375%205.02604%2015.8594%205.07812%2016.2656C5.13021%2016.6719%205.20833%2017.0833%205.3125%2017.5ZM12.0625%2017.5H17.9375C18%2017.0833%2018.0469%2016.6719%2018.0781%2016.2656C18.1094%2015.8594%2018.125%2015.4375%2018.125%2015C18.125%2014.5625%2018.1094%2014.1406%2018.0781%2013.7344C18.0469%2013.3281%2018%2012.9167%2017.9375%2012.5H12.0625C12%2012.9167%2011.9531%2013.3281%2011.9219%2013.7344C11.8906%2014.1406%2011.875%2014.5625%2011.875%2015C11.875%2015.4375%2011.8906%2015.8594%2011.9219%2016.2656C11.9531%2016.6719%2012%2017.0833%2012.0625%2017.5ZM20.4375%2017.5H24.6875C24.7917%2017.0833%2024.8698%2016.6719%2024.9219%2016.2656C24.974%2015.8594%2025%2015.4375%2025%2015C25%2014.5625%2024.974%2014.1406%2024.9219%2013.7344C24.8698%2013.3281%2024.7917%2012.9167%2024.6875%2012.5H20.4375C20.5%2012.9167%2020.5469%2013.3281%2020.5781%2013.7344C20.6094%2014.1406%2020.625%2014.5625%2020.625%2015C20.625%2015.4375%2020.6094%2015.8594%2020.5781%2016.2656C20.5469%2016.6719%2020.5%2017.0833%2020.4375%2017.5ZM19.9375%2010H23.625C23.0208%208.95833%2022.2656%208.05208%2021.3594%207.28125C20.4531%206.51042%2019.4167%205.9375%2018.25%205.5625C18.625%206.25%2018.9531%206.96354%2019.2344%207.70312C19.5156%208.44271%2019.75%209.20833%2019.9375%2010ZM12.625%2010H17.375C17.125%209.08333%2016.8021%208.21875%2016.4062%207.40625C16.0104%206.59375%2015.5417%205.8125%2015%205.0625C14.4583%205.8125%2013.9896%206.59375%2013.5938%207.40625C13.1979%208.21875%2012.875%209.08333%2012.625%2010ZM6.375%2010H10.0625C10.25%209.20833%2010.4844%208.44271%2010.7656%207.70312C11.0469%206.96354%2011.375%206.25%2011.75%205.5625C10.5833%205.9375%209.54688%206.51042%208.64062%207.28125C7.73438%208.05208%206.97917%208.95833%206.375%2010Z'%20fill='white'/%3e%3c/g%3e%3c/svg%3e";
function HeaderComponent() {
  const { mobileMenuButton } = useSelector((state) => state.buttons);
  const dispatch = useDispatch();
  const location = useLocation();
  const { vendor: vendor2 } = useParams();
  const handleClick = () => {
    if (!mobileMenuButton) {
      dispatch({
        type: MENU_MOBILE_BUTTON,
        mobileMenuButton: true
      });
    } else {
      dispatch({
        type: MENU_MOBILE_BUTTON,
        mobileMenuButton: false
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$B.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$B.logo_container, children: /* @__PURE__ */ jsxs("div", { className: styles$B.info_box, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$B.logo_and_menu, children: [
        /* @__PURE__ */ jsx(
          NavLink,
          {
            className: styles$B.link,
            to: "/",
            children: "Printridge"
          }
        ),
        /* @__PURE__ */ jsx(MainMenu, { position: "header" })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$B.logo_and_menu_mobile, children: /* @__PURE__ */ jsxs("div", { className: styles$B.logo_and_menu_mobile_button, children: [
        /* @__PURE__ */ jsx(
          NavLink,
          {
            className: styles$B.link,
            to: "/",
            children: "Printridge"
          }
        ),
        /* @__PURE__ */ jsx(
          NavLink,
          {
            className: styles$B.mobile_menu_button,
            onClick: handleClick
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: styles$B.slogan_box, children: [
        /* @__PURE__ */ jsx("h1", { className: styles$B.slogan_big, children: location.pathname.includes("refill") && `Заправка картриджей ${vendor2 === void 0 ? "" : vendor2.toUpperCase()}` || location.pathname.includes("repair") && "Ремонт принтеров и МФУ" || location.pathname.includes("remont-noutbukov") && "Ремонт ноутбуков" || "Printridge — решение проблем с компьютерной техникой" }),
        /* @__PURE__ */ jsx("p", { className: styles$B.slogan_small, children: location.pathname.includes("refill") && "Заправка картриджей помогает существенно экономить на печати" || location.pathname.includes("repair") && "Ремонт принтеров и МФУ осуществляется на выезде и в нашем офисе" || location.pathname.includes("remont-noutbukov") && "Ремонт ноутбуков осуществляется на выезде и в нашем офисе" || "Заправка картриджей всех видов и ремонт принтеров любой модели и любой сложности" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: styles$B.images_box, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$B.mail_box, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$B.phone_box, children: [
          /* @__PURE__ */ jsx("img", { className: styles$B.phone_box_image, src: imageCall, alt: "Трубка" }),
          /* @__PURE__ */ jsx(
            NavLink,
            {
              className: styles$B.phone_text,
              to: `tel:+79944390149`,
              children: "+7 994 439-01-49"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: styles$B.phone_box, children: [
          /* @__PURE__ */ jsx("img", { className: styles$B.phone_box_image, src: imageEarth, alt: "Трубка" }),
          /* @__PURE__ */ jsx(
            NavLink,
            {
              className: styles$B.phone_text,
              to: `mailto:sales@printridge.ru`,
              children: "sales@printridge.ru"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$B.image, children: " " })
    ] })
  ] });
}
const footer = "_footer_1675q_1";
const footer_box = "_footer_box_1675q_19";
const adress_box = "_adress_box_1675q_37";
const adress_container = "_adress_container_1675q_57";
const location_img = "_location_img_1675q_75";
const adress_text = "_adress_text_1675q_87";
const site_name_text = "_site_name_text_1675q_107";
const user_agreement_text = "_user_agreement_text_1675q_125";
const menu_box = "_menu_box_1675q_153";
const contacts_box = "_contacts_box_1675q_173";
const contacts = "_contacts_1675q_173";
const phone = "_phone_1675q_213";
const email = "_email_1675q_233";
const social_box = "_social_box_1675q_253";
const styles$z = {
  footer,
  footer_box,
  adress_box,
  adress_container,
  location_img,
  adress_text,
  site_name_text,
  user_agreement_text,
  menu_box,
  contacts_box,
  contacts,
  phone,
  email,
  social_box
};
const locationImg = "data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cmask%20id='mask0_196_38'%20style='mask-type:alpha'%20maskUnits='userSpaceOnUse'%20x='0'%20y='0'%20width='24'%20height='24'%3e%3crect%20width='24'%20height='24'%20fill='%23D9D9D9'/%3e%3c/mask%3e%3cg%20mask='url(%23mask0_196_38)'%3e%3cpath%20d='M12%2012C12.55%2012%2013.0208%2011.8042%2013.4125%2011.4125C13.8042%2011.0208%2014%2010.55%2014%2010C14%209.45%2013.8042%208.97917%2013.4125%208.5875C13.0208%208.19583%2012.55%208%2012%208C11.45%208%2010.9792%208.19583%2010.5875%208.5875C10.1958%208.97917%2010%209.45%2010%2010C10%2010.55%2010.1958%2011.0208%2010.5875%2011.4125C10.9792%2011.8042%2011.45%2012%2012%2012ZM12%2019.35C14.0333%2017.4833%2015.5417%2015.7875%2016.525%2014.2625C17.5083%2012.7375%2018%2011.3833%2018%2010.2C18%208.38333%2017.4208%206.89583%2016.2625%205.7375C15.1042%204.57917%2013.6833%204%2012%204C10.3167%204%208.89583%204.57917%207.7375%205.7375C6.57917%206.89583%206%208.38333%206%2010.2C6%2011.3833%206.49167%2012.7375%207.475%2014.2625C8.45833%2015.7875%209.96667%2017.4833%2012%2019.35ZM12%2022C9.31667%2019.7167%207.3125%2017.5958%205.9875%2015.6375C4.6625%2013.6792%204%2011.8667%204%2010.2C4%207.7%204.80417%205.70833%206.4125%204.225C8.02083%202.74167%209.88333%202%2012%202C14.1167%202%2015.9792%202.74167%2017.5875%204.225C19.1958%205.70833%2020%207.7%2020%2010.2C20%2011.8667%2019.3375%2013.6792%2018.0125%2015.6375C16.6875%2017.5958%2014.6833%2019.7167%2012%2022Z'%20fill='%23005CE5'/%3e%3c/g%3e%3c/svg%3e";
const icons_box = "_icons_box_4a42b_1";
const icon_vk = "_icon_vk_4a42b_19";
const icon_telegram = "_icon_telegram_4a42b_47";
const styles$y = {
  icons_box,
  icon_vk,
  icon_telegram
};
const SocialIcons = () => {
  return /* @__PURE__ */ jsxs("div", { className: styles$y.icons_box, children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        className: styles$y.icon_vk,
        to: "https://vk.com/printridgespb",
        target: "_blank",
        rel: "noopener noreferrer"
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: styles$y.icon_telegram,
        to: "https://t.me/DenFoxPrint",
        target: "_blank",
        rel: "noopener noreferrer"
      }
    )
  ] });
};
function FooterComponent() {
  return /* @__PURE__ */ jsxs("section", { className: styles$z.footer, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$z.footer_box, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$z.adress_box, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$z.adress_container, children: [
          /* @__PURE__ */ jsx("img", { className: styles$z.location_img, src: locationImg, alt: "location" }),
          /* @__PURE__ */ jsx(
            Link,
            {
              className: styles$z.adress_text,
              to: `yandexnavi://search?text='Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'`,
              children: "Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("p", { className: styles$z.site_name_text, children: "Printridge" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$z.menu_box, children: [
        /* @__PURE__ */ jsx(MainMenu, { position: "footer" }),
        /* @__PURE__ */ jsx(Link, { className: styles$z.user_agreement_text, children: "Пользовательское соглашение" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$z.footer_box, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$z.contacts_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$z.contacts, children: "Контактная информация" }),
        /* @__PURE__ */ jsx(
          Link,
          {
            className: styles$z.phone,
            to: `tel:+79944390149`,
            children: "+7 994 439-01-49"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            className: styles$z.email,
            to: `mailto:sales@printridge.ru`,
            children: "sales@printridge.ru"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: styles$z.social_box, children: /* @__PURE__ */ jsx(SocialIcons, {}) })
    ] })
  ] });
}
const container$h = "_container_x0px1_1";
const info_box$2 = "_info_box_x0px1_23";
const title$5 = "_title_x0px1_41";
const description$4 = "_description_x0px1_59";
const button$3 = "_button_x0px1_77";
const styles$x = {
  container: container$h,
  info_box: info_box$2,
  title: title$5,
  description: description$4,
  button: button$3
};
const FeedbackButtonComponent = () => {
  useLocation();
  return /* @__PURE__ */ jsxs("div", { className: styles$x.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$x.info_box, children: [
      /* @__PURE__ */ jsx("p", { className: styles$x.title, children: "Остались вопросы?" }),
      /* @__PURE__ */ jsx("p", { className: styles$x.description, children: "Вы можете связаться с нами с помощью формы “Обратной связи”, наши специалисты ответят вам в течении рабочего дня." })
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: styles$x.button,
        to: "https://t.me/DenFoxPrint",
        target: "_blank",
        rel: "noopener noreferrer",
        children: "Написать"
      }
    )
  ] });
};
const app = "_app_8rzss_1";
const main = "_main_8rzss_19";
const styles$w = {
  app,
  main
};
const Layout = () => {
  return /* @__PURE__ */ jsxs("div", { className: styles$w.app, children: [
    /* @__PURE__ */ jsx(HeaderComponent, {}),
    /* @__PURE__ */ jsx("main", { className: styles$w.main, children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(FeedbackButtonComponent, {}),
    /* @__PURE__ */ jsx(FooterComponent, {})
  ] });
};
const main_box = "_main_box_1bl8c_1";
const styles$v = {
  main_box
};
const container$g = "_container_134c3_1";
const content_box = "_content_box_134c3_23";
const link_image_to_refill = "_link_image_to_refill_134c3_39";
const link_image_to_repair = "_link_image_to_repair_134c3_79";
const title$4 = "_title_134c3_119";
const description$3 = "_description_134c3_133";
const link_image_to_refill_mobile = "_link_image_to_refill_mobile_134c3_147";
const link_image_to_repair_mobile = "_link_image_to_repair_mobile_134c3_163";
const mobile_button = "_mobile_button_134c3_179";
const button_name = "_button_name_134c3_505";
const styles$u = {
  container: container$g,
  content_box,
  link_image_to_refill,
  link_image_to_repair,
  title: title$4,
  description: description$3,
  link_image_to_refill_mobile,
  link_image_to_repair_mobile,
  mobile_button,
  button_name
};
const MainPageDescriptionBox = ({ title: title2, description: description2, name: name2 }) => {
  return /* @__PURE__ */ jsxs("section", { className: styles$u.container, children: [
    /* @__PURE__ */ jsx(
      Link,
      {
        className: name2 === "refill" && styles$u.link_image_to_refill_mobile || name2 === "repair" && styles$u.link_image_to_repair_mobile || name2 === "remont-noutbukov" && styles$u.link_image_to_refill_mobile,
        to: name2 === "refill" && "/refill/hp" || name2 === "repair" && "/repair/hp" || name2 === "remont-noutbukov" && "/remont-noutbukov/hp"
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: styles$u.content_box, children: [
      /* @__PURE__ */ jsx("p", { className: styles$u.title, children: title2 }),
      /* @__PURE__ */ jsx("p", { className: styles$u.description, children: description2 })
    ] }),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: name2 === "refill" && styles$u.link_image_to_refill || name2 === "repair" && styles$u.link_image_to_repair || name2 === "remont-noutbukov" && styles$u.link_image_to_refill,
        to: name2 === "refill" && "/refill/hp" || name2 === "repair" && "/repair/hp" || name2 === "remont-noutbukov" && "/remont-noutbukov/hp"
      }
    ),
    /* @__PURE__ */ jsx(
      Link,
      {
        className: styles$u.mobile_button,
        to: name2 === "refill" && "/refill/hp" || name2 === "repair" && "/repair/hp" || name2 === "remont-noutbukov" && "/remont-noutbukov/hp",
        children: /* @__PURE__ */ jsx("p", { className: styles$u.button_name, children: "Подробнее" })
      }
    )
  ] });
};
const mainDescriptionBoxes = [
  {
    name: "refill",
    title: "Заправка картриджей",
    description: "Заправка картриджей в компании ПРИНТРИДЖ это всегда высокое качество, при доступной цене. Наши инженеры имеют опыт работы более 15 лет. Для заправки используются тонеры, зарекомендовавшие себя с положительной стороны. Мы не меняем тонеры, потому качество печати будет всегда одинаково, но протяжении всего сотрудничества."
  },
  {
    name: "repair",
    title: "Ремонт принтеров",
    description: "Мы ремонтируем принтеры с использованием только оригинальных запчастей. Но, по желанию клиента, возможна установка совместимых. Диагностика неисправностей без выезда осуществляется БЕСПЛАТНО. Возможно разовое и абонентское техническое обслуживание. Ремонт осуществляется как на выезде, так и в стационаре. Возможна доставка принтеров и МФУ в ремонт и обратно."
  },
  {
    name: "remont-noutbukov",
    title: "Ремонт ноутбуков",
    description: "Ремонт ноутбуков в нашей компании это гарантия качества выполненных работ. Мы выполняем чистку ноутбуков, замену термопасты, установку операционных систем и программ, и многое другое. Ремонт возможен не только в нашем офисе, но и на выезде. Выезд обговаривается отдельно."
  }
];
const Main = () => {
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = "Компания ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге";
    document.querySelector('meta[name="title"]').setAttribute("content", `Компания ПРИНТРИДЖ. Заправка картриджей, ремонт принтеров и мфу, ремонт ноутбуков в Санкт-Петербурге`);
    document.querySelector('meta[name="description"]').setAttribute("content", `ПРИНТРИДЖ, главная страница`);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
        ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`);
  }, []);
  return /* @__PURE__ */ jsx("div", { className: styles$v.main_box, children: mainDescriptionBoxes.map((i, key) => /* @__PURE__ */ jsx(MainPageDescriptionBox, { title: i.title, description: i.description, name: i.name }, key)) });
};
const container$f = "_container_1uhnk_1";
const title_box$2 = "_title_box_1uhnk_23";
const description$2 = "_description_1uhnk_41";
const styles$t = {
  container: container$f,
  title_box: title_box$2,
  description: description$2
};
const price_row$5 = "_price_row_15w3f_1";
const link$3 = "_link_15w3f_39";
const model$3 = "_model_15w3f_49";
const type$1 = "_type_15w3f_73";
const device$1 = "_device_15w3f_103";
const format$1 = "_format_15w3f_127";
const speed$1 = "_speed_15w3f_151";
const capacity$1 = "_capacity_15w3f_175";
const separator$5 = "_separator_15w3f_283";
const styles$s = {
  price_row: price_row$5,
  link: link$3,
  model: model$3,
  type: type$1,
  device: device$1,
  format: format$1,
  speed: speed$1,
  capacity: capacity$1,
  separator: separator$5
};
const RepairItem = ({ type: type2, device: device2, vend, model: model2, format: format2, speed: speed2, capacity: capacity2, examples }) => {
  const location = useLocation();
  const locationPathname = location.pathname;
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `${locationPathname}/${model2.replace(/\s/g, "")}`,
      className: styles$s.link,
      children: /* @__PURE__ */ jsxs("div", { className: styles$s.price_row, children: [
        /* @__PURE__ */ jsx("p", { className: styles$s.model, children: model2 }),
        /* @__PURE__ */ jsx("p", { className: styles$s.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.type, children: type2 === "mono" ? device2 === "printer" ? "Монохромный" : "Монохромное" : device2 === "printer" ? "Цветной" : "Цветное" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.device, children: device2 === "printer" ? "Принтер" : "МФУ" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.format, children: format2 }),
        /* @__PURE__ */ jsx("p", { className: styles$s.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.speed, children: `Скорость ${speed2}` }),
        /* @__PURE__ */ jsx("p", { className: styles$s.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$s.capacity, children: `Нагрузка до ${capacity2} стр./месяц` })
      ] })
    },
    model2
  );
};
const input = "_input_1hcye_1";
const styles$r = {
  input
};
const SEARCH_DATA_REQUEST = "SEARCH_DATA_REQUEST";
const Filter = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  useEffect(() => {
    dispatch({
      type: SEARCH_DATA_REQUEST,
      value
    });
  }, [value, dispatch]);
  return /* @__PURE__ */ jsx(
    "input",
    {
      type: "text",
      name: "search",
      placeholder: "Введите модель картриджа",
      className: styles$r.input,
      onChange: (e) => setValue(e.target.value)
    }
  );
};
const price_container$4 = "_price_container_1p0hh_1";
const price_row$4 = "_price_row_1p0hh_37";
const model$2 = "_model_1p0hh_69";
const type = "_type_1p0hh_93";
const device = "_device_1p0hh_123";
const format = "_format_1p0hh_147";
const speed = "_speed_1p0hh_171";
const capacity = "_capacity_1p0hh_195";
const separator$4 = "_separator_1p0hh_327";
const styles$q = {
  price_container: price_container$4,
  price_row: price_row$4,
  model: model$2,
  type,
  device,
  format,
  speed,
  capacity,
  separator: separator$4
};
function RepairItemsComponent({ data }) {
  useParams();
  const filterValue = useSelector((state) => state.filter.value.value);
  const filteredData = data.filter((i) => i.model.toLowerCase().includes(filterValue === void 0 ? "" : filterValue.toLowerCase()) || i.vendor.toLowerCase().includes(filterValue === void 0 ? "" : filterValue.toLowerCase()));
  return /* @__PURE__ */ jsxs("div", { className: styles$q.price_container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$q.price_row, children: [
      /* @__PURE__ */ jsx("p", { className: styles$q.model, children: "Устройство" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.type, children: "Способ печати" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.device, children: "Устройство" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.format, children: "Формат" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.speed, children: "Скорость" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$q.capacity, children: "Нагрузка" })
    ] }),
    filteredData.map((i, key) => {
      return /* @__PURE__ */ jsx(
        RepairItem,
        {
          type: i.type,
          device: i.device,
          vend: i.vendor,
          model: i.model,
          format: i.format,
          speed: i.speed,
          capacity: i.capacity,
          examples: i.examples
        },
        key
      );
    })
  ] });
}
const navigation$2 = "_navigation_1wpou_1";
const item_link$2 = "_item_link_1wpou_23";
const item_link_active$2 = "_item_link_active_1wpou_53";
const style$2 = {
  navigation: navigation$2,
  item_link: item_link$2,
  item_link_active: item_link_active$2
};
function VendorMenuRepair() {
  const { vendor: vendor2 } = useParams();
  return /* @__PURE__ */ jsxs("nav", { className: style$2.navigation, children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/hp",
        className: vendor2 === "hp" ? style$2.item_link_active : style$2.item_link,
        children: "HP"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/canon",
        className: vendor2 === "canon" ? style$2.item_link_active : style$2.item_link,
        children: "Canon"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/samsung",
        className: vendor2 === "samsung" ? style$2.item_link_active : style$2.item_link,
        children: "Samsung"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/kyocera",
        className: vendor2 === "kyocera" ? style$2.item_link_active : style$2.item_link,
        children: "Kyocera"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/xerox",
        className: vendor2 === "xerox" ? style$2.item_link_active : style$2.item_link,
        children: "Xerox"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/oki",
        className: vendor2 === "oki" ? style$2.item_link_active : style$2.item_link,
        children: "OKI"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/minolta",
        className: vendor2 === "minolta" ? style$2.item_link_active : style$2.item_link,
        children: "Minolta"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/epson",
        className: vendor2 === "epson" ? style$2.item_link_active : style$2.item_link,
        children: "Epson"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/repair/sharp",
        className: vendor2 === "sharp" ? style$2.item_link_active : style$2.item_link,
        children: "Sharp"
      }
    )
  ] });
}
const repairPrintersPrice = [
  {
    vendor: "hp",
    model: "LaserJet 1010",
    cartridges: [
      "Q2612A"
    ],
    device: "printer",
    type: "mono",
    format: "A4",
    capacity: 2e3,
    speed: 8,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet M602",
    cartridges: [
      "CE390A",
      "CE390X"
    ],
    device: "printer",
    type: "mono",
    format: "A4",
    capacity: 22e3,
    speed: 50,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet 5000",
    cartridges: [
      "C4129X"
    ],
    device: "printer",
    type: "mono",
    format: "A3",
    capacity: 1e4,
    speed: 16,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet M1536",
    cartridges: [
      "CE278A"
    ],
    device: "MFU",
    type: "mono",
    format: "A4",
    capacity: 2100,
    speed: 25,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet M725",
    cartridges: [
      "CF214A",
      "CF214X"
    ],
    device: "MFU",
    type: "mono",
    format: "A3",
    capacity: 2e4,
    speed: 41,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "132a",
    cartridges: [
      "CF218A",
      "CF219A"
    ],
    device: "MFU",
    type: "mono",
    format: "A4",
    capacity: 1e4,
    speed: 22,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "135a",
    cartridges: [
      "W1106A"
    ],
    device: "MFU",
    type: "mono",
    format: "A4",
    capacity: 1e4,
    speed: 20,
    price: {},
    examples: [
      {
        title: "Перепрошивка HP Laser MFP 135a",
        photo: [
          {
            item: "pereproshivka-135-1.jpg"
          },
          {
            item: "pereproshivka-135-2.jpg"
          },
          {
            item: "pereproshivka-135-3.jpg"
          },
          {
            item: "pereproshivka-135-4.jpg"
          },
          {
            item: "pereproshivka-135-5.jpg"
          },
          {
            item: "pereproshivka-135-6.jpg"
          },
          {
            item: "pereproshivka-135-6.png"
          },
          {
            item: "pereproshivka-135-7.png"
          },
          {
            item: "pereproshivka-135-8.jpg"
          },
          {
            item: "pereproshivka-135-9.jpg"
          },
          {
            item: "pereproshivka-135-10.jpg"
          },
          {
            item: "pereproshivka-135-11.jpg"
          },
          {
            item: "pereproshivka-135-12.png"
          },
          {
            item: "pereproshivka-135-13.jpg"
          },
          {
            item: "pereproshivka-135-14.jpg"
          },
          {
            item: "pereproshivka-135-15.jpg"
          },
          {
            item: "pereproshivka-135-16.jpg"
          }
        ],
        video: [
          "https://www.youtube.com/embed/VFPE9apgRC0"
        ],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже мы кратко опишем процесс ",
            /* @__PURE__ */ jsx("strong", { children: "перепрошивки мфу HP Laser MFP 135a" }),
            " и возможные трудности, при её выполнении."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Перепрошивка современных принтеров и мфу HP, в большинстве случаев, достаточно сложный процесс. Этот процесс сильно отличается от старших братьев Samsung (да-да, современные HP, когда-то были Samsung-ами). Мы столкнулись именно с таким случаем.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Просто перепрошить мфу с версией заводской прошивки V3.82.01.15 не получится! Обновление микропрограммы по USB невозможно. Приходится пользоваться программатором и специальным софтом. Для этого с аппарата снимается плата форматтера и выпаивается микросхема, либо цепляется прищепка, как в нашем случае. И даже при наличии навыков, данная процедура получилась не сразу. После первой попытки аппарат не включился, на экране высветились чёрные квадратики и никаких признаков жизни не наблюдалось. Пришлось шить микросхему 4 раза, только тогда всё заработало.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "После манипуляций с программатором, появилась возможность ",
            /* @__PURE__ */ jsx("strong", { children: "прошить мфу HP Laser MFP 135a" }),
            " стандартным способом. После всех манипуляций необходимо заклеить на картридже чип и убедиться, что мфу может работать без него."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    vendor: "hp",
    model: "LaserJet CP1025",
    cartridges: [
      "CE310A",
      "CE311A",
      "CE312A",
      "CE313A"
    ],
    device: "printer",
    type: "color",
    format: "A4",
    capacity: 12e3,
    speed: 16,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet CP5225",
    cartridges: [
      "CE740A",
      "CE741A",
      "CE742A",
      "CE743A"
    ],
    device: "printer",
    type: "color",
    format: "A3",
    capacity: 7300,
    speed: 20,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet M175",
    cartridges: [
      "CE310A",
      "CE311A",
      "CE312A",
      "CE313A"
    ],
    device: "MFU",
    type: "color",
    format: "A4",
    capacity: 1e3,
    speed: 16,
    price: {},
    examples: []
  },
  {
    vendor: "hp",
    model: "LaserJet M775",
    cartridges: [
      "CE340A",
      "CE341A",
      "CE342A",
      "CE343A"
    ],
    device: "MFU",
    type: "color",
    format: "A3",
    capacity: 16e3,
    speed: 30,
    price: {},
    examples: []
  },
  {
    vendor: "canon",
    model: "LBP-3300",
    cartridges: [
      "708",
      "708H"
    ],
    device: "printer",
    type: "mono",
    format: "A4",
    capacity: 2500,
    speed: 21,
    price: {},
    examples: []
  },
  {
    model: "LaserJet P1102",
    format: "A4",
    speed: 18,
    capacity: 5e3,
    cartridges: [
      "CE285A"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: [
      {
        title: "Замена ролика",
        photo: [
          {
            item: "P1102-1.jpg"
          },
          {
            item: "P1102-2.jpg"
          },
          {
            item: "P1102-3.jpg"
          },
          {
            item: "P1102-4.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "В этом примере показывается процесс ",
            /* @__PURE__ */ jsx("strong", { children: "замены ролика захвата для HP LaserJet P1102" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Данная процедура достаточно проста и выполняется как в нашем офисе, так и на выезде. Весь ремонт занимает не более 10 минут.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Как правило, если ваш принтер не захватывает бумагу, дело именно в износе ролика захвата. Резинка со временем стирается, забивается бумажной пылью и мелом, и проскальзывает, во время захвата. В некоторых случаях, когда износ небольшой, может спасти салфетка и спирт. Протерев ролик, вы можете продлить ему жизнь, но это не надолго. Менять придётся в любом случае.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Во время замены неплохо сделать и техническое обслуживание, почистить принтер от просыпанного тонера и прочего мусора. Прикрепляем так же есть фото сравнения изношенного и нового ",
            /* @__PURE__ */ jsx("strong", { children: "роликов HP P1102" }),
            "."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "LaserJet M201",
    format: "A4",
    speed: 25,
    capacity: 8e3,
    cartridges: [
      "CF283A"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet P2035",
    format: "A4",
    speed: 30,
    capacity: 25e3,
    cartridges: [
      "CE505A"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet P2055",
    format: "A4",
    speed: 30,
    capacity: 25e3,
    cartridges: [
      "CE505A",
      "CE505X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M401",
    format: "A4",
    speed: 33,
    capacity: 5e4,
    cartridges: [
      "CF280A",
      "CF280X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M402",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "CF226A",
      "CF226X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M404",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "CF259A",
      "CF259X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M428",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "CF259A",
      "CF259X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: [
      {
        title: "HP M428 ругается на чип",
        photo: [
          {
            item: "adbd-de6b191efc12.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ошибка: ",
            /* @__PURE__ */ jsx("strong", { children: "Указанные картриджи были заблокированы микропрограммой принтера HP M428" })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Возможно что в принтере стоит защита от неоригинальных картриджей. В таком случае, принтер будет работать только с оригинальными чипами.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Решение:" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Для того чтобы отключить защиту, нужно зайти в веб-интерфейс мфу и открыть ",
            /* @__PURE__ */ jsx("strong", { children: "«Параметры»" }),
            ". Найти там пункт ",
            /* @__PURE__ */ jsx("strong", { children: "«Параметры расходных материалов»" }),
            ". В открывшемся окне настроек есть раздел ",
            /* @__PURE__ */ jsx("strong", { children: "«Использование картриджей»" }),
            ", который и отвечает за проверку картриджей на оригинальность. Выключаем его и сохраняем настройки. После этого МФУ должно работать с любыми картриджами."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "LaserJet P3015",
    format: "A4",
    speed: 40,
    capacity: 1e4,
    cartridges: [
      "CE255A",
      "CE255X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M506",
    format: "A4",
    speed: 43,
    capacity: 15e3,
    cartridges: [
      "CF287A",
      "CF287X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M604",
    format: "A4",
    speed: 50,
    capacity: 17500,
    cartridges: [
      "CF281A",
      "CF281X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M601",
    format: "A4",
    speed: 43,
    capacity: 17500,
    cartridges: [
      "CE390A",
      "CE390X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet P4014",
    format: "A4",
    speed: 43,
    capacity: 17500,
    cartridges: [
      "CC364A",
      "CC364X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M605",
    format: "A4",
    speed: 55,
    capacity: 22500,
    cartridges: [
      "CF281A",
      "CF281X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M602",
    format: "A4",
    speed: 50,
    capacity: 22500,
    cartridges: [
      "CE390A",
      "CE390X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet P4515",
    format: "A4",
    speed: 60,
    capacity: 22500,
    cartridges: [
      "CC364A",
      "CC364X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet P4015",
    format: "A4",
    speed: 60,
    capacity: 22500,
    cartridges: [
      "CC364A",
      "CC364X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M606",
    format: "A4",
    speed: 62,
    capacity: 27500,
    cartridges: [
      "CF281A",
      "CF281X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M603",
    format: "A4",
    speed: 60,
    capacity: 27500,
    cartridges: [
      "CE390A",
      "CE390X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet 5200",
    format: "A3",
    speed: 35,
    capacity: 65e3,
    cartridges: [
      "Q7516A"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M712",
    format: "A3",
    speed: 41,
    capacity: 1e4,
    cartridges: [
      "CF214A",
      "CF214X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M806",
    format: "A3",
    speed: 56,
    capacity: 3e4,
    cartridges: [
      "CF325X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet 9050",
    format: "A3",
    speed: 50,
    capacity: 3e4,
    cartridges: [
      "C8543X"
    ],
    device: "printer",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet 3050",
    format: "A4",
    speed: 18,
    capacity: 7e3,
    cartridges: [
      "Q2612A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M125",
    format: "A4",
    speed: 20,
    capacity: 8e3,
    cartridges: [
      "CF283A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M225",
    format: "A4",
    speed: 25,
    capacity: 8e3,
    cartridges: [
      "CF283A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M127",
    format: "A4",
    speed: 21,
    capacity: 8e3,
    cartridges: [
      "CF283A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M1212",
    format: "A4",
    speed: 18,
    capacity: 8e3,
    cartridges: [
      "CE285A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M1319",
    format: "A4",
    speed: 19,
    capacity: 8e3,
    cartridges: [
      "Q2612A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M1217",
    format: "A4",
    speed: 18,
    capacity: 8e3,
    cartridges: [
      "CE285A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M425",
    format: "A4",
    speed: 33,
    capacity: 5e4,
    cartridges: [
      "CF280A",
      "CF280X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M521",
    format: "A4",
    speed: 40,
    capacity: 75e3,
    cartridges: [
      "CE255A",
      "CE255X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M525",
    format: "A4",
    speed: 40,
    capacity: 75e3,
    cartridges: [
      "CE255A",
      "CE255X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M3027",
    format: "A4",
    speed: 25,
    capacity: 75e3,
    cartridges: [
      "Q7551A",
      "Q7551X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M3035",
    format: "A4",
    speed: 33,
    capacity: 75e3,
    cartridges: [
      "Q7551A",
      "Q7551X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M426",
    format: "A4",
    speed: 40,
    capacity: 8e4,
    cartridges: [
      "CF226A",
      "CF226X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M630",
    format: "A4",
    speed: 57,
    capacity: 25e3,
    cartridges: [
      "CF281A",
      "CF281X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M4555",
    format: "A4",
    speed: 55,
    capacity: 25e3,
    cartridges: [
      "CE390A",
      "CE390X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M435",
    format: "A3",
    speed: 30,
    capacity: 65e3,
    cartridges: [
      "CZ192A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M725",
    format: "A3",
    speed: 41,
    capacity: 2e4,
    cartridges: [
      "CF214A",
      "CF214X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M5025",
    format: "A3",
    speed: 25,
    capacity: 2e4,
    cartridges: [
      "Q7570A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M5035",
    format: "A3",
    speed: 35,
    capacity: 2e4,
    cartridges: [
      "Q7570A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M830",
    format: "A3",
    speed: 56,
    capacity: 3e4,
    cartridges: [
      "CF325X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M9040",
    format: "A3",
    speed: 40,
    capacity: 3e4,
    cartridges: [
      "C8543Х"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M9050",
    format: "A3",
    speed: 50,
    capacity: 3e4,
    cartridges: [
      "C8543Х"
    ],
    device: "MFU",
    vendor: "hp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M252",
    format: "A4",
    speed: 18,
    capacity: 3e4,
    cartridges: [
      "CF400A",
      "CF401A",
      "CF402A",
      "CF403A",
      "CF400X",
      "CF401X",
      "CF402X",
      "CF403X"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M251",
    format: "A4",
    speed: 14,
    capacity: 3e4,
    cartridges: [
      "CF210A",
      "CF211A",
      "CF212A",
      "CF213A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M351",
    format: "A4",
    speed: 18,
    capacity: 3e4,
    cartridges: [
      "CE410A",
      "CE411A",
      "CE412A",
      "CE413A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Laserjet M451",
    format: "A4",
    speed: 20,
    capacity: 4e4,
    cartridges: [
      "CE410A",
      "CE411A",
      "CE412A",
      "CE413A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M452",
    format: "A4",
    speed: 28,
    capacity: 5e4,
    cartridges: [
      "CF410A",
      "CF411A",
      "CF412A",
      "CF413A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M551",
    format: "A4",
    speed: 32,
    capacity: 75e3,
    cartridges: [
      "CE400A",
      "CE401A",
      "CE402A",
      "CE403A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M553",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "CF360A",
      "CF361A",
      "CF362A",
      "CF363A",
      "CF360X",
      "CF361X",
      "CF362X",
      "CF363X"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M552",
    format: "A4",
    speed: 33,
    capacity: 8e4,
    cartridges: [
      "CF360A",
      "CF361A",
      "CF362A",
      "CF363A",
      "CF360X",
      "CF361X",
      "CF362X",
      "CF363X"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CP4025",
    format: "A4",
    speed: 35,
    capacity: 1e4,
    cartridges: [
      "CE260A",
      "CE261A",
      "CE262A",
      "CE263A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M651",
    format: "A4",
    speed: 42,
    capacity: 12e3,
    cartridges: [
      "CF320A",
      "CF321A",
      "CF322A",
      "CF323A",
      "CF330X",
      "CF331X",
      "CF332X",
      "CF333X"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CP4525",
    format: "A4",
    speed: 40,
    capacity: 12e3,
    cartridges: [
      "CE260A",
      "CE261A",
      "CE262A",
      "CE263A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CP5225",
    format: "A3",
    speed: 20,
    capacity: 75e3,
    cartridges: [
      "CE740A",
      "CE741A",
      "CE742A",
      "CE743A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M750",
    format: "A3",
    speed: 30,
    capacity: 12e3,
    cartridges: [
      "CE270A",
      "CE271A",
      "CE272A",
      "CE273A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CP5525",
    format: "A3",
    speed: 30,
    capacity: 12e3,
    cartridges: [
      "CE270A",
      "CE271A",
      "CE272A",
      "CE273A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet 5550",
    format: "A3",
    speed: 28,
    capacity: 12e3,
    cartridges: [
      "C9730A",
      "C9731A",
      "C9732A",
      "C9733A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M855",
    format: "A3",
    speed: 46,
    capacity: 17500,
    cartridges: [
      "CF310A",
      "CF311A",
      "CF312A",
      "CF313A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CP6015",
    format: "A3",
    speed: 41,
    capacity: 17500,
    cartridges: [
      "CB380A",
      "CB381A",
      "CB382A",
      "CB383A"
    ],
    device: "printer",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M176",
    format: "A4",
    speed: 16,
    capacity: 2e4,
    cartridges: [
      "CF350A",
      "CF351A",
      "CF352A",
      "CF353A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M177",
    format: "A4",
    speed: 16,
    capacity: 2e4,
    cartridges: [
      "CF350A",
      "CF351A",
      "CF352A",
      "CF353A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M277",
    format: "A4",
    speed: 18,
    capacity: 3e4,
    cartridges: [
      "CF400A",
      "CF401A",
      "CF402A",
      "CF403A",
      "CF400X",
      "CF401X",
      "CF402X",
      "CF403X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Laserjet M274",
    format: "A4",
    speed: 18,
    capacity: 3e4,
    cartridges: [
      "CF400A",
      "CF401A",
      "CF402A",
      "CF403A",
      "CF400X",
      "CF401X",
      "CF402X",
      "CF403X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M476",
    format: "A4",
    speed: 21,
    capacity: 4e4,
    cartridges: [
      "CC530A",
      "CC531A",
      "CC532A",
      "CC533A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M477",
    format: "A4",
    speed: 28,
    capacity: 5e4,
    cartridges: [
      "CF410A",
      "CF411A",
      "CF412A",
      "CF413A",
      "CF410X",
      "CF411X",
      "CF412X",
      "CF413X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M570",
    format: "A4",
    speed: 30,
    capacity: 75e3,
    cartridges: [
      "CE400A",
      "CE401A",
      "CE402A",
      "CE403A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M575",
    format: "A4",
    speed: 30,
    capacity: 75e3,
    cartridges: [
      "CE400A",
      "CE401A",
      "CE402A",
      "CE403A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CM3530",
    format: "A4",
    speed: 31,
    capacity: 75e3,
    cartridges: [
      "CE250A",
      "CE251A",
      "CE252A",
      "CE253A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M680",
    format: "A4",
    speed: 42,
    capacity: 12e3,
    cartridges: [
      "CF320A",
      "CF321A",
      "CF322A",
      "CF323A",
      "CF330X",
      "CF331X",
      "CF332X",
      "CF333X"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CM4540",
    format: "A4",
    speed: 40,
    capacity: 17500,
    cartridges: [
      "CF030A",
      "CF031A",
      "CF032A",
      "CF033A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M775",
    format: "A3",
    speed: 30,
    capacity: 12e3,
    cartridges: [
      "CE340A",
      "CE341A",
      "CE342A",
      "CE343A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet M880",
    format: "A3",
    speed: 46,
    capacity: 2e4,
    cartridges: [
      "CF300A",
      "CF301A",
      "CF302A",
      "CF300A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CM6030",
    format: "A3",
    speed: 31,
    capacity: 2e4,
    cartridges: [
      "CB380A",
      "CB381A",
      "CB382A",
      "CB383A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LaserJet CM6040",
    format: "A3",
    speed: 41,
    capacity: 2e4,
    cartridges: [
      "CB380A",
      "CB381A",
      "CB382A",
      "CB383A"
    ],
    device: "MFU",
    vendor: "hp",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "iRC3580",
    format: "A3",
    speed: 35,
    capacity: 3e3,
    cartridges: [
      "C-EXV21Bk",
      "C-EXV21C",
      "C-EXV21M",
      "C-EXV21Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3320",
    format: "A3",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "C-EXV49Bk",
      "C-EXV49C",
      "C-EXV49M",
      "C-EXV49Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C2230",
    format: "A3",
    speed: 30,
    capacity: 2500,
    cartridges: [
      "C-EXV34Bk",
      "C-EXV34C",
      "C-EXV34M",
      "C-EXV34Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF9280C",
    format: "A4",
    speed: 21,
    capacity: 6500,
    cartridges: [
      "711Bk",
      "711C",
      "711M",
      "711Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF729C",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8550",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8580C",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF9220C",
    format: "A4",
    speed: 21,
    capacity: 6500,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8080C",
    format: "A4",
    speed: 12,
    capacity: 3e3,
    cartridges: [
      "716Bk",
      "716C",
      "716M",
      "716Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8540C",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF724C",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF728C",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8230C",
    format: "A4",
    speed: 14,
    capacity: 3e3,
    cartridges: [
      "731Bk",
      "731C",
      "731M",
      "731Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF628C",
    format: "A4",
    speed: 14,
    capacity: 3e3,
    cartridges: [
      "731Bk",
      "731C",
      "731M",
      "731Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF623C",
    format: "A4",
    speed: 14,
    capacity: 3e3,
    cartridges: [
      "731Bk",
      "731C",
      "731M",
      "731Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8280C",
    format: "A4",
    speed: 14,
    capacity: 3e3,
    cartridges: [
      "731Bk",
      "731C",
      "731M",
      "731Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MF8040C",
    format: "A4",
    speed: 12,
    capacity: 3e3,
    cartridges: [
      "716Bk",
      "716C",
      "716M",
      "716Y"
    ],
    device: "MFU",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7210",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7660",
    format: "A4",
    speed: 20,
    capacity: 6e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7680",
    format: "A4",
    speed: 20,
    capacity: 6e3,
    cartridges: [
      "718Bk",
      "718C",
      "718M",
      "718Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7780",
    format: "A4",
    speed: 32,
    capacity: 7500,
    cartridges: [
      "732Bk",
      "732H",
      "732C",
      "732M",
      "732Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C350",
    format: "A4",
    speed: 35,
    capacity: 2500,
    cartridges: [
      "C-EXV47Bk",
      "C-EXV47C",
      "C-EXV47M",
      "C-EXV47Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7110",
    format: "A4",
    speed: 14,
    capacity: 3e3,
    cartridges: [
      "731Bk",
      "731C",
      "731M",
      "731Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7100",
    format: "A4",
    speed: 14,
    capacity: 3e3,
    cartridges: [
      "731Bk",
      "731C",
      "731M",
      "731Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7018",
    format: "A4",
    speed: 16,
    capacity: 1500,
    cartridges: [
      "729Bk",
      "729C",
      "729M",
      "729Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "LBP7010",
    format: "A4",
    speed: 16,
    capacity: 1500,
    cartridges: [
      "729Bk",
      "729C",
      "729M",
      "729Y"
    ],
    device: "printer",
    vendor: "canon",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "2520",
    format: "A3",
    speed: 20,
    capacity: 1700,
    cartridges: [
      "C-EXV33"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "2525",
    format: "A3",
    speed: 30,
    capacity: 1700,
    cartridges: [
      "C-EXV33"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "2520",
    format: "A3",
    speed: 20,
    capacity: 1700,
    cartridges: [
      "C-EXV33"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "4225",
    format: "A3",
    speed: 25,
    capacity: 3e3,
    cartridges: [
      "C-EXV39"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "4235",
    format: "A3",
    speed: 35,
    capacity: 3e3,
    cartridges: [
      "C-EXV39"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "4251",
    format: "A3",
    speed: 51,
    capacity: 4e3,
    cartridges: [
      "C-EXV38"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "4245",
    format: "A3",
    speed: 45,
    capacity: 4e3,
    cartridges: [
      "C-EXV38"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "4045",
    format: "A3",
    speed: 45,
    capacity: 4e3,
    cartridges: [
      "C-EXV38"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "6265",
    format: "A3",
    speed: 65,
    capacity: 5e3,
    cartridges: [
      "C-EXV36"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "6255",
    format: "A3",
    speed: 55,
    capacity: 5e3,
    cartridges: [
      "C-EXV36"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "6275",
    format: "A3",
    speed: 75,
    capacity: 5e3,
    cartridges: [
      "C-EXV36"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "8205",
    format: "A3",
    speed: 10,
    capacity: 5e3,
    cartridges: [
      "C-EXV35"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "8295",
    format: "A3",
    speed: 95,
    capacity: 5e3,
    cartridges: [
      "C-EXV35"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF421",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: [
      {
        title: "Ремонт Canon MF421",
        photo: [
          {
            item: "IMG_20240301_135556_5251595766230.jpg"
          },
          {
            item: "IMG_20240301_135605_699-614528615.jpg"
          },
          {
            item: "IMG_20240301_135735_577347337782.jpg"
          },
          {
            item: "IMG_20240301_140047_538-527769413.jpg"
          },
          {
            item: "IMG_20240301_141156_420-1508218095.jpg"
          },
          {
            item: "IMG_20240301_141253_224345880657.jpg"
          }
        ],
        video: [
          "https://www.youtube.com/embed/Qf3vQ-JmKhs"
        ],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "В данном примере мы рассказываем о восстановлении термоблока Canon MF421" }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Были выполнены замена термоплёнки, замена прижимного резинового вала, техническое обслуживание.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Замена термоплёнки на Canon MF421" }),
            " выполняется в течение 20 - 30 минут. Все перечисленные работы возможно выполнить прямо в офисе у клиента, как и было сделано в данном случае. Для произведения работ необходимо наличие пустого стола."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "MF426",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF428",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF429",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP212",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP214",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP215",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [
      "052",
      "052H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "8285",
    format: "A3",
    speed: 85,
    capacity: 5e3,
    cartridges: [
      "C-EXV35"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6020",
    format: "A4",
    speed: 18,
    capacity: 5e3,
    cartridges: [
      "725"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6230",
    format: "A4",
    speed: 25,
    capacity: 8e3,
    cartridges: [
      "726"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6310",
    format: "A4",
    speed: 33,
    capacity: 2500,
    cartridges: [
      "719",
      "719H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6670",
    format: "A4",
    speed: 33,
    capacity: 5e3,
    cartridges: [
      "719",
      "719H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6680",
    format: "A4",
    speed: 33,
    capacity: 5e3,
    cartridges: [
      "719",
      "719H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6780",
    format: "A4",
    speed: 40,
    capacity: 1e3,
    cartridges: [
      "724",
      "724H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "LBP6750",
    format: "A4",
    speed: 40,
    capacity: 1e3,
    cartridges: [
      "724",
      "724H"
    ],
    device: "printer",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF3010",
    format: "A4",
    speed: 18,
    capacity: 8e3,
    cartridges: [
      "712"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF211",
    format: "A4",
    speed: 23,
    capacity: 8e3,
    cartridges: [
      "737"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF212",
    format: "A4",
    speed: 23,
    capacity: 8e3,
    cartridges: [
      "737"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF229",
    format: "A4",
    speed: 23,
    capacity: 8e3,
    cartridges: [
      "737"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF216",
    format: "A4",
    speed: 23,
    capacity: 8e3,
    cartridges: [
      "737"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF226",
    format: "A4",
    speed: 27,
    capacity: 1e3,
    cartridges: [
      "737"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF4780",
    format: "A4",
    speed: 23,
    capacity: 1e3,
    cartridges: [
      "728"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF6180",
    format: "A4",
    speed: 33,
    capacity: 5e3,
    cartridges: [
      "719",
      "719H"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF6140",
    format: "A4",
    speed: 33,
    capacity: 5e3,
    cartridges: [
      "719",
      "719H"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "1730",
    format: "A4",
    speed: 30,
    capacity: 1500,
    cartridges: [
      "C-EXV37"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "1740i",
    format: "A4",
    speed: 40,
    capacity: 1500,
    cartridges: [
      "C-EXV37"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "1435",
    format: "A4",
    speed: 35,
    capacity: 2e3,
    cartridges: [],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "2202",
    format: "A3",
    speed: 22,
    capacity: 1200,
    cartridges: [
      "C-EXV42"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MF247",
    format: "A4",
    speed: 27,
    capacity: 15e3,
    cartridges: [
      "CF283A"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "2422",
    format: "A3",
    speed: 22,
    capacity: 1500,
    cartridges: [
      "C-EXV14"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "2420",
    format: "A3",
    speed: 20,
    capacity: 1500,
    cartridges: [
      "C-EXV14"
    ],
    device: "MFU",
    vendor: "canon",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress M2020",
    format: "A4",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-2160",
    format: "A4",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress M2830",
    format: "A4",
    speed: 28,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress M2820",
    format: "A4",
    speed: 28,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SL-M2620",
    format: "A4",
    speed: 26,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-2540",
    format: "A4",
    speed: 24,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-2850",
    format: "A4",
    speed: 28,
    capacity: 5e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-2855",
    format: "A4",
    speed: 28,
    capacity: 5e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ProXpress M3820",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-3710",
    format: "A4",
    speed: 35,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-3750",
    format: "A4",
    speed: 35,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-3561",
    format: "A4",
    speed: 33,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ProXpress M4020",
    format: "A4",
    speed: 40,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SL-M3820",
    format: "A4",
    speed: 38,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-4510",
    format: "A4",
    speed: 43,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-4551",
    format: "A4",
    speed: 43,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-5010",
    format: "A4",
    speed: 48,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-5015",
    format: "A4",
    speed: 48,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-5510",
    format: "A4",
    speed: 52,
    capacity: 25e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ML-6510",
    format: "A4",
    speed: 62,
    capacity: 27500,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress M2070",
    format: "A4",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress M2870",
    format: "A4",
    speed: 28,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-4650",
    format: "A4",
    speed: 24,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress M2880",
    format: "A4",
    speed: 28,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-4655",
    format: "A4",
    speed: 24,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-4728",
    format: "A4",
    speed: 28,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ProXpress M3870",
    format: "A4",
    speed: 38,
    capacity: 8e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ProXpress M4070",
    format: "A4",
    speed: 40,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-6545",
    format: "A4",
    speed: 43,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MultiXpress M4580",
    format: "A4",
    speed: 45,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MultiXpress M5370",
    format: "A4",
    speed: 53,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MultiXpress K2200",
    format: "A3",
    speed: 20,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-8128",
    format: "A3",
    speed: 28,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-8230",
    format: "A3",
    speed: 30,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-8240",
    format: "A3",
    speed: 40,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "SCX-8040",
    format: "A3",
    speed: 40,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Xpress C430",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Xpress C430",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLP-365",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Xpress C410",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLP-365",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Xpress C1810",
    format: "A4",
    speed: 18,
    capacity: 4e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLP-680",
    format: "A4",
    speed: 24,
    capacity: 6e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLP-670",
    format: "A4",
    speed: 24,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLP-775",
    format: "A4",
    speed: 33,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Xpress C480",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-3305",
    format: "A4",
    speed: 18,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Xpress C1860",
    format: "A4",
    speed: 18,
    capacity: 4e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-6260",
    format: "A4",
    speed: 24,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9251",
    format: "A3",
    speed: 25,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9301",
    format: "A3",
    speed: 30,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9250",
    format: "A3",
    speed: 25,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9201",
    format: "A3",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9252",
    format: "A3",
    speed: 25,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9350",
    format: "A3",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CLX-9352",
    format: "A3",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "samsung",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3020",
    format: "A4",
    speed: 20,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3260",
    format: "A4",
    speed: 28,
    capacity: 3e4,
    cartridges: [
      "106R02778"
    ],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3052",
    format: "A4",
    speed: 26,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3250",
    format: "A4",
    speed: 28,
    capacity: 5e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3420",
    format: "A4",
    speed: 20,
    capacity: 5e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3320",
    format: "A4",
    speed: 35,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3500",
    format: "A4",
    speed: 33,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3610",
    format: "A4",
    speed: 47,
    capacity: 11e3,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 4500",
    format: "A4",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 4510",
    format: "A4",
    speed: 43,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 4622",
    format: "A4",
    speed: 52,
    capacity: 27500,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 4600",
    format: "A4",
    speed: 52,
    capacity: 27500,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 4620",
    format: "A4",
    speed: 62,
    capacity: 27500,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 5335",
    format: "A3",
    speed: 35,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 5550",
    format: "A3",
    speed: 50,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3025",
    format: "A4",
    speed: 20,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3225",
    format: "A4",
    speed: 28,
    capacity: 3e4,
    cartridges: [
      "106R02778"
    ],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3215",
    format: "A4",
    speed: 27,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3315",
    format: "A4",
    speed: 31,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3210",
    format: "A4",
    speed: 24,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3220",
    format: "A4",
    speed: 28,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 3635",
    format: "A4",
    speed: 33,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3325",
    format: "A4",
    speed: 35,
    capacity: 8e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3615",
    format: "A4",
    speed: 47,
    capacity: 11e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 3655",
    format: "A4",
    speed: 45,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 4250",
    format: "A4",
    speed: 43,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 4260",
    format: "A4",
    speed: 53,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 4265",
    format: "A4",
    speed: 55,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5016",
    format: "A3",
    speed: 16,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5022",
    format: "A3",
    speed: 22,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5021",
    format: "A3",
    speed: 20,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5024",
    format: "A3",
    speed: 24,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5222",
    format: "A3",
    speed: 22,
    capacity: 7e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5225",
    format: "A3",
    speed: 25,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5325",
    format: "A3",
    speed: 25,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5230",
    format: "A3",
    speed: 30,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5330",
    format: "A3",
    speed: 30,
    capacity: 12500,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5632",
    format: "A3",
    speed: 32,
    capacity: 12500,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5735",
    format: "A3",
    speed: 35,
    capacity: 12500,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5335",
    format: "A3",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5945",
    format: "A3",
    speed: 45,
    capacity: 17500,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5845",
    format: "A3",
    speed: 45,
    capacity: 17500,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5955",
    format: "A3",
    speed: 55,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5855",
    format: "A3",
    speed: 55,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5865",
    format: "A3",
    speed: 65,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5875",
    format: "A3",
    speed: 75,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 5890",
    format: "A3",
    speed: 90,
    capacity: 4e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6000",
    format: "A4",
    speed: 12,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6022",
    format: "A4",
    speed: 18,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6020",
    format: "A4",
    speed: 12,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6010",
    format: "A4",
    speed: 15,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6500",
    format: "A4",
    speed: 23,
    capacity: 4e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6280",
    format: "A4",
    speed: 30,
    capacity: 7e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6280",
    format: "A4",
    speed: 30,
    capacity: 7e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6600",
    format: "A4",
    speed: 35,
    capacity: 8e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6360",
    format: "A4",
    speed: 40,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6360",
    format: "A4",
    speed: 40,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 6700",
    format: "A4",
    speed: 45,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 7100",
    format: "A3",
    speed: 30,
    capacity: 55e3,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 7500",
    format: "A3",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Phaser 7800",
    format: "A3",
    speed: 45,
    capacity: 22500,
    cartridges: [],
    device: "printer",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6015",
    format: "A4",
    speed: 15,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6025",
    format: "A4",
    speed: 12,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6027",
    format: "A4",
    speed: 18,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6505",
    format: "A4",
    speed: 23,
    capacity: 4e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6605",
    format: "A4",
    speed: 35,
    capacity: 8e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6655",
    format: "A4",
    speed: 36,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 6400",
    format: "A4",
    speed: 35,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7120",
    format: "A3",
    speed: 20,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7125",
    format: "A3",
    speed: 25,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7220",
    format: "A3",
    speed: 20,
    capacity: 87e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7220",
    format: "A3",
    speed: 20,
    capacity: 87e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7830",
    format: "A3",
    speed: 30,
    capacity: 9e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7225",
    format: "A3",
    speed: 25,
    capacity: 10700,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7835",
    format: "A3",
    speed: 35,
    capacity: 11e3,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7845",
    format: "A3",
    speed: 45,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "WorkCentre 7855",
    format: "A3",
    speed: 55,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "xerox",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-1040",
    format: "A4",
    speed: 20,
    capacity: 1e4,
    cartridges: [
      "TK-1110"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1060",
    format: "A4",
    speed: 25,
    capacity: 2e4,
    cartridges: [
      "TK-1110"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P2035",
    format: "A4",
    speed: 35,
    capacity: 2e4,
    cartridges: [
      "TK-1150"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P2135",
    format: "A4",
    speed: 35,
    capacity: 2e4,
    cartridges: [
      "TK-1150"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1320",
    format: "A4",
    speed: 35,
    capacity: 5e4,
    cartridges: [
      "TK-170"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1120",
    format: "A4",
    speed: 30,
    capacity: 5e4,
    cartridges: [
      "TK-160"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-2100",
    format: "A4",
    speed: 40,
    capacity: 15e3,
    cartridges: [
      "TK-3100"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-2020",
    format: "A4",
    speed: 35,
    capacity: 15e3,
    cartridges: [
      "TK-340"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-4100",
    format: "A4",
    speed: 45,
    capacity: 2e4,
    cartridges: [
      "TK-3110"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-4200",
    format: "A4",
    speed: 50,
    capacity: 25e3,
    cartridges: [
      "TK-3130"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "P3050",
    format: "A4",
    speed: 50,
    capacity: 2e5,
    cartridges: [
      "TK-3170"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "P3055",
    format: "A4",
    speed: 50,
    capacity: 2e5,
    cartridges: [
      "TK-3170"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "P3060",
    format: "A4",
    speed: 50,
    capacity: 2e5,
    cartridges: [
      "TK-3170"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-4300",
    format: "A4",
    speed: 60,
    capacity: 27500,
    cartridges: [
      "TK-3130"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-6970",
    format: "A3",
    speed: 35,
    capacity: 15e3,
    cartridges: [
      "TK-450"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P4040",
    format: "A3",
    speed: 40,
    capacity: 18e3,
    cartridges: [
      "TK-7300"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-9130",
    format: "A3",
    speed: 40,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-9530",
    format: "A3",
    speed: 51,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1025MFP",
    format: "A4",
    speed: 25,
    capacity: 2e4,
    cartridges: [
      "TK-1120"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M2040",
    format: "A4",
    speed: 40,
    capacity: 5e4,
    cartridges: [
      "TK-1170"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: [
      {
        title: "Kyocera M2040 ошибка C6030",
        photo: [
          {
            item: "IMG_20240226_155136_300.jpg"
          },
          {
            item: "IMG_20240226_155150_308.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Данная ошибка свидетельствует о неисправности термоблока. Причин может быть много, вплоть до неисправностей редуктора, который не может прокрутить печку." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "В нашем же случае, неисправность долго искать не пришлось. Открывает заднюю крышку и видим что происходит с термоплёнкой. В подобных случаях мы рекомендуем ",
            /* @__PURE__ */ jsx("strong", { children: "замену печки в сборе Kyocera M2040" }),
            ". Такая замена возможна как в нашей мастерской, так и на выезде. Мы рекомендуем устанавливать оригинальные термоблоки. Совместимые и восстановленные, очень часто, работают намного меньше, а то и вовсе в разы!"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      },
      {
        title: "Kyocera M2040 ошибка C7990",
        photo: [
          {
            item: "IMG_20240301_091640_314.jpg"
          },
          {
            item: "IMG_20240301_091649_025.jpg"
          },
          {
            item: "IMG_20240301_091739_362.jpg"
          },
          {
            item: "IMG_20240301_091748_539.jpg"
          },
          {
            item: "IMG_20240301_092620_816.jpg"
          },
          {
            item: "IMG_20240301_092806_393.jpg"
          },
          {
            item: "IMG_20240301_093243_912.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Ошибка C7990 'Сбой аппарата. Вызовите сервисный персонал' означает, что переполнен бункер для отработанного тонера. Отработка в данных аппаратах находится в блоке барабана." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "На фотографиях показаны примеры очистки бункера отработки. На блоках DK-1150 нет специальных отверстий для высыпания тонера, как на их старших братьях. Потому, приходится делать отверстия в корпусе, вы сыпать содержимое и герметично запечатывать. В условиях сервисного центра отверстия возможно сделать более аккуратными.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Чистка блока барабана Kyocera M2040" }),
            " занимает не более 20 минут времени."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      },
      {
        title: "Неоригинальный картридж",
        photo: [
          {
            item: "IMG_20240301_092744_985.jpg"
          },
          {
            item: "IMG_20240301_092751_296.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Ошибка Kyocera M2040 'Неоригинальный картридж с тонером' на Kyocera M2040 и других означает, что чип, установленный на картридже, израсходовал свой ресурс." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Для сброса ошибка необходимо одновременно зажать на клавиатуре кнопки 'Стоп' и 'Ok' на 3-5 секунд и отпустить. Аппарат пройдёт инициализацию и выйдет в готовность.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {})
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "M2735",
    format: "A4",
    speed: 35,
    capacity: 2e4,
    cartridges: [
      "TK-1200"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M2640",
    format: "A4",
    speed: 35,
    capacity: 5e4,
    cartridges: [
      "TK-1170"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M3145",
    format: "A4",
    speed: 45,
    capacity: 15e4,
    cartridges: [
      "TK-3160"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P3150",
    format: "A4",
    speed: 50,
    capacity: 2e5,
    cartridges: [
      "TK-3160",
      "TK-3170"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: [
      {
        title: "Kyocera P3150 мажет",
        photo: [
          {
            item: "P3150-1.jpg"
          },
          {
            item: "P3150-2.jpg"
          },
          {
            item: "P3150-3.jpg"
          },
          {
            item: "P3150-4.jpg"
          },
          {
            item: "P3150-5.jpg"
          },
          {
            item: "P3150-6.jpg"
          },
          {
            item: "P3150-7.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже приведён пример одной из самых распространённых причин обращения клиентов в сервисные центры. Данная неисправность часто встречается на принтерах ",
            /* @__PURE__ */ jsx("strong", { children: "ECOSYS P3150" }),
            " и им подобных. На примере видно как по центру листа размазывается тонер. В нашем случае масштаб трагедии невелик, но, со временем, дефект может расползаться на весь лист, может проявляться по краю листа  и т.д."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "Причиной неисправности является износ ролика заряда. На ранних стадиях причину можно устранить помыв ролик спиртом. Но это решит проблему лишь на время, через какое-то количество отпечатков ролик заряда придётся менять. Оригинальный стоит дорого, потому мы рекомендуем, на те же деньги, купить несколько китайских и, при необходимости, переставлять их. По ресурсу, как показывает практика, это будет сильно выгоднее." }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "M2540",
    format: "A4",
    speed: 40,
    capacity: 5e4,
    cartridges: [
      "TK-1170"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: [
      {
        title: "Kyocera M2540 ошибка C6030",
        photo: [
          {
            item: "IMG_20240226_155136_300.jpg"
          },
          {
            item: "IMG_20240226_155150_308.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Данная ошибка свидетельствует о неисправности термоблока. Причин может быть много, вплоть до неисправностей редуктора, который не может прокрутить печку." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "В нашем же случае, неисправность долго искать не пришлось. Открывает заднюю крышку и видим что происходит с термоплёнкой. В подобных случаях мы рекомендуем ",
            /* @__PURE__ */ jsx("strong", { children: "замену печки в сборе Kyocera M2540" }),
            ". Такая замена возможна как в нашей мастерской, так и на выезде. Мы рекомендуем устанавливать оригинальные термоблоки. Совместимые и восстановленные, очень часто, работают намного меньше, а то и вовсе в разы!"
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      },
      {
        title: "Kyocera M2540 ошибка C7990",
        photo: [
          {
            item: "IMG_20240312_113145_245763768397.jpg"
          },
          {
            item: "IMG_20240312_113148_686-993140143.jpg"
          },
          {
            item: "IMG_20240312_113406_0121077783091.jpg"
          },
          {
            item: "IMG_20240312_113519_9181655029093.jpg"
          },
          {
            item: "IMG_20240312_113630_153152075850.jpg"
          },
          {
            item: "IMG_20240312_113657_3921880369932.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Ошибка C7990 'Сбой аппарата. Вызовите сервисный персонал' означает, что переполнен бункер для отработанного тонера. Отработка в данных аппаратах находится в блоке барабана." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "На фотографиях показаны примеры очистки бункера отработки. На блоках DK-1150 нет специальных отверстий для высыпания тонера, как на их старших братьях. Потому, приходится делать отверстия в корпусе, вы сыпать содержимое и герметично запечатывать. В условиях сервисного центра отверстия возможно сделать более аккуратными.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Чистка блока барабана Kyocera M2540" }),
            " занимает не более 20 минут времени."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      },
      {
        title: "Неоригинальный картридж",
        photo: [
          {
            item: "IMG_20240301_092744_985.jpg"
          },
          {
            item: "IMG_20240301_092751_296.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Ошибка Kyocera M2540 'Неоригинальный картридж с тонером' на Kyocera M2540 и других означает, что чип, установленный на картридже, израсходовал свой ресурс." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Для сброса ошибка необходимо одновременно зажать на клавиатуре кнопки 'Стоп' и 'Ok' на 3-5 секунд и отпустить. Аппарат пройдёт инициализацию и выйдет в готовность.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {})
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "ECOSYS M2530",
    format: "A4",
    speed: 30,
    capacity: 2e4,
    cartridges: [
      "TK-1130"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M2030",
    format: "A4",
    speed: 30,
    capacity: 2e4,
    cartridges: [
      "TK-1130"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1020MFP",
    format: "A4",
    speed: 20,
    capacity: 2e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1120MFP",
    format: "A4",
    speed: 20,
    capacity: 2e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1125MFP",
    format: "A4",
    speed: 25,
    capacity: 2e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1028MFP",
    format: "A4",
    speed: 28,
    capacity: 2e4,
    cartridges: [
      "TK-130"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1135MFP",
    format: "A4",
    speed: 28,
    capacity: 2e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-1035MFP",
    format: "A4",
    speed: 28,
    capacity: 2e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M2035",
    format: "A4",
    speed: 35,
    capacity: 1e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M2535",
    format: "A4",
    speed: 35,
    capacity: 1e4,
    cartridges: [
      "TK-1140"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M3540",
    format: "A4",
    speed: 40,
    capacity: 15e3,
    cartridges: [
      "TK-3100"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M3040",
    format: "A4",
    speed: 40,
    capacity: 15e3,
    cartridges: [
      "TK-3100"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M3540",
    format: "A4",
    speed: 40,
    capacity: 15e3,
    cartridges: [
      "TK-350"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-3040MFP",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [
      "TK-350"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-3540MFP",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [
      "TK-350"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-3140MFP",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [
      "TK-350"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-3640MFP",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M3560",
    format: "A4",
    speed: 60,
    capacity: 27500,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M3550",
    format: "A4",
    speed: 50,
    capacity: 27500,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M4125",
    format: "A3",
    speed: 45,
    capacity: 1e5,
    cartridges: [
      "TK-6115"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M4132",
    format: "A3",
    speed: 45,
    capacity: 1e5,
    cartridges: [
      "TK-6115"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "FS-6525MFP",
    format: "A3",
    speed: 25,
    capacity: 1e4,
    cartridges: [
      "TK-475"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M8124",
    format: "A3",
    speed: 24,
    capacity: 1e5,
    cartridges: [
      "TK-8115K",
      "TK-8115C",
      "TK-8115M",
      "TK-8115Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "M8130",
    format: "A3",
    speed: 24,
    capacity: 1e5,
    cartridges: [
      "TK-8115K",
      "TK-8115C",
      "TK-8115M",
      "TK-8115Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C8020",
    format: "A3",
    speed: 20,
    capacity: 1e5,
    cartridges: [
      "TK-895K",
      "TK-895C",
      "TK-895M",
      "TK-895Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C8025",
    format: "A3",
    speed: 20,
    capacity: 1e5,
    cartridges: [
      "TK-895K",
      "TK-895C",
      "TK-895M",
      "TK-895Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C8520",
    format: "A3",
    speed: 20,
    capacity: 1e5,
    cartridges: [
      "TK-895K",
      "TK-895C",
      "TK-895M",
      "TK-895Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C8525",
    format: "A3",
    speed: 20,
    capacity: 1e5,
    cartridges: [
      "TK-895K",
      "TK-895C",
      "TK-895M",
      "TK-895Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-6530MFP",
    format: "A3",
    speed: 30,
    capacity: 1e4,
    cartridges: [
      "TK-475"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "KM-3050",
    format: "A3",
    speed: 30,
    capacity: 1e4,
    cartridges: [
      "TK-715"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 3500",
    format: "A3",
    speed: 35,
    capacity: 17500,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 1801",
    format: "A3",
    speed: 18,
    capacity: 2e4,
    cartridges: [
      "TK-4105"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 1800",
    format: "A3",
    speed: 18,
    capacity: 2e4,
    cartridges: [
      "TK-4105"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKAlfa 180",
    format: "A3",
    speed: 18,
    capacity: 2e4,
    cartridges: [
      "TK-435"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKAlfa 181",
    format: "A3",
    speed: 18,
    capacity: 2e4,
    cartridges: [
      "TK-435"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: [
      {
        title: "Восстановление Kyocera TASKAlfa 181",
        photo: [
          {
            item: "IMG_20240228_131820_306.jpg"
          },
          {
            item: "IMG_20240228_142112_378.jpg"
          },
          {
            item: "IMG_20240228_131854_384.jpg"
          },
          {
            item: "IMG_20240228_131834_963.jpg"
          },
          {
            item: "IMG_20240228_132521_744.jpg"
          },
          {
            item: "IMG_20240228_133202_695.jpg"
          },
          {
            item: "IMG_20240228_131844_266.jpg"
          },
          {
            item: "IMG_20240228_135128_641.jpg"
          },
          {
            item: "IMG_20240228_142554_906.jpg"
          },
          {
            item: "IMG_20240228_142605_466.jpg"
          }
        ],
        video: [
          "https://www.youtube.com/embed/viGTyFYdqZw"
        ],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "В данном примере мы показываем процесс восстановления Kyocera TASKAlfa 181. Пробег аппарата - 420 814 копий! Клиент думал списывать аппарат, но у нас получилось вдохнуть в него новую жизнь." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "На нашей практике бывали аппараты и с большими пробегами, но и 420К немало. Потому, было принято решение восстанавливать сразу несколько блоков разом.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "В аппарате были Восстановлены термоблок и блок барабана. На фотографиях видно насколько эти узлы были изношены. В блоке барабана заменили фотовал и ракель. В термоблоке прижимной вал, тефлоновый вал и все подшипники. Так же были заменены ролики захвата из кассеты и вал переноса изображения. В процессе ремонта было сделано техническое обслуживание и очистка бункера отработки.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "На фотографии с примерами печати слева оригинал, справа копия. Результат ремонта говорит сам за себя. Старичок ещё поживёт и напечатает не одну сотню тысяч копий)",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Ремонт Kyocera TASKAlfa 181" }),
            " возможен как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "TASKalfa 2201",
    format: "A3",
    speed: 22,
    capacity: 2e4,
    cartridges: [
      "TK-4105"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 221",
    format: "A3",
    speed: 22,
    capacity: 2e4,
    cartridges: [
      "TK-435"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 220",
    format: "A3",
    speed: 22,
    capacity: 2e4,
    cartridges: [
      "TK-435"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "KM-2560",
    format: "A3",
    speed: 25,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 3501",
    format: "A3",
    speed: 35,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 3510",
    format: "A3",
    speed: 35,
    capacity: 3e4,
    cartridges: [
      "TK-7205"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 4501",
    format: "A3",
    speed: 45,
    capacity: 3e4,
    cartridges: [
      "TK-6305"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 3010",
    format: "A3",
    speed: 30,
    capacity: 3e4,
    cartridges: [
      "TK-7105"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 5501",
    format: "A3",
    speed: 55,
    capacity: 3e4,
    cartridges: [
      "TK-6305"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 5500",
    format: "A3",
    speed: 55,
    capacity: 3e4,
    cartridges: [
      "TK-6305"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 6501",
    format: "A3",
    speed: 65,
    capacity: 35e3,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 8001",
    format: "A3",
    speed: 80,
    capacity: 35e3,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 6500",
    format: "A3",
    speed: 65,
    capacity: 35e3,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 8000",
    format: "A3",
    speed: 80,
    capacity: 35e3,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "TASKalfa 420",
    format: "A3",
    speed: 42,
    capacity: 4e4,
    cartridges: [],
    device: "MFU",
    vendor: "kyocera",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P6021",
    format: "A4",
    speed: 21,
    capacity: 5e4,
    cartridges: [
      "TK-580K",
      "TK-580C",
      "TK-580M",
      "TK-580Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C5150",
    format: "A4",
    speed: 21,
    capacity: 5e4,
    cartridges: [
      "TK-580K",
      "TK-580C",
      "TK-580M",
      "TK-580Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P6030",
    format: "A4",
    speed: 30,
    capacity: 8e4,
    cartridges: [
      "TK-560K",
      "TK-560C",
      "TK-560M",
      "TK-560Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P6026",
    format: "A4",
    speed: 26,
    capacity: 8e4,
    cartridges: [
      "TK-590K",
      "TK-590C",
      "TK-590M",
      "TK-590Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P6130",
    format: "A4",
    speed: 30,
    capacity: 9e4,
    cartridges: [
      "TK-5140K",
      "TK-5140C",
      "TK-5140M",
      "TK-5140Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M5521",
    format: "A4",
    speed: 23,
    capacity: 5e4,
    cartridges: [
      "TK-5230K",
      "TK-5230C",
      "TK-5230M",
      "TK-5230Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M5526",
    format: "A4",
    speed: 23,
    capacity: 5e4,
    cartridges: [
      "TK-5240K",
      "TK-5240C",
      "TK-5240M",
      "TK-5240Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: [
      {
        title: "Kyocera ECOSYS M5526 мажет",
        photo: [
          {
            item: "IMG_20240220_141345_302.jpg"
          },
          {
            item: "IMG_20240220_141400_557_14-27-43.jpg"
          },
          {
            item: "IMG_20240220_140838_503.jpg"
          },
          {
            item: "IMG_20240220_140834_660.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "В данном примере Показан результат восстановления ленты переноса. На изображениях 3 и 4 приведены примеры печати ДО и ПОСЛЕ ремонта. Процесс ремонта не занимает много времени, 20-25 минут, но требует наличия свободного места." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Данная неисправность встречается достаточно часто. Принтер мажет на нескольких первых страницах двумя полосками. Далее печать нормальная. Но, бывают случаи, когда дефект не уходит и принтер мажет постоянно. ",
            /* @__PURE__ */ jsx("strong", { children: "Ремонт ленты переноса Kyocera ECOSYS M5526" }),
            " возможен как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  },
  {
    model: "ECOSYS P6035",
    format: "A4",
    speed: 35,
    capacity: 15e3,
    cartridges: [
      "TK-5150K",
      "TK-5150C",
      "TK-5150M",
      "TK-5150Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C5400",
    format: "A4",
    speed: 35,
    capacity: 15e3,
    cartridges: [
      "TK-570K",
      "TK-570C",
      "TK-570M",
      "TK-570Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS P7035",
    format: "A4",
    speed: 35,
    capacity: 18e3,
    cartridges: [
      "TK-574K",
      "TK-574C",
      "TK-574M",
      "TK-574Y"
    ],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C8650",
    format: "A3",
    speed: 55,
    capacity: 22500,
    cartridges: [],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C8600",
    format: "A3",
    speed: 45,
    capacity: 22500,
    cartridges: [],
    device: "printer",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C2126MFP",
    format: "A4",
    speed: 26,
    capacity: 65e3,
    cartridges: [
      "TK-590K",
      "TK-590C",
      "TK-590M",
      "TK-590Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C2626MFP",
    format: "A4",
    speed: 26,
    capacity: 65e3,
    cartridges: [
      "TK-590K",
      "TK-590C",
      "TK-590M",
      "TK-590Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C2026MFP",
    format: "A4",
    speed: 26,
    capacity: 65e3,
    cartridges: [
      "TK-590K",
      "TK-590C",
      "TK-590M",
      "TK-590Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "FS-C2526MFP",
    format: "A4",
    speed: 26,
    capacity: 65e3,
    cartridges: [
      "TK-590K",
      "TK-590C",
      "TK-590M",
      "TK-590Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "ECOSYS M6026",
    format: "A4",
    speed: 26,
    capacity: 65e3,
    cartridges: [
      "TK-590K",
      "TK-590C",
      "TK-590M",
      "TK-590Y"
    ],
    device: "MFU",
    vendor: "kyocera",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1400",
    format: "A4",
    speed: 16,
    capacity: 2e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1350",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1300",
    format: "A4",
    speed: 16,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 20p",
    format: "A4",
    speed: 30,
    capacity: 8e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 3300P",
    format: "A4",
    speed: 33,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 4000P",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 4700P",
    format: "A4",
    speed: 47,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 4650",
    format: "A4",
    speed: 34,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 5650",
    format: "A4",
    speed: 43,
    capacity: 11e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 40P",
    format: "A4",
    speed: 43,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 9100",
    format: "A3",
    speed: 35,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "4060",
    format: "A3",
    speed: 45,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1390MF",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1380MF",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 190f",
    format: "A4",
    speed: 19,
    capacity: 7500,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 20",
    format: "A4",
    speed: 30,
    capacity: 8e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1480MF",
    format: "A4",
    speed: 20,
    capacity: 4e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 43",
    format: "A4",
    speed: 43,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "PagePro 1490MF",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 160",
    format: "A4",
    speed: 21,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di1610",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 25e",
    format: "A4",
    speed: 36,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 131f",
    format: "A4",
    speed: 13,
    capacity: 16e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "1600f",
    format: "A4",
    speed: 16,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 130f",
    format: "A4",
    speed: 13,
    capacity: 5e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 161",
    format: "A4",
    speed: 16,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "240f",
    format: "A4",
    speed: 24,
    capacity: 16e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 4050",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 3320",
    format: "A4",
    speed: 33,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 4020",
    format: "A4",
    speed: 40,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 4750",
    format: "A4",
    speed: 47,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 185",
    format: "A3",
    speed: 18,
    capacity: 55e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 210",
    format: "A3",
    speed: 21,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 162",
    format: "A3",
    speed: 16,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di2011",
    format: "A3",
    speed: 20,
    capacity: 17e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di1611",
    format: "A3",
    speed: 16,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 195",
    format: "A3",
    speed: 18,
    capacity: 11e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 165",
    format: "A3",
    speed: 16,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 215",
    format: "A3",
    speed: 21,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di7210",
    format: "A3",
    speed: 65,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di5510",
    format: "A3",
    speed: 55,
    capacity: 5e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 224e",
    format: "A3",
    speed: 22,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 250",
    format: "A3",
    speed: 25,
    capacity: 28e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 223",
    format: "A3",
    speed: 22,
    capacity: 19e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 36",
    format: "A3",
    speed: 36,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di3510",
    format: "A3",
    speed: 35,
    capacity: 14e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "Di3010",
    format: "A3",
    speed: 30,
    capacity: 14e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 184",
    format: "A3",
    speed: 28,
    capacity: 28e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 363",
    format: "A3",
    speed: 36,
    capacity: 48e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 42",
    format: "A3",
    speed: 42,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 423",
    format: "A3",
    speed: 43,
    capacity: 25e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 364e",
    format: "A3",
    speed: 36,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 284e",
    format: "A3",
    speed: 28,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 454e",
    format: "A3",
    speed: 45,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 420",
    format: "A3",
    speed: 42,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 421",
    format: "A3",
    speed: 45,
    capacity: 14500,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 283",
    format: "A3",
    speed: 36,
    capacity: 12500,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 552",
    format: "A3",
    speed: 55,
    capacity: 45e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 554e",
    format: "A3",
    speed: 55,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 500",
    format: "A3",
    speed: 50,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 501",
    format: "A3",
    speed: 50,
    capacity: 15e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 654e",
    format: "A3",
    speed: 65,
    capacity: 49e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 362",
    format: "A3",
    speed: 36,
    capacity: 17500,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 222",
    format: "A3",
    speed: 22,
    capacity: 17500,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 350",
    format: "A3",
    speed: 35,
    capacity: 48e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 754e",
    format: "A3",
    speed: 75,
    capacity: 49e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 600",
    format: "A3",
    speed: 60,
    capacity: 2e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 601",
    format: "A3",
    speed: 60,
    capacity: 29e3,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "bizhub 211",
    format: "A3",
    speed: 21,
    capacity: 4e4,
    cartridges: [],
    device: "MFU",
    vendor: "minolta",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B2400",
    format: "A4",
    speed: 20,
    capacity: 2e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4300",
    format: "A4",
    speed: 19,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4100",
    format: "A4",
    speed: 18,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B2400",
    format: "A4",
    speed: 20,
    capacity: 2e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B2200",
    format: "A4",
    speed: 21,
    capacity: 2e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B401",
    format: "A4",
    speed: 29,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4350",
    format: "A4",
    speed: 35,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4250",
    format: "A4",
    speed: 22,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4400",
    format: "A4",
    speed: 26,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4600",
    format: "A4",
    speed: 26,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4550",
    format: "A4",
    speed: 24,
    capacity: 7e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4500",
    format: "A4",
    speed: 24,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B411",
    format: "A4",
    speed: 33,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B412",
    format: "A4",
    speed: 33,
    capacity: 5e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B440",
    format: "A4",
    speed: 28,
    capacity: 3500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B6200",
    format: "A4",
    speed: 24,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B432",
    format: "A4",
    speed: 40,
    capacity: 5e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B512",
    format: "A4",
    speed: 47,
    capacity: 7e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B6250",
    format: "A4",
    speed: 30,
    capacity: 7e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B6100",
    format: "A4",
    speed: 25,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B6300",
    format: "A4",
    speed: 34,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B730",
    format: "A4",
    speed: 38,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B720",
    format: "A4",
    speed: 38,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B710",
    format: "A4",
    speed: 38,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B731",
    format: "A4",
    speed: 60,
    capacity: 18e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B6500",
    format: "A4",
    speed: 43,
    capacity: 13e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B721",
    format: "A4",
    speed: 49,
    capacity: 18e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B930",
    format: "A4",
    speed: 50,
    capacity: 25e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B840",
    format: "A3",
    speed: 40,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B8300",
    format: "A3",
    speed: 45,
    capacity: 27e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B930",
    format: "A3",
    speed: 50,
    capacity: 3e4,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4525",
    format: "A4",
    speed: 21,
    capacity: 6e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB260",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B2500",
    format: "A4",
    speed: 21,
    capacity: 2200,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB451",
    format: "A4",
    speed: 29,
    capacity: 2500,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB441",
    format: "A4",
    speed: 29,
    capacity: 2500,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB280",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B2520",
    format: "A4",
    speed: 16,
    capacity: 2200,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB461",
    format: "A4",
    speed: 33,
    capacity: 7e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB460",
    format: "A4",
    speed: 28,
    capacity: 3500,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB472",
    format: "A4",
    speed: 33,
    capacity: 7e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB290",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B2540",
    format: "A4",
    speed: 16,
    capacity: 2200,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB471",
    format: "A4",
    speed: 33,
    capacity: 7e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB480",
    format: "A4",
    speed: 28,
    capacity: 3500,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB470",
    format: "A4",
    speed: 28,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB492",
    format: "A4",
    speed: 40,
    capacity: 7e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB491",
    format: "A4",
    speed: 40,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB562",
    format: "A4",
    speed: 45,
    capacity: 7e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "B4545",
    format: "A4",
    speed: 21,
    capacity: 6e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ES4191",
    format: "A4",
    speed: 40,
    capacity: 12e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ES7170",
    format: "A4",
    speed: 52,
    capacity: 36e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB760",
    format: "A4",
    speed: 49,
    capacity: 18e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MB770",
    format: "A4",
    speed: 55,
    capacity: 18e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ES9170",
    format: "A3",
    speed: 45,
    capacity: 44e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "ES9160",
    format: "A3",
    speed: 45,
    capacity: 44e3,
    cartridges: [],
    device: "MFU",
    vendor: "oki",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "C110",
    format: "A4",
    speed: 19,
    capacity: 1500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C130",
    format: "A4",
    speed: 20,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C711",
    format: "A4",
    speed: 34,
    capacity: 11500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C301",
    format: "A4",
    speed: 22,
    capacity: 2200,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C321",
    format: "A4",
    speed: 22,
    capacity: 2200,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3200",
    format: "A4",
    speed: 20,
    capacity: 1500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3400",
    format: "A4",
    speed: 20,
    capacity: 1500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3300",
    format: "A4",
    speed: 16,
    capacity: 1e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MC350",
    format: "A4",
    speed: 16,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3100",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C330",
    format: "A4",
    speed: 24,
    capacity: 3500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C331",
    format: "A4",
    speed: 24,
    capacity: 3500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C510",
    format: "A4",
    speed: 30,
    capacity: 3500,
    cartridges: [],
    device: "printer",
    vendor: "oki",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "M1200",
    format: "A4",
    speed: 20,
    capacity: 1800,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-5800",
    format: "A4",
    speed: 10,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-5900",
    format: "A4",
    speed: 12,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-6100",
    format: "A4",
    speed: 16,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-6200",
    format: "A4",
    speed: 20,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M1400",
    format: "A4",
    speed: 24,
    capacity: 1e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M2000",
    format: "A4",
    speed: 28,
    capacity: 3500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M2010",
    format: "A4",
    speed: 28,
    capacity: 3500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M2300",
    format: "A4",
    speed: 30,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AL-M200",
    format: "A4",
    speed: 30,
    capacity: 2500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-5700",
    format: "A4",
    speed: 8,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N1600",
    format: "A4",
    speed: 16,
    capacity: 8500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M2400",
    format: "A4",
    speed: 35,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AL-M300",
    format: "A4",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "2600",
    format: "A4",
    speed: 30,
    capacity: 5e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N3000",
    format: "A4",
    speed: 34,
    capacity: 17e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M4000",
    format: "A4",
    speed: 43,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M4000",
    format: "A4",
    speed: 43,
    capacity: 2e4,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "M8000",
    format: "A4",
    speed: 44,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AL-M400",
    format: "A4",
    speed: 45,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N2010",
    format: "A3",
    speed: 20,
    capacity: 7600,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N2000",
    format: "A3",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N2550",
    format: "A3",
    speed: 30,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N2750",
    format: "A3",
    speed: 27,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N2700",
    format: "A3",
    speed: 27,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "EPL-N7000",
    format: "A3",
    speed: 35,
    capacity: 15e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX14",
    format: "A4",
    speed: 24,
    capacity: 1e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AL-MX200",
    format: "A4",
    speed: 30,
    capacity: 2500,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX20",
    format: "A4",
    speed: 28,
    capacity: 3e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "C1700",
    format: "A4",
    speed: 12,
    capacity: 700,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C1750",
    format: "A4",
    speed: 15,
    capacity: 700,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C900",
    format: "A4",
    speed: 16,
    capacity: 4500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C1000",
    format: "A4",
    speed: 20,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C2000",
    format: "A4",
    speed: 20,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C2900",
    format: "A4",
    speed: 23,
    capacity: 3e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C1100",
    format: "A4",
    speed: 25,
    capacity: 4e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3000",
    format: "A4",
    speed: 24,
    capacity: 4500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3800",
    format: "A4",
    speed: 25,
    capacity: 9500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C4000",
    format: "A4",
    speed: 16,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C2800",
    format: "A4",
    speed: 25,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C4200",
    format: "A4",
    speed: 35,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C4100",
    format: "A4",
    speed: 24,
    capacity: 1e4,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C2600",
    format: "A4",
    speed: 30,
    capacity: 5e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C3900",
    format: "A4",
    speed: 30,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "AL-C500",
    format: "A4",
    speed: 45,
    capacity: 7500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C8600",
    format: "A3",
    speed: 35,
    capacity: 5500,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C9100",
    format: "A3",
    speed: 24,
    capacity: 12e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C9300",
    format: "A3",
    speed: 30,
    capacity: 14e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C8500",
    format: "A3",
    speed: 26,
    capacity: 6e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "C9200",
    format: "A3",
    speed: 26,
    capacity: 14e3,
    cartridges: [],
    device: "printer",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX17",
    format: "A4",
    speed: 15,
    capacity: 2e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX16",
    format: "A4",
    speed: 20,
    capacity: 1600,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX29",
    format: "A4",
    speed: 23,
    capacity: 2500,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX11",
    format: "A4",
    speed: 25,
    capacity: 4e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX21",
    format: "A4",
    speed: 25,
    capacity: 4500,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX28",
    format: "A4",
    speed: 24,
    capacity: 8e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "CX37",
    format: "A4",
    speed: 24,
    capacity: 6e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "Station 8600",
    format: "A3",
    speed: 35,
    capacity: 5e3,
    cartridges: [],
    device: "MFU",
    vendor: "epson",
    type: "color",
    price: {},
    examples: []
  },
  {
    model: "MX-B200",
    format: "A4",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-B201",
    format: "A4",
    speed: 20,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-5618",
    format: "A3",
    speed: 18,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-5620",
    format: "A3",
    speed: 20,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M202",
    format: "A3",
    speed: 20,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M232",
    format: "A3",
    speed: 23,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M182",
    format: "A3",
    speed: 18,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-5623",
    format: "A3",
    speed: 23,
    capacity: 5e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-6020",
    format: "A3",
    speed: 20,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-6023",
    format: "A3",
    speed: 23,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-6023",
    format: "A3",
    speed: 23,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-6031",
    format: "A3",
    speed: 31,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-6026",
    format: "A3",
    speed: 26,
    capacity: 6e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-5731",
    format: "A3",
    speed: 31,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M264",
    format: "A3",
    speed: 26,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M354",
    format: "A3",
    speed: 35,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "AR-5726",
    format: "A3",
    speed: 26,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M356",
    format: "A3",
    speed: 26,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M564",
    format: "A3",
    speed: 56,
    capacity: 75e3,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M314",
    format: "A3",
    speed: 31,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M266",
    format: "A3",
    speed: 26,
    capacity: 1e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  },
  {
    model: "MX-M754",
    format: "A3",
    speed: 75,
    capacity: 3e4,
    cartridges: [],
    device: "MFU",
    vendor: "sharp",
    type: "mono",
    price: {},
    examples: []
  }
];
const monoPrinter9kA4 = {
  diagnostics: 300,
  TO: 600,
  rollers: 300,
  drum: 550,
  laser: 900,
  therm: 1e3,
  reducer: 600,
  scaner: null,
  adf: null,
  duplex: 400,
  electronics: 1100
};
const monoPrinter10k40kA4 = {
  diagnostics: 350,
  TO: 650,
  rollers: 300,
  drum: 600,
  laser: 1e3,
  therm: 1200,
  reducer: 700,
  scaner: null,
  adf: null,
  duplex: 450,
  electronics: 1250
};
const monoPrinter40k100kA4 = {
  diagnostics: 400,
  TO: 700,
  rollers: 350,
  drum: 700,
  laser: 1100,
  therm: 1300,
  reducer: 900,
  scaner: null,
  adf: null,
  duplex: 500,
  electronics: 1500
};
const monoPrinter100k150kA4 = {
  diagnostics: 450,
  TO: 1e3,
  rollers: 400,
  drum: 700,
  laser: 1400,
  therm: 1600,
  reducer: 1100,
  scaner: null,
  adf: null,
  duplex: 550,
  electronics: 1800
};
const monoPrinter150k225kA4 = {
  diagnostics: 550,
  TO: 1100,
  rollers: 450,
  drum: 750,
  laser: 1500,
  therm: 1600,
  reducer: 1100,
  scaner: null,
  adf: null,
  duplex: 550,
  electronics: 2e3
};
const monoPrinter225kA4 = {
  diagnostics: 600,
  TO: 1400,
  rollers: 450,
  drum: 750,
  laser: 2100,
  therm: 2200,
  reducer: 1400,
  scaner: null,
  adf: null,
  duplex: 700,
  electronics: 2500
};
const monoPrinter65kA3 = {
  diagnostics: 500,
  TO: 900,
  rollers: 450,
  drum: 700,
  laser: 1450,
  therm: 1600,
  reducer: 1200,
  scaner: null,
  adf: null,
  duplex: 700,
  electronics: 2e3
};
const monoPrinter65k150kA3 = {
  diagnostics: 600,
  TO: 1300,
  rollers: 500,
  drum: 750,
  laser: 2100,
  therm: 2200,
  reducer: 1400,
  scaner: null,
  adf: null,
  duplex: 800,
  electronics: 2500
};
const monoPrinter150kA3 = {
  diagnostics: 750,
  TO: 1500,
  rollers: 500,
  drum: 900,
  laser: 2800,
  therm: 2900,
  reducer: 2e3,
  scaner: null,
  adf: null,
  duplex: 800,
  electronics: 3e3
};
const colorPrinter20kA4 = {
  diagnostics: 450,
  TO: 800,
  rollers: 400,
  drum: 700,
  laser: 1200,
  therm: 1400,
  reducer: 1e3,
  scaner: null,
  adf: null,
  duplex: 550,
  electronics: 1800
};
const colorPrinter20k60kA4 = {
  diagnostics: 500,
  TO: 900,
  rollers: 400,
  drum: 750,
  laser: 1450,
  therm: 1650,
  reducer: 1100,
  scaner: null,
  adf: null,
  duplex: 550,
  electronics: 1800
};
const colorPrinter60k80kA4 = {
  diagnostics: 600,
  TO: 1e3,
  rollers: 450,
  drum: 750,
  laser: 1800,
  therm: 2e3,
  reducer: 1400,
  scaner: null,
  adf: null,
  duplex: 800,
  electronics: 2500
};
const colorPrinter80k100kA4 = {
  diagnostics: 650,
  TO: 1200,
  rollers: 500,
  drum: 800,
  laser: 2100,
  therm: 2300,
  reducer: 1700,
  scaner: null,
  adf: null,
  duplex: 800,
  electronics: 2500
};
const colorPrinter100kA4 = {
  diagnostics: 750,
  TO: 1400,
  rollers: 500,
  drum: 900,
  laser: 2500,
  therm: 2700,
  reducer: 2e3,
  scaner: null,
  adf: null,
  duplex: 800,
  electronics: 2500
};
const colorPrinter75kA3 = {
  diagnostics: 700,
  TO: 1400,
  rollers: 500,
  drum: 800,
  laser: 2100,
  therm: 2300,
  reducer: 1800,
  scaner: null,
  adf: null,
  duplex: 800,
  electronics: 2500
};
const colorPrinter75k120kA3 = {
  diagnostics: 800,
  TO: 1700,
  rollers: 550,
  drum: 950,
  laser: 2900,
  therm: 2900,
  reducer: 2e3,
  scaner: null,
  adf: null,
  duplex: 850,
  electronics: 2600
};
const colorPrinter120kA3 = {
  diagnostics: 900,
  TO: 2e3,
  rollers: 600,
  drum: 1e3,
  laser: 3200,
  therm: 3200,
  reducer: 2200,
  scaner: null,
  adf: null,
  duplex: 950,
  electronics: 2800
};
const monoMFU9kA4 = {
  diagnostics: 400,
  TO: 700,
  rollers: 350,
  drum: 700,
  laser: 1100,
  therm: 1300,
  reducer: 850,
  scaner: 750,
  adf: 450,
  duplex: 500,
  electronics: 1500
};
const monoMFU9k15kA4 = {
  diagnostics: 450,
  TO: 800,
  rollers: 400,
  drum: 700,
  laser: 1300,
  therm: 1500,
  reducer: 900,
  scaner: 900,
  adf: 450,
  duplex: 550,
  electronics: 1800
};
const monoMFU15k50kA4 = {
  diagnostics: 550,
  TO: 900,
  rollers: 400,
  drum: 750,
  laser: 1700,
  therm: 1800,
  reducer: 1200,
  scaner: 1300,
  adf: 450,
  duplex: 600,
  electronics: 2100
};
const monoMFU50k75kA4 = {
  diagnostics: 600,
  TO: 1300,
  rollers: 450,
  drum: 800,
  laser: 2100,
  therm: 2200,
  reducer: 1400,
  scaner: 1400,
  adf: 500,
  duplex: 700,
  electronics: 2500
};
const monoMFU75k130kA4 = {
  diagnostics: 700,
  TO: 1400,
  rollers: 500,
  drum: 800,
  laser: 2100,
  therm: 2300,
  reducer: 1800,
  scaner: 1600,
  adf: 600,
  duplex: 800,
  electronics: 2500
};
const monoMFU130k200kA4 = {
  diagnostics: 750,
  TO: 1500,
  rollers: 500,
  drum: 1e3,
  laser: 2800,
  therm: 2900,
  reducer: 2e3,
  scaner: 1900,
  adf: 600,
  duplex: 800,
  electronics: 3e3
};
const monoMFU200kA4 = {
  diagnostics: 800,
  TO: 1500,
  rollers: 500,
  drum: 1e3,
  laser: 2950,
  therm: 2900,
  reducer: 2100,
  scaner: 1950,
  adf: 650,
  duplex: 850,
  electronics: 3e3
};
const monoMFU25kA3 = {
  diagnostics: 500,
  TO: 900,
  rollers: 400,
  drum: 750,
  laser: 1700,
  therm: 1800,
  reducer: 1200,
  scaner: 1300,
  adf: 450,
  duplex: 600,
  electronics: 2100
};
const monoMFU25k50kA3 = {
  diagnostics: 650,
  TO: 1100,
  rollers: 450,
  drum: 850,
  laser: 2300,
  therm: 2300,
  reducer: 1500,
  scaner: 1500,
  adf: 500,
  duplex: 700,
  electronics: 2500
};
const monoMFU50k100kA3 = {
  diagnostics: 700,
  TO: 1450,
  rollers: 500,
  drum: 900,
  laser: 2900,
  therm: 2700,
  reducer: 2e3,
  scaner: 1900,
  adf: 600,
  duplex: 800,
  electronics: 2500
};
const monoMFU100k150kA3 = {
  diagnostics: 800,
  TO: 1700,
  rollers: 550,
  drum: 950,
  laser: 2900,
  therm: 2900,
  reducer: 2e3,
  scaner: 2e3,
  adf: 750,
  duplex: 850,
  electronics: 2600
};
const monoMFU150k200kA3 = {
  diagnostics: 1e3,
  TO: 2e3,
  rollers: 650,
  drum: 1100,
  laser: 3500,
  therm: 3500,
  reducer: 2300,
  scaner: 2500,
  adf: 800,
  duplex: 1100,
  electronics: 3e3
};
const monoMFU200kA3 = {
  diagnostics: 1200,
  TO: 2200,
  rollers: 650,
  drum: 1200,
  laser: 3500,
  therm: 3600,
  reducer: 2500,
  scaner: 2700,
  adf: 850,
  duplex: 1300,
  electronics: 3300
};
const colorMFU75kA3 = {
  diagnostics: 1200,
  TO: 2200,
  rollers: 650,
  drum: 1200,
  laser: 3500,
  therm: 3600,
  reducer: 2500,
  scaner: 2700,
  adf: 850,
  duplex: 1300,
  electronics: 3300
};
const colorMFU75k120kA3 = {
  diagnostics: 1300,
  TO: 2400,
  rollers: 700,
  drum: 1200,
  laser: 3700,
  therm: 3800,
  reducer: 2700,
  scaner: 2900,
  adf: 900,
  duplex: 1400,
  electronics: 4e3
};
const colorMFU120k200kA3 = {
  diagnostics: 1400,
  TO: 2700,
  rollers: 750,
  drum: 1600,
  laser: 3800,
  therm: 4100,
  reducer: 3e3,
  scaner: 3200,
  adf: 1e3,
  duplex: 1500,
  electronics: 4400
};
const colorMFU200kA3 = {
  diagnostics: 1600,
  TO: 2900,
  rollers: 850,
  drum: 1800,
  laser: 4200,
  therm: 4500,
  reducer: 3500,
  scaner: 3700,
  adf: 1500,
  duplex: 1800,
  electronics: 6e3
};
const colorMFU25kA4 = {
  diagnostics: 900,
  TO: 1e3,
  rollers: 500,
  drum: 900,
  laser: 2500,
  therm: 3e3,
  reducer: 2e3,
  scaner: 2e3,
  adf: 850,
  duplex: 1300,
  electronics: 2500
};
const colorMFU25k50kA4 = {
  diagnostics: 1100,
  TO: 1200,
  rollers: 600,
  drum: 1200,
  laser: 2800,
  therm: 3500,
  reducer: 2500,
  scaner: 2500,
  adf: 900,
  duplex: 1400,
  electronics: 3e3
};
const colorMFU50k100kA4 = {
  diagnostics: 1300,
  TO: 1500,
  rollers: 700,
  drum: 1500,
  laser: 3e3,
  therm: 4e3,
  reducer: 3e3,
  scaner: 3e3,
  adf: 1e3,
  duplex: 1500,
  electronics: 3500
};
const colorMFU100kA4 = {
  diagnostics: 1500,
  TO: 1700,
  rollers: 800,
  drum: 1800,
  laser: 3500,
  therm: 4500,
  reducer: 3500,
  scaner: 3500,
  adf: 1500,
  duplex: 1800,
  electronics: 3e3
};
const repair = repairPrintersPrice.map((i) => {
  if (i.device === "printer" && i.type === "mono" && i.format === "A4" && i.capacity < 9e3) {
    i.price = monoPrinter9kA4;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A4" && i.capacity >= 9e3 && i.capacity < 4e4) {
    i.price = monoPrinter10k40kA4;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A4" && i.capacity >= 4e4 && i.capacity < 1e5) {
    i.price = monoPrinter40k100kA4;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A4" && i.capacity >= 1e5 && i.capacity < 15e4) {
    i.price = monoPrinter100k150kA4;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A4" && i.capacity >= 15e4 && i.capacity < 225e3) {
    i.price = monoPrinter150k225kA4;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A4" && i.capacity > 225e3) {
    i.price = monoPrinter225kA4;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A3" && i.capacity < 65e3) {
    i.price = monoPrinter65kA3;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A3" && i.capacity >= 65e3 && i.capacity < 15e4) {
    i.price = monoPrinter65k150kA3;
    return i;
  } else if (i.device === "printer" && i.type === "mono" && i.format === "A3" && i.capacity > 15e4) {
    i.price = monoPrinter150kA3;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A4" && i.capacity < 2e4) {
    i.price = colorPrinter20kA4;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A4" && i.capacity >= 2e4 && i.capacity < 6e4) {
    i.price = colorPrinter20k60kA4;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A4" && i.capacity >= 6e4 && i.capacity < 8e4) {
    i.price = colorPrinter60k80kA4;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A4" && i.capacity >= 8e4 && i.capacity < 1e5) {
    i.price = colorPrinter80k100kA4;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A4" && i.capacity > 1e5) {
    i.price = colorPrinter100kA4;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A3" && i.capacity < 75e3) {
    i.price = colorPrinter75kA3;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A3" && i.capacity >= 75e3 && i.capacity < 12e4) {
    i.price = colorPrinter75k120kA3;
    return i;
  } else if (i.device === "printer" && i.type === "color" && i.format === "A3" && i.capacity > 12e4) {
    i.price = colorPrinter120kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity < 9e3) {
    i.price = monoMFU9kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity >= 9e3 && i.capacity < 15e3) {
    i.price = monoMFU9k15kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity >= 15e3 && i.capacity < 5e4) {
    i.price = monoMFU15k50kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity >= 5e4 && i.capacity < 75e3) {
    i.price = monoMFU50k75kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity >= 75e3 && i.capacity < 13e4) {
    i.price = monoMFU75k130kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity >= 13e4 && i.capacity < 2e5) {
    i.price = monoMFU130k200kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A4" && i.capacity > 2e5) {
    i.price = monoMFU200kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A3" && i.capacity < 25e3) {
    i.price = monoMFU25kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A3" && i.capacity >= 25e3 && i.capacity < 5e4) {
    i.price = monoMFU25k50kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A3" && i.capacity >= 5e4 && i.capacity < 1e5) {
    i.price = monoMFU50k100kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A3" && i.capacity >= 1e5 && i.capacity < 15e4) {
    i.price = monoMFU100k150kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A3" && i.capacity >= 15e4 && i.capacity < 2e5) {
    i.price = monoMFU150k200kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "mono" && i.format === "A3" && i.capacity > 2e5) {
    i.price = monoMFU200kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A3" && i.capacity < 75e3) {
    i.price = colorMFU75kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A3" && i.capacity >= 75e3 && i.capacity < 12e4) {
    i.price = colorMFU75k120kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A3" && i.capacity >= 12e4 && i.capacity < 2e5) {
    i.price = colorMFU120k200kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A3" && i.capacity > 2e5) {
    i.price = colorMFU200kA3;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A4" && i.capacity < 25e3) {
    i.price = colorMFU25kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A4" && i.capacity >= 25e3 && i.capacity < 5e4) {
    i.price = colorMFU25k50kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A4" && i.capacity >= 5e4 && i.capacity < 1e5) {
    i.price = colorMFU50k100kA4;
    return i;
  } else if (i.device === "MFU" && i.type === "color" && i.format === "A4" && i.capacity > 1e5) {
    i.price = colorMFU100kA4;
    return i;
  } else {
    return i;
  }
});
function RepairComponent() {
  const { vendor: vendor2 } = useParams();
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  const filterCategory = repair.filter((i) => i.vendor === vendor2);
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = `Ремонт принтеров и МФУ ${vendor2.toUpperCase()}`;
    document.querySelector('meta[name="title"]').setAttribute("content", `Ремонт принтеров и МФУ ${vendor2.toUpperCase()}`);
    document.querySelector('meta[name="description"]').setAttribute("content", `Прайс по ремонту принтеров и МФУ ${vendor2.toUpperCase()}`);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `ремонт принтеров и МФУ ${vendor2.toUpperCase()}, техническое обслуживание принтеров и МФУ ${vendor2.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
  }, [vendor2]);
  return filterCategory.length > 0 ? /* @__PURE__ */ jsxs("div", { className: styles$t.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$t.title_box, children: /* @__PURE__ */ jsx("p", { className: styles$t.description, children: "Выберите производителя и модель принтера" }) }),
    /* @__PURE__ */ jsx(VendorMenuRepair, {}),
    /* @__PURE__ */ jsx(Filter, {}),
    /* @__PURE__ */ jsx(RepairItemsComponent, { data: filterCategory })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
}
const container$e = "_container_p98pe_1";
const title_box$1 = "_title_box_p98pe_23";
const description$1 = "_description_p98pe_41";
const styles$p = {
  container: container$e,
  title_box: title_box$1,
  description: description$1
};
const price_row$3 = "_price_row_1s7bl_1";
const link$2 = "_link_1s7bl_39";
const model_cart$1 = "_model_cart_1s7bl_49";
const vendor$3 = "_vendor_1s7bl_73";
const chip$1 = "_chip_1s7bl_103";
const refill_price$1 = "_refill_price_1s7bl_127";
const recovery_price$1 = "_recovery_price_1s7bl_151";
const separator$3 = "_separator_1s7bl_257";
const styles$o = {
  price_row: price_row$3,
  link: link$2,
  model_cart: model_cart$1,
  vendor: vendor$3,
  chip: chip$1,
  refill_price: refill_price$1,
  recovery_price: recovery_price$1,
  separator: separator$3
};
const Item = ({ modelCart, vend, chip: chip2, devices, recovery_price: recovery_price2, refill_price: refill_price2, examples }) => {
  const location = useLocation();
  const locationPathname = location.pathname;
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `${locationPathname}/${modelCart}`,
      className: styles$o.link,
      children: /* @__PURE__ */ jsxs("div", { className: styles$o.price_row, children: [
        /* @__PURE__ */ jsx("p", { className: styles$o.model_cart, children: `${modelCart.toUpperCase()}` }),
        /* @__PURE__ */ jsx("p", { className: styles$o.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$o.vendor, children: `${vend.toUpperCase()} ${devices}` }),
        /* @__PURE__ */ jsx("p", { className: styles$o.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$o.chip, children: chip2 ? "уточняйте" : "не требуется" }),
        /* @__PURE__ */ jsx("p", { className: styles$o.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$o.refill_price, children: refill_price2 }),
        /* @__PURE__ */ jsx("p", { className: styles$o.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$o.recovery_price, children: recovery_price2 })
      ] })
    },
    modelCart
  );
};
const price_container$3 = "_price_container_16997_1";
const price_row$2 = "_price_row_16997_37";
const model_cart = "_model_cart_16997_69";
const vendor$2 = "_vendor_16997_93";
const chip = "_chip_16997_117";
const refill_price = "_refill_price_16997_141";
const recovery_price = "_recovery_price_16997_165";
const separator$2 = "_separator_16997_287";
const styles$n = {
  price_container: price_container$3,
  price_row: price_row$2,
  model_cart,
  vendor: vendor$2,
  chip,
  refill_price,
  recovery_price,
  separator: separator$2
};
function FilterItemsComponent({ data }) {
  useParams();
  const filterValue = useSelector((state) => state.filter.value.value);
  const filteredData = data.filter((i) => i.modelCart.toLowerCase().includes(filterValue === void 0 ? "" : filterValue.toLowerCase()) || i.devices.toLowerCase().includes(filterValue === void 0 ? "" : filterValue.toLowerCase()));
  return /* @__PURE__ */ jsxs("div", { className: styles$n.price_container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$n.price_row, children: [
      /* @__PURE__ */ jsx("p", { className: styles$n.model_cart, children: "Модель картриджа" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.vendor, children: "Модель принтера" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.chip, children: "Замена чипа" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.refill_price, children: "Заправка" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$n.recovery_price, children: "Восстановление" })
    ] }),
    filteredData && filteredData.map((i, key) => {
      return /* @__PURE__ */ jsx(
        Item,
        {
          modelCart: i.modelCart,
          vend: i.vendor,
          chip: i.chip,
          devices: i.devices,
          recovery_price: i.recovery_price,
          refill_price: i.refill_price,
          examples: i.examples
        },
        key
      );
    })
  ] });
}
const refillData = [
  {
    modelCart: "CF281A",
    resource: 10500,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M604 / M605 / M606 / M630",
    refill_price: "900 ₽",
    recovery_price: "1550 ₽"
  },
  {
    modelCart: "CF281X",
    resource: 25e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M604 / M605 / M606 / M630",
    refill_price: "1150 ₽",
    recovery_price: "1850 ₽"
  },
  {
    modelCart: "CF218A",
    resource: 1400,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M104 / M132",
    refill_price: "500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "W1106A",
    resource: 1e3,
    examples: [
      {
        title: "Заправка W1106A",
        photo: [
          {
            item: "106-1.jpg"
          },
          {
            item: "106-2.jpg"
          },
          {
            item: "106-3.jpg"
          },
          {
            item: "106-4.jpg"
          },
          {
            item: "106-5.jpg"
          },
          {
            item: "106-6.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже показан пример заправки оригинального картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "HP W1106A" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Данные картриджи являются полными аналогами ",
            /* @__PURE__ */ jsx("a", { href: "https://printridge.ru/refill/samsung/MLT-D104S", children: "SAMSUNG MLT-D104S" }),
            ", которые использовались при принтерах и мфу SAMSUNG ML-1660, SCX-3200 и др. Так же, как и прародитель, W1106A имеют чип, который запрограммирован на определённое количество копий. По истечении ресурса, аппарат блокируется и требует установить новый картридж, с новым чипом. На страницах нашего сайта вы можете найти информацию о перепрошивке ",
            /* @__PURE__ */ jsx("a", { href: "https://printridge.ru/repair/hp/135a", children: "МФУ HP 135a" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Сам процесс заправки картриджа достаточно простой. Крышки картриджа крепятся не на болты, а запайками, которые необходимо срезать. После этого картридж делится на две половины. Чистится бункер отработки и заправляется бункер с тонером. При необходимости, чистится дозирующее лезвие.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "После всех манипуляций, необходимо установить чип, либо перепрошить сам аппарат.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа HP W1106A" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "Laser 107a / MFP 135a / 137a",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "Q7570A",
    resource: 15e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M5025 / M5035",
    refill_price: "400 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CZ192A",
    resource: 12e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M435 / M701 / M706",
    refill_price: "400 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CF325X",
    resource: 4e4,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M806 / M830",
    refill_price: "5000 ₽",
    recovery_price: "6500 ₽"
  },
  {
    modelCart: "C8543Х",
    resource: 3e4,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 9000 / 9040 / 9050",
    refill_price: "2500 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CF219A",
    resource: 12e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M104 / M132",
    refill_price: "-",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "CF233A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M106 / M134",
    refill_price: "450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF234A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M106 / M134",
    refill_price: "-",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF230A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M203 / M227",
    refill_price: "500 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "CF230X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M203 / M227",
    refill_price: "1000 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "CF287A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M501 / M506 / M527",
    refill_price: "1500 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CF287X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M501 / M506 / M527",
    refill_price: "2500 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CF237A",
    resource: 11e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M607 / M608 / M609 / M631 / M632",
    refill_price: "1500 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CF237X",
    resource: 25e3,
    examples: [
      {
        title: "Восстановление CF237X",
        photo: [
          {
            item: "CF237X-1.jpg"
          },
          {
            item: "CF237X-2.jpg"
          },
          {
            item: "CF237X-3.jpg"
          },
          {
            item: "CF237X-4.jpg"
          },
          {
            item: "CF237X-5.jpg"
          },
          {
            item: "CF237X-6.jpg"
          },
          {
            item: "CF237X-7.jpg"
          },
          {
            item: "CF237X-8.jpg"
          },
          {
            item: "CF237X-9.jpg"
          },
          {
            item: "CF237X-10.jpg"
          },
          {
            item: "CF237X-11.jpg"
          },
          {
            item: "CF237X-12.jpg"
          },
          {
            item: "CF237X-13.jpg"
          },
          {
            item: "CF237X-14.jpg"
          },
          {
            item: "CF237X-15.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "На фотографиях ниже мы показываем процесс восстановления картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "HP CF237X" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Данные картриджи не отличаются сложностью конструкции, но, без определённых знаний и навыков, могут возникнуть некоторые проблемы. Важно правильно выдавить боковые шплинты, чтобы разобрать на две половинки. На первых трёх фотографиях мы показываем как это можно сделать. После выдавливания шплинтов, снимаются боковые пружины и картридж легко разбирается на две половины.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Далее ничего сложного. Разбираем часть с барабаном, чистим отработку, моем ролик заряда, собираем и устанавливаем новый фотовал. Картриджи ",
            /* @__PURE__ */ jsx("strong", { children: "HP CF237X" }),
            " имеют ресурс 25000 копий, с таким ресурсом фотовал нужно менять при каждой заправке. Иначе, картридж будет печатать бледно или могут появиться другое дефекты, например, чёрные полосы по краям.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "После того как собрали часть картриджа с фотовалом, приступаем к заправке. Для этого берём вторую половинку картриджа, Снимаем правую крышку и достаём магнитный вал. В нашем случае, тонер распределяется по магнитному валу неравномерно. Это без сомнений скажется на качестве отпечатка. Потому, обязательно нужно мыть дозирующее лезвие. При каждой заправке. Мы это делаем техническим спиртом. После того как лезвие очистили, засыпаем в бункер тонер, устанавливаем магнитный вал и закрывает правую крышку.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "После заправки, собираем в обратном порядке обе части картриджа, устанавливаем чип, и идём упаковывать картридж. Всё готово. Заправка и восстановление картриджей ",
            /* @__PURE__ */ jsx("strong", { children: "HP CF237X" }),
            " возможны как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M607 / M608 / M609 / M631 / M633",
    refill_price: "2500 ₽",
    recovery_price: "4000 ₽"
  },
  {
    modelCart: "CF237Y",
    resource: 41e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M607 / M608 / M609 / M631 / M634",
    refill_price: "4500 ₽",
    recovery_price: "6000 ₽"
  },
  {
    modelCart: "CF279A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M12 / M26",
    refill_price: "450 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "CF217A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M102 / М130",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF231A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M230",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF226A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M402 / M426",
    refill_price: "500 ₽",
    recovery_price: "1200"
  },
  {
    modelCart: "CF226X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M402 / M426",
    refill_price: "800 ₽",
    recovery_price: "1500"
  },
  {
    modelCart: "CF259A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M404 / M428",
    refill_price: "500 ₽",
    recovery_price: "1200"
  },
  {
    modelCart: "CF259X",
    examples: [
      {
        title: "Заправляем CF259X",
        photo: [
          {
            item: "IMG_20240227_113026_066.jpg"
          },
          {
            item: "IMG_20240227_113142_180.jpg"
          },
          {
            item: "IMG_20240227_113257_755.jpg"
          },
          {
            item: "IMG_20240227_113415_414.jpg"
          },
          {
            item: "IMG_20240227_113534_522.jpg"
          },
          {
            item: "IMG_20240227_113610_798.jpg"
          },
          {
            item: "IMG_20240227_150348_757.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "В данном примере показан процесс заправки картриджа HP CF259X." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Сначала картридж разбирается, снимается барабан и высыпается отработка. Далее бункер отработанного тонера очищается пылесосом. Ролик заряда чистится спиртом и устанавливается новый фотовал.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Данные картриджи мы не рекомендуем заправлять без замены фотовала. Это обусловлено тем, что фотовал рассчитан на количество копий, немного превышающее ресурс картриджа. Если заправить именно ",
            /* @__PURE__ */ jsx("strong", { children: "CF259X" }),
            " и не заменить фотовал, картридж отработает 10%-30% ресурса и будет печатать бледно! В этом случае, вам придётся снова нести картридж на восстановление.  Далее мы разбираем бункер с тонером, меняем оболочку магнитного вала (чтобы предотвратить бледную печать) и засыпаем новый тонер. Если прошлая заправка была не у нас, тогда мы вычищаем бункер от старого содержимого. Иначе картридж может печатать с фоном.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "После всех манипуляций, собираем картридж и идём его тестировать.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа HP CF259X" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M404 / M428",
    refill_price: "800 ₽",
    recovery_price: "1500"
  },
  {
    modelCart: "CF214A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M712 / M725",
    refill_price: "1250 ₽",
    recovery_price: "2250 ₽"
  },
  {
    modelCart: "CF214X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M712 / M725",
    refill_price: "1850 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CF244A",
    resource: 1e3,
    examples: [
      {
        title: "Заправка CF244A",
        photo: [
          {
            item: "IMG_20240306_105458_9551741248976.jpg"
          },
          {
            item: "IMG_20240306_105532_673-14982970.jpg"
          },
          {
            item: "IMG_20240306_105653_1281472235.jpg"
          },
          {
            item: "IMG_20240306_105805_747-843415017.jpg"
          },
          {
            item: "IMG_20240306_105839_880922716846.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("p", { children: "Заправляем картридж HP CF244A." }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Сам картридж очень похож на своих старших собратьев, типа, CF283A, CE285A и прочих, но со своими конструктивными особенностями.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            'Без "варварских" методов оригинальный картридж разобрать не получится. Две части картриджа запаяны в области фотовала. Но этот вопрос легко решается.',
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "На фотографиях показан процесс чистки отработки и самой заправки. Собранный и заправленный картридж печатает не хуже нового оригинального.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа HP CF244A" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M15 / M28",
    refill_price: "500 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "CF283A",
    resource: 1500,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro M125 / M127 / M201 / M225",
    refill_price: "500 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "CB435A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ P1005 / P1006 / P1007 / P1008",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "CE255A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Enterprise 500 MFP M525c / P3015 / M521",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "C4129X",
    resource: 1e4,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 5000",
    refill_price: "2000 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CE255X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ Enterprise 500 MFP M525c / P3015 / M521",
    refill_price: "650 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "CB436A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M1120 MFP / M1522n MFP / P1505",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "CC364A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ P4014 / P4015n / P4515n",
    refill_price: "950 ₽",
    recovery_price: "1850 ₽"
  },
  {
    modelCart: "CC364X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ P4014 / P4015n / P4515n",
    refill_price: "1350 ₽",
    recovery_price: "2150 ₽"
  },
  {
    modelCart: "CE278A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M1536dnf MFP / P1566 / P1606",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "CE285A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M1132 / M1218nfs / M1212nf / M1214nfh / M1217nfw / P1102w",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "CE390A",
    resource: 1e4,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M4555dn MFP / 600 M601n / M602dn / 603xh",
    refill_price: "1200 ₽",
    recovery_price: "1950 ₽"
  },
  {
    modelCart: "CE390X",
    resource: 24e3,
    examples: [
      {
        title: "Восстановление CE390X",
        photo: [
          {
            item: "CE390X-1.jpg"
          },
          {
            item: "CE390X-2.jpg"
          },
          {
            item: "CE390X-3.jpg"
          },
          {
            item: "CE390X-4.jpg"
          },
          {
            item: "CE390X-5.jpg"
          },
          {
            item: "CE390X-6.jpg"
          },
          {
            item: "CE390X-7.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже показан пример заправки и восстановления картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "HP CE390X" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Процесс заправки картриджа начинается с его разборки, как это не удивительно. Картридж внешне большой, страшный, но при этом до боли известный всем, кто занимается обслуживанием оргтехники. В своё время, принтеры с этими картриджами были очень распространены, настолько, что встречаются до сих пор.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Картридж разбирается, вычищается бункер с отработкой, меняется фотовал. Фотовал менять обязательно, пройдя ресурс 24000 страниц, он износится полностью. Потому только восстановления.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Кроме фотовала, мы меняем майларовую плёнку, которая может стать причиной высыпания тонера во время печати. Засыпаем тонер, который выпускается специально для этих картриджей. Принтеры мощные, скорость печати высокая и обычный тонер просто не успевает запекаться. После заправки меняем чип, чтобы клиент мог контролировать расход.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа HP CE390X" }),
            " возможна только в нашей мастерской, на выезде вряд ли получится получить хорошее качество."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M4555dn MFP / 600 M601n / M602dn / 603xh",
    refill_price: "1600 ₽",
    recovery_price: "2300 ₽"
  },
  {
    modelCart: "CE505A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ P2035 / 2050 / P2055",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "CE505X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 2050 / P2055",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "Q7516A",
    resource: 12e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ 5200",
    refill_price: "2000 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CF280A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 400 M401a / M425dw / M425dn",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "CF280X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 400 M401a / M425dw / M425dn",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "Q2612A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 1010 / 1012 / 1018 / 1020 / 1020 / 1022 / 3015 / 3030 / 3050 / M1319",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "Q5949A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ 1160 / 1320 / 3390 / 3392 MFP",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "Q5949X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 1160 / 1320 / 3390 / 3392 MFP",
    refill_price: "500 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "Q6511X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ 2410 / 2420 / 2430",
    refill_price: "650 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "Q7551A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M3027 MFP / M3035 MFP / P3005",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "Q7551X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M3027 MFP / M3035 MFP / P3005",
    refill_price: "650 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "Q7553A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M2727nf MFP / P2014 / P2015",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "Q7553X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "LJ M2727nf MFP / P2014 / P2015",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "CF400A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1200 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "CF401A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1200 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "CF402A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1200 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "CF403A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1200 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "CF400X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1500 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "CF401X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1500 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "CF402X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1500 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "CF403X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M252 / M274n / M277n / M277dw",
    refill_price: "1500 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "CF410A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "1800 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CF411A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "1800 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CF412A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "1800 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CF413A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "1800 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CF410X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "2300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CF411X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "2300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CF412X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "2300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CF413X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M377 / M452 / M477",
    refill_price: "2300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CF350A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M153 / M176 / M177",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF351A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M153 / M176 / M178",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF352A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M153 / M176 / M179",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF353A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M153 / M176 / M180",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF450A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M652 / M653 / M681 / M682",
    refill_price: "1800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF451A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M652 / M653 / M681 / M682",
    refill_price: "1800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF452A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M652 / M653 / M681 / M682",
    refill_price: "1800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF453A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M652 / M653 / M681 / M682",
    refill_price: "1800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF470X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF471X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF472X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF473X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF470X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF471X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF472X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF473X",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M681 / M682",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF300A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M880",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF301A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M880",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF302A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M880",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF303A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M880",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE270A",
    resource: 13500,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5520 / CP5525 / M750",
    refill_price: "4300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE271A",
    resource: 15e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5520 / CP5525 / M750",
    refill_price: "4300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE272A",
    resource: 15e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5520 / CP5525 / M750",
    refill_price: "4300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE273A",
    resource: 15e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5520 / CP5525 / M750",
    refill_price: "4300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF310A",
    resource: 29e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF311A",
    resource: 31500,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF312A",
    resource: 31500,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF313A",
    resource: 31500,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CB380A",
    resource: 19500,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855 / CM6030 / CM6040 / CP6015",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CB381A",
    resource: 21e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855 / CM6030 / CM6040 / CP6015",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CB382A",
    resource: 21e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855 / CM6030 / CM6040 / CP6015",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CB383A",
    resource: 21e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M855 / CM6030 / CM6040 / CP6015",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CF320A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF321A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF322A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF323A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF330X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "3 500 ₽",
    recovery_price: "4 500 ₽"
  },
  {
    modelCart: "CF331A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF332A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M680",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF333A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M651 / M684",
    refill_price: "2500 ₽",
    recovery_price: "3 500 ₽"
  },
  {
    modelCart: "CF360A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M577",
    refill_price: "2000 ₽",
    recovery_price: "2700 ₽"
  },
  {
    modelCart: "CF361A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M577",
    refill_price: "2000 ₽",
    recovery_price: "2700 ₽"
  },
  {
    modelCart: "CF362A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M577",
    refill_price: "2000 ₽",
    recovery_price: "2700 ₽"
  },
  {
    modelCart: "CF363A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M577",
    refill_price: "2000 ₽",
    recovery_price: "2700 ₽"
  },
  {
    modelCart: "CF360X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M581",
    refill_price: "3 500 ₽",
    recovery_price: "4 500 ₽"
  },
  {
    modelCart: "CF361X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M581",
    refill_price: "3 500 ₽",
    recovery_price: "4 500 ₽"
  },
  {
    modelCart: "CF362X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M581",
    refill_price: "3 500 ₽",
    recovery_price: "4 500 ₽"
  },
  {
    modelCart: "CF363X",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ M552 / M553 / M581",
    refill_price: "3 500 ₽",
    recovery_price: "4 500 ₽"
  },
  {
    modelCart: "CE740A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5225",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE741A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5225",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE742A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5225",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE743A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP5225",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CF030A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CM4540f MFP",
    refill_price: "2100 ₽",
    recovery_price: "3050 ₽"
  },
  {
    modelCart: "CF031A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CM4540f MFP",
    refill_price: "2100 ₽",
    recovery_price: "3050 ₽"
  },
  {
    modelCart: "CF032A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CM4540f MFP",
    refill_price: "2100 ₽",
    recovery_price: "3050 ₽"
  },
  {
    modelCart: "CF033A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CM4540f MFP",
    refill_price: "2100 ₽",
    recovery_price: "3050 ₽"
  },
  {
    modelCart: "CB400A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP4005",
    refill_price: "1900 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CB401A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP4005",
    refill_price: "1900 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CB402A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP4005",
    refill_price: "1900 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CB403A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CP4005",
    refill_price: "1900 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CC530A",
    resource: 4400,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM2320 / CP2020 / CP2025 / M351 / M375 / M5451 / M475 / M476",
    refill_price: "1450 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "CC531A",
    resource: 2800,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM2320 / CP2020 / CP2025 / M351 / M375 / M5451 / M475 / M476",
    refill_price: "1450 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "CC532A",
    resource: 2800,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM2320 / CP2020 / CP2025 / M351 / M375 / M5451 / M475 / M476",
    refill_price: "1450 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "CC533A",
    resource: 2800,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM2320 / CP2020 / CP2025 / M351 / M375 / M5451 / M475 / M476",
    refill_price: "1450 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "CE250A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM3530 MFP / CP3525",
    refill_price: "1700 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CE251A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM3530 MFP / CP3525",
    refill_price: "2100 ₽",
    recovery_price: "2900 ₽"
  },
  {
    modelCart: "CE252A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM3530 MFP / CP3525",
    refill_price: "2100 ₽",
    recovery_price: "2900 ₽"
  },
  {
    modelCart: "CE253A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM3530 MFP / CP3525",
    refill_price: "2100 ₽",
    recovery_price: "2900 ₽"
  },
  {
    modelCart: "CE260A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CP4025dn / CP4525dn",
    refill_price: "1700 ₽",
    recovery_price: "2600 ₽"
  },
  {
    modelCart: "CE261A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CP4025dn / CP4525dn",
    refill_price: "1700 ₽",
    recovery_price: "2600 ₽"
  },
  {
    modelCart: "CE262A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CP4025dn / CP4525dn",
    refill_price: "1700 ₽",
    recovery_price: "2600 ₽"
  },
  {
    modelCart: "CE263A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ CM4540 MFP / CP4025dn / CP4525dn",
    refill_price: "1700 ₽",
    recovery_price: "2600 ₽"
  },
  {
    modelCart: "CE310A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 100 C MFP M175a / CP1025 / M275",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE311A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 100 C MFP M175a / CP1025 / M275",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE312A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 100 C MFP M175a / CP1025 / M275",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "CE313A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 100 C MFP M175a / CP1025 / M275",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C9730A",
    resource: 12e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ 5500 ",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "C9731A",
    resource: 12e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ 5500 ",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "C9732A",
    resource: 12e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ 5500 ",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "C9733A",
    resource: 12e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "CLJ 5500 ",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "CE340A",
    resource: 13500,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M775",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "CE341A",
    resource: 16e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M775",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "CE342A",
    resource: 16e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M775",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "CE343A",
    resource: 16e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ M775",
    refill_price: "3000 ₽",
    recovery_price: "4500"
  },
  {
    modelCart: "CE320A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro CM1415 / CP1525",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CE321A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro CM1415 / CP1525",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CE322A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro CM1415 / CP1525",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CE323A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro CM1415 / CP1525",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CE400A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ 500 CM551dn /  M570dn /  M575c",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE401A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ 500 CM551dn /  M570dn /  M575c",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE402A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ 500 CM551dn /  M570dn /  M575c",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE403A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ 500 CM551dn /  M570dn /  M575c",
    refill_price: "1700 ₽",
    recovery_price: "2850 ₽"
  },
  {
    modelCart: "CE410A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 300 CM351a / M451dn / M475dn",
    refill_price: "1450 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "CE411A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 300 CM351a / M451dn / M475dn",
    refill_price: "1450 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "CE412A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 300 CM351a / M451dn / M475dn",
    refill_price: "1450 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "CE413A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 300 CM351a / M451dn / M475dn",
    refill_price: "1450 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "CF210A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 200 CM251nw / CM276nw",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CF211A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 200 CM251nw / CM276nw",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CF212A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 200 CM251nw / CM276nw",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CF213A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ Pro 200 CM251nw / CM276nw",
    refill_price: "1200 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CB540A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ CM1312 MFP / CP1215 / CP1515n / CP1518n",
    refill_price: "1100 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CB541A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ CM1312 MFP / CP1215 / CP1515n / CP1518n",
    refill_price: "1100 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CB542A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ CM1312 MFP / CP1215 / CP1515n / CP1518n",
    refill_price: "1100 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "CB543A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "hp",
    devices: "LJ CM1312 MFP / CP1215 / CP1515n / CP1518n",
    refill_price: "1100 ₽",
    recovery_price: "1750 ₽"
  },
  {
    modelCart: "703",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP2900 / LBP3000 / LBP2900 / LBP2900B / LBP3000",
    refill_price: "350 ₽",
    recovery_price: "900 ₽"
  },
  {
    modelCart: "706",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "MF6560PL / MF6530 / MF6540PL / MF6550 / MF6580PL",
    refill_price: "450 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "708",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP3300 / LBP3300 / LBP3360",
    refill_price: "350 ₽",
    recovery_price: "1050 ₽"
  },
  {
    modelCart: "708H",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP3300 / LBP3300 / LBP3360",
    refill_price: "550 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "710",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP3460",
    refill_price: "550 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "712",
    examples: [],
    resource: 1500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP3010 / LBP3100",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "713",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP 3250 / LBP3250",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "714",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "FAXL3000 / FAXL3000IP",
    refill_price: "450 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "715",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP3310 / LBP3370",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "715H",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP3310 / LBP3370",
    refill_price: "700 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "719",
    examples: [],
    resource: 2100,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6680 / MF5980 / LBP251 / LBP252 / LBP253 / MF411 / MF418 / MF419 / MF416 / MF410",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "719H",
    examples: [],
    resource: 6400,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6680 / MF5980 / LBP251 / LBP252 / LBP253 / MF411 / MF418 / MF419 / MF416 / MF410",
    refill_price: "800 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "724",
    examples: [],
    resource: 6e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6750 / LBP6780 / MF512 / MF515",
    refill_price: "800 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "724H",
    examples: [],
    resource: 12500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6750 / LBP6780 / MF512 / MF515",
    refill_price: "1300 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "725",
    examples: [],
    resource: 1600,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6000 / LBP6020 / MF3010",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "726",
    examples: [],
    resource: 2100,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6200 / LBP6230",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "728",
    examples: [],
    resource: 2100,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "MF4410 / MF4430 / MF4450 / MF4550 / MF4570 / MF4580 / MF4730 / MF4750 / MF4780",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "EP-22",
    examples: [],
    resource: 2500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP1120 / LBP250 / LBP350 / LBP800 / LBP810 / LBP1110",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "EP-27",
    examples: [],
    resource: 2500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "3110 / 3240 / 5630 / 5650 / 5730 / 5750 / 5770 / 3200 / 3228",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "FX-10",
    examples: [],
    resource: 2e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "MF4018 / 4120 / 4150 / 4270 / 4320D / 4330D / 4340D / 4370DN",
    refill_price: "400 ₽",
    recovery_price: "950 ₽"
  },
  {
    modelCart: "707Bk",
    examples: [],
    resource: 2500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5000 / LBP5100",
    refill_price: "1600 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "707C",
    examples: [],
    resource: 2e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5000 / LBP5100",
    refill_price: "1600 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "707M",
    examples: [],
    resource: 2e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5000 / LBP5100",
    refill_price: "1600 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "707Y",
    examples: [],
    resource: 2e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5000 / LBP5100",
    refill_price: "1600 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "711Bk",
    examples: [],
    resource: 6e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5300 / LBP5360 / MF8450 / MF9130 / MF9170 / MF9220Cdn / MF9280C",
    refill_price: "3000 ₽",
    recovery_price: "4500 ₽"
  },
  {
    modelCart: "711C",
    examples: [],
    resource: 6e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5300 / LBP5360 / MF8450 / MF9130 / MF9170 / MF9220Cdn / MF9280C",
    refill_price: "3000 ₽",
    recovery_price: "4500 ₽"
  },
  {
    modelCart: "711M",
    examples: [],
    resource: 6e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5300 / LBP5360 / MF8450 / MF9130 / MF9170 / MF9220Cdn / MF9280C",
    refill_price: "3000 ₽",
    recovery_price: "4500 ₽"
  },
  {
    modelCart: "711Y",
    examples: [],
    resource: 6e3,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5300 / LBP5360 / MF8450 / MF9130 / MF9170 / MF9220Cdn / MF9280C",
    refill_price: "3000 ₽",
    recovery_price: "4500 ₽"
  },
  {
    modelCart: "718Bk",
    examples: [],
    resource: 3400,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP7200 / LBP7680 / LBP7660 / LBP7210 / MF8330 / MF8350 / MF8540 / MF8550 / MF8580 / MF8360 / MF83/0 / MF8340 / MF724 / MF728 / MF729",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "718C",
    examples: [],
    resource: 3400,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP7200 / LBP7680 / LBP7660 / LBP7210 / MF8330 / MF8350 / MF8540 / MF8550 / MF8580 / MF8360 / MF83/0 / MF8340 / MF724 / MF728 / MF729",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "718M",
    examples: [],
    resource: 3400,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP7200 / LBP7680 / LBP7660 / LBP7210 / MF8330 / MF8350 / MF8540 / MF8550 / MF8580 / MF8360 / MF83/0 / MF8340 / MF724 / MF728 / MF729",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "718Y",
    examples: [],
    resource: 3400,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP7200 / LBP7680 / LBP7660 / LBP7210 / MF8330 / MF8350 / MF8540 / MF8550 / MF8580 / MF8360 / MF83/0 / MF8340 / MF724 / MF728 / MF729",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "716Bk",
    examples: [],
    resource: 2300,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5050 / MF8030 / MF8050 / MF8040 / MF8080",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "716C",
    examples: [],
    resource: 1500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5050 / MF8030 / MF8050 / MF8040 / MF8080",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "716M",
    examples: [],
    resource: 1500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5050 / MF8030 / MF8050 / MF8040 / MF8080",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "716Y",
    examples: [],
    resource: 1500,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP5050 / MF8030 / MF8050 / MF8040 / MF8080",
    refill_price: "1600 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "717Bk",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "MF8450",
    refill_price: "1400 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "717C",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "MF8450",
    refill_price: "1400 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "717M",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "MF8450",
    refill_price: "1400 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "717Y",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "MF8450",
    refill_price: "1400 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "C-EXV33",
    resource: 14600,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 2520 / 2525 / 2530 / 2535 / 2545",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV39",
    resource: 30200,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 4225 / 4235 / 4025 / 4035",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV38",
    resource: 15100,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 4025 / 4035 / 4045 / 4051 / 4245 / 4251",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV42",
    resource: 10200,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 2202 / 2204",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV14",
    resource: 8300,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 2016 / 2018 / 2020 / 2022 / 2320 / 2420 / 2422 / 2025",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV37",
    resource: 15100,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 1730 / 1740 / 1750",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV36",
    resource: 56e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 6055 / 6065 / 6075 / 6255 / 6265 / 6275 / 6555",
    refill_price: "6500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV35",
    resource: 7e4,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR 8085 / 8095 / 8105 / 8205 / 8285 / 8295",
    refill_price: "7500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV49Bk",
    resource: 36e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C3320 / C3325 / C3330 / C3520 / C3530",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV49C",
    resource: 19e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C3320 / C3325 / C3330 / C3520 / C3530",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV49M",
    resource: 19e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C3320 / C3325 / C3330 / C3520 / C3530",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV49Y",
    resource: 19e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C3320 / C3325 / C3330 / C3520 / C3530",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV34Bk",
    resource: 23e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2020 / C2025 / C2030 / C2220 / C2225 / C2230",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV34C",
    resource: 19e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2020 / C2025 / C2030 / C2220 / C2225 / C2230",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV34M",
    resource: 19e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2020 / C2025 / C2030 / C2220 / C2225 / C2230",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV34Y",
    resource: 19e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2020 / C2025 / C2030 / C2220 / C2225 / C2230",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV21Bk",
    resource: 26e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2550 / C2880 / C3080 / C3580 / C3880 / C2380 / C2880 / C3380 / C3580",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV21C",
    resource: 14e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2550 / C2880 / C3080 / C3580 / C3880 / C2380 / C2880 / C3380 / C3580",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV21M",
    resource: 14e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2550 / C2880 / C3080 / C3580 / C3880 / C2380 / C2880 / C3380 / C3580",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV21Y",
    resource: 14e3,
    examples: [],
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C2550 / C2880 / C3080 / C3580 / C3880 / C2380 / C2880 / C3380 / C3580",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "723Bk",
    examples: [],
    resource: 5e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7750Cdn",
    refill_price: "1650 ₽",
    recovery_price: "2450 ₽"
  },
  {
    modelCart: "723C",
    examples: [],
    resource: 8500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7750Cdn",
    refill_price: "1650 ₽",
    recovery_price: "2450 ₽"
  },
  {
    modelCart: "052",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP212 / LBP214 / LBP215 / MF421 / MF426 / MF428 / MF429",
    refill_price: "500 ₽",
    recovery_price: "1200"
  },
  {
    modelCart: "052H",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP212 / LBP214 / LBP215 / MF421 / MF426 / MF428 / MF429",
    refill_price: "800 ₽",
    recovery_price: "1500"
  },
  {
    modelCart: "723M",
    examples: [],
    resource: 8500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7750Cdn",
    refill_price: "1650 ₽",
    recovery_price: "2450 ₽"
  },
  {
    modelCart: "723Y",
    examples: [],
    resource: 8500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7750Cdn",
    refill_price: "1650 ₽",
    recovery_price: "2450 ₽"
  },
  {
    modelCart: "729Bk",
    examples: [],
    resource: 1200,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7010C / LBP7018C",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "729C",
    examples: [],
    resource: 1e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7010C / LBP7018C",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "729M",
    examples: [],
    resource: 1e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7010C / LBP7018C",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "729Y",
    examples: [],
    resource: 1e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7010C / LBP7018C",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "701Bk",
    examples: [],
    resource: 5e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP5200 / MF8180C",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "701C",
    examples: [],
    resource: 4e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP5200 / MF8180C",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "701M",
    examples: [],
    resource: 4e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP5200 / MF8180C",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "701Y",
    examples: [],
    resource: 4e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP5200 / MF8180C",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "731Bk",
    examples: [],
    resource: 2200,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7100Cn / 7110Cw / MF628C / MF8280C",
    refill_price: "1400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "731C",
    examples: [],
    resource: 1800,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7100Cn / 7110Cw / MF628C / MF8280C",
    refill_price: "1400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "731M",
    examples: [],
    resource: 1800,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7100Cn / 7110Cw / MF628C / MF8280C",
    refill_price: "1400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "731Y",
    examples: [],
    resource: 1800,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7100Cn / 7110Cw / MF628C / MF8280C",
    refill_price: "1400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "732Bk",
    examples: [],
    resource: 6100,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7780",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "732H",
    examples: [],
    resource: 12e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7780",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "732C",
    examples: [],
    resource: 6400,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7780",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "732M",
    examples: [],
    resource: 6400,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7780",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "732Y",
    examples: [],
    resource: 6400,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP7780",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV47Bk",
    examples: [],
    resource: 19e3,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C250 / C350 / C351",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV47C",
    examples: [],
    resource: 21500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C250 / C350 / C351",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV47M",
    examples: [],
    resource: 21500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C250 / C350 / C351",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "C-EXV47Y",
    examples: [],
    resource: 21500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "iR C250 / C350 / C351",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040BK",
    examples: [],
    resource: 6300,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710 / LBP712",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040C",
    examples: [],
    resource: 5400,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710 / LBP712",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040M",
    examples: [],
    resource: 5400,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710 / LBP712",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040Y",
    examples: [],
    resource: 5400,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710 / LBP712",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040HBK",
    examples: [],
    resource: 12500,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710",
    refill_price: "3900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040HC",
    examples: [],
    resource: 1e4,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710",
    refill_price: "3900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040HM",
    examples: [],
    resource: 1e4,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710",
    refill_price: "3900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "040HY",
    examples: [],
    resource: 1e4,
    chip: true,
    id: v4(),
    vendor: "canon",
    devices: "LBP710",
    refill_price: "3900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "737",
    examples: [],
    resource: 2400,
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "MF211 / MF212 / MF216 / MF217 / MF226 / MF229 / MF231 / MF249",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "724H",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP6750",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "039",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP351 / LBP352",
    refill_price: "1300 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "039H",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP351 / LBP352",
    refill_price: "1700 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "041",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP312",
    refill_price: "1300 ₽",
    recovery_price: "2000 ₽"
  },
  {
    modelCart: "041H",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "canon",
    devices: "LBP312",
    refill_price: "1700 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CLT-K504S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1000 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CLT-C504S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1000 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CLT-M504S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1000 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CLT-Y504S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1000 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "CLT-K504L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CLT-C504L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CLT-M504L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CLT-Y504L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-415 / CLP-470 / CLP-475 / CLX-4195",
    refill_price: "1300 ₽",
    recovery_price: "3000 ₽"
  },
  {
    modelCart: "CLT-K506S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "1800 ₽",
    recovery_price: "2800 ₽"
  },
  {
    modelCart: "CLT-C506S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "1800 ₽",
    recovery_price: "2800 ₽"
  },
  {
    modelCart: "CLT-M506S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "1800 ₽",
    recovery_price: "2800 ₽"
  },
  {
    modelCart: "CLT-Y506S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "1800 ₽",
    recovery_price: "2800 ₽"
  },
  {
    modelCart: "CLT-K506L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "2500 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CLT-C506L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "2500 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CLT-M506L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "2500 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CLT-Y506L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-680 / CLX-6260",
    refill_price: "2500 ₽",
    recovery_price: "3500 ₽"
  },
  {
    modelCart: "CLP-500D7K",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-500 / CLP-550 / CLP-515N",
    refill_price: "1250 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-500D5C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-500 / CLP-550 / CLP-515N",
    refill_price: "1450 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-500D5M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-500 / CLP-550 / CLP-515N",
    refill_price: "1450 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-500D5Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-500 / CLP-550 / CLP-515N",
    refill_price: "1450 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D3K",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D2C",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D2M",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D2Y",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D7K",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D5C",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D5M",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-510D5Y",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-510 / CLP-511G / CLP-515N",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-K300A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-300 / CLX-3160N / CLX-2160 / CLX-2161K",
    refill_price: "850 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-C300A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-300 / CLX-3160N / CLX-2160 / CLX-2161K",
    refill_price: "850 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-M300A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-300 / CLX-3160N / CLX-2160 / CLX-2161K",
    refill_price: "850 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-Y300A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-300 / CLX-3160N / CLX-2160 / CLX-2161K",
    refill_price: "850 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-K350A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-350N",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-C350A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-350N",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-M350A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-350N",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-Y350A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-350N",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-K600A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-600 / CLP-650",
    refill_price: "1900 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-C600A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-600 / CLP-650",
    refill_price: "1900 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-M600A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-600 / CLP-650",
    refill_price: "1900 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-Y600A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-600 / CLP-650",
    refill_price: "1900 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-K660A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-610 / CLP-660 / CLX-6200 / CLX-6210 / CLX-6240 / CLX-6200",
    refill_price: "1700 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-C660A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-610 / CLP-660 / CLX-6200 / CLX-6210 / CLX-6240 / CLX-6200",
    refill_price: "1700 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-M660A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-610 / CLP-660 / CLX-6200 / CLX-6210 / CLX-6240 / CLX-6200",
    refill_price: "1700 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLP-Y660A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-610 / CLP-660 / CLX-6200 / CLX-6210 / CLX-6240 / CLX-6200",
    refill_price: "1700 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-K406S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-C406S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-M406S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-Y406S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-K406S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-C406S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-M406S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-Y406S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-360 / CLP-365 / CLX-3300 / CLX-3305",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-K407S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-C407S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-M407S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-Y407S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-K407S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1200 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-C407S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1200 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-M407S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1200 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-Y407S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-320 / CLP-325 / CLX-3185 / CLX-3180",
    refill_price: "1200 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-K409S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-C409S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-M409S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-Y409S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-K409S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-C409S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-M409S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "CLT-Y409S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "CLP-310 / CLP-315 / CLX-3170 / CLX-3175",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "ML-1210D3",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1200 / ML-1210 / ML-1010 / ML-1020",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "ML-1520D3",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1520",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "ML-1610D2",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1610 / ML-1615 / ML-1620",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "ML-1650D8",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1650",
    refill_price: "800 ₽",
    recovery_price: "1450 ₽"
  },
  {
    modelCart: "ML-1710D3",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1700 / ML-1500 / ML-1510 / ML-1710",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "ML-2150D8",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2150 / ML-2151",
    refill_price: "800 ₽",
    recovery_price: "1450 ₽"
  },
  {
    modelCart: "ML-2250D5",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2250 / ML-2251",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "ML-2550DA",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2550",
    refill_price: "900 ₽",
    recovery_price: "1400 ₽"
  },
  {
    modelCart: "ML-3560D6",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3560",
    refill_price: "650 ₽",
    recovery_price: "1350 ₽"
  },
  {
    modelCart: "ML-3560DB",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3560",
    refill_price: "900 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "ML-4500D3",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4500 / ML-4600",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "ML-4550A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4550 / ML-4050",
    refill_price: "700 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "ML-4550B",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4550 / ML-4050",
    refill_price: "1300 ₽",
    recovery_price: "2300 ₽"
  },
  {
    modelCart: "ML-4550A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4550 / ML-4050",
    refill_price: "900 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "ML-4550B",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4550 / ML-4050",
    refill_price: "1500 ₽",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "ML-D1630A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1630 / SCX-4500",
    refill_price: "600 ₽",
    recovery_price: "1050 ₽"
  },
  {
    modelCart: "ML-D2850A",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2850 / ML-2855",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "ML-D2850B",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2850 / ML-2855",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "ML-D2850A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2850 / ML-2855",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "ML-D2850B",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2850 / ML-2855",
    refill_price: "750 ₽",
    recovery_price: "1350 ₽"
  },
  {
    modelCart: "ML-D3050A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3050",
    refill_price: "700 ₽",
    recovery_price: "1400 ₽"
  },
  {
    modelCart: "ML-D3050B",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3050",
    refill_price: "1000 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "ML-D3470A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3470",
    refill_price: "750 ₽",
    recovery_price: "1400 ₽"
  },
  {
    modelCart: "ML-D3470B",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3470",
    refill_price: "1050 ₽",
    recovery_price: "1700 ₽"
  },
  {
    modelCart: "ML-D4550A 10K",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4550 / ML-4050",
    refill_price: "900 ₽",
    recovery_price: "2200 ₽"
  },
  {
    modelCart: "ML-D4550A 20K",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4550 / ML-4050",
    refill_price: "1400 ₽",
    recovery_price: "2900 ₽"
  },
  {
    modelCart: "MLT-D101S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2160 / ML-2165 / SCX-3400 / SCX-3405 / SCX-3407",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D101S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2160 / ML-2165 / SCX-3400 / SCX-3405 / SCX-3407",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D101L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2160 / ML-2165 / SCX-3400 / SCX-3405 / SCX-3407",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D101L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2160 / ML-2165 / SCX-3400 / SCX-3405 / SCX-3407",
    refill_price: "650 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "MLT-D111L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2020 / SL-M2022 / SL-M2070 / SL-M2070W",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D111L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2020 / SL-M2022 / SL-M2070 / SL-M2070W",
    refill_price: "650 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "MLT-D111S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2020 / SL-M2022 / SL-M2070 / SL-M2070W",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D111S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2020 / SL-M2022 / SL-M2070 / SL-M2070W",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D115",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2620 / SL-M2820 / SL-M2870 / SL-M2830 / SL-M2880",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D115",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2620 / SL-M2820 / SL-M2870 / SL-M2830 / SL-M2880",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D103L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M2620 / SL-M2820 / SL-M2870 / SL-M2830 / SL-M2880",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D103S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2950 / ML-2955 / SCX-4725 / SCX-4727 / SCX-4728 / SCX-4729",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D103L",
    devices: "SL-M2620 / SL-M2820 / SL-M2870 / SL-M2830 / SL-M2880",
    id: v4(),
    vendor: "samsung",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D103S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2950 / ML-2955 / SCX-4725 / SCX-4727 / SCX-4728 / SCX-4729",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D104S",
    resource: 1e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1660 / ML-1665 / ML-1860 / ML-1865 / SCX-3200 / SCX-3205",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D105L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1910 / ML-1915 / ML-2525 / ML-2540 / ML-2580 / SCX-4600 / SCX-4623",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D105S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1910 / ML-1915 / ML-2525 / ML-2540 / ML-2580 / SCX-4600 / SCX-4623",
    refill_price: "550 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D105L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1910 / ML-1915 / ML-2525 / ML-2540 / ML-2580 / SCX-4600 / SCX-4623",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D105S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1910 / ML-1915 / ML-2525 / ML-2540 / ML-2580 / SCX-4600 / SCX-4623",
    refill_price: "400 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D106S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2245",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D106S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2245",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D108S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1660 / ML-1665 / ML-1860 / ML-1865 / SCX-3200 / SCX-3205",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D108S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-1660 / ML-1665 / ML-1860 / ML-1865 / SCX-3200 / SCX-3205",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D109S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-4300",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D109S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-4300",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D117S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4650 / SCX-4655",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D117S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4650 / SCX-4655",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D203S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M3820 / SL-M3870 / SL-M4020 / SL-M4070",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D203L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M3820 / SL-M3870 / SL-M4020 / SL-M4070",
    refill_price: "500 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "MLT-D203E",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M3820 / SL-M3870 / SL-M4020 / SL-M4070",
    refill_price: "650 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "MLT-D203L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M3820 / SL-M3870 / SL-M4020 / SL-M4070",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D203E",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M3820 / SL-M3870 / SL-M4020 / SL-M4070",
    refill_price: "700 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "MLT-D203S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-M3820 / SL-M3870 / SL-M4020 / SL-M4070",
    refill_price: "850 ₽",
    recovery_price: "1450 ₽"
  },
  {
    modelCart: "MLT-D205S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3310 / ML-3710 / ML-3712 / SCX-5637 / SCX-5737",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D205L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3310 / ML-3710 / ML-3712 / SCX-5637 / SCX-5737",
    refill_price: "500 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "MLT-D205E",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3310 / ML-3710 / ML-3712 / SCX-5637 / SCX-5737",
    refill_price: "650 ₽",
    recovery_price: "1350 ₽"
  },
  {
    modelCart: "MLT-D205S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3310 / ML-3710 / SCX-4833 / SCX-5637",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D205L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3310 / ML-3710 / SCX-4833 / SCX-5637",
    refill_price: "650 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "MLT-D205E",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3310 / ML-3710 / SCX-4833 / SCX-5637",
    refill_price: "800 ₽",
    recovery_price: "1550 ₽"
  },
  {
    modelCart: "MLT-D208L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-5635 / SCX-5835",
    refill_price: "800 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "MLT-D208S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-5635 / SCX-5835",
    refill_price: "600 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "MLT-D208L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-5635 / SCX-5835",
    refill_price: "950 ₽",
    recovery_price: "1650 ₽"
  },
  {
    modelCart: "MLT-D208S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-5635 / SCX-5835",
    refill_price: "750 ₽",
    recovery_price: "1450 ₽"
  },
  {
    modelCart: "MLT-D209L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2855 / SCX-4824 / SCX-4826 / SCX-4828",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "MLT-D209S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2855 / SCX-4824 / SCX-4826 / SCX-4828",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "MLT-D209L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2855 / SCX-4824 / SCX-4826 / SCX-4828",
    refill_price: "650 ₽",
    recovery_price: "1350 ₽"
  },
  {
    modelCart: "MLT-D209S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-2855 / SCX-4824 / SCX-4826 / SCX-4828",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "MLT-D305S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3750ND",
    refill_price: "650 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "MLT-D305L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3750ND",
    refill_price: "850 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "MLT-D305S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3750ND",
    refill_price: "800 ₽",
    recovery_price: "1450 ₽"
  },
  {
    modelCart: "MLT-D305L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-3750ND",
    refill_price: "1000 ₽",
    recovery_price: "1650 ₽"
  },
  {
    modelCart: "MLT-D307E",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4510 / ML-5010 / ML-5015",
    refill_price: "650 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D307L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4510 / ML-5010 / ML-5015",
    refill_price: "850 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D307S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4510 / ML-5010 / ML-5015",
    refill_price: "1200 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D307E",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4510 / ML-5010 / ML-5015",
    refill_price: "950 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D307L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4510 / ML-5010 / ML-5015",
    refill_price: "1150 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D307S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-4510 / ML-5010 / ML-5015",
    refill_price: "1500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D309L",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-5510 / ML-6510",
    refill_price: "2500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D309S",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "ML-5510 / ML-6510",
    refill_price: "1000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D309L",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-5510 / ML-6510",
    refill_price: "2900 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D309S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "ML-5510 / ML-6510",
    refill_price: "1400 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D704S",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "K3300NR / K3250NR",
    refill_price: "3500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "MLT-D707",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SL-K2200ND / SL-K2200",
    refill_price: "2100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "SCX-4100D3",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-4100",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "SCX-4216D3",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-4016 / SCX-4116 / SCX-4216",
    refill_price: "400 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "SCX-6320D8",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-6220 / SCX-6320",
    refill_price: "800 ₽",
    recovery_price: "1850 ₽"
  },
  {
    modelCart: "SCX-D4200A",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "samsung",
    devices: "SCX-4200 / SCX-4220",
    refill_price: "500 ₽",
    recovery_price: "1050 ₽"
  },
  {
    modelCart: "101R00664",
    resource: 1e4,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "B205 / B210 / B215",
    refill_price: "Уточняйте",
    recovery_price: "2500 ₽"
  },
  {
    modelCart: "106R04348",
    resource: 3e3,
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "B205 / B210 / B215",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02778",
    resource: 3e3,
    examples: [
      {
        title: "Заправляем Xerox 106R02778",
        photo: [
          {
            item: "106R0277800-02-39.jpg"
          },
          {
            item: "106R0277800-01-04.jpg"
          },
          {
            item: "106R0277800-02-14.jpg"
          },
          {
            item: "106R0277800-01-21.jpg"
          },
          {
            item: "106R0277800-01-32.jpg"
          },
          {
            item: "106R0277800-02-36.jpg"
          }
        ],
        video: [
          "https://www.youtube.com/embed/Va0N8MPGdDU"
        ],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Процесс заправки картридж ",
            /* @__PURE__ */ jsx("strong", { children: "Xerox 106R02778" }),
            " ничем не примечателен и максимально прост. Если ваш принтер перепрошит и замена чипа не требуется, старый чип можно не удалять, а просто заклеить его скотчем, как показано на фото."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Сначала картридж разбирается, если это можно так назвать)) На самом деле, достаточно снять правую крышку. Если запайки не срезаны, их можно легко удалить подручными средствами. В нашем случае картридж уже вскрывался и крышка держится на защёлках, что немного упрощает её снятие. Далее извлекаем пробку, засыпаем тонер, закрываем и всё готово. Протираем вал проявки и картридж готов ехать к клиенту.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа Xerox 106R02778" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3052 / Phaser 3260 / WC 3215 / WC 3225",
    refill_price: "650 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "106R02782",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3052 / Phaser 3260 / WC 3215 / WC 3225",
    refill_price: "650 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "006R01461",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 7120 / WC 7125 / WC 7220 / WC 7225",
    refill_price: "6500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "006R01464",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 7120 / WC 7125 / WC 7220 / WC 7225",
    refill_price: "6500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "006R01463",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 7120 / WC 7125 / WC 7220 / WC 7225",
    refill_price: "6500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "006R01462",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 7120 / WC 7125 / WC 7220 / WC 7225",
    refill_price: "6500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "006R01573",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 5019 / WC 5021",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01413",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 5222",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02612",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02606",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02607",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02608",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02609",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02610",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02611",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7100N",
    refill_price: "2700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01446",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01443",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01444",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01445",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01440",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01441",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01442",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7500DN",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "006R01278",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 4118",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "013R00601",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "PE120 / PE120i",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "013R00606",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "PE120 / PE120i",
    refill_price: "500 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "013R00607",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Pe114e",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "013R00621",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "PE220",
    refill_price: "600 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "013R00625",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3119",
    refill_price: "500 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "16200100",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6200",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200200",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200300",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200400",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200500",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200600",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200700",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "16200800",
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6200",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00461",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3400",
    refill_price: "950 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "106R00462",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3400",
    refill_price: "950 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "106R00668",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00669",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00670",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00671",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00672",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00673",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00674",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00675",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6250",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00676",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00677",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00678",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00679",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00680",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00681",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00682",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00684",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6100",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R00687",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3450",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R00688",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3450",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01034",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3420 / Phaser 3425",
    refill_price: "1050 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "106R01073",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300 / Phaser 6350",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01074",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300 / Phaser 6350",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01075",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300 / Phaser 6350",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01076",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300 / Phaser 6350",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01080",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 7400",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01082",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 7400",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01083",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01084",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01085",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6300",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01148",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3500",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01149",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3500",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01150",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 7400",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01151",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 7400",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01152",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 7400",
    refill_price: "2600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01159",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3117 / Phaser 3122 / Phaser 3124 / Phaser 3125",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "106R01203",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6110",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01204",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6110",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01206",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6110",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01245",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3428",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01246",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3428",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01282",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6130",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01283",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6130",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01284",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6130",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03765",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03766",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03767",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03768",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03769",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03770",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03771",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03772",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "VersaLink C7000",
    refill_price: "5000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01285",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6130",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01335",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6125",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01336",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6125",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01337",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6125",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01338",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6125",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01370",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3600",
    refill_price: "1300 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "106R01371",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3600",
    refill_price: "1300 ₽",
    recovery_price: "2100 ₽"
  },
  {
    modelCart: "106R01372",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3600",
    refill_price: "1400 ₽",
    recovery_price: "2300 ₽"
  },
  {
    modelCart: "106R01373",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3250",
    refill_price: "650 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "106R01374",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3250",
    refill_price: "850 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "106R01378",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3100",
    refill_price: "400 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "106R01379",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3100",
    refill_price: "500 ₽",
    recovery_price: "1400 ₽"
  },
  {
    modelCart: "106R01388",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01389",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01390",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01391",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01400",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01402",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01403",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6280",
    refill_price: "1650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01411",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3300MFP",
    refill_price: "850 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "106R01412",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3300MFP",
    refill_price: "850 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01414",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3435",
    refill_price: "950 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01415",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3435",
    refill_price: "850 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R01456",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 128",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01457",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 128",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01458",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 128",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01459",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 128",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01463",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01464",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01465",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01473",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01474",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01475",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01476",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6121MFP",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01481",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6140",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01482",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6140",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01483",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6140",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01484",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 6140",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01485",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3210 / WC 3220",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "106R01487",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3210 / WC 3220",
    refill_price: "500 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "106R01485",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3210 / WC 3220",
    refill_price: "550 ₽",
    recovery_price: "1250 ₽"
  },
  {
    modelCart: "106R01487",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3210 / WC 3220",
    refill_price: "650 ₽",
    recovery_price: "1350 ₽"
  },
  {
    modelCart: "106R01529",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3550",
    refill_price: "800 ₽",
    recovery_price: "1600 ₽"
  },
  {
    modelCart: "106R01531",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3550",
    refill_price: "1000 ₽",
    recovery_price: "1950 ₽"
  },
  {
    modelCart: "106R01570",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01571",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01572",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01573",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "7000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01624",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01625",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01626",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 7800",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01598",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01599",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01600",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01601",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01602",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01603",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "2250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01604",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6500",
    refill_price: "1950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01631",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6000 / Phaser 6010 / WC 6015",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01632",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6000 / Phaser 6010 / WC 6015",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01633",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6000 / Phaser 6010 / WC 6015",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R01634",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6000 / Phaser 6010 / WC 6015",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02181",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3010 / WC 3040 / WC 3045",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02183",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3010 / WC 3040 / WC 3045",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02310",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "WC 3315 / WC 3325",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "108R00794",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3635MFP",
    refill_price: "1150 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "108R00796",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3635MFP",
    refill_price: "1150 ₽",
    recovery_price: "1900 ₽"
  },
  {
    modelCart: "108R00908",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3140 / Phaser 3155 / Phaser 3160",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "108R00909",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3140 / Phaser 3155 / Phaser 3160",
    refill_price: "400 ₽",
    recovery_price: "1000 ₽"
  },
  {
    modelCart: "108R00908",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3140 / Phaser 3155 / Phaser 3160",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "108R00909",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3140 / Phaser 3155 / Phaser 3160",
    refill_price: "550 ₽",
    recovery_price: "1150 ₽"
  },
  {
    modelCart: "109R00639",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3110 / Phaser 3210",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "113R00296",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "P8E / P8EX / 385",
    refill_price: "600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00495",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 5400",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00627",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 4400",
    refill_price: "1700 ₽",
    recovery_price: "2600 ₽"
  },
  {
    modelCart: "113R00628",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 4400",
    refill_price: "1700 ₽",
    recovery_price: "2600 ₽"
  },
  {
    modelCart: "113R00656",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 4500",
    refill_price: "1500 ₽",
    recovery_price: "2300 ₽"
  },
  {
    modelCart: "113R00667",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "PE16 / PE16e",
    refill_price: "400 ₽",
    recovery_price: "1100 ₽"
  },
  {
    modelCart: "113R00689",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00690",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00691",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00692",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00693",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00694",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00695",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6115MFP / Phaser 6120",
    refill_price: "2100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00712",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 4510",
    refill_price: "1500 ₽",
    recovery_price: "2400 ₽"
  },
  {
    modelCart: "113R00719",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00720",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00721",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00722",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00723",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00724",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00725",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00726",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6180",
    refill_price: "1650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00730",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3200MFP",
    refill_price: "650 ₽",
    recovery_price: "1300 ₽"
  },
  {
    modelCart: "113R00735",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 3200MFP",
    refill_price: "400 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "106R03622",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3330 / WorkCentre 3335 / 3345 / xerox Phaser 3330 / WC 3335 / WC 3345",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03624",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3330 / WorkCentre 3335 / 3345 / xerox Phaser 3330 / WC 3335 / WC 3345",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03620",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3330 / WorkCentre 3335 / 3345 / xerox Phaser 3330 / WC 3335 / WC 3345",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02763",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02760",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02761",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02762",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02759",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02756",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02757",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02758",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6020 / Phaser 6022 / WC 5020 / WC 6025 / WC 6027",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03484",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6510 / WC 6515",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03481",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6510 / WC 6515",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03482",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6510 / WC 6515",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03483",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 6510 / WC 6515",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02773",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3020 / WC 3025",
    refill_price: "400 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "106R03048",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3020 / WC 3025",
    refill_price: "400 ₽",
    recovery_price: "1200 ₽"
  },
  {
    modelCart: "106R02773",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3020 / WC 3025",
    refill_price: "650 ₽",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "106R03048",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3020 / WC 3025",
    refill_price: "650 ₽",
    recovery_price: "1450 ₽"
  },
  {
    modelCart: "106R02720",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3610 / WC 3615",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02722",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3610 / WC 3615",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02731",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3610 / WC 3615",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03581",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "VersaLink B400 / xerox VersaLink B405",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03583",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "VersaLink B400 / xerox VersaLink B405",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03585",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "VersaLink B400 / xerox VersaLink B405",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "113R00711",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "Phaser 4510",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02721",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3610 / WC 3615",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02723",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3610 / WC 3615",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02732",
    examples: [],
    chip: true,
    id: v4(),
    vendor: "xerox",
    devices: "Phaser 3610 / WC 3615",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02736",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 3655",
    refill_price: "Уточняйте",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02738",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WC 3655",
    refill_price: "Уточняйте",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03105",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WCP 4265",
    refill_price: "Уточняйте",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R02735",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WCP 4265",
    refill_price: "Уточняйте",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "106R03103",
    id: v4(),
    vendor: "xerox",
    examples: [],
    chip: false,
    devices: "WCP 4265",
    refill_price: "Уточняйте",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-110BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1050 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-110C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1050 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-110M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1050 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-115BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1050 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-115C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1050 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-115M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1050 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-12BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4200",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-12C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4200",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-12M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4200",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-12Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4200",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-130BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-130C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-130M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-130Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-135BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-135C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-135M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-135Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4040 / MFC-9440 / MFC-9450",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2000",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2030 / HL-2040 / MFC-7225 / MFC-7820 / DCP-7010",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2080",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2130 / DCP-7055",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2085",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2035",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2090",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2032 / DCP-7057",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2135",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2140 / HL-2170 / MFC-7320R / DCP-7030 / DCP-7040 / DCP-7045",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2175",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2140 / HL-2150 / HL-2170 / MFC-7840 / DCP-7030",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2235",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2240 / HL-2250 / MFC-7360 / MFC-7860 / DCP-7060",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2275",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-2240 / HL-2250 / MFC-7360 / MFC-7860 / DCP-7060",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-230BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-3040 / HL-3070 / MFC-9120 / MFC-9320 / DCP-9010",
    refill_price: "950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-230C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-3040 / HL-3070 / MFC-9120 / MFC-9320 / DCP-9010",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-230M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-3040 / HL-3070 / MFC-9120 / MFC-9320 / DCP-9010",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-230Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-3040 / HL-3070 / MFC-9120 / MFC-9320 / DCP-9010",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3030",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5130 / HL-5140 / HL-5150 / HL-5170 / MFC-8220 / MFC-8220 / MFC-8440",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3060",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5130 / HL-5140 / HL-5150 / HL-5170 / MFC-8220 / MFC-8220 / MFC-8440",
    refill_price: "700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3130",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5240 / HL-5250 / HL-5250 / MFC-8460 / MFC-8860",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3170",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5240 / HL-5250 / HL-5250 / MFC-8460 / MFC-8860",
    refill_price: "700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-320BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4140 / HL-4150 / HL-4570 / MFC-9460 / MFC-9465",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-320C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4140 / HL-4150 / HL-4570 / MFC-9460 / MFC-9465",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-320M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4140 / HL-4150 / HL-4570 / MFC-9460 / MFC-9465",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-320Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4140 / HL-4150 / HL-4570 / MFC-9460 / MFC-9465",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3230",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5340 / HL-5350 / HL-5370 / MFC-8370 / MFC-8880 / DCP-8070",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-325BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4150 / HL-4570 / MFC-9460 / MFC-9465 / DCP-9055",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-325C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4150 / HL-4570 / MFC-9460 / MFC-9465 / DCP-9055",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-325M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4150 / HL-4570 / MFC-9460 / MFC-9465 / DCP-9055",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-325Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-4150 / HL-4570 / MFC-9460 / MFC-9465 / DCP-9055",
    refill_price: "1250 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3280",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5340 / HL-5350 / HL-5370 / MFC-8370 / MFC-8880 / DCP-8070",
    refill_price: "700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3330",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5440 / HL-5450 / HL-6180 / MFC-8520 / MFC-8950 / MFC-8950",
    refill_price: "600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3380",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-5440 / HL-5450 / HL-6180 / MFC-8520 / MFC-8950 / MFC-8950",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3390",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-6180 / MFC-8950 / DCP-8250",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-4100",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-6050",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-430",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-1030 / HL-1230 / MFC-8600 / MFC-8700 / MFC-9700",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-1095",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-1202R / DCP-1602R",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-900BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L9200 / MFC-L9550",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-900C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L9200 / MFC-L9551",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-900M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L9200 / MFC-L9552",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-900Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L9200 / MFC-L9553",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-321BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8850",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-321C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8851",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-321M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8852",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-321Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8853",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-326BK",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8854",
    refill_price: "2800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-326C",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8855",
    refill_price: "2800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-326M",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8856",
    refill_price: "2800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-326Y",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L8400 / DCP-L8450 / HL-L8250 / HL-L8350 / MFC-L8650 / MFC-L8857",
    refill_price: "2800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2335",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L2300 / HL-L2340 / DCP-L2500 / DCP-L2520 / DCP-L2560 / MFC-2700",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-2375",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L2300 / HL-L2340 / DCP-L2500 / DCP-L2520 / DCP-L2560 / MFC-2700",
    refill_price: "700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3430",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L5500 / DCP-L6600 / HL-L5000D / HL-L5100 / HL-L5200",
    refill_price: "550 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3480",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "DCP-L5500 / DCP-L6600 / HL-L5000D / HL-L5100 / HL-L5200",
    refill_price: "800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-1075",
    examples: [],
    vendor: "brother",
    chip: false,
    devices: "HL-1110 / HL-1112 / HL-1210 / HL-1212",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-1075",
    examples: [],
    vendor: "brother",
    chip: true,
    devices: "HL-1110 / HL-1112 / HL-1210 / HL-1212",
    refill_price: "900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3512",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L2300 / HL-L2340 / DCP-L2500 / DCP-L2520 / DCP-L2560 / MFC-27000",
    refill_price: "2000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TN-3520",
    examples: [],
    chip: false,
    id: v4(),
    vendor: "brother",
    devices: "HL-L2300 / HL-L2340 / DCP-L2500 / DCP-L2520 / DCP-L2560 / MFC-2700",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-A144A",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-F2900 / KX-3000 / KX-3100",
    refill_price: "450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FA75",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-FLM600 / KX-FLM650 ",
    refill_price: "750 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FA76A",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-FL501RU / KX-FL502RU / KX-FL503RU / KX-FL521RU / KX-FL523RU / KX-FL751RU / KX-FL753RU ",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FA83A",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-FL511 / KX-FL512 / KX-FL513RU / KX-FL540RU / KX-FL541RU / KX-FL543RU / KX-FLM653RU",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FA85A",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-FLB801 / KX-FLB803 / KX-FLB803RU / KX-FLB811 / KX-FLB812 / KX-FLB813 / KX-FLB851 / KX-FLB853RU / KX-FLB881",
    refill_price: "550 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FAT400",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: true,
    devices: "KX-MB1500RU",
    refill_price: "600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FAT410",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: true,
    devices: "KX-MB1500RU",
    refill_price: "700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FAT411",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-MB1900RU / KX-MB2000RU / KX-MB2010 / KX-MB2020RU / KX-MB2025RU / KX-MB2030RU",
    refill_price: "600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FAT88A",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-FL401RU / KX-FL403RU / KX-FL411RU / KX-FL413RU",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "Panasonic KX-FAT92A",
    id: v4(),
    vendor: "Panasonic",
    examples: [],
    chip: false,
    devices: "KX-MB262 / 263 RU / 283RU / 763RU / 772RU / 773RU / 781RU",
    refill_price: "400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AL-100TD",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AL-1000 / AL-1200 / AL-1520",
    refill_price: "850 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AL-110DC",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AL-1217 / AL-1555",
    refill_price: "850 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AL-80TD",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AL-800 / AL-840",
    refill_price: "850 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AM-30DC",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AM-300 / AL-400",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-016T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-5015 / AR-5120 / AR-5316 / AR-5320",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-016LT",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-5015 / AR-5120 / AR-5316 / AR-5320",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-020T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-5516 / AR-5520",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-150DC",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-120E / AR-150",
    refill_price: "850 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-152T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-151 / AR-153 / AR-156 / AR-5012 / AR-5415 / AR-122E / AR- M150 / AR-M155",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-156T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-150 / AR-151 / AR-153 / AR-156 / AR-121E",
    refill_price: "950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-168LT",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-153 / AR-5012 / AR-5415 / AR-122E / AR-M150 / AR-M155",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-168T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-153 / AR-5012 / AR-5415 / AR-122E / AR-M150 / AR-M155",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-200DC",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-161 / AR-200 / AR-205",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-202LT",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-162 / AR-163 / AR-164 / AR-201 / AR-206 / AR-207 / AR-M160 / AR-M205",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-202T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-163 / AR-201 / AR-206 / AR-M160 / AR-M165 / AR-M205 / AR-M207",
    refill_price: "1450 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-208T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-5420 / AR-M201 / AR-203E",
    refill_price: "950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-270T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-235 / AR-275 / AR-M236 / AR-M276",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-310T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-5625 / AR-5631 / AR-M256 / AR-M316",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-450T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-M350N / AR-M350U / AR-M450N / AR-M450U",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-455T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-M351 / AR-M451 / MX-M350N / MX-M350U / MX-M450N / MX-M450U",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "AR-621T",
    id: v4(),
    vendor: "Sharp",
    examples: [],
    chip: true,
    devices: "AR-M550N / AR-M550U / AR-M620N / AR-M620U / AR-M700N / AR-M700U",
    refill_price: "2800 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1110",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-1040 / FS-1020MFP / FS-1120MFP / FS-1060MFP",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1120",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-1025MFP",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-3110",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-4100",
    refill_price: "1600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5230K",
    id: v4(),
    vendor: "kyocera",
    resource: 2600,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5521 / M5021",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5230C",
    id: v4(),
    vendor: "kyocera",
    resource: 2200,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5521 / M5021",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5230M",
    id: v4(),
    vendor: "kyocera",
    resource: 2200,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5521 / M5021",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5230Y",
    id: v4(),
    vendor: "kyocera",
    resource: 2200,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5521 / M5021",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5240K",
    id: v4(),
    vendor: "kyocera",
    resource: 4e3,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5526 / M5026",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5240C",
    id: v4(),
    vendor: "kyocera",
    resource: 3e3,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5526 / M5026",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5240M",
    id: v4(),
    vendor: "kyocera",
    resource: 3e3,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5526 / M5026",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5240Y",
    id: v4(),
    vendor: "kyocera",
    resource: 3e3,
    examples: [],
    chip: true,
    devices: "Kyocera ECOSYS M5526 / M5026",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-3130",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-4200 / FS-4300",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-3170",
    resource: 15e3,
    id: v4(),
    vendor: "kyocera",
    examples: [
      {
        title: "Заправляем TK-3170",
        photo: [
          {
            item: "KyoceraTK-317000-02-20.jpg"
          },
          {
            item: "KyoceraTK-317000-00-46.jpg"
          },
          {
            item: "KyoceraTK-317000-00-57.jpg"
          },
          {
            item: "KyoceraTK-317000-02-20.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже показан пример заправки совместимого (китайского) картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "Kyocera TK-3170" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Совместимые картриджи отличаются оригинальных, наличием съёмной пробки. Это позволяет заправлять такие картриджи не делая в корпусе никаких отверстий.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Но, кроме плюсов, есть и отрицательные стороны. Такие картриджи выдерживают меньше заправок. Со временем, картридж может заклинить. Это связано с тем, что внутри корпуса ломаются механизмы перемешивания тонера. Так же может сломаться и сама пробка.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Но, для картриджей ",
            /* @__PURE__ */ jsx("strong", { children: "Kyocera" }),
            " ничто не играет настолько огромной роли, как тонер, которым они заправляются. Поэтому мы никогда не меняем производителей и марки тонера. Если этот момент проигнорировать, велика вероятность получить фон при печати. Ну а далее ремонт. Подробнее можете почитать, например, здесь ",
            /* @__PURE__ */ jsx("a", { href: "https://printridge.ru/repair/kyocera/P3055", children: "Ремонт МФУ KYOCERA P3055" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа Kyocera TK-3170" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: false,
    devices: "P3050 / P3055 / P3060",
    refill_price: "1900 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-3150",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "M3040idn / M3540idn",
    refill_price: "1800 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-3150",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M3040idn / M3540idn",
    refill_price: "2000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-3160",
    resource: 12500,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "P3045 / P3050 / P3055 / P3060",
    refill_price: "1700 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-6115",
    resource: 15e3,
    id: v4(),
    vendor: "kyocera",
    examples: [
      {
        title: "Заправляем TK-6115",
        photo: [
          {
            item: "TK-6115-1.jpg"
          },
          {
            item: "TK-6115-2.jpg"
          },
          {
            item: "TK-6115-3.jpg"
          },
          {
            item: "TK-6115-4.jpg"
          },
          {
            item: "TK-6115-5.jpg"
          },
          {
            item: "TK-6115-6.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "На примере ниже мы показываем процесс оригинального картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "Kyocera TK-6115" }),
            " на выезде, прямо в офисе у клиента."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Как и на многих оригинальных картриджах Kyocera, пробка на TK-6115 запаяна. Делаем сбоку аккуратное отверстие, засыпаем тонер и заклеиваем монтажной лентой.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "В данном случае, мы уверены, что до этого засыпался тот же тонер, потому ничего вычищать не нужно. Это несомненное преимущество заправки картриджей всегда в одной организации. Даже при покупке совместимых нет гарантии, что тонер всегда будет один и тот же. Как показывает практика, на заводах сыпят всё подряд, что нередко приводит к таким дефектам как: серый фон во время печати, кляксы, размазанное изображение и прочим.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Если вы использовали совместимые картриджи и столкнулись с вышеперечисленными дефектами, мы сможем вам помочь. Информация о стоимости технического обслуживания, например, тут ",
            /* @__PURE__ */ jsx("a", { href: "https://printridge.ru/repair/kyocera/M4125", children: "Ремонт МФУ KYOCERA M4125" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа Kyocera TK-6115" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: false,
    devices: "M4125 / M4132",
    refill_price: "2000 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-8115K",
    resource: 15e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "M8124 / M8130",
    refill_price: "3500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-8115C",
    resource: 6e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "M8124 / M8130",
    refill_price: "3500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-8115M",
    resource: 6e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "M8124 / M8130",
    refill_price: "3500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-8115Y",
    resource: 6e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "M8124 / M8130",
    refill_price: "3500 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-3100",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-2100 / M3040 / M3540",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-4105",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 1800 / TASKalfa 1801 / TASKalfa 2200 / TASKalfa 2201",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-6305",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 3500 / TASKalfa 4500 / TASKalfa 5500",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-7205",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "Taskalfa 3510",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-895K",
    resource: 12e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C8020 / FS-C8025 / FS-C8520 / FS-C8525",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-895C",
    resource: 6e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C8020 / FS-C8025 / FS-C8520 / FS-C8525",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-895M",
    resource: 6e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C8020 / FS-C8025 / FS-C8520 / FS-C8525",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-895Y",
    resource: 6e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C8020 / FS-C8025 / FS-C8520 / FS-C8525",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-100",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "KM-1500",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-110",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-720 / FS-820 / FS-920 / FS-1016MFP / FS-1116MFP",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1100",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1110 / 1024MFP",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-110E",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-720 / FS-820 / FS-920 / FS-1016MFP",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1140",
    resource: 7200,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-1035MFP / FS-1135MFP / M2035 / M2535",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1150",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M2135dn / M2635dn / M2735dw / P2235dn / P2235dw",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1170",
    id: v4(),
    resource: 7200,
    vendor: "kyocera",
    examples: [
      {
        title: "Заправляем TK-1170",
        photo: [
          {
            item: "TK-117000-00-09120.jpg"
          },
          {
            item: "TK-117000-00-30.jpg"
          },
          {
            item: "TK-117000-01-17.jpg"
          },
          {
            item: "TK-117000-03-00.jpg"
          },
          {
            item: "TK-117000-03-34.jpg"
          }
        ],
        video: [
          "https://www.youtube.com/embed/femMLj99zcI"
        ],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже показан пример заправки оригинального картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "Kyocera TK-1170" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Нюанс в том, что производитель запаивает пробки на оригинальных картриджах, что вынуждает сервисников делать в корпусе отверстия для заправки. На совместимых (китайских) картриджах такой проблемы нет, но есть масса других. Например, китайский картридж может заклинить!",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "В случае с нашим пациентом, мы даже не чистим бункер от старого тонера. Причина тому заключается в тонере, который засыпали мы же. А мы сыпем всегда один тонер, на протяжении многих лет.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Использование тонера одной марки и одного производителя критически важно для аппаратов ",
            /* @__PURE__ */ jsx("strong", { children: "Kyocera" }),
            ". Это связано с тем, что на бумагу тонер попадает не напрямую из картриджа, а из блока проявки. И когда в блоке тонер заканчивается, аппарат подкачивает его из тубы. Другими словами, картридж ",
            /* @__PURE__ */ jsx("strong", { children: "Kyocera TK-1170" }),
            "и другие это просто ёмкость с тонером! Если в эту ёмкость засыпать всегда разные порошки, в блоке проявки образуется смесь из тонеров с отличающимися характеристиками. Это непременно скажется на качестве отпечатка. Например, будет появляться серый фон. Лечится это чисткой блока проявки и перезаправкой картридж. По поводу ремонта вы можете посмотреть, например, здесь ",
            /* @__PURE__ */ jsx("a", { href: "https://printridge.ru/repair/kyocera/M2040", children: "Ремонт МФУ KYOCERA M2040" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа Kyocera TK-1170" }),
            " возможна как в нашей мастерской, так и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: true,
    devices: "M2040dn / M2540dn / M2640idw",
    refill_price: "1400 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-1160",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "P2040dn / P2040dw",
    refill_price: "1300 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-1200",
    resource: 3e3,
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "P2335dw / M2235dn / M2735dn / M2835dw",
    refill_price: "1100 ₽",
    recovery_price: "-"
  },
  {
    modelCart: "TK-120",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1030D",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-130",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1028MFP / FS-1128MFP / FS-1300 / FS-1350DN",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-140",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1100",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-150C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C1020MFP",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-150K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C1020MFP",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-150M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C1020MFP",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-150Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C1020MFP",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-160",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1120",
    refill_price: "1000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-17",
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1010 / FS-1050 / FS-1000",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-170",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1320",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-18",
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1018MFP / FS-1020D / FS-1118MFP",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-20H",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1700 / FS-1750 / FS-3700 / FS-3750 / FS-6700 / FS-6900",
    refill_price: "1400 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-310",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-2000 / FS-3900 / FS-4000",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-320",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-3900DN / FS-4000DN",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-330",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-4000DN",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-340",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-2020",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-350",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-3040MFP / FS-3040MFP+ / FS-3140MFP+ / FS-3540MFP",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-360",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-4020DN",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-400",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-6020 ",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-410",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "KM-1620 / KM-1635 / KM-1650 / KM-2020 / KM-2050 / KM-2550",
    refill_price: "1700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-420",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "KM-2550",
    refill_price: "1700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-435",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 180 / TASKalfa 181 / TASKalfa 220 / TASKalfa 221",
    refill_price: "1700 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-440",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-6950DN",
    refill_price: "1100 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-450",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-6970DN",
    refill_price: "1300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-475",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-6025MFP / FS-6025MFP / FS-6030MFP / FS-6525MFP / FS-6530MFP",
    refill_price: "1500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-510C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5020N / FS-C5025N / FS-C5030N",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-510K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5020N / FS-C5025N / FS-C5030N",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-510M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5020N / FS-C5025N / FS-C5030N",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-510Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5020N / FS-C5025N / FS-C5030N",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-520C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5015N",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-520K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5015N",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-520M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5015N",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-520Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5015N",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-540C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5100DN",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-540K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5100DN",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-540M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5100DN",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-540Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5100DN",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-55",
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1920",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-550C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5200DN",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-550K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5200DN",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-550M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5200DN",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-550Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5200DN",
    refill_price: "2300 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-560C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5300DN / P6030 / P6030cdn / C5350",
    refill_price: "2900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-560K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5300DN / P6030 / P6030cdn / C5351",
    refill_price: "2900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-560M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5300DN / P6030 / P6030cdn / C5352",
    refill_price: "2900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-560Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5300DN / P6030 / P6030cdn / C5353",
    refill_price: "2900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-570C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5400DN",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-570K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5400DN",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-570M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5400DN",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-570Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5400DN",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-580C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5150DN / P6021cdn",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-580K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5150DN / P6021cdn",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-580M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5150DN / P6021cdn",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-580Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C5150DN / P6021cdn",
    refill_price: "1900 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-590C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C2026MFP / FS-C2026MFP / FS-C2126MFP / FS-C2526MFP / M6026",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-590K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C2026MFP / FS-C2026MFP / FS-C2126MFP / FS-C2526MFP / M6026",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-590M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C2026MFP / FS-C2026MFP / FS-C2126MFP / FS-C2526MFP / M6026",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-590Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "FS-C2026MFP / FS-C2026MFP / FS-C2126MFP / FS-C2526MFP / M6026",
    refill_price: "2500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-60",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: false,
    devices: "FS-1800",
    refill_price: "1200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-715",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "KM-3050 / KM-4050 / KM-5050",
    refill_price: "3 500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-7300",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "ECOSYS P4040dn",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-1130",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "ECOSYS M2030dn / M2530dn / FS-1030MFP / FS-1130MFP",
    refill_price: "950 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-7105",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 3010i",
    refill_price: "3000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-6705",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 6500i / TASKalfa 6501i / TASKalfa 8000i / TASKalfa 8001i",
    refill_price: "45 000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-6325",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 4002i / 5002i / 6002i",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-574K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "ECOSYS P7035",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-574C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "ECOSYS P7035",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-574M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "ECOSYS P7035",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-574Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "ECOSYS P7035",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5140K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6030cdn / M6530cdn / M6130CDN",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5140C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6030cdn / M6530cdn / M6130CDN",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5140M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6030cdn / M6530cdn / M6130CDN",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5140Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6030cdn / M6530cdn / M6130CDN",
    refill_price: "3200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5150K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6035cidn / M6535cidn",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5150C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6035cidn / M6535cidn",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5150M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6035cidn / M6535cidn",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5150Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M6035cidn / M6535cidn",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5220K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M5521cdn / M5526cdn / P5021cdn / P5026cdn",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5220C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M5521cdn / M5526cdn / P5021cdn / P5026cdn",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5220M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M5521cdn / M5526cdn / P5021cdn / P5026cdn",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5220Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "M5521cdn / M5526cdn / P5021cdn / P5026cdn",
    refill_price: "2200 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5195K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 306ci",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5195C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 306ci",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5195M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 306ci",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5195Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 306ci",
    refill_price: "3500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5215K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 406ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5215C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 406ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5215M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 406ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-5215Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 406ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8345K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 2552ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8345C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 2552ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8345M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 2552ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8345Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 2552ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8525K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 4052ci",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8525C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 4052ci",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8525M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 4052ci",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8525Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 4052ci",
    refill_price: "6000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8705K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 6550ci / TASKalfa 7550ci / TASKalfa 6551ci / TASKalfa 7551ci",
    refill_price: "8000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8705C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 6550ci / TASKalfa 7550ci / TASKalfa 6551ci / TASKalfa 7551ci",
    refill_price: "8000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8705M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 6550ci / TASKalfa 7550ci / TASKalfa 6551ci / TASKalfa 7551ci",
    refill_price: "8000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8705Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 6550ci / TASKalfa 7550ci / TASKalfa 6551ci / TASKalfa 7551ci",
    refill_price: "8000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8515K",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 5052ci / TASKalfa 6052ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8515C",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 5052ci / TASKalfa 6052ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8515M",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 5052ci / TASKalfa 6052ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TK-8515Y",
    id: v4(),
    vendor: "kyocera",
    examples: [],
    chip: true,
    devices: "TASKalfa 5052ci / TASKalfa 6052ci",
    refill_price: "4000 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "SP 101E",
    id: v4(),
    vendor: "Ricoh",
    examples: [],
    chip: false,
    devices: "Ricoh Aficio SP 100 / SP 100SU / SP 100SF",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "SP 100E",
    id: v4(),
    vendor: "Ricoh",
    examples: [],
    chip: false,
    devices: "Aficio SP 100 / SP 100SU / SP 100SF",
    refill_price: "500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "SP 150LE",
    id: v4(),
    vendor: "Ricoh",
    examples: [],
    chip: true,
    devices: "Ricoh SP 150",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "SP 150НE",
    id: v4(),
    vendor: "Ricoh",
    examples: [],
    chip: true,
    devices: "Ricoh SP 150",
    refill_price: "650 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844613 Y",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C822",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844614 M",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C823",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844615 C",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C824",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844616 Bk",
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C825",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844625 Y",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C826",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844626 M",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C827",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844627 C",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C828",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "44844628 Bk",
    id: v4(),
    vendor: "oki",
    examples: [],
    chip: true,
    devices: "C829",
    refill_price: "4500 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "TNP24",
    id: v4(),
    vendor: "minolta",
    examples: [],
    chip: false,
    devices: "bizhub 20 / bizhub 20P",
    refill_price: "600 ₽",
    recovery_price: "Уточняйте"
  },
  {
    modelCart: "DR-P01",
    id: v4(),
    vendor: "minolta",
    examples: [],
    chip: false,
    devices: "bizhub 20 / bizhub 20P",
    refill_price: "Уточняйте",
    recovery_price: "1500 ₽"
  },
  {
    modelCart: "PC-211P",
    resource: 1600,
    examples: [
      {
        title: "Заправка PC-211P",
        photo: [
          {
            item: "PC-211P-1.jpg"
          },
          {
            item: "PC-211P-2.jpg"
          },
          {
            item: "PC-211P-3.jpg"
          },
          {
            item: "PC-211P-4.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже показан пример заправки картриджа ",
            /* @__PURE__ */ jsx("strong", { children: "Pantum PC-211P" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Данные картриджи заправляются максимально просто. Если качество отпечатка устраивает клиента до заправки, тогда процесс займёт всего пару минут.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "Для начала нужно снять пробку на бункере отработки и высыпать всё содержимое. Лучше пропылесосить специальным пылесосом. После этого открываем тонерный отсек и засыпаем. При необходимости меняем чип. Все действия можно выполнять в произвольном порядке.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("strong", { children: "Заправка картриджа Pantum PC-211P" }),
            " возможна в нашей мастерской, и на выезде."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ],
    chip: true,
    id: v4(),
    vendor: "pantum",
    devices: "M6500 / M6507 / M6550NW / P2200 / P2207 / P2500 / P2516 / P2518",
    refill_price: "600 ₽",
    recovery_price: "1300 ₽"
  }
];
const navigation$1 = "_navigation_1c25t_1";
const item_link$1 = "_item_link_1c25t_23";
const item_link_active$1 = "_item_link_active_1c25t_53";
const style$1 = {
  navigation: navigation$1,
  item_link: item_link$1,
  item_link_active: item_link_active$1
};
function VendorMenu() {
  const { vendor: vendor2 } = useParams();
  return /* @__PURE__ */ jsxs("nav", { className: style$1.navigation, children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/hp",
        className: vendor2 === "hp" ? style$1.item_link_active : style$1.item_link,
        children: "HP"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/canon",
        className: vendor2 === "canon" ? style$1.item_link_active : style$1.item_link,
        children: "Canon"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/samsung",
        className: vendor2 === "samsung" ? style$1.item_link_active : style$1.item_link,
        children: "Samsung"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/kyocera",
        className: vendor2 === "kyocera" ? style$1.item_link_active : style$1.item_link,
        children: "Kyocera"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/xerox",
        className: vendor2 === "xerox" ? style$1.item_link_active : style$1.item_link,
        children: "Xerox"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/brother",
        className: vendor2 === "brother" ? style$1.item_link_active : style$1.item_link,
        children: "Brother"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/oki",
        className: vendor2 === "oki" ? style$1.item_link_active : style$1.item_link,
        children: "OKI"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/minolta",
        className: vendor2 === "minolta" ? style$1.item_link_active : style$1.item_link,
        children: "Minolta"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/refill/pantum",
        className: vendor2 === "pantum" ? style$1.item_link_active : style$1.item_link,
        children: "Pantum"
      }
    )
  ] });
}
function RefillComponent() {
  const { vendor: vendor2 } = useParams();
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  const filterCategory = refillData.filter((i) => i.vendor === vendor2);
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = `Заправка картриджей ${vendor2.toUpperCase()}`;
    document.querySelector('meta[name="title"]').setAttribute("content", `Заправка картриджей ${vendor2.toUpperCase()}`);
    document.querySelector('meta[name="description"]').setAttribute("content", `Стоимость заправки картриджей ${vendor2.toUpperCase()}`);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `заправка картриджей ${vendor2.toUpperCase()}, заправить картридж ${vendor2.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
  }, [vendor2]);
  console.log(filterCategory);
  return filterCategory.length > 0 ? /* @__PURE__ */ jsxs("div", { className: styles$p.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$p.title_box, children: /* @__PURE__ */ jsx("p", { className: styles$p.description, children: "Выберите производителя и модель картриджа" }) }),
    /* @__PURE__ */ jsx(VendorMenu, {}),
    /* @__PURE__ */ jsx(Filter, {}),
    /* @__PURE__ */ jsx(FilterItemsComponent, { data: filterCategory })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
}
const container$d = "_container_f0mmm_1";
const info_contacts = "_info_contacts_f0mmm_19";
const info_row = "_info_row_f0mmm_43";
const info_row_text = "_info_row_text_f0mmm_67";
const info_row_img_location = "_info_row_img_location_f0mmm_81";
const info_row_img_call = "_info_row_img_call_f0mmm_101";
const info_row_img_earth = "_info_row_img_earth_f0mmm_121";
const info_row_img_vk = "_info_row_img_vk_f0mmm_141";
const info_row_img_telegram = "_info_row_img_telegram_f0mmm_161";
const map_box = "_map_box_f0mmm_181";
const map_box_menu = "_map_box_menu_f0mmm_203";
const styles$m = {
  container: container$d,
  info_contacts,
  info_row,
  info_row_text,
  info_row_img_location,
  info_row_img_call,
  info_row_img_earth,
  info_row_img_vk,
  info_row_img_telegram,
  map_box,
  map_box_menu
};
const ContactsComponent = () => {
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = "Компания ПРИНТРИДЖ, контакты";
    document.querySelector('meta[name="title"]').setAttribute("content", `Компания ПРИНТРИДЖ, контакты`);
    document.querySelector('meta[name="description"]').setAttribute("content", `Информация о компании ПРИНТРИДЖ, контакты`);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `ремонт ноутбуков контакты, заправка картриджей контакты, ремонт принтеров контакты, ремонт мфу контакты, в Санкт-Петербурге, выезд, на выезде`);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: styles$m.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$m.info_contacts, children: [
      /* @__PURE__ */ jsxs(
        Link,
        {
          className: styles$m.info_row,
          to: `yandexnavi://search?text='Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж'`,
          children: [
            /* @__PURE__ */ jsx("div", { className: styles$m.info_row_img_location }),
            /* @__PURE__ */ jsx("p", { className: styles$m.info_row_text, children: "Санкт-Петербург, Тамбовская улица, 32, оф. 508, 5-й этаж" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          className: styles$m.info_row,
          to: `tel:+79944390149`,
          children: [
            /* @__PURE__ */ jsx("div", { className: styles$m.info_row_img_call }),
            /* @__PURE__ */ jsx("p", { className: styles$m.info_row_text, children: "+7 994 439-01-49" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          className: styles$m.info_row,
          to: `mailto:sales@printridge.ru`,
          children: [
            /* @__PURE__ */ jsx("div", { className: styles$m.info_row_img_earth }),
            /* @__PURE__ */ jsx("p", { className: styles$m.info_row_text, children: "sales@printridge.ru" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          className: styles$m.info_row,
          to: "https://vk.com/printridgespb",
          target: "_blank",
          rel: "noopener noreferrer",
          children: [
            /* @__PURE__ */ jsx("div", { className: styles$m.info_row_img_vk }),
            /* @__PURE__ */ jsx("p", { className: styles$m.info_row_text, children: "VK" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Link,
        {
          className: styles$m.info_row,
          to: "https://t.me/DenFoxPrint",
          target: "_blank",
          rel: "noopener noreferrer",
          children: [
            /* @__PURE__ */ jsx("div", { className: styles$m.info_row_img_telegram }),
            /* @__PURE__ */ jsx("p", { className: styles$m.info_row_text, children: "@DenFoxPrint" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { className: styles$m.map_box, children: /* @__PURE__ */ jsx(
      "iframe",
      {
        src: "https://yandex.ru/map-widget/v1/?um=constructor%3A9944aa2dee5eddb4431580638a8ce5bef6321cc7a9bd5590e12a215b48248c7f&source=constructor",
        width: "100%",
        height: "720",
        frameborder: "0"
      }
    ) })
  ] });
};
const container$c = "_container_1xlwn_1";
const img_desc_box$2 = "_img_desc_box_1xlwn_23";
const left_box = "_left_box_1xlwn_43";
const name = "_name_1xlwn_53";
const text_box$4 = "_text_box_1xlwn_69";
const blue_text$2 = "_blue_text_1xlwn_89";
const black_text$2 = "_black_text_1xlwn_105";
const boxes_title$4 = "_boxes_title_1xlwn_119";
const name_mobile = "_name_mobile_1xlwn_135";
const styles$l = {
  container: container$c,
  img_desc_box: img_desc_box$2,
  left_box,
  name,
  text_box: text_box$4,
  blue_text: blue_text$2,
  black_text: black_text$2,
  boxes_title: boxes_title$4,
  name_mobile
};
const link$1 = "_link_uc6hc_1";
const active = "_active_uc6hc_39";
const tab = "_tab_uc6hc_69";
const box$1 = "_box_uc6hc_93";
const title$3 = "_title_uc6hc_113";
const styles$k = {
  link: link$1,
  active,
  tab,
  box: box$1,
  title: title$3
};
const tabcontent = "_tabcontent_8zjee_1";
const images_box = "_images_box_8zjee_19";
const title$2 = "_title_8zjee_41";
const text$2 = "_text_8zjee_57";
const image$4 = "_image_8zjee_19";
const styles$j = {
  tabcontent,
  images_box,
  title: title$2,
  text: text$2,
  image: image$4
};
const container$b = "_container_9puap_1";
const buttons_box = "_buttons_box_9puap_23";
const button$2 = "_button_9puap_23";
const button_active = "_button_active_9puap_81";
const styles$i = {
  container: container$b,
  buttons_box,
  button: button$2,
  button_active
};
const container$a = "_container_mlelf_1";
const button_left$1 = "_button_left_mlelf_29";
const button_right$1 = "_button_right_mlelf_63";
const styles$h = {
  container: container$a,
  button_left: button_left$1,
  button_right: button_right$1
};
const VideosComponent = ({ videosArr }) => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const nextSlide = () => {
    setCurrentVideo(currentVideo === videosArr.length - 1 ? 0 : currentVideo + 1);
  };
  const prevSlide = () => {
    setCurrentVideo(currentVideo === 0 ? videosArr.length - 1 : currentVideo - 1);
  };
  return videosArr.length > 0 && /* @__PURE__ */ jsxs(
    "div",
    {
      className: styles$h.container,
      children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            className: styles$h.button_left,
            onClick: prevSlide,
            children: "<"
          }
        ),
        /* @__PURE__ */ jsx(
          "iframe",
          {
            id: "ytplayer",
            type: "text/html",
            width: "100%",
            height: "400",
            src: videosArr[currentVideo] + "?vq=hd1080&autoplay=1",
            frameborder: "0",
            allowFullScreen: true
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: styles$h.button_right,
            onClick: nextSlide,
            children: ">"
          }
        )
      ]
    }
  );
};
const container$9 = "_container_mcoal_1";
const img = "_img_mcoal_21";
const button_left = "_button_left_mcoal_33";
const button_right = "_button_right_mcoal_67";
const styles$g = {
  container: container$9,
  img,
  button_left,
  button_right
};
const PhotosComponent = ({ imgagesNameArr }) => {
  const location = useLocation();
  const { model: model2, vendor: vendor2 } = useParams();
  const [currentImg, setCurrentImg] = useState(0);
  const imagesArr = [];
  const pullImagesToArr = () => {
    location.pathname.includes("refill") && imgagesNameArr.map((i, key) => {
      const img2 = {
        src: `https://storage.yandexcloud.net/printridge/examples/refill/${vendor2}/${model2}/${i.item}`,
        alt: i.item
      };
      imagesArr.push(img2);
    }) || location.pathname.includes("repair") && imgagesNameArr.map((i, key) => {
      const img2 = {
        src: `https://storage.yandexcloud.net/printridge/examples/repair/${vendor2}/${model2}/${i.item}`,
        alt: i.item
      };
      imagesArr.push(img2);
    }) || location.pathname.includes("remont-noutbukov") && imgagesNameArr.map((i, key) => {
      const img2 = {
        src: `https://storage.yandexcloud.net/printridge/examples/remont-noutbukov/${vendor2}/${model2}/${i.item}`,
        alt: i.item
      };
      imagesArr.push(img2);
    });
    return imagesArr;
  };
  pullImagesToArr();
  const nextSlide = () => {
    setCurrentImg(currentImg === imagesArr.length - 1 ? 0 : currentImg + 1);
  };
  const prevSlide = () => {
    setCurrentImg(currentImg === 0 ? imagesArr.length - 1 : currentImg - 1);
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$g.container, children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: styles$g.button_left,
        onClick: prevSlide,
        children: "<"
      }
    ),
    /* @__PURE__ */ jsx(
      "img",
      {
        src: imagesArr[currentImg].src,
        alt: imagesArr[currentImg].alt,
        className: styles$g.img
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        className: styles$g.button_right,
        onClick: nextSlide,
        children: ">"
      }
    )
  ] });
};
const MediaSlider = ({ photos, videos }) => {
  const dispatch = useDispatch();
  const { photoButton, videoButton } = useSelector((state) => state.buttons);
  const handleClickPhoto = () => {
    dispatch({
      type: PHOTO_BUTTON,
      photoButton: "photo"
    });
    dispatch({
      type: VIDEO_BUTTON,
      videoButton: ""
    });
  };
  const handleClickVideo = () => {
    dispatch({
      type: PHOTO_BUTTON,
      photoButton: ""
    });
    dispatch({
      type: VIDEO_BUTTON,
      videoButton: "video"
    });
  };
  return /* @__PURE__ */ jsxs("div", { className: styles$i.container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$i.buttons_box, children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          className: photoButton === "photo" ? styles$i.button_active : styles$i.button,
          onClick: handleClickPhoto,
          children: "Фото"
        }
      ),
      videos.length > 0 && /* @__PURE__ */ jsx(
        Link,
        {
          className: videoButton === "video" ? styles$i.button_active : styles$i.button,
          onClick: handleClickVideo,
          children: "Видео"
        }
      )
    ] }),
    photoButton === "photo" && /* @__PURE__ */ jsx(PhotosComponent, { imgagesNameArr: photos }),
    videos.length > 0 && videoButton === "video" && /* @__PURE__ */ jsx(VideosComponent, { videosArr: videos })
  ] });
};
function TabContent({ title: title2, photo, text: text2, video }) {
  return /* @__PURE__ */ jsxs("div", { className: styles$j.tabcontent, children: [
    /* @__PURE__ */ jsx("h3", { className: styles$j.title, children: title2 }),
    /* @__PURE__ */ jsx("section", { className: styles$j.text, children: text2 }),
    /* @__PURE__ */ jsx("div", { className: styles$j.images_box }),
    /* @__PURE__ */ jsx(MediaSlider, { photos: photo, videos: video })
  ] });
}
function Tabs({ items }) {
  const [active2, setActive] = useState(0);
  const openTab = (e) => setActive(e.target.dataset.index);
  return /* @__PURE__ */ jsxs("div", { className: styles$k.box, children: [
    /* @__PURE__ */ jsx("h2", { className: styles$k.title, children: "Примеры нашей работы" }),
    /* @__PURE__ */ jsx("div", { className: styles$k.tab, children: items.map((n, i) => /* @__PURE__ */ jsx(
      NavLink,
      {
        className: `${styles$k.link} ${active2.toString() === i.toString() ? styles$k.active : ""}`,
        onClick: openTab,
        "data-index": i,
        children: n.title
      },
      i
    )) }),
    items[active2] && /* @__PURE__ */ jsx(TabContent, { ...items[active2] })
  ] });
}
const image$3 = "_image_132dn_1";
const styles$f = {
  image: image$3
};
const ImageBox = () => {
  const { model: model2, vendor: vendor2 } = useParams();
  const img2 = `https://storage.yandexcloud.net/printridge/refill/${vendor2}/${model2}.png`;
  return img2 && /* @__PURE__ */ jsx(
    "img",
    {
      className: styles$f.image,
      src: img2,
      alt: model2
    }
  );
};
const text_container$2 = "_text_container_1xskl_1";
const styles$e = {
  text_container: text_container$2
};
const DescriptionBox = () => {
  const { model: model2, vendor: vendor2 } = useParams();
  return /* @__PURE__ */ jsxs("p", { className: styles$e.text_container, children: [
    "Заправка картриджа ",
    `${vendor2.toUpperCase()} ${model2}`,
    " специалистами нашей компании выполняется как на выезде, так и в нашей мастерской.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Для заправки в нашей мастерской возможна доставка от вас и обратно.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Мы используем только проверенные временем тонеры, что важно, для обеспечения качественной печати. Так же, хороший тонер не сокращает срок службы других узлов вашего аппарата!",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("strong", { children: [
      "Заправка картриджа ",
      `${vendor2.toUpperCase()} ${model2}`
    ] }),
    " - включает в себя чистку отработки, очистку деталей картриджа и заправку тонером.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsxs("strong", { children: [
      "Восстановление картриджа ",
      `${vendor2.toUpperCase()} ${model2}`
    ] }),
    " - включает всё то же, что и заправка, а так же замену всех изношенных деталей.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Если ваши картриджи печатают с дефектами, вы можете прислать нам фото примера такой печати и мы проконсультируем вас о дальнейших действиях. Специалисты нашей компании с удовольствием ответят на все ваши вопросы и помогут сориентироваться в любой ситуации, связанной с заправкой картриджей или ремонтом принтеров."
  ] });
};
function RefillItemComponent() {
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  const { vendor: vendor2, model: model2 } = useParams();
  const data = refillData.find((i) => i.modelCart === model2);
  useEffect(() => {
    if (data) {
      document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
      document.title = `Заправка картриджей ${vendor2.toUpperCase()} ${model2.toUpperCase()} в Санкт-Петербурге`;
      document.querySelector('meta[name="title"]').setAttribute("content", `Заправка картриджей ${vendor2.toUpperCase()} ${model2.toUpperCase()} для ${data.devices} в Санкт-Петербурге`);
      document.querySelector('meta[name="description"]').setAttribute("content", `Заправка ${data.modelCart} - ${data.refill_price} Восстановление ${data.modelCart} ${data.recovery_price}`);
      document.querySelector('meta[name="keywords"]').setAttribute("content", `заправка картриджа ${vendor2.toUpperCase()} ${model2.toUpperCase()}, заправить картридж ${vendor2.toUpperCase()} ${model2.toUpperCase()}, для ${data.devices}, восстановление картриджа ${vendor2.toUpperCase()} ${model2.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
    } else {
      return;
    }
  }, [vendor2, model2]);
  return data ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: styles$l.container, children: [
      /* @__PURE__ */ jsxs("h2", { className: styles$l.name, children: [
        "Заправка картриджа ",
        `${data.vendor.toUpperCase()} ${data.modelCart}`
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$l.img_desc_box, children: [
        /* @__PURE__ */ jsxs("div", { className: styles$l.left_box, children: [
          /* @__PURE__ */ jsxs("div", { className: styles$l.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$l.blue_text, children: "Совместимые модели" }),
            /* @__PURE__ */ jsx("p", { className: styles$l.black_text, children: data.devices })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$l.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$l.blue_text, children: "Ресурс картриджа:" }),
            /* @__PURE__ */ jsx("p", { className: styles$l.black_text, children: `${data.resource} стр., при заполнении страницы 5%` })
          ] }),
          /* @__PURE__ */ jsx("p", { className: styles$l.boxes_title, children: "Цены" }),
          /* @__PURE__ */ jsxs("div", { className: styles$l.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$l.blue_text, children: `Заправка ${data.modelCart}` }),
            /* @__PURE__ */ jsx("p", { className: styles$l.black_text, children: data.refill_price })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$l.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$l.blue_text, children: `Восстановление ${data.modelCart}` }),
            /* @__PURE__ */ jsx("p", { className: styles$l.black_text, children: data.recovery_price })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$l.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$l.blue_text, children: "Замена чипа" }),
            /* @__PURE__ */ jsx("p", { className: styles$l.black_text, children: data.chip ? "уточняйте" : "не требуется" })
          ] })
        ] }),
        /* @__PURE__ */ jsx(ImageBox, {}),
        /* @__PURE__ */ jsxs("h2", { className: styles$l.name_mobile, children: [
          "Заправка картриджа ",
          `${data.vendor.toUpperCase()} ${data.modelCart}`
        ] })
      ] }),
      /* @__PURE__ */ jsx(DescriptionBox, {})
    ] }),
    data.examples.length !== 0 && /* @__PURE__ */ jsx(Tabs, { items: data.examples })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
}
const container$8 = "_container_17xd8_1";
const img_desc_box$1 = "_img_desc_box_17xd8_25";
const price_container$2 = "_price_container_17xd8_43";
const price_wrap_box$3 = "_price_wrap_box_17xd8_51";
const specifications$1 = "_specifications_17xd8_67";
const header$1 = "_header_17xd8_81";
const header_mobile$1 = "_header_mobile_17xd8_97";
const boxes_title$3 = "_boxes_title_17xd8_105";
const text_box$3 = "_text_box_17xd8_121";
const blue_text$1 = "_blue_text_17xd8_141";
const black_text$1 = "_black_text_17xd8_157";
const styles$d = {
  container: container$8,
  img_desc_box: img_desc_box$1,
  price_container: price_container$2,
  price_wrap_box: price_wrap_box$3,
  specifications: specifications$1,
  header: header$1,
  header_mobile: header_mobile$1,
  boxes_title: boxes_title$3,
  text_box: text_box$3,
  blue_text: blue_text$1,
  black_text: black_text$1
};
const image$2 = "_image_132dn_1";
const styles$c = {
  image: image$2
};
const ImageRapairBox$1 = () => {
  const { model: model2, vendor: vendor2 } = useParams();
  const img2 = `https://storage.yandexcloud.net/printridge/repair/${vendor2}/${model2}.png`;
  return img2 && /* @__PURE__ */ jsx(
    "img",
    {
      className: styles$c.image,
      src: img2,
      alt: model2
    }
  );
};
const container$7 = "_container_j3do2_1";
const text_container$1 = "_text_container_j3do2_25";
const styles$b = {
  container: container$7,
  text_container: text_container$1
};
const DescriptionRepairBox$1 = () => {
  const { model: model2 } = useParams();
  const data = repair.find((i) => i.model.replace(/\s/g, "") === model2);
  return /* @__PURE__ */ jsx("div", { className: styles$b.container, children: /* @__PURE__ */ jsxs("p", { className: styles$b.text_container, children: [
    "Выше указаны цены за ремонт конкретного блока вашего аппарата, без стоимости запчастей! Это обусловлено тем, что цены на запчасти постоянно меняются. Сколько будет стоить ремонт именно в вашем случае, мы сможем сказать после диагностики.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Для быстрой диагностики неисправностей, в случаях, когда устройство печатает с дефектами, подготовьте, пожалуйста, скан с примером или фото в хорошем качестве. Это значительно ускорит процесс ремонта и, в большинстве случаев, сделает диагностику ",
    /* @__PURE__ */ jsx("strong", { children: "БЕСПЛАТНОЙ!" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Большую часть неисправностей вашей техники возможно решить ",
    /* @__PURE__ */ jsx("strong", { children: "на выезде" }),
    ", не забирая устройство. Потому, ",
    /* @__PURE__ */ jsxs("strong", { children: [
      "ремонт ",
      data.device === "printer" ? "принтера" : "МФУ",
      " ",
      `${data.vendor.toUpperCase()} ${data.model}`
    ] }),
    " осуществляется как на выезде (в офисе клиента), так и в стационаре (в нашей мастерской).",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Для ремонта ",
    data.device === "printer" ? "принтера" : "МФУ",
    " ",
    `${data.vendor.toUpperCase()} ${data.model}`,
    " используются оригинальные запчасти. Но, по желанию клиента, возможна установка совместимых. Качественные совместимые запчасти очень часто работают дольше и качественнее, нежели оригинал. Хотя, в ряде случаев, ресурс может быть меньше. О всех возможных нюансах и последствиях мы вас непременно предупредим.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {})
  ] }) });
};
const container$6 = "_container_e54pj_1";
const image$1 = "_image_e54pj_27";
const info_box$1 = "_info_box_e54pj_41";
const title$1 = "_title_e54pj_57";
const price$2 = "_price_e54pj_71";
const button$1 = "_button_e54pj_85";
const styles$a = {
  container: container$6,
  image: image$1,
  info_box: info_box$1,
  title: title$1,
  price: price$2,
  button: button$1
};
const UseCartridges = ({ cartridgesArray }) => {
  return cartridgesArray.map((i, key) => {
    const cartridge = refillData.find((j) => j.modelCart === i);
    return cartridge !== void 0 && /* @__PURE__ */ jsxs("div", { className: styles$a.container, children: [
      /* @__PURE__ */ jsx("img", { className: styles$a.image, src: `https://storage.yandexcloud.net/printridge/refill/${cartridge.vendor}/${cartridge.modelCart}.png` }),
      /* @__PURE__ */ jsxs("div", { className: styles$a.info_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$a.title, children: `Заправка картриджа ${cartridge.vendor.toUpperCase()} ${cartridge.modelCart}` }),
        /* @__PURE__ */ jsx("p", { className: styles$a.price, children: `Стоимость заправки ${cartridge.refill_price}` }),
        /* @__PURE__ */ jsx("p", { className: styles$a.price, children: `Стоимость восстановления ${cartridge.recovery_price}` })
      ] }),
      /* @__PURE__ */ jsx(
        Link,
        {
          className: styles$a.button,
          to: `/refill/${cartridge.vendor}/${cartridge.modelCart}`,
          target: "_blank",
          rel: "noopener noreferrer",
          children: "Подробнее"
        }
      )
    ] }, key);
  });
};
const container$5 = "_container_961w1_1";
const price_wrap_box$2 = "_price_wrap_box_961w1_23";
const boxes_title$2 = "_boxes_title_961w1_41";
const text_box$2 = "_text_box_961w1_59";
const text$1 = "_text_961w1_59";
const price$1 = "_price_961w1_23";
const styles$9 = {
  container: container$5,
  price_wrap_box: price_wrap_box$2,
  boxes_title: boxes_title$2,
  text_box: text_box$2,
  text: text$1,
  price: price$1
};
const RepairPriceComponent$1 = ({ data }) => {
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  const { vendor: vendor2, model: model2 } = useParams();
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = `Ремонт принтеров и МФУ ${vendor2.toUpperCase()} ${model2.toUpperCase()} в Санкт-Петербурге`;
    document.querySelector('meta[name="title"]').setAttribute("content", `Ремонт принтеров и МФУ ${vendor2.toUpperCase()} ${model2.toUpperCase()} в Санкт-Петербурге`);
    document.querySelector('meta[name="description"]').setAttribute("content", `
        Стоимость ремонта ${data.device === "printer" ? "принтера" : "МФУ"} ${vendor2.toUpperCase()} ${model2}
        Диагностика ${data.price.diagnostics}
        ТО ${data.price.TO}
        Замена роликов ${data.price.rollers}
        Ремонт барабана ${data.price.drum}
        Ремонт термоблока (печки) ${data.price.therm}
        Ремонт электроники ${data.price.electronics}
        `);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `ремонт ${data.device === "printer" ? "принтера" : "МФУ"} ${vendor2.toUpperCase()} ${model2.toUpperCase()}, техническое обслуживание ${data.device === "printer" ? "принтера" : "МФУ"} ${vendor2.toUpperCase()} ${model2.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
  }, [vendor2, model2]);
  return /* @__PURE__ */ jsxs("div", { className: styles$9.container, children: [
    /* @__PURE__ */ jsx("p", { className: styles$9.boxes_title, children: "Цены" }),
    /* @__PURE__ */ jsxs("div", { className: styles$9.price_wrap_box, children: [
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Диагностика" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.diagnostics })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "ТО" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.TO })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Замена роликов" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.rollers })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт барабана" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.drum })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт термоблока (печки)" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.therm })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт дуплекса" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.duplex })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт редуктора" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.reducer })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт лазера" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.laser })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт электроники" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.electronics })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт сканера" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.scaner ? data.price.scaner : "-" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$9.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles$9.text, children: "Ремонт автоподатчика (ADF)" }),
        /* @__PURE__ */ jsx("p", { className: styles$9.price, children: data.price.adf ? data.price.adf : "-" })
      ] })
    ] })
  ] });
};
function RepairItemComponent() {
  const { model: model2 } = useParams();
  const data = repair.find((i) => i.model.replace(/\s/g, "") === model2);
  return data ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: styles$d.container, children: [
      /* @__PURE__ */ jsxs("h2", { className: styles$d.header, children: [
        "Ремонт ",
        data.device === "printer" ? "принтера" : "МФУ",
        " ",
        `${data.vendor.toUpperCase()} ${data.model}`
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$d.img_desc_box, children: [
        /* @__PURE__ */ jsx("div", { className: styles$d.price_container, children: /* @__PURE__ */ jsxs("div", { className: styles$d.specifications, children: [
          /* @__PURE__ */ jsxs("div", { className: styles$d.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$d.blue_text, children: "Способ печати" }),
            /* @__PURE__ */ jsx("p", { className: styles$d.black_text, children: data.type === "mono" && "Монохромный" || data.type === "color" && "Цветной" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$d.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$d.blue_text, children: "Тип устройства" }),
            /* @__PURE__ */ jsx("p", { className: styles$d.black_text, children: data.device === "printer" && "Принтер" || data.device === "MFU" && "МФУ" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$d.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$d.blue_text, children: "Формат печати" }),
            /* @__PURE__ */ jsx("p", { className: styles$d.black_text, children: data.format })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$d.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$d.blue_text, children: "Скорость" }),
            /* @__PURE__ */ jsx("p", { className: styles$d.black_text, children: `${data.speed} стр./мин.` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$d.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$d.blue_text, children: "Максимальная нагрузка (стр.)" }),
            /* @__PURE__ */ jsx("p", { className: styles$d.black_text, children: `${data.capacity} в месяц` })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(ImageRapairBox$1, {}),
        /* @__PURE__ */ jsxs("h2", { className: styles$d.header_mobile, children: [
          "Ремонт ",
          data.device === "printer" ? "принтера" : "МФУ",
          " ",
          `${data.vendor.toUpperCase()} ${data.model}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(RepairPriceComponent$1, { data }),
    /* @__PURE__ */ jsx(DescriptionRepairBox$1, {}),
    data.cartridges.length !== 0 && /* @__PURE__ */ jsx(UseCartridges, { cartridgesArray: data.cartridges }),
    data.examples.length !== 0 && /* @__PURE__ */ jsx(Tabs, { items: data.examples })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
}
const container$4 = "_container_1riq3_1";
const info_box = "_info_box_1riq3_29";
const title = "_title_1riq3_47";
const button = "_button_1riq3_65";
const styles$8 = {
  container: container$4,
  info_box,
  title,
  button
};
function NotFound404() {
  const navigate = useNavigate();
  const canonicalUrl = ``;
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = "Компания ПРИНТРИДЖ. Страница не найдена";
    document.querySelector('meta[name="title"]').setAttribute("content", "Компания ПРИНТРИДЖ. 404 Not Found");
    document.querySelector('meta[name="description"]').setAttribute("content", "404 Not Found, Страница не найдена");
    document.querySelector('meta[name="keywords"]').setAttribute("content", `заправка картриджей, заправить картридж, ремонт картриджей, ремонт оргтехники, создание сайтов,
        ремонт принтеров, ремонт мфу, ремонт ноутбуков, установка операционных систем Windows, Linux, удаление вирусов, в Санкт-Петербурге, Санкт-Петербург`);
  }, []);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("div", { className: styles$8.container, children: [
      /* @__PURE__ */ jsx("div", { className: styles$8.info_box, children: /* @__PURE__ */ jsx("h1", { className: styles$8.title, children: "404 - Страница не найдена" }) }),
      /* @__PURE__ */ jsx(Link, { className: styles$8.button, to: "/", children: "Вернуться на главную" }),
      /* @__PURE__ */ jsx(Link, { className: styles$8.button, onClick: () => {
        navigate(-1);
      }, children: "Вернуться назад" })
    ] }),
    /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true })
  ] });
}
const box = "_box_11dfd_1";
const styles$7 = {
  box
};
const laptopRepairPrice = [
  {
    model: "15s-eq3053ci",
    series: "",
    vendor: "hp",
    display: 15.6,
    processor: 2,
    processorVendor: "AMD",
    processorName: "Ryzen 7 5825U (8 cores) 2 - 4,5 ГГц",
    video: "AMD Radeon 7 Graphics",
    ram: 16,
    ramType: "DDR4",
    price: {},
    examples: []
  },
  {
    model: "14-dv0090ur",
    series: "Pavilion",
    vendor: "hp",
    display: 14,
    processor: 2,
    processorVendor: "Intel",
    processorName: "Core i3-1125G4 (4 cores) 2 - 3,7 ГГц",
    video: "Intel UHD Graphics (G4)",
    ram: 8,
    ramType: "DDR4",
    price: {},
    examples: []
  },
  {
    model: "A317-54-54T2",
    series: "Aspire 3",
    vendor: "acer",
    display: 17.3,
    processor: 1.3,
    processorVendor: "Intel",
    processorName: "Core i5-1235U (10 cores) 1,3 - 4,4 ГГц",
    video: "Intel Iris Xe Graphics 80",
    ram: 8,
    ramType: "DDR4",
    price: {},
    examples: []
  },
  {
    model: "np300v5a",
    series: "",
    vendor: "samsung",
    display: 15.6,
    processor: 2.5,
    processorVendor: "Intel",
    processorName: "i5 2450M(2.5)",
    video: "NV GT520MX 1Gb",
    ram: 8,
    ramType: "DDR3",
    price: {},
    examples: [
      {
        title: "Замена батареи",
        photo: [
          {
            item: "1-2bfEafO0Fnk.jpg"
          },
          {
            item: "2-5Lu6qHdwWfs.jpg"
          },
          {
            item: "3-636eYQFJgXU.jpg"
          },
          {
            item: "4-lx3CGlNyC-w.jpg"
          }
        ],
        video: [],
        text: /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Ниже на фото мы показали как можно самостоятельно заменить аккумулятор на ноутбуке ",
            /* @__PURE__ */ jsx("strong", { children: "Samsung NP300V5A" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "Ничего сложного в процессе замены нет. Нужно открыть замки (показаны на фото стрелками) и выдвинуть аккумулятор. Маркировка батареи для ",
            /* @__PURE__ */ jsx("strong", { children: "Samsung NP300V5A" }),
            " так же показана на фото. Но, если вы боитесь сделать что-то неправильно, тогда лучше доверить замену профессионалам. Батареи на данный ноутбук может не быть в наличии и нужно будет её заказать."
          ] }),
          /* @__PURE__ */ jsx("p", { children: "За подробностями пишите или звоните нам по указанным контактам." })
        ] })
      }
    ]
  }
];
const SitemapGenerator = () => {
  const lastmod = (/* @__PURE__ */ new Date()).toLocaleDateString().split(".").reverse().join("-");
  return /* @__PURE__ */ jsxs("div", { className: styles$7.box, children: [
    refillData.map(
      (i, key) => /* @__PURE__ */ jsx("p", { children: `<url>
                        <loc>https://printridge.ru/refill/${i.vendor}/${i.modelCart}</loc>
                        <lastmod>${lastmod}</lastmod>
                        <priority>1.0</priority>
                    </url>
                    ` })
    ),
    repairPrintersPrice.map(
      (i, key) => /* @__PURE__ */ jsx("p", { children: `<url>
                        <loc>https://printridge.ru/repair/${i.vendor}/${i.model.replace(/\s/g, "")}</loc>
                        <lastmod>${lastmod}</lastmod>
                        <priority>1.0</priority>
                    </url>
                    ` })
    ),
    laptopRepairPrice.map(
      (i, key) => /* @__PURE__ */ jsx("p", { children: `<url>
                        <loc>https://printridge.ru/remont-noutbukov/${i.vendor}/${i.model.replace(/\s/g, "")}</loc>
                        <lastmod>${lastmod}</lastmod>
                        <priority>1.0</priority>
                    </url>
                    ` })
    )
  ] });
};
const container$3 = "_container_1uhnk_1";
const title_box = "_title_box_1uhnk_23";
const description = "_description_1uhnk_41";
const styles$6 = {
  container: container$3,
  title_box,
  description
};
const price_row$1 = "_price_row_2yl2l_1";
const link = "_link_2yl2l_39";
const vendor$1 = "_vendor_2yl2l_49";
const processorVendor$1 = "_processorVendor_2yl2l_73";
const model$1 = "_model_2yl2l_103";
const display$1 = "_display_2yl2l_127";
const ram$1 = "_ram_2yl2l_151";
const ramType$1 = "_ramType_2yl2l_175";
const separator$1 = "_separator_2yl2l_283";
const styles$5 = {
  price_row: price_row$1,
  link,
  vendor: vendor$1,
  processorVendor: processorVendor$1,
  model: model$1,
  display: display$1,
  ram: ram$1,
  ramType: ramType$1,
  separator: separator$1
};
const LaptopItem = ({ vend, processorVendor: processorVendor2, model: model2, display: display2, ram: ram2, ramType: ramType2 }) => {
  const location = useLocation();
  const locationPathname = location.pathname;
  return /* @__PURE__ */ jsx(
    Link,
    {
      to: `${locationPathname}/${model2.replace(/\s/g, "")}`,
      className: styles$5.link,
      children: /* @__PURE__ */ jsxs("div", { className: styles$5.price_row, children: [
        /* @__PURE__ */ jsx("p", { className: styles$5.vendor, children: vend.toUpperCase() }),
        /* @__PURE__ */ jsx("p", { className: styles$5.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$5.model, children: model2 }),
        /* @__PURE__ */ jsx("p", { className: styles$5.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$5.processorVendor, children: processorVendor2 }),
        /* @__PURE__ */ jsx("p", { className: styles$5.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$5.display, children: `${display2} "` }),
        /* @__PURE__ */ jsx("p", { className: styles$5.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$5.ram, children: `${ram2} Гб` }),
        /* @__PURE__ */ jsx("p", { className: styles$5.separator, children: "|" }),
        /* @__PURE__ */ jsx("p", { className: styles$5.ramType, children: ramType2 })
      ] })
    },
    model2
  );
};
const price_container$1 = "_price_container_16jzy_1";
const price_row = "_price_row_16jzy_37";
const vendor = "_vendor_16jzy_69";
const model = "_model_16jzy_93";
const processorVendor = "_processorVendor_16jzy_123";
const display = "_display_16jzy_147";
const ram = "_ram_16jzy_171";
const ramType = "_ramType_16jzy_195";
const separator = "_separator_16jzy_327";
const styles$4 = {
  price_container: price_container$1,
  price_row,
  vendor,
  model,
  processorVendor,
  display,
  ram,
  ramType,
  separator
};
function FilterLaptopsComponent({ data }) {
  useParams();
  const filterValue = useSelector((state) => state.filter.value.value);
  const filteredData = data.filter((i) => i.model.toLowerCase().includes(filterValue === void 0 ? "" : filterValue.toLowerCase()) || i.series.toLowerCase().includes(filterValue === void 0 ? "" : filterValue.toLowerCase()));
  return /* @__PURE__ */ jsxs("div", { className: styles$4.price_container, children: [
    /* @__PURE__ */ jsxs("div", { className: styles$4.price_row, children: [
      /* @__PURE__ */ jsx("p", { className: styles$4.vendor, children: "Производитель" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.model, children: "Модель" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.processorVendor, children: "Процессор" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.display, children: "Диагональ" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.ram, children: "Память" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.separator, children: "|" }),
      /* @__PURE__ */ jsx("p", { className: styles$4.ramType, children: "Тип памяти" })
    ] }),
    filteredData.map((i, key) => {
      return /* @__PURE__ */ jsx(
        LaptopItem,
        {
          vend: i.vendor,
          processorVendor: i.processorVendor,
          model: i.model,
          display: i.display,
          ram: i.ram,
          ramType: i.ramType
        }
      );
    })
  ] });
}
const navigation = "_navigation_1wpou_1";
const item_link = "_item_link_1wpou_23";
const item_link_active = "_item_link_active_1wpou_53";
const style = {
  navigation,
  item_link,
  item_link_active
};
function VendorMenuLaptops() {
  const { vendor: vendor2 } = useParams();
  return /* @__PURE__ */ jsxs("nav", { className: style.navigation, children: [
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/hp",
        className: vendor2 === "hp" ? style.item_link_active : style.item_link,
        children: "HP"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/acer",
        className: vendor2 === "acer" ? style.item_link_active : style.item_link,
        children: "Acer"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/samsung",
        className: vendor2 === "samsung" ? style.item_link_active : style.item_link,
        children: "Samsung"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/lenovo",
        className: vendor2 === "lenovo" ? style.item_link_active : style.item_link,
        children: "Lenovo"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/honor",
        className: vendor2 === "honor" ? style.item_link_active : style.item_link,
        children: "Honor"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/asus",
        className: vendor2 === "asus" ? style.item_link_active : style.item_link,
        children: "Asus"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/huawei",
        className: vendor2 === "huawei" ? style.item_link_active : style.item_link,
        children: "Huawei"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/sony",
        className: vendor2 === "sony" ? style.item_link_active : style.item_link,
        children: "Sony"
      }
    ),
    /* @__PURE__ */ jsx(
      NavLink,
      {
        to: "/remont-noutbukov/dell",
        className: vendor2 === "dell" ? style.item_link_active : style.item_link,
        children: "Dell"
      }
    )
  ] });
}
const display1314 = {
  diagnostics: 500,
  TO: 600,
  thermalPaste: 900,
  installOS: 1500,
  installPO: 350,
  antivirus: 2e3,
  matrixReplacement: 1700,
  batteryReplacement: 600,
  ramReplacement: 700,
  electronics: 2e3
};
const display1415 = {
  diagnostics: 600,
  TO: 650,
  thermalPaste: 950,
  installOS: 1600,
  installPO: 350,
  antivirus: 2150,
  matrixReplacement: 1800,
  batteryReplacement: 650,
  ramReplacement: 750,
  electronics: 2100
};
const display1516 = {
  diagnostics: 650,
  TO: 700,
  thermalPaste: 1e3,
  installOS: 1650,
  installPO: 350,
  antivirus: 2200,
  matrixReplacement: 1900,
  batteryReplacement: 700,
  ramReplacement: 800,
  electronics: 2200
};
const display1617 = {
  diagnostics: 700,
  TO: 750,
  thermalPaste: 1100,
  installOS: 1700,
  installPO: 350,
  antivirus: 2250,
  matrixReplacement: 1950,
  batteryReplacement: 750,
  ramReplacement: 850,
  electronics: 2300
};
const display1718 = {
  diagnostics: 750,
  TO: 800,
  thermalPaste: 1200,
  installOS: 1750,
  installPO: 350,
  antivirus: 2300,
  matrixReplacement: 2e3,
  batteryReplacement: 850,
  ramReplacement: 850,
  electronics: 2400
};
const display18 = {
  diagnostics: 800,
  TO: 900,
  thermalPaste: 1300,
  installOS: 1800,
  installPO: 350,
  antivirus: 2300,
  matrixReplacement: 2200,
  batteryReplacement: 900,
  ramReplacement: 900,
  electronics: 2500
};
const repairLaptops = laptopRepairPrice.map((i) => {
  if (i.display >= 13 && i.display < 14) {
    i.price = display1314;
    return i;
  } else if (i.display >= 14 && i.display < 15) {
    i.price = display1415;
    return i;
  } else if (i.display >= 15 && i.display < 16) {
    i.price = display1516;
    return i;
  } else if (i.display >= 16 && i.display < 17) {
    i.price = display1617;
    return i;
  } else if (i.display >= 17 && i.display < 18) {
    i.price = display1718;
    return i;
  } else if (i.display >= 18) {
    i.price = display18;
    return i;
  } else {
    return i;
  }
});
function RepairLaptopsComponent() {
  const { vendor: vendor2 } = useParams();
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  const filterCategory = repairLaptops.filter((i) => i.vendor === vendor2);
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = `Ремонт ноутбуков ${vendor2.toUpperCase()}`;
    document.querySelector('meta[name="title"]').setAttribute("content", `Ремонт ноутбуков ${vendor2.toUpperCase()}`);
    document.querySelector('meta[name="description"]').setAttribute("content", `Прайс по ремонту ноутбуков ${vendor2.toUpperCase()}`);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `ремонт ноутбуков ${vendor2.toUpperCase()}, чистка ноутбуков ${vendor2.toUpperCase()}, в Санкт-Петербурге, выезд, на выезде`);
  }, [vendor2]);
  return filterCategory.length > 0 ? /* @__PURE__ */ jsxs("div", { className: styles$6.container, children: [
    /* @__PURE__ */ jsx("div", { className: styles$6.title_box, children: /* @__PURE__ */ jsx("p", { className: styles$6.description, children: "Выберите производителя и модель ноутбука" }) }),
    /* @__PURE__ */ jsx(VendorMenuLaptops, {}),
    /* @__PURE__ */ jsx(Filter, {}),
    /* @__PURE__ */ jsx(FilterLaptopsComponent, { data: filterCategory })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
}
const container$2 = "_container_47fjp_1";
const img_desc_box = "_img_desc_box_47fjp_25";
const price_container = "_price_container_47fjp_43";
const price_wrap_box$1 = "_price_wrap_box_47fjp_51";
const specifications = "_specifications_47fjp_67";
const header = "_header_47fjp_81";
const header_mobile = "_header_mobile_47fjp_97";
const boxes_title$1 = "_boxes_title_47fjp_105";
const text_box$1 = "_text_box_47fjp_121";
const blue_text = "_blue_text_47fjp_141";
const black_text = "_black_text_47fjp_157";
const styles$3 = {
  container: container$2,
  img_desc_box,
  price_container,
  price_wrap_box: price_wrap_box$1,
  specifications,
  header,
  header_mobile,
  boxes_title: boxes_title$1,
  text_box: text_box$1,
  blue_text,
  black_text
};
const image = "_image_132dn_1";
const styles$2 = {
  image
};
const ImageRapairBox = () => {
  const { model: model2, vendor: vendor2 } = useParams();
  const img2 = `https://storage.yandexcloud.net/printridge/laptops/${vendor2}/${model2}.png`;
  return img2 && /* @__PURE__ */ jsx(
    "img",
    {
      className: styles$2.image,
      src: img2,
      alt: model2
    }
  );
};
const container$1 = "_container_j3do2_1";
const text_container = "_text_container_j3do2_25";
const styles$1 = {
  container: container$1,
  text_container
};
const DescriptionRepairBox = () => {
  const { model: model2 } = useParams();
  const data = repairLaptops.find((i) => i.model.replace(/\s/g, "") === model2);
  return /* @__PURE__ */ jsx("div", { className: styles$1.container, children: /* @__PURE__ */ jsxs("p", { className: styles$1.text_container, children: [
    "Выше указаны цены за работы по ремонту некоторых узлов вашего ноутбука или установку программ! Стоимость запчастей, которые, возможно, потребуется заменить, считается отдельно и согласовывается с клиентом. Конкретную стоимость ремонта именно в вашем случае, мы сможем озвучить после проведения диагностики.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Для ускорения процесса диагностики неисправностей, постарайтесь, пожалуйста, как можно подробнее рассказать нам о всех неисправностях вашего ноутбука. Это значительно ускорит процесс ремонта и, в большинстве случаев, сделает диагностику ",
    /* @__PURE__ */ jsx("strong", { children: "БЕСПЛАТНОЙ!" }),
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "Большую часть неисправностей вашего ноутбука возможно решить ",
    /* @__PURE__ */ jsx("strong", { children: "на выезде" }),
    ", не забирая устройство. Потому, ",
    /* @__PURE__ */ jsxs("strong", { children: [
      "ремонт ноутбука ",
      `${data.vendor.toUpperCase()} ${data.model}`
    ] }),
    " может быть осуществлён прямо у вас.",
    /* @__PURE__ */ jsx("br", {}),
    /* @__PURE__ */ jsx("br", {}),
    "О всех возможных нюансах и последствиях мы вас непременно предупредим."
  ] }) });
};
const container = "_container_961w1_1";
const price_wrap_box = "_price_wrap_box_961w1_23";
const boxes_title = "_boxes_title_961w1_41";
const text_box = "_text_box_961w1_59";
const text = "_text_961w1_59";
const price = "_price_961w1_23";
const styles = {
  container,
  price_wrap_box,
  boxes_title,
  text_box,
  text,
  price
};
const RepairPriceComponent = ({ data }) => {
  const location = useLocation();
  const canonicalUrl = `https://printridge.ru${location.pathname}`;
  const { vendor: vendor2, model: model2 } = useParams();
  useEffect(() => {
    document.querySelector('link[rel="canonical"]').setAttribute("href", canonicalUrl);
    document.title = `Ремонт ноутбуков ${vendor2.toUpperCase()} ${model2.toUpperCase()} в Санкт-Петербурге`;
    document.querySelector('meta[name="title"]').setAttribute("content", `Ремонт ноутбуков ${vendor2.toUpperCase()} ${model2.toUpperCase()} в Санкт-Петербурге`);
    document.querySelector('meta[name="description"]').setAttribute("content", `
        Стоимость ремонта ноутбука ${vendor2.toUpperCase()} ${model2}
        Диагностика ${data.price.diagnostics}
        Чистка ноутбука ${data.price.TO}
        Замена термопасты ${data.price.thermalPaste}
        Установка программ ${data.price.installPO}
        Удаление вирусов ${data.price.antivirus}
        Замена матрицы ${data.price.matrixReplacement}
        `);
    document.querySelector('meta[name="keywords"]').setAttribute("content", `ремонт ноутбука ${vendor2.toUpperCase()} ${model2.toUpperCase()}, чистка ноутбука ${vendor2.toUpperCase()} ${model2.toUpperCase()}, удаление вирусов, установка windows, в Санкт-Петербурге, выезд, на выезде`);
  }, [vendor2, model2]);
  return /* @__PURE__ */ jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsx("p", { className: styles.boxes_title, children: "Цены" }),
    /* @__PURE__ */ jsxs("div", { className: styles.price_wrap_box, children: [
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Диагностика" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.diagnostics })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Чистка ноутбука" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.TO })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Замена термопасты" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.thermalPaste })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Установка ОС (Windows)" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.installOS })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Установка программ" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.installPO })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Удаление вирусов" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.antivirus })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Замена матрицы" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.matrixReplacement })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Замена батареи" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.batteryReplacement })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Замена оперативки" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.ramReplacement })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles.text_box, children: [
        /* @__PURE__ */ jsx("p", { className: styles.text, children: "Ремонт электроники" }),
        /* @__PURE__ */ jsx("p", { className: styles.price, children: data.price.electronics })
      ] })
    ] })
  ] });
};
function RepairLaptopsItemComponent() {
  const { model: model2 } = useParams();
  const data = repairLaptops.find((i) => i.model.replace(/\s/g, "") === model2);
  return data ? /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: styles$3.container, children: [
      /* @__PURE__ */ jsxs("h2", { className: styles$3.header, children: [
        "Ремонт ноутбука ",
        `${data.vendor.toUpperCase()} ${data.series !== "" ? data.series : ""} ${data.model}`
      ] }),
      /* @__PURE__ */ jsxs("div", { className: styles$3.img_desc_box, children: [
        /* @__PURE__ */ jsx("div", { className: styles$3.price_container, children: /* @__PURE__ */ jsxs("div", { className: styles$3.specifications, children: [
          /* @__PURE__ */ jsxs("div", { className: styles$3.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$3.blue_text, children: "Диагональ экрана:" }),
            /* @__PURE__ */ jsx("p", { className: styles$3.black_text, children: `${data.display} "` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$3.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$3.blue_text, children: "Процессор:" }),
            /* @__PURE__ */ jsx("p", { className: styles$3.black_text, children: `${data.processorVendor} ${data.processorName}` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$3.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$3.blue_text, children: "Видео:" }),
            /* @__PURE__ */ jsx("p", { className: styles$3.black_text, children: data.video })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$3.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$3.blue_text, children: "Оперативная память:" }),
            /* @__PURE__ */ jsx("p", { className: styles$3.black_text, children: `${data.ram} Гб` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: styles$3.text_box, children: [
            /* @__PURE__ */ jsx("p", { className: styles$3.blue_text, children: "Тип оперативной памяти:" }),
            /* @__PURE__ */ jsx("p", { className: styles$3.black_text, children: data.ramType })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx(ImageRapairBox, {}),
        /* @__PURE__ */ jsxs("h2", { className: styles$3.header_mobile, children: [
          "Ремонт ноутбука ",
          `${data.vendor.toUpperCase()} ${data.series !== "" ? data.series : null} ${data.model}`
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(RepairPriceComponent, { data }),
    /* @__PURE__ */ jsx(DescriptionRepairBox, {}),
    data.examples.length !== 0 && /* @__PURE__ */ jsx(Tabs, { items: data.examples })
  ] }) : /* @__PURE__ */ jsx(Navigate, { to: "/404", replace: true });
}
const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const { mobileMenuButton } = useSelector((state) => state.buttons);
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Routes, { location: background || location, children: /* @__PURE__ */ jsxs(Route, { path: "/", element: /* @__PURE__ */ jsx(Layout, {}), children: [
      /* @__PURE__ */ jsx(Route, { index: true, element: /* @__PURE__ */ jsx(Main, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/map", element: /* @__PURE__ */ jsx(SitemapGenerator, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/repair/:vendor", element: /* @__PURE__ */ jsx(RepairComponent, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/repair/:vendor/:model",
          element: /* @__PURE__ */ jsx(RepairItemComponent, {})
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/refill/:vendor", element: /* @__PURE__ */ jsx(RefillComponent, {}) }),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/refill/:vendor/:model",
          element: /* @__PURE__ */ jsx(RefillItemComponent, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/remont-noutbukov/:vendor",
          element: /* @__PURE__ */ jsx(RepairLaptopsComponent, {})
        }
      ),
      /* @__PURE__ */ jsx(
        Route,
        {
          path: "/remont-noutbukov/:vendor/:model",
          element: /* @__PURE__ */ jsx(RepairLaptopsItemComponent, {})
        }
      ),
      /* @__PURE__ */ jsx(Route, { path: "/contacts", element: /* @__PURE__ */ jsx(ContactsComponent, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "*", element: /* @__PURE__ */ jsx(NotFound404, {}) })
    ] }) }),
    background && /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(
      Route,
      {
        path: `${location.pathname}`,
        element: /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(FeedbackForm, {}) })
      }
    ) }),
    mobileMenuButton && /* @__PURE__ */ jsx(Routes, { children: /* @__PURE__ */ jsx(
      Route,
      {
        path: `${location.pathname}`,
        element: /* @__PURE__ */ jsx(Modal, { children: /* @__PURE__ */ jsx(MainMenu, { position: "footer" }) })
      }
    ) })
  ] });
};
const initialState$3 = {
  repair: []
};
const refillReducer = (state = initialState$3, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
const initialState$2 = {
  repair: []
};
const repairReducer = (state = initialState$2, action) => {
  switch (action.type) {
    default: {
      return state;
    }
  }
};
const initialState$1 = {
  filter: [],
  value: ""
};
const filterReducer = (state = initialState$1, action) => {
  switch (action.type) {
    case SEARCH_DATA_REQUEST: {
      return {
        ...state,
        value: action
      };
    }
    default: {
      return state;
    }
  }
};
const initialState = {
  mobileMenuButton: false,
  photoButton: "photo",
  videoButton: ""
};
const buttonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_MOBILE_BUTTON: {
      return {
        mobileMenuButton: action.mobileMenuButton
      };
    }
    case PHOTO_BUTTON: {
      return {
        ...state,
        photoButton: action.photoButton
      };
    }
    case VIDEO_BUTTON: {
      return {
        ...state,
        videoButton: action.videoButton
      };
    }
    default: {
      return state;
    }
  }
};
const rootReducer = combineReducers({
  refill: refillReducer,
  repair: repairReducer,
  filter: filterReducer,
  buttons: buttonsReducer
});
const rootStore = configureStore({
  reducer: rootReducer,
  devTools: true
});
const content = /* @__PURE__ */ jsx(StrictMode, { children: /* @__PURE__ */ jsx(Provider, { store: rootStore, children: /* @__PURE__ */ jsx(App, {}) }) });
if (typeof window !== "undefined") {
  hydrateRoot(
    document.getElementById("root"),
    /* @__PURE__ */ jsx(BrowserRouter, { children: content })
  );
}
const render = (url) => {
  return renderToString(/* @__PURE__ */ jsx(StaticRouter, { location: url, children: content }));
};
export {
  render
};
