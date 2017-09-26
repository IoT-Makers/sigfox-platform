webpackJsonp(["profile.module"],{

/***/ "../../../../../src/app/pages/user/profile/profile-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_component__ = __webpack_require__("../../../../../src/app/pages/user/profile/profile.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__profile_component__["a" /* ProfileComponent */],
        data: {
            title: 'Profile'
        }
    }
];
var ProfileRoutingModule = (function () {
    function ProfileRoutingModule() {
    }
    return ProfileRoutingModule;
}());
ProfileRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], ProfileRoutingModule);

//# sourceMappingURL=profile-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/user/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <h3>Welcome {{user.username}}</h3>\n\n  <hr>\n\n\n  <div class=\"row\">\n    <div class=\"col-sm-12\">\n      <div class=\"card mb-3\">\n        <div class=\"card-header card-default\">\n          My Profile\n        </div>\n        <div class=\"card-block\">\n          <div><b><i class=\"fa fa-envelope\" aria-hidden=\"true\"></i><span style=\"margin-right:1em\"></span> Email:</b> {{user.email}}</div>\n          <hr>\n          <div><b><i class=\"fa fa-user\" aria-hidden=\"true\"></i><span style=\"margin-right:1em\"></span> Avatar:</b> {{user.avatar}}</div>\n          <hr>\n          <div><b><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i><span style=\"margin-right:1em\"></span> Creation:</b> {{user.createdAt}}</div>\n          <hr>\n          <div *ngIf=\"user.emailVerified; then verifiedEmail else unverifiedEmail\"></div>\n          <ng-template #verifiedEmail>\n            <div style='color:green'><b><i class=\"fa fa-check-circle\" aria-hidden=\"true\"></i><span style=\"margin-right:1em\"></span> Email verified</b></div>\n          </ng-template>\n          <ng-template #unverifiedEmail>\n            <div  style='color:red'><b><i class=\"fa fa-exclamation-circle\" aria-hidden=\"true\"></i><span style=\"margin-right:1em\"></span> Email unverified</b></div>\n          </ng-template>\n        </div>\n      </div>\n\n    </div>\n    <!-- /.col-sm-4 -->\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/user/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/user/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models_User__ = __webpack_require__("../../../../../src/app/shared/sdk/models/User.ts");
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



var ProfileComponent = (function () {
    function ProfileComponent(userApi) {
        this.userApi = userApi;
        this.user = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models_User__["a" /* User */]();
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.user = this.userApi.getCachedCurrent();
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__("../../../../../src/app/pages/user/profile/profile.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/user/profile/profile.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services_custom_User__["a" /* UserApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services_custom_User__["a" /* UserApi */]) === "function" && _a || Object])
], ProfileComponent);

var _a;
//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/user/profile/profile.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__profile_component__ = __webpack_require__("../../../../../src/app/pages/user/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__profile_routing_module__ = __webpack_require__("../../../../../src/app/pages/user/profile/profile-routing.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var ProfileModule = (function () {
    function ProfileModule() {
    }
    return ProfileModule;
}());
ProfileModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_3__profile_routing_module__["a" /* ProfileRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__profile_component__["a" /* ProfileComponent */]
        ]
    })
], ProfileModule);

//# sourceMappingURL=profile.module.js.map

/***/ })

});
//# sourceMappingURL=profile.module.chunk.js.map