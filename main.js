(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{OP:()=>_,O7:()=>A});var t={baseUrl:"https://nomoreparties.co/v1/plus-cohort-20",headers:{authorization:"eb051ebf-2644-4cfe-b56d-7fb7bc91594f","Content-Type":"application/json"}};function n(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function r(e){console.log(e)}var o=function(e){return fetch("".concat(t.baseUrl,"/cards/").concat(e),{headers:t.headers,method:"DELETE"}).then(n)},c=function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{headers:t.headers,method:"PUT"}).then(n)},u=function(e){return fetch("".concat(t.baseUrl,"/cards/likes/").concat(e),{headers:t.headers,method:"DELETE"}).then(n)},a=document.querySelector("#popup-image-title"),i=document.querySelector(".popup__image"),l=document.querySelector("#popup-image");function s(e){e.classList.add("popup_opened"),document.addEventListener("keydown",p)}function d(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&d(document.querySelector(".popup_opened"))}function f(e,t,n,d){var p=_.querySelector(".elements__element").cloneNode(!0),f=p.querySelector("#like"),m=p.querySelector(".elements__image"),v=p.querySelector(".elements__delete-button");return m.src=e,m.alt=t,p.querySelector(".elements__name").textContent=t,p.querySelector("#likes-count").textContent=d.likes.length,function(e,t,n){e.addEventListener("click",(function(){e.classList.contains("elements__button_active")?u(t).then((function(t){n.querySelector("#likes-count").textContent=t.likes.length,e.classList.toggle("elements__button_active")})).catch(r):c(t).then((function(t){n.querySelector("#likes-count").textContent=t.likes.length,e.classList.toggle("elements__button_active")})).catch(r)}))}(f,d._id,p),p.querySelector(".elements__image").addEventListener("click",(function(){return function(e,t){s(l),i.src=e,i.alt=t,a.textContent=t}(e,t)})),d.owner._id!==n&&v.remove(),v&&function(e,t,n){t.addEventListener("click",(function(){o(e).then((function(){n.closest(".elements__element").remove()})).catch(r)}))}(d._id,v,p),p}function m(e,t,n){e.forEach((function(e){return e.setCustomValidity("")})),function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!0,t.classList.add(n.inactiveButtonClass)):(t.disabled=!1,t.classList.remove(n.inactiveButtonClass))}function v(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)}function y(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var h,_=document.querySelector("#card-template").content,b=document.querySelector("#popup-edit"),S=document.querySelector("#popup-avatar"),q=document.querySelector(".profile__avatar-hover"),E=document.querySelector("#popup-input-name"),C=document.querySelector("#popup-input-about"),L=document.querySelector(".profile__name"),g=document.querySelector(".profile__research"),k=document.querySelector("#popup-add"),A=document.querySelector(".elements"),x=document.querySelector(".profile__edit"),O=document.querySelectorAll(".popup__close"),U=document.querySelectorAll(".popup"),j=document.querySelector("#popup-input-link"),P=document.querySelector("#popup-input-title"),w=document.querySelector(".profile__add"),T=document.querySelector("#button-add-create"),B=document.querySelector("#button-edit-save"),I=document.querySelector("#button-add-avatar"),D=document.querySelector("#popup-avatar-link"),M=document.querySelector(".profile__avatar"),N={popupErrorInput:".popup__input_error-",formSelector:".popup__container",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_inactive",inputErrorClass:"popup__input_type_error",errorClass:"popup__input_error_active"};function J(e,t){e.textContent=t}x.addEventListener("click",(function(){v(B,N),E.value=L.textContent,C.value=g.textContent,s(b)})),w.addEventListener("click",(function(){v(T,N),s(k),j.value="",P.value=""})),q.addEventListener("click",(function(){v(I,N),s(S),D.value=""})),O.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return d(t)}))})),U.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(e){e.target==t&&d(t)}))})),Promise.all([fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers}).then(n),fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers}).then(n)]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return y(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?y(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],c=r[1];L.textContent=o.name,g.textContent=o.about,M.src=o.avatar,function(e,t){e.forEach((function(e){A.append(f(e.link,e.name,t,e))}))}(c,h=o._id)})).catch(r),b.addEventListener("submit",(function(e){e.preventDefault(),J(e.submitter,"Сохранение..."),function(e,r){return fetch("".concat(t.baseUrl,"/users/me"),{headers:t.headers,method:"PATCH",body:JSON.stringify({name:e,about:r})}).then(n)}(E.value,C.value).then((function(){L.textContent=E.value,g.textContent=C.value,d(b)})).catch(r).finally((function(){J(e.submitter,"Сохранить")}))})),k.addEventListener("submit",(function(e){e.preventDefault(),J(e.submitter,"Сохранение..."),function(e,r){return fetch("".concat(t.baseUrl,"/cards"),{headers:t.headers,method:"POST",body:JSON.stringify({name:r,link:e})}).then(n)}(j.value,P.value).then((function(e){console.log(e),A.prepend(f(e.link,e.name,h,e)),d(k),j.value="",P.value=""})).catch(r).finally((function(){J(e.submitter,"Создать")}))})),S.addEventListener("submit",(function(e){e.preventDefault(),J(e.submitter,"Сохранение..."),function(e){return fetch("".concat(t.baseUrl,"/users/me/avatar"),{headers:t.headers,method:"PATCH",body:JSON.stringify({avatar:e})}).then(n)}(D.value).then((function(){M.src=D.value,d(S)})).catch(r).finally((function(){J(e.submitter,"Сохранить")}))})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);m(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){e.querySelectorAll("".concat(n.popupErrorInput).concat(t.id)).forEach((function(e){t.classList.remove(n.inputErrorClass),e.classList.remove(n.errorClass),e.textContent=""}))}(e,t,n):function(e,t,n,r){e.querySelectorAll("".concat(r.popupErrorInput).concat(t.id)).forEach((function(e){t.classList.add(r.inputErrorClass),e.classList.add(r.errorClass),e.textContent=n}))}(e,t,t.validationMessage,n)}(e,o,t),m(n,r,t)}))}))}(t,e)}))}(N)})();