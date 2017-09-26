webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./pages/base-stations/base-stations.module": [
		"../../../../../src/app/pages/base-stations/base-stations.module.ts",
		"common",
		"base-stations.module"
	],
	"./pages/categories/categories.module": [
		"../../../../../src/app/pages/categories/categories.module.ts",
		"common",
		"categories.module"
	],
	"./pages/dashboard/dashboard.module": [
		"../../../../../src/app/pages/dashboard/dashboard.module.ts",
		"common",
		"dashboard.module"
	],
	"./pages/devices/devices.module": [
		"../../../../../src/app/pages/devices/devices.module.ts",
		"devices.module",
		"common"
	],
	"./pages/messages/messages.module": [
		"../../../../../src/app/pages/messages/messages.module.ts",
		"common",
		"messages.module"
	],
	"./pages/parsers/parsers.module": [
		"../../../../../src/app/pages/parsers/parsers.module.ts",
		"parsers.module",
		"common"
	],
	"./pages/user/login/login.module": [
		"../../../../../src/app/pages/user/login/login.module.ts",
		"common",
		"login.module"
	],
	"./pages/user/profile/profile.module": [
		"../../../../../src/app/pages/user/profile/profile.module.ts",
		"common",
		"profile.module"
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
module.exports = webpackAsyncContext;
webpackAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/_guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services_custom_User__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/User.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(userApi, router) {
        this.userApi = userApi;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (route, state) {
        if (this.userApi.isAuthenticated()) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services_custom_User__["a" /* UserApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services_custom_User__["a" /* UserApi */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _b || Object])
], AuthGuard);

var _a, _b;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = (function () {
    function AppComponent() {
    }
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'body',
        template: '<router-outlet></router-outlet>'
    })
], AppComponent);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap_dropdown__ = __webpack_require__("../../../../ng2-bootstrap/dropdown/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap_tabs__ = __webpack_require__("../../../../ng2-bootstrap/tabs/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__shared_nav_dropdown_directive__ = __webpack_require__("../../../../../src/app/shared/nav-dropdown.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__shared_sidebar_directive__ = __webpack_require__("../../../../../src/app/shared/sidebar.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__shared_aside_directive__ = __webpack_require__("../../../../../src/app/shared/aside.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_breadcrumb_component__ = __webpack_require__("../../../../../src/app/shared/breadcrumb.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__layouts_full_layout_component__ = __webpack_require__("../../../../../src/app/layouts/full-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__layouts_simple_layout_component__ = __webpack_require__("../../../../../src/app/layouts/simple-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__shared_sdk_index__ = __webpack_require__("../../../../../src/app/shared/sdk/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};












// Routing Module

// Layouts


// SDK


var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_12__app_routing__["a" /* AppRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_5_ng2_bootstrap_dropdown__["a" /* BsDropdownModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_6_ng2_bootstrap_tabs__["a" /* TabsModule */].forRoot(),
            __WEBPACK_IMPORTED_MODULE_8_ng2_charts_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_15__shared_sdk_index__["b" /* SDKBrowserModule */].forRoot()
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_13__layouts_full_layout_component__["a" /* FullLayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_14__layouts_simple_layout_component__["a" /* SimpleLayoutComponent */],
            __WEBPACK_IMPORTED_MODULE_7__shared_nav_dropdown_directive__["a" /* NAV_DROPDOWN_DIRECTIVES */],
            __WEBPACK_IMPORTED_MODULE_11__shared_breadcrumb_component__["a" /* BreadcrumbsComponent */],
            __WEBPACK_IMPORTED_MODULE_9__shared_sidebar_directive__["a" /* SIDEBAR_TOGGLE_DIRECTIVES */],
            __WEBPACK_IMPORTED_MODULE_10__shared_aside_directive__["a" /* AsideToggleDirective */],
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_16__guards_auth_guard__["a" /* AuthGuard */],
            {
                provide: __WEBPACK_IMPORTED_MODULE_2__angular_common__["LocationStrategy"],
                useClass: __WEBPACK_IMPORTED_MODULE_2__angular_common__["HashLocationStrategy"]
            }
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__layouts_full_layout_component__ = __webpack_require__("../../../../../src/app/layouts/full-layout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guards_auth_guard__ = __webpack_require__("../../../../../src/app/_guards/auth.guard.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// Layouts


var routes = [
    { path: 'login', loadChildren: './pages/user/login/login.module#LoginModule' },
    /*{ path: 'signup', loadChildren: './pages/user/signup/signup.module#SignupModule' },*/
    /*{ path: 'not-found', loadChildren: './pages/not-found/not-found.module#NotFoundModule' },
    { path: '**', redirectTo: 'not-found' },*/
    {
        path: '',
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__guards_auth_guard__["a" /* AuthGuard */]],
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '',
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__guards_auth_guard__["a" /* AuthGuard */]],
        component: __WEBPACK_IMPORTED_MODULE_2__layouts_full_layout_component__["a" /* FullLayoutComponent */],
        data: {
            title: 'Home'
        },
        children: [
            { path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule' },
            { path: 'devices', loadChildren: './pages/devices/devices.module#DevicesModule' },
            { path: 'categories', loadChildren: './pages/categories/categories.module#CategoriesModule' },
            { path: 'parsers', loadChildren: './pages/parsers/parsers.module#ParsersModule' },
            { path: 'messages', loadChildren: './pages/messages/messages.module#MessagesModule' },
            { path: 'base-stations', loadChildren: './pages/base-stations/base-stations.module#BaseStationsModule' },
            { path: 'profile', loadChildren: './pages/user/profile/profile.module#ProfileModule' }
        ]
    } /*,
    {
      path: 'pages',
      component: SimpleLayoutComponent,
      data: {
        title: 'Pages'
      },
      children: [
        {
          path: '',
          loadChildren: './pages/pages.module#PagesModule',
        }
      ]
    }*/
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forRoot(routes
            /*, { enableTracing: true }*/
            )],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], AppRoutingModule);

//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/layouts/full-layout.component.html":
/***/ (function(module, exports) {

module.exports = "<header class=\"app-header navbar\">\n  <button class=\"navbar-toggler mobile-sidebar-toggler hidden-lg-up\" type=\"button\">&#9776;</button>\n  <a class=\"navbar-brand\" href=\"#\"></a>\n\n  <ul class=\"nav navbar-nav hidden-md-down\">\n    <li class=\"nav-item\">\n      <a class=\"nav-link navbar-toggler sidebar-toggler\" href=\"#\">&#9776;</a>\n    </li>\n  </ul>\n\n  <ul class=\"nav navbar-nav ml-auto\" style=\"margin-right: 2%\">\n    <li class=\"nav-item dropdown\" dropdown (onToggle)=\"toggled($event)\">\n      <a href class=\"nav-link dropdown-toggle\" dropdownToggle (click)=\"false\">\n        <img src=\"{{user.avatar}}\" class=\"img-avatar\" alt=\"{{user.email}}\">\n        <span class=\"d-md-down-none\">{{user.username}}</span>\n      </a>\n      <div class=\"dropdown-menu dropdown-menu-right\" *dropdownMenu aria-labelledby=\"simple-dropdown\">\n\n        <div class=\"dropdown-header text-center\"><strong>Information</strong></div>\n        <a class=\"dropdown-item\" href=\"#\" [routerLink]=\"['/devices']\"><i class=\"fa fa-microchip\"></i> Devices<span class=\"badge badge-success\">{{countDevices}}</span></a>\n        <a class=\"dropdown-item\" href=\"#\" [routerLink]=\"['/messages']\"><i class=\"fa fa-envelope\"></i> Messages<span class=\"badge badge-success\">{{countMessages}}</span></a>\n        <div class=\"dropdown-header text-center\"><strong>Settings</strong></div>\n        <a class=\"dropdown-item\" href=\"#\" [routerLink]=\"['/profile']\"><i class=\"fa fa-user\"></i> Profile</a>\n        <a class=\"dropdown-item\" href=\"#\" (click)=\"onLogout()\"><i class=\"fa fa-lock\"></i> Logout</a>\n\n      </div>\n    </li>\n  </ul>\n</header>\n\n<div class=\"app-body\">\n  <div class=\"sidebar\">\n    <nav class=\"sidebar-nav\">\n      <ul class=\"nav\">\n        <li class=\"nav-title\">\n          Dashboard\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/dashboard']\"><i class=\"icon-speedometer\"></i> Dashboard <span class=\"badge badge-info\"></span></a>\n        </li>\n        <li class=\"divider\"></li>\n        <li class=\"nav-title\">\n          Information\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/categories']\"><i class=\"icon-tag\"></i> Categories <span class=\"badge badge-info\"></span></a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/devices']\"><i class=\"icon-energy\"></i> Devices <span class=\"badge badge-info\"></span></a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/messages']\"><i class=\"icon-compass\"></i> Messages <span class=\"badge badge-info\"></span></a>\n        </li>\n        <li class=\"nav-title\">\n          More\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/parsers']\"><i class=\"icon-calculator\"></i> Parsers <span class=\"badge badge-info\"></span></a>\n        </li>\n        <li class=\"nav-item\">\n          <a class=\"nav-link\" routerLinkActive=\"active\" [routerLink]=\"['/base-stations']\"><i class=\"fa fa-server\"></i> Base Stations <span class=\"badge badge-info\"></span></a>\n        </li>\n\n      </ul>\n    </nav>\n  </div>\n\n  <!-- Main content -->\n  <main class=\"main\">\n\n    <!-- Breadcrumb -->\n    <ol class=\"breadcrumb\">\n      <breadcrumbs></breadcrumbs>\n    </ol>\n\n    <div class=\"container-fluid\">\n      <router-outlet></router-outlet>\n    </div>\n    <!-- /.conainer-fluid -->\n  </main>\n</div>\n\n<!--<footer class=\"app-footer\">-->\n<!--<a href=\"https://sigfoxfoundation.org\">Sigfox Foundation</a> &copy; 2017.-->\n<!--<span class=\"float-right\">Author: Louis Moreau</span>-->\n<!--</footer>-->\n"

/***/ }),

/***/ "../../../../../src/app/layouts/full-layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FullLayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_sdk_services_custom_User__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/User.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_sdk_models_User__ = __webpack_require__("../../../../../src/app/shared/sdk/models/User.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_sdk_services_custom_Device__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Device.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__shared_sdk_services_custom_Message__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Message.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var FullLayoutComponent = (function () {
    function FullLayoutComponent(userApi, deviceApi, messageApi, router) {
        this.userApi = userApi;
        this.deviceApi = deviceApi;
        this.messageApi = messageApi;
        this.router = router;
        this.user = new __WEBPACK_IMPORTED_MODULE_3__shared_sdk_models_User__["a" /* User */]();
        this.countDevices = 0;
        this.countMessages = 0;
        this.disabled = false;
        this.status = { isopen: false };
    }
    FullLayoutComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = this.userApi.getCachedCurrent();
        this.deviceApi.count().subscribe(function (result) {
            _this.countDevices = result.count;
        });
        this.messageApi.count().subscribe(function (result) {
            _this.countMessages = result.count;
        });
    };
    FullLayoutComponent.prototype.ngOnDestroy = function () {
    };
    FullLayoutComponent.prototype.toggled = function (open) {
        console.log('Dropdown is now: ', open);
    };
    FullLayoutComponent.prototype.toggleDropdown = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        this.status.isopen = !this.status.isopen;
    };
    FullLayoutComponent.prototype.onLogout = function () {
        var _this = this;
        this.userApi.logout().subscribe(function () {
            // some actions on logout
            _this.router.navigate(['/login']);
        });
    };
    return FullLayoutComponent;
}());
FullLayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/layouts/full-layout.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__shared_sdk_services_custom_User__["a" /* UserApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_sdk_services_custom_User__["a" /* UserApi */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__shared_sdk_services_custom_Device__["a" /* DeviceApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_sdk_services_custom_Device__["a" /* DeviceApi */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_5__shared_sdk_services_custom_Message__["a" /* MessageApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__shared_sdk_services_custom_Message__["a" /* MessageApi */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* Router */]) === "function" && _d || Object])
], FullLayoutComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=full-layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/layouts/simple-layout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SimpleLayoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SimpleLayoutComponent = (function () {
    function SimpleLayoutComponent() {
    }
    SimpleLayoutComponent.prototype.ngOnInit = function () { };
    return SimpleLayoutComponent;
}());
SimpleLayoutComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-dashboard',
        template: '<router-outlet></router-outlet>',
    }),
    __metadata("design:paramtypes", [])
], SimpleLayoutComponent);

//# sourceMappingURL=simple-layout.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/aside.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AsideToggleDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Allows the aside to be toggled via click.
*/
var AsideToggleDirective = (function () {
    function AsideToggleDirective() {
    }
    AsideToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('aside-menu-hidden');
    };
    return AsideToggleDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AsideToggleDirective.prototype, "toggleOpen", null);
AsideToggleDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '.aside-menu-toggler',
    }),
    __metadata("design:paramtypes", [])
], AsideToggleDirective);

//# sourceMappingURL=aside.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/breadcrumb.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BreadcrumbsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__ = __webpack_require__("../../../../rxjs/add/operator/filter.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_filter__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var BreadcrumbsComponent = (function () {
    function BreadcrumbsComponent(router, route) {
        this.router = router;
        this.route = route;
    }
    BreadcrumbsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.router.events.filter(function (event) { return event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* NavigationEnd */]; }).subscribe(function (event) {
            _this.breadcrumbs = [];
            var currentRoute = _this.route.root, url = '';
            do {
                var childrenRoutes = currentRoute.children;
                currentRoute = null;
                childrenRoutes.forEach(function (route) {
                    if (route.outlet === 'primary') {
                        var routeSnapshot = route.snapshot;
                        url += '/' + routeSnapshot.url.map(function (segment) { return segment.path; }).join('/');
                        _this.breadcrumbs.push({
                            label: route.snapshot.data,
                            url: url
                        });
                        currentRoute = route;
                    }
                });
            } while (currentRoute);
        });
    };
    return BreadcrumbsComponent;
}());
BreadcrumbsComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'breadcrumbs',
        template: "\n  <ng-template ngFor let-breadcrumb [ngForOf]=\"breadcrumbs\" let-last = last>\n    <li class=\"breadcrumb-item\" *ngIf=\"breadcrumb.label.title&&breadcrumb.url.substring(breadcrumb.url.length-1) == '/' || breadcrumb.label.title&&last\" [ngClass]=\"{active: last}\">\n      <a *ngIf=\"!last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</a>\n      <span *ngIf=\"last\" [routerLink]=\"breadcrumb.url\">{{breadcrumb.label.title}}</span>\n    </li>\n  </ng-template>"
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */]) === "function" && _b || Object])
], BreadcrumbsComponent);

var _a, _b;
//# sourceMappingURL=breadcrumb.component.js.map

/***/ }),

/***/ "../../../../../src/app/shared/nav-dropdown.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export NavDropdownDirective */
/* unused harmony export NavDropdownToggleDirective */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NAV_DROPDOWN_DIRECTIVES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NavDropdownDirective = (function () {
    function NavDropdownDirective() {
        this._open = false;
    }
    /**
    * Checks if the dropdown menu is open or not.
    */
    NavDropdownDirective.prototype.isOpen = function () { return this._open; };
    /**
    * Opens the dropdown menu.
    */
    NavDropdownDirective.prototype.open = function () {
        this._open = true;
    };
    /**
    * Closes the dropdown menu .
    */
    NavDropdownDirective.prototype.close = function () {
        this._open = false;
    };
    /**
    * Toggles the dropdown menu.
    */
    NavDropdownDirective.prototype.toggle = function () {
        if (this.isOpen()) {
            this.close();
        }
        else {
            this.open();
        }
    };
    return NavDropdownDirective;
}());
NavDropdownDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '.nav-dropdown',
        host: {
            '[class.open]': '_open',
        }
    })
], NavDropdownDirective);

/**
* Allows the dropdown to be toggled via click.
*/
var NavDropdownToggleDirective = (function () {
    function NavDropdownToggleDirective(dropdown) {
        this.dropdown = dropdown;
    }
    NavDropdownToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        this.dropdown.toggle();
    };
    return NavDropdownToggleDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], NavDropdownToggleDirective.prototype, "toggleOpen", null);
NavDropdownToggleDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '.nav-dropdown-toggle',
    }),
    __metadata("design:paramtypes", [NavDropdownDirective])
], NavDropdownToggleDirective);

var NAV_DROPDOWN_DIRECTIVES = [NavDropdownDirective, NavDropdownToggleDirective];
// export const NGB_DROPDOWN_DIRECTIVES = [NgbDropdownToggle, NgbDropdown];
//# sourceMappingURL=nav-dropdown.directive.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SDKBrowserModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__services_core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_custom_logger_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/logger.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_custom_SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__storage_storage_swaps__ = __webpack_require__("../../../../../src/app/shared/sdk/storage/storage.swaps.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__storage_cookie_browser__ = __webpack_require__("../../../../../src/app/shared/sdk/storage/cookie.browser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__storage_storage_browser__ = __webpack_require__("../../../../../src/app/shared/sdk/storage/storage.browser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__sockets_socket_browser__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.browser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__sockets_socket_driver__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.driver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_core_real_time__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/real.time.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_custom_AccessToken__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/AccessToken.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_custom_RoleMapping__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/RoleMapping.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_custom_Role__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Role.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_custom_Device__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Device.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_custom_Parser__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Parser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__services_custom_Category__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Category.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_custom_Message__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_custom_BaseStation__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/BaseStation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_custom_MessageProperty__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/MessageProperty.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_custom_User__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/User.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__models_index__ = __webpack_require__("../../../../../src/app/shared/sdk/models/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__services_index__ = __webpack_require__("../../../../../src/app/shared/sdk/services/index.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_27__lb_config__["a"]; });
/* unused harmony namespace reexport */
/* unused harmony reexport CookieBrowser */
/* unused harmony reexport StorageBrowser */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/**
* @module SDKModule
* @author Jonathan Casarrubias <t:@johncasarrubias> <gh:jonathan-casarrubias>
* @license MIT 2016 Jonathan Casarrubias
* @version 2.1.0
* @description
* The SDKModule is a generated Software Development Kit automatically built by
* the LoopBack SDK Builder open source module.
*
* The SDKModule provides Angular 2 >= RC.5 support, which means that NgModules
* can import this Software Development Kit as follows:
*
*
* APP Route Module Context
* ============================================================================
* import { NgModule }       from '@angular/core';
* import { BrowserModule }  from '@angular/platform-browser';
* // App Root
* import { AppComponent }   from './app.component';
* // Feature Modules
* import { SDK[Browser|Node|Native]Module } from './shared/sdk/sdk.module';
* // Import Routing
* import { routing }        from './app.routing';
* @NgModule({
*  imports: [
*    BrowserModule,
*    routing,
*    SDK[Browser|Node|Native]Module.forRoot()
*  ],
*  declarations: [ AppComponent ],
*  bootstrap:    [ AppComponent ]
* })
* export class AppModule { }
*
**/

























/**
* @module SDKBrowserModule
* @description
* This module should be imported when building a Web Application in the following scenarios:
*
*  1.- Regular web application
*  2.- Angular universal application (Browser Portion)
*  3.- Progressive applications (Angular Mobile, Ionic, WebViews, etc)
**/
var SDKBrowserModule = SDKBrowserModule_1 = (function () {
    function SDKBrowserModule() {
    }
    SDKBrowserModule.forRoot = function (internalStorageProvider) {
        if (internalStorageProvider === void 0) { internalStorageProvider = {
            provide: __WEBPACK_IMPORTED_MODULE_5__storage_storage_swaps__["a" /* InternalStorage */],
            useClass: __WEBPACK_IMPORTED_MODULE_9__storage_cookie_browser__["a" /* CookieBrowser */]
        }; }
        return {
            ngModule: SDKBrowserModule_1,
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__services_core_auth_service__["a" /* LoopBackAuth */],
                __WEBPACK_IMPORTED_MODULE_3__services_custom_logger_service__["a" /* LoggerService */],
                __WEBPACK_IMPORTED_MODULE_0__services_core_search_params__["a" /* JSONSearchParams */],
                __WEBPACK_IMPORTED_MODULE_4__services_custom_SDKModels__["a" /* SDKModels */],
                __WEBPACK_IMPORTED_MODULE_14__services_core_real_time__["a" /* RealTime */],
                __WEBPACK_IMPORTED_MODULE_15__services_custom_AccessToken__["a" /* AccessTokenApi */],
                __WEBPACK_IMPORTED_MODULE_16__services_custom_RoleMapping__["a" /* RoleMappingApi */],
                __WEBPACK_IMPORTED_MODULE_17__services_custom_Role__["a" /* RoleApi */],
                __WEBPACK_IMPORTED_MODULE_18__services_custom_Device__["a" /* DeviceApi */],
                __WEBPACK_IMPORTED_MODULE_19__services_custom_Parser__["a" /* ParserApi */],
                __WEBPACK_IMPORTED_MODULE_20__services_custom_Category__["a" /* CategoryApi */],
                __WEBPACK_IMPORTED_MODULE_21__services_custom_Message__["a" /* MessageApi */],
                __WEBPACK_IMPORTED_MODULE_22__services_custom_BaseStation__["a" /* BaseStationApi */],
                __WEBPACK_IMPORTED_MODULE_23__services_custom_MessageProperty__["a" /* MessagePropertyApi */],
                __WEBPACK_IMPORTED_MODULE_24__services_custom_User__["a" /* UserApi */],
                internalStorageProvider,
                { provide: __WEBPACK_IMPORTED_MODULE_5__storage_storage_swaps__["b" /* SDKStorage */], useClass: __WEBPACK_IMPORTED_MODULE_10__storage_storage_browser__["a" /* StorageBrowser */] },
                { provide: __WEBPACK_IMPORTED_MODULE_12__sockets_socket_driver__["a" /* SocketDriver */], useClass: __WEBPACK_IMPORTED_MODULE_11__sockets_socket_browser__["a" /* SocketBrowser */] }
            ]
        };
    };
    return SDKBrowserModule;
}());
SDKBrowserModule = SDKBrowserModule_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_8__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_7__angular_common__["CommonModule"], __WEBPACK_IMPORTED_MODULE_6__angular_http__["c" /* HttpModule */]],
        declarations: [],
        exports: [],
        providers: [
            __WEBPACK_IMPORTED_MODULE_1__services_core_error_service__["a" /* ErrorHandler */],
            __WEBPACK_IMPORTED_MODULE_13__sockets_socket_connections__["a" /* SocketConnection */]
        ]
    })
], SDKBrowserModule);

/**
* Have Fun!!!
* - Jon
**/






var SDKBrowserModule_1;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/lb.config.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoopBackConfig; });
/* tslint:disable */
/**
* @module LoopBackConfig
* @description
*
* The LoopBackConfig module help developers to externally
* configure the base url and api version for loopback.io
*
* Example
*
* import { LoopBackConfig } from './sdk';
*
* @Component() // No metadata needed for this module
*
* export class MyApp {
*   constructor() {
*     LoopBackConfig.setBaseURL('http://localhost:3000');
*     LoopBackConfig.setApiVersion('api');
*   }
* }
**/
var LoopBackConfig = (function () {
    function LoopBackConfig() {
    }
    LoopBackConfig.setApiVersion = function (version) {
        if (version === void 0) { version = 'api'; }
        LoopBackConfig.version = version;
    };
    LoopBackConfig.getApiVersion = function () {
        return LoopBackConfig.version;
    };
    LoopBackConfig.setBaseURL = function (url) {
        if (url === void 0) { url = '/'; }
        LoopBackConfig.path = url;
    };
    LoopBackConfig.getPath = function () {
        return LoopBackConfig.path;
    };
    LoopBackConfig.setAuthPrefix = function (authPrefix) {
        if (authPrefix === void 0) { authPrefix = ''; }
        LoopBackConfig.authPrefix = authPrefix;
    };
    LoopBackConfig.getAuthPrefix = function () {
        return LoopBackConfig.authPrefix;
    };
    LoopBackConfig.setDebugMode = function (isEnabled) {
        LoopBackConfig.debug = isEnabled;
    };
    LoopBackConfig.debuggable = function () {
        return LoopBackConfig.debug;
    };
    LoopBackConfig.filterOnUrl = function () {
        LoopBackConfig.filterOn = 'url';
    };
    LoopBackConfig.filterOnHeaders = function () {
        LoopBackConfig.filterOn = 'headers';
    };
    LoopBackConfig.isHeadersFilteringSet = function () {
        return (LoopBackConfig.filterOn === 'headers');
    };
    LoopBackConfig.setSecureWebSockets = function () {
        LoopBackConfig.secure = true;
    };
    LoopBackConfig.unsetSecureWebSockets = function () {
        LoopBackConfig.secure = false;
    };
    LoopBackConfig.isSecureWebSocketsSet = function () {
        return LoopBackConfig.secure;
    };
    return LoopBackConfig;
}());

LoopBackConfig.path = '//0.0.0.0:3000';
LoopBackConfig.version = 'api';
LoopBackConfig.authPrefix = '';
LoopBackConfig.debug = true;
LoopBackConfig.filterOn = 'headers';
LoopBackConfig.secure = false;
//# sourceMappingURL=lb.config.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/AccessToken.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccessToken; });
var AccessToken = (function () {
    function AccessToken(data) {
        this["id"] = '';
        this["ttl"] = 1209600;
        this["scopes"] = [];
        this["created"] = new Date(0);
        this["userId"] = 0;
        this.user = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    AccessToken.getModelName = function () {
        return "AccessToken";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of AccessToken for dynamic purposes.
    **/
    AccessToken.factory = function (data) {
        return new AccessToken(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    AccessToken.getModelDefinition = function () {
        return {
            name: 'AccessToken',
            plural: 'AccessTokens',
            path: 'AccessTokens',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "ttl": {
                    name: 'ttl',
                    type: 'number',
                    default: 1209600
                },
                "scopes": {
                    name: 'scopes',
                    type: 'Array&lt;any&gt;'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "userId": {
                    name: 'userId',
                    type: 'number'
                },
            },
            relations: {
                user: {
                    name: 'user',
                    type: 'User',
                    model: 'User'
                },
            }
        };
    };
    return AccessToken;
}());

//# sourceMappingURL=AccessToken.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/BaseModels.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SDKToken; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AccessToken__ = __webpack_require__("../../../../../src/app/shared/sdk/models/AccessToken.ts");
/* unused harmony namespace reexport */
/* tslint:disable */

var SDKToken = (function () {
    function SDKToken(data) {
        this.id = null;
        this.ttl = null;
        this.scopes = null;
        this.created = null;
        this.userId = null;
        this.user = null;
        this.rememberMe = null;
        Object.assign(this, data);
    }
    return SDKToken;
}());

//# sourceMappingURL=BaseModels.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/BaseStation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseStation; });
var BaseStation = (function () {
    function BaseStation(data) {
        this["geolocation"] = null;
        this["id"] = 0;
        this["messageId"] = 0;
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this.Message = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `BaseStation`.
     */
    BaseStation.getModelName = function () {
        return "BaseStation";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of BaseStation for dynamic purposes.
    **/
    BaseStation.factory = function (data) {
        return new BaseStation(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    BaseStation.getModelDefinition = function () {
        return {
            name: 'BaseStation',
            plural: 'BaseStations',
            path: 'BaseStations',
            properties: {
                "geolocation": {
                    name: 'geolocation',
                    type: 'GeoPoint'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "messageId": {
                    name: 'messageId',
                    type: 'number'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
            },
            relations: {
                Message: {
                    name: 'Message',
                    type: 'Message[]',
                    model: 'Message'
                },
            }
        };
    };
    return BaseStation;
}());

//# sourceMappingURL=BaseStation.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/Category.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Category; });
var Category = (function () {
    function Category(data) {
        this["name"] = '';
        this["properties"] = null;
        this["id"] = 0;
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this.Devices = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Category`.
     */
    Category.getModelName = function () {
        return "Category";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Category for dynamic purposes.
    **/
    Category.factory = function (data) {
        return new Category(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Category.getModelDefinition = function () {
        return {
            name: 'Category',
            plural: 'Categories',
            path: 'Categories',
            properties: {
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "properties": {
                    name: 'properties',
                    type: 'any'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
            },
            relations: {
                Devices: {
                    name: 'Devices',
                    type: 'Device[]',
                    model: 'Device'
                },
            }
        };
    };
    return Category;
}());

//# sourceMappingURL=Category.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/Device.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Device; });
var Device = (function () {
    function Device(data) {
        this["id"] = '';
        this["creation"] = new Date(0);
        this["name"] = '';
        this["dl_payload"] = '';
        this["last_known_location"] = null;
        this["properties"] = [];
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this["parserId"] = 0;
        this["ParserId"] = 0;
        this["categoryId"] = 0;
        this["CategoryId"] = 0;
        this.Parser = null;
        this.Category = null;
        this.Messages = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Device`.
     */
    Device.getModelName = function () {
        return "Device";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Device for dynamic purposes.
    **/
    Device.factory = function (data) {
        return new Device(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Device.getModelDefinition = function () {
        return {
            name: 'Device',
            plural: 'Devices',
            path: 'Devices',
            properties: {
                "id": {
                    name: 'id',
                    type: 'string'
                },
                "creation": {
                    name: 'creation',
                    type: 'Date'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "dl_payload": {
                    name: 'dl_payload',
                    type: 'string'
                },
                "last_known_location": {
                    name: 'last_known_location',
                    type: 'GeoPoint'
                },
                "properties": {
                    name: 'properties',
                    type: 'Array&lt;any&gt;'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
                "parserId": {
                    name: 'parserId',
                    type: 'number'
                },
                "ParserId": {
                    name: 'ParserId',
                    type: 'number'
                },
                "categoryId": {
                    name: 'categoryId',
                    type: 'number'
                },
                "CategoryId": {
                    name: 'CategoryId',
                    type: 'number'
                },
            },
            relations: {
                Parser: {
                    name: 'Parser',
                    type: 'Parser',
                    model: 'Parser'
                },
                Category: {
                    name: 'Category',
                    type: 'Category',
                    model: 'Category'
                },
                Messages: {
                    name: 'Messages',
                    type: 'Message[]',
                    model: 'Message'
                },
            }
        };
    };
    return Device;
}());

//# sourceMappingURL=Device.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/FireLoop.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FireLoop; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__index__ = __webpack_require__("../../../../../src/app/shared/sdk/models/index.ts");

var FireLoop = (function () {
    function FireLoop(socket, models) {
        this.socket = socket;
        this.models = models;
        this.references = {};
    }
    FireLoop.prototype.ref = function (model) {
        var name = model.getModelName();
        model.models = this.models;
        this.references[name] = new __WEBPACK_IMPORTED_MODULE_0__index__["c" /* FireLoopRef */](model, this.socket);
        return this.references[name];
    };
    return FireLoop;
}());

//# sourceMappingURL=FireLoop.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/FireLoopRef.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FireLoopRef; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__ = __webpack_require__("../../../../rxjs/Rx.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__);


/**
 * @class FireLoopRef<T>
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * This class allows to create FireLoop References which will be in sync with
 * Server. It also allows to create FireLoop Reference Childs, that allows to
 * persist data according the generic model relationships.
 **/
var FireLoopRef = (function () {
    /**
    * @method constructor
    * @param {any} model The model we want to create a reference
    * @param {SocketConnection} socket Socket connection to handle events
    * @param {FireLoopRef<any>} parent Parent FireLoop model reference
    * @param {string} relationship The defined model relationship
    * @description
    * The constructor will receive the required parameters and then will register this reference
    * into the server, needed to allow multiple references for the same model.
    * This ids are referenced into this specific client connection and won't have issues
    * with other client ids.
    **/
    function FireLoopRef(model, socket, parent, relationship) {
        if (parent === void 0) { parent = null; }
        if (relationship === void 0) { relationship = null; }
        this.model = model;
        this.socket = socket;
        this.parent = parent;
        this.relationship = relationship;
        // Reference ID
        this.id = this.buildId();
        // Model Childs
        this.childs = {};
        // Disposable Events
        this.disposable = {};
        this.socket.emit("Subscribe." + (!parent ? model.getModelName() : parent.model.getModelName()), { id: this.id, scope: model.getModelName(), relationship: relationship });
        return this;
    }
    /**
    * @method dispose
    * @return {void}
    * @description
    * This method is super important to avoid memory leaks in the server.
    * This method requires to be called on components destroy
    *
    * ngOnDestroy() {
    *  this.someRef.dispose()
    * }
    **/
    FireLoopRef.prototype.dispose = function () {
        var _this = this;
        var subscription = this.operation('dispose', {}).subscribe(function () {
            Object.keys(_this.disposable).forEach(function (channel) {
                _this.socket.removeListener(channel, _this.disposable[channel]);
                _this.socket.removeAllListeners(channel);
            });
            subscription.unsubscribe();
        });
    };
    /**
    * @method upsert
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for upsert function.
    **/
    FireLoopRef.prototype.upsert = function (data) {
        return this.operation('upsert', data);
    };
    /**
    * @method create
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for create function.
    **/
    FireLoopRef.prototype.create = function (data) {
        return this.operation('create', data);
    };
    /**
    * @method remove
    * @param {T} data Persisted model instance
    * @return {Observable<T>}
    * @description
    * Operation wrapper for remove function.
    **/
    FireLoopRef.prototype.remove = function (data) {
        return this.operation('remove', data);
    };
    /**
    * @method remote
    * @param {string} method Remote method name
    * @param {any[]=} params Parameters to be applied into the remote method
    * @param {boolean} broadcast Flag to define if the method results should be broadcasted
    * @return {Observable<any>}
    * @description
    * This method calls for any remote method. It is flexible enough to
    * allow you call either built-in or custom remote methods.
    *
    * FireLoop provides this interface to enable calling remote methods
    * but also to optionally send any defined accept params that will be
    * applied within the server.
    **/
    FireLoopRef.prototype.remote = function (method, params, broadcast) {
        if (broadcast === void 0) { broadcast = false; }
        return this.operation('remote', { method: method, params: params, broadcast: broadcast });
    };
    /**
    * @method onRemote
    * @param {string} method Remote method name
    * @return {Observable<any>}
    * @description
    * This method listen for public broadcasted remote method results. If the remote method
    * execution is not public only the owner will receive the result data.
    **/
    FireLoopRef.prototype.onRemote = function (method) {
        var event = 'remote';
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event;
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
        }
        return this.broadcasts(event, {});
    };
    /**
    * @method on
    * @param {string} event Event name
    * @param {LoopBackFilter} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for different type of events. Valid events are:
    *   - change (Triggers on any model change -create, update, remove-)
    *   - value (Triggers on new entries)
    *   - child_added (Triggers when a child is added)
    *   - child_updated (Triggers when a child is updated)
    *   - child_removed (Triggers when a child is removed)
    **/
    FireLoopRef.prototype.on = function (event, filter) {
        if (filter === void 0) { filter = { limit: 100, order: 'id DESC' }; }
        if (event === 'remote') {
            throw new Error('The "remote" event is not allowed using "on()" method, use "onRemote()" instead');
        }
        var request;
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event;
            request = { filter: filter };
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event;
            request = { filter: filter, parent: this.parent.instance };
        }
        if (event.match(/(value|change|stats)/)) {
            return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].merge(this.pull(event, request), this.broadcasts(event, request));
        }
        else {
            return this.broadcasts(event, request);
        }
    };
    /**
    * @method stats
    * @param {LoopBackFilter=} filter LoopBack query filter
    * @return {Observable<T>}
    * @description
    * Listener for real-time statistics, will trigger on every
    * statistic modification.
    * TIP: You can improve performance by adding memcached to LoopBack models.
    **/
    FireLoopRef.prototype.stats = function (filter) {
        return this.on('stats', filter);
    };
    /**
    * @method make
    * @param {any} instance Persisted model instance reference
    * @return {Observable<T>}
    * @description
    * This method will set a model instance into this a new FireLoop Reference.
    * This allows to persiste parentship when creating related instances.
    *
    * It also allows to have multiple different persisted instance references to same model.
    * otherwise if using singleton will replace a previous instance for a new instance, when
    * we actually want to have more than 1 instance of same model.
    **/
    FireLoopRef.prototype.make = function (instance) {
        var reference = new FireLoopRef(this.model, this.socket);
        reference.instance = instance;
        return reference;
    };
    /**
    * @method child
    * @param {string} relationship A defined model relationship
    * @return {FireLoopRef<T>}
    * @description
    * This method creates child references, which will persist related model
    * instances. e.g. Room.messages, where messages belongs to a specific Room.
    **/
    FireLoopRef.prototype.child = function (relationship) {
        // Return singleton instance
        if (this.childs[relationship]) {
            return this.childs[relationship];
        }
        // Try to get relation settings from current model
        var settings = this.model.getModelDefinition().relations[relationship];
        // Verify the relationship actually exists
        if (!settings) {
            throw new Error("Invalid model relationship " + this.model.getModelName() + " <-> " + relationship + ", verify your model settings.");
        }
        // Verify if the relationship model is public
        if (settings.model === '') {
            throw new Error("Relationship model is private, cam't use " + relationship + " unless you set your model as public.");
        }
        // Lets get a model reference and add a reference for all of the models
        var model = this.model.models.get(settings.model);
        model.models = this.model.models;
        // If everything goes well, we will store a child reference and return it.
        this.childs[relationship] = new FireLoopRef(model, this.socket, this, relationship);
        return this.childs[relationship];
    };
    /**
    * @method pull
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This method will pull initial data from server
    **/
    FireLoopRef.prototype.pull = function (event, request) {
        var sbj = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        var that = this;
        var nowEvent = event + ".pull.requested." + this.id;
        this.socket.emit(event + ".pull.request." + this.id, request);
        function pullNow(data) {
            if (that.socket.removeListener) {
                that.socket.removeListener(nowEvent, pullNow);
            }
            sbj.next(data);
        }
        ;
        this.socket.on(nowEvent, pullNow);
        return sbj.asObservable();
    };
    /**
    * @method broadcasts
    * @param {string} event Event name
    * @param {any} request Type of request, can be LB-only filter or FL+LB filter
    * @return {Observable<T>}
    * @description
    * This will listen for public broadcasts announces and then request
    * for data according a specific client request, not shared with other clients.
    **/
    FireLoopRef.prototype.broadcasts = function (event, request) {
        var sbj = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        var channels = {
            announce: event + ".broadcast.announce." + this.id,
            broadcast: event + ".broadcast." + this.id
        };
        var that = this;
        // Announces Handler
        this.disposable[channels.announce] = function (res) {
            that.socket.emit(event + ".broadcast.request." + that.id, request);
        };
        // Broadcasts Handler
        this.disposable[channels.broadcast] = function (data) {
            sbj.next(data);
        };
        this.socket.on(channels.announce, this.disposable[channels.announce]);
        this.socket.on(channels.broadcast, this.disposable[channels.broadcast]);
        return sbj.asObservable();
    };
    /**
    * @method operation
    * @param {string} event Event name
    * @param {any} data Any type of data sent to the server
    * @return {Observable<T>}
    * @description
    * This internal method will run operations depending on current context
    **/
    FireLoopRef.prototype.operation = function (event, data) {
        if (!this.relationship) {
            event = this.model.getModelName() + "." + event + "." + this.id;
        }
        else {
            event = this.parent.model.getModelName() + "." + this.relationship + "." + event + "." + this.id;
        }
        var subject = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        var config = {
            data: data,
            parent: this.parent && this.parent.instance ? this.parent.instance : null
        };
        this.socket.emit(event, config);
        var resultEvent = '';
        if (!this.relationship) {
            resultEvent = this.model.getModelName() + ".value.result." + this.id;
        }
        else {
            resultEvent = this.parent.model.getModelName() + "." + this.relationship + ".value.result." + this.id;
        }
        this.socket.on(resultEvent, function (res) {
            if (res.error) {
                subject.error(res);
            }
            else {
                subject.next(res);
            }
        });
        if (event.match('dispose')) {
            setTimeout(function () { return subject.next(); });
        }
        // This event listener will be wiped within socket.connections
        this.socket.sharedObservables.sharedOnDisconnect.subscribe(function () { return subject.complete(); });
        return subject.asObservable().catch(function (error) { return __WEBPACK_IMPORTED_MODULE_1_rxjs_Rx__["Observable"].throw(error); });
    };
    /**
    * @method buildId
    * @return {number}
    * @description
    * This internal method build an ID for this reference, this allows to have
    * multiple references for the same model or relationships.
    **/
    FireLoopRef.prototype.buildId = function () {
        return Date.now() + Math.floor(Math.random() * 100800) *
            Math.floor(Math.random() * 100700) *
            Math.floor(Math.random() * 198500);
    };
    return FireLoopRef;
}());

//# sourceMappingURL=FireLoopRef.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/Message.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });
var Message = (function () {
    function Message(data) {
        this["data"] = '';
        this["time"] = 0;
        this["RSSI"] = 0;
        this["seqNumber"] = 0;
        this["GPS"] = null;
        this["geoloc_sigfox"] = null;
        this["parsed_data"] = null;
        this["id"] = 0;
        this["DeviceId"] = '';
        this["deviceId"] = '';
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this["baseStationId"] = 0;
        this.Device = null;
        this.BaseStation = null;
        this.MessageProperty = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Message`.
     */
    Message.getModelName = function () {
        return "Message";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Message for dynamic purposes.
    **/
    Message.factory = function (data) {
        return new Message(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Message.getModelDefinition = function () {
        return {
            name: 'Message',
            plural: 'Messages',
            path: 'Messages',
            properties: {
                "data": {
                    name: 'data',
                    type: 'string'
                },
                "time": {
                    name: 'time',
                    type: 'number'
                },
                "RSSI": {
                    name: 'RSSI',
                    type: 'number'
                },
                "seqNumber": {
                    name: 'seqNumber',
                    type: 'number'
                },
                "GPS": {
                    name: 'GPS',
                    type: 'any'
                },
                "geoloc_sigfox": {
                    name: 'geoloc_sigfox',
                    type: 'any'
                },
                "parsed_data": {
                    name: 'parsed_data',
                    type: 'any'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "DeviceId": {
                    name: 'DeviceId',
                    type: 'string'
                },
                "deviceId": {
                    name: 'deviceId',
                    type: 'string'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
                "baseStationId": {
                    name: 'baseStationId',
                    type: 'number'
                },
            },
            relations: {
                Device: {
                    name: 'Device',
                    type: 'Device',
                    model: 'Device'
                },
                BaseStation: {
                    name: 'BaseStation',
                    type: 'BaseStation[]',
                    model: 'BaseStation'
                },
                MessageProperty: {
                    name: 'MessageProperty',
                    type: 'MessageProperty[]',
                    model: 'MessageProperty'
                },
            }
        };
    };
    return Message;
}());

//# sourceMappingURL=Message.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/MessageProperty.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageProperty; });
var MessageProperty = (function () {
    function MessageProperty(data) {
        this["key"] = '';
        this["value"] = '';
        this["id"] = 0;
        this["MessageId"] = 0;
        this["messageId"] = 0;
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this.Message = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `MessageProperty`.
     */
    MessageProperty.getModelName = function () {
        return "MessageProperty";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of MessageProperty for dynamic purposes.
    **/
    MessageProperty.factory = function (data) {
        return new MessageProperty(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    MessageProperty.getModelDefinition = function () {
        return {
            name: 'MessageProperty',
            plural: 'MessageProperties',
            path: 'MessageProperties',
            properties: {
                "key": {
                    name: 'key',
                    type: 'string'
                },
                "value": {
                    name: 'value',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "MessageId": {
                    name: 'MessageId',
                    type: 'number'
                },
                "messageId": {
                    name: 'messageId',
                    type: 'number'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
            },
            relations: {
                Message: {
                    name: 'Message',
                    type: 'Message',
                    model: 'Message'
                },
            }
        };
    };
    return MessageProperty;
}());

//# sourceMappingURL=MessageProperty.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/Parser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Parser; });
var Parser = (function () {
    function Parser(data) {
        this["name"] = '';
        this["description"] = '';
        this["function"] = '';
        this["id"] = 0;
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this.Devices = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Parser`.
     */
    Parser.getModelName = function () {
        return "Parser";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Parser for dynamic purposes.
    **/
    Parser.factory = function (data) {
        return new Parser(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Parser.getModelDefinition = function () {
        return {
            name: 'Parser',
            plural: 'Parsers',
            path: 'Parsers',
            properties: {
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "function": {
                    name: 'function',
                    type: 'string'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
            },
            relations: {
                Devices: {
                    name: 'Devices',
                    type: 'Device[]',
                    model: 'Device'
                },
            }
        };
    };
    return Parser;
}());

//# sourceMappingURL=Parser.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/Role.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Role; });
var Role = (function () {
    function Role(data) {
        this["id"] = 0;
        this["name"] = '';
        this["description"] = '';
        this["created"] = new Date(0);
        this["modified"] = new Date(0);
        this.principals = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `Role`.
     */
    Role.getModelName = function () {
        return "Role";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of Role for dynamic purposes.
    **/
    Role.factory = function (data) {
        return new Role(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    Role.getModelDefinition = function () {
        return {
            name: 'Role',
            plural: 'Roles',
            path: 'Roles',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "name": {
                    name: 'name',
                    type: 'string'
                },
                "description": {
                    name: 'description',
                    type: 'string'
                },
                "created": {
                    name: 'created',
                    type: 'Date'
                },
                "modified": {
                    name: 'modified',
                    type: 'Date'
                },
            },
            relations: {
                principals: {
                    name: 'principals',
                    type: 'RoleMapping[]',
                    model: 'RoleMapping'
                },
            }
        };
    };
    return Role;
}());

//# sourceMappingURL=Role.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/RoleMapping.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleMapping; });
var RoleMapping = (function () {
    function RoleMapping(data) {
        this["id"] = 0;
        this["principalType"] = '';
        this["principalId"] = '';
        this["roleId"] = 0;
        this.role = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `RoleMapping`.
     */
    RoleMapping.getModelName = function () {
        return "RoleMapping";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of RoleMapping for dynamic purposes.
    **/
    RoleMapping.factory = function (data) {
        return new RoleMapping(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    RoleMapping.getModelDefinition = function () {
        return {
            name: 'RoleMapping',
            plural: 'RoleMappings',
            path: 'RoleMappings',
            properties: {
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "principalType": {
                    name: 'principalType',
                    type: 'string'
                },
                "principalId": {
                    name: 'principalId',
                    type: 'string'
                },
                "roleId": {
                    name: 'roleId',
                    type: 'number'
                },
            },
            relations: {
                role: {
                    name: 'role',
                    type: 'Role',
                    model: 'Role'
                },
            }
        };
    };
    return RoleMapping;
}());

//# sourceMappingURL=RoleMapping.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/User.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return User; });
var User = (function () {
    function User(data) {
        this["avatar"] = '';
        this["realm"] = '';
        this["username"] = '';
        this["email"] = '';
        this["emailVerified"] = false;
        this["id"] = 0;
        this["createdAt"] = new Date(0);
        this["updatedAt"] = new Date(0);
        this["password"] = '';
        this.accessTokens = null;
        Object.assign(this, data);
    }
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    User.getModelName = function () {
        return "User";
    };
    /**
    * @method factory
    * @author Jonathan Casarrubias
    * @license MIT
    * This method creates an instance of User for dynamic purposes.
    **/
    User.factory = function (data) {
        return new User(data);
    };
    /**
    * @method getModelDefinition
    * @author Julien Ledun
    * @license MIT
    * This method returns an object that represents some of the model
    * definitions.
    **/
    User.getModelDefinition = function () {
        return {
            name: 'User',
            plural: 'users',
            path: 'users',
            properties: {
                "avatar": {
                    name: 'avatar',
                    type: 'string'
                },
                "realm": {
                    name: 'realm',
                    type: 'string'
                },
                "username": {
                    name: 'username',
                    type: 'string'
                },
                "email": {
                    name: 'email',
                    type: 'string'
                },
                "emailVerified": {
                    name: 'emailVerified',
                    type: 'boolean'
                },
                "id": {
                    name: 'id',
                    type: 'number'
                },
                "createdAt": {
                    name: 'createdAt',
                    type: 'Date'
                },
                "updatedAt": {
                    name: 'updatedAt',
                    type: 'Date'
                },
                "password": {
                    name: 'password',
                    type: 'string'
                },
            },
            relations: {
                accessTokens: {
                    name: 'accessTokens',
                    type: 'AccessToken[]',
                    model: 'AccessToken'
                },
            }
        };
    };
    return User;
}());

//# sourceMappingURL=User.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/models/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AccessToken__ = __webpack_require__("../../../../../src/app/shared/sdk/models/AccessToken.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RoleMapping__ = __webpack_require__("../../../../../src/app/shared/sdk/models/RoleMapping.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Role__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Role.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Device__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Device.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__Device__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Parser__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Parser.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__Parser__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Category__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Category.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__Category__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Message__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Message.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__Message__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__BaseStation__ = __webpack_require__("../../../../../src/app/shared/sdk/models/BaseStation.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MessageProperty__ = __webpack_require__("../../../../../src/app/shared/sdk/models/MessageProperty.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__User__ = __webpack_require__("../../../../../src/app/shared/sdk/models/User.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_9__User__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__BaseModels__ = __webpack_require__("../../../../../src/app/shared/sdk/models/BaseModels.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__FireLoopRef__ = __webpack_require__("../../../../../src/app/shared/sdk/models/FireLoopRef.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_11__FireLoopRef__["a"]; });
/* tslint:disable */












//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoopBackAuth; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__ = __webpack_require__("../../../../../src/app/shared/sdk/storage/storage.swaps.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_BaseModels__ = __webpack_require__("../../../../../src/app/shared/sdk/models/BaseModels.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
var LoopBackAuth = (function () {
    /**
     * @method constructor
     * @param {InternalStorage} storage Internal Storage Driver
     * @description
     * The constructor will initialize the token loading data from storage
     **/
    function LoopBackAuth(storage) {
        this.storage = storage;
        /**
         * @type {SDKToken}
         **/
        this.token = new __WEBPACK_IMPORTED_MODULE_2__models_BaseModels__["a" /* SDKToken */]();
        /**
         * @type {string}
         **/
        this.prefix = '$LoopBackSDK$';
        this.token.id = this.load('id');
        this.token.user = this.load('user');
        this.token.userId = this.load('userId');
        this.token.created = this.load('created');
        this.token.ttl = this.load('ttl');
        this.token.rememberMe = this.load('rememberMe');
    }
    /**
     * @method setRememberMe
     * @param {boolean} value Flag to remember credentials
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    LoopBackAuth.prototype.setRememberMe = function (value) {
        this.token.rememberMe = value;
    };
    /**
     * @method setUser
     * @param {any} user Any type of user model
     * @return {void}
     * @description
     * This method will update the user information and persist it if the
     * rememberMe flag is set.
     **/
    LoopBackAuth.prototype.setUser = function (user) {
        this.token.user = user;
        this.save();
    };
    /**
     * @method setToken
     * @param {SDKToken} token SDKToken or casted AccessToken instance
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials
     **/
    LoopBackAuth.prototype.setToken = function (token) {
        this.token = Object.assign(this.token, token);
        this.save();
    };
    /**
     * @method getToken
     * @return {void}
     * @description
     * This method will set a flag in order to remember the current credentials.
     **/
    LoopBackAuth.prototype.getToken = function () {
        return this.token;
    };
    /**
     * @method getAccessTokenId
     * @return {string}
     * @description
     * This method will return the actual token string, not the object instance.
     **/
    LoopBackAuth.prototype.getAccessTokenId = function () {
        return this.token.id;
    };
    /**
     * @method getCurrentUserId
     * @return {any}
     * @description
     * This method will return the current user id, it can be number or string.
     **/
    LoopBackAuth.prototype.getCurrentUserId = function () {
        return this.token.userId;
    };
    /**
     * @method getCurrentUserData
     * @return {any}
     * @description
     * This method will return the current user instance.
     **/
    LoopBackAuth.prototype.getCurrentUserData = function () {
        return (typeof this.token.user === 'string') ? JSON.parse(this.token.user) : this.token.user;
    };
    /**
     * @method save
     * @return {boolean} Whether or not the information was saved
     * @description
     * This method will save in either local storage or cookies the current credentials.
     * But only if rememberMe is enabled.
     **/
    LoopBackAuth.prototype.save = function () {
        if (this.token.rememberMe) {
            this.persist('id', this.token.id);
            this.persist('user', this.token.user);
            this.persist('userId', this.token.userId);
            this.persist('created', this.token.created);
            this.persist('ttl', this.token.ttl);
            this.persist('rememberMe', this.token.rememberMe);
            return true;
        }
        else {
            return false;
        }
    };
    ;
    /**
     * @method load
     * @param {string} prop Property name
     * @return {any} Any information persisted in storage
     * @description
     * This method will load either from local storage or cookies the provided property.
     **/
    LoopBackAuth.prototype.load = function (prop) {
        return this.storage.get("" + this.prefix + prop);
    };
    /**
     * @method clear
     * @return {void}
     * @description
     * This method will clear cookies or the local storage.
     **/
    LoopBackAuth.prototype.clear = function () {
        var _this = this;
        Object.keys(this.token).forEach(function (prop) { return _this.storage.remove("" + _this.prefix + prop); });
        this.token = new __WEBPACK_IMPORTED_MODULE_2__models_BaseModels__["a" /* SDKToken */]();
    };
    /**
     * @method persist
     * @return {void}
     * @description
     * This method saves values to storage
     **/
    LoopBackAuth.prototype.persist = function (prop, value) {
        try {
            this.storage.set("" + this.prefix + prop, (typeof value === 'object') ? JSON.stringify(value) : value);
        }
        catch (err) {
            console.error('Cannot access local/session storage:', err);
        }
    };
    return LoopBackAuth;
}());
LoopBackAuth = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__["a" /* InternalStorage */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__["a" /* InternalStorage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__storage_storage_swaps__["a" /* InternalStorage */]) === "function" && _a || Object])
], LoopBackAuth);

var _a;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/base.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseLoopBackApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */











/**
* @module BaseLoopBackApi
* @author Jonathan Casarrubias <@johncasarrubias> <github:jonathan-casarrubias>
* @author Nikolay Matiushenkov <https://github.com/mnvx>
* @license MIT
* @description
* Abstract class that will be implemented in every custom service automatically built
* by the sdk builder.
* It provides the core functionallity for every API call, either by HTTP Calls or by
* WebSockets.
**/
var BaseLoopBackApi = (function () {
    function BaseLoopBackApi(http, connection, models, auth, searchParams, errorHandler) {
        this.http = http;
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.searchParams = searchParams;
        this.errorHandler = errorHandler;
        this.model = this.models.get(this.getModelName());
    }
    /**
     * @method request
     * @param {string}  method      Request method (GET, POST, PUT)
     * @param {string}  url         Request url (my-host/my-url/:id)
     * @param {any}     routeParams Values of url parameters
     * @param {any}     urlParams   Parameters for building url (filter and other)
     * @param {any}     postBody    Request postBody
     * @return {Observable<any>}
     * @description
     * This is a core method, every HTTP Call will be done from here, every API Service will
     * extend this class and use this method to get RESTful communication.
     **/
    BaseLoopBackApi.prototype.request = function (method, url, routeParams, urlParams, postBody, pubsub, customHeaders) {
        var _this = this;
        if (routeParams === void 0) { routeParams = {}; }
        if (urlParams === void 0) { urlParams = {}; }
        if (postBody === void 0) { postBody = {}; }
        if (pubsub === void 0) { pubsub = false; }
        // Transpile route variables to the actual request Values
        Object.keys(routeParams).forEach(function (key) {
            url = url.replace(new RegExp(":" + key + "(\/|$)", "g"), routeParams[key] + "$1");
        });
        if (pubsub) {
            if (url.match(/fk/)) {
                var arr = url.split('/');
                arr.pop();
                url = arr.join('/');
            }
            var event = ("[" + method + "]" + url).replace(/\?/, '');
            var subject_1 = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
            this.connection.on(event, function (res) { return subject_1.next(res); });
            return subject_1.asObservable();
        }
        else {
            // Headers to be sent
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
            headers.append('Content-Type', 'application/json');
            // Authenticate request
            this.authenticate(url, headers);
            // Body fix for built in remote methods using "data", "options" or "credentials
            // that are the actual body, Custom remote method properties are different and need
            // to be wrapped into a body object
            var body = void 0;
            var postBodyKeys = typeof postBody === 'object' ? Object.keys(postBody) : [];
            if (postBodyKeys.length === 1) {
                body = postBody[postBodyKeys.shift()];
            }
            else {
                body = postBody;
            }
            var filter = '';
            // Separate filter object from url params and add to search query
            if (urlParams.filter) {
                if (__WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].isHeadersFilteringSet()) {
                    headers.append('filter', JSON.stringify(urlParams.filter));
                }
                else {
                    filter = "?filter=" + encodeURI(JSON.stringify(urlParams.filter));
                }
                delete urlParams.filter;
            }
            // Separate where object from url params and add to search query
            /**
            CODE BELOW WILL GENERATE THE FOLLOWING ISSUES:
            - https://github.com/mean-expert-official/loopback-sdk-builder/issues/356
            - https://github.com/mean-expert-official/loopback-sdk-builder/issues/328
            if (urlParams.where) {
              headers.append('where', JSON.stringify(urlParams.where));
              delete urlParams.where;
            }
            **/
            if (typeof customHeaders === 'function') {
                headers = customHeaders(headers);
            }
            this.searchParams.setJSON(urlParams);
            var request = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Request */](new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({
                headers: headers,
                method: method,
                url: "" + url + filter,
                search: Object.keys(urlParams).length > 0
                    ? this.searchParams.getURLSearchParams() : null,
                body: body ? JSON.stringify(body) : undefined
            }));
            return this.http.request(request)
                .map(function (res) { return (res.text() != "" ? res.json() : {}); })
                .catch(function (e) { return _this.errorHandler.handleError(e); });
        }
    };
    /**
     * @method authenticate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {string} url Server URL
     * @param {Headers} headers HTTP Headers
     * @return {void}
     * @description
     * This method will try to authenticate using either an access_token or basic http auth
     */
    BaseLoopBackApi.prototype.authenticate = function (url, headers) {
        if (this.auth.getAccessTokenId()) {
            headers.append('Authorization', __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getAuthPrefix() + this.auth.getAccessTokenId());
        }
    };
    /**
     * @method create
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic create method
     */
    BaseLoopBackApi.prototype.create = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub oncreate many method
     */
    BaseLoopBackApi.prototype.onCreate = function (data) {
        var _this = this;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method createMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.createMany = function (data, customHeaders) {
        var _this = this;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method onCreateMany
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {T[]} data Generic data type array
     * @return {Observable<T[]>}
     * @description
     * Generic create many method
     */
    BaseLoopBackApi.prototype.onCreateMany = function (data) {
        var _this = this;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, undefined, { data: data }, true)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method findById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @param {any} data Generic data type
     * @return {Observable<T>}
     * @description
     * Generic findById method
     */
    BaseLoopBackApi.prototype.findById = function (id, filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        var _urlParams = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, _urlParams, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method find
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[+>}
     * @description
     * Generic find method
     */
    BaseLoopBackApi.prototype.find = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .map(function (datum) { return datum.map(function (data) { return _this.model.factory(data); }); });
    };
    /**
     * @method exists
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic exists method
     */
    BaseLoopBackApi.prototype.exists = function (id, customHeaders) {
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id/exists'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders);
    };
    /**
     * @method findOne
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic findOne method
     */
    BaseLoopBackApi.prototype.findOne = function (filter, customHeaders) {
        var _this = this;
        if (filter === void 0) { filter = {}; }
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'findOne'
        ].join('/'), undefined, { filter: filter }, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method updateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic updateAll method
     */
    BaseLoopBackApi.prototype.updateAll = function (where, data, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders);
    };
    /**
     * @method onUpdateAll
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T[]>}
     * @description
     * Generic pubsub onUpdateAll method
     */
    BaseLoopBackApi.prototype.onUpdateAll = function (where, data) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'update'
        ].join('/'), undefined, _urlParams, { data: data }, true);
    };
    /**
     * @method deleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic deleteById method
     */
    BaseLoopBackApi.prototype.deleteById = function (id, customHeaders) {
        var _this = this;
        return this.request('DELETE', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onDeleteById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onDeleteById method
     */
    BaseLoopBackApi.prototype.onDeleteById = function (id) {
        var _this = this;
        return this.request('DELETE', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, undefined, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method count
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<{ count: number }>}
     * @description
     * Generic count method
     */
    BaseLoopBackApi.prototype.count = function (where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('GET', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'count'
        ].join('/'), undefined, _urlParams, undefined, null, customHeaders);
    };
    /**
     * @method updateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic updateAttributes method
     */
    BaseLoopBackApi.prototype.updateAttributes = function (id, data, customHeaders) {
        var _this = this;
        return this.request('PUT', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpdateAttributes
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onUpdateAttributes method
     */
    BaseLoopBackApi.prototype.onUpdateAttributes = function (id, data) {
        var _this = this;
        return this.request('PUT', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id'
        ].join('/'), { id: id }, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method
     */
    BaseLoopBackApi.prototype.upsert = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpsert
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsert method
     */
    BaseLoopBackApi.prototype.onUpsert = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PUT', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsert method using patch http method
     */
    BaseLoopBackApi.prototype.upsertPatch = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpsertPatch
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertPatch method using patch http method
     */
    BaseLoopBackApi.prototype.onUpsertPatch = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('PATCH', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method upsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic upsertWithWhere method
     */
    BaseLoopBackApi.prototype.upsertWithWhere = function (where, data, customHeaders) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onUpsertWithWhere
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic pubsub onUpsertWithWhere method
     */
    BaseLoopBackApi.prototype.onUpsertWithWhere = function (where, data) {
        var _this = this;
        if (where === void 0) { where = {}; }
        if (data === void 0) { data = {}; }
        var _urlParams = {};
        if (where)
            _urlParams.where = where;
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'upsertWithWhere'
        ].join('/'), undefined, _urlParams, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method replaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceOrCreate method
     */
    BaseLoopBackApi.prototype.replaceOrCreate = function (data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onReplaceOrCreate
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceOrCreate method
     */
    BaseLoopBackApi.prototype.onReplaceOrCreate = function (data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            'replaceOrCreate'
        ].join('/'), undefined, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method replaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic replaceById method
     */
    BaseLoopBackApi.prototype.replaceById = function (id, data, customHeaders) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, null, customHeaders)
            .map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method onReplaceById
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<T>}
     * @description
     * Generic onReplaceById method
     */
    BaseLoopBackApi.prototype.onReplaceById = function (id, data) {
        var _this = this;
        if (data === void 0) { data = {}; }
        return this.request('POST', [
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
            __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
            this.model.getModelDefinition().path,
            ':id', 'replace'
        ].join('/'), { id: id }, undefined, { data: data }, true).map(function (data) { return _this.model.factory(data); });
    };
    /**
     * @method createChangeStream
     * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
     * @license MIT
     * @return {Observable<any>}
     * @description
     * Generic createChangeStream method
     */
    BaseLoopBackApi.prototype.createChangeStream = function () {
        var subject = new __WEBPACK_IMPORTED_MODULE_7_rxjs_Subject__["Subject"]();
        if (typeof EventSource !== 'undefined') {
            var emit = function (msg) { return subject.next(JSON.parse(msg.data)); };
            var source = new EventSource([
                __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getPath(),
                __WEBPACK_IMPORTED_MODULE_5__lb_config__["a" /* LoopBackConfig */].getApiVersion(),
                this.model.getModelDefinition().path,
                'change-stream'
            ].join('/'));
            source.addEventListener('data', emit);
            source.onerror = emit;
        }
        else {
            console.warn('SDK Builder: EventSource is not supported');
        }
        return subject.asObservable();
    };
    return BaseLoopBackApi;
}());
BaseLoopBackApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_10__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_10__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_10__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__custom_SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], BaseLoopBackApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=base.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/error.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ErrorHandler; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/add/observable/throw.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_observable_throw__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */


//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

/**
 * Default error handler
 */
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    // ErrorObservable when rxjs version < rc.5
    // ErrorObservable<string> when rxjs version = rc.5
    // I'm leaving any for now to avoid breaking apps using both versions
    ErrorHandler.prototype.handleError = function (error) {
        return __WEBPACK_IMPORTED_MODULE_1_rxjs_Observable__["Observable"].throw(error.json().error || 'Server error');
    };
    return ErrorHandler;
}());
ErrorHandler = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], ErrorHandler);

//# sourceMappingURL=error.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__real_time__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/real.time.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_4__real_time__["a"]; });
/* tslint:disable */





//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/io.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IO; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__);

var IO = (function () {
    function IO(socket) {
        this.observables = {};
        this.socket = socket;
    }
    IO.prototype.emit = function (event, data) {
        this.socket.emit('ME:RT:1://event', {
            event: event,
            data: data
        });
    };
    IO.prototype.on = function (event) {
        if (this.observables[event]) {
            return this.observables[event];
        }
        var subject = new __WEBPACK_IMPORTED_MODULE_0_rxjs_Subject__["Subject"]();
        this.socket.on(event, function (res) { return subject.next(res); });
        this.observables[event] = subject.asObservable();
        return this.observables[event];
    };
    return IO;
}());

//# sourceMappingURL=io.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/real.time.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RealTime; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__io_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/io.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_FireLoop__ = __webpack_require__("../../../../../src/app/shared/sdk/models/FireLoop.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__custom_SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module RealTime
* @license MIT
* @description
* This module is a real-time interface for using socket connections, its main purpose
* is to make sure that when there is a valid connection, it will create instances
* of the different real-time functionalities like FireLoop, PubSub and IO.
**/
var RealTime = (function () {
    /**
    * @method constructor
    * @param {SocketConnection} connection WebSocket connection service
    * @param {SDKModels} models Model provider service
    * @param {LoopBackAuth} auth LoopBack authentication service
    * @description
    * It will intialize the shared on ready communication channel.
    **/
    function RealTime(connection, models, auth) {
        this.connection = connection;
        this.models = models;
        this.auth = auth;
        this.connecting = false;
        this.onReadySubject = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Subject__["Subject"]();
        this.sharedOnReady = this.onReadySubject.asObservable().share();
        this.sharedOnReady.subscribe();
    }
    /**
    * @method onDisconnect
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is disconnected from server.
    **/
    RealTime.prototype.onDisconnect = function () {
        return this.connection.sharedObservables.sharedOnDisconnect;
    };
    /**
    * @method onAuthenticated
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is authenticated with the server.
    **/
    RealTime.prototype.onAuthenticated = function () {
        return this.connection.sharedObservables.sharedOnAuthenticated;
    };
    /**
    * @method onUnAuthorized
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is not authorized to connect with the server.
    **/
    RealTime.prototype.onUnAuthorized = function () {
        return this.connection.sharedObservables.sharedOnUnAuthorized;
    };
    /**
    * @method onReady
    * @return {Observable<any>}
    * @description
    * Will trigger when Real-Time Service is Ready for broadcasting.
    * and will register connection flow events to notify subscribers.
    **/
    RealTime.prototype.onReady = function () {
        var _this = this;
        // If there is a valid connection, then we just send back to the EventLoop
        // Or next will be executed before the actual subscription.
        if (this.connection.isConnected()) {
            var to_1 = setTimeout(function () {
                _this.onReadySubject.next('shared-connection');
                clearTimeout(to_1);
            });
            // Else if there is a current attempt of connection we wait for the prior
            // process that started the connection flow.
        }
        else if (this.connecting) {
            var ti_1 = setInterval(function () {
                if (_this.connection.isConnected()) {
                    _this.onReadySubject.next('shared-connection');
                    clearInterval(ti_1);
                }
            }, 500);
            // If there is not valid connection or attempt, then we start the connection flow
            // and make sure we notify all the onReady subscribers when done.
            // Also it will listen for desconnections so we unsubscribe and avoid both:
            // Memory leaks and duplicated triggered events.
        }
        else {
            this.connecting = true;
            this.connection.connect(this.auth.getToken());
            this.IO = new __WEBPACK_IMPORTED_MODULE_1__io_service__["a" /* IO */](this.connection);
            this.FireLoop = new __WEBPACK_IMPORTED_MODULE_3__models_FireLoop__["a" /* FireLoop */](this.connection, this.models);
            // Fire event for those subscribed 
            var s1_1 = this.connection.sharedObservables.sharedOnConnect.subscribe(function () {
                console.log('Real-Time connection has been established');
                _this.connecting = false;
                _this.onReadySubject.next('connected');
                var s2 = _this.connection.sharedObservables.sharedOnDisconnect.subscribe(function () {
                    s1_1.unsubscribe();
                    s2.unsubscribe();
                });
            });
        }
        return this.sharedOnReady;
    };
    return RealTime;
}());
RealTime = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_4__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__custom_SDKModels__["a" /* SDKModels */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* LoopBackAuth */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_5__custom_SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__custom_SDKModels__["a" /* SDKModels */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* LoopBackAuth */]) === "function" && _c || Object])
], RealTime);

var _a, _b, _c;
//# sourceMappingURL=real.time.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/core/search.params.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JSONSearchParams; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */


/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module JSONSearchParams
* @license MIT
* @description
* JSON Parser and Wrapper for the Angular2 URLSearchParams
* This module correctly encodes a json object into a query string and then creates
* an instance of the URLSearchParams component for later use in HTTP Calls
**/
var JSONSearchParams = (function () {
    function JSONSearchParams() {
    }
    JSONSearchParams.prototype.setJSON = function (obj) {
        this._usp = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["f" /* URLSearchParams */](this._JSON2URL(obj, false));
    };
    JSONSearchParams.prototype.getURLSearchParams = function () {
        return this._usp;
    };
    JSONSearchParams.prototype._JSON2URL = function (obj, parent) {
        var parts = [];
        for (var key in obj)
            parts.push(this._parseParam(key, obj[key], parent));
        return parts.join('&');
    };
    JSONSearchParams.prototype._parseParam = function (key, value, parent) {
        var processedKey = parent ? parent + '[' + key + ']' : key;
        if (value && ((typeof value) === 'object' || Array.isArray(value))) {
            return this._JSON2URL(value, processedKey);
        }
        return processedKey + '=' + value;
    };
    return JSONSearchParams;
}());
JSONSearchParams = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], JSONSearchParams);

//# sourceMappingURL=search.params.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/AccessToken.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccessTokenApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `AccessToken` model.
 */
var AccessTokenApi = (function (_super) {
    __extends(AccessTokenApi, _super);
    function AccessTokenApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation user.
     *
     * @param {any} id AccessToken id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `AccessToken` object.)
     * </em>
     */
    AccessTokenApi.prototype.getUser = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/AccessTokens/:id/user";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `AccessToken` object.)
     * </em>
     */
    AccessTokenApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/AccessTokens";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id AccessToken id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `AccessToken` object.)
     * </em>
     */
    AccessTokenApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/AccessTokens/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `AccessToken`.
     */
    AccessTokenApi.prototype.getModelName = function () {
        return "AccessToken";
    };
    return AccessTokenApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
AccessTokenApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], AccessTokenApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=AccessToken.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/BaseStation.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseStationApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `BaseStation` model.
 */
var BaseStationApi = (function (_super) {
    __extends(BaseStationApi, _super);
    function BaseStationApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find a related item by id for Message.
     *
     * @param {any} id BaseStation id
     *
     * @param {any} fk Foreign key for Message
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.findByIdMessage = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for Message.
     *
     * @param {any} id BaseStation id
     *
     * @param {any} fk Foreign key for Message
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    BaseStationApi.prototype.destroyByIdMessage = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for Message.
     *
     * @param {any} id BaseStation id
     *
     * @param {any} fk Foreign key for Message
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.updateByIdMessage = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries Message of BaseStation.
     *
     * @param {any} id BaseStation id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.getMessage = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Message of this model.
     *
     * @param {any} id BaseStation id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.createMessage = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all Message of this model.
     *
     * @param {any} id BaseStation id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    BaseStationApi.prototype.deleteMessage = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts Message of BaseStation.
     *
     * @param {any} id BaseStation id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    BaseStationApi.prototype.countMessage = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id BaseStation id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    BaseStationApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for BaseStation registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Message of this model.
     *
     * @param {any} id BaseStation id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `BaseStation` object.)
     * </em>
     */
    BaseStationApi.prototype.createManyMessage = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/BaseStations/:id/Message";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `BaseStation`.
     */
    BaseStationApi.prototype.getModelName = function () {
        return "BaseStation";
    };
    return BaseStationApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
BaseStationApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], BaseStationApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=BaseStation.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/Category.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoryApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `Category` model.
 */
var CategoryApi = (function (_super) {
    __extends(CategoryApi, _super);
    function CategoryApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find a related item by id for Devices.
     *
     * @param {any} id Category id
     *
     * @param {any} fk Foreign key for Devices
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.findByIdDevices = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for Devices.
     *
     * @param {any} id Category id
     *
     * @param {any} fk Foreign key for Devices
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    CategoryApi.prototype.destroyByIdDevices = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for Devices.
     *
     * @param {any} id Category id
     *
     * @param {any} fk Foreign key for Devices
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.updateByIdDevices = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries Devices of Category.
     *
     * @param {any} id Category id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.getDevices = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Devices of this model.
     *
     * @param {any} id Category id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.createDevices = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all Devices of this model.
     *
     * @param {any} id Category id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    CategoryApi.prototype.deleteDevices = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts Devices of Category.
     *
     * @param {any} id Category id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    CategoryApi.prototype.countDevices = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id Category id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    CategoryApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Asset registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Devices of this model.
     *
     * @param {any} id Category id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Category` object.)
     * </em>
     */
    CategoryApi.prototype.createManyDevices = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Categories/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Category`.
     */
    CategoryApi.prototype.getModelName = function () {
        return "Category";
    };
    return CategoryApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
CategoryApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], CategoryApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=Category.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/Device.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeviceApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `Device` model.
 */
var DeviceApi = (function (_super) {
    __extends(DeviceApi, _super);
    function DeviceApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation Parser.
     *
     * @param {any} id Device id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.getParser = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Parser";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Fetches belongsTo relation Category.
     *
     * @param {any} id Device id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.getCategory = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Category";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Find a related item by id for Messages.
     *
     * @param {any} id Device id
     *
     * @param {any} fk Foreign key for Messages
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.findByIdMessages = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for Messages.
     *
     * @param {any} id Device id
     *
     * @param {any} fk Foreign key for Messages
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    DeviceApi.prototype.destroyByIdMessages = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for Messages.
     *
     * @param {any} id Device id
     *
     * @param {any} fk Foreign key for Messages
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.updateByIdMessages = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries Messages of Device.
     *
     * @param {any} id Device id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.getMessages = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Messages of this model.
     *
     * @param {any} id Device id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.createMessages = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all Messages of this model.
     *
     * @param {any} id Device id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    DeviceApi.prototype.deleteMessages = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts Messages of Device.
     *
     * @param {any} id Device id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    DeviceApi.prototype.countMessages = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id Device id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    DeviceApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Device registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Messages of this model.
     *
     * @param {any} id Device id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Device` object.)
     * </em>
     */
    DeviceApi.prototype.createManyMessages = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Devices/:id/Messages";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Device`.
     */
    DeviceApi.prototype.getModelName = function () {
        return "Device";
    };
    return DeviceApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
DeviceApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], DeviceApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=Device.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/Message.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessageApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `Message` model.
 */
var MessageApi = (function (_super) {
    __extends(MessageApi, _super);
    function MessageApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation Device.
     *
     * @param {any} id Message id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.getDevice = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/Device";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Find a related item by id for BaseStation.
     *
     * @param {any} id Message id
     *
     * @param {any} fk Foreign key for BaseStation
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.findByIdBaseStation = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for BaseStation.
     *
     * @param {any} id Message id
     *
     * @param {any} fk Foreign key for BaseStation
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    MessageApi.prototype.destroyByIdBaseStation = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for BaseStation.
     *
     * @param {any} id Message id
     *
     * @param {any} fk Foreign key for BaseStation
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.updateByIdBaseStation = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Find a related item by id for MessageProperty.
     *
     * @param {any} id Message id
     *
     * @param {any} fk Foreign key for MessageProperty
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.findByIdMessageProperty = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for MessageProperty.
     *
     * @param {any} id Message id
     *
     * @param {any} fk Foreign key for MessageProperty
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    MessageApi.prototype.destroyByIdMessageProperty = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for MessageProperty.
     *
     * @param {any} id Message id
     *
     * @param {any} fk Foreign key for MessageProperty
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.updateByIdMessageProperty = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries BaseStation of Message.
     *
     * @param {any} id Message id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.getBaseStation = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in BaseStation of this model.
     *
     * @param {any} id Message id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.createBaseStation = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all BaseStation of this model.
     *
     * @param {any} id Message id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    MessageApi.prototype.deleteBaseStation = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts BaseStation of Message.
     *
     * @param {any} id Message id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    MessageApi.prototype.countBaseStation = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries MessageProperty of Message.
     *
     * @param {any} id Message id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.getMessageProperty = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in MessageProperty of this model.
     *
     * @param {any} id Message id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.createMessageProperty = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all MessageProperty of this model.
     *
     * @param {any} id Message id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    MessageApi.prototype.deleteMessageProperty = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts MessageProperty of Message.
     *
     * @param {any} id Message id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    MessageApi.prototype.countMessageProperty = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id Message id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    MessageApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Message registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in BaseStation of this model.
     *
     * @param {any} id Message id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.createManyBaseStation = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/BaseStation";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in MessageProperty of this model.
     *
     * @param {any} id Message id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Message` object.)
     * </em>
     */
    MessageApi.prototype.createManyMessageProperty = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Messages/:id/MessageProperty";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Message`.
     */
    MessageApi.prototype.getModelName = function () {
        return "Message";
    };
    return MessageApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
MessageApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], MessageApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=Message.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/MessageProperty.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagePropertyApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `MessageProperty` model.
 */
var MessagePropertyApi = (function (_super) {
    __extends(MessagePropertyApi, _super);
    function MessagePropertyApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation Message.
     *
     * @param {any} id MessageProperty id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `MessageProperty` object.)
     * </em>
     */
    MessagePropertyApi.prototype.getMessage = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/MessageProperties/:id/Message";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `MessageProperty` object.)
     * </em>
     */
    MessagePropertyApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/MessageProperties";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id MessageProperty id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `MessageProperty` object.)
     * </em>
     */
    MessagePropertyApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/MessageProperties/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    MessagePropertyApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/MessageProperties/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for MessageProperty registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `MessageProperty` object.)
     * </em>
     */
    MessagePropertyApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/MessageProperties/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `MessageProperty`.
     */
    MessagePropertyApi.prototype.getModelName = function () {
        return "MessageProperty";
    };
    return MessagePropertyApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
MessagePropertyApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], MessagePropertyApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=MessageProperty.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/Parser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ParserApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `Parser` model.
 */
var ParserApi = (function (_super) {
    __extends(ParserApi, _super);
    function ParserApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find a related item by id for Devices.
     *
     * @param {any} id Parser id
     *
     * @param {any} fk Foreign key for Devices
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.findByIdDevices = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for Devices.
     *
     * @param {any} id Parser id
     *
     * @param {any} fk Foreign key for Devices
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    ParserApi.prototype.destroyByIdDevices = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for Devices.
     *
     * @param {any} id Parser id
     *
     * @param {any} fk Foreign key for Devices
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.updateByIdDevices = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries Devices of Parser.
     *
     * @param {any} id Parser id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.getDevices = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Devices of this model.
     *
     * @param {any} id Parser id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.createDevices = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all Devices of this model.
     *
     * @param {any} id Parser id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    ParserApi.prototype.deleteDevices = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts Devices of Parser.
     *
     * @param {any} id Parser id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    ParserApi.prototype.countDevices = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id Parser id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    ParserApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for Parser registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in Devices of this model.
     *
     * @param {any} id Parser id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Parser` object.)
     * </em>
     */
    ParserApi.prototype.createManyDevices = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Parsers/:id/Devices";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Parser`.
     */
    ParserApi.prototype.getModelName = function () {
        return "Parser";
    };
    return ParserApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
ParserApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], ParserApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=Parser.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/Role.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `Role` model.
 */
var RoleApi = (function (_super) {
    __extends(RoleApi, _super);
    function RoleApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find a related item by id for principals.
     *
     * @param {any} id Role id
     *
     * @param {any} fk Foreign key for principals
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.findByIdPrincipals = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for principals.
     *
     * @param {any} id Role id
     *
     * @param {any} fk Foreign key for principals
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    RoleApi.prototype.destroyByIdPrincipals = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for principals.
     *
     * @param {any} id Role id
     *
     * @param {any} fk Foreign key for principals
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.updateByIdPrincipals = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries principals of Role.
     *
     * @param {any} id Role id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.getPrincipals = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in principals of this model.
     *
     * @param {any} id Role id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.createPrincipals = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all principals of this model.
     *
     * @param {any} id Role id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    RoleApi.prototype.deletePrincipals = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts principals of Role.
     *
     * @param {any} id Role id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    RoleApi.prototype.countPrincipals = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id Role id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in principals of this model.
     *
     * @param {any} id Role id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `Role` object.)
     * </em>
     */
    RoleApi.prototype.createManyPrincipals = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/Roles/:id/principals";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `Role`.
     */
    RoleApi.prototype.getModelName = function () {
        return "Role";
    };
    return RoleApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
RoleApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], RoleApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=Role.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/RoleMapping.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoleMappingApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `RoleMapping` model.
 *
 * **Details**
 *
 * Map principals to roles
 */
var RoleMappingApi = (function (_super) {
    __extends(RoleMappingApi, _super);
    function RoleMappingApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Fetches belongsTo relation role.
     *
     * @param {any} id RoleMapping id
     *
     * @param {boolean} refresh
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `RoleMapping` object.)
     * </em>
     */
    RoleMappingApi.prototype.getRole = function (id, refresh, customHeaders) {
        if (refresh === void 0) { refresh = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/RoleMappings/:id/role";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof refresh !== 'undefined' && refresh !== null)
            _urlParams.refresh = refresh;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `RoleMapping` object.)
     * </em>
     */
    RoleMappingApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/RoleMappings";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id RoleMapping id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `RoleMapping` object.)
     * </em>
     */
    RoleMappingApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/RoleMappings/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `RoleMapping`.
     */
    RoleMappingApi.prototype.getModelName = function () {
        return "RoleMapping";
    };
    return RoleMappingApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
RoleMappingApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], RoleMappingApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=RoleMapping.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/SDKModels.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SDKModels; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__models_AccessToken__ = __webpack_require__("../../../../../src/app/shared/sdk/models/AccessToken.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__models_RoleMapping__ = __webpack_require__("../../../../../src/app/shared/sdk/models/RoleMapping.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__models_Role__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Role.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__models_Device__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Device.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_Parser__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Parser.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_Category__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Category.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_Message__ = __webpack_require__("../../../../../src/app/shared/sdk/models/Message.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_BaseStation__ = __webpack_require__("../../../../../src/app/shared/sdk/models/BaseStation.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_MessageProperty__ = __webpack_require__("../../../../../src/app/shared/sdk/models/MessageProperty.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__models_User__ = __webpack_require__("../../../../../src/app/shared/sdk/models/User.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */











var SDKModels = (function () {
    function SDKModels() {
        this.models = {
            AccessToken: __WEBPACK_IMPORTED_MODULE_1__models_AccessToken__["a" /* AccessToken */],
            RoleMapping: __WEBPACK_IMPORTED_MODULE_2__models_RoleMapping__["a" /* RoleMapping */],
            Role: __WEBPACK_IMPORTED_MODULE_3__models_Role__["a" /* Role */],
            Device: __WEBPACK_IMPORTED_MODULE_4__models_Device__["a" /* Device */],
            Parser: __WEBPACK_IMPORTED_MODULE_5__models_Parser__["a" /* Parser */],
            Category: __WEBPACK_IMPORTED_MODULE_6__models_Category__["a" /* Category */],
            Message: __WEBPACK_IMPORTED_MODULE_7__models_Message__["a" /* Message */],
            BaseStation: __WEBPACK_IMPORTED_MODULE_8__models_BaseStation__["a" /* BaseStation */],
            MessageProperty: __WEBPACK_IMPORTED_MODULE_9__models_MessageProperty__["a" /* MessageProperty */],
            User: __WEBPACK_IMPORTED_MODULE_10__models_User__["a" /* User */],
        };
    }
    SDKModels.prototype.get = function (modelName) {
        return this.models[modelName];
    };
    SDKModels.prototype.getAll = function () {
        return this.models;
    };
    SDKModels.prototype.getModelNames = function () {
        return Object.keys(this.models);
    };
    return SDKModels;
}());
SDKModels = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], SDKModels);

//# sourceMappingURL=SDKModels.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/User.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserApi; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__core_base_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/base.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__core_auth_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__core_search_params__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/search.params.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__core_error_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/error.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.connections.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */









/**
 * Api services for the `User` model.
 */
var UserApi = (function (_super) {
    __extends(UserApi, _super);
    function UserApi(http, connection, models, auth, searchParams, errorHandler) {
        var _this = _super.call(this, http, connection, models, auth, searchParams, errorHandler) || this;
        _this.http = http;
        _this.connection = connection;
        _this.models = models;
        _this.auth = auth;
        _this.searchParams = searchParams;
        _this.errorHandler = errorHandler;
        return _this;
    }
    /**
     * Find a related item by id for accessTokens.
     *
     * @param {any} id user id
     *
     * @param {any} fk Foreign key for accessTokens
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.findByIdAccessTokens = function (id, fk, customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Delete a related item by id for accessTokens.
     *
     * @param {any} id user id
     *
     * @param {any} fk Foreign key for accessTokens
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.destroyByIdAccessTokens = function (id, fk, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Update a related item by id for accessTokens.
     *
     * @param {any} id user id
     *
     * @param {any} fk Foreign key for accessTokens
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.updateByIdAccessTokens = function (id, fk, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PUT";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens/:fk";
        var _routeParams = {
            id: id,
            fk: fk
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Queries accessTokens of user.
     *
     * @param {any} id user id
     *
     * @param {object} filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.getAccessTokens = function (id, filter, customHeaders) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof filter !== 'undefined' && filter !== null)
            _urlParams.filter = filter;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in accessTokens of this model.
     *
     * @param {any} id user id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.createAccessTokens = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Deletes all accessTokens of this model.
     *
     * @param {any} id user id
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.deleteAccessTokens = function (id, customHeaders) {
        var _method = "DELETE";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Counts accessTokens of user.
     *
     * @param {any} id user id
     *
     * @param {object} where Criteria to match model instances
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `count` – `{number}` -
     */
    UserApi.prototype.countAccessTokens = function (id, where, customHeaders) {
        if (where === void 0) { where = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens/count";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch an existing model instance or insert a new one into the data source.
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - Model instance data
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.patchOrCreate = function (data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users";
        var _routeParams = {};
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Patch attributes for a model instance and persist it into the data source.
     *
     * @param {any} id user id
     *
     * @param {object} data Request data.
     *
     *  - `data` – `{object}` - An object of model property name/value pairs
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.patchAttributes = function (id, data, customHeaders) {
        if (data === void 0) { data = {}; }
        var _method = "PATCH";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Login a user with username/email and password.
     *
     * @param {string} include Related objects to include in the response. See the description of return value for more details.
     *   Default value: `user`.
     *
     *  - `rememberMe` - `boolean` - Whether the authentication credentials
     *     should be remembered in localStorage across app/browser restarts.
     *     Default: `true`.
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * The response body contains properties of the AccessToken created on login.
     * Depending on the value of `include` parameter, the body may contain additional properties:
     *
     *   - `user` - `U+007BUserU+007D` - Data of the currently logged in user. (`include=user`)
     *
     *
     */
    UserApi.prototype.login = function (credentials, include, rememberMe, customHeaders) {
        var _this = this;
        if (include === void 0) { include = 'user'; }
        if (rememberMe === void 0) { rememberMe = true; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/login";
        var _routeParams = {};
        var _postBody = {
            credentials: credentials
        };
        var _urlParams = {};
        if (typeof include !== 'undefined' && include !== null)
            _urlParams.include = include;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders)
            .map(function (response) {
            response.ttl = parseInt(response.ttl);
            response.rememberMe = rememberMe;
            _this.auth.setToken(response);
            return response;
        });
        return result;
    };
    /**
     * Logout a user with access token.
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.logout = function (customHeaders) {
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/logout";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        _urlParams.access_token = this.auth.getAccessTokenId();
        this.auth.clear();
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Trigger user's identity verification with configured verifyOptions
     *
     * @param {any} id user id
     *
     * @param {object} data Request data.
     *
     * This method does not accept any data. Supply an empty object.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.verify = function (id, customHeaders) {
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/verify";
        var _routeParams = {
            id: id
        };
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Confirm a user registration with identity verification token.
     *
     * @param {string} uid
     *
     * @param {string} token
     *
     * @param {string} redirect
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.confirm = function (uid, token, redirect, customHeaders) {
        if (redirect === void 0) { redirect = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/confirm";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof uid !== 'undefined' && uid !== null)
            _urlParams.uid = uid;
        if (typeof token !== 'undefined' && token !== null)
            _urlParams.token = token;
        if (typeof redirect !== 'undefined' && redirect !== null)
            _urlParams.redirect = redirect;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Reset password for a user with email.
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.resetPassword = function (options, customHeaders) {
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/reset";
        var _routeParams = {};
        var _postBody = {
            options: options
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Change a user's password.
     *
     * @param {object} data Request data.
     *
     *  - `oldPassword` – `{string}` -
     *
     *  - `newPassword` – `{string}` -
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.changePassword = function (oldPassword, newPassword, customHeaders) {
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/change-password";
        var _routeParams = {};
        var _postBody = {
            data: {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Reset user's password via a password-reset token.
     *
     * @param {object} data Request data.
     *
     *  - `newPassword` – `{string}` -
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * This method returns no data.
     */
    UserApi.prototype.setPassword = function (newPassword, customHeaders) {
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/reset-password";
        var _routeParams = {};
        var _postBody = {
            data: {
                newPassword: newPassword
            }
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * <em>
           * (The remote method definition does not provide any description.)
           * </em>
     *
     * @returns {object} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * Data properties:
     *
     *  - `result` – `{any}` -
     */
    UserApi.prototype.myRemote = function (customHeaders) {
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/my-remote";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Statistical information for user registers.
     *
     * @param {string} range hourly, daily, weekly, monthly, yearly, custom
     *
     * @param {object} custom {"start": date, "end": date }
     *
     * @param {object} where where filter
     *
     * @param {string} groupBy group by filter
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.stats = function (range, custom, where, groupBy, customHeaders) {
        if (custom === void 0) { custom = {}; }
        if (where === void 0) { where = {}; }
        if (groupBy === void 0) { groupBy = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/stats";
        var _routeParams = {};
        var _postBody = {};
        var _urlParams = {};
        if (typeof range !== 'undefined' && range !== null)
            _urlParams.range = range;
        if (typeof custom !== 'undefined' && custom !== null)
            _urlParams.custom = custom;
        if (typeof where !== 'undefined' && where !== null)
            _urlParams.where = where;
        if (typeof groupBy !== 'undefined' && groupBy !== null)
            _urlParams.groupBy = groupBy;
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * Creates a new instance in accessTokens of this model.
     *
     * @param {any} id user id
     *
     * @param {object} data Request data.
     *
     * This method expects a subset of model properties as request parameters.
     *
     * @returns {object[]} An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     *
     * <em>
     * (The remote method definition does not provide any description.
     * This usually means the response is a `User` object.)
     * </em>
     */
    UserApi.prototype.createManyAccessTokens = function (id, data, customHeaders) {
        if (data === void 0) { data = []; }
        var _method = "POST";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() +
            "/users/:id/accessTokens";
        var _routeParams = {
            id: id
        };
        var _postBody = {
            data: data
        };
        var _urlParams = {};
        var result = this.request(_method, _url, _routeParams, _urlParams, _postBody, null, customHeaders);
        return result;
    };
    /**
     * @ngdoc method
     * @name sdk.User#getCurrent
     * @methodOf sdk.User
     *
     * @description
     *
     * Get data of the currently logged user. Fail with HTTP result 401
     * when there is no user logged in.
     *
     * @returns object An empty reference that will be
     *   populated with the actual data once the response is returned
     *   from the server.
     */
    UserApi.prototype.getCurrent = function (filter) {
        if (filter === void 0) { filter = {}; }
        var _method = "GET";
        var _url = __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getPath() + "/" + __WEBPACK_IMPORTED_MODULE_4__lb_config__["a" /* LoopBackConfig */].getApiVersion() + "/users" + "/:id";
        var id = this.auth.getCurrentUserId();
        if (id == null)
            id = '__anonymous__';
        var _routeParams = { id: id };
        var _urlParams = {};
        var _postBody = {};
        if (filter)
            _urlParams.filter = filter;
        return this.request(_method, _url, _routeParams, _urlParams, _postBody);
    };
    /**
     * Get data of the currently logged user that was returned by the last
     * call to {@link sdk.User#login} or
     * {@link sdk.User#getCurrent}. Return null when there
     * is no user logged in or the data of the current user were not fetched
     * yet.
     *
     * @returns object An Account instance.
     */
    UserApi.prototype.getCachedCurrent = function () {
        return this.auth.getCurrentUserData();
    };
    /**
     * Get data of the currently logged access tokern that was returned by the last
     * call to {@link sdk.User#login}
     *
     * @returns object An AccessToken instance.
     */
    UserApi.prototype.getCurrentToken = function () {
        return this.auth.getToken();
    };
    /**
     * @name sdk.User#isAuthenticated
     *
     * @returns {boolean} True if the current user is authenticated (logged in).
     */
    UserApi.prototype.isAuthenticated = function () {
        return !(this.getCurrentId() === '' || this.getCurrentId() == null || this.getCurrentId() == 'null');
    };
    /**
     * @name sdk.User#getCurrentId
     *
     * @returns object Id of the currently logged-in user or null.
     */
    UserApi.prototype.getCurrentId = function () {
        return this.auth.getCurrentUserId();
    };
    /**
     * The name of the model represented by this $resource,
     * i.e. `User`.
     */
    UserApi.prototype.getModelName = function () {
        return "User";
    };
    return UserApi;
}(__WEBPACK_IMPORTED_MODULE_3__core_base_service__["a" /* BaseLoopBackApi */]));
UserApi = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */])),
    __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */])),
    __param(3, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */])),
    __param(4, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */])),
    __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Optional"])()), __param(5, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_8__sockets_socket_connections__["a" /* SocketConnection */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__SDKModels__["a" /* SDKModels */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_5__core_auth_service__["a" /* LoopBackAuth */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_6__core_search_params__["a" /* JSONSearchParams */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_7__core_error_service__["a" /* ErrorHandler */]) === "function" && _f || Object])
], UserApi);

var _a, _b, _c, _d, _e, _f;
//# sourceMappingURL=User.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AccessToken__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/AccessToken.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__RoleMapping__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/RoleMapping.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Role__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Role.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Device__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Device.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__Device__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Parser__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Parser.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_4__Parser__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Category__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Category.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__Category__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Message__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/Message.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_6__Message__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__BaseStation__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/BaseStation.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MessageProperty__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/MessageProperty.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__User__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/User.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_9__User__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SDKModels__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/SDKModels.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__logger_service__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/logger.service.ts");
/* unused harmony namespace reexport */
/* tslint:disable */












//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/custom/logger.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoggerService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */


/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@johncasarrubias>
* @module LoggerService
* @license MIT
* @description
* Console Log wrapper that can be disabled in production mode
**/
var LoggerService = (function () {
    function LoggerService() {
    }
    LoggerService.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.log.apply(console, args);
    };
    LoggerService.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.info.apply(console, args);
    };
    LoggerService.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.error.apply(console, args);
    };
    LoggerService.prototype.count = function (arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.count(arg);
    };
    LoggerService.prototype.group = function (arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.count(arg);
    };
    LoggerService.prototype.groupEnd = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.groupEnd();
    };
    LoggerService.prototype.profile = function (arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.count(arg);
    };
    LoggerService.prototype.profileEnd = function () {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.profileEnd();
    };
    LoggerService.prototype.time = function (arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.time(arg);
    };
    LoggerService.prototype.timeEnd = function (arg) {
        if (__WEBPACK_IMPORTED_MODULE_1__lb_config__["a" /* LoopBackConfig */].debuggable())
            console.timeEnd(arg);
    };
    return LoggerService;
}());
LoggerService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], LoggerService);

//# sourceMappingURL=logger.service.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_index__ = __webpack_require__("../../../../../src/app/shared/sdk/services/core/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_0__core_index__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__custom_index__ = __webpack_require__("../../../../../src/app/shared/sdk/services/custom/index.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__custom_index__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__custom_index__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__custom_index__["c"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__custom_index__["d"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_1__custom_index__["e"]; });
/* tslint:disable */


//# sourceMappingURL=index.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/sockets/socket.browser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_client__ = __webpack_require__("../../../../socket.io-client/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_socket_io_client___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_socket_io_client__);
/* tslint:disable */

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketBrowser
* @license MIT
* @description
* This module handle socket connections for web browsers, it will be DI Swapped
* depending on the platform environment.
* This module will be generated when the -d ng2web flag is set
**/
var SocketBrowser = (function () {
    function SocketBrowser() {
    }
    /**
     * @method connect
     * @param {string} url URL path to connect with the server.
     * @param {any} options Any socket.io v1 =< valid options
     * @return {any} Not currently a socket.io-client for web Typings implemented.
     * @description
     * This method will return a valid socket connection.
     **/
    SocketBrowser.prototype.connect = function (url, options) {
        return __WEBPACK_IMPORTED_MODULE_0_socket_io_client__(url, options);
    };
    return SocketBrowser;
}());

//# sourceMappingURL=socket.browser.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/sockets/socket.connections.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketConnection; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__socket_driver__ = __webpack_require__("../../../../../src/app/shared/sdk/sockets/socket.driver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lb_config__ = __webpack_require__("../../../../../src/app/shared/sdk/lb.config.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/* tslint:disable */




/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module SocketConnection
* @license MIT
* @description
* This module handle socket connections and return singleton instances for each
* connection, it will use the SDK Socket Driver Available currently supporting
* Angular 2 for web, NativeScript 2 and Angular Universal.
**/
var SocketConnection = (function () {
    /**
     * @method constructor
     * @param {SocketDriver} driver Socket IO Driver
     * @param {NgZone} zone Angular 2 Zone
     * @description
     * The constructor will set references for the shared hot observables from
     * the class subjects. Then it will subscribe each of these observables
     * that will create a channel that later will be shared between subscribers.
     **/
    function SocketConnection(driver, zone) {
        this.driver = driver;
        this.zone = zone;
        this.subjects = {
            onConnect: new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"](),
            onDisconnect: new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"](),
            onAuthenticated: new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"](),
            onUnAuthorized: new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]()
        };
        this.sharedObservables = {};
        this.authenticated = false;
        this.sharedObservables = {
            sharedOnConnect: this.subjects.onConnect.asObservable().share(),
            sharedOnDisconnect: this.subjects.onDisconnect.asObservable().share(),
            sharedOnAuthenticated: this.subjects.onAuthenticated.asObservable().share(),
            sharedOnUnAuthorized: this.subjects.onUnAuthorized.asObservable().share()
        };
        // This is needed to create the first channel, subsequents will share the connection
        // We are using Hot Observables to avoid duplicating connection status events.
        this.sharedObservables.sharedOnConnect.subscribe();
        this.sharedObservables.sharedOnDisconnect.subscribe();
        this.sharedObservables.sharedOnAuthenticated.subscribe();
        this.sharedObservables.sharedOnUnAuthorized.subscribe();
    }
    /**
     * @method connect
     * @param {AccessToken} token AccesToken instance
     * @return {void}
     * @description
     * This method will create a new socket connection when not previously established.
     * If there is a broken connection it will re-connect.
     **/
    SocketConnection.prototype.connect = function (token) {
        var _this = this;
        if (token === void 0) { token = null; }
        if (!this.socket) {
            console.info('Creating a new connection with: ', __WEBPACK_IMPORTED_MODULE_3__lb_config__["a" /* LoopBackConfig */].getPath());
            // Create new socket connection
            this.socket = this.driver.connect(__WEBPACK_IMPORTED_MODULE_3__lb_config__["a" /* LoopBackConfig */].getPath(), {
                log: false,
                secure: __WEBPACK_IMPORTED_MODULE_3__lb_config__["a" /* LoopBackConfig */].isSecureWebSocketsSet(),
                forceNew: true,
                forceWebsockets: true,
                transports: ['websocket']
            });
            // Listen for connection
            this.on('connect', function () {
                _this.subjects.onConnect.next('connected');
                // Authenticate or start heartbeat now    
                _this.emit('authentication', token);
            });
            // Listen for authentication
            this.on('authenticated', function () {
                _this.authenticated = true;
                _this.subjects.onAuthenticated.next();
                _this.heartbeater();
            });
            // Listen for authentication
            this.on('unauthorized', function (err) {
                _this.authenticated = false;
                _this.subjects.onUnAuthorized.next(err);
            });
            // Listen for disconnections
            this.on('disconnect', function (status) { return _this.subjects.onDisconnect.next(status); });
        }
        else if (this.socket && !this.socket.connected) {
            if (typeof this.socket.off === 'function') {
                this.socket.off();
            }
            if (typeof this.socket.destroy === 'function') {
                this.socket.destroy();
            }
            delete this.socket;
            this.connect(token);
        }
    };
    /**
     * @method isConnected
     * @return {boolean}
     * @description
     * This method will return true or false depending on established connections
     **/
    SocketConnection.prototype.isConnected = function () {
        return (this.socket && this.socket.connected);
    };
    /**
     * @method on
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method listen for server events from the current WebSocket connection.
     * This method is a facade that will wrap the original "on" method and run it
     * within the Angular Zone to avoid update issues.
     **/
    SocketConnection.prototype.on = function (event, handler) {
        var _this = this;
        this.socket.on(event, function (data) { return _this.zone.run(function () { return handler(data); }); });
    };
    /**
     * @method emit
     * @param {string} event Event name
     * @param {any=} data Any type of data
     * @return {void}
     * @description
     * This method will send any type of data to the server according the event set.
     **/
    SocketConnection.prototype.emit = function (event, data) {
        if (data) {
            this.socket.emit(event, data);
        }
        else {
            this.socket.emit(event);
        }
    };
    /**
     * @method removeListener
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    SocketConnection.prototype.removeListener = function (event, handler) {
        if (typeof this.socket.off === 'function') {
            this.socket.off(event, handler);
        }
    };
    /**
     * @method removeAllListeners
     * @param {string} event Event name
     * @param {Function} handler Event listener handler
     * @return {void}
     * @description
     * This method will wrap the original "on" method and run it within the Angular Zone
     * Note: off is being used since the nativescript socket io client does not provide
     * removeListener method, but only provides with off which is provided in any platform.
     **/
    SocketConnection.prototype.removeAllListeners = function (event) {
        if (typeof this.socket.removeAllListeners === 'function') {
            this.socket.removeAllListeners(event);
        }
    };
    /**
     * @method disconnect
     * @return {void}
     * @description
     * This will disconnect the client from the server
     **/
    SocketConnection.prototype.disconnect = function () {
        this.socket.disconnect();
    };
    /**
     * @method heartbeater
     * @return {void}
     * @description
     * This will keep the connection as active, even when users are not sending
     * data, this avoids disconnection because of a connection not being used.
     **/
    SocketConnection.prototype.heartbeater = function () {
        var _this = this;
        var heartbeater = setInterval(function () {
            if (_this.isConnected()) {
                _this.socket.emit('lb-ping');
            }
            else {
                _this.socket.removeAllListeners('lb-pong');
                clearInterval(heartbeater);
            }
        }, 15000);
        this.socket.on('lb-pong', function (data) { return console.info('Heartbeat: ', data); });
    };
    return SocketConnection;
}());
SocketConnection = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_1__socket_driver__["a" /* SocketDriver */])),
    __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"])),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__socket_driver__["a" /* SocketDriver */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__socket_driver__["a" /* SocketDriver */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _b || Object])
], SocketConnection);

var _a, _b;
//# sourceMappingURL=socket.connections.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/sockets/socket.driver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SocketDriver; });
/**
 * @module SocketDriver
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SocketDriver class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
var SocketDriver = (function () {
    function SocketDriver() {
    }
    SocketDriver.prototype.connect = function (url, options) { };
    return SocketDriver;
}());

//# sourceMappingURL=socket.driver.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/storage/cookie.browser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CookieBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module CookieBrowser
* @license MIT
* @description
* This module handle cookies, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
var CookieBrowser = (function () {
    function CookieBrowser() {
        /**
         * @type {CookieInterface}
         **/
        this.cookies = {};
    }
    /**
     * @method get
     * @param {string} key Cookie key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in cookies.
     **/
    CookieBrowser.prototype.get = function (key) {
        if (!this.cookies[key]) {
            var cookie = window.document
                .cookie.split('; ')
                .filter(function (item) { return item.split('=')[0] === key; }).pop();
            if (!cookie) {
                return null;
            }
            this.cookies[key] = this.parse(cookie.split('=').slice(1).join('='));
        }
        return this.cookies[key];
    };
    /**
     * @method set
     * @param {string} key Cookie key name
     * @param {any} value Any value
     * @param {Date=} expires The date of expiration (Optional)
     * @return {void}
     * @description
     * The setter will return any type of data persisted in cookies.
     **/
    CookieBrowser.prototype.set = function (key, value, expires) {
        this.cookies[key] = value;
        var cookie = key + "=" + value + "; path=/" + (expires ? "; expires=" + expires.toUTCString() : '');
        window.document.cookie = cookie;
    };
    /**
     * @method remove
     * @param {string} key Cookie key name
     * @return {void}
     * @description
     * This method will remove a cookie from the client.
     **/
    CookieBrowser.prototype.remove = function (key) {
        document.cookie = key + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        delete this.cookies[key];
    };
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    CookieBrowser.prototype.parse = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    return CookieBrowser;
}());
CookieBrowser = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], CookieBrowser);

//# sourceMappingURL=cookie.browser.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/storage/storage.browser.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StorageBrowser; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* tslint:disable */

/**
* @author Jonathan Casarrubias <twitter:@johncasarrubias> <github:@mean-expert-official>
* @module StorageBrowser
* @license MIT
* @description
* This module handle localStorage, it will be provided using DI Swapping according the
* SDK Socket Driver Available currently supporting Angular 2 for web and NativeScript 2.
**/
var StorageBrowser = (function () {
    function StorageBrowser() {
    }
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in localStorage.
     **/
    StorageBrowser.prototype.get = function (key) {
        var data = localStorage.getItem(key);
        return this.parse(data);
    };
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    StorageBrowser.prototype.set = function (key, value) {
        localStorage.setItem(key, typeof value === 'object' ? JSON.stringify(value) : value);
    };
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    StorageBrowser.prototype.remove = function (key) {
        if (localStorage[key]) {
            localStorage.removeItem(key);
        }
        else {
            console.log('Trying to remove unexisting key: ', key);
        }
    };
    /**
     * @method parse
     * @param {any} value Input data expected to be JSON
     * @return {void}
     * @description
     * This method will parse the string as JSON if possible, otherwise will
     * return the value itself.
     **/
    StorageBrowser.prototype.parse = function (value) {
        try {
            return JSON.parse(value);
        }
        catch (e) {
            return value;
        }
    };
    return StorageBrowser;
}());
StorageBrowser = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])()
], StorageBrowser);

//# sourceMappingURL=storage.browser.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sdk/storage/storage.swaps.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BaseStorage */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternalStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SDKStorage; });
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @module Storage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 **/
var BaseStorage = (function () {
    function BaseStorage() {
    }
    /**
     * @method get
     * @param {string} key Storage key name
     * @return {any}
     * @description
     * The getter will return any type of data persisted in storage.
     **/
    BaseStorage.prototype.get = function (key) { };
    /**
     * @method set
     * @param {string} key Storage key name
     * @param {any} value Any value
     * @return {void}
     * @description
     * The setter will return any type of data persisted in localStorage.
     **/
    BaseStorage.prototype.set = function (key, value) { };
    /**
     * @method remove
     * @param {string} key Storage key name
     * @return {void}
     * @description
     * This method will remove a localStorage item from the client.
     **/
    BaseStorage.prototype.remove = function (key) { };
    return BaseStorage;
}());

/**
 * @module InternalStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The InternalStorage class is used for dependency injection swapping.
 * It will be provided using factory method from different sources.
 * This is mainly required because Angular Universal integration.
 * It does inject a CookieStorage instead of LocalStorage.
 **/
var InternalStorage = (function (_super) {
    __extends(InternalStorage, _super);
    function InternalStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InternalStorage;
}(BaseStorage));

/**
 * @module SDKStorage
 * @author Jonathan Casarrubias <t: johncasarrubias, gh: mean-expert-official>
 * @license MIT
 * @description
 * The SDKStorage class is used for dependency injection swapping.
 * It will be provided using factory method according the right environment.
 * This is created for public usage, to allow persisting custom data
 * Into the local storage API.
 **/
var SDKStorage = (function (_super) {
    __extends(SDKStorage, _super);
    function SDKStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SDKStorage;
}(BaseStorage));

//# sourceMappingURL=storage.swaps.js.map

/***/ }),

/***/ "../../../../../src/app/shared/sidebar.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export SidebarToggleDirective */
/* unused harmony export MobileSidebarToggleDirective */
/* unused harmony export SidebarOffCanvasCloseDirective */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SIDEBAR_TOGGLE_DIRECTIVES; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
* Allows the sidebar to be toggled via click.
*/
var SidebarToggleDirective = (function () {
    function SidebarToggleDirective() {
    }
    SidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-hidden');
    };
    return SidebarToggleDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarToggleDirective.prototype, "toggleOpen", null);
SidebarToggleDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '.sidebar-toggler',
    }),
    __metadata("design:paramtypes", [])
], SidebarToggleDirective);

var MobileSidebarToggleDirective = (function () {
    function MobileSidebarToggleDirective() {
    }
    // Check if element has class
    MobileSidebarToggleDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    MobileSidebarToggleDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        document.querySelector('body').classList.toggle('sidebar-mobile-show');
    };
    return MobileSidebarToggleDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MobileSidebarToggleDirective.prototype, "toggleOpen", null);
MobileSidebarToggleDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '.mobile-sidebar-toggler',
    }),
    __metadata("design:paramtypes", [])
], MobileSidebarToggleDirective);

/**
* Allows the off-canvas sidebar to be closed via click.
*/
var SidebarOffCanvasCloseDirective = (function () {
    function SidebarOffCanvasCloseDirective() {
    }
    // Check if element has class
    SidebarOffCanvasCloseDirective.prototype.hasClass = function (target, elementClassName) {
        return new RegExp('(\\s|^)' + elementClassName + '(\\s|$)').test(target.className);
    };
    // Toggle element class
    SidebarOffCanvasCloseDirective.prototype.toggleClass = function (elem, elementClassName) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, ' ') + ' ';
        if (this.hasClass(elem, elementClassName)) {
            while (newClass.indexOf(' ' + elementClassName + ' ') >= 0) {
                newClass = newClass.replace(' ' + elementClassName + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
        else {
            elem.className += ' ' + elementClassName;
        }
    };
    SidebarOffCanvasCloseDirective.prototype.toggleOpen = function ($event) {
        $event.preventDefault();
        if (this.hasClass(document.querySelector('body'), 'sidebar-off-canvas')) {
            this.toggleClass(document.querySelector('body'), 'sidebar-opened');
        }
    };
    return SidebarOffCanvasCloseDirective;
}());
__decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SidebarOffCanvasCloseDirective.prototype, "toggleOpen", null);
SidebarOffCanvasCloseDirective = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '.sidebar-close',
    }),
    __metadata("design:paramtypes", [])
], SidebarOffCanvasCloseDirective);

var SIDEBAR_TOGGLE_DIRECTIVES = [SidebarToggleDirective, SidebarOffCanvasCloseDirective, MobileSidebarToggleDirective];
//# sourceMappingURL=sidebar.directive.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    envName: 'prod',
    apiUrl: '//localhost:3000',
    apiVersion: 'api'
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_shared_sdk__ = __webpack_require__("../../../../../src/app/shared/sdk/index.ts");





__WEBPACK_IMPORTED_MODULE_4__app_shared_sdk__["a" /* LoopBackConfig */].setBaseURL(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl);
__WEBPACK_IMPORTED_MODULE_4__app_shared_sdk__["a" /* LoopBackConfig */].setApiVersion(__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiVersion);
if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map