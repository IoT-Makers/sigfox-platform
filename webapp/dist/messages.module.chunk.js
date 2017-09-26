webpackJsonp(["messages.module"],{

/***/ "../../../../../src/app/pages/messages/datafilterpipe.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataFilterPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash__ = __webpack_require__("../../../../lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var DataFilterPipe = (function () {
    function DataFilterPipe() {
    }
    DataFilterPipe.prototype.transform = function (array, query) {
        if (query) {
            return __WEBPACK_IMPORTED_MODULE_0_lodash__["filter"](array, function (row) { return row.name.indexOf(query) > -1; });
        }
        return array;
    };
    return DataFilterPipe;
}());
DataFilterPipe = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Pipe"])({
        name: 'dataFilter'
    })
], DataFilterPipe);

//# sourceMappingURL=datafilterpipe.js.map

/***/ }),

/***/ "../../../../../src/app/pages/messages/messages-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messages_component__ = __webpack_require__("../../../../../src/app/pages/messages/messages.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__messages_component__["a" /* MessagesComponent */],
        data: {
            title: 'Messages'
        }
    }
];
var MessagesRoutingModule = (function () {
    function MessagesRoutingModule() {
    }
    return MessagesRoutingModule;
}());
MessagesRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], MessagesRoutingModule);

//# sourceMappingURL=messages-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/messages/messages.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n  <div class=\"card\">\n    <div class=\"card-header\">Messages</div>\n    <div class=\"card-block\">\n      <div class=\"row mb-1\">\n        <div class=\"col-md-4 offset-md-8\">\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"filterQuery\" placeholder=\"Search by name\"/>\n          </div>\n        </div>\n      </div>\n      <table class=\"table table-striped\" [mfData]=\"messages | dataFilter : filterQuery\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n        <thead>\n        <tr>\n          <th style=\"width: 10%\">\n            <mfDefaultSorter by=\"createdAt\">Date</mfDefaultSorter>\n          </th>\n          <th style=\"width: 20%\">\n            <mfDefaultSorter by=\"data\">Data</mfDefaultSorter>\n          </th>\n          <th style=\"width: 10%\">\n            <mfDefaultSorter by=\"deviceId\">Device</mfDefaultSorter>\n          </th>\n          <th style=\"width: 20%\">\n            <mfDefaultSorter by=\"geolocation\">Geoloc</mfDefaultSorter>\n          </th>\n          <th style=\"width: 10%\">\n            <mfDefaultSorter by=\"seqNumber\">Seq Number</mfDefaultSorter>\n          </th>\n          <th style=\"width: 10%\">\n            <mfDefaultSorter by=\"RSSI\">RSSI</mfDefaultSorter>\n          </th>\n          <th style=\"width: 10%\">\n            <mfDefaultSorter by=\"RSSI\">Base Stations</mfDefaultSorter>\n          </th>\n          <th style=\"width: 10%\">\n            Options\n          </th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let item of mf.data\">\n          <td>{{item.createdAt | date:\"yyyy/MM/dd HH:mm:ss\"}}</td>\n          <td>{{item.data}}</td>\n          <td>{{item.deviceId}}</td>\n          <td>{{item.geolocation}}</td>\n          <td>{{item.seqNumber}}</td>\n          <td>{{item.RSSI}}</td>\n          <td>{{item.BaseStation}}</td>\n          <td>\n            <button type=\"button\" class=\"btn btn-danger\" (click)=\"remove(item)\">\n              <i class=\"fa fa-trash\"></i>\n            </button>\n          </td>\n        </tr>\n        </tbody>\n        <tfoot>\n        <tr>\n          <td colspan=\"4\">\n            <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,15]\"></mfBootstrapPaginator>\n          </td>\n        </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/messages/messages.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/pages/messages/messages.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MessagesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__ = __webpack_require__("../../../../../src/app/shared/sdk/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__ = __webpack_require__("../../../../../src/app/shared/sdk/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MessagesComponent = (function () {
    function MessagesComponent(rt, messageApi) {
        var _this = this;
        this.rt = rt;
        this.messageApi = messageApi;
        this.subscriptions = new Array();
        this.message = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["d" /* Message */]();
        this.messages = new Array();
        this.countMessages = 0;
        this.filterQuery = '';
        this.sortByWordLength = function (a) {
            return a.name.length;
        };
        this.subscriptions.push(this.rt.onReady().subscribe(function () {
            _this.messageRef = _this.rt.FireLoop.ref(__WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["d" /* Message */]);
            _this.messageRef.on('change', { limit: 1000, order: 'id DESC' }).subscribe(function (messages) {
                _this.messages = messages;
                console.log(_this.messages);
            });
        }));
    }
    MessagesComponent.prototype.toInt = function (num) {
        return +num;
    };
    MessagesComponent.prototype.ngOnInit = function () {
        console.log("Messages: ngOnInit");
    };
    MessagesComponent.prototype.ngOnDestroy = function () {
        console.log("Messages: ngOnDestroy");
        this.messageRef.dispose();
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    MessagesComponent.prototype.remove = function (message) {
        this.messageRef.remove(message).subscribe();
    };
    return MessagesComponent;
}());
MessagesComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-messages',
        template: __webpack_require__("../../../../../src/app/pages/messages/messages.component.html"),
        styles: [__webpack_require__("../../../../../src/app/pages/messages/messages.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["e" /* RealTime */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["e" /* RealTime */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["c" /* MessageApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["c" /* MessageApi */]) === "function" && _b || Object])
], MessagesComponent);

var _a, _b;
//# sourceMappingURL=messages.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/messages/messages.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessagesModule", function() { return MessagesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messages_component__ = __webpack_require__("../../../../../src/app/pages/messages/messages.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__messages_routing_module__ = __webpack_require__("../../../../../src/app/pages/messages/messages-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_datatable__ = __webpack_require__("../../../../angular2-datatable/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_angular2_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_angular2_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__datafilterpipe__ = __webpack_require__("../../../../../src/app/pages/messages/datafilterpipe.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




// DataTable



var MessagesModule = (function () {
    function MessagesModule() {
    }
    return MessagesModule;
}());
MessagesModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__messages_routing_module__["a" /* MessagesRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4_angular2_datatable__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__messages_component__["a" /* MessagesComponent */],
            __WEBPACK_IMPORTED_MODULE_5__datafilterpipe__["a" /* DataFilterPipe */]
        ]
    })
], MessagesModule);

//# sourceMappingURL=messages.module.js.map

/***/ })

});
//# sourceMappingURL=messages.module.chunk.js.map