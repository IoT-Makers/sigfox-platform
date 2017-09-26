webpackJsonp(["login.module"],{

/***/ "../../../../../src/app/pages/user/login/login-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__("../../../../../src/app/pages/user/login/login.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginComponent */],
        data: {
            title: 'Login'
        }
    }
];
var LoginRoutingModule = (function () {
    function LoginRoutingModule() {
    }
    return LoginRoutingModule;
}());
LoginRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], LoginRoutingModule);

//# sourceMappingURL=login-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/user/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"app flex-row align-items-center\">\n  <div class=\"container\">\n    <div class=\"row justify-content-center\">\n      <div class=\"col-md-8\">\n        <div class=\"card-group mb-0\">\n          <div class=\"card p-2\">\n            <div class=\"card-block\">\n              <h1>Login</h1>\n              <p class=\"text-muted\">Sign In to your account</p>\n\n              <form #f=\"ngForm\" (ngSubmit)=\"onLogin()\">\n                <div class=\"input-group mb-1\">\n                  <span class=\"input-group-addon\"><i class=\"icon-user\"></i></span>\n                  <input [(ngModel)]=\"user.email\" type=\"email\" class=\"form-control\" name=\"email\" placeholder=\"Email\" required>\n                </div>\n                <div class=\"input-group mb-2\">\n                  <span class=\"input-group-addon\"><i class=\"icon-lock\"></i></span>\n                  <input [(ngModel)]=\"user.password\" type=\"password\" class=\"form-control\" name=\"password\" placeholder=\"Password\" required>\n                </div>\n                <div class=\"row\">\n                  <div class=\"col-6\">\n                    <button type=\"submit\" class=\"btn btn-primary px-2\">Login</button>\n                  </div>\n                  <div class=\"col-6 text-right\">\n                    <button type=\"button\" class=\"btn btn-link px-0\">Forgot password?</button>\n                  </div>\n                </div>\n              </form>\n\n            </div>\n          </div>\n          <div class=\"card card-inverse card-primary py-3 hidden-md-down\" style=\"width:44%\">\n            <div class=\"card-block text-center\">\n              <div>\n                <h2>Sign up</h2>\n                <p>Registration are not available at the moment, please come back later ;)</p>\n                <button type=\"button\" class=\"btn btn-primary active mt-1\" disabled>Register Now!</button>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/user/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/user/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__ = __webpack_require__("../../../../../src/app/shared/sdk/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__ = __webpack_require__("../../../../../src/app/shared/sdk/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(userApi, router) {
        this.userApi = userApi;
        this.router = router;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["f" /* User */]();
    }
    LoginComponent.prototype.onRegister = function () {
        var _this = this;
        this.userApi.create(this.user).subscribe(function (user) {
            _this.onLogin();
        });
    };
    LoginComponent.prototype.onLogin = function () {
        var _this = this;
        this.userApi.login(this.user).subscribe(function (response) {
            console.log(response);
            _this.user = response.user;
            console.log(_this.user);
            _this.router.navigate(['/dashboard']);
        }, function (err) {
            console.log(err);
        });
    };
    LoginComponent.prototype.getData = function () {
        var _this = this;
        // Example 3
        this.userApi.count().subscribe(function (response) {
            var lastRow = response.count;
            var data = _this.userApi
                .find({
                offset: 0,
                limit: 100
            })
                .subscribe(function (response) {
                // Process response
                console.log(this.user);
            });
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/pages/user/login/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/user/login/login.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["f" /* UserApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["f" /* UserApi */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__angular_router__["c" /* Router */]) === "function" && _b || Object])
], LoginComponent);

var _a, _b;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/user/login/login.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__login_component__ = __webpack_require__("../../../../../src/app/pages/user/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_routing_module__ = __webpack_require__("../../../../../src/app/pages/user/login/login-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__login_routing_module__["a" /* LoginRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__login_component__["a" /* LoginComponent */]
        ]
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ })

});
//# sourceMappingURL=login.module.chunk.js.map