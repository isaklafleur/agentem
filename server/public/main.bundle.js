webpackJsonp([1,5],{

/***/ 179:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthComponent = (function () {
    function AuthComponent(dialogRef, dialog, userservice, router) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.userservice = userservice;
        this.router = router;
        this.user = {
            username: '',
            password: ''
        };
        this.loading = false;
        this.signupDialog = false;
        this.loginDialog = true;
    }
    AuthComponent.prototype.ngOnInit = function () {
    };
    AuthComponent.prototype.signup = function () {
        var _this = this;
        this.userservice.signup(this.user)
            .subscribe(function (result) {
            if (result === true) {
                // login successful
                console.log('result ok: ', result);
                _this.dialogRef.close('Option 1');
                _this.router.navigate(['/dashboard']);
            }
        }, function (error) {
            _this.error = JSON.parse(error._body).message;
        });
    };
    AuthComponent.prototype.login = function () {
        var _this = this;
        this.userservice.login(this.user)
            .subscribe(function (result) {
            if (result === true) {
                // login successful
                _this.dialogRef.close('Option 1');
                _this.router.navigate(['/dashboard']);
            }
        }, function (error) {
            _this.error = JSON.parse(error._body).message;
        });
    };
    AuthComponent.prototype.DisplayLoginDialog = function () {
        this.signupDialog = false;
        this.loginDialog = true;
    };
    AuthComponent.prototype.DisplaySignupDialog = function () {
        this.signupDialog = true;
        this.loginDialog = false;
    };
    AuthComponent.prototype.submitForm = function (myForm) {
        // console.log(this.email);
    };
    return AuthComponent;
}());
AuthComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-auth',
        template: __webpack_require__(374),
        styles: [__webpack_require__(353)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdDialogRef */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdDialog */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _d || Object])
], AuthComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=auth.component.js.map

/***/ }),

/***/ 180:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__panel_property_form_property_form_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DashboardComponent = (function () {
    function DashboardComponent(dialog, userservice) {
        this.dialog = dialog;
        this.userservice = userservice;
        this.user = {};
        this.userProfile = this.userservice.getUser(this.userservice.activeUserId);
    }
    DashboardComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__panel_property_form_property_form_component__["a" /* PropertyFormComponent */], { width: '80%', height: '100%', position: 'right' });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'submitted') {
                console.log('form ok');
            }
        });
    };
    DashboardComponent.prototype.saveProfile = function (myForm) {
        console.log('myform', myForm);
        console.log('this.userservice.activeUserId', this.userservice.activeUserId);
        console.log('user from dashboard: ', this.userProfile);
        console.log('test');
        console.log('userprofile', this.userservice.user);
    };
    DashboardComponent.prototype.ngOnInit = function () {
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: __webpack_require__(375),
        encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None,
        styles: [__webpack_require__(354)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _b || Object])
], DashboardComponent);

var _a, _b;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ 181:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_listing_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(59);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomeComponent = (function () {
    function HomeComponent(listingService, router) {
        this.listingService = listingService;
        this.router = router;
        this.typeOffer = [
            { value: 'buy', viewValue: 'Buy' },
            { value: 'rent', viewValue: 'Rent' },
            { value: 'new-dev', viewValue: 'New Development' }
        ];
        this.selectedValue = this.typeOffer[0].value;
    }
    HomeComponent.prototype.placeChanged = function (place) {
        if (place.name) {
            this.listingService.readSearchPlace(place);
            this.router.navigate(['/search']);
        }
    };
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__(377),
        styles: [__webpack_require__(356)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], HomeComponent);

var _a, _b;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ 182:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_listing_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(31);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailsComponent = (function () {
    function DetailsComponent(listingService, dialogRef) {
        this.listingService = listingService;
        this.dialogRef = dialogRef;
    }
    DetailsComponent.prototype.ngOnInit = function () {
        this.listing = this.listingService.listings[this.listingService.detailsIndex];
    };
    return DetailsComponent;
}());
DetailsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-details',
        template: __webpack_require__(378),
        styles: [__webpack_require__(358)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["b" /* MdDialogRef */]) === "function" && _b || Object])
], DetailsComponent);

var _a, _b;
//# sourceMappingURL=details.component.js.map

/***/ }),

/***/ 183:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SearchComponent = (function () {
    function SearchComponent() {
    }
    SearchComponent.prototype.ngOnInit = function () {
        // console.log('init SEARCH<<<');
    };
    return SearchComponent;
}());
SearchComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-search',
        template: __webpack_require__(383),
        styles: [__webpack_require__(363)]
    }),
    __metadata("design:paramtypes", [])
], SearchComponent);

//# sourceMappingURL=search.component.js.map

/***/ }),

/***/ 184:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngui_map__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngui_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngui_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TestComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//noinspection TypeScriptCheckImport

var templateStr = "\n<h1>sdsd</h1>\n<h1>sdsd</h1>\n<h1>sdsd</h1>\n<h1>sdsd</h1>\n<h1>sdsd</h1>\n<md-input-container class=\"example-full-width\">\n      <input mdInput placeholder=\"City\">\n    </md-input-container>\n";
var TestComponent = (function () {
    function TestComponent() {
        this.templateStr = templateStr;
        this.DEBOUNCE_TIME = 1000;
        this.lastDebounce = Date.now();
    }
    TestComponent.prototype.onMapReady = function (map) {
        var _this = this;
        this.map = map;
        this.getBounds();
        map.addListener('bounds_changed', function () {
            if (Date.now() - _this.lastDebounce > _this.DEBOUNCE_TIME) {
                _this.getBounds();
                _this.lastDebounce = Date.now();
            }
        });
    };
    TestComponent.prototype.getBounds = function () {
        this.bounds = {
            latNE: this.map.getBounds().getNorthEast().lat(),
            lngNE: this.map.getBounds().getNorthEast().lng(),
            latSW: this.map.getBounds().getSouthWest().lat(),
            lngSW: this.map.getBounds().getSouthWest().lng(),
        };
        console.log(this.bounds);
    };
    TestComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drawingManager['initialized$'].subscribe(function (dm) {
            google.maps.event.addListener(dm, 'polygoncomplete', function (polygon) {
                _this.getPolygonCoordinates(polygon);
                google.maps.event.addListener(polygon.getPath(), 'insert_at', function () {
                    _this.getPolygonCoordinates(polygon);
                });
                google.maps.event.addListener(polygon.getPath(), 'set_at', function () {
                    _this.getPolygonCoordinates(polygon);
                });
                google.maps.event.addListener(polygon.getPath(), 'remove_at', function () {
                    _this.getPolygonCoordinates(polygon);
                });
            });
            google.maps.event.addListener(dm, 'overlaycomplete', function (event) {
                _this.selectedOverlay = event.overlay;
                _this.selectedOverlay.setEditable(true);
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    dm.setDrawingMode(null);
                    google.maps.event.addListener(event.overlay, 'click', function (e) {
                        console.log(e.latLng.lat());
                        _this.selectedOverlay = event.overlay;
                        _this.selectedOverlay.setEditable(true);
                    });
                    _this.selectedOverlay = event.overlay;
                }
            });
        });
    };
    TestComponent.prototype.getPolygonCoordinates = function (polygon) {
        var coordinates = (polygon.getPath().getArray());
        var len = polygon.getPath().getLength();
        var htmlStr = "";
        for (var i = 0; i < len; i++) {
            console.log("new google.maps.LatLng(" + polygon.getPath().getAt(i).toUrlValue(5) + "), ");
            //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
            //htmlStr += "" + myPolygon.getPath().getAt(i).toUrlValue(5);
        }
    };
    TestComponent.prototype.deleteSelectedOverlay = function () {
        if (this.selectedOverlay) {
            this.selectedOverlay.setMap(null);
            delete this.selectedOverlay;
        }
    };
    return TestComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__ngui_map__["DrawingManager"]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngui_map__["DrawingManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngui_map__["DrawingManager"]) === "function" && _a || Object)
], TestComponent.prototype, "drawingManager", void 0);
TestComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-test',
        template: templateStr
    })
], TestComponent);

var _a;
//# sourceMappingURL=test.component.js.map

/***/ }),

/***/ 269:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 269;


/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(278);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(285);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(296);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 284:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent.prototype.ngOnInit = function () {
        // console.log('init APP<<<');
    };
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(373),
        styles: [__webpack_require__(352)]
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 285:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_material__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__ = __webpack_require__(279);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngui_map__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngui_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__ngui_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ngx_infinite_scroll__ = __webpack_require__(368);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__ = __webpack_require__(282);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_hammerjs__ = __webpack_require__(365);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_hammerjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_hammerjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_listing_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__services_user_service__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pipes_large_number_pipe__ = __webpack_require__(294);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_search_map_map_component__ = __webpack_require__(290);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__app_component__ = __webpack_require__(284);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_home_home_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_home_home_right_home_right_component__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_top_menu_top_menu_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_panel_property_form_property_form_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_list_list_component__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_search_search_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_search_filter_list_filter_list_component__ = __webpack_require__(289);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_test_test_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_dashboard_dashboard_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_auth_auth_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__directives_mouse_wheel_directive__ = __webpack_require__(292);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__directives_ref_directive__ = __webpack_require__(293);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__routes__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_list_details_details_component__ = __webpack_require__(182);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_list_details_carousel_carousel_component__ = __webpack_require__(287);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
//native







//modules





// Services


// Pipes

// Custom Components













//directives





var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_17__components_home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_18__components_home_home_right_home_right_component__["a" /* HomeRightComponent */],
            __WEBPACK_IMPORTED_MODULE_19__components_top_menu_top_menu_component__["a" /* TopMenuComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_panel_property_form_property_form_component__["a" /* PropertyFormComponent */],
            __WEBPACK_IMPORTED_MODULE_20__components_panel_property_form_property_form_component__["b" /* DialogCreateNewPropertyComponent */],
            __WEBPACK_IMPORTED_MODULE_21__components_list_list_component__["a" /* ListComponent */],
            __WEBPACK_IMPORTED_MODULE_22__components_search_search_component__["a" /* SearchComponent */],
            __WEBPACK_IMPORTED_MODULE_23__components_search_filter_list_filter_list_component__["a" /* FilterListComponent */],
            __WEBPACK_IMPORTED_MODULE_24__components_test_test_component__["a" /* TestComponent */],
            __WEBPACK_IMPORTED_MODULE_26__components_auth_auth_component__["a" /* AuthComponent */],
            __WEBPACK_IMPORTED_MODULE_25__components_dashboard_dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_14__pipes_large_number_pipe__["a" /* LargeNumberPipe */],
            __WEBPACK_IMPORTED_MODULE_15__components_search_map_map_component__["a" /* MapComponent */],
            __WEBPACK_IMPORTED_MODULE_28__directives_ref_directive__["a" /* GetEleDirective */],
            __WEBPACK_IMPORTED_MODULE_27__directives_mouse_wheel_directive__["a" /* MouseWheelDirective */],
            __WEBPACK_IMPORTED_MODULE_30__components_list_details_details_component__["a" /* DetailsComponent */],
            __WEBPACK_IMPORTED_MODULE_31__components_list_details_carousel_carousel_component__["a" /* CarouselComponent */]
        ],
        entryComponents: [__WEBPACK_IMPORTED_MODULE_20__components_panel_property_form_property_form_component__["b" /* DialogCreateNewPropertyComponent */], __WEBPACK_IMPORTED_MODULE_26__components_auth_auth_component__["a" /* AuthComponent */], __WEBPACK_IMPORTED_MODULE_30__components_list_details_details_component__["a" /* DetailsComponent */]],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forRoot(__WEBPACK_IMPORTED_MODULE_29__routes__["a" /* routes */]),
            __WEBPACK_IMPORTED_MODULE_6__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
            __WEBPACK_IMPORTED_MODULE_5__angular_material__["a" /* MaterialModule */],
            __WEBPACK_IMPORTED_MODULE_10__ng_bootstrap_ng_bootstrap__["a" /* NgbModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_9_ng2_file_upload__["FileUploadModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_8_ngx_infinite_scroll__["a" /* InfiniteScrollModule */],
            __WEBPACK_IMPORTED_MODULE_7__ngui_map__["NguiMapModule"].forRoot({
                apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyBoio8nEHTzRvPgWo3ObzLRxDubIQebLrM&libraries=visualization,places,drawing'
            })
        ],
        providers: [__WEBPACK_IMPORTED_MODULE_12__services_listing_service__["a" /* ListingService */], __WEBPACK_IMPORTED_MODULE_13__services_user_service__["a" /* UserService */]],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_16__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 286:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeRightComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeRightComponent = (function () {
    function HomeRightComponent() {
    }
    /*
      open() {
        const modalRef = this.modalService.open(PropertyFormComponent, { size: 'lg', windowClass: 'dark-modal' });
        modalRef.componentInstance.name = 'World';
      }*/
    HomeRightComponent.prototype.ngOnInit = function () {
    };
    return HomeRightComponent;
}());
HomeRightComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home-right',
        template: __webpack_require__(376),
        styles: [__webpack_require__(355)]
    }),
    __metadata("design:paramtypes", [])
], HomeRightComponent);

//# sourceMappingURL=home-right.component.js.map

/***/ }),

/***/ 287:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CarouselComponent = (function () {
    function CarouselComponent() {
    }
    CarouselComponent.prototype.ngAfterViewInit = function () {
        $(this.carousel.nativeElement).slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $(this.carouselNav.nativeElement).slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: true,
            centerMode: true,
            focusOnSelect: true
        });
    };
    return CarouselComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('carousel'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], CarouselComponent.prototype, "carousel", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('carouselNav'),
    __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object)
], CarouselComponent.prototype, "carouselNav", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Array)
], CarouselComponent.prototype, "photos", void 0);
CarouselComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-carousel',
        template: "<div #carousel>\n               <div *ngFor=\"let photo of photos\">\n                  <img [src]=\"photo\">\n              </div>\n            </div> \n            <div #carouselNav>\n            </div>\n            ",
        styles: [__webpack_require__(357)]
    }),
    __metadata("design:paramtypes", [])
], CarouselComponent);

var _a, _b;
//# sourceMappingURL=carousel.component.js.map

/***/ }),

/***/ 288:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_listing_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__details_details_component__ = __webpack_require__(182);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ListComponent = (function () {
    function ListComponent(listingService, dialog) {
        this.listingService = listingService;
        this.dialog = dialog;
        this.isEndResults = false;
    }
    ListComponent.prototype.ngOnInit = function () {
        if (this.populateOnInit) {
            this.listingService.getNew();
        }
    };
    ListComponent.prototype.openDetails = function (i) {
        this.listingService.detailsIndex = i;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__details_details_component__["a" /* DetailsComponent */], { width: '80%', height: '100%', position: "right" });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'submitted') {
                console.log('form ok');
            }
        });
    };
    ListComponent.prototype.onScroll = function () {
        var _this = this;
        if (this.listingService.isLoading || this.isEndResults)
            return;
        this.listingService.getMore(function (newListings) {
            if (newListings.length === 0) {
                _this.isEndResults = true;
            }
        });
    };
    ListComponent.prototype.clickHeart = function ($event, index) {
        $event.stopPropagation();
        $("#heart" + index + " i:nth-child(1)").css("color", "#ff4081").css("opacity", 1).css("animation", "none");
        $('#heart' + index).css("animation", "none");
    };
    return ListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], ListComponent.prototype, "populateOnInit", void 0);
ListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-list',
        template: __webpack_require__(379),
        styles: [__webpack_require__(359)],
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_material__["c" /* MdDialog */]) === "function" && _b || Object])
], ListComponent);

var _a, _b;
//# sourceMappingURL=list.component.js.map

/***/ }),

/***/ 289:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_listing_service__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_debounceTime__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FilterListComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { AgmCoreModule, MapsAPILoader } from '@agm/core';

var FilterListComponent = (function () {
    function FilterListComponent(ref, listingService, 
        //   private mapsAPILoader: MapsAPILoader,
        ngZone) {
        this.ref = ref;
        this.listingService = listingService;
        this.ngZone = ngZone;
        this.address = {};
        this.newSearch = {};
        this.maxPriceControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* FormControl */]();
        this.minPriceControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* FormControl */]();
        this.RADIUS = 10;
    }
    FilterListComponent.prototype.ngOnInit = function () {
        var _this = this;
        //  this.listingService.getNew();
        // create search FormControl
        this.searchControl = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["i" /* FormControl */]();
        this.newSearch = this.listingService.filter;
        this.newSearch.coordinates = {};
        this.newSearch.propertyType = {};
        this.minPriceControl.valueChanges
            .debounceTime(1000)
            .subscribe(function (newValue) {
            if (newValue) {
                _this.listingService.updateFilter();
            }
        });
        this.maxPriceControl.valueChanges
            .debounceTime(1000)
            .subscribe(function (newValue) {
            if (newValue) {
                _this.listingService.updateFilter();
            }
        });
        if (this.listingService.addressComponents.length) {
            this.adjustMargin();
        }
    };
    FilterListComponent.prototype.initialized = function (autocomplete) {
        this.autocomplete = autocomplete;
    };
    FilterListComponent.prototype.placeChanged = function (place) {
        if (place.name) {
            this.listingService.readSearchPlace(place);
            this.listingService.updateFilter();
            this.adjustMargin();
        }
        this.ref.detectChanges();
    };
    FilterListComponent.prototype.breadCrumbs = function (level) {
        if (level < this.listingService.addressComponents.length - 1) {
            switch (level) {
                case 0:
                    this.newSearch.street = "";
                    this.newSearch.neighbourhood = "";
                    this.listingService.addressComponents.splice(1);
                    this.listingService.zoom = 13;
                    break;
                case 1:
                    this.newSearch.street = "";
                    this.listingService.addressComponents.splice(2);
                    this.listingService.zoom = 14;
                    break;
            }
            this.listingService.updateFilter();
        }
    };
    FilterListComponent.prototype.setCurrentPosition = function () {
        var _this = this;
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                _this.newSearch.coordinates.latitude = position.coords.latitude;
                _this.newSearch.coordinates.longitude = position.coords.longitude;
                _this.zoom = 19;
            });
        }
    };
    FilterListComponent.prototype.submitForm = function (myForm) {
        //  this.listingService.update();
        // console.log(myForm);
        // console.log(this.newSearch)
    };
    FilterListComponent.prototype.adjustMargin = function () {
        $("#search-listings").css('margin-top', "140px");
        $("#left").css('margin-top', "84px");
    };
    return FilterListComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('addressSearchBox'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], FilterListComponent.prototype, "searchElementRef", void 0);
FilterListComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-filter-list',
        template: __webpack_require__(381),
        styles: [__webpack_require__(361)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_listing_service__["a" /* ListingService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _d || Object])
], FilterListComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=filter-list.component.js.map

/***/ }),

/***/ 290:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngui_map__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngui_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__ngui_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_listing_service__ = __webpack_require__(38);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MapComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MapComponent = (function () {
    function MapComponent(listingService) {
        this.listingService = listingService;
        this.DEBOUNCE_TIME = 1000;
        this.lastDebounce = Date.now();
        this.isPolygon = false;
        this.polygonRemovePosition = [];
        this.showMapDetails = [];
        this.hideDetails = true;
    }
    MapComponent.prototype.getElement = function (target) {
        // let mapWidth = this.mapElement.elementRef.nativeElement.clientWidth;
        // console.log('mapWidth: ', mapWidth);
        // let mapHeight =  this.mapElement.elementRef.nativeElement.clientHeight;
        // console.log('mapHeight: ', mapHeight);
        // console.log(target)
        // let markerTop = (event.target as any).offsetParent.offsetTop;
        // console.log('markerTop: ', markerTop);
        // let markerLeft = (event.target as any).offsetParent.offsetLeft;
        // console.log('markerLeft: ', markerLeft);
        //marker.nativeElement.offsetLeft;
        //console.log('marker.nativeElement.offsetLeft: ', marker.nativeElement.offsetLeft);
        // var target = event.target || event.srcElement || event.currentTarget;
        //console.log(target);
    };
    MapComponent.prototype.markerMouseOver = function (event, i) {
        var _this = this;
        this.showMapDetails[i] = !this.showMapDetails[i];
        setTimeout(function () {
            var mapWidth = _this.mapElement.elementRef.nativeElement.clientWidth;
            var mapHeight = _this.mapElement.elementRef.nativeElement.clientHeight;
            var markerTop = event.target.offsetParent.offsetTop;
            var markerLeft = event.target.offsetParent.offsetLeft;
            var offset = $('#markerDetails' + i).offset();
            var markerWidth = $('#markerDetails' + i).width();
            var markerHeight = $('#markerDetails' + i).height();
            //   $('#markerDetails' + i).offset({ left: offset.left - markerWidth / 2 + 20 });
            if (mapHeight - markerTop < 166) {
                $("#markerDetails" + i).offset({ top: offset.top - 215 });
            }
            _this.hideDetails = false;
        });
    };
    MapComponent.prototype.moveImg = function () {
    };
    MapComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.drawingManager['initialized$'].subscribe(function (dm) {
            google.maps.event.addListener(dm, 'polygoncomplete', function (polygon) {
                _this.isPolygon = true;
                _this.getPolygonRemovePosition(polygon);
                _this.getPolygonAndUpdate(polygon);
                google.maps.event.addListener(polygon.getPath(), 'insert_at', function () {
                    _this.getPolygonAndUpdate(polygon);
                });
                google.maps.event.addListener(polygon.getPath(), 'set_at', function () {
                    _this.getPolygonAndUpdate(polygon);
                });
                google.maps.event.addListener(polygon.getPath(), 'remove_at', function () {
                    _this.getPolygonAndUpdate(polygon);
                });
            });
            google.maps.event.addListener(dm, 'overlaycomplete', function (event) {
                _this.selectedOverlay = event.overlay;
                _this.selectedOverlay.setEditable(true);
                if (event.type !== google.maps.drawing.OverlayType.MARKER) {
                    dm.setDrawingMode(null);
                    google.maps.event.addListener(event.overlay, 'click', function (e) {
                        _this.selectedOverlay = event.overlay;
                        _this.selectedOverlay.setEditable(true);
                    });
                    _this.selectedOverlay = event.overlay;
                }
            });
        });
    };
    MapComponent.prototype.toThousand = function (x) {
        var addK = '';
        if (x > 9999) {
            x = (x / 1000).toFixed(1);
            addK = 'K';
        }
        x = x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        x = x.substr(0, x.length - 2);
        return x + addK;
    };
    MapComponent.prototype.onMapReady = function (map) {
        var _this = this;
        $("#test").offset({ top: 500, left: 800 });
        this.map = map;
        this.getBounds();
        console.log(this.bounds);
        this.listingService.updateFilter();
        map.addListener('bounds_changed', function () {
            if (Date.now() - _this.lastDebounce > _this.DEBOUNCE_TIME) {
                _this.getBounds();
                _this.listingService.updateFilter();
                _this.lastDebounce = Date.now();
            }
        });
    };
    MapComponent.prototype.getBounds = function () {
        this.listingService.filter.bounds = {
            latNE: this.map.getBounds().getNorthEast().lat(),
            lngNE: this.map.getBounds().getNorthEast().lng(),
            latSW: this.map.getBounds().getSouthWest().lat(),
            lngSW: this.map.getBounds().getSouthWest().lng(),
        };
    };
    MapComponent.prototype.getPolygonRemovePosition = function (polygon) {
        var coordinates = polygon.getPath().getArray();
        this.polygonRemovePosition = [coordinates[0].lat(), coordinates[0].lng()];
    };
    MapComponent.prototype.getPolygonAndUpdate = function (polygon) {
        //  let coordinates = (polygon.getPath().getArray());
        var len = polygon.getPath().getLength();
        this.listingService.filter.polygon = [];
        for (var i = 0; i < len; i++) {
            var latLng = polygon.getPath().getAt(i).toUrlValue(20).split(",");
            this.listingService.filter.polygon.push([latLng[1], latLng[0]]);
            //Use this one instead if you want to get rid of the wrap > new google.maps.LatLng(),
        }
        this.listingService.updateFilter();
    };
    MapComponent.prototype.deleteSelectedOverlay = function () {
        if (this.selectedOverlay) {
            this.selectedOverlay.setMap(null);
            delete this.selectedOverlay;
            delete this.listingService.filter.polygon;
            this.isPolygon = false;
            this.listingService.updateFilter();
        }
    };
    return MapComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1__ngui_map__["DrawingManager"]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__ngui_map__["DrawingManager"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__ngui_map__["DrawingManager"]) === "function" && _a || Object)
], MapComponent.prototype, "drawingManager", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('map'),
    __metadata("design:type", Object)
], MapComponent.prototype, "mapElement", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('markerDetails'),
    __metadata("design:type", Object)
], MapComponent.prototype, "markerDetails", void 0);
MapComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-map',
        template: __webpack_require__(382),
        styles: [__webpack_require__(362)],
        providers: []
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_listing_service__["a" /* ListingService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_listing_service__["a" /* ListingService */]) === "function" && _b || Object])
], MapComponent);

var _a, _b;
//noinspection TypeScriptCheckImport
//# sourceMappingURL=map.component.js.map

/***/ }),

/***/ 291:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_auth_component__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopMenuComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TopMenuComponent = (function () {
    function TopMenuComponent(dialog, userservice) {
        var _this = this;
        this.dialog = dialog;
        this.userservice = userservice;
        this.userservice.isAuth
            .subscribe(function (isAuth) {
            // user will be false if logged out
            // or user object if logged in.
            _this.isAuth = isAuth;
        });
        if (this.userservice.token) {
            this.isAuth = true;
        }
        else {
            this.isAuth = false;
        }
    }
    TopMenuComponent.prototype.ngOnInit = function () {
    };
    TopMenuComponent.prototype.logout = function () {
        this.userservice.logout();
    };
    TopMenuComponent.prototype.openDialog = function () {
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_2__auth_auth_component__["a" /* AuthComponent */], {
            height: '400px',
            width: '500px',
        });
        dialogRef.afterClosed().subscribe(function (result) {
            if (result === 'submitted') {
                console.log('form ok');
            }
        });
        // console.log('test');
    };
    return TopMenuComponent;
}());
TopMenuComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-top-menu',
        template: __webpack_require__(384),
        styles: [__webpack_require__(364)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _b || Object])
], TopMenuComponent);

var _a, _b;
//# sourceMappingURL=top-menu.component.js.map

/***/ }),

/***/ 292:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MouseWheelDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MouseWheelDirective = (function () {
    function MouseWheelDirective() {
        this.mouseWheelUp = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.mouseWheelDown = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    MouseWheelDirective.prototype.onMouseWheelChrome = function (event) {
        this.mouseWheelFunc(event);
    };
    MouseWheelDirective.prototype.onMouseWheelFirefox = function (event) {
        this.mouseWheelFunc(event);
    };
    MouseWheelDirective.prototype.onMouseWheelIE = function (event) {
        this.mouseWheelFunc(event);
    };
    MouseWheelDirective.prototype.mouseWheelFunc = function (event) {
        var event = window.event || event; // old IE support
        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
        if (delta > 0) {
            this.mouseWheelUp.emit(event);
        }
        else if (delta < 0) {
            this.mouseWheelDown.emit(event);
        }
        // for IE
        event.returnValue = false;
        // for Chrome and Firefox
        if (event.preventDefault) {
            event.preventDefault();
        }
    };
    return MouseWheelDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MouseWheelDirective.prototype, "mouseWheelUp", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], MouseWheelDirective.prototype, "mouseWheelDown", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('mousewheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MouseWheelDirective.prototype, "onMouseWheelChrome", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('DOMMouseScroll', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MouseWheelDirective.prototype, "onMouseWheelFirefox", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('onmousewheel', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MouseWheelDirective.prototype, "onMouseWheelIE", null);
MouseWheelDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[mouseWheel]' })
], MouseWheelDirective);

//# sourceMappingURL=mouse_wheel.directive.js.map

/***/ }),

/***/ 293:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GetEleDirective; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var GetEleDirective = (function () {
    function GetEleDirective(el) {
        this.el = el;
    }
    GetEleDirective.prototype.show = function () {
        alert();
        console.log(this.el.nativeElement);
        console.log(this.el.nativeElement.offsetLeft);
    };
    return GetEleDirective;
}());
GetEleDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: "[getRef]",
        host: {
            '(click)': "show()"
        }
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object])
], GetEleDirective);

var _a;
//# sourceMappingURL=ref.directive.js.map

/***/ }),

/***/ 294:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LargeNumberPipe; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var LargeNumberPipe = (function () {
    function LargeNumberPipe() {
    }
    LargeNumberPipe.prototype.transform = function (input, args) {
        if (!input) {
            return '';
        }
        return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    return LargeNumberPipe;
}());
LargeNumberPipe = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Pipe"])({
        name: 'largeNumber'
    })
], LargeNumberPipe);

//# sourceMappingURL=large_number.pipe.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_home_home_component__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_panel_property_form_property_form_component__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_search_search_component__ = __webpack_require__(183);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_test_test_component__ = __webpack_require__(184);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_dashboard_dashboard_component__ = __webpack_require__(180);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_user_service__ = __webpack_require__(40);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });






var routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: __WEBPACK_IMPORTED_MODULE_0__components_home_home_component__["a" /* HomeComponent */] },
    { path: 'panel/form', component: __WEBPACK_IMPORTED_MODULE_1__components_panel_property_form_property_form_component__["a" /* PropertyFormComponent */] },
    { path: 'search', component: __WEBPACK_IMPORTED_MODULE_2__components_search_search_component__["a" /* SearchComponent */] },
    { path: 'test', component: __WEBPACK_IMPORTED_MODULE_3__components_test_test_component__["a" /* TestComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_4__components_dashboard_dashboard_component__["a" /* DashboardComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_5__services_user_service__["a" /* UserService */]] },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
//# sourceMappingURL=routes.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 352:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".sebm-google-map-container {\n  height: 300px;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 353:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "modal-body {\n  width: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 354:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".container-fluid {\n  padding-top: 70px;\n}\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 355:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "    .dark-modal .modal-content {\n      width: 1200px;\n    }\n    .dark-modal .close {\n      color: white;   \n    }\n    body::-webkit-scrollbar { \n    display: none; \n\t\toverflow: hidden;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 356:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".jumbotron {\n  width: 80%\n}\n\nmd-input-container {\n  width: 300px;\n}\n.no-padding {\n  padding: 0;\n}\nbody,\nhtml {\n  height: 100%;\n}\n\n@media (min-width: 576px) {\n  #left {\n    position: fixed;\n    top: 50px;\n    bottom: 0;\n  }\n}\n\n#left {\n  \t\tbackground-image: url('/assets/sketch-house1.jpg');\n\t\tbackground-repeat: no-repeat;\n\t\tbackground-size: cover;\n\t\tbackground-position: center;\n\n  /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#a9e4f7+0,0fb4e7+100;Ble+3D+%235 */\n  /*background: #a9e4f7;*/\n  /* Old browsers */\n /* background: -moz-linear-gradient(top, #a9e4f7 0%, #0fb4e7 100%);*/\n  /* FF3.6-15 */\n  /*background: -webkit-linear-gradient(top, #a9e4f7 0%, #0fb4e7 100%);*/\n  /* Chrome10-25,Safari5.1-6 */\n/*  background: linear-gradient(to bottom, #a9e4f7 0%, #0fb4e7 100%);*/\n  /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */\n/*  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a9e4f7', endColorstr='#0fb4e7', GradientType=0);*/\n  /* IE6-9 */\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 357:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 358:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 359:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".list-card {\n  min-width:205px;\n  cursor:pointer;\n  width:32%;\n  float:left;\n  border-radius: 8px 8px 0 0;\n  margin:4px;\n  overflow: hidden;\n /* padding:20px 0;*/\n\n}\n.photo {\n  height:160px;\n}\n.cardContainter {\n  height:274px;\n  float:left;\n  padding-top:10px!important;\n  position:relative;\n  background-color:#fff;\n}\n\n.cardPhoto {\n  color: black;\n  border-radius: 4px 4px 0 0;\n  width:100%;\n  background-size:cover!important;\n  background-position: center center;\n  background-repeat: no-repeat;\n  border-bottom-width:1px!important;\n  border-bottom-style:solid;\n  border-bottom-color:#cdd0d2;\n}\n\n\n\n\t@media (max-width: 768px) {\n\t\t.list-card {\n      width: 100%;\n\t\t}\n    .photo-text {\n      top: 75%;\n    }  \n    .photo {\n      height:200px;\n    }\n\t}\n\n.no-break {\n   white-space: pre;\n}\n/*  white-space: pre;*/\n\n.property-villa {\n  background-image: url('/assets/villa.svg');\n  background-size: cover;\n}\n.property-house {\n  background-image: url('/assets/house.svg');\n  background-size: cover;\n}\n\n.property-apartment {\n  background-image: url('/assets/apartment.svg');\n  background-size: cover;\n}\n\n\n@-webkit-keyframes pulse_animation {\n\t0% { -webkit-transform: scale(1); transform: scale(1); }\n\t50% { -webkit-transform: scale(1.1); transform: scale(1.1); }\n\t100% { -webkit-transform: scale(1); transform: scale(1); }\n}\n\n\n@keyframes pulse_animation {\n\t0% { -webkit-transform: scale(1); transform: scale(1); }\n\t50% { -webkit-transform: scale(1.1); transform: scale(1.1); }\n\t100% { -webkit-transform: scale(1); transform: scale(1); }\n}\n@-webkit-keyframes pulse_animation_opacity {\n\t0% {  opacity: 0.5; }\n\t50% { opacity: 0.8; }\n\t100% { opacity: 0.5; }\n}\n@keyframes pulse_animation_opacity {\n\t0% {  opacity: 0.5; }\n\t50% { opacity: 0.8; }\n\t100% { opacity: 0.5; }\n}\n\n.heart {\n  position: absolute;\n  top: 5%;\n  left: 80%;\n}\n\n.icon-stack:hover {\n  /*transform: scale(1.3);*/\n  \t-webkit-animation-name: pulse_animation;\n  \t        animation-name: pulse_animation;\n\t-webkit-animation-duration: 1000ms;\n\t        animation-duration: 1000ms;\n/*\ttransform-origin:70% 70%;*/\n\t-webkit-animation-iteration-count: infinite;\n\t        animation-iteration-count: infinite;\n\t-webkit-animation-timing-function: linear;\n\t        animation-timing-function: linear;\n}\n.icon-stack {\n  transition:all 0.3s ease;\n}\n\n.icon-a {\n    color: black;\n    opacity: 0.3;\n}\n\n/*.icon-a:hover {\n  animation-name: pulse_animation_opacity;\n\tanimation-duration: 1000ms;\n\n\tanimation-iteration-count: infinite;\n\tanimation-timing-function: linear;\n\n}*/\n.icon-b {\n    pointer-events : none;\n    color: white;\n}\n\n.search-results {\n\t\t\theight: 100%;\n\t\t\t/*overflow: scroll;*/\n      overflow-x:hidden;\n     \n\t\t}\n\n\n.loader {\n  text-align: center;\n  width:100%;\n}\n\n.photo-description {\n \n  color:black;\n  background-color:white;\n}\n\n.photo-text {\n   position: absolute; \n   top: 60%; \n   left: 0px; \n   width: 100%; \n   color: white;\n\n   font: bold 20px Helvetica, Sans-Serif; \n   letter-spacing: -1px;  \n   background: rgb(0, 0, 0); /* fallback color */\n   background: rgba(0, 0, 0, 0.5);\n   padding: 10px; \n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 360:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".inputfile {\n\twidth: 0.1px;\n\theight: 0.1px;\n\topacity: 0;\n\toverflow: hidden;\n\tposition: absolute;\n\tz-index: -1;\n}\n\n\n.inputfile + label {\n\tcursor: pointer; /* \"hand\" cursor */\n}\n\n.btn-file {\n    position: relative;\n    overflow: hidden;\n}\n.btn-file input[type=file] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    min-width: 100%;\n    min-height: 100%;\n    font-size: 100px;\n    text-align: right;\n    filter: alpha(opacity=0);\n    opacity: 0;\n    outline: none;\n    background: white;\n    cursor: inherit;\n    display: block;\n}\n\n.file-image {\n    width:150px;\n}\n\n.my-drop-zone {\n    border: dotted 3px gray;\n    background-color: lightgrey;\n}\n\n.nv-file-over {\n    border: dotted 3px red;\n}\n/* Default class applied to drop zones on over */\n\n.another-file-over-class {\n    border: dotted 3px green;\n}\n\n\n.primary-color {\n    color: #3F51B5!important;\n  }\n.accent-color {\n    color: #FF4081!important;\n  }\n.background-primary-color {\n    background-color: #3F51B5!important;\n  }\n.background-accent-color {\n    background-color: #FF4081!important;\n  }\n.white-text {\n    color: #FFF!important;\n}\n\n\n.td33 {\n    width:33%;\n}\n\n.fullWidth {\n    width:100%;\n}\n.description {\n    width: 100%;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 361:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, "md-card {\n  margin-top: 80px;\n}\n\nexample-radio-group {\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.example-radio-button {\n  margin: 5px;\n}\n\n.example-selected-value {\n  margin: 15px 0;\n}\n\n.material-icons {\n  font-family: 'Material Icons';\n  font-weight: normal;\n  font-style: normal;\n  font-size: 24px;  /* Preferred icon size */\n  display: inline-block;\n  line-height: 1;\n  text-transform: none;\n  letter-spacing: normal;\n  word-wrap: normal;\n  white-space: nowrap;\n  direction: ltr;\n\n  /* Support for all WebKit browsers. */\n  -webkit-font-smoothing: antialiased;\n  /* Support for Safari and Chrome. */\n  text-rendering: optimizeLegibility;\n\n  /* Support for Firefox. */\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Support for IE. */\n  -webkit-font-feature-settings: 'liga';\n          font-feature-settings: 'liga';\n}\n\n#filterSearchCard {\n  position: fixed;\n  top: 50px;\n  right: 0;\n  left: 0;\n  z-index: 990;\n  margin-top: 0;\n  padding-left:10px;\n  padding-top:3px;\n  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);\n  background-color: white;\n}\n\n#addressSearchBox {\n  width: 289px;\n}\n\n.spin-cog {\n  color: #00bcd4;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 362:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".custom-icon {\n  border: 1px solid white;\n  background-color: green;\n  border-radius: 4px;\n  color:white;\n  padding: 1px 3px ;\n  cursor: pointer;\n}\n\n.over {\n  background-color: red;\n  z-index: 2000;\n}\n\n.list-card-small {\n  position:absolute;\n  width:200px;\n  float:left;\n  margin:1%;\n\n}\n.photo {\n  height:160px;\n}\n.photo-text {\n   position: absolute; \n   top: 60%; \n   left: 0px; \n   width: 100%; \n   color: white;\n\n   font: bold 20px Helvetica, Sans-Serif; \n   letter-spacing: -1px;  \n   background: rgb(0, 0, 0); /* fallback color */\n   background: rgba(0, 0, 0, 0.5);\n   padding: 10px; \n}\n\n\n.photo-description {\n \n  color:black;\n  background-color:white;\n}\n.list-card {\n  min-width:205px;\n  \n  width:32%;\n  float:left;\n  border-radius: 8px 8px 0 0;\n  margin:3px;\n  overflow: hidden;\n /* padding:20px 0;*/\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 363:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".jumbotron {\n  width: 80%\n}\n\nmd-input-container {\n  width: 300px;\n}\nbody,\nhtml {\n  height: 100%;\n}\n\n@media (min-width: 576px) {\n  #left {\n    position: fixed;\n    top: 56px;\n    bottom: 0;\n  }\n  #wrap1 {\n    height: 400px;\n    border: solid 1px red;\n  }\n    #wrap2 {\n    margin: 0;\n  }\n}\n\n  #wrap2 {\n    margin: auto;\n  }", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 364:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(12)(false);
// imports


// module
exports.push([module.i, ".logo {\n  max-height: 50px;\n}\n.navbar {\n  background-color: #00BCD4;\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 373:
/***/ (function(module, exports) {

module.exports = "<app-top-menu></app-top-menu>\n<router-outlet></router-outlet>"

/***/ }),

/***/ 374:
/***/ (function(module, exports) {

module.exports = "<!--Sign Up Form-->\n<div *ngIf=\"signupDialog\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">Sign Up</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dialogRef.close('Option 1')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n  </div>\n\n  <div class='container'>\n    <div class='row'>\n      <div class=\"col-md-7\">\n        <div class=\"modal-body\">\n      <form #myForm=\"ngForm\">\n          <md-input-container>\n            <input mdInput type=\"email\" placeholder=\"Email\" [(ngModel)]=\"user.username\" name=\"username\" autofocus required>\n          </md-input-container>\n\n          <md-input-container>\n          <input mdInput type=\"password\" placeholder=\"Password\" [(ngModel)]=\"user.password\" name=\"password\" minlength=\"5\">\n          <md-error>Password must be at least 5 characters long.</md-error>\n          </md-input-container><br>\n        <button type=\"submit\" md-raised-button color=\"accent\" (click)=\"signup()\">Sign Up</button>\n        <md-error>{{ error }}</md-error>\n      </form><br>\n        </div>\n      </div>\n    </div>\n          Already have an an account? <button md-raised-button color=\"primary\" (click)=\"DisplayLoginDialog()\">Login</button>\n  </div>\n</div>\n\n<!--Login Form-->\n<div *ngIf=\"loginDialog\">\n  <div class=\"modal-header\">\n    <h4 class=\"modal-title\">Sign In</h4>\n    <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dialogRef.close('Option 1')\">\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n  </div>\n\n  <div class='container'>\n    <div class='row'>\n      <div class=\"col-md-7\">\n        <div class=\"modal-body\">\n          <form #myForm=\"ngForm\">\n            <md-input-container>\n              <input mdInput type=\"email\" placeholder=\"Email\" [(ngModel)]=\"user.username\" name=\"username\" autofocus>\n            </md-input-container>\n            <md-input-container>\n              <input mdInput type=\"password\" placeholder=\"Password\" [(ngModel)]=\"user.password\" name=\"password\">\n            </md-input-container><br>\n            <button md-raised-button color=\"accent\" (click)=\"login()\">Sign In</button>\n            <md-error>{{ error }}</md-error>\n\n          </form><br>\n        </div>\n      </div>\n    </div>\n          New user? Welcome! <button md-raised-button color=\"primary\" (click)=\"DisplaySignupDialog()\">Sign Up</button>\n  </div>\n</div>"

/***/ }),

/***/ 375:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid\">\n  <h1>DashBoard</h1>\n  <md-tab-group>\n\n    <md-tab label=\"My Profile\">\n      <!--<i class=\"fa fa-user\" aria-hidden=\"true\"></i>-->\n      <br>\n      <h5>My Profile</h5><br>\n      <form #myForm=\"ngForm\">\n        <p>Email: isak.engdahl@gmail.com <a href=\"#\">Edit</a></p>\n        <p>Password: ******** <a href=\"#\">Edit</a></p>\n        <md-input-container>\n          <input mdInput type=\"text\" placeholder=\"Your Full Name\" [(ngModel)]=\"user.fullName\" name=\"fullName\">\n        </md-input-container><br>\n        <md-input-container>\n          <input mdInput type=\"text\" placeholder=\"Phone\" [(ngModel)]=\"user.phoneNumber\" name=\"phoneNumber\">\n        </md-input-container><br>\n  <md-select placeholder=\"User Type\" [(ngModel)]=\"user.role\" name=\"role\">\n    <md-option value=\"home_seller\">Home Seller</md-option>\n    <md-option value=\"both_buyer_and_seller\">Both Buyer and Seller</md-option>\n    <md-option value=\"renter\">Renter</md-option>\n    <md-option value=\"home_owner\">Home Owner</md-option>\n    <md-option value=\"renter_Rentee\">Other/Just Looking</md-option>\n    <md-option value=\"real_estate_pro\">Real Estate Pro</md-option>\n    <md-option value=\"renter_rentee\">Renter/Rentee</md-option>\n  </md-select><br><br>\n        <button md-raised-button color=\"accent\" (click)=\"saveProfile(myForm)\">Save Profile</button> <!-- Should be disabled, only enabled when user start to edit something -->\n        <button md-raised-button color=\"accent\" (click)=\"cancel()\">Cancel</button> <!-- Should only be displayed if user start changing anything. -->\n        <md-error>{{ error }}</md-error>\n\n      </form><br>\n    </md-tab>\n\n    <md-tab label=\"My Listings\">\n      <!--<i class=\"fa fa-files-o\" aria-hidden=\"true\"></i>-->\n      <h5>My Listings</h5>\n      <button md-raised-button color=\"primary\" (click)=\"openDialog()\">Add a new Listing!</button>\n    </md-tab>\n\n    <md-tab label=\"Favorites\">\n      <!--<i class=\"fa fa-heart\" aria-hidden=\"true\"></i>-->\n      <h5>Saved Listings</h5>\n      <h5>Saved Searches</h5>\n    </md-tab>\n  </md-tab-group>\n</div>\n"

/***/ }),

/***/ 376:
/***/ (function(module, exports) {

module.exports = "<app-list [populateOnInit]=\"true\"></app-list>"

/***/ }),

/***/ 377:
/***/ (function(module, exports) {

module.exports = "<div class=\"container-fluid h-100\" id=\"margintop\" style=\"margin-top:50px;\">\n  <div class=\"row h-100\">\n    <div class=\"col-sm-6 col-12 text-white py-2 d-flex align-items-center justify-content-center\" id=\"left\">\n      <md-card style=\"background-color: rgba(255, 255, 255, 0.8);\">\n        <form class=\"example-form\">\n          <md-select color=\"primary\" [(ngModel)]=\"selectedValue\" name=\"typeOfSearch\">\n            <md-option *ngFor=\"let type of typeOffer\" [value]=\"type.value\">\n              {{ type.viewValue }}\n            </md-option>\n          </md-select><br><br>\n          <md-input-container style=\"background-color: rgba(255, 255, 255, 1 );\">\n           <!-- <input #searchBox (click)=\"this.searchBox.value = ''\" mdInput placeholder=\"Search by Street, Neighborhood, City..\" value=\"Copacabana, Rio de Janeiro, RJ\">-->\n\n          <input places-auto-complete type=\"text\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" #addressSearchBox \n              id=\"addressSearchBox\" name=\"address\" (click)=\"this.addressSearchBox.value = ''\" mdInput placeholder=\"Search by Street, Neighborhood or City\"\n              (place_changed)=\"placeChanged($event)\" \n              [types]=\"['geocode']\"\n              [componentRestrictions]='{country: \"br\"}'\n               />\n\n\n          </md-input-container>\n          <button md-raised-button color=\"primary\">Search</button>\n        </form>\n      </md-card>\n\n    </div>\n\n    <div class=\"no-padding col-sm-6 col-12 offset-0 offset-sm-6 py-2\">\n      <app-home-right></app-home-right>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 378:
/***/ (function(module, exports) {

module.exports = "<p>&nbsp;<p>\n<div class=\"modal-header\">\n  <h4 class=\"modal-title\" >Listing details</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dialogRef.close('Option 1')\"> <!--(click)=\"activeModal.dismiss('Cross click')\">-->\n        <span aria-hidden=\"true\">&times;</span>\n  </button>\n</div>\n\n<app-carousel [photos]=\"listing.photos\"></app-carousel>\n"

/***/ }),

/***/ 379:
/***/ (function(module, exports) {

module.exports = "<div class=\"search-results\" infiniteScroll [infiniteScrollDistance]=\"2\" [infiniteScrollThrottle]=\"500\" (scrolled)=\"onScroll()\"\n  [scrollWindow]=\"true\">\n\n  <div *ngFor=\"let listing of listingService.listings; let i = index\" \n    class=\"list-card  card\" \n    (mouseover)=\"listingService.listHoverItem=i\"\n    (mouseout)=\"listingService.listHoverItem=-1\"\n    (click)=\"openDetails(i)\"\n    >\n    <!--    <md-card-header>\n      <div md-card-avatar class=\"property-{{listing.propertyType}}\"></div>\n      <md-card-title><span class=\"no-break\"> {{listing.name}}</span></md-card-title>\n      <md-card-subtitle><span class=\"no-break\">{{listing.city}}</span></md-card-subtitle>\n    </md-card-header>\n-->\n\n<!--    <a href=\"#\" (click)=\"$event.preventDefault();openDetails(i)\">-->\n      <img class=\"photo\" [src]=\"listing.photos[0]\" alt=\"Card image\">\n      <h4 class=\" photo-text\">R$ {{listing.price | largeNumber}}</h4>\n      <div class=\"photo-description\">\n        <!--card-img-overlay-->\n        <div style=\"float:left; padding:5px\">\n          <img style=\"height:20px\" src=\"/assets/{{listing.propertyType}}.svg\"> {{listing.listingType}} <br>\n\n        </div>\n        <div style=\"float:right;padding:5px\">\n          <img src=\"/assets/bed.svg\" style=\"width:19px;margin-bottom:8px\"> {{listing.bedrooms}} <img src=\"/assets/bath.svg\"\n            style=\"width:19px;margin-bottom:8px\"> {{listing.bathrooms}}\n        </div>\n        <div class=\"heart\">\n          <span class=\"fa-stack icon-stack\" id=\"heart{{i}}\" (click)=\"clickHeart($event, i)\">\n              <i class=\"fa fa-lg fa-heart fa-stack-1x icon-a\"></i>\n              <i class=\"fa fa-lg fa-heart-o fa-stack-1x icon-b\"></i>\n          </span>\n        </div>\n      </div>\n <!--   </a>-->\n  </div>\n\n  <!--\n      <h2 class=\"photo-text\">\n        {{listing.listingType}} | {{listing.propertyType}}\n        <br>R$ {{listing.price | largeNumber}}\n      </h2>\n      <div class=\"heart\">\n        <span class=\"fa-stack icon-stack\" id=\"heart{{i}}\" (click)=\"clickHeart(i)\">\n          <i class=\"fa fa-2x fa-heart fa-stack-1x icon-a\"></i>\n          <i class=\"fa fa-2x fa-heart-o fa-stack-1x icon-b\"></i>\n        </span>\n      </div>\n-->\n\n\n\n\n  <div [hidden]=\"!listingService.isLoading\" class=\"loader\">\n    <p>&nbsp;\n      <p>\n        <i class=\"fa fa-spinner fa-pulse fa-3x fa-fw\"></i>\n        <p>\n  </div>\n</div>"

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListingService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ListingService = (function () {
    function ListingService(http) {
        this.http = http;
        this.BASE_URL = 'http://localhost:3000/api/listings';
        this.listings = [];
        this.filter = {};
        this.limit = 50;
        this.offset = 0;
        this.isLoading = true;
        this.addressComponents = [];
        this.zoom = 13;
        this.center = "Rio de Janeiro, Brazil";
    }
    ListingService.prototype.getQuery = function () {
        // console.log(this.filter);
        var query = "?limit=" + this.limit + "&offset=" + this.offset;
        query += this.filter.typesBRN ? '&typesBRN=' + this.filter.typesBRN : '';
        query += this.filter.maxPrice && !isNaN(this.filter.maxPrice) ? '&maxPrice=' + this.filter.maxPrice : '';
        query += this.filter.minPrice && !isNaN(this.filter.minPrice) ? '&minPrice=' + this.filter.minPrice : '';
        query += this.filter.bedrooms ? '&bedrooms=' + this.filter.bedrooms : '';
        query += this.filter.street ? '&street=' + this.filter.street : '';
        query += this.filter.neighbourhood ? '&neighbourhood=' + this.filter.neighbourhood : '';
        query += this.filter.city ? '&city=' + this.filter.city : '';
        query += this.filter.propertyType && this.filter.propertyType.house ? '&house=true' : '';
        query += this.filter.propertyType && this.filter.propertyType.apartment ? '&apartment=true' : '';
        query += this.filter.propertyType && this.filter.propertyType.villa ? '&villa=true' : '';
        //   query += this.filter.coordinates && this.filter.coordinates.latitude ? '&latitude=' + this.filter.coordinates.latitude : '';
        //   query += this.filter.coordinates && this.filter.coordinates.longitude ? '&longitude=' + this.filter.coordinates.longitude : '';
        //  query += this.filter.coordinates && this.filter.coordinates.latitude ? '&radius=' + this.filter.coordinates.radius : '';
        if (this.filter.bounds) {
            query += "&bounds=" + encodeURI(JSON.stringify(this.filter.bounds));
        }
        if (this.filter.polygon) {
            query += "&polygon=" + encodeURI(JSON.stringify(this.filter.polygon));
        }
        return query;
    };
    ListingService.prototype.getList = function (callback) {
        var _this = this;
        // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
        // let options = new RequestOptions({ headers: headers });
        this.isLoading = true;
        this.http.get("" + this.BASE_URL + this.getQuery()) // , options)
            .map(function (res) { return res.json(); }).subscribe(function (res) {
            _this.listings = _this.listings.concat(res.listings);
            _this.listingCount = res.count;
            _this.isLoading = false;
            $("#left").trigger("click");
            callback(res.listings);
        });
    };
    ListingService.prototype.getMore = function (callback) {
        this.offset += this.limit;
        this.getList(callback);
    };
    ListingService.prototype.getNew = function () {
        this.offset = 0;
        this.listings = [];
        this.getList(function () { });
    };
    ListingService.prototype.get = function (id) {
        // let headers = new Headers({ 'Authorization': 'JWT ' + this.SessionService.token });
        // let options = new RequestOptions({ headers: headers });
        return this.http.get(this.BASE_URL + "/" + id) // , options)
            .map(function (res) { return res.json(); });
    };
    // from filter
    ListingService.prototype.updateFilter = function () {
        // if (!isNaN(this.filter.maxPrice) && !isNaN(this.filter.minPrice) && ( +this.filter.maxPrice < +this.filter.minPrice)) {
        //   return;
        // }
        // if ((this.filter.maxPrice && !isNaN(this.filter.maxPrice)) || (this.filter.minPrice && !isNaN(this.filter.minPrice)) ) {
        this.getNew();
        // }
    };
    ListingService.prototype.readSearchPlace = function (place) {
        var _this = this;
        this.addressComponents = [];
        this.filter.street = "";
        this.filter.neighbourhood = "";
        this.filter.city = "";
        this.filter.address = "";
        var newZoom = 13;
        place.address_components.forEach(function (component) {
            switch (component.types[0]) {
                case "route":
                    _this.filter.street = component.long_name;
                    newZoom = 15;
                    _this.addressComponents.unshift(component.long_name);
                    break;
                case "sublocality_level_1":
                    _this.filter.neighbourhood = component.long_name;
                    _this.addressComponents.unshift(component.long_name);
                    newZoom = newZoom < 14 ? 14 : newZoom;
                    break;
                case "locality":
                    _this.filter.city = component.long_name;
                    _this.addressComponents.unshift(component.long_name);
                    break;
            }
        });
        this.zoom = newZoom;
        this.center = place.geometry.location;
    };
    return ListingService;
}());
ListingService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], ListingService);

var _a;
//# sourceMappingURL=listing.service.js.map

/***/ }),

/***/ 380:
/***/ (function(module, exports) {

module.exports = "<p>&nbsp;<p>\n<div class=\"modal-header\">\n  <h4 class=\"modal-title\" >Create listing</h4>\n  <button type=\"button\" class=\"close\" aria-label=\"Close\" (click)=\"dialogRef.close('Option 1')\"> <!--(click)=\"activeModal.dismiss('Cross click')\">-->\n        <span aria-hidden=\"true\">&times;</span>\n      </button>\n</div>\n\n<div class='containter'>\n  <div class='row'>\n\n    <div class=\"col-md-7\">\n\n      <div class=\"modal-body\">\n        <form #myForm=\"ngForm\">\n          <!--       <h4 class=\"modal-title\">Listing information</h4>-->\n          <md-input-container class=\"fullWidth\">\n            <input mdInput placeholder=\"Name\" name=\"propertyName\" [(ngModel)]=\"newProperty.name\" required>\n            <md-error>Please enter the listing name</md-error>\n          </md-input-container>\n\n          <!--\n\n<md-input-container>\n  <input placeholder=\"Email address\"\n    #email=\"ngModel\"\n    name=\"email\"\n    type=\"text\"\n    fullWidth={true}\n    [(ngModel)]=\"model.email\"\n    required\n    email\n    dividerColor=\"accent\"\n    dividerColor=\"{{ !email.valid ? 'warn' : 'primary' }}\" />\n    <md-hint [hidden]=\"email.pristine || email.valid\">\n        <span [hidden]=\"email.errors?.required || !email.errors?.email\">\n            This doesn't appear to be a valid email address.\n        </span>\n        <span [hidden]=\"!email.errors?.required\">Email address is required.</span>\n    </md-hint>\n</md-input-container>\n\n-->\n\n\n          <div class=\"form-group\">\n\n\n\n\n\n\n            <md-select placeholder=\"Listing type\" required style=\"width:200px; margin-top:3%\" [(ngModel)]=\"newProperty.listingType\" name=\"listingTypes\">\n              <md-option value='rental'>\n                Rental\n              </md-option>\n              <md-option value='sale'>\n                Sale\n              </md-option>\n              <md-option value='new'>\n                New construction\n              </md-option>\n            </md-select>\n\n\n            <!--         \n    <label>Listing type: </label><br>\n     <md-radio-group class=\"example-radio-group\" name=\"listingTypes\" [(ngModel)]=\"newProperty.listingType\">\n              <table class=\"fullWidth\">\n                <tr>\n                  <td class=\"td33\">\n                    <md-radio-button class=\"example-radio-button\" value='rental'>\n                      Rental\n                    </md-radio-button>\n                  </td>\n\n                  <td class=\"td33\">\n                    <md-radio-button class=\"example-radio-button\" value='sale'>\n                      For Sale\n                    </md-radio-button>\n                  </td>\n\n                  <td class=\"td33\">\n                    <md-radio-button class=\"example-radio-button\" value='new'>\n                      New \n                    </md-radio-button>\n                  </td>\n                </tr>\n              </table>\n            </md-radio-group>-->\n\n\n\n            <!--          </div>\n\n          <div class=\"form-group\">-->\n\n\n            <md-select style=\"width:200px\" required placeholder=\"Property type\" [(ngModel)]=\"newProperty.propertyType\" name=\"propertyTypes\">\n              <md-option value='apartment'>\n                Apartment &nbsp; &nbsp; &nbsp;\n              </md-option>\n              <md-option value='house'>\n                House\n              </md-option>\n              <md-option value='villa'>\n                Villa\n              </md-option>\n            </md-select>\n\n\n\n            <!--\n            <label>Property type: </label><br>\n            <md-radio-group class=\"example-radio-group\" name=\"propertyTypes\" [(ngModel)]=\"newProperty.propertyType\">\n              <table class=\"fullWidth\">\n                <tr>\n                  <td class=\"td33\">\n                    <md-radio-button class=\"example-radio-button\" value='apartment'>\n                      Apartment\n                    </md-radio-button>\n                  </td>\n\n                  <td class=\"td33\">\n                    <md-radio-button class=\"example-radio-button\" value='house'>\n                      House\n                    </md-radio-button>\n                  </td>\n\n                  <td class=\"td33\">\n                    <md-radio-button class=\"example-radio-button\" value='villa'>\n                      Villa\n                    </md-radio-button>\n                  </td>\n                </tr>\n              </table>\n            </md-radio-group>-->\n\n          </div>\n\n\n          $\n          <md-input-container>\n            <input mdInput price=\"ngModel\" pattern=\"\\d+\" placeholder=\"Price\" size=\"15\" name=\"price\" [(ngModel)]=\"newProperty.price\" required>\n            <md-error>Please enter correct price</md-error>\n          </md-input-container>\n\n          $\n          <md-input-container>\n            <input mdInput placeholder=\"Condo\" pattern=\"\\d+\" size=\"15\" name=\"condo\" [(ngModel)]=\"newProperty.condo\">\n            <md-error>Please enter correct price</md-error>\n          </md-input-container>\n          <br>\n          <md-input-container>\n            <input mdInput placeholder=\"Square meters\" size=\"14\" required name=\"size\" [(ngModel)]=\"newProperty.size\">\n            <md-error>Please enter correct size</md-error>\n          </md-input-container>\n\n          <md-input-container>\n            <input mdInput placeholder=\"Suites\" pattern=\"\\d+\" size=\"10\" name=\"suites\" [(ngModel)]=\"newProperty.suites\">\n            <md-error>Please enter number</md-error>\n          </md-input-container>\n\n          <md-input-container>\n            <input mdInput placeholder=\"Bedrooms\" pattern=\"\\d+\" size=\"10\" name=\"bedrooms\" [(ngModel)]=\"newProperty.bedrooms\">\n            <md-error>Please enter number</md-error>\n          </md-input-container>\n\n          <md-input-container>\n            <input mdInput placeholder=\"Parking spots\" pattern=\"\\d+\" size=\"10\" name=\"parking\" [(ngModel)]=\"newProperty.parking\">\n            <md-error>Please enter number</md-error>\n          </md-input-container>\n\n          <br>\n\n\n\n          <table cellspacing=\"0\">\n            <tr>\n              <td>\n                <md-input-container>\n                  <input mdInput placeholder=\"City\" name=\"city\" [(ngModel)]=\"newProperty.city\">\n                </md-input-container>\n              </td>\n              <td>\n                <md-input-container class=\"example-full-width\">\n                  <input mdInput #postalCode maxlength=\"8\" size=\"8\" placeholder=\"Zip\">\n                  <md-hint align=\"end\">{{postalCode.value.length}} / 8</md-hint>\n                </md-input-container>\n              </td>\n              <td>\n                <md-input-container>\n                  <input mdInput placeholder=\"Neighbourhood\" name=\"neighbourhood\" [(ngModel)]=\"newProperty.neighbourhood\">\n                </md-input-container>\n              </td>\n            </tr>\n            <tr>\n              <td>\n                <md-input-container>\n                  <input mdInput placeholder=\"Street\" name=\"street\" [(ngModel)]=\"newProperty.street\">\n                </md-input-container>\n              </td>\n              <td>\n                <md-input-container>\n                  <input mdInput placeholder=\"Number\" size=\"8\" name=\"streetNumber\" [(ngModel)]=\"newProperty.streetNumber\">\n                </md-input-container>\n              </td>\n              <td style=\"text-align: right\">\n                <md-input-container>\n                  <input mdInput placeholder=\"Broker ID\" size=\"10\" name=\"broker\" [(ngModel)]=\"newProperty.brokerId\">\n                </md-input-container>\n              </td>\n            </tr>\n          </table>\n\n          <md-input-container class=\"description\">\n            <textarea rows=\"4\" mdInput placeholder=\"Description\" name=\"description\" [(ngModel)]=\"newProperty.description\"></textarea>\n          </md-input-container>\n\n\n        </form>\n      </div>\n\n    </div>\n\n\n    <div class=\"col-md-5\">\n      <div class=\"container modal-body\">\n        <div class=\"row\">\n          <div class=\"col-md-12\">\n\n            <h4 class=\"modal-title\">Drag files</h4>\n\n            <div ng2FileDrop style=\"height: 100px\" [ngClass]=\"{'nv-file-over': hasBaseDropZoneOver}\" (fileOver)=\"fileOverBase($event)\"\n              [uploader]=\"uploader\" class=\"well my-drop-zone\">\n            </div>\n\n            <input #selectElem type=\"file\" id=\"fileUpload\" name=\"fileUpload\" class=\"inputfile\" ng2FileSelect [uploader]=\"uploader\" multiple\n            />\n            <label for=\"fileUpload\" class=\"btn btn-primary\">Choose files...</label>\n            <!-- class=\"btn btn-primary\"-->\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"col-md-12\" style=\"margin-bottom: 40px\">\n            <table class=\"table\">\n              <tbody>\n                <tr *ngFor=\"let item of uploader.queue; let i = index\">\n                  <img src=\"#\" class=\"file-image\" id=\"fileImage{{i}}\">{{showFile(item, i)}}\n\n                  <td *ngIf=\"uploader.isHTML5\">\n                    <div class=\"progress\" style=\"margin-bottom: 0;\">\n                      <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': item.progress + '%' }\"></div>\n                    </div>\n                  </td>\n                  <td class=\"text-center\">\n                    <span *ngIf=\"item.isSuccess\"><i class=\"glyphicon glyphicon-ok\"></i></span>\n                    <span *ngIf=\"item.isCancel\"><i class=\"glyphicon glyphicon-ban-circle\"></i></span>\n                    <span *ngIf=\"item.isError\"><i class=\"glyphicon glyphicon-remove\"></i></span>\n                  </td>\n                  <td nowrap>\n\n                    <button type=\"button\" md-raised-button (click)=\"item.remove()\">\n                            <span class=\"glyphicon glyphicon-trash\"></span> Remove\n                        </button>\n                  </td>\n                </tr>\n              </tbody>\n            </table>\n\n            <div>\n              <div>\n                Queue progress:\n                <div class=\"progress\" style=\"\">\n                  <div class=\"progress-bar\" role=\"progressbar\" [ngStyle]=\"{ 'width': uploader.progress + '%' }\"></div>\n                </div>\n              </div>\n\n              <!--              <button type=\"button\" class=\"btn btn-success btn-s\"\n                        (click)=\"uploader.uploadAll()\" [disabled]=\"!uploader.getNotUploadedItems().length\">\n                    <span class=\"glyphicon glyphicon-upload\"></span> Upload all\n                </button>\n                <button type=\"button\" class=\"btn btn-warning btn-s\"\n                        (click)=\"uploader.cancelAll()\" [disabled]=\"!uploader.isUploading\">\n                    <span class=\"glyphicon glyphicon-ban-circle\"></span> Cancel all\n                </button>\n                <button type=\"button\" class=\"btn btn-danger btn-s\"\n                        (click)=\"uploader.clearQueue()\" [disabled]=\"!uploader.queue.length\">\n                    <span class=\"glyphicon glyphicon-trash\"></span> Remove all\n                </button>-->\n\n            </div>\n\n          </div>\n\n        </div>\n\n      </div>\n\n\n    </div>\n\n  </div>\n</div>\n<!-- [disabled]=\"!myForm.form.valid\" -->\n<div class=\"modal-footer\">\n  <span [hidden]=\"!submittedInvalid || (myForm.form.valid && uploader.queue.length)\" style=\"color:red\">{{submitError}}\n            </span>\n\n  <button md-raised-button class=\"background-primary-color white-text\" (click)=\"doSubmit(myForm.form.valid)\">\n                    <span class=\"glyphicon glyphicon-upload\"></span> Submit\n          </button>\n  <button md-raised-button (click)=\"dialogRef.close('Option 1')\">Close</button>\n</div>"

/***/ }),

/***/ 381:
/***/ (function(module, exports) {

module.exports = "<div id=\"filterSearchCard\">\n  <form #myForm=\"ngForm\" class=\"example-form\">\n    <md-input-container>\n      <!--      <input [formControl]=\"searchControl\" type=\"text\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" #addressSearchBox [(ngModel)]=\"newSearch.address\" id=\"addressSearchBox\" name=\"address\" (click)=\"this.addressSearchBox.value = ''\" mdInput placeholder=\"Search by Street, Neighborhood or City\"\n        value=\"Copacabana, Rio de Janeiro, RJ\">-->\n      <input places-auto-complete type=\"text\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"off\" #addressSearchBox [(ngModel)]=\"newSearch.address\"\n        id=\"addressSearchBox\" name=\"address\" (click)=\"this.addressSearchBox.value = ''\" mdInput placeholder=\"Search by Street, Neighborhood or City\"\n        (place_changed)=\"placeChanged($event)\" \n        [types]=\"['geocode']\" \n        [componentRestrictions]='{country: \"br\"}'\n        />\n\n    </md-input-container>\n\n    <ng-template #typesBRN>\n      <md-radio-group class=\"example-radio-group\" name=\"typesBRN\" (change)=\"listingService.updateFilter()\" (click)=\"$event.stopPropagation()\"\n        [(ngModel)]=\"newSearch.typesBRN\">\n        <md-radio-button class=\"example-radio-button\" value=\"sale\">\n          Buy\n        </md-radio-button>\n        <md-radio-button class=\"example-radio-button\" value=\"rental\">\n          Rent\n        </md-radio-button>\n        <md-radio-button class=\"example-radio-button\" value=\"new\">\n          New Development\n        </md-radio-button>\n      </md-radio-group>\n    </ng-template>\n    <button md-raised-button placement=\"bottom\" #p4=\"ngbPopover\" (document:click)=\"p4.close()\" (click)=\"$event.stopPropagation();p1.close();p2.close();p3.close()\"\n      [ngbPopover]=\"typesBRN\">Type <i class=\"material-icons\">expand_more</i>\n    </button>\n\n\n    <ng-template #priceRange>\n        <table class=\"example-full-width\" cellspacing=\"0\" (click)=\"$event.stopPropagation()\">\n          <tr>\n            <td>\n              <md-input-container class=\"example-full-width\">\n                <input mdInput placeholder=\"Min Price\" [(ngModel)]=\"newSearch.minPrice\" [formControl]=\"minPriceControl\" pattern=\"\\d+\" name=\"minPrice\">\n                <md-error>Please enter number</md-error>\n              </md-input-container>\n            </td>\n            <td>\n              <md-input-container class=\"example-full-width\">\n                <input mdInput placeholder=\"Max Price\" [(ngModel)]=\"newSearch.maxPrice\" [formControl]=\"maxPriceControl\" pattern=\"\\d+\" name=\"maxPrice\">\n                <md-error>Please enter number</md-error>\n              </md-input-container>\n            </td>\n          </tr>\n        </table>\n    </ng-template>\n\n    <button md-raised-button placement=\"bottom\" #p1=\"ngbPopover\" (document:click)=\"p1.close()\" (click)=\"$event.stopPropagation();p2.close();p3.close();p4.close()\"\n      [ngbPopover]=\"priceRange\">Price <i class=\"material-icons\">expand_more</i>\n\n    </button>\n\n    <ng-template #beds>\n      <md-radio-group class=\"example-radio-group\" name=\"bedrooms\" (change)=\"listingService.updateFilter()\" (click)=\"$event.stopPropagation()\"\n        [(ngModel)]=\"newSearch.bedrooms\">\n        <md-radio-button class=\"example-radio-button\" value=\"0\">\n          Studio+\n        </md-radio-button>\n        <md-radio-button class=\"example-radio-button\" value=\"1\">\n          1+\n        </md-radio-button>\n        <md-radio-button class=\"example-radio-button\" value=\"2\">\n          2+\n        </md-radio-button>\n        <md-radio-button class=\"example-radio-button\" value=\"3\">\n          3+\n        </md-radio-button>\n        <md-radio-button class=\"example-radio-button\" value=\"4\">\n          4+\n        </md-radio-button>\n      </md-radio-group>\n    </ng-template>\n    <button md-raised-button placement=\"bottom\" #p2=\"ngbPopover\" (document:click)=\"p2.close()\" (click)=\"$event.stopPropagation();p1.close();p3.close();p4.close()\"\n      [ngbPopover]=\"beds\">Beds <i class=\"material-icons\">expand_more</i>\n    </button>\n    <ng-template #propertyType>\n      <section class=\"example-section\" (click)=\"$event.stopPropagation()\">\n        <md-checkbox class=\"example-margin\" name=\"apartment\" (change)=\"listingService.updateFilter()\" [(ngModel)]=\"newSearch.propertyType.apartment\">Apartment</md-checkbox>\n        <md-checkbox class=\"example-margin\" name=\"house\" (change)=\"listingService.updateFilter()\" [(ngModel)]=\"newSearch.propertyType.house\">House</md-checkbox>\n        <md-checkbox class=\"example-margin\" name=\"villa\" (change)=\"listingService.updateFilter()\" [(ngModel)]=\"newSearch.propertyType.villa\">Villa</md-checkbox>\n      </section>\n\n    </ng-template>\n    <button md-raised-button placement=\"bottom\" #p3=\"ngbPopover\" (document:click)=\"p3.close()\" (click)=\"$event.stopPropagation();p1.close();p2.close();p4.close()\"\n      [ngbPopover]=\"propertyType\">Home Types <i class=\"material-icons\">expand_more</i>\n    </button>\n\n    Found: {{listingService.listingCount}} matches\n    <div *ngIf=\"listingService.isLoading\" style=\"float:right; padding-top:10px\">\n      <i class=\"fa fa-cog fa-spin fa-2x fa-fw spin-cog\"></i>\n    </div>\n\n    <div *ngIf=\"listingService.addressComponents.length\" style=\"padding-bottom:5px\">\n      <span *ngFor=\"let component of listingService.addressComponents; let j = index; let isLast = last\"\n        style = \"font-size:smaller; margin-bottom:50px\"\n      >\n      <a  href=\"#\"\n        (click)=\"$event.preventDefault(); breadCrumbs(j)\"\n      >\n        {{component}}\n        </a>\n        <i class='fa fa-caret-right' *ngIf=\"!isLast\"></i>\n      </span>\n    </div>\n    \n    \n\n  </form>\n</div>"

/***/ }),

/***/ 382:
/***/ (function(module, exports) {

module.exports = "<ngui-map #map [zoom]=\"listingService.zoom\" [center]=\"listingService.center\" (mouseover)=\"listingService.listHoverItem=-1\" (mapReady$)=\"onMapReady($event)\"\n  style=\"height:100%\">\n  <drawing-manager #drawing  [drawingControl]=\"true\" [drawingControlOptions]=\"{\n      position: 2,\n      drawingModes: ['polygon']\n      }\" [polygonOptions]=\"{\n      strokeColor: 'red',\n      fillColor: 'red',\n      strokeWeight: 2,\n      editable: true,\n      zIndex: 1\n    }\"></drawing-manager>\n  <custom-marker (click)=\"getElement($event)\" *ngFor=\"let listing of listingService?.listings; let i=index\" [position]=\"[listing.location.coordinates[1], listing.location.coordinates[0]]\">\n    <div>\n      <span \n        mouseWheel\n        [class.over]=\"showMapDetails[i] || listingService.listHoverItem===i\" \n        (mouseover)=\"markerMouseOver($event, i)\" \n        (mouseout)=\"showMapDetails[i]=false\"  \n        (mouseWheelUp)=\"showMapDetails[i]=false\"\n        (mouseWheelDown)=\"showMapDetails[i]=false\"\n        class=\"custom-icon\">\n        {{toThousand(listing.price)}}\n        \n      </span>\n    </div>\n    <div #markerDetails id=\"markerDetails{{i}}\" style=\"z-index: 1000; margin:0 -80px\" *ngIf=\"(showMapDetails[i] || listingService.listHoverItem===i)\"\n      class=\"card list-card\">\n\n      <img class=\"photo\" [src]=\"listing.photos[0]\" alt=\"Card image\">\n      <h4 class=\" photo-text\">R$ {{listing.price | largeNumber}}</h4>\n      <div class=\"photo-description\">\n        <!--card-img-overlay-->\n        <div style=\"float:left; padding:5px\">\n          <img style=\"height:20px\" src=\"/assets/{{listing.propertyType}}.svg\"> {{listing.listingType}} <br>\n\n        </div>\n        <div style=\"float:right;padding:5px\">\n          <img src=\"/assets/bed.svg\" style=\"width:19px;margin-bottom:8px\"> {{listing.bedrooms}} <img src=\"/assets/bath.svg\"\n            style=\"width:19px;margin-bottom:8px\"> {{listing.bathrooms}}\n        </div>\n\n      </div>\n    </div>\n\n  </custom-marker>\n\n  <custom-marker *ngIf=\"isPolygon\" [position]=\"polygonRemovePosition\">\n    <span (click)=\"deleteSelectedOverlay()\" class=\"fa-stack fa-lg\" style=\"z-index: 100\">\n        <i class=\"fa fa-circle fa-stack-2x\"></i>\n        <i class=\"fa fa-close fa-stack-1x\" style=\"color:white\"></i>\n      </span> </custom-marker>\n\n</ngui-map>\n<!--\n<button (click)=\"deleteSelectedOverlay()\">Delete Selected Overlay</button>\n<code>\n  <br/><b>HTML</b>\n\n  <br/><b>deleteSelectedOverlay function</b>\n\n</code>-->\n\n\n<div style=\"position:absolute;z-index:1000;display:none; background-color:red\" id=\"test\">HERE!!\n\n\n</div>"

/***/ }),

/***/ 383:
/***/ (function(module, exports) {

module.exports = "<app-filter-list></app-filter-list>\n<div id=\"search-listings\" class=\"container-fluid h-100 extraspace\" style=\"margin-top: 111px; margin-right: 0; padding: 0;\">\n  <div class=\"row \" style=\"margin-right: 0; margin-left:0;\">\n          \n    <div class=\"col-sm-6 col-12 text-white d-flex align-items-center justify-content-center\" style=\"padding: 0;\">\n\n      <div id=\"wrap2\">\n      <app-list></app-list>\n    </div>\n    </div>\n    <div class=\"col-sm-6 col-12 offset-0 offset-sm-6 hidden-xs-down\" id=\"left\" style=\"margin-top: 55px; margin-bottom: 0; padding:0;\">\n      <app-map></app-map>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ 384:
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar fixed-top navbar-toggleable-md navbar-light bg-faded\" style=\"height:50px\">\n  <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\"\n    aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <a class=\"navbar-brand\" routerLink=\"/\"><img class=\"logo\" src=\"assets/AI_logo_2015.png\" alt=\"Agente Imovel logo\"></a>\n  <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/search\" routerLinkActive=\"active\">Search</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" routerLink=\"/#\" routerLinkActive=\"active\">Sell</a>\n      </li>\n      <li class=\"nav-item dropdown\">\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"dropdown01\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Buy</a>\n        <div class=\"dropdown-menu\" aria-labelledby=\"dropdown01\">\n          <a class=\"dropdown-item\" href=\"#\">Action</a>\n          <a class=\"dropdown-item\" href=\"#\">Another action</a>\n          <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n        </div>\n      </li>\n      <li class=\"nav-item dropdown\">\n        <a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"dropdown01\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Rent</a>\n        <div class=\"dropdown-menu\" aria-labelledby=\"dropdown01\">\n          <a class=\"dropdown-item\" href=\"#\">Action</a>\n          <a class=\"dropdown-item\" href=\"#\">Another action</a>\n          <a class=\"dropdown-item\" href=\"#\">Something else here</a>\n        </div>\n      </li>\n    </ul>\n<a *ngIf=\"isAuth\" class=\"nav-link\" routerLink=\"/dashboard\" routerLinkActive=\"active\">Dashboard <i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i></a>\n<button *ngIf=\"!isAuth\" md-raised-button (click)=\"openDialog()\" color=\"accent\">Sign In</button>\n      <button *ngIf=\"isAuth\" md-raised-button (click)=\"logout()\" color=\"accent\">Sign Out</button>\n  </div>\n</nav>\n"

/***/ }),

/***/ 40:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var UserService = (function () {
    function UserService(router, http) {
        this.router = router;
        this.http = http;
        this.isAuth = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.activeUserId = '';
        this.BASE_URL = 'http://localhost:3000';
        // set token if saved in local storage
        this.token = localStorage.getItem('token');
        if (this.token != null) {
            this.isAuth.emit(true);
        }
        else {
            this.isAuth.emit(false);
        }
    }
    UserService.prototype.canActivate = function () {
        if (localStorage.getItem('token')) {
            // logged in so return true\
            /*      this.token = localStorage.getItem('token');
                  this.isAuth = true;*/
            return true;
        }
        // not logged in so redirect to login page
        this.router.navigate(['/']);
        this.isAuth.emit(true);
        return false;
    };
    UserService.prototype.isAuthenticated = function () {
        return this.token != null ? true : false;
    };
    UserService.prototype.signup = function (user) {
        var _this = this;
        return this.http.post(this.BASE_URL + "/signup", user)
            .map(function (response) { return response.json(); })
            .map(function (response) {
            var token = response.token;
            /*      const user = response.user;*/
            if (token) {
                // set token property
                _this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);
                _this.isAuth.emit(true);
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        })
            .catch(function (err) { return __WEBPACK_IMPORTED_MODULE_5_rxjs_Rx__["Observable"].throw(err); });
    };
    UserService.prototype.login = function (user) {
        var _this = this;
        return this.http.post(this.BASE_URL + "/login", user)
            .map(function (response) {
            // login successful if there's a jwt token in the response
            var token = response.json() && response.json().token;
            _this.activeUserId = response.json() && response.json().payload.id;
            console.log('activeUserId: ', _this.activeUserId);
            if (token) {
                // set token property
                _this.token = token;
                _this.isAuth.emit(true);
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', token);
                /*              localStorage.setItem('user', JSON.stringify(user) );*/
                // return true to indicate successful login
                return true;
            }
            else {
                // return false to indicate failed login
                return false;
            }
        });
    };
    UserService.prototype.logout = function () {
        // clear token remove user from local storage to log user out
        this.token = null;
        this.activeUserId = null;
        this.isAuth.emit(false);
        localStorage.removeItem('token');
        /*      localStorage.removeItem('user');*/
        this.router.navigate(['/']);
    };
    UserService.prototype.getUser = function (id) {
        var _this = this;
        /*    let headers = new Headers({ 'Authorization': 'JWT ' + this.userservice.token });
            let options = new RequestOptions({ headers: headers });*/
        return this.http.get(this.BASE_URL + "/api/users/" + id /*, options*/)
            .map(function (res) { return res.json(); }).subscribe(function (user) {
            _this.user = user;
        });
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _b || Object])
], UserService);

var _a, _b;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ 631:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(270);


/***/ }),

/***/ 95:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PropertyFormComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return DialogCreateNewPropertyComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


var URL = 'http://localhost:3000/api/listings';
var PropertyFormComponent = (function () {
    function PropertyFormComponent(dialogRef, dialog) {
        this.dialogRef = dialogRef;
        this.dialog = dialog;
        this.newProperty = {};
        this.token = Date.now();
        this.filesSent = 0;
        this.submittedInvalid = false;
        this.uploader = new __WEBPACK_IMPORTED_MODULE_2_ng2_file_upload__["FileUploader"]({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
    }
    PropertyFormComponent.prototype.showFile = function (item, index) {
        readURL(item, index);
    };
    PropertyFormComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    PropertyFormComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.uploader.onBuildItemForm = function (item, form) {
            console.log('onBuildItemForm');
            form.append('token', _this.token);
            if (_this.filesSent === 0) {
                form.append('newListing', true);
                form.append('property', JSON.stringify(_this.newProperty));
            }
            _this.filesSent++;
        };
    };
    PropertyFormComponent.prototype.doSubmit = function (formValid) {
        var _this = this;
        if (!formValid) {
            this.submitError = 'Please fill out the form';
            this.submittedInvalid = true;
        }
        else {
            if (this.uploader.queue.length === 0) {
                this.submitError = 'Please upload photos';
                this.submittedInvalid = true;
            }
            else {
                this.uploader.uploadAll();
                var dialogResult = this.dialog.open(DialogCreateNewPropertyComponent, { width: '30%', height: '16%' });
                dialogResult.afterClosed().subscribe(function (result) {
                    _this.dialogRef.close('submitted');
                });
            }
        }
        // this.uploader.getNotUploadedItems().length
    };
    return PropertyFormComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], PropertyFormComponent.prototype, "name", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('selectElem'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], PropertyFormComponent.prototype, "el", void 0);
PropertyFormComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-property-form',
        template: __webpack_require__(380),
        styles: [__webpack_require__(360)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogRef */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["c" /* MdDialog */]) === "function" && _c || Object])
], PropertyFormComponent);

function readURL(input, index) {
    if ($('#fileImage' + index).attr('src') === '#') {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#fileImage' + index).attr('src', e.target.result);
        };
        console.log('read');
        $('#fileImage' + index).attr('src', '##');
        reader.readAsDataURL(input._file);
    }
}
var DialogCreateNewPropertyComponent = (function () {
    function DialogCreateNewPropertyComponent(dialogRef) {
        this.dialogRef = dialogRef;
    }
    DialogCreateNewPropertyComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { return _this.dialogRef.close('submitted'); }, 1000);
    };
    return DialogCreateNewPropertyComponent;
}());
DialogCreateNewPropertyComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dialog-result-example-dialog',
        template: "\n<div md-dialog-content>Listing has been created...</div>\n",
    }),
    __metadata("design:paramtypes", [typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_material__["b" /* MdDialogRef */]) === "function" && _d || Object])
], DialogCreateNewPropertyComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=property-form.component.js.map

/***/ })

},[631]);
//# sourceMappingURL=main.bundle.js.map