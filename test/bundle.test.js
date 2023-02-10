/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Greeter)
/* harmony export */ });
class Greeter {
    generated_greetings = '';

    constructor(config) {
        this.config = config;
    }

    pick_adjective = (word, gender = 'm') => {
        const adj = this.config.adjectives[Math.floor(Math.random() * this.config.adjectives.length)];

        if (typeof adj === 'string') {
            return this.gender_swap(adj, gender).replace('%s', word);
        } else {
            return adj[gender].replace('%s', word);
        }
    }

     gender_swap = (adj, gender) => {
        if (gender == 'f') {
            return adj.replaceAll('_', '');
        } else {
            return adj.replace(/_[^_]+_/, '');
        }
    };

    refresh_greetings = function () {
        this.generated_greetings = this.config.generate_greetings(this.pick_adjective);
    };

    copy_to_clipboard = () => {
        navigator.clipboard.writeText(this.generated_greetings);
    }

    get_generated_greetings = () => {
        return this.generated_greetings;
    }
}

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_greeter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


// console.log(Greeter);//FIXME

// Setup
const greeter = new _src_greeter_js__WEBPACK_IMPORTED_MODULE_0__["default"]({
    "generate_greetings": (pick_adjective) =>
    {
        return `On test les ${pick_adjective('copeaux')}`
    },

    "adjectives" : [
        '%s magiques',
    ]
});

test('Should gender correctly', ()=>{
    expect(greeter.gender_swap('magique')).toBe('magique');
    expect(greeter.gender_swap('joli_e_s', 'f')).toBe('jolies');
    expect(greeter.gender_swap('joli_e_s', 'm')).toBe('jolis');
});

test('Should generate the greeting properly', ()=>{
    greeter.refresh_greetings();
    expect(greeter.get_generated_greetings()).toBe('On test les copeaux magiques');
});
})();

/******/ })()
;