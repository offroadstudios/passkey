/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "(pages-dir-node)/./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ App)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"(pages-dir-node)/./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! buffer */ \"buffer\");\n/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @solana/wallet-adapter-react */ \"@solana/wallet-adapter-react\");\n/* harmony import */ var _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @solana/wallet-adapter-react-ui */ \"@solana/wallet-adapter-react-ui\");\n/* harmony import */ var _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @solana/wallet-adapter-wallets */ \"@solana/wallet-adapter-wallets\");\n/* harmony import */ var _lazorkit_wallet__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lazorkit/wallet */ \"@lazorkit/wallet\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__, _lazorkit_wallet__WEBPACK_IMPORTED_MODULE_6__]);\n([_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__, _solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_4__, _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__, _lazorkit_wallet__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n// pages/_app.tsx\n\n\n\n\n\n\n\nwindow.Buffer = buffer__WEBPACK_IMPORTED_MODULE_2__.Buffer // polyfill Buffer if needed\n;\nfunction App({ Component, pageProps }) {\n    // 1) Solana connection (Devnet)\n    const endpoint = 'https://api.devnet.solana.com';\n    // 2) Only Phantom for now\n    const solanaWallets = [\n        new _solana_wallet_adapter_wallets__WEBPACK_IMPORTED_MODULE_5__.PhantomWalletAdapter()\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__.ConnectionProvider, {\n        endpoint: endpoint,\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react__WEBPACK_IMPORTED_MODULE_3__.WalletProvider, {\n            wallets: solanaWallets,\n            autoConnect: false,\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_solana_wallet_adapter_react_ui__WEBPACK_IMPORTED_MODULE_4__.WalletModalProvider, {\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_lazorkit_wallet__WEBPACK_IMPORTED_MODULE_6__.WalletProvider, {\n                    rpcUrl: endpoint,\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                        ...pageProps\n                    }, void 0, false, {\n                        fileName: \"/Volumes/Data/lapz/passkey/pages/_app.tsx\",\n                        lineNumber: 34,\n                        columnNumber: 13\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Volumes/Data/lapz/passkey/pages/_app.tsx\",\n                    lineNumber: 30,\n                    columnNumber: 11\n                }, this)\n            }, void 0, false, {\n                fileName: \"/Volumes/Data/lapz/passkey/pages/_app.tsx\",\n                lineNumber: 28,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"/Volumes/Data/lapz/passkey/pages/_app.tsx\",\n            lineNumber: 27,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Volumes/Data/lapz/passkey/pages/_app.tsx\",\n        lineNumber: 26,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1ub2RlKS8uL3BhZ2VzL19hcHAudHN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUJBQWlCOztBQUNhO0FBR0M7QUFLTTtBQUNnQztBQUNBO0FBRUc7QUFFdkVPLE9BQWVQLE1BQU0sR0FBR0EsMENBQU1BLENBQUUsNEJBQTRCOztBQUU5QyxTQUFTUSxJQUFJLEVBQUVDLFNBQVMsRUFBRUMsU0FBUyxFQUFZO0lBQzVELGdDQUFnQztJQUNoQyxNQUFNQyxXQUFXO0lBRWpCLDBCQUEwQjtJQUMxQixNQUFNQyxnQkFBZ0I7UUFBQyxJQUFJUCxnRkFBb0JBO0tBQUc7SUFFbEQscUJBQ0UsOERBQUNKLDRFQUFrQkE7UUFBQ1UsVUFBVUE7a0JBQzVCLDRFQUFDUix3RUFBaUJBO1lBQUNVLFNBQVNEO1lBQWVFLGFBQWE7c0JBQ3RELDRFQUFDVixnRkFBbUJBOzBCQUVsQiw0RUFBQ0UsNERBQW1CQTtvQkFDbEJTLFFBQVFKOzhCQUdSLDRFQUFDRjt3QkFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1wQyIsInNvdXJjZXMiOlsiL1ZvbHVtZXMvRGF0YS9sYXB6L3Bhc3NrZXkvcGFnZXMvX2FwcC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvX2FwcC50c3hcclxuaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnXHJcbmltcG9ydCB0eXBlIHsgQXBwUHJvcHMgfSBmcm9tICduZXh0L2FwcCdcclxuXHJcbmltcG9ydCB7IEJ1ZmZlciB9IGZyb20gJ2J1ZmZlcidcclxuaW1wb3J0IHsgUHVibGljS2V5IH0gZnJvbSAnQHNvbGFuYS93ZWIzLmpzJ1xyXG5pbXBvcnQge1xyXG4gIENvbm5lY3Rpb25Qcm92aWRlcixcclxuICBXYWxsZXRQcm92aWRlciBhcyBTb2xXYWxsZXRQcm92aWRlcixcclxufSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXJlYWN0J1xyXG5pbXBvcnQgeyBXYWxsZXRNb2RhbFByb3ZpZGVyIH0gZnJvbSAnQHNvbGFuYS93YWxsZXQtYWRhcHRlci1yZWFjdC11aSdcclxuaW1wb3J0IHsgUGhhbnRvbVdhbGxldEFkYXB0ZXIgfSBmcm9tICdAc29sYW5hL3dhbGxldC1hZGFwdGVyLXdhbGxldHMnXHJcblxyXG5pbXBvcnQgeyBXYWxsZXRQcm92aWRlciBhcyBMYXpvcldhbGxldFByb3ZpZGVyIH0gZnJvbSAnQGxhem9ya2l0L3dhbGxldCdcclxuXHJcbih3aW5kb3cgYXMgYW55KS5CdWZmZXIgPSBCdWZmZXIgIC8vIHBvbHlmaWxsIEJ1ZmZlciBpZiBuZWVkZWRcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH06IEFwcFByb3BzKSB7XHJcbiAgLy8gMSkgU29sYW5hIGNvbm5lY3Rpb24gKERldm5ldClcclxuICBjb25zdCBlbmRwb2ludCA9ICdodHRwczovL2FwaS5kZXZuZXQuc29sYW5hLmNvbSdcclxuXHJcbiAgLy8gMikgT25seSBQaGFudG9tIGZvciBub3dcclxuICBjb25zdCBzb2xhbmFXYWxsZXRzID0gW25ldyBQaGFudG9tV2FsbGV0QWRhcHRlcigpXVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPENvbm5lY3Rpb25Qcm92aWRlciBlbmRwb2ludD17ZW5kcG9pbnR9PlxyXG4gICAgICA8U29sV2FsbGV0UHJvdmlkZXIgd2FsbGV0cz17c29sYW5hV2FsbGV0c30gYXV0b0Nvbm5lY3Q9e2ZhbHNlfT5cclxuICAgICAgICA8V2FsbGV0TW9kYWxQcm92aWRlcj5cclxuICAgICAgICAgIHsvKiAzKSBMYXpvci5raXQgcHJvdmlkZXIgd3JhcHMgeW91ciBTb2xhbmEgcHJvdmlkZXIgKi99XHJcbiAgICAgICAgICA8TGF6b3JXYWxsZXRQcm92aWRlclxyXG4gICAgICAgICAgICBycGNVcmw9e2VuZHBvaW50fVxyXG4gICAgICAgICAgICAvLyB3ZSdsbCBwYXNzIHRoZSBTb2xhbmEgc2lnbmVyIGluIHRoZSBjb21wb25lbnQgbGF0ZXJcclxuICAgICAgICAgID5cclxuICAgICAgICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgICAgICAgPC9MYXpvcldhbGxldFByb3ZpZGVyPlxyXG4gICAgICAgIDwvV2FsbGV0TW9kYWxQcm92aWRlcj5cclxuICAgICAgPC9Tb2xXYWxsZXRQcm92aWRlcj5cclxuICAgIDwvQ29ubmVjdGlvblByb3ZpZGVyPlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsiQnVmZmVyIiwiQ29ubmVjdGlvblByb3ZpZGVyIiwiV2FsbGV0UHJvdmlkZXIiLCJTb2xXYWxsZXRQcm92aWRlciIsIldhbGxldE1vZGFsUHJvdmlkZXIiLCJQaGFudG9tV2FsbGV0QWRhcHRlciIsIkxhem9yV2FsbGV0UHJvdmlkZXIiLCJ3aW5kb3ciLCJBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiLCJlbmRwb2ludCIsInNvbGFuYVdhbGxldHMiLCJ3YWxsZXRzIiwiYXV0b0Nvbm5lY3QiLCJycGNVcmwiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(pages-dir-node)/./pages/_app.tsx\n");

/***/ }),

/***/ "(pages-dir-node)/./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@lazorkit/wallet":
/*!***********************************!*\
  !*** external "@lazorkit/wallet" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@lazorkit/wallet");;

/***/ }),

/***/ "@solana/wallet-adapter-react":
/*!***********************************************!*\
  !*** external "@solana/wallet-adapter-react" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react");;

/***/ }),

/***/ "@solana/wallet-adapter-react-ui":
/*!**************************************************!*\
  !*** external "@solana/wallet-adapter-react-ui" ***!
  \**************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-react-ui");;

/***/ }),

/***/ "@solana/wallet-adapter-wallets":
/*!*************************************************!*\
  !*** external "@solana/wallet-adapter-wallets" ***!
  \*************************************************/
/***/ ((module) => {

"use strict";
module.exports = import("@solana/wallet-adapter-wallets");;

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(pages-dir-node)/./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();