"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
//@Injectable()
var OpentokService = /** @class */ (function () {
    function OpentokService() {
    }
    OpentokService.prototype.const = function () { };
    OpentokService.prototype.initSession = function () {
        return fetch(config_1.default.SAMPLE_SERVER_BASE_URL);
    };
    return OpentokService;
}());
exports.OpentokService = OpentokService;
//# sourceMappingURL=opentok.js.map