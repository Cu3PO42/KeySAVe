var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var IpcClient = require("electron-ipc-tunnel/client");
var _ = require("lodash");
(function () {
    var ElectronUpdater = (function (_super) {
        __extends(ElectronUpdater, _super);
        function ElectronUpdater() {
            _super.apply(this, arguments);
            this.updateInProgress = false;
        }
        ElectronUpdater.prototype.attached = function () {
            var _this = this;
            this.ipcClient = new IpcClient();
            this.ipcClient.on("update-available", function (changelog) {
                _this.changelog = _.map(changelog, function (e) { return "# " + e.name + "\n\n" + e.body; });
                _this.$.dialog.toggle();
                setTimeout(function () { return _this.$.dialog.refit(); }, 1000);
            });
            this.ipcClient.send("update-query");
        };
        ElectronUpdater.prototype.update = function () {
            var _this = this;
            this.ipcClient.send("update-do");
            this.updateInProgress = true;
            this.async(function () { return _this.$.dialog.refit(); });
        };
        ElectronUpdater.prototype.not = function (e) {
            return !e;
        };
        __decorate([
            property({ type: Boolean }), 
            __metadata('design:type', Boolean)
        ], ElectronUpdater.prototype, "updateInProgress", void 0);
        __decorate([
            property({ type: Array }), 
            __metadata('design:type', Array)
        ], ElectronUpdater.prototype, "changelog", void 0);
        ElectronUpdater = __decorate([
            component("electron-updater"), 
            __metadata('design:paramtypes', [])
        ], ElectronUpdater);
        return ElectronUpdater;
    })(polymer.Base);
    polymer.createElement(ElectronUpdater);
})();
