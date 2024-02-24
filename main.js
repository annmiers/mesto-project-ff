(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-6",headers:{authorization:"4f2e4442-7927-4763-b7d8-e854e0ed3eab","Content-Type":"application/json"}},t=function(t){return fetch("".concat(e.baseUrl,"/cards/").concat(t._id),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},n=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t._id),{method:"PUT",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},r=function(t){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(t._id),{method:"DELETE",headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))},o=document.querySelector("#card-template").content,c=document.querySelector(".places__list");function u(e,t,n,r,c){var u=o.querySelector(".card").cloneNode(!0),a=u.querySelector(".card__delete-button"),i=u.querySelector(".card__image"),s=u.querySelector(".card__title"),l=u.querySelector(".card__image"),d=u.querySelector(".card__like-number"),p=u.querySelector(".card__like-button");return s.textContent=e.name,l.alt=e.name,l.src=e.link,d.textContent=e.likes.length,e.owner._id!==c?a.classList.add("card__delete-button__hidden"):a.classList.remove("card__delete-button__hidden"),e.likes.forEach((function(e){e._id===c?p.classList.add("card__like-button_is-active"):p.classList.remove("card__like-button_is-active")})),a.addEventListener("click",(function(){return t(u,e)})),i.addEventListener("click",(function(){return n(e.name,e.link)})),p.addEventListener("click",(function(){return r(p,e,d)})),u}function a(e,n){e.remove(),t(n).catch((function(e){console.log("Ошибка удаления карточки",e)}))}function i(e,t,o){e.classList.contains("card__like-button_is-active")?r(t).then((function(t){e.classList.remove("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){console.log("Ошибка удаления лайка карточки",e)})):n(t).then((function(t){e.classList.add("card__like-button_is-active"),o.textContent=t.likes.length})).catch((function(e){console.log("Ошибка лайка карточки",e)}))}function s(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",d)}function l(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",d)}function d(e){"Escape"===e.key&&l(document.querySelector(".popup_is-opened"))}function p(e){(e.target===e.currentTarget||e.target.classList.contains("popup__close"))&&l(document.querySelector(".popup_is-opened"))}var f,_=function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),o.classList.remove(r),o.textContent=""},m=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.classList.remove(n),t.disabled=!1):(t.classList.add(n),t.disabled=!0)},y=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){_(e,n,t.inputErrorClass,t.errorClass)})),m(n,r,t.inactiveButtonClass)};function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var v={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},S=document.querySelectorAll(".popup"),b=document.querySelector(".popup_type_edit"),q=document.querySelector(".popup_type_new-card"),k=document.querySelector(".popup_type_new-avatar"),g=q.querySelector(".popup__button"),L=b.querySelector(".popup__button"),E=k.querySelector(".popup__button"),C=document.querySelector(".profile__edit-button"),j=document.querySelector(".profile__add-button"),x=document.querySelector(".popup_type_image"),A=x.querySelector(".popup__image"),P=x.querySelector(".popup__caption"),U=b.querySelector(".popup__form"),w=document.querySelector(".popup__input_type_name"),T=document.querySelector(".popup__input_type_description"),O=q.querySelector(".popup__form"),B=document.querySelector(".popup__input_type_card-name"),D=document.querySelector(".popup__input_type_url"),I=k.querySelector(".popup__form"),M=document.querySelector(".popup__input_type_url_avatar"),N=document.querySelector(".profile__title"),J=document.querySelector(".profile__description"),H=document.querySelector(".profile__image");function V(e,t){P.textContent=e,A.alt=e,A.src=t,s(x)}function z(e,t){t.textContent=e?"Сохранение...":"Сохранить"}Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(e.baseUrl,"/cards"),{headers:e.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){var t,n,r=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,u,a=[],i=!0,s=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(a.push(r.value),a.length!==t);i=!0);}catch(e){s=!0,o=e}finally{try{if(!i&&null!=n.return&&(u=n.return(),Object(u)!==u))return}finally{if(s)throw o}}return a}}(t,n)||function(e,t){if(e){if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=r[0],s=r[1];N.textContent=o.name,J.textContent=o.about,H.style.backgroundImage="url(".concat(o.avatar,")"),f=o._id,s.forEach((function(e){var t;t=u(e,a,V,i,f),c.append(t)}))})).catch((function(e){console.error("Ошибка загрузки данных",e)})),S.forEach((function(e){e.addEventListener("click",p)})),j.addEventListener("click",(function(){s(q),O.reset(),y(O,v)})),C.addEventListener("click",(function(){w.value=N.textContent,T.value=J.textContent,y(U,v),s(b)})),H.addEventListener("click",(function(){s(k),I.reset(),y(I,v)})),U.addEventListener("submit",(function(t){t.preventDefault(),function(t,n,r,o,c){z(!0,c),function(t,n,r,o){return fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:t,about:n})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(){r.textContent=t,o.textContent=n}))}(t,n,r,o).catch((function(e){console.log(e)})).finally((function(){z(!1,c),l(b)}))}(w.value,T.value,N,J,L)})),O.addEventListener("submit",(function(t){var n,r,o,s,d;t.preventDefault(),n=B.value,r=D.value,z(!0,o=g),(s=n,d=r,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:s,link:d})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){var t=u(e,a,V,i,f);c.prepend(t)})).catch((function(e){console.log(e)})).finally((function(){z(!1,o),l(q),O.reset()}))})),I.addEventListener("submit",(function(t){!function(t,n,r){var o,c;z(!0,r),(o=t,c=n,fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:o})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(){c.style.backgroundImage="url(".concat(o,")")}))).catch((function(e){console.log(e)})).finally((function(){z(!1,r),l(k)}))}(M.value,H,E)})),function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){var n,r,o,c,u,a,i,s;t.addEventListener("submit",(function(e){e.preventDefault()})),n=t,r=e.inputSelector,o=e.submitButtonSelector,c=e.inactiveButtonClass,u=e.inputErrorClass,a=e.errorClass,i=Array.from(n.querySelectorAll(r)),s=n.querySelector(o),m(i,s,c),i.forEach((function(e){e.addEventListener("input",(function(){!function(e,t,n,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?_(e,t,n,r):function(e,t,n,r,o){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r),c.textContent=n,c.classList.add(o)}(e,t,t.validationMessage,n,r)}(n,e,u,a),m(i,s,c)}))}))}))}(v)})();