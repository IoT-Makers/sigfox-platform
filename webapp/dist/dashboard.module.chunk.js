webpackJsonp(["dashboard.module"],{

/***/ "../../../../../src/app/pages/dashboard/dashboard-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_component__ = __webpack_require__("../../../../../src/app/pages/dashboard/dashboard.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__dashboard_component__["a" /* DashboardComponent */],
        data: {
            title: 'Dashboard'
        }
    }
];
var DashboardRoutingModule = (function () {
    function DashboardRoutingModule() {
    }
    return DashboardRoutingModule;
}());
DashboardRoutingModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */].forChild(routes)],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["d" /* RouterModule */]]
    })
], DashboardRoutingModule);

//# sourceMappingURL=dashboard-routing.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"animated fadeIn\">\n\n  <div class=\"card-group\">\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <div class=\"h1 text-muted text-right mb-2\">\n          <i class=\"icon-tag\"></i>\n        </div>\n        <div class=\"h4 mb-0\">{{countCategories}}</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Categories</small>\n        <div class=\"progress progress-xs mt-1 mb-0\">\n          <div class=\"progress-bar bg-danger\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <div class=\"h1 text-muted text-right mb-2\">\n          <i class=\"icon-energy\"></i>\n        </div>\n        <div class=\"h4 mb-0\">{{countDevices}}</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Devices</small>\n        <div class=\"progress progress-xs mt-1 mb-0\">\n          <div class=\"progress-bar bg-warning\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <div class=\"h1 text-muted text-right mb-2\">\n          <i class=\"icon-compass\"></i>\n        </div>\n        <div class=\"h4 mb-0\">{{countMessages}}</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Messages</small>\n        <div class=\"progress progress-xs mt-1 mb-0\">\n          <div class=\"progress-bar bg-primary\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n    <div class=\"card\">\n      <div class=\"card-block\">\n        <div class=\"h1 text-muted text-right mb-2\">\n          <i class=\"icon-calculator\"></i>\n        </div>\n        <div class=\"h4 mb-0\">{{countParsers}}</div>\n        <small class=\"text-muted text-uppercase font-weight-bold\">Parsers</small>\n        <div class=\"progress progress-xs mt-1 mb-0\">\n          <div class=\"progress-bar bg-info\" role=\"progressbar\" style=\"width: 25%\" aria-valuenow=\"25\" aria-valuemin=\"0\" aria-valuemax=\"100\"></div>\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <div class=\"card\">\n    <div class=\"card-header\">Callback URL</div>\n    <div class=\"card-block card-info text-center text-white font-weight-bold font-2xl\">{{callbackURL}}</div>\n  </div>\n\n  <div class=\"card\">\n    <div class=\"card-header\">Last Messages</div>\n    <div class=\"card-block\">\n      <div class=\"row mb-1\">\n        <div class=\"col-md-4 offset-md-8\">\n          <div class=\"input-group\">\n            <span class=\"input-group-addon\"><i class=\"fa fa-search\"></i></span>\n            <input type=\"text\" class=\"form-control\" [(ngModel)]=\"filterQuery\" placeholder=\"Search by name\"/>\n          </div>\n        </div>\n      </div>\n      <table class=\"table table-striped\" [mfData]=\"data | dataFilter : filterQuery\" #mf=\"mfDataTable\" [mfRowsOnPage]=\"10\">\n        <thead>\n        <tr>\n          <th style=\"width: 20%\">\n            <mfDefaultSorter by=\"createdAt\">Date</mfDefaultSorter>\n          </th>\n          <th style=\"width: 40%\">\n            <mfDefaultSorter by=\"data\">Data</mfDefaultSorter>\n          </th>\n          <th style=\"width: 20%\">\n            <mfDefaultSorter by=\"deviceId\">Device</mfDefaultSorter>\n          </th>\n          <th style=\"width: 20%\">\n            <mfDefaultSorter by=\"geolocation\">Geoloc</mfDefaultSorter>\n          </th>\n        </tr>\n        </thead>\n        <tbody>\n        <tr *ngFor=\"let item of mf.data\">\n          <td>{{item.createdAt | date:\"yyyy/MM/dd HH:mm:ss\"}}</td>\n          <td>{{item.data}}</td>\n          <td>{{item.deviceId}}</td>\n          <td>{{item.geolocation}}</td>\n        </tr>\n        </tbody>\n        <tfoot>\n        <tr>\n          <td colspan=\"4\">\n            <mfBootstrapPaginator [rowsOnPageSet]=\"[5,10,15]\"></mfBootstrapPaginator>\n          </td>\n        </tr>\n        </tfoot>\n      </table>\n    </div>\n  </div>\n\n  <!--<div class=\"card-columns cols-2\">-->\n  <!--<div class=\"card\">-->\n  <!--<div class=\"card-header\">-->\n  <!--Line Chart-->\n  <!--<div class=\"card-actions\">-->\n  <!--<a href=\"http://www.chartjs.org\">-->\n  <!--<small class=\"text-muted\">docs</small>-->\n  <!--</a>-->\n  <!--</div>-->\n  <!--</div>-->\n  <!--<div class=\"card-block\">-->\n  <!--<div class=\"chart-wrapper\">-->\n  <!--<canvas baseChart class=\"chart\"-->\n  <!--[datasets]=\"lineChartData\"-->\n  <!--[labels]=\"lineChartLabels\"-->\n  <!--[options]=\"lineChartOptions\"-->\n  <!--[colors]=\"lineChartColours\"-->\n  <!--[legend]=\"lineChartLegend\"-->\n  <!--[chartType]=\"lineChartType\"-->\n  <!--(chartHover)=\"chartHovered($event)\"-->\n  <!--(chartClick)=\"chartClicked($event)\"></canvas>-->\n  <!--</div>-->\n  <!--</div>-->\n  <!--</div>-->\n  <!--</div>-->\n\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__ = __webpack_require__("../../../../../src/app/shared/sdk/models/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__ = __webpack_require__("../../../../../src/app/shared/sdk/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
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

// import { Router } from '@angular/router';



var DashboardComponent = (function () {
    function DashboardComponent(document, rt, messageApi, deviceApi, categoryApi, parserApi) {
        var _this = this;
        this.document = document;
        this.rt = rt;
        this.messageApi = messageApi;
        this.deviceApi = deviceApi;
        this.categoryApi = categoryApi;
        this.parserApi = parserApi;
        this.subscriptions = new Array();
        this.message = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["d" /* Message */]();
        this.messages = new Array();
        this.countMessages = 0;
        this.device = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["b" /* Device */]();
        this.devices = new Array();
        this.countDevices = 0;
        this.parser = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["e" /* Parser */]();
        this.parsers = new Array();
        this.countParsers = 0;
        this.category = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["a" /* Category */]();
        this.categories = new Array();
        this.countCategories = 0;
        // lineChart
        this.lineChartData = [
            { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
            { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
            { data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C' }
        ];
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartOptions = {
            animation: false,
            responsive: true
        };
        this.lineChartColours = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },
            {
                backgroundColor: 'rgba(77,83,96,0.2)',
                borderColor: 'rgba(77,83,96,1)',
                pointBackgroundColor: 'rgba(77,83,96,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(77,83,96,1)'
            },
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.subscriptions.push(this.rt.onReady().subscribe(function () {
            //Messages
            _this.messageRef = _this.rt.FireLoop.ref(__WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["d" /* Message */]);
            _this.messageRef.on('change').subscribe(function (messages) {
                _this.data = messages;
                _this.messages = messages;
                console.log("Messages", _this.messages);
                _this.messageApi.count().subscribe(function (result) {
                    console.log(messageApi);
                    console.log("count: ", result);
                    _this.countMessages = result.count;
                });
            });
            //Devices
            _this.deviceRef = _this.rt.FireLoop.ref(__WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["b" /* Device */]);
            _this.deviceRef.on('change').subscribe(function (devices) {
                _this.devices = devices;
                console.log("Devices", _this.devices);
                _this.deviceApi.count().subscribe(function (result) {
                    console.log(deviceApi);
                    console.log("count: ", result);
                    _this.countDevices = result.count;
                });
            });
            //Categories
            _this.categoryRef = _this.rt.FireLoop.ref(__WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["a" /* Category */]);
            _this.categoryRef.on('change').subscribe(function (categories) {
                _this.categories = categories;
                console.log("Categories", _this.categories);
                _this.categoryApi.count().subscribe(function (result) {
                    console.log(categoryApi);
                    console.log("count: ", result);
                    _this.countCategories = result.count;
                });
            });
            //Parsers
            _this.parserRef = _this.rt.FireLoop.ref(__WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["e" /* Parser */]);
            _this.parserRef.on('change').subscribe(function (parsers) {
                _this.parsers = parsers;
                console.log("Parsers", _this.parsers);
                _this.parserApi.count().subscribe(function (result) {
                    console.log(parserApi);
                    console.log("count: ", result);
                    _this.countParsers = result.count;
                });
            });
        }));
    }
    DashboardComponent.prototype.ngOnInit = function () {
        this.callbackURL = this.document.location.origin + "/api/Messages";
    };
    DashboardComponent.prototype.ngOnDestroy = function () {
        console.log("Dashboard: ngOnDestroy");
        this.messageRef.dispose();
        this.parserRef.dispose();
        this.categoryRef.dispose();
        this.deviceRef.dispose();
        this.subscriptions.forEach(function (subscription) { return subscription.unsubscribe(); });
    };
    DashboardComponent.prototype.create = function () {
        var _this = this;
        this.messageRef.create(this.message).subscribe(function () { return _this.message = new __WEBPACK_IMPORTED_MODULE_1__shared_sdk_models__["d" /* Message */](); });
    };
    DashboardComponent.prototype.update = function (message) {
        this.messageRef.upsert(message).subscribe();
    };
    DashboardComponent.prototype.remove = function (message) {
        this.messageRef.remove(message).subscribe();
    };
    // events
    DashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    return DashboardComponent;
}());
DashboardComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        template: __webpack_require__("../../../../../src/app/pages/dashboard/dashboard.component.html")
    }),
    __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Inject"])(__WEBPACK_IMPORTED_MODULE_3__angular_common__["DOCUMENT"])),
    __metadata("design:paramtypes", [Object, typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["e" /* RealTime */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["e" /* RealTime */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["c" /* MessageApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["c" /* MessageApi */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["b" /* DeviceApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["b" /* DeviceApi */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["a" /* CategoryApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["a" /* CategoryApi */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["d" /* ParserApi */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__shared_sdk_services__["d" /* ParserApi */]) === "function" && _e || Object])
], DashboardComponent);

var _a, _b, _c, _d, _e;
//# sourceMappingURL=dashboard.component.js.map

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/dashboard.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardModule", function() { return DashboardModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dashboard_component__ = __webpack_require__("../../../../../src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dashboard_routing_module__ = __webpack_require__("../../../../../src/app/pages/dashboard/dashboard-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/@angular/common.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__ = __webpack_require__("../../../../ng2-charts/ng2-charts.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_datatable__ = __webpack_require__("../../../../angular2-datatable/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_angular2_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_angular2_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__datafilterpipe__ = __webpack_require__("../../../../../src/app/pages/dashboard/datafilterpipe.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





// DataTable



var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_2__dashboard_routing_module__["a" /* DashboardRoutingModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_4_ng2_charts_ng2_charts__["ChartsModule"],
            __WEBPACK_IMPORTED_MODULE_5_angular2_datatable__["DataTableModule"],
            __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_1__dashboard_component__["a" /* DashboardComponent */],
            __WEBPACK_IMPORTED_MODULE_7__datafilterpipe__["a" /* DataFilterPipe */]
        ]
    })
], DashboardModule);

//# sourceMappingURL=dashboard.module.js.map

/***/ }),

/***/ "../../../../../src/app/pages/dashboard/datafilterpipe.ts":
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

/***/ })

});
//# sourceMappingURL=dashboard.module.chunk.js.map