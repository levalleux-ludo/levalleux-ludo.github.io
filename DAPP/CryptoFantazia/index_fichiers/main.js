(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../tezos/src/abstract.contract.ts":
/*!*****************************************!*\
  !*** ../tezos/src/abstract.contract.ts ***!
  \*****************************************/
/*! exports provided: AbstractContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractContract", function() { return AbstractContract; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../tezos/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _taquito_taquito__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @taquito/taquito */ "../tezos/node_modules/@taquito/taquito/dist/taquito.es5.js");
/* harmony import */ var _taquito_signer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taquito/signer */ "../tezos/node_modules/@taquito/signer/dist/taquito-signer.es5.js");



class AbstractContract {
    constructor(_address) {
        this._address = _address;
    }
    update() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const ci = yield _taquito_taquito__WEBPACK_IMPORTED_MODULE_1__["Tezos"].contract.at(this.address);
            this._storage = yield ci.storage();
            return this._storage;
        });
    }
    get address() {
        return this._address;
    }
    get storage() {
        return this._storage;
    }
    startWatching(period_ms, onChange) {
        if (this.watcher) {
            throw new Error('Unable to start watching because watching already active');
        }
        const callback = () => {
            try {
                // this.update().then((newStorage) => {
                const newStorage = this._storage;
                const newStorageStr = JSON.stringify(newStorage);
                if (newStorageStr !== this.oldStorageStr) {
                    console.log('Change detected in contract at ' + this.address);
                    this.oldStorageStr = newStorageStr;
                    if (onChange) {
                        onChange(newStorage);
                    }
                }
                setTimeout(callback, period_ms);
                // });
            }
            catch (err) {
                console.error('Error when updating contract:' + JSON.stringify(err));
                setTimeout(callback, period_ms);
            }
        };
        this.watcher = setTimeout(callback, period_ms);
    }
    stopWatching() {
        if (!this.watcher) {
            console.error('Unable to stop watching because watching is not currently active');
            return;
        }
        clearInterval(this.watcher);
        this.watcher = undefined;
    }
    get isWatching() {
        return this.watcher !== undefined;
    }
    callMethodTaquito(keyStore, operationName, callParams, operation, ...args) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            _taquito_taquito__WEBPACK_IMPORTED_MODULE_1__["Tezos"].setProvider({ signer: new _taquito_signer__WEBPACK_IMPORTED_MODULE_2__["InMemorySigner"](keyStore.privateKey) });
            return new Promise((resolve, reject) => {
                _taquito_taquito__WEBPACK_IMPORTED_MODULE_1__["Tezos"].contract.at(this._address).then((ci) => {
                    try {
                        let method = args.length === 0 ? operation(ci)(null)
                            : args.length === 1 ? operation(ci)(args[0])
                                : args.length === 2 ? operation(ci)(args[0], args[1])
                                    : args.length === 3 ? operation(ci)(args[0], args[1], args[2])
                                        : args.length === 4 ? operation(ci)(args[0], args[1], args[2], args[3])
                                            : args.length === 5 ? operation(ci)(args[0], args[1], args[2], args[3], args[4])
                                                : args.length === 6 ? operation(ci)(args[0], args[1], args[2], args[3], args[4], args[5])
                                                    : args.length === 7 ? operation(ci)(args[0], args[1], args[2], args[3], args[4], args[5], args[6])
                                                        : args.length === 8 ? operation(ci)(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7])
                                                            : undefined;
                        if (!method) {
                            throw new Error('Too many parameters: ' + args);
                        }
                        method.send(callParams).then((txOperation) => {
                            console.log(`returns from ${operationName} call: ${txOperation}`);
                            resolve({
                                txHash: txOperation.hash,
                                onConfirmed: txOperation.confirmation(1, 10, 180)
                            });
                        }).catch(err => {
                            console.error(`Error during ${operationName} call: ${err.id}, ${err.message}`);
                            reject(err);
                        });
                    }
                    catch (err) {
                        console.error(`Error during ${operationName} call: ${err.id}, ${err.message}`);
                        reject(err);
                    }
                });
            });
        });
    }
}


/***/ }),

/***/ "../tezos/src/assets.contract.json":
/*!*****************************************!*\
  !*** ../tezos/src/assets.contract.json ***!
  \*****************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"prim\":\"storage\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%admin\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"nat\"},{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%assetId\"]},{\"prim\":\"string\",\"annots\":[\"%assetType\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%featureCost\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%price\"]},{\"prim\":\"list\",\"args\":[{\"prim\":\"nat\"}],\"annots\":[\"%rentRates\"]}]}]}]}],\"annots\":[\"%assets\"]},{\"prim\":\"int\",\"annots\":[\"%debug\"]}]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"nat\"},{\"prim\":\"nat\"}],\"annots\":[\"%features\"]},{\"prim\":\"address\",\"annots\":[\"%gameContract\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"nat\"},{\"prim\":\"address\"}],\"annots\":[\"%ownership\"]},{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"set\",\"args\":[{\"prim\":\"nat\"}]}],\"annots\":[\"%portfolio\"]}]}]}]}]},{\"prim\":\"parameter\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%assetId\"]},{\"prim\":\"address\",\"annots\":[\"%buyer\"]}],\"annots\":[\"%buy\"]},{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%assetId\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}],\"annots\":[\"%invest\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%amount\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"string\",\"annots\":[\"%per\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}]}],\"annots\":[\"%pay_amount_per\"]}]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%assetId\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}],\"annots\":[\"%pay_rent\"]},{\"prim\":\"unit\",\"annots\":[\"%reset\"]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%setAdministrator\"]},{\"prim\":\"address\",\"annots\":[\"%setGameContract\"]}]}]}]}]},{\"prim\":\"code\",\"args\":[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.assets.contains(params.assetId)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"0\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:177\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"32\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:177\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:177\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"MUL\"},{\"prim\":\"EDIV\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"division by zero\"}]},{\"prim\":\"FAILWITH\"}]],[{\"prim\":\"CAR\"}]]},{\"prim\":\"ADD\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:177\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"DROP\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%from_\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}]}],\"annots\":[\"%transfer_amount\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:177\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SOME\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\",\"annots\":[\"%from_\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]]}]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"4\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%pay_amount\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\",\"annots\":[\"%player\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"8\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"DROP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"9\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:177\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SOME\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-nil-some\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"9\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"10\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"set\",\"args\":[{\"prim\":\"nat\"}]}]},{\"prim\":\"Some\",\"args\":[[]]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-nil-some\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: ((sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)) | (sp.sender == params.player)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.assets.contains(params.assetId)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:259\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.ownership[params.assetId] == params.player\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"4\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:259\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"COMPARE\"},{\"prim\":\"LT\"}]],[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}]]},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%pay_amount\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:259\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\",\"annots\":[\"%player\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:259\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"ADD\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"nat\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"1\"}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]]]}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: ((sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)) | (sp.sender == params.player)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:288\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"company\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"1\"}]},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"}]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:291\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"1\"}]},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"}]],[[]]]}]]]},{\"prim\":\"DROP\"}]]}]],[[]]]},{\"prim\":\"DUP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"0\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"LT\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%pay_amount\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"MUL\"},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\",\"annots\":[\"%player\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]]]}]]}],[{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: ((sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)) | (sp.sender == params.player)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.assets.contains(params.assetId)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:236\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"COMPARE\"},{\"prim\":\"NEQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:236\"}]},{\"prim\":\"FAILWITH\"}]],[]]}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"nat\"},{\"prim\":\"nat\"}]},[]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:236\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"1\"}]},{\"prim\":\"ADD\"}]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"DROP\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%from_\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}]}],\"annots\":[\"%transfer_amount\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:251\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:236\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SOME\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\",\"annots\":[\"%from_\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"address\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"set\",\"args\":[{\"prim\":\"nat\"}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"nat\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"DROP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"16\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]]}],[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (sp.sender == self.data.gameContract)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]]}]]},{\"prim\":\"PAIR\"}]]}]");

/***/ }),

/***/ "../tezos/src/assets.contract.ts":
/*!***************************************!*\
  !*** ../tezos/src/assets.contract.ts ***!
  \***************************************/
/*! exports provided: AssetsContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssetsContract", function() { return AssetsContract; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../tezos/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _abstract_contract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract.contract */ "../tezos/src/abstract.contract.ts");
/* harmony import */ var _assets_contract_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./assets.contract.json */ "../tezos/src/assets.contract.json");
var _assets_contract_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./assets.contract.json */ "../tezos/src/assets.contract.json", 1);
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tezos.service */ "../tezos/src/tezos.service.ts");




class AssetsContract extends _abstract_contract__WEBPACK_IMPORTED_MODULE_1__["AbstractContract"] {
    static deploy(keyStore, admin, gameContract, assets) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const address = yield _tezos_service__WEBPACK_IMPORTED_MODULE_3__["tezosService"].deployContract(JSON.stringify(_assets_contract_json__WEBPACK_IMPORTED_MODULE_2__), JSON.stringify(this.getInitialStorage(admin, gameContract, assets)), keyStore).catch(err => {
                console.error('Error during Assets contract deployment:' + err);
                throw (new Error('Error during Assets contract deployment:' + err));
            });
            return new AssetsContract(address);
        });
    }
    static retrieve(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // TODO: check if contract is correctly deployed at specified address
            const contract = new AssetsContract(address);
            yield contract.update();
            return contract;
        });
    }
    constructor(address) {
        super(address);
    }
    static getInitialStorage(admin, gameContract, assets) {
        const assetDescription = (assetId, type, price, featurePrice, rentRates) => {
            return {
                "prim": "Elt",
                "args": [
                    { "int": assetId.toFixed(0) },
                    {
                        "prim": "Pair",
                        "args": [
                            { "prim": "Pair", "args": [{ "int": assetId.toFixed(0) }, { "string": type }] },
                            {
                                "prim": "Pair",
                                "args": [
                                    { "int": featurePrice.toString() },
                                    { "prim": "Pair", "args": [{ "int": price.toString() }, [{ "int": rentRates[0].toString() }, { "int": rentRates[1].toString() }, { "int": rentRates[2].toString() }, { "int": rentRates[3].toString() }, { "int": rentRates[4].toString() }]] }
                                ]
                            }
                        ]
                    }
                ]
            };
        };
        const allAssets = [];
        for (const asset of assets) {
            if (asset.rentRates.length === 0) {
                if (asset.featurePrice !== 0) {
                    throw new Error('Was expecting some rentRates set for asset with id ' + asset.assetId);
                }
                asset.rentRates = [0, 0, 0, 0, 0];
            }
            if (asset.rentRates.length != 5) {
                throw new Error('Was expecting 5 elements in rentRates set for asset with id ' + asset.assetId);
            }
            allAssets.push(assetDescription(asset.assetId, asset.type, asset.price, asset.featurePrice, asset.rentRates));
        }
        return {
            "prim": "Pair",
            "args": [
                {
                    "prim": "Pair",
                    "args": [
                        { "string": admin },
                        {
                            "prim": "Pair",
                            "args": [
                                allAssets,
                                { "int": "0" }
                            ]
                        }
                    ]
                },
                { "prim": "Pair", "args": [{ "prim": "Pair", "args": [[], { "string": gameContract }] }, { "prim": "Pair", "args": [[], []] }] }
            ]
        };
    }
    buy(keyStore, assetId, buyer) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'buy';
            const operation = (ci) => ci.methods.buy;
            const callParams = { fee: 800000, gasLimit: 1000000, storageLimit: 50000 };
            return this.callMethodTaquito(keyStore, operationName, callParams, operation, assetId, buyer);
        });
    }
    reset(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'reset';
            const operation = (ci) => ci.methods.reset;
            const callParams = { fee: 800000, gasLimit: 1000000, storageLimit: 50000 };
            return this.callMethodTaquito(keyStore, operationName, callParams, operation);
        });
    }
}


/***/ }),

/***/ "../tezos/src/game.contract.json":
/*!***************************************!*\
  !*** ../tezos/src/game.contract.json ***!
  \***************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"prim\":\"storage\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%admin\"]},{\"prim\":\"address\",\"annots\":[\"%assets\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"set\",\"args\":[{\"prim\":\"address\"}],\"annots\":[\"%authorized_contracts\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%chance\"]},{\"prim\":\"address\",\"annots\":[\"%community\"]}]}]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%creator\"]},{\"prim\":\"set\",\"args\":[{\"prim\":\"address\"}],\"annots\":[\"%immunized\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%lapIncome\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%nbLaps\"]},{\"prim\":\"int\",\"annots\":[\"%nbSpaces\"]}]}]}]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%nextPlayer\"]},{\"prim\":\"int\",\"annots\":[\"%nextPlayerIdx\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"key\",\"annots\":[\"%originator_pubKey\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"int\"}],\"annots\":[\"%playerPositions\"]},{\"prim\":\"map\",\"args\":[{\"prim\":\"int\"},{\"prim\":\"address\"}],\"annots\":[\"%players\"]}]}]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"set\",\"args\":[{\"prim\":\"address\"}],\"annots\":[\"%playersSet\"]},{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"int\"}],\"annots\":[\"%quarantinePlayers\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%quarantineSpaceId\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"string\",\"annots\":[\"%status\"]},{\"prim\":\"address\",\"annots\":[\"%token\"]}]}]}]}]}]}]},{\"prim\":\"parameter\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"unit\",\"annots\":[\"%end\"]},{\"prim\":\"unit\",\"annots\":[\"%freeze\"]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%give_immunity\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}],\"annots\":[\"%go_to_space\"]}]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}],\"annots\":[\"%move_n_spaces\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}],\"annots\":[\"%pay_amount\"]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"string\",\"annots\":[\"%per\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%pay_amount_per\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"string\",\"annots\":[\"%option\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%assetId\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%cardId\"]},{\"prim\":\"int\",\"annots\":[\"%dice1\"]}]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%dice2\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%newPosition\"]},{\"prim\":\"set\",\"args\":[{\"prim\":\"string\"}],\"annots\":[\"%options\"]}]}]}],\"annots\":[\"%payload\"]},{\"prim\":\"signature\",\"annots\":[\"%signature\"]}]}],\"annots\":[\"%play\"]}]}]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%put_in_quarantine\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%player\"]},{\"prim\":\"int\",\"annots\":[\"%value\"]}],\"annots\":[\"%receive_amount\"]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"unit\",\"annots\":[\"%register\"]},{\"prim\":\"unit\",\"annots\":[\"%reset_complete\"]}]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"unit\",\"annots\":[\"%reset_start\"]},{\"prim\":\"unit\",\"annots\":[\"%resume\"]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%setCreator\"]},{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%assets\"]},{\"prim\":\"address\",\"annots\":[\"%chance\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%community\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"int\",\"annots\":[\"%initialBalance\"]},{\"prim\":\"address\",\"annots\":[\"%token\"]}]}]}],\"annots\":[\"%start\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%from_\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%transfer_amount\"]}]}]}]}]}]}]},{\"prim\":\"code\",\"args\":[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"started\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"frozen\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (self.data.status == 'started') | (self.data.status == 'frozen')\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.creator\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DROP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"ended\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"}]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"started\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.status == 'started'\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.creator\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DROP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"frozen\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]]},{\"prim\":\"DROP\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:532\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"9\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"9\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:532\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"LT\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%mint\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]]]}]]}],[{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:519\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"GE\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SUB\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%mint\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"LT\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%address\"]},{\"prim\":\"nat\",\"annots\":[\"%amount\"]}]}],\"annots\":[\"%burn\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%address\",\"%amount\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]]}],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%amount\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"string\",\"annots\":[\"%per\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}]}]}],\"annots\":[\"%pay_amount_per\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%per\",\"%player\"]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PAIR\",\"annots\":[\"%amount\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"started\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.status == 'started'\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SENDER\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.nextPlayer == sp.sender\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PACK\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CHECK_SIGNATURE\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.check_signature(self.data.originator_pubKey, params.signature, sp.pack(params.payload))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: params.payload.options.contains(params.option)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:-1\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"ADD\"},{\"prim\":\"ADD\"},{\"prim\":\"EDIV\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"division by zero\"}]},{\"prim\":\"FAILWITH\"}]],[{\"prim\":\"CDR\"}]]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (((self.data.playerPositions[sp.sender] + params.payload.dice1) + params.payload.dice2) % self.data.nbSpaces) == sp.as_nat(params.payload.newPosition)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:-1\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"9\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SOME\"},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:-1\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"LT\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%mint\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"SENDER\"},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"COVID\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SOME\"},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ADD\"},{\"prim\":\"SOME\"},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]}]]]}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"STARTUP_FOUND\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%assetId\"]},{\"prim\":\"address\",\"annots\":[\"%buyer\"]}]}],\"annots\":[\"%buy\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"SENDER\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%assetId\",\"%buyer\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"BUY_PRODUCT\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%assetId\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}]}],\"annots\":[\"%pay_rent\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"SENDER\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%assetId\",\"%player\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"CHANCE\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%chanceId\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}]}],\"annots\":[\"%perform\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"SENDER\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%chanceId\",\"%player\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"COMMUNITY_CHEST\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%chanceId\"]},{\"prim\":\"address\",\"annots\":[\"%player\"]}]}],\"annots\":[\"%perform\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"SENDER\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%chanceId\",\"%player\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"DUP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"LOOP\",\"args\":[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SIZE\"},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"GE\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"10\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SIZE\"},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SUB\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"12\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ADD\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"10\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"11\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:572\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DROP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:450\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"GT\"}]],[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]}]]},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DROP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"12\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]}]],[[]]]},{\"prim\":\"DUP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]]]}]]}]]}],[{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ADD\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]]},{\"prim\":\"DROP\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%mint\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]]}],[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"created\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.status == 'created'\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (self.data.playersSet.contains(sp.sender)) == False\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DROP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"SENDER\"},{\"prim\":\"SOME\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SIZE\"},{\"prim\":\"INT\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"resetting\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.status == 'resetting'\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"created\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"-1\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"0\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"Some\",\"args\":[{\"int\":\"0\"}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]},{\"prim\":\"DROP\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]]}],[{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"resetting\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"SWAP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"address\"}],\"annots\":[\"%resetBalance\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"frozen\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.status == 'frozen'\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.creator\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DROP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"started\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]]}],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (sp.sender == self.data.creator)\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"created\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.status == 'created'\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"started\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"DUP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"LOOP\",\"args\":[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SIZE\"},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"GE\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SIZE\"},{\"prim\":\"INT\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SUB\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"int\"},{\"int\":\"1\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"ADD\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]],[[]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:572\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"DROP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}]]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:450\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"GT\"}]],[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]}]]},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"DROP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"int\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]}]],[[]]]},{\"prim\":\"DUP\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"}]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"ITER\",\"args\":[[{\"prim\":\"SWAP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}]}],\"annots\":[\"%mint\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"nat\"},{\"int\":\"1500\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"PAIR\",\"annots\":[\"%to\",\"%value\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DROP\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"MEM\"}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | (self.data.authorized_contracts.contains(sp.sender))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%amount\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%f\"]},{\"prim\":\"address\",\"annots\":[\"%t\"]}]}]}],\"annots\":[\"%transfer\"]},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"PAIR\",\"annots\":[\"%f\",\"%t\"]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"PAIR\",\"annots\":[\"%amount\"]},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]]]}]]}]]}]]}]]},{\"prim\":\"PAIR\"}]]}]");

/***/ }),

/***/ "../tezos/src/game.contract.ts":
/*!*************************************!*\
  !*** ../tezos/src/game.contract.ts ***!
  \*************************************/
/*! exports provided: GameContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameContract", function() { return GameContract; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../tezos/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _abstract_contract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract.contract */ "../tezos/src/abstract.contract.ts");
/* harmony import */ var _taquito_taquito__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @taquito/taquito */ "../tezos/node_modules/@taquito/taquito/dist/taquito.es5.js");
/* harmony import */ var _taquito_signer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @taquito/signer */ "../tezos/node_modules/@taquito/signer/dist/taquito-signer.es5.js");
/* harmony import */ var _game_contract_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./game.contract.json */ "../tezos/src/game.contract.json");
var _game_contract_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./game.contract.json */ "../tezos/src/game.contract.json", 1);
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tezos.service */ "../tezos/src/tezos.service.ts");
/* harmony import */ var _assets_contract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./assets.contract */ "../tezos/src/assets.contract.ts");







class GameContract extends _abstract_contract__WEBPACK_IMPORTED_MODULE_1__["AbstractContract"] {
    constructor(address) {
        super(address);
    }
    static deploy(keyStore, creator_address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const address = yield _tezos_service__WEBPACK_IMPORTED_MODULE_5__["tezosService"].deployContract(JSON.stringify(_game_contract_json__WEBPACK_IMPORTED_MODULE_4__), JSON.stringify(this.getInitialStorage(keyStore, creator_address)), keyStore).catch(err => {
                console.error('Error during game contract deployment:' + err);
                throw (new Error('Error during game contract deployment:' + err));
            });
            return new GameContract(address);
        });
    }
    static retrieve(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // TODO: check if contract is correctly deployed at specified address
            const contract = new GameContract(address);
            yield contract.update();
            return contract;
        });
    }
    static getInitialStorage(originator, creator) {
        return {
            "prim": "Pair",
            "args": [
                {
                    "prim": "Pair",
                    "args": [
                        {
                            "prim": "Pair",
                            "args": [
                                { "prim": "Pair", "args": [{ "string": originator.publicKeyHash }, { "string": originator.publicKeyHash }] },
                                {
                                    "prim": "Pair",
                                    "args": [[], { "prim": "Pair", "args": [{ "string": originator.publicKeyHash }, { "string": originator.publicKeyHash }] }]
                                }
                            ]
                        },
                        {
                            "prim": "Pair",
                            "args": [
                                { "prim": "Pair", "args": [{ "string": creator }, []] },
                                { "prim": "Pair", "args": [{ "int": "200" }, { "prim": "Pair", "args": [{ "int": "0" }, { "int": "24" }] }] }
                            ]
                        }
                    ]
                },
                {
                    "prim": "Pair",
                    "args": [
                        {
                            "prim": "Pair",
                            "args": [
                                { "prim": "Pair", "args": [{ "string": originator.publicKeyHash }, { "int": "-1" }] },
                                { "prim": "Pair", "args": [{ "string": originator.publicKey }, { "prim": "Pair", "args": [[], []] }] }
                            ]
                        },
                        {
                            "prim": "Pair",
                            "args": [
                                { "prim": "Pair", "args": [[], []] },
                                { "prim": "Pair", "args": [{ "int": "12" }, { "prim": "Pair", "args": [{ "string": "created" }, { "string": originator.publicKeyHash }] }] }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    register(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'register';
            const operation = (ci) => ci.methods.register;
            const callParams = { fee: 400000, gasLimit: 1000000, storageLimit: 20000 };
            return this.callMethodTaquito(keyStore, operationName, callParams, operation);
        });
    }
    start(keyStore, tokenAddress, chanceAddress, communityAddress, assetsAddress, initialBalance) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'start';
            _taquito_taquito__WEBPACK_IMPORTED_MODULE_2__["Tezos"].setProvider({ signer: new _taquito_signer__WEBPACK_IMPORTED_MODULE_3__["InMemorySigner"](keyStore.privateKey) });
            return new Promise((resolve, reject) => {
                _taquito_taquito__WEBPACK_IMPORTED_MODULE_2__["Tezos"].contract.at(this._address).then((ci) => {
                    try {
                        ci.methods.start(assetsAddress, chanceAddress, communityAddress, initialBalance, tokenAddress).send({ fee: 400000, gasLimit: 1000000, storageLimit: 50000 }).then((txOperation) => {
                            console.log(`returns from ${operationName} call: ${txOperation}`);
                            resolve({
                                txHash: txOperation.hash,
                                onConfirmed: txOperation.confirmation(1, 10, 180)
                            });
                        }).catch(err => {
                            console.error(`Error during ${operationName} call: ${err.id}, ${err.message}`);
                            reject(err);
                        });
                    }
                    catch (err) {
                        console.error(`Error during ${operationName} call: ${err.id}, ${err.message}`);
                        reject(err);
                    }
                });
            });
        });
    }
    // async start(keyStore: KeyStore, tokenAddress: string, initialBalance: number) {
    //      return tezosService.invokeContract(keyStore, this._address, 'start', [initialBalance, '"' + tokenAddress + '"']);
    // }
    testCallToken(keyStore, tokenAddress) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'testCallToken';
            const operation = (ci) => ci.methods.testCallToken;
            return this.callMethodTaquito(keyStore, operationName, undefined, operation, tokenAddress);
        });
    }
    testCallTokenAdminOnly(keyStore, tokenAddress) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'testCallTokenAdminOnly';
            const operation = (ci) => ci.methods.testCallTokenAdminOnly;
            return this.callMethodTaquito(keyStore, operationName, undefined, operation, tokenAddress);
        });
    }
    end(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'end';
            const operation = (ci) => ci.methods.end;
            return this.callMethodTaquito(keyStore, operationName, undefined, operation);
        });
    }
    freeze(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'freeze';
            const operation = (ci) => ci.methods.freeze;
            return this.callMethodTaquito(keyStore, operationName, undefined, operation);
        });
    }
    resume(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'resume';
            const operation = (ci) => ci.methods.resume;
            return this.callMethodTaquito(keyStore, operationName, undefined, operation);
        });
    }
    reset(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const operationName = 'reset_start';
                const operation = (ci) => ci.methods.reset_start;
                this.callMethodTaquito(keyStore, operationName, { fee: 400000, gasLimit: 900000, storageLimit: 20000 }, operation)
                    .then(operationResult => {
                    operationResult.onConfirmed.then(() => {
                        var _a;
                        _assets_contract__WEBPACK_IMPORTED_MODULE_6__["AssetsContract"].retrieve((_a = this._storage) === null || _a === void 0 ? void 0 : _a.assets).then((assetsContract) => {
                            assetsContract.reset(keyStore).then((resetResult) => {
                                resetResult.onConfirmed.then(() => {
                                    const operationName2 = 'reset_complete';
                                    const operation2 = (ci) => ci.methods.reset_start;
                                    resolve(this.callMethodTaquito(keyStore, operationName2, { fee: 400000, gasLimit: 900000, storageLimit: 20000 }, operation2));
                                }).catch(err => reject(err));
                            }).catch(err => reject(err));
                        }).catch(err => reject(err));
                    }).catch(err => reject(err));
                }).catch(err => reject(err));
            });
        });
    }
    reset_complete(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'reset_complete';
            const operation = (ci) => ci.methods.reset_complete;
            return this.callMethodTaquito(keyStore, operationName, { fee: 400000, gasLimit: 900000, storageLimit: 20000 }, operation);
        });
    }
    play2(keyStore, option, payload, signature) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let allOptions = '{';
            for (const an_option of payload.options) {
                allOptions += `"${an_option}"`;
            }
            allOptions += '}';
            return _tezos_service__WEBPACK_IMPORTED_MODULE_5__["tezosService"].invokeContract(keyStore, this._address, 'play', [
                `"${option}"`,
                payload.assetId,
                payload.cardId,
                payload.dice1,
                payload.dice2,
                payload.newPosition,
                allOptions,
                `"${signature}"`
            ]);
        });
    }
    play(keyStore, option, payload, signature) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'play';
            const operation = (ci) => ci.methods.play;
            return this.callMethodTaquito(keyStore, operationName, { fee: 800000, gasLimit: 1000000, storageLimit: 50000 }, operation, option, payload.assetId, payload.cardId, payload.dice1, payload.dice2, payload.newPosition, payload.options, signature);
        });
    }
    setInitialBalances(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const operationName = 'setInitialBalances';
            const operation = (ci) => ci.methods.resume;
            return this.callMethodTaquito(keyStore, operationName, undefined, operation);
        });
    }
    isRegistered(account) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                var _a;
                if (!this.isWatching) {
                    this.update().then(() => {
                        var _a;
                        const isRegistered = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.playersSet.includes(account);
                        resolve(isRegistered);
                    }).catch(err => reject(err));
                }
                else {
                    const isRegistered = (_a = this.storage) === null || _a === void 0 ? void 0 : _a.playersSet.includes(account);
                    resolve(isRegistered);
                }
            });
        });
    }
    getStatus() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.isWatching)
                yield this.update();
            return (_a = this.storage) === null || _a === void 0 ? void 0 : _a.status;
        });
    }
    getNextPlayer() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.isWatching)
                yield this.update();
            return (_a = this.storage) === null || _a === void 0 ? void 0 : _a.nextPlayer;
        });
    }
    getPlayers() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.isWatching)
                yield this.update();
            return (_a = this.storage) === null || _a === void 0 ? void 0 : _a.playersSet;
        });
    }
    getCreator() {
        var _a;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!this.isWatching)
                yield this.update();
            return (_a = this.storage) === null || _a === void 0 ? void 0 : _a.creator;
        });
    }
}
GameContract.payloadFormat = {
    "prim": "pair",
    "args": [{
            "prim": "pair",
            "args": [
                { "prim": "nat", "annots": ["%assetId"] },
                { "prim": "pair", "args": [{ "prim": "nat", "annots": ["%cardId"] }, { "prim": "int", "annots": ["%dice1"] }] }
            ]
        },
        {
            "prim": "pair",
            "args": [
                { "prim": "int", "annots": ["%dice2"] },
                {
                    "prim": "pair",
                    "args": [
                        { "prim": "int", "annots": ["%newPosition"] },
                        { "prim": "set", "args": [{ "prim": "string" }], "annots": ["%options"] }
                    ]
                }
            ]
        }
    ]
};


/***/ }),

/***/ "../tezos/src/tezos.service.ts":
/*!*************************************!*\
  !*** ../tezos/src/tezos.service.ts ***!
  \*************************************/
/*! exports provided: tezosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(process, __dirname, Buffer) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tezosService", function() { return tezosService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../tezos/node_modules/tslib/tslib.es6.js");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! fs */ "./node_modules/node-libs-browser/mock/empty.js");
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! util */ "./node_modules/util/util.js");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var conseiljs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! conseiljs */ "../tezos/node_modules/conseiljs/dist/index-web.js");
/* harmony import */ var conseiljs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(conseiljs__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! path */ "./node_modules/path-browserify/index.js");
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! bignumber.js */ "../tezos/node_modules/bignumber.js/bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _taquito_rpc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @taquito/rpc */ "../tezos/node_modules/@taquito/rpc/dist/taquito-rpc.es5.js");
/* harmony import */ var _taquito_michelson_encoder__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @taquito/michelson-encoder */ "../tezos/node_modules/@taquito/michelson-encoder/dist/taquito-michelson-encoder.es5.js");
/* harmony import */ var _taquito_taquito__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @taquito/taquito */ "../tezos/node_modules/@taquito/taquito/dist/taquito.es5.js");
/* harmony import */ var _taquito_signer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @taquito/signer */ "../tezos/node_modules/@taquito/signer/dist/taquito-signer.es5.js");










const platform = 'tezos';
// const tezosNode = 'https://tezos-dev.cryptonomic-infra.tech:443';
const tezosNode = 'https://carthagenet.SmartPy.io';
const conseilServer = {
    url: 'https://conseil-dev.cryptonomic-infra.tech:443',
    apiKey: '79e54a13-0b95-4e4d-a509-c38cb0158361',
    network: 'carthagenet'
};
const networkBlockTime = 30 + 1; // since testnet's block time is 30 seconds, we wait 31 seconds before checking for a block update
const accountsWalletFolder = process.env.TEZOS_ACCOUNTS_DIR || path__WEBPACK_IMPORTED_MODULE_4__["join"](__dirname, "../accounts");
_taquito_taquito__WEBPACK_IMPORTED_MODULE_8__["Tezos"].setProvider({
    rpc: tezosNode,
    signer: new _taquito_signer__WEBPACK_IMPORTED_MODULE_9__["InMemorySigner"]('edskRu8Tv5h8MPcHMdsF7JugmHhNCqhyb891LHdBggc3zYAkvs3aTYe8eHNZCEngGrf4bY4s6eGjR5Y9X6dVCEAdnewei1XaST')
});
class TezosService {
    static clearRPCOperationGroupHash(hash) {
        return hash.replace(/\"/g, '').replace(/\n/, '');
    }
    initAccount(account) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(" ~~ initAccount");
            console.log(`loading ${account} faucet file`);
            const accountFile = path__WEBPACK_IMPORTED_MODULE_4__["join"](accountsWalletFolder, `${account}.json`);
            if (!fs__WEBPACK_IMPORTED_MODULE_1__["existsSync"](accountFile)) {
                throw new Error(`File ${accountFile} does not exist (__dirname=${__dirname})`);
            }
            const faucetAccount = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1__["readFileSync"](accountFile, 'utf8'));
            const keystore = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosWalletUtil"].unlockFundraiserIdentity(faucetAccount['mnemonic'].join(' '), faucetAccount['email'], faucetAccount['password'], faucetAccount['pkh']);
            console.log(`public key: ${keystore.publicKey}`);
            console.log(`secret key: ${keystore.privateKey}`);
            console.log(`account hash: ${keystore.publicKeyHash}`);
            return { keyStore: keystore, secret: faucetAccount['secret'] };
        });
    }
    activateAccount(keyStore, secret) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(`activateAccount ${keyStore.publicKeyHash}`);
            const accountRecord = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].getAccount(conseilServer, conseilServer.network, keyStore.publicKeyHash);
            if (accountRecord !== undefined) {
                return accountRecord['account_id'];
            }
            const result = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeWriter"].sendIdentityActivationOperation(tezosNode, keyStore, secret);
            const groupId = TezosService.clearRPCOperationGroupHash(result.operationGroupID);
            console.log(`Injected operation group id ${groupId}`);
            const conseilResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].awaitOperationConfirmation(conseilServer, conseilServer.network, groupId, 5, networkBlockTime);
            console.log(`Activated account at ${conseilResult.pkh}`);
            return conseilResult.pkh;
        });
    }
    checkAccount(accountId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].getAccount(conseilServer, conseilServer.network, accountId);
        });
    }
    getNetworks() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            try {
                const networks = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilMetadataClient"].getNetworks(conseilServer, platform);
                console.log('Networks: ', networks.length);
                for (const net of networks) {
                    console.log(net);
                }
                return networks;
            }
            catch (err) {
                console.error(err);
            }
            ;
            return [];
        });
    }
    getNode() {
        return tezosNode;
    }
    revealAccount(keyStore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(`revealAccount`);
            if (yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeReader"].isManagerKeyRevealedForAccount(tezosNode, keyStore.publicKeyHash)) {
                return keyStore.publicKeyHash;
            }
            const result = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeWriter"].sendKeyRevealOperation(tezosNode, keyStore);
            const groupId = TezosService.clearRPCOperationGroupHash(result.operationGroupID);
            console.log(`Injected operation group id ${groupId}`);
            const conseilResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].awaitOperationConfirmation(conseilServer, conseilServer.network, groupId, 5, networkBlockTime);
            console.log(`Revealed account at ${conseilResult.source}`);
            return conseilResult.source;
        });
    }
    accountInfo(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            let accountQuery = conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilQueryBuilder"].blankQuery();
            accountQuery = conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilQueryBuilder"].addFields(accountQuery, 'account_id', 'delegate_value', 'balance', 'block_level');
            accountQuery = conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilQueryBuilder"].addPredicate(accountQuery, 'account_id', conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilOperator"].EQ, [address], false);
            accountQuery = conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilQueryBuilder"].setLimit(accountQuery, 1);
            const result = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["ConseilDataClient"].executeEntityQuery(conseilServer, platform, conseilServer.network, 'accounts', accountQuery);
            console.log(`${util__WEBPACK_IMPORTED_MODULE_2__["inspect"](result, false, 2, false)}`);
            return result;
        });
    }
    verifyDestination(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return conseiljs__WEBPACK_IMPORTED_MODULE_3__["Tzip7ReferenceTokenHelper"].verifyDestination(tezosNode, address);
        });
    }
    deployContract(contract, storage, keystore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeWriter"].sendContractOriginationOperation(tezosNode, keystore, 0, // amount
            undefined, // delegate
            800000, // fee,
            '', // derivationPath
            20000, // storage_limit
            900000, // gas_limit
            contract, storage, conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosParameterFormat"].Micheline).catch(err => {
                throw new Error(`Exception when deploying contract: ${err}`);
            });
            const groupId = TezosService.clearRPCOperationGroupHash(result.operationGroupID);
            console.log(`Injected operation group id ${groupId}`);
            let nbTries = 3;
            while (true) {
                try {
                    const conseilResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].awaitOperationConfirmation(conseilServer, conseilServer.network, groupId, 5, networkBlockTime);
                    console.log(`Originated contract at ${conseilResult.originated_contracts}`);
                    return conseilResult.originated_contracts;
                }
                catch (err) {
                    // just retry nbTries times at worst
                    if (nbTries-- <= 0) {
                        throw err;
                    }
                }
            }
        });
    }
    deployContract2(contract, storage, keystore) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const result = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeWriter"].sendContractOriginationOperation('https://carthagenet.SmartPy.io', keystore, 0, // amount
            undefined, // delegate
            100000, // fee,
            '', // derivationPath
            20000, // storage_limit
            500000, // gas_limit
            contract, storage, conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosParameterFormat"].Michelson);
            const groupId = TezosService.clearRPCOperationGroupHash(result.operationGroupID);
            console.log(`Injected operation group id ${groupId}`);
            const conseilResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].awaitOperationConfirmation(conseilServer, conseilServer.network, groupId, 5, networkBlockTime);
            console.log(`Originated contract at ${conseilResult.originated_contracts}`);
            return conseilResult.originated_contracts;
        });
    }
    invokeContract(keystore, address, entryPoint, parameters, onTxCreated) {
        var _a, _b;
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log(`invokeContract`);
            // parameters.forEach((param, index, array) => {
            //     if ( util.isString(param) && param.charAt(0) !== '"') {
            //         console.log("transform param", param);
            //         param = '"' + param + '"';
            //         console.log('after:', param)
            //         array[index] = param;
            //     }
            // })
            const entryPointsMap = yield this.parseContract(address);
            const ep = entryPointsMap.get(entryPoint);
            const params = (_a = ep) === null || _a === void 0 ? void 0 : _a.generateInvocationPair(...parameters);
            // const params = parameters.length > 0 ? ep?.generateInvocationPair(...parameters) : undefined;
            const fee = Number((yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].getFeeStatistics(conseilServer, conseilServer.network, conseiljs__WEBPACK_IMPORTED_MODULE_3__["OperationKindType"].Transaction))[0]['high']);
            console.log('fee', fee);
            let storageResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeReader"].getContractStorage(tezosNode, address);
            console.log(`initial storage: ${JSON.stringify(storageResult)}`);
            const parameterFormat = conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosParameterFormat"].Michelson;
            yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeWriter"].testContractInvocationOperation(tezosNode, 'main', keystore, address, 0, // amount
            fee, // fee
            50000, // storage_limit
            1000000, // gas_limit
            entryPoint, (_b = params) === null || _b === void 0 ? void 0 : _b.parameters, parameterFormat).then(({ gas, storageCost }) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                var _c;
                console.log(`gas: ${gas}, storageCost:${storageCost}`);
                // const gas = 100000;
                const factor = 1; // is avoiding Tx failed with gas_exhausted.operation ??
                // const storageCost = 5000;
                const nodeResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeWriter"].sendContractInvocationOperation(tezosNode, keystore, address, 0, // amount
                factor * fee, // fee
                '', // derivationPath
                factor * storageCost, //storage_limit
                1000000, // gas_limit
                entryPoint, parameters.length > 0 ? (_c = params) === null || _c === void 0 ? void 0 : _c.parameters : undefined, parameters.length > 0 ? parameterFormat : undefined);
                const groupId = TezosService.clearRPCOperationGroupHash(nodeResult.operationGroupID);
                console.log(`Injected transaction(invocation) operation with ${groupId}`);
                const conseilResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].awaitOperationConfirmation(conseilServer, conseilServer.network, groupId, 5, networkBlockTime);
                console.log(`Completed invocation of ${conseilResult.destination}`);
                storageResult = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeReader"].getContractStorage(tezosNode, address);
                console.log(`modified storage: ${JSON.stringify(storageResult)}`);
            })).catch(err => {
                console.error(err);
                throw new Error(err);
            });
        });
    }
    readContract(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            console.log('readContract');
            return yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeReader"].getContractStorage(tezosNode, address);
        });
    }
    parseContract(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const map = new Map();
            const entryPoints = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosContractIntrospector"].generateEntryPointsFromAddress(conseilServer, conseilServer.network, address);
            for (const entryPoint of entryPoints) {
                map.set(entryPoint.name, entryPoint);
                console.log(`entryPoint:${entryPoint.name}(${entryPoint.parameters.map(p => (p.name ? p.name + ': ' : '') + 'type:' + p.type + (p.optional ? '?' : '')).join(', ')})`);
                console.log(`structure:${entryPoint.structure}`);
            }
            return map;
        });
    }
    dumpMempool(account) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const rr = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosNodeReader"].getMempoolOperationsForAccount(tezosNode, account);
            yield Promise.all(rr.map((r) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                const ttl = '?'; // await TezosNodeReader.estimateBranchTimeout(tezosNode, r['branch']); <-- method not available yet in conseilJS current version
                const t = r['contents'][0];
                console.log(`operation ${r['hash']} for ${new bignumber_js__WEBPACK_IMPORTED_MODULE_5___default.a(t.amount || 0).toNumber()}xtz expires in ${ttl} blocks`);
            })));
        });
    }
    awaitOperationConfirmation(hash, duration) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosConseilClient"].awaitOperationConfirmation(conseilServer, conseilServer.network, hash, duration, networkBlockTime);
        });
    }
    getAccountFromFile(accountFile) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (!fs__WEBPACK_IMPORTED_MODULE_1__["existsSync"](accountFile)) {
                throw new Error(`File ${accountFile} does not exist`);
            }
            const faucetAccount = JSON.parse(fs__WEBPACK_IMPORTED_MODULE_1__["readFileSync"](accountFile, 'utf8'));
            return this.getAccountFromIdentity(faucetAccount);
        });
    }
    getAccountFromIdentity(identityData) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const keyStore = yield conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosWalletUtil"].unlockFundraiserIdentity(identityData['mnemonic'].join(' '), identityData['email'], identityData['password'], identityData['pkh']);
            yield this.activateAccount(keyStore, identityData['secret']);
            yield this.revealAccount(keyStore);
            return keyStore;
        });
    }
    getAccount(account) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const accountFile = path__WEBPACK_IMPORTED_MODULE_4__["join"](accountsWalletFolder, `${account}.json`);
            return this.getAccountFromFile(accountFile);
        });
    }
    packData(format, ...props) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const schema = new _taquito_michelson_encoder__WEBPACK_IMPORTED_MODULE_7__["ParameterSchema"](format);
                const data = schema.Encode.apply(schema, props);
                console.log('data', JSON.stringify(data));
                const rpcClient = new _taquito_rpc__WEBPACK_IMPORTED_MODULE_6__["RpcClient"](tezosNode);
                rpcClient.packData({
                    data: data,
                    type: format,
                }).then((data) => {
                    resolve(Buffer.from(data.packed, 'hex'));
                }).catch(err => reject(err));
            });
        });
    }
    packData2(format, obj) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const schema = new _taquito_michelson_encoder__WEBPACK_IMPORTED_MODULE_7__["ParameterSchema"](format);
                const props = Object.keys(obj).sort().map(field => { var _a; return (_a = Object.getOwnPropertyDescriptor(obj, field)) === null || _a === void 0 ? void 0 : _a.value; });
                const data = schema.Encode.apply(schema, props);
                console.log('data', JSON.stringify(data));
                const rpcClient = new _taquito_rpc__WEBPACK_IMPORTED_MODULE_6__["RpcClient"](tezosNode);
                rpcClient.packData({
                    data: data,
                    type: format,
                }).then((data) => {
                    resolve(Buffer.from(data.packed, 'hex'));
                }).catch(err => reject(err));
            });
        });
    }
    make_signature(payload, privateKey) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const key = conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosMessageUtils"].writeKeyWithHint(privateKey, 'edpk');
                const hash = conseiljs__WEBPACK_IMPORTED_MODULE_3__["CryptoUtils"].simpleHash(payload, 32);
                conseiljs__WEBPACK_IMPORTED_MODULE_3__["CryptoUtils"].signDetached(hash, key).then((signedBuffer) => {
                    const signature = conseiljs__WEBPACK_IMPORTED_MODULE_3__["TezosMessageUtils"].readSignatureWithHint(signedBuffer, 'edsig');
                    resolve(signature);
                }).catch(err => reject(err));
            });
        });
    }
}
const tezosService = new TezosService();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../www/node_modules/process/browser.js */ "./node_modules/process/browser.js"), "/", __webpack_require__(/*! ./../../www/node_modules/buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "../tezos/src/token.contract.json":
/*!****************************************!*\
  !*** ../tezos/src/token.contract.json ***!
  \****************************************/
/*! exports provided: 0, 1, 2, default */
/***/ (function(module) {

module.exports = JSON.parse("[{\"prim\":\"storage\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%admin\"]},{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"nat\"}],\"annots\":[\"%approvals\"]},{\"prim\":\"nat\",\"annots\":[\"%balance\"]}]}],\"annots\":[\"%balances\"]}]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"bool\",\"annots\":[\"%paused\"]},{\"prim\":\"nat\",\"annots\":[\"%totalSupply\"]}]}]}]},{\"prim\":\"parameter\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%address\"]},{\"prim\":\"nat\",\"annots\":[\"%amount\"]}],\"annots\":[\"%burn\"]},{\"prim\":\"or\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%arg\"]},{\"prim\":\"address\",\"annots\":[\"%target\"]}],\"annots\":[\"%getBalance\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%to\"]},{\"prim\":\"nat\",\"annots\":[\"%value\"]}],\"annots\":[\"%mint\"]}]}]},{\"prim\":\"or\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%resetBalance\"]},{\"prim\":\"or\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%setAdministrator\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"nat\",\"annots\":[\"%amount\"]},{\"prim\":\"pair\",\"args\":[{\"prim\":\"address\",\"annots\":[\"%f\"]},{\"prim\":\"address\",\"annots\":[\"%t\"]}]}],\"annots\":[\"%transfer\"]}]}]}]}]},{\"prim\":\"code\",\"args\":[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"IF_LEFT\",\"args\":[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:29\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"GE\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.balances[params.address].balance >= params.amount\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-any\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:29\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"SUB\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SUB\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"CONTRACT\",\"args\":[{\"prim\":\"nat\"}]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]},{\"prim\":\"SWAP\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"mutez\"},{\"int\":\"0\"}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:48\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"TRANSFER_TOKENS\"},{\"prim\":\"CONS\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"nat\"}],\"annots\":[\"%approvals\"]},{\"prim\":\"nat\",\"annots\":[\"%balance\"]}]}]},{\"prim\":\"Some\",\"args\":[{\"prim\":\"Pair\",\"args\":[[],{\"int\":\"0\"}]}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-any\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:22\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]]}]]}],[[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:53\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"SUB\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"NONE\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"nat\"}],\"annots\":[\"%approvals\"]},{\"prim\":\"nat\",\"annots\":[\"%balance\"]}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]],[[]]]},{\"prim\":\"DROP\"}]],[{\"prim\":\"IF_LEFT\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: sp.sender == self.data.admin\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"}]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]}],[[{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"EQ\"},{\"prim\":\"IF\",\"args\":[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"True\"}]}],[[{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:35\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:-1\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"COMPARE\"},{\"prim\":\"GE\"}]]]}]]]}]]]},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: (sp.sender == self.data.admin) | ((~ self.data.paused) & ((params.f == sp.sender) | (self.data.balances[params.f].approvals[sp.sender] >= params.amount)))\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"MEM\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"option\",\"args\":[{\"prim\":\"pair\",\"args\":[{\"prim\":\"map\",\"args\":[{\"prim\":\"address\"},{\"prim\":\"nat\"}],\"annots\":[\"%approvals\"]},{\"prim\":\"nat\",\"annots\":[\"%balance\"]}]}]},{\"prim\":\"Some\",\"args\":[{\"prim\":\"Pair\",\"args\":[[],{\"int\":\"0\"}]}]}]},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]]]},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:35\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"GE\"},{\"prim\":\"IF\",\"args\":[[[]],[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"WrongCondition: self.data.balances[params.f].balance >= params.amount\"}]},{\"prim\":\"FAILWITH\"}]]]},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-any\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:35\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"SUB\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-any\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CDR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:39\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CDR\"},{\"prim\":\"ADD\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"COMPARE\"},{\"prim\":\"NEQ\"},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SENDER\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"3\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CAR\"},{\"prim\":\"COMPARE\"},{\"prim\":\"NEQ\"}]],[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"bool\"},{\"prim\":\"False\"}]}]]},{\"prim\":\"IF\",\"args\":[[[{\"prim\":\"SWAP\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"CAR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CDR\"},{\"prim\":\"DUP\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"4\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"5\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"2\"}]},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"set_in_top-any\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"DUP\"},{\"prim\":\"CDR\"},{\"prim\":\"SWAP\"},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"6\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"7\"}]},{\"prim\":\"CAR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"CAR\"},{\"prim\":\"CDR\"},{\"prim\":\"DIG\",\"args\":[{\"int\":\"8\"}]},{\"prim\":\"DUP\"},{\"prim\":\"DUG\",\"args\":[{\"int\":\"9\"}]},{\"prim\":\"CDR\"},{\"prim\":\"CAR\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:35\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"CAR\"},{\"prim\":\"SENDER\"},{\"prim\":\"GET\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"string\"},{\"string\":\"Get-item:-1\"}]},{\"prim\":\"FAILWITH\"}]],[]]},{\"prim\":\"SUB\"},{\"prim\":\"ISNAT\"},{\"prim\":\"IF_NONE\",\"args\":[[[{\"prim\":\"PUSH\",\"args\":[{\"prim\":\"unit\"},{\"prim\":\"Unit\"}]},{\"prim\":\"FAILWITH\"}]],[[]]]},{\"prim\":\"SOME\"},{\"prim\":\"SENDER\"},{\"prim\":\"UPDATE\"},{\"prim\":\"PAIR\"},{\"prim\":\"SOME\"},{\"prim\":\"SWAP\"},{\"prim\":\"UPDATE\"},{\"prim\":\"SWAP\"},{\"prim\":\"PAIR\"},{\"prim\":\"PAIR\"},{\"prim\":\"SWAP\"}]],[[]]]},{\"prim\":\"DROP\"}]]]}]]},{\"prim\":\"NIL\",\"args\":[{\"prim\":\"operation\"}]}]]]},{\"prim\":\"PAIR\"}]]}]");

/***/ }),

/***/ "../tezos/src/token.contract.ts":
/*!**************************************!*\
  !*** ../tezos/src/token.contract.ts ***!
  \**************************************/
/*! exports provided: TokenContract */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenContract", function() { return TokenContract; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../tezos/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _abstract_contract__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract.contract */ "../tezos/src/abstract.contract.ts");
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tezos.service */ "../tezos/src/tezos.service.ts");
/* harmony import */ var _token_contract_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./token.contract.json */ "../tezos/src/token.contract.json");
var _token_contract_json__WEBPACK_IMPORTED_MODULE_3___namespace = /*#__PURE__*/__webpack_require__.t(/*! ./token.contract.json */ "../tezos/src/token.contract.json", 1);




const initialStorage = {};
class TokenContract extends _abstract_contract__WEBPACK_IMPORTED_MODULE_1__["AbstractContract"] {
    static deploy(keyStore, administrator) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // const address = await tokenService.createContract(
            //     keyStore,
            //     administrator
            // );
            // return new TokenContract(address);
            const address = yield _tezos_service__WEBPACK_IMPORTED_MODULE_2__["tezosService"].deployContract(JSON.stringify(_token_contract_json__WEBPACK_IMPORTED_MODULE_3__), JSON.stringify(this.getInitialStorage(administrator)), keyStore).catch(err => {
                console.error('Error during token contract deployment:' + err);
                throw (new Error('Error during token contract deployment:' + err));
            });
            return new TokenContract(address);
        });
    }
    static retrieve(address) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const contract = new TokenContract(address);
            yield contract.update();
            return contract;
        });
    }
    static getInitialStorage(admin) {
        return {
            "prim": "Pair",
            "args": [
                { "prim": "Pair", "args": [{ "string": admin }, []] },
                { "prim": "Pair", "args": [{ "prim": "False" }, { "int": "0" }] }
            ]
        };
    }
    ;
    constructor(address) {
        super(address);
    }
    getBalances(players) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const balances = new Map();
                const promises = [];
                for (let address of players) {
                    promises.push(new Promise((resolve2, reject2) => {
                        var _a;
                        const account = (_a = this._storage) === null || _a === void 0 ? void 0 : _a.balances.get(address);
                        if (account) {
                            const value = account.balance.toNumber();
                            balances.set(address, value);
                        }
                        resolve2();
                    }));
                }
                Promise.all(promises).then(() => {
                    resolve(balances);
                }).catch(() => {
                    resolve(new Map()); // never fail
                });
            });
        });
    }
}


/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./node_modules/webpack/hot sync ^\\.\\/log$":
/*!*************************************************!*\
  !*** (webpack)/hot sync nonrecursive ^\.\/log$ ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./log": "./node_modules/webpack/hot/log.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/webpack/hot sync ^\\.\\/log$";

/***/ }),

/***/ "./src/app/_components/alert/alert.component.ts":
/*!******************************************************!*\
  !*** ./src/app/_components/alert/alert.component.ts ***!
  \******************************************************/
/*! exports provided: AlertComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertComponent", function() { return AlertComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");





function AlertComponent_div_0_clr_alert_1_div_4_a_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function AlertComponent_div_0_clr_alert_1_div_4_a_6_Template_a_click_0_listener() { const option_r56 = ctx.$implicit; return option_r56.callback(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const option_r56 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](option_r56.label);
} }
function AlertComponent_div_0_clr_alert_1_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "clr-dropdown");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "clr-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "clr-dropdown-menu", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, AlertComponent_div_0_clr_alert_1_div_4_a_6_Template, 2, 1, "a", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const alert_r53 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", alert_r53.config.actions.label, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", alert_r53.config.actions.options);
} }
function AlertComponent_div_0_clr_alert_1_Template(rf, ctx) { if (rf & 1) {
    const _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-alert", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("clrAlertClosedChange", function AlertComponent_div_0_clr_alert_1_Template_clr_alert_clrAlertClosedChange_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60); const alert_r53 = ctx.$implicit; const ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r59.onClose(alert_r53.alertId); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "clr-alert-item");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "span", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, AlertComponent_div_0_clr_alert_1_div_4_Template, 7, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const alert_r53 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrAlertType", alert_r53.config.clrAlertType)("clrAlertClosable", alert_r53.config.clrAlertClosable)("clrAlertAppLevel", alert_r53.config.clrAlertAppLevel);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", alert_r53.config.message, "\n");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", alert_r53.config.actions);
} }
function AlertComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, AlertComponent_div_0_clr_alert_1_Template, 5, 5, "clr-alert", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r51 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r51.alertService.alerts);
} }
class AlertComponent {
    constructor(alertService) {
        this.alertService = alertService;
    }
    ngOnInit() {
    }
    onClose(value) {
        this.alertService.onClose(value);
    }
}
AlertComponent.ɵfac = function AlertComponent_Factory(t) { return new (t || AlertComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"])); };
AlertComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AlertComponent, selectors: [["app-alert"]], decls: 1, vars: 1, consts: [["class", "alerts-container", 4, "ngIf"], [1, "alerts-container"], [3, "clrAlertType", "clrAlertClosable", "clrAlertAppLevel", "clrAlertClosedChange", 4, "ngFor", "ngForOf"], [3, "clrAlertType", "clrAlertClosable", "clrAlertAppLevel", "clrAlertClosedChange"], [1, "alert-text"], ["class", "alert-actions", 4, "ngIf"], [1, "alert-actions"], ["clrDropdownTrigger", "", 1, "dropdown-toggle"], ["shape", "caret down"], ["clrPosition", "bottom-right"], ["class", "dropdown-item", "clrDropdownItem", "", 3, "click", 4, "ngFor", "ngForOf"], ["clrDropdownItem", "", 1, "dropdown-item", 3, "click"]], template: function AlertComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, AlertComponent_div_0_Template, 2, 1, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.alertService.alerts.length > 0);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAlert"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAlertItem"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAlertText"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDropdown"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDropdownTrigger"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrIconCustomTag"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDropdownMenu"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrDropdownItem"]], styles: [".alerts-container[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n  position: absolute;\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvYWxlcnQvRTpcXEx1ZG9cXERvY3VtZW50c1xcRGV2ZWxvcHBlbWVudFxcQ3J5cHRvRmFudGFzaWFcXHd3dy9zcmNcXGFwcFxcX2NvbXBvbmVudHNcXGFsZXJ0XFxhbGVydC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvYWxlcnQvYWxlcnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuYWxlcnRzLWNvbnRhaW5lciB7XHJcbiAgICBtYXJnaW4tYm90dG9tOiAyNHB4O1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuIiwiLmFsZXJ0cy1jb250YWluZXIge1xuICBtYXJnaW4tYm90dG9tOiAyNHB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AlertComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-alert',
                templateUrl: './alert.component.html',
                styleUrls: ['./alert.component.scss']
            }]
    }], function () { return [{ type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/board/board.component.ts":
/*!******************************************************!*\
  !*** ./src/app/_components/board/board.component.ts ***!
  \******************************************************/
/*! exports provided: BoardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BoardComponent", function() { return BoardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/game-controller.service */ "./src/app/_services/game-controller.service.ts");
/* harmony import */ var src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js");
/* harmony import */ var src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/spaces.service */ "./src/app/_services/spaces.service.ts");
/* harmony import */ var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/_services/card.service */ "./src/app/_services/card.service.ts");
/* harmony import */ var src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/_services/tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _space_details_space_details_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../space-details/space-details.component */ "./src/app/_components/space-details/space-details.component.ts");
/* harmony import */ var _dice_dice_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../dice/dice.component */ "./src/app/_components/dice/dice.component.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _carousel_carousel_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../carousel/carousel.component */ "./src/app/_components/carousel/carousel.component.ts");
/* harmony import */ var _carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../carousel/carousel-item.directive */ "./src/app/_components/carousel/carousel-item.directive.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");



















const _c0 = ["carousel"];
function BoardComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "You are now at:");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "app-space-details", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1204 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("space", ctx_r1204.spacesMap.get(ctx_r1204.showSpace));
} }
function BoardComponent_div_6_div_1_Template(rf, ctx) { if (rf & 1) {
    const _r1213 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](3, " It's your turn ! Please Roll the Dices ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "button", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BoardComponent_div_6_div_1_Template_button_click_4_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1213); const ctx_r1212 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2); return ctx_r1212.rollDices(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](5, "Roll the Dices");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function BoardComponent_div_6_progress_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "progress", 20);
} if (rf & 2) {
    const ctx_r1210 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", ctx_r1210.progress * 10);
} }
function BoardComponent_div_6_div_13_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Reveal");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1214 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("This is your Chance Card: ", ctx_r1214.chances.get(ctx_r1214.showCardId), "");
} }
function BoardComponent_div_6_div_13_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Reveal");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1215 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("This is your Community Chest Card: ", ctx_r1215.community_chests.get(ctx_r1215.showCardId), "");
} }
function BoardComponent_div_6_div_13_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Congratulations, you'll receive \u2131 200 passing through Genesis Block !");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function BoardComponent_div_6_div_13_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Bad luck, you're going to Quarantine");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function BoardComponent_div_6_div_13_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1218 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" You've just purchase the amazing product of company '", ctx_r1218.spacesMap.get(ctx_r1218.showSpace).title, "' ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Please pay ", ctx_r1218.spacesMap.get(ctx_r1218.showSpace).rentRates[0], "");
} }
function BoardComponent_div_6_div_13_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r1223 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "clr-radio-container", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "clr-radio-wrapper", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function BoardComponent_div_6_div_13_div_6_Template_input_ngModelChange_7_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1223); const ctx_r1222 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); return ctx_r1222.selectedOption = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10, "Yes, great idea !");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "clr-radio-wrapper", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "input", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("ngModelChange", function BoardComponent_div_6_div_13_div_6_Template_input_ngModelChange_12_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1223); const ctx_r1224 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); return ctx_r1224.selectedOption = $event; });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](13, "label");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](14, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](15, "Sorry, not interested");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1219 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Take the opportunity to found the startup '", ctx_r1219.spacesMap.get(ctx_r1219.showSpace).title, "' ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Founding capital: ", ctx_r1219.spacesMap.get(ctx_r1219.showSpace).price, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", "STARTUP_FOUND");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r1219.selectedOption);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("value", "NOTHING");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngModel", ctx_r1219.selectedOption);
} }
function BoardComponent_div_6_div_13_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, " Nothing happens this turn. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} }
function BoardComponent_div_6_div_13_div_8_Template(rf, ctx) { if (rf & 1) {
    const _r1226 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function BoardComponent_div_6_div_13_div_8_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1226); const ctx_r1225 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3); return ctx_r1225.play(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Submit");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1221 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("disabled", !ctx_r1221.showOptions.includes(ctx_r1221.selectedOption));
} }
function BoardComponent_div_6_div_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BoardComponent_div_6_div_13_div_1_Template, 5, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BoardComponent_div_6_div_13_div_2_Template, 5, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BoardComponent_div_6_div_13_div_3_Template, 3, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](4, BoardComponent_div_6_div_13_div_4_Template, 3, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, BoardComponent_div_6_div_13_div_5_Template, 5, 2, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, BoardComponent_div_6_div_13_div_6_Template, 16, 6, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, BoardComponent_div_6_div_13_div_7_Template, 3, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, BoardComponent_div_6_div_13_div_8_Template, 3, 1, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](9, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1211 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length > 0 && ctx_r1211.showOptions.includes("CHANCE") && ctx_r1211.showCardId !== 0 - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length > 0 && ctx_r1211.showOptions.includes("COMMUNITY_CHEST") && ctx_r1211.showCardId !== 0 - 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length > 0 && ctx_r1211.showOptions.includes("GENESIS"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length > 0 && ctx_r1211.showOptions.includes("COVID"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length > 0 && ctx_r1211.showOptions.includes("BUY_PRODUCT"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length > 0 && ctx_r1211.showOptions.includes("STARTUP_FOUND"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions.length === 1 && ctx_r1211.showOptions.includes("NOTHING"));
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1211.showOptions && ctx_r1211.showOptions.length > 0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate2"]("showOptions: ", ctx_r1211.showOptions, " length: ", ctx_r1211.showOptions.length, "");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("selectedOption: ", ctx_r1211.selectedOption, "");
} }
function BoardComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BoardComponent_div_6_div_1_Template, 6, 0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](3, "app-dice", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "app-dice", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](6, "div", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](7, " Total ");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](10, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](11, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, BoardComponent_div_6_progress_12_Template, 1, 1, "progress", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](13, BoardComponent_div_6_div_13_Template, 13, 11, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1205 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx_r1205.gameService.iAmPlaying());
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("name", "PoW")("imagesList", ctx_r1205.imagesDicePOW)("value", ctx_r1205.dicePOWValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("name", "PoS")("imagesList", ctx_r1205.imagesDicePOS)("value", ctx_r1205.dicePOSValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](5);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate"](ctx_r1205.dicePOWValue + ctx_r1205.dicePOSValue);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1205.rolling);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx_r1205.gameService.iAmPlaying());
} }
function BoardComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1206 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", ctx_r1206.gameService.getUsername(ctx_r1206.gameService.nextPlayer), " is currently playing ...");
} }
function BoardComponent_app_carousel_9_ng_container_2_ng_container_1_img_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 33);
} if (rf & 2) {
    const player_r1232 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", player_r1232.image, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("matTooltip", player_r1232.name);
} }
function BoardComponent_app_carousel_9_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BoardComponent_app_carousel_9_ng_container_2_ng_container_1_img_3_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const slide_r1229 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("fxLayoutGap", "", (0 - 6) * slide_r1229.players.length, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", slide_r1229.players);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", slide_r1229.src, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", slide_r1229.alt)("title", slide_r1229.title);
} }
function BoardComponent_app_carousel_9_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BoardComponent_app_carousel_9_ng_container_2_ng_container_1_Template, 5, 5, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function BoardComponent_app_carousel_9_Template(rf, ctx) { if (rf & 1) {
    const _r1235 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-carousel", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("step", function BoardComponent_app_carousel_9_Template_app_carousel_step_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1235); const ctx_r1234 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r1234.onCarouselStep($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BoardComponent_app_carousel_9_ng_container_2_Template, 2, 0, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1207 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showControls", false)("itemWidth", 200 - 24)("containerWidth", 340)("containerHeight", 300);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1207.slidesStore);
} }
function BoardComponent_app_carousel_10_ng_container_2_ng_container_1_img_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "img", 33);
} if (rf & 2) {
    const player_r1241 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("src", player_r1241.image, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("matTooltip", player_r1241.name);
} }
function BoardComponent_app_carousel_10_ng_container_2_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](3, BoardComponent_app_carousel_10_ng_container_2_ng_container_1_img_3_Template, 1, 2, "img", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](4, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const slide_r1238 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate1"]("fxLayoutGap", "", (0 - 6) * slide_r1238.players.length, "px");
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", slide_r1238.players);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("src", slide_r1238.src, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsanitizeUrl"])("alt", slide_r1238.alt)("title", slide_r1238.title);
} }
function BoardComponent_app_carousel_10_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, BoardComponent_app_carousel_10_ng_container_2_ng_container_1_Template, 5, 5, "ng-container", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();
} }
function BoardComponent_app_carousel_10_Template(rf, ctx) { if (rf & 1) {
    const _r1244 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-carousel", 25, 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("step", function BoardComponent_app_carousel_10_Template_app_carousel_step_0_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r1244); const ctx_r1243 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"](); return ctx_r1243.onCarouselStep($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BoardComponent_app_carousel_10_ng_container_2_Template, 2, 0, "ng-container", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1208 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("showControls", false)("itemWidth", 300 - 36)("containerWidth", 800)("containerHeight", 300);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx_r1208.slidesStore);
} }
class BoardComponent {
    constructor(gameService, gameController, ngZone, changeDetectorRef, connectionService, media, spacesService, cardService, tezosService) {
        this.gameService = gameService;
        this.gameController = gameController;
        this.ngZone = ngZone;
        this.changeDetectorRef = changeDetectorRef;
        this.connectionService = connectionService;
        this.media = media;
        this.spacesService = spacesService;
        this.cardService = cardService;
        this.tezosService = tezosService;
        this.items = [
            { title: 'Slide 1' },
            { title: 'Slide 2' },
            { title: 'Slide 3' },
        ];
        this.playerBlock = 1;
        this.targetPOS = 1;
        this.targetPOW = 1;
        this.slidesStore = [];
        this.imagesDicePOW = [
            'assets/dices/dice_1_1.png',
            'assets/dices/dice_1_2.png',
            'assets/dices/dice_1_3.png',
            'assets/dices/dice_1_4.png',
            'assets/dices/dice_1_5.png',
            'assets/dices/dice_1_6.png',
        ];
        this.imagesDicePOS = [
            'assets/dices/dice_2_1.png',
            'assets/dices/dice_2_2.png',
            'assets/dices/dice_2_3.png',
            'assets/dices/dice_2_4.png',
            'assets/dices/dice_2_5.png',
            'assets/dices/dice_2_6.png',
        ];
        this.rolling = false;
        this.progress = 0;
        this.showSpace = -1;
        this.currentAlicePosition = 0;
        this.showOptions = [];
        this.showCardId = -1;
        this.spacesMap = new Map();
        this.chances = new Map();
        this.community_chests = new Map();
        this.diceAnimated = false;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    get carouselSizeParams() {
        return {
            containerWidth: 300,
            containerHeight: 340,
            itemWidth: 200 - 24,
            imageWidth: '200px'
        };
    }
    ngOnInit() {
        this.cardService.getChances().then((cards) => {
            this.chances = new Map();
            for (const card of cards) {
                this.chances.set(card.cardId, this.cardService.computeText(card));
            }
        });
        this.cardService.getCommunityChests().then((cards) => {
            this.community_chests = new Map();
            for (const card of cards) {
                this.community_chests.set(card.cardId, this.cardService.computeText(card));
            }
        });
        this.spacesService.getSpaces().then((spaces) => {
            this.spacesMap = new Map();
            for (const space of spaces) {
                this.spacesMap.set(space.spaceId, space);
            }
            this.slidesStore = spaces.map(space => {
                return {
                    id: space.spaceId,
                    src: `assets/blocks/block_${space.image}`,
                    alt: space.title,
                    title: space.title,
                    players: []
                };
            });
            const myPosition = this.gameService.playersPosition.get(this.tezosService.account.account_id);
            this.showSpace = (myPosition !== undefined) ? myPosition : -1;
            if (this.spacesMap.has(myPosition)) {
                setTimeout(() => {
                    this.carousel.setCurrentPosition(myPosition);
                }, 500);
            }
            this.changeDetectorRef.detectChanges();
        });
    }
    ngAfterViewInit() {
        this.dicePOWValue = Math.floor(1 + 6 * Math.random());
        this.dicePOSValue = Math.floor(1 + 6 * Math.random());
        const myPosition = this.gameService.playersPosition.get(this.tezosService.account.account_id);
        this.showSpace = (myPosition !== undefined) ? myPosition : -1;
        if (this.spacesMap.has(myPosition)) {
            setTimeout(() => {
                this.carousel.setCurrentPosition(myPosition);
            }, 500);
        }
        this.gameService.onPlayerMove.subscribe(({ player, nemPosition, oldPosition }) => {
            if ((player === this.tezosService.account.account_id) && !this.diceAnimated) {
                this.showSpace = nemPosition;
            }
            if ((oldPosition !== undefined) && (oldPosition >= 0) && (oldPosition < this.slidesStore.length)) {
                this.slidesStore[oldPosition].players = this.slidesStore[oldPosition].players.filter(player => player.address !== player);
            }
            if ((nemPosition !== undefined) && (nemPosition >= 0) && (nemPosition < this.slidesStore.length)) {
                this.slidesStore[nemPosition].players.push({ address: player, image: this.gameService.getAvatar(player), name: this.gameService.getUsername(player) });
            }
        });
        if (this.gameService.iAmPlaying() && this.gameService.lastTurn.has(this.tezosService.account.account_id)) {
            this.showOptions = this.gameService.lastTurn.get(this.tezosService.account.account_id).options;
            if (this.showOptions.length === 1) {
                this.selectedOption = this.showOptions[0];
            }
            else {
                this.selectedOption = undefined;
            }
            this.showCardId = this.gameService.lastTurn.get(this.tezosService.account.account_id).cardId;
            this.dicePOWValue = this.gameService.lastTurn.get(this.tezosService.account.account_id).dices[0];
            this.dicePOSValue = this.gameService.lastTurn.get(this.tezosService.account.account_id).dices[1];
        }
    }
    goto(position) {
        this.carousel.goto(position);
    }
    onCarouselStep(event) {
        console.log(`onCarouselStep(${event})`);
        const prevBlock = (event > 0) ? event - 1 : this.slidesStore.length - 1;
    }
    rollDices() {
        this.gameController.rollTheDices().then((rollResult) => {
            const targetPOW = rollResult.payload.dice1;
            const targetPOS = rollResult.payload.dice2;
            this.diceAnimated = true;
            this.animateDices(targetPOW, targetPOS).then(() => {
                this.carousel.goto(rollResult.payload.newPosition, (newPosition) => {
                    this.showSpace = newPosition;
                    this.diceAnimated = false;
                    this.showOptions = rollResult.payload.options;
                    if (this.showOptions.length === 1) {
                        this.selectedOption = this.showOptions[0];
                    }
                    else {
                        this.selectedOption = undefined;
                    }
                    this.showCardId = rollResult.payload.cardId;
                });
            });
        });
    }
    animateDices(targetPOW, targetPOS) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let countdown = 10;
                this.progress = 10 - countdown;
                this.rolling = true;
                this.showSpace = -1;
                const interval = setInterval(() => {
                    let dicePOW;
                    let dicePOS;
                    if (--countdown <= 0) {
                        clearInterval(interval);
                        // this.rolling = false; // no need to set rolling to false because the progress bat fades out by itself
                        dicePOW = targetPOW;
                        dicePOS = targetPOS;
                        resolve();
                    }
                    else {
                        dicePOW = Math.floor(1 + 6 * Math.random());
                        dicePOS = Math.floor(1 + 6 * Math.random());
                    }
                    this.ngZone.run(() => {
                        this.progress = 10 - countdown;
                        this.dicePOWValue = dicePOW;
                        this.dicePOSValue = dicePOS;
                    });
                }, 250);
            });
        });
    }
    play() {
        this.gameController.play(this.selectedOption);
    }
}
BoardComponent.ɵfac = function BoardComponent_Factory(t) { return new (t || BoardComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_3__["GameControllerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_4__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["MediaMatcher"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_6__["SpacesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__["CardService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_8__["TezosService"])); };
BoardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: BoardComponent, selectors: [["app-board"]], viewQuery: function BoardComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.carousel = _t.first);
    } }, decls: 11, vars: 8, consts: [["fxLayout", "column", "fxLayoutAlign", "start center", "fxLayoutGap", "24px"], ["fxLayout", "row", "fxLayout.sm", "column", "fxLayout.xs", "column", "fxLayoutAlign", "center center", "fxLayoutGap", "24px"], ["fxFlex", "", "class", "bloc", 4, "ngIf"], ["fxFlex", "", "fxLayout", "column", "fxLayoutAlign", "center center", "fxLayoutGap", "24px"], [1, "bloc"], [4, "ngIf"], [3, "showControls", "itemWidth", "containerWidth", "containerHeight", "step", 4, "ngIf"], ["fxFlex", "", 1, "bloc"], [2, "text-align", "center", "margin-top", "0"], [3, "space"], ["fxLayout", "row", "fxLayoutGap", "12px", 2, "width", "340px"], ["fxFlex", "", 3, "name", "imagesList", "value"], [2, "text-align", "center"], [1, "story-message"], [1, "dices-total"], [2, "height", "24px", "width", "340px"], [1, "progress", "flash", "progress-fade"], ["max", "100", "data-displayval", "", 3, "value", 4, "ngIf"], ["fxLayout", "column"], [1, "btn", "btn-primary", 3, "click"], ["max", "100", "data-displayval", "", 3, "value"], [2, "margin-top", "0px", "margin-bottom", "24px"], [2, "height", "60px"], ["type", "radio", "clrRadio", "", 3, "value", "ngModel", "ngModelChange"], [1, "btn", "btn-primary", 3, "disabled", "click"], [3, "showControls", "itemWidth", "containerWidth", "containerHeight", "step"], ["carousel", ""], [4, "ngFor", "ngForOf"], [4, "appCarouselItem"], [2, "margin-left", "-24px"], ["fxLayout", "row", "fxLayoutAlign", "center center", 1, "players", 3, "fxLayoutGap"], ["width", "48px", 3, "src", "matTooltip", 4, "ngFor", "ngForOf"], ["width", "200px", 3, "src", "alt", "title"], ["width", "48px", 3, "src", "matTooltip"], [2, "margin-left", "-36px"], ["width", "300px", 3, "src", "alt", "title"]], template: function BoardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](2, BoardComponent_div_2_Template, 4, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](5, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, BoardComponent_div_6_Template, 14, 10, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](7, BoardComponent_div_7_Template, 3, 1, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, BoardComponent_app_carousel_9_Template, 3, 5, "app-carousel", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](10, BoardComponent_app_carousel_10_Template, 3, 5, "app-carousel", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.showSpace >= 0 && ctx.showSpace < ctx.slidesStore.length);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵstyleMapInterpolate1"]("height: auto; width: ", ctx.mobileQuery.matches ? "340px" : "auto", "; min-width: 340px;");
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.gameService.iAmNextPlayer());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.gameService.iAmNextPlayer());
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.mobileQuery.matches);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__["DefaultLayoutGapDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgIf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__["DefaultFlexDirective"], _space_details_space_details_component__WEBPACK_IMPORTED_MODULE_11__["SpaceDetailsComponent"], _dice_dice_component__WEBPACK_IMPORTED_MODULE_12__["DiceComponent"], _clr_angular__WEBPACK_IMPORTED_MODULE_13__["ClrRadioContainer"], _clr_angular__WEBPACK_IMPORTED_MODULE_13__["ClrRadioWrapper"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__["RadioControlValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__["DefaultValueAccessor"], _clr_angular__WEBPACK_IMPORTED_MODULE_13__["ClrRadio"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_14__["NgModel"], _clr_angular__WEBPACK_IMPORTED_MODULE_13__["ClrLabel"], _carousel_carousel_component__WEBPACK_IMPORTED_MODULE_15__["CarouselComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_10__["NgForOf"], _carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_16__["CarouselItemDirective"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_17__["MatTooltip"]], styles: [".item[_ngcontent-%COMP%] {\n  padding: 0;\n  color: #fff;\n  text-align: center;\n}\n\n.players[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -24px;\n  text-align: center;\n  width: 100%;\n}\n\n.dices-total[_ngcontent-%COMP%] {\n  font-size: xxx-large;\n  line-height: 80px;\n  text-align: center;\n  font-weight: bold;\n  width: 60px;\n}\n\n.bloc[_ngcontent-%COMP%] {\n  background: #08080852;\n  opacity: 0.8;\n  padding: 24px;\n  width: 100%;\n}\n\n.btn[_ngcontent-%COMP%] {\n  font-weight: bolder;\n  font-size: large;\n  width: 340px;\n  height: 50px;\n  border-radius: 8px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvYm9hcmQvRTpcXEx1ZG9cXERvY3VtZW50c1xcRGV2ZWxvcHBlbWVudFxcQ3J5cHRvRmFudGFzaWFcXHd3dy9zcmNcXGFwcFxcX2NvbXBvbmVudHNcXGJvYXJkXFxib2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvYm9hcmQvYm9hcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxVQUFBO0VBSUEsV0FBQTtFQUdBLGtCQUFBO0FDSko7O0FET0E7RUFDSSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7QUNKSjs7QURPQTtFQUNJLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsV0FBQTtBQ0pKOztBRE9BO0VBQ0kscUJBQUE7RUFDQSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFdBQUE7QUNKSjs7QURPQTtFQUNJLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGtCQUFBO0FDSkoiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy9ib2FyZC9ib2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5pdGVtIHtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICAvLyB3aWR0aDogMTAwcHg7XHJcbiAgICAvLyBoZWlnaHQ6IDEwMHB4O1xyXG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogY3JpbXNvbjtcclxuICAgIGNvbG9yOiAjZmZmO1xyXG4gICAgLy8gZm9udC1zaXplOiA1MHB4O1xyXG4gICAgLy8gbGluZS1oZWlnaHQ6IDMwMHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG59XHJcblxyXG4ucGxheWVycyB7XHJcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICB0b3A6IC0yNHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbi5kaWNlcy10b3RhbCB7XHJcbiAgICBmb250LXNpemU6IHh4eC1sYXJnZTtcclxuICAgIGxpbmUtaGVpZ2h0OiA4MHB4O1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB3aWR0aDogNjBweDtcclxufVxyXG5cclxuLmJsb2Mge1xyXG4gICAgYmFja2dyb3VuZDogIzA4MDgwODUyO1xyXG4gICAgb3BhY2l0eTogMC44O1xyXG4gICAgcGFkZGluZzogMjRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG4gICAgd2lkdGg6IDM0MHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcbiIsIi5pdGVtIHtcbiAgcGFkZGluZzogMDtcbiAgY29sb3I6ICNmZmY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnBsYXllcnMge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogLTI0cHg7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5kaWNlcy10b3RhbCB7XG4gIGZvbnQtc2l6ZTogeHh4LWxhcmdlO1xuICBsaW5lLWhlaWdodDogODBweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgd2lkdGg6IDYwcHg7XG59XG5cbi5ibG9jIHtcbiAgYmFja2dyb3VuZDogIzA4MDgwODUyO1xuICBvcGFjaXR5OiAwLjg7XG4gIHBhZGRpbmc6IDI0cHg7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uYnRuIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbiAgZm9udC1zaXplOiBsYXJnZTtcbiAgd2lkdGg6IDM0MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJvcmRlci1yYWRpdXM6IDhweDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](BoardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
                selector: 'app-board',
                templateUrl: './board.component.html',
                styleUrls: ['./board.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }, { type: src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_3__["GameControllerService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ChangeDetectorRef"] }, { type: src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_4__["ConnectionService"] }, { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["MediaMatcher"] }, { type: src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_6__["SpacesService"] }, { type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_7__["CardService"] }, { type: src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_8__["TezosService"] }]; }, { carousel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"],
            args: ['carousel', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/carousel/carousel-item-element.directive.ts":
/*!*************************************************************************!*\
  !*** ./src/app/_components/carousel/carousel-item-element.directive.ts ***!
  \*************************************************************************/
/*! exports provided: CarouselItemElementDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselItemElementDirective", function() { return CarouselItemElementDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class CarouselItemElementDirective {
    constructor() {
        this.itemId = -1;
    }
}
CarouselItemElementDirective.ɵfac = function CarouselItemElementDirective_Factory(t) { return new (t || CarouselItemElementDirective)(); };
CarouselItemElementDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: CarouselItemElementDirective, selectors: [["", 8, "app-carousel-item"]], inputs: { itemId: "itemId" } });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CarouselItemElementDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '.app-carousel-item'
            }]
    }], null, { itemId: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/carousel/carousel-item.directive.ts":
/*!*****************************************************************!*\
  !*** ./src/app/_components/carousel/carousel-item.directive.ts ***!
  \*****************************************************************/
/*! exports provided: CarouselItemDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselItemDirective", function() { return CarouselItemDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class CarouselItemDirective {
    constructor(tpl) {
        this.tpl = tpl;
    }
}
CarouselItemDirective.ɵfac = function CarouselItemDirective_Factory(t) { return new (t || CarouselItemDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"])); };
CarouselItemDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: CarouselItemDirective, selectors: [["", "appCarouselItem", ""]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CarouselItemDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appCarouselItem]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/carousel/carousel.component.ts":
/*!************************************************************!*\
  !*** ./src/app/_components/carousel/carousel.component.ts ***!
  \************************************************************/
/*! exports provided: CarouselComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CarouselComponent", function() { return CarouselComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/animations */ "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _carousel_item_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./carousel-item.directive */ "./src/app/_components/carousel/carousel-item.directive.ts");
/* harmony import */ var _carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./carousel-item-element.directive */ "./src/app/_components/carousel/carousel-item-element.directive.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");









const _c0 = ["carousel"];
function CarouselComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r134 = ctx.$implicit;
    const idx_r135 = ctx.index;
    const ctx_r130 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("itemId", ctx_r130.getBlockIdBefore(idx_r135));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", item_r134.tpl);
} }
function CarouselComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r136 = ctx.$implicit;
    const idx_r137 = ctx.index;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("itemId", idx_r137);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", item_r136.tpl);
} }
function CarouselComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](1, 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const item_r138 = ctx.$implicit;
    const idx_r139 = ctx.index;
    const ctx_r132 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("itemId", ctx_r132.getBlockIdAfter(idx_r139));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", item_r138.tpl);
} }
function CarouselComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    const _r141 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CarouselComponent_div_6_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r141); const ctx_r140 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r140.prev(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Previous");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function CarouselComponent_div_6_Template_button_click_3_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r141); const ctx_r142 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r142.next(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Next");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class CarouselComponent {
    constructor(builder, elementRef) {
        this.builder = builder;
        this.elementRef = elementRef;
        this.carouselWrapperStyle = {};
        this.timing = '100ms ease-in-out';
        this.showControls = true;
        this.containerWidth = 800;
        this.containerHeight = 300;
        this.blockScaleFactor = 0.5;
        this.offsetBefore = 0;
        this.itemWidth = 200;
        this.step = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.currentSlide = 0;
        this.onNextDone = (onDone) => {
            if (this.targetSlide !== this.currentSlide) {
                this.next(() => this.onNextDone(onDone));
            }
            else {
                if (onDone) {
                    onDone(this.currentSlide - this.nbVisibleBlocksBefore);
                }
            }
        };
    }
    ngAfterContentInit() {
        this.nbVisibleBlocksBefore = Math.floor(1 + (this.offsetBefore) / (this.itemWidth));
        console.log('nbVisibleBlocksBefore', this.nbVisibleBlocksBefore);
        this.nbVisibleBlocksAfter = Math.floor(1 + (this.containerWidth - this.itemWidth - this.offsetBefore) / (this.itemWidth));
        console.log('nbVisibleBlocksAfter', this.nbVisibleBlocksAfter);
        this.carouselWrapperStyle = {
            width: `${this.containerWidth}px`,
            height: `${this.containerHeight}px`
        };
    }
    ngOnInit() {
        var _a;
        console.log('OnInit this.items.length', (_a = this.items) === null || _a === void 0 ? void 0 : _a.length);
    }
    ngAfterViewInit() {
        this.carousel.nativeElement.style['padding-top'] = `${(this.containerHeight - this.itemWidth)}px`;
        this.currentSlide = this.nbVisibleBlocksBefore;
        this.updateSizes();
        this.translate(0, this.computeOffset());
    }
    get itemsBefore() {
        return this.items.toArray().slice(this.items.length - this.nbVisibleBlocksBefore);
    }
    get itemsAfter() {
        return this.items.toArray().slice(0, this.nbVisibleBlocksAfter);
    }
    buildAnimation(offset) {
        return this.builder.build([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(this.timing, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: `translateX(-${offset}px)` }))
        ]);
    }
    updateSizes(overflow = false) {
        console.log(`updateSizes(${overflow})`);
        console.log(`current slide ${this.currentSlide} block : (${this.itemsElements.length > 0 ? this.itemsDirectives.toArray()[this.currentSlide].itemId : '-'})`);
        for (let i = 0; i < this.itemsElements.length; i++) {
            // console.log(`element ${i}, item:${this.itemsDirectives.toArray()[i].itemId}`);
            let animation;
            let translateX;
            let scale;
            const threshold = this.nbVisibleBlocksBefore + this.currentSlide - 1;
            if (i < threshold) {
                translateX = 0;
                scale = 1.0;
            }
            else if (i === threshold) {
                translateX = this.itemWidth * 1.5 / 8;
                scale = 1.5;
            }
            else if (i < threshold + this.items.length) {
                translateX = this.itemWidth / 2;
                scale = 1.0;
            }
            else if (i === threshold + this.items.length) {
                translateX = this.itemWidth * (4.2 / 8);
                scale = 1.5;
            }
            else {
                translateX = this.itemWidth;
                scale = 1.0;
            }
            // console.log(`i=${i}, translateX=${translateX}, scale=${scale}`);
            animation = this.builder.build([
                Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(this.timing, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: `scale(${scale}) translateX(${translateX}px)` }))
            ]);
            const player = animation.create(this.itemsElements.toArray()[i].nativeElement.firstChild);
            player.play();
        }
    }
    next(onDone) {
        let backToBeginning = false;
        if (this.currentSlide === this.items.length) {
            backToBeginning = true;
        }
        console.log(`next currentslide:${this.currentSlide}`);
        this.currentSlide = this.nbVisibleBlocksBefore + (this.currentSlide - this.nbVisibleBlocksBefore + 1) % this.items.length;
        console.log(`new slide:${this.currentSlide}`);
        // this.currentSlide = (this.currentSlide + 1) % this.items.length;
        this.updateSizes(backToBeginning);
        const offset = this.computeOffset();
        if (backToBeginning) {
            this.translate(this.timing, offset + this.itemWidth * (this.items.length + 0.5), () => {
                this.translate(0, offset, onDone);
            });
        }
        else {
            this.translate(this.timing, offset, onDone);
        }
        this.step.emit(this.itemsDirectives.toArray()[this.currentSlide].itemId);
    }
    computeOffset() {
        return this.currentSlide * this.itemWidth - this.offsetBefore;
    }
    translate(duration, offset, onDone) {
        // console.log(`translate(${offset})`);
        const animation = this.builder.build([
            Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])(duration, Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({ transform: `translateX(-${offset}px)` }))
        ]);
        const player = animation.create(this.carousel.nativeElement);
        if (onDone) {
            player.onDone(onDone);
        }
        player.play();
    }
    prev() {
        if (this.currentSlide === this.nbVisibleBlocksBefore) {
            this.currentSlide += this.items.length - 1;
        }
        else {
            this.currentSlide = this.currentSlide - 1;
        }
        const offset = this.currentSlide * this.itemWidth;
        this.updateSizes();
        const myAnimation = this.buildAnimation(offset);
        this.player = myAnimation.create(this.carousel.nativeElement);
        this.player.play();
        this.step.emit(this.itemsDirectives.toArray()[this.currentSlide].itemId);
    }
    goto(position, onDone) {
        this.targetSlide = this.nbVisibleBlocksBefore + position;
        console.log(`goto(${position}) current slide:${this.currentSlide} --> target slide:${this.targetSlide}`);
        this.onNextDone(onDone);
    }
    setCurrentPosition(position) {
        this.currentSlide = this.nbVisibleBlocksBefore + position;
        this.updateSizes();
        const offset = this.currentSlide * this.itemWidth;
        this.translate(0, offset);
    }
    getBlockIdBefore(idx) {
        return idx + this.items.length - this.nbVisibleBlocksBefore;
    }
    getBlockIdAfter(idx) {
        return idx;
    }
}
CarouselComponent.ɵfac = function CarouselComponent_Factory(t) { return new (t || CarouselComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_animations__WEBPACK_IMPORTED_MODULE_1__["AnimationBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
CarouselComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: CarouselComponent, selectors: [["app-carousel"]], contentQueries: function CarouselComponent_ContentQueries(rf, ctx, dirIndex) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵcontentQuery"](dirIndex, _carousel_item_directive__WEBPACK_IMPORTED_MODULE_2__["CarouselItemDirective"], false);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.items = _t);
    } }, viewQuery: function CarouselComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_3__["CarouselItemElementDirective"], true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_3__["CarouselItemElementDirective"], true, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"]);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.carousel = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.itemsDirectives = _t);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.itemsElements = _t);
    } }, inputs: { timing: "timing", showControls: "showControls", containerWidth: "containerWidth", containerHeight: "containerHeight", blockScaleFactor: "blockScaleFactor", offsetBefore: "offsetBefore", itemWidth: "itemWidth" }, outputs: { step: "step" }, exportAs: ["app-carousel"], decls: 7, vars: 5, consts: [[1, "carousel-wrapper", 3, "ngStyle"], [1, "carousel-inner"], ["carousel", ""], ["class", "app-carousel-item", 3, "itemId", 4, "ngFor", "ngForOf"], ["style", "margin-top: 1em", "class", "btn-group", 4, "ngIf"], [1, "app-carousel-item", 3, "itemId"], [3, "ngTemplateOutlet"], [1, "btn-group", 2, "margin-top", "1em"], [1, "btn", 3, "click"]], template: function CarouselComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "section", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, CarouselComponent_div_3_Template, 2, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, CarouselComponent_div_4_Template, 2, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, CarouselComponent_div_5_Template, 2, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, CarouselComponent_div_6_Template, 5, 0, "div", 4);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", ctx.carouselWrapperStyle);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.itemsBefore);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.items);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.itemsAfter);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.showControls);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_4__["NgStyle"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_5__["DefaultStyleDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgIf"], _carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_3__["CarouselItemElementDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_4__["NgTemplateOutlet"]], styles: [".carousel-wrapper[_ngcontent-%COMP%] {\n  overflow: hidden;\n}\n\nui[_ngcontent-%COMP%] {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  width: 6000px;\n}\n\n.carousel-inner[_ngcontent-%COMP%] {\n  display: flex;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  width: 6000px;\n}\n\n.btn[_ngcontent-%COMP%] {\n  width: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvY2Fyb3VzZWwvRTpcXEx1ZG9cXERvY3VtZW50c1xcRGV2ZWxvcHBlbWVudFxcQ3J5cHRvRmFudGFzaWFcXHd3dy9zcmNcXGFwcFxcX2NvbXBvbmVudHNcXGNhcm91c2VsXFxjYXJvdXNlbC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxnQkFBQTtBQ0NKOztBREVBO0VBQ0ksZ0JBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtFQUNBLGFBQUE7QUNDSjs7QURFQTtFQUNJLGFBQUE7RUFDQSxnQkFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0VBQ0EsYUFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvY2Fyb3VzZWwvY2Fyb3VzZWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuY2Fyb3VzZWwtd3JhcHBlciB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG59XHJcblxyXG51aSB7XHJcbiAgICBsaXN0LXN0eWxlOiBub25lO1xyXG4gICAgbWFyZ2luOiAwO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIHdpZHRoOiA2MDAwcHg7XHJcbn1cclxuXHJcbi5jYXJvdXNlbC1pbm5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbGlzdC1zdHlsZTogbm9uZTtcclxuICAgIG1hcmdpbjogMDtcclxuICAgIHBhZGRpbmc6IDA7XHJcbiAgICB3aWR0aDogNjAwMHB4O1xyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIHdpZHRoOiAxMDBweDtcclxufVxyXG4iLCIuY2Fyb3VzZWwtd3JhcHBlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbnVpIHtcbiAgbGlzdC1zdHlsZTogbm9uZTtcbiAgbWFyZ2luOiAwO1xuICBwYWRkaW5nOiAwO1xuICB3aWR0aDogNjAwMHB4O1xufVxuXG4uY2Fyb3VzZWwtaW5uZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBsaXN0LXN0eWxlOiBub25lO1xuICBtYXJnaW46IDA7XG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiA2MDAwcHg7XG59XG5cbi5idG4ge1xuICB3aWR0aDogMTAwcHg7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CarouselComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-carousel',
                exportAs: 'app-carousel',
                templateUrl: './carousel.component.html',
                styleUrls: ['./carousel.component.scss']
            }]
    }], function () { return [{ type: _angular_animations__WEBPACK_IMPORTED_MODULE_1__["AnimationBuilder"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, { items: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ContentChildren"],
            args: [_carousel_item_directive__WEBPACK_IMPORTED_MODULE_2__["CarouselItemDirective"]]
        }], itemsDirectives: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: [_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_3__["CarouselItemElementDirective"]]
        }], itemsElements: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChildren"],
            args: [_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_3__["CarouselItemElementDirective"], { read: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]
        }], carousel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['carousel']
        }], timing: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], showControls: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], containerWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], containerHeight: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], blockScaleFactor: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], offsetBefore: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], itemWidth: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], step: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/choose-session-dialog/choose-session-dialog.component.ts":
/*!**************************************************************************************!*\
  !*** ./src/app/_components/choose-session-dialog/choose-session-dialog.component.ts ***!
  \**************************************************************************************/
/*! exports provided: ChooseSessionDialogComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChooseSessionDialogComponent", function() { return ChooseSessionDialogComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/user.service */ "./src/app/_services/user.service.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");









const _c0 = function (a0) { return { "row-selected": a0 }; };
function ChooseSessionDialogComponent_tr_16_Template(rf, ctx) { if (rf & 1) {
    const _r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChooseSessionDialogComponent_tr_16_Template_tr_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r82); const session_r80 = ctx.$implicit; const ctx_r81 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r81.selectedSession = session_r80.sessionId; });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const session_r80 = ctx.$implicit;
    const ctx_r79 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    var tmp_2_0 = null;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, ctx_r79.selectedSession === session_r80.sessionId));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](session_r80.sessionId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"]((tmp_2_0 = ctx_r79.users.get(session_r80.creator)) == null ? null : tmp_2_0.userName);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](session_r80.creationDate.toLocaleString());
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](session_r80.status);
} }
class ChooseSessionDialogComponent {
    constructor(modalService, gameService, tezosService, userService) {
        this.modalService = modalService;
        this.gameService = gameService;
        this.tezosService = tezosService;
        this.userService = userService;
        this.allSessions = [
        // {sessionId: "session #1", name: "session #1", status: 'created'},
        // {sessionId: "session #2", name: "session #2", status: 'started'},
        // {sessionId: "session #3", name: "session #3", status: 'created'},
        ];
        this.selectedSession = undefined;
        this.users = new Map();
        this.my_var = "toto";
    }
    ngOnInit() {
        this.gameService.getAllSessions().subscribe((games) => {
            this.allSessions = games.map(game => {
                if ((game.status === 'in_creation')
                    || (game.status === 'created')
                    || ((game.status === 'started') && game.players.includes(this.tezosService.account.account_id))) {
                    this.userService.getUser(game.creator).then((user) => {
                        this.users.set(game.creator, user);
                    });
                    return {
                        sessionId: game.sessionId,
                        name: game.sessionId,
                        status: game.status,
                        creator: game.creator,
                        creationDate: game.creationDate ? new Date(game.creationDate) : new Date(0)
                    };
                }
            }).filter(item => item !== undefined);
            console.log("AllSessions:", this.allSessions);
        });
    }
    connect() {
        this.modalService.hideModal(this.selectedSession);
    }
}
ChooseSessionDialogComponent.ɵfac = function ChooseSessionDialogComponent_Factory(t) { return new (t || ChooseSessionDialogComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_3__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"])); };
ChooseSessionDialogComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ChooseSessionDialogComponent, selectors: [["app-choose-session-dialog"]], decls: 23, vars: 4, consts: [[3, "clrModalOpen", "clrModalClosable", "clrModalOpenChange"], [1, "modal-title"], [1, "modal-body"], [1, "table"], [3, "ngClass", "click", 4, "ngFor", "ngForOf"], [1, "modal-footer"], [1, "btn-group", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"], ["type", "button", 1, "btn", "btn-primary", 3, "disabled", "click"], [3, "ngClass", "click"]], template: function ChooseSessionDialogComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-modal", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("clrModalOpenChange", function ChooseSessionDialogComponent_Template_clr_modal_clrModalOpenChange_0_listener($event) { return ctx.modalService.opened = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Select the session you want to join:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "table", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Creator");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Creation Date");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "Status");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, ChooseSessionDialogComponent_tr_16_Template, 9, 7, "tr", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "button", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChooseSessionDialogComponent_Template_button_click_19_listener() { return ctx.modalService.hideModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, " Cancel ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "button", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ChooseSessionDialogComponent_Template_button_click_21_listener() { return ctx.connect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, " Connect ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrModalOpen", ctx.modalService.opened)("clrModalClosable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.allSessions);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.selectedSession == undefined);
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClrModal"], _clr_angular__WEBPACK_IMPORTED_MODULE_5__["ClrModalBody"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_7__["DefaultClassDirective"]], styles: [".row-selected[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #324f62;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvY2hvb3NlLXNlc3Npb24tZGlhbG9nL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxjaG9vc2Utc2Vzc2lvbi1kaWFsb2dcXGNob29zZS1zZXNzaW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvY2hvb3NlLXNlc3Npb24tZGlhbG9nL2Nob29zZS1zZXNzaW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSx5QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvY2hvb3NlLXNlc3Npb24tZGlhbG9nL2Nob29zZS1zZXNzaW9uLWRpYWxvZy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yb3ctc2VsZWN0ZWQge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMyNGY2MjtcclxufVxyXG4iLCIucm93LXNlbGVjdGVkIHtcbiAgY29sb3I6IHdoaXRlO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzI0ZjYyO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ChooseSessionDialogComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-choose-session-dialog',
                templateUrl: './choose-session-dialog.component.html',
                styleUrls: ['./choose-session-dialog.component.scss']
            }]
    }], function () { return [{ type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"] }, { type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }, { type: src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_3__["TezosService"] }, { type: src_app_services_user_service__WEBPACK_IMPORTED_MODULE_4__["UserService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/connection-page/connection-page.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/_components/connection-page/connection-page.component.ts ***!
  \**************************************************************************/
/*! exports provided: ConnectionPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionPageComponent", function() { return ConnectionPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _choose_session_dialog_choose_session_dialog_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../choose-session-dialog/choose-session-dialog.component */ "./src/app/_components/choose-session-dialog/choose-session-dialog.component.ts");
/* harmony import */ var src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var src_app_services_waiter_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/waiter.service */ "./src/app/_services/waiter.service.ts");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/app/_services/tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var ngx_responsive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-responsive */ "./node_modules/ngx-responsive/__ivy_ngcc__/fesm2015/ngx-responsive.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _tezos_connect_tezos_connect_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../tezos-connect/tezos-connect.component */ "./src/app/_components/tezos-connect/tezos-connect.component.ts");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
















function ConnectionPageComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Welcome to");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ConnectionPageComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Welcome to");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ConnectionPageComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Play and Educate Yourself about Blockchain & Cypto-Economics ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function ConnectionPageComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Play and Educate Yourself about Blockchain & Cypto-Economics ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function () { return ["md", "lg", "xl"]; };
const _c1 = function () { return ["sm", "xs"]; };
class ConnectionPageComponent {
    constructor(connectionService, fb, waiterService, gameService, alertService, tezosService, modalService, elementRef) {
        this.connectionService = connectionService;
        this.fb = fb;
        this.waiterService = waiterService;
        this.gameService = gameService;
        this.alertService = alertService;
        this.tezosService = tezosService;
        this.modalService = modalService;
        this.elementRef = elementRef;
        this.isConnecting = false;
    }
    ngAfterViewInit() {
        // this.elementRef.nativeElement.style.setProperty('--background-image', '../../../assets/crypto-fantasia.png');
    }
    ngOnDestroy() {
        if (this.waiterTask) {
            this.waiterService.removeTask(this.waiterTask);
        }
    }
    ngOnInit() {
        this.form = this.fb.group({
            username: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.connectionService.username, _angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required),
            rememberMe: new _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControl"](this.connectionService.rememberMe)
        });
    }
    // storeUsername() {
    //   if (this.form.controls.rememberMe.value) {
    //     localStorage.setItem(eLocalStorageDataKey.USERNAME, this.form.controls.username.value);
    //   } else {
    //     localStorage.removeItem(eLocalStorageDataKey.USERNAME);
    //   }
    // }
    submit(newSession) {
        this.isConnecting = true;
        this.waiterTask = this.waiterService.addTask();
        this.connectionService.connect(this.form.value).then((connectionData) => {
            if (newSession) {
                this.gameService.createSession().then((game) => {
                    this.alertService.show({ message: `game session with Id ${game.sessionId} is being created. This may take several minutes.` });
                    this.isConnecting = false;
                }).catch(err => {
                    this.alertService.error(JSON.stringify(err));
                    this.isConnecting = false;
                });
            }
            else {
                this.modalService.showModal(_choose_session_dialog_choose_session_dialog_component__WEBPACK_IMPORTED_MODULE_2__["ChooseSessionDialogComponent"]).then((sessionId) => {
                    if (!sessionId) {
                        this.waiterService.removeTask(this.waiterTask);
                        this.isConnecting = false;
                    }
                    else {
                        this.gameService.connectSession(sessionId).then((game) => {
                            this.alertService.show({ message: 'connected game with sessionId:' + game.sessionId });
                            this.isConnecting = false;
                        }, err => {
                            this.alertService.error(JSON.stringify(err));
                            this.isConnecting = false;
                        });
                    }
                }).catch(err => {
                    this.waiterService.removeTask(this.waiterTask);
                    this.isConnecting = false;
                    this.alertService.error(JSON.stringify(err));
                });
            }
        }).catch(err => {
            this.waiterService.removeTask(this.waiterTask);
            this.isConnecting = false;
            this.alertService.error(JSON.stringify(err));
        });
    }
    // createSession() {
    //   this.waiterTask = this.waiterService.addTask();
    //   // this.storeUsername();
    //   // this.isConnecting = true;
    //   this.connectionService.connect(this.form.value).then((connectionData) => {
    //     this.gameService.createSession(connectionData.username).subscribe((game) => {
    //       this.alertService.show({message: 'game session created with Id:' + game.sessionId});
    //       this.gameService.isConnected = true;
    //       this.gameService.game = game;
    //       const subscription = this.gameService.onStatusChange.subscribe((newStatus) => {
    //         if (newStatus === 'created') {
    //           if (!this.gameService.contract) {
    //             throw new Error('Game contract is not set');
    //           }
    //           this.gameService.contract.register(this.tezosService.keyStore, 123456789, 'ljlqksjflkqsfqs').then(() => {
    //             this.alertService.show({message: 'Successfully registered to the game contract'});
    //           }).catch(err => this.alertService.error(JSON.stringify(err)));
    //         }
    //       });
    //     }, err => {
    //       this.alertService.error(JSON.stringify(err));
    //     });
    //   });
    // }
    // connectSession() {
    //   this.waiterTask = this.waiterService.addTask();
    //   // this.storeUsername();
    //   // this.isConnecting = true;
    //   this.modalService.showModal(ChooseSessionDialogComponent).pipe(take(1)).subscribe((sessionId) => {
    //     if (!sessionId) {
    //       this.waiterService.removeTask(this.waiterTask);
    //       // this.isConnecting = false;
    //     } else {
    //       this.connectionService.connect(this.form.value).then((connectionData) => {
    //         const subscription = this.gameService.connectSession(sessionId, connectionData.username).subscribe((game) => {
    //           subscription.unsubscribe(); // be sure we subscribe onyl once at a time
    //           this.alertService.show({message: 'connected game with sessionId:' + game.sessionId});
    //           this.gameService.isConnected = true;
    //           this.gameService.game = game;
    //         }, err => {
    //           this.alertService.error(JSON.stringify(err));
    //         });
    //       }).catch(err => {
    //         this.waiterService.removeTask(this.waiterTask);
    //         // this.isConnecting = false;
    //         this.alertService.error(JSON.stringify(err));
    //       });
    //     }
    //   }, err => {
    //     this.waiterService.removeTask(this.waiterTask);
    //     this.isConnecting = false;
    //     this.alertService.error(JSON.stringify(err));
    //   });
    //   // this.connectionService.connect(this.form.value);
    // }
    isValid() {
        return this.form.valid && this.tezosService.isConnected;
    }
}
ConnectionPageComponent.ɵfac = function ConnectionPageComponent_Factory(t) { return new (t || ConnectionPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_waiter_service__WEBPACK_IMPORTED_MODULE_4__["WaiterService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_5__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_7__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_8__["ModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"])); };
ConnectionPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ConnectionPageComponent, selectors: [["app-connection-page"]], decls: 34, vars: 11, consts: [[2, "text-align", "center", "height", "-webkit-fill-available", "min-height", "100%"], [3, "formGroup"], ["fxLayout", "column", "fxLayoutAlign", "center center"], ["class", " subtitle-large ", 4, "showItBootstrap"], ["class", " subtitle ", 4, "showItBootstrap"], ["src", "assets/banner.png", 2, "width", "50%", "min-width", "250px"], [1, "hint"], [1, "clr-sr-only"], ["type", "text", "name", "username", "clrInput", "", "placeholder", "Enter your name", "formControlName", "username"], ["type", "checkbox", "name", "rememberMe", "clrCheckbox", "", "formControlName", "rememberMe"], ["src", "assets/tezos-logo-small.png", "height", "30", 2, "margin", "6px"], ["fxLayout", "row", "fxLayout.sm", "column", "fxLayout.xs", "column", "fxLayoutAlign", "center center", 1, "btn-group", "btn-primary"], [1, "btn", "btn-primary", 3, "disabled", "click"], [2, "font-size", "xx-large"], [1, "subtitle-large"], [1, "welcome"], [1, "subtitle"]], template: function ConnectionPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "form", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, ConnectionPageComponent_div_3_Template, 3, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, ConnectionPageComponent_div_4_Template, 3, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, ConnectionPageComponent_div_6_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, ConnectionPageComponent_div_7_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "h5", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Your Name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "clr-input-container");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "label", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "your name");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](13, "input", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "clr-checkbox-wrapper");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "label");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Remember me");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "input", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "h5", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Your ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "img", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Tezos (\u00AE) Wallet");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](22, "app-tezos-connect");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "div", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConnectionPageComponent_Template_button_click_26_listener() { return ctx.submit(true); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "Create A New Session");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-card");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "mat-card-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ConnectionPageComponent_Template_button_click_30_listener() { return ctx.submit(false); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "Connect An Existing Session");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "div", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "\u2680\u2681\u2682\u2683\u2684\u2685");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx.form);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](7, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.isValid() || ctx.isConnecting);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", !ctx.isValid() || ctx.isConnecting);
    } }, directives: [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_9__["DefaultLayoutAlignDirective"], ngx_responsive__WEBPACK_IMPORTED_MODULE_10__["ShowItBootstrapDirective"], _clr_angular__WEBPACK_IMPORTED_MODULE_11__["ClrInputContainer"], _clr_angular__WEBPACK_IMPORTED_MODULE_11__["ClrLabel"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["DefaultValueAccessor"], _clr_angular__WEBPACK_IMPORTED_MODULE_11__["ClrInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _clr_angular__WEBPACK_IMPORTED_MODULE_11__["ClrCheckboxWrapper"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["CheckboxControlValueAccessor"], _clr_angular__WEBPACK_IMPORTED_MODULE_11__["ClrCheckbox"], _tezos_connect_tezos_connect_component__WEBPACK_IMPORTED_MODULE_12__["TezosConnectComponent"], _angular_material_card__WEBPACK_IMPORTED_MODULE_13__["MatCard"], _angular_material_card__WEBPACK_IMPORTED_MODULE_13__["MatCardContent"]], styles: [".mat-card[_ngcontent-%COMP%] {\n  background: none;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: medium;\n  width: 80%;\n  min-width: 300px;\n  font-weight: bolder;\n}\n\n.subtitle-large[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: xx-large;\n  width: 50%;\n  min-width: 640px;\n  font-weight: bolder;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvY29ubmVjdGlvbi1wYWdlL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxjb25uZWN0aW9uLXBhZ2VcXGNvbm5lY3Rpb24tcGFnZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvY29ubmVjdGlvbi1wYWdlL2Nvbm5lY3Rpb24tcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGdCQUFBO0FDQ0o7O0FEV0E7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNSSjs7QURXQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ1JKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvY29ubmVjdGlvbi1wYWdlL2Nvbm5lY3Rpb24tcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtY2FyZCB7XHJcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xyXG59XHJcblxyXG4ubG9naW4td3JhcHBlciAubG9naW4ge1xyXG4gICAgLy8gd2lkdGg6IDUwZW07XHJcbiAgICAvLyBsZWZ0OiAyNSU7XHJcbn1cclxuXHJcbi5sb2dpbi13cmFwcGVyIHtcclxuICAgIC8vIGJhY2tncm91bmQtaW1hZ2U6IFwiYXNzZXRzL2NyeXB0by1mYW50YXNpYS5wbmdcIiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uc3VidGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWluLXdpZHRoOiAzMDBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbn1cclxuXHJcbi5zdWJ0aXRsZS1sYXJnZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIG1pbi13aWR0aDogNjQwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG59XHJcbiIsIi5tYXQtY2FyZCB7XG4gIGJhY2tncm91bmQ6IG5vbmU7XG59XG5cbi5zdWJ0aXRsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIHdpZHRoOiA4MCU7XG4gIG1pbi13aWR0aDogMzAwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi5zdWJ0aXRsZS1sYXJnZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiB4eC1sYXJnZTtcbiAgd2lkdGg6IDUwJTtcbiAgbWluLXdpZHRoOiA2NDBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ConnectionPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-connection-page',
                templateUrl: './connection-page.component.html',
                styleUrls: ['./connection-page.component.scss']
            }]
    }], function () { return [{ type: src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_3__["ConnectionService"] }, { type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: src_app_services_waiter_service__WEBPACK_IMPORTED_MODULE_4__["WaiterService"] }, { type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_5__["GameService"] }, { type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] }, { type: src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_7__["TezosService"] }, { type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_8__["ModalService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/dice/dice.component.ts":
/*!****************************************************!*\
  !*** ./src/app/_components/dice/dice.component.ts ***!
  \****************************************************/
/*! exports provided: DiceComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiceComponent", function() { return DiceComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class DiceComponent {
    constructor() {
        this.name = '';
        this.imagesList = [];
    }
    ngOnInit() {
    }
    // set(num: number) {
    //   this.value = num;
    // }
    getImage() {
        return this.imagesList[this.value - 1];
    }
}
DiceComponent.ɵfac = function DiceComponent_Factory(t) { return new (t || DiceComponent)(); };
DiceComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DiceComponent, selectors: [["app-dice"]], inputs: { name: "name", imagesList: "imagesList", value: "value" }, decls: 4, vars: 2, consts: [[2, "text-align", "center"], [1, "story-message"], ["width", "100%;", 3, "src"]], template: function DiceComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.name, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("src", ctx.getImage(), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2RpY2UvZGljZS5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DiceComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dice',
                templateUrl: './dice.component.html',
                styleUrls: ['./dice.component.scss']
            }]
    }], function () { return []; }, { name: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], imagesList: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], value: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/dock-container/dock-container.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/_components/dock-container/dock-container.component.ts ***!
  \************************************************************************/
/*! exports provided: DockContainerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DockContainerComponent", function() { return DockContainerComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");
/* harmony import */ var _players_list_players_list_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../players-list/players-list.component */ "./src/app/_components/players-list/players-list.component.ts");
/* harmony import */ var _spaces_spaces_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../spaces/spaces.component */ "./src/app/_components/spaces/spaces.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../history/history.component */ "./src/app/_components/history/history.component.ts");








const _c0 = function (a0) { return { "height": a0 }; };
class DockContainerComponent {
    constructor() {
        this.height = 240;
    }
    ngOnInit() {
    }
}
DockContainerComponent.ɵfac = function DockContainerComponent_Factory(t) { return new (t || DockContainerComponent)(); };
DockContainerComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DockContainerComponent, selectors: [["app-dock-container"]], inputs: { height: "height" }, decls: 6, vars: 3, consts: [["fxLayout", "row", 1, "dock-container", 3, "ngStyle"], [1, "dock-left"], ["fxFlex", "", 1, "dock-right"]], template: function DockContainerComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-players-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-spaces");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-history");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngStyle", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, ctx.height + "px"));
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultLayoutDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgStyle"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_3__["DefaultStyleDirective"], _players_list_players_list_component__WEBPACK_IMPORTED_MODULE_4__["PlayersListComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_1__["DefaultFlexDirective"], _spaces_spaces_component__WEBPACK_IMPORTED_MODULE_5__["SpacesComponent"], _history_history_component__WEBPACK_IMPORTED_MODULE_6__["HistoryComponent"]], styles: [".dock-container[_ngcontent-%COMP%] {\n  background-color: gray;\n}\n\n.dock-left[_ngcontent-%COMP%] {\n  width: 400px;\n  overflow: auto;\n  height: 100%;\n}\n\n.dock-right[_ngcontent-%COMP%] {\n  width: calc(100% - 500px);\n  overflow: auto;\n  height: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvZG9jay1jb250YWluZXIvRTpcXEx1ZG9cXERvY3VtZW50c1xcRGV2ZWxvcHBlbWVudFxcQ3J5cHRvRmFudGFzaWFcXHd3dy9zcmNcXGFwcFxcX2NvbXBvbmVudHNcXGRvY2stY29udGFpbmVyXFxkb2NrLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvZG9jay1jb250YWluZXIvZG9jay1jb250YWluZXIuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBQTtBQ0NKOztBREVBO0VBQ0ksWUFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FDQ0o7O0FERUE7RUFDSSx5QkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy9kb2NrLWNvbnRhaW5lci9kb2NrLWNvbnRhaW5lci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kb2NrLWNvbnRhaW5lciB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xyXG59XHJcblxyXG4uZG9jay1sZWZ0IHtcclxuICAgIHdpZHRoOiA0MDBweDtcclxuICAgIG92ZXJmbG93OiBhdXRvO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uZG9jay1yaWdodCB7XHJcbiAgICB3aWR0aDogY2FsYygxMDAlIC0gNTAwcHgpO1xyXG4gICAgb3ZlcmZsb3c6IGF1dG87XHJcbiAgICBoZWlnaHQ6IDEwMCU7XHJcbiAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiB5ZWxsb3c7XHJcbn1cclxuIiwiLmRvY2stY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbn1cblxuLmRvY2stbGVmdCB7XG4gIHdpZHRoOiA0MDBweDtcbiAgb3ZlcmZsb3c6IGF1dG87XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmRvY2stcmlnaHQge1xuICB3aWR0aDogY2FsYygxMDAlIC0gNTAwcHgpO1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DockContainerComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dock-container',
                templateUrl: './dock-container.component.html',
                styleUrls: ['./dock-container.component.scss']
            }]
    }], function () { return []; }, { height: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/dummy-content/dummy-content.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_components/dummy-content/dummy-content.component.ts ***!
  \**********************************************************************/
/*! exports provided: DummyContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DummyContentComponent", function() { return DummyContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var _modal_example_modal_example_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../modal-example/modal-example.component */ "./src/app/_components/modal-example/modal-example.component.ts");
/* harmony import */ var src_app_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/progress-bar.service */ "./src/app/_services/progress-bar.service.ts");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/api.service */ "./src/app/_services/api.service.ts");








class DummyContentComponent {
    constructor(alertService, progressBarService, modalService, apiService) {
        this.alertService = alertService;
        this.progressBarService = progressBarService;
        this.modalService = modalService;
        this.apiService = apiService;
    }
    ngOnInit() {
    }
    openPopup() {
        this.modalService.showModal(_modal_example_modal_example_component__WEBPACK_IMPORTED_MODULE_2__["ModalExampleComponent"]);
    }
    alert(message) {
        const first = this.alertService.show({
            message: 'Hello this is an alert'
        });
        first.onClose$.subscribe(x => {
            console.log('closed alert nb', x);
            const newAlert = this.alertService.show({
                message: 'Second Alert',
                clrAlertType: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["IAlertType"].SUCCESS,
                actions: {
                    label: 'Actions',
                    options: [
                        {
                            label: 'Ignore',
                            callback: () => {
                                console.log('Ignored');
                            }
                        },
                        {
                            label: 'Show',
                            callback: () => {
                                this.openPopup();
                            }
                        }
                    ]
                }
            });
            console.log('show newAlert nb: ', newAlert);
        });
    }
    download() {
        let currentVal = 0;
        this.progressBarService.showLooping();
        this.progressBarService.setProgress(currentVal, 100);
        const interval = setInterval(() => {
            currentVal += 5;
            this.progressBarService.setProgress(currentVal, 100);
            if (currentVal >= 50) {
                this.progressBarService.hideLooping();
            }
            if (currentVal >= 100) {
                this.progressBarService.hideProgress();
                clearInterval(interval);
            }
        }, 500);
    }
    connect() {
        this.apiService.get('').subscribe((result) => {
            this.alertService.show({ message: JSON.stringify(result) });
        }, err => {
            this.alertService.error(JSON.stringify(err));
        });
    }
}
DummyContentComponent.ɵfac = function DummyContentComponent_Factory(t) { return new (t || DummyContentComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_3__["ProgressBarService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"])); };
DummyContentComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: DummyContentComponent, selectors: [["app-dummy-content"]], decls: 92, vars: 1, consts: [[1, "btn-group", "btn-primary"], [1, "btn", 3, "click"], [3, "innerHTML"]], template: function DummyContentComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DummyContentComponent_Template_button_click_1_listener() { return ctx.openPopup(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Open Popup");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DummyContentComponent_Template_button_click_3_listener() { return ctx.alert("hello world!"); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Alert");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DummyContentComponent_Template_button_click_5_listener() { return ctx.download(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Download");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function DummyContentComponent_Template_button_click_7_listener() { return ctx.connect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Delete");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "\nEarn\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "100\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](23, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](27, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](31, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](32, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](47, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](49, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](55, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](57, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](61, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](68, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](69, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](71, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](73, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](76, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](83, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "blablablabl");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "h1");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](91, "TheEnd");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", "& \uD557", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2R1bW15LWNvbnRlbnQvZHVtbXktY29udGVudC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](DummyContentComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-dummy-content',
                templateUrl: './dummy-content.component.html',
                styleUrls: ['./dummy-content.component.scss']
            }]
    }], function () { return [{ type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_1__["AlertService"] }, { type: src_app_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_3__["ProgressBarService"] }, { type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"] }, { type: src_app_services_api_service__WEBPACK_IMPORTED_MODULE_5__["ApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/fanta-symbol/fanta-symbol.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/_components/fanta-symbol/fanta-symbol.component.ts ***!
  \********************************************************************/
/*! exports provided: FantaSymbolComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FantaSymbolComponent", function() { return FantaSymbolComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class FantaSymbolComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
FantaSymbolComponent.ɵfac = function FantaSymbolComponent_Factory(t) { return new (t || FantaSymbolComponent)(); };
FantaSymbolComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FantaSymbolComponent, selectors: [["app-fanta-symbol"]], inputs: { htmlString: "htmlString" }, decls: 1, vars: 1, consts: [[3, "innerHTML"]], template: function FantaSymbolComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("innerHTML", ctx.htmlString, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2ZhbnRhLXN5bWJvbC9mYW50YS1zeW1ib2wuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FantaSymbolComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-fanta-symbol',
                templateUrl: './fanta-symbol.component.html',
                styleUrls: ['./fanta-symbol.component.scss']
            }]
    }], function () { return []; }, { htmlString: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/footer/footer.component.ts":
/*!********************************************************!*\
  !*** ./src/app/_components/footer/footer.component.ts ***!
  \********************************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class FooterComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
FooterComponent.ɵfac = function FooterComponent_Factory(t) { return new (t || FooterComponent)(); };
FooterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: FooterComponent, selectors: [["app-footer"]], decls: 2, vars: 0, consts: [[1, "clr-footer"]], template: function FooterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Footer\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2Zvb3Rlci9mb290ZXIuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FooterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-footer',
                templateUrl: './footer.component.html',
                styleUrls: ['./footer.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_components/game-controls/game-controls.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_components/game-controls/game-controls.component.ts ***!
  \**********************************************************************/
/*! exports provided: GameControlsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameControlsComponent", function() { return GameControlsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");



class GameControlsComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
GameControlsComponent.ɵfac = function GameControlsComponent_Factory(t) { return new (t || GameControlsComponent)(); };
GameControlsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameControlsComponent, selectors: [["app-game-controls"]], decls: 13, vars: 0, consts: [[1, "btn-group", "btn-icon"], [1, "btn", "game-control"], ["shape", "play"], [1, "clr-icon-title"], ["shape", "pause"], ["shape", "power"]], template: function GameControlsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "clr-icon", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Start / Resume");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "clr-icon", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Freeze");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "clr-icon", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "span", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "End Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrIconCustomTag"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUtY29udHJvbHMvZ2FtZS1jb250cm9scy5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameControlsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-controls',
                templateUrl: './game-controls.component.html',
                styleUrls: ['./game-controls.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_components/game-creation-page/game-creation-page.component.ts":
/*!********************************************************************************!*\
  !*** ./src/app/_components/game-creation-page/game-creation-page.component.ts ***!
  \********************************************************************************/
/*! exports provided: GameCreationPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameCreationPageComponent", function() { return GameCreationPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/game-controller.service */ "./src/app/_services/game-controller.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _game_status_game_status_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../game-status/game-status.component */ "./src/app/_components/game-status/game-status.component.ts");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");







function GameCreationPageComponent_div_1_mat_spinner_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "mat-spinner");
} }
function GameCreationPageComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Your game session is being created. Please wait.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, GameCreationPageComponent_div_1_mat_spinner_3_Template, 1, 0, "mat-spinner", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1096 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r1096.gameService.creationStatus === "IN_CREATION");
} }
function GameCreationPageComponent_div_2_p_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "The game master will start the game when all expected players have registered.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameCreationPageComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Your game session is now ready to start.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, GameCreationPageComponent_div_2_p_3_Template, 2, 0, "p", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1097 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r1097.gameService.isGameMaster);
} }
function GameCreationPageComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Please check all expected players have registered to this session before getting started.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameCreationPageComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    const _r1103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameCreationPageComponent_div_5_Template_button_click_1_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1103); const ctx_r1102 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r1102.gameController.start(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r1099 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx_r1099.gameService.playingStatus !== "created");
} }
class GameCreationPageComponent {
    constructor(gameService, gameController) {
        this.gameService = gameService;
        this.gameController = gameController;
    }
    ngOnInit() {
    }
}
GameCreationPageComponent.ɵfac = function GameCreationPageComponent_Factory(t) { return new (t || GameCreationPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_2__["GameControllerService"])); };
GameCreationPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameCreationPageComponent, selectors: [["app-game-creation-page"]], decls: 9, vars: 4, consts: [[2, "height", "80px"], [4, "ngIf"], [1, "btn-group", "btn-primary"], ["class", "btn-group btn-primary", 4, "ngIf"], [1, "btn", "btn-primary", 3, "click"], [1, "btn", "btn-primary", 3, "disabled", "click"]], template: function GameCreationPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GameCreationPageComponent_div_1_Template, 4, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, GameCreationPageComponent_div_2_Template, 4, 1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, GameCreationPageComponent_div_3_Template, 3, 0, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, GameCreationPageComponent_div_5_Template, 3, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameCreationPageComponent_Template_button_click_6_listener() { return ctx.gameService.disconnect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Exit Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "app-game-status");
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gameService.creationStatus == "IN_CREATION");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gameService.creationStatus == "READY");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gameService.isGameMaster);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.gameService.isGameMaster && ctx.gameService.isRegistered);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _game_status_game_status_component__WEBPACK_IMPORTED_MODULE_4__["GameStatusComponent"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_5__["MatSpinner"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUtY3JlYXRpb24tcGFnZS9nYW1lLWNyZWF0aW9uLXBhZ2UuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameCreationPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-creation-page',
                templateUrl: './game-creation-page.component.html',
                styleUrls: ['./game-creation-page.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }, { type: src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_2__["GameControllerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/game-failure-page/game-failure-page.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/_components/game-failure-page/game-failure-page.component.ts ***!
  \******************************************************************************/
/*! exports provided: GameFailurePageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameFailurePageComponent", function() { return GameFailurePageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");



class GameFailurePageComponent {
    constructor(gameService) {
        this.gameService = gameService;
    }
    ngOnInit() {
    }
}
GameFailurePageComponent.ɵfac = function GameFailurePageComponent_Factory(t) { return new (t || GameFailurePageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"])); };
GameFailurePageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameFailurePageComponent, selectors: [["app-game-failure-page"]], decls: 4, vars: 0, consts: [[1, "btn", "btn-primary", 3, "click"]], template: function GameFailurePageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "game-failure-page works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameFailurePageComponent_Template_button_click_2_listener() { return ctx.gameService.disconnect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Exit Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUtZmFpbHVyZS1wYWdlL2dhbWUtZmFpbHVyZS1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameFailurePageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-failure-page',
                templateUrl: './game-failure-page.component.html',
                styleUrls: ['./game-failure-page.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/game-over-page/game-over-page.component.ts":
/*!************************************************************************!*\
  !*** ./src/app/_components/game-over-page/game-over-page.component.ts ***!
  \************************************************************************/
/*! exports provided: GameOverPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameOverPageComponent", function() { return GameOverPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");



class GameOverPageComponent {
    constructor(gameService) {
        this.gameService = gameService;
    }
    ngOnInit() {
    }
}
GameOverPageComponent.ɵfac = function GameOverPageComponent_Factory(t) { return new (t || GameOverPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"])); };
GameOverPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameOverPageComponent, selectors: [["app-game-over-page"]], decls: 4, vars: 0, consts: [[1, "btn", "btn-primary", 3, "click"]], template: function GameOverPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "game-over-page works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameOverPageComponent_Template_button_click_2_listener() { return ctx.gameService.disconnect(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Exit Game");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUtb3Zlci1wYWdlL2dhbWUtb3Zlci1wYWdlLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameOverPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-over-page',
                templateUrl: './game-over-page.component.html',
                styleUrls: ['./game-over-page.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/game-status-modal/game-status-modal.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/_components/game-status-modal/game-status-modal.component.ts ***!
  \******************************************************************************/
/*! exports provided: GameStatusModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameStatusModalComponent", function() { return GameStatusModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _game_status_game_status_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../game-status/game-status.component */ "./src/app/_components/game-status/game-status.component.ts");





class GameStatusModalComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() {
    }
}
GameStatusModalComponent.ɵfac = function GameStatusModalComponent_Factory(t) { return new (t || GameStatusModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"])); };
GameStatusModalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameStatusModalComponent, selectors: [["app-game-status-modal"]], decls: 9, vars: 2, consts: [[3, "clrModalOpen", "clrModalClosable", "clrModalOpenChange"], [1, "modal-title"], [1, "modal-body"], [1, "modal-footer"], [1, "btn-group", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function GameStatusModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-modal", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("clrModalOpenChange", function GameStatusModalComponent_Template_clr_modal_clrModalOpenChange_0_listener($event) { return ctx.modalService.opened = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Space Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-game-status");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function GameStatusModalComponent_Template_button_click_7_listener() { return ctx.modalService.hideModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Close ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrModalOpen", ctx.modalService.opened)("clrModalClosable", false);
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrModal"], _clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrModalBody"], _game_status_game_status_component__WEBPACK_IMPORTED_MODULE_3__["GameStatusComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUtc3RhdHVzLW1vZGFsL2dhbWUtc3RhdHVzLW1vZGFsLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameStatusModalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-status-modal',
                templateUrl: './game-status-modal.component.html',
                styleUrls: ['./game-status-modal.component.scss']
            }]
    }], function () { return [{ type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/game-status/game-status.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/_components/game-status/game-status.component.ts ***!
  \******************************************************************/
/*! exports provided: GameStatusComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameStatusComponent", function() { return GameStatusComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/game-controller.service */ "./src/app/_services/game-controller.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");





function GameStatusComponent_div_22_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "a", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, ")");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const player_r1246 = ctx.$implicit;
    const ctx_r1245 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("", ctx_r1245.gameService.getUsername(player_r1246), " (Tezos Account Id: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "https://carthagenet.tzstats.com/", player_r1246, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](player_r1246);
} }
class GameStatusComponent {
    constructor(gameService, gameController) {
        this.gameService = gameService;
        this.gameController = gameController;
    }
    ngOnInit() {
    }
}
GameStatusComponent.ɵfac = function GameStatusComponent_Factory(t) { return new (t || GameStatusComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_2__["GameControllerService"])); };
GameStatusComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameStatusComponent, selectors: [["app-game-status"]], decls: 42, vars: 14, consts: [[2, "width", "350px", "overflow-x", "auto"], [1, "table"], [2, "height", "100px"], [4, "ngFor", "ngForOf"], ["target", "_blank", 3, "href"]], template: function GameStatusComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "table", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Game Session Id:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Created by:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "Date:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "tr", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Players:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](22, GameStatusComponent_div_22_Template, 6, 3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "tr", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "td");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "Smart Contracts:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](35);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "a", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.gameService.game == null ? null : ctx.gameService.game.sessionId, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.gameService.getUsername(ctx.gameService.game == null ? null : ctx.gameService.game.creator), "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.gameService.game == null ? null : ctx.gameService.game.creationDate.toLocaleString());
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.gameService.players);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "https://carthagenet.tzstats.com/", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.game, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Main: ", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.game, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "https://carthagenet.tzstats.com/", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.token, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Token: ", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.token, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "https://carthagenet.tzstats.com/", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.assets, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Assets: ", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.assets, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "https://carthagenet.tzstats.com/", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.chance, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Chance: ", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.chance, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("href", "https://carthagenet.tzstats.com/", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.community, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Community: ", ctx.gameService.game == null ? null : ctx.gameService.game.contractAddresses.community, "");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUtc3RhdHVzL2dhbWUtc3RhdHVzLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameStatusComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game-status',
                templateUrl: './game-status.component.html',
                styleUrls: ['./game-status.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }, { type: src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_2__["GameControllerService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/game/game.component.ts":
/*!****************************************************!*\
  !*** ./src/app/_components/game/game.component.ts ***!
  \****************************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _waiter_waiter_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../waiter/waiter.component */ "./src/app/_components/waiter/waiter.component.ts");
/* harmony import */ var _modal_modal_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../modal/modal.component */ "./src/app/_components/modal/modal.component.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../progress-bar/progress-bar.component */ "./src/app/_components/progress-bar/progress-bar.component.ts");
/* harmony import */ var _alert_alert_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../alert/alert.component */ "./src/app/_components/alert/alert.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../header/header.component */ "./src/app/_components/header/header.component.ts");
/* harmony import */ var _connection_page_connection_page_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../connection-page/connection-page.component */ "./src/app/_components/connection-page/connection-page.component.ts");
/* harmony import */ var _playground_page_playground_page_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../playground-page/playground-page.component */ "./src/app/_components/playground-page/playground-page.component.ts");
/* harmony import */ var _game_creation_page_game_creation_page_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../game-creation-page/game-creation-page.component */ "./src/app/_components/game-creation-page/game-creation-page.component.ts");
/* harmony import */ var _game_failure_page_game_failure_page_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../game-failure-page/game-failure-page.component */ "./src/app/_components/game-failure-page/game-failure-page.component.ts");
/* harmony import */ var _game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../game-over-page/game-over-page.component */ "./src/app/_components/game-over-page/game-over-page.component.ts");
















function GameComponent_app_header_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "app-header");
} }
function GameComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-connection-page", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-playground-page", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-game-creation-page", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameComponent_div_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-game-failure-page", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function GameComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-game-over-page", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class GameComponent {
    constructor(connectionService, gameService) {
        this.connectionService = connectionService;
        this.gameService = gameService;
    }
    ngOnInit() {
    }
}
GameComponent.ɵfac = function GameComponent_Factory(t) { return new (t || GameComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_1__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"])); };
GameComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: GameComponent, selectors: [["app-game"]], decls: 12, vars: 6, consts: [[1, "main-container", 2, "background-image", "url('assets/background.png')"], [4, "ngIf"], ["fxLayout", "column", 2, "width", "100%", "height", "auto"], ["class", "content-container", 4, "ngIf"], [1, "content-container"], [2, "width", "100%"], [2, "width", "100%", "height", "100%"]], template: function GameComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, GameComponent_app_header_1_Template, 1, 0, "app-header", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-waiter");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "app-modal");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-progress-bar");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "app-alert");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, GameComponent_div_7_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, GameComponent_div_8_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, GameComponent_div_9_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, GameComponent_div_10_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, GameComponent_div_11_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected && ctx.gameService.isConnected);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.connectionService.isConnected || !ctx.gameService.isConnected);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected && ctx.gameService.creationStatus === "PLAYING");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected && (ctx.gameService.creationStatus === "IN_CREATION" || ctx.gameService.creationStatus === "READY"));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected && ctx.gameService.creationStatus === "FAILED");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected && ctx.gameService.creationStatus === "ENDED");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_3__["NgIf"], _waiter_waiter_component__WEBPACK_IMPORTED_MODULE_4__["WaiterComponent"], _modal_modal_component__WEBPACK_IMPORTED_MODULE_5__["ModalComponent"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_6__["DefaultLayoutDirective"], _progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_7__["ProgressBarComponent"], _alert_alert_component__WEBPACK_IMPORTED_MODULE_8__["AlertComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_9__["HeaderComponent"], _connection_page_connection_page_component__WEBPACK_IMPORTED_MODULE_10__["ConnectionPageComponent"], _playground_page_playground_page_component__WEBPACK_IMPORTED_MODULE_11__["PlaygroundPageComponent"], _game_creation_page_game_creation_page_component__WEBPACK_IMPORTED_MODULE_12__["GameCreationPageComponent"], _game_failure_page_game_failure_page_component__WEBPACK_IMPORTED_MODULE_13__["GameFailurePageComponent"], _game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_14__["GameOverPageComponent"]], styles: [".main-container[_ngcontent-%COMP%] {\n  height: auto;\n  min-height: 100%;\n  background: unset;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvZ2FtZS9FOlxcTHVkb1xcRG9jdW1lbnRzXFxEZXZlbG9wcGVtZW50XFxDcnlwdG9GYW50YXNpYVxcd3d3L3NyY1xcYXBwXFxfY29tcG9uZW50c1xcZ2FtZVxcZ2FtZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvZ2FtZS9nYW1lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksWUFBQTtFQUNBLGdCQUFBO0VBQ0EsaUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2dhbWUvZ2FtZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xyXG4gICAgYmFja2dyb3VuZDogdW5zZXQ7XHJcbn1cclxuIiwiLm1haW4tY29udGFpbmVyIHtcbiAgaGVpZ2h0OiBhdXRvO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiB1bnNldDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](GameComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-game',
                templateUrl: './game.component.html',
                styleUrls: ['./game.component.scss']
            }]
    }], function () { return [{ type: src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_1__["ConnectionService"] }, { type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/header/header.component.ts":
/*!********************************************************!*\
  !*** ./src/app/_components/header/header.component.ts ***!
  \********************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");









function HeaderComponent_clr_dropdown_3_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r69 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r69.tezosService.account.account_id);
} }
function HeaderComponent_clr_dropdown_3_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r70 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r70.tezosService.account.account_id);
} }
function HeaderComponent_clr_dropdown_3_Template(rf, ctx) { if (rf & 1) {
    const _r72 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-dropdown", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HeaderComponent_clr_dropdown_3_span_3_Template, 2, 1, "span", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "clr-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HeaderComponent_clr_dropdown_3_span_6_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_clr_dropdown_3_Template_a_click_7_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r72); const ctx_r71 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r71.tezosService.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Disconnect");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r67.mobileQuery.matches);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r67.mobileQuery.matches);
} }
function HeaderComponent_clr_dropdown_4_span_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r73 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r73.connectionService.username);
} }
function HeaderComponent_clr_dropdown_4_span_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "span", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r74 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r74.connectionService.username);
} }
function HeaderComponent_clr_dropdown_4_Template(rf, ctx) { if (rf & 1) {
    const _r76 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-dropdown", 4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "clr-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HeaderComponent_clr_dropdown_4_span_3_Template, 2, 1, "span", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "clr-icon", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, HeaderComponent_clr_dropdown_4_span_6_Template, 2, 1, "span", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Preferences");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "a", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HeaderComponent_clr_dropdown_4_Template_a_click_9_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r76); const ctx_r75 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r75.connectionService.disconnect(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Log out");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r68 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r68.mobileQuery.matches);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx_r68.mobileQuery.matches);
} }
class HeaderComponent {
    constructor(connectionService, changeDetectorRef, tezosService, gameService, media, modalService) {
        this.connectionService = connectionService;
        this.changeDetectorRef = changeDetectorRef;
        this.tezosService = tezosService;
        this.gameService = gameService;
        this.media = media;
        this.modalService = modalService;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit() {
    }
    ngOnDestroy() {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}
HeaderComponent.ɵfac = function HeaderComponent_Factory(t) { return new (t || HeaderComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_1__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__["MediaMatcher"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"])); };
HeaderComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HeaderComponent, selectors: [["app-header"]], decls: 12, vars: 4, consts: [[1, "header", "header-6"], ["src", "assets/banner.png", 1, "logo"], [1, "header-actions"], ["class", "dropdown bottom-right", 4, "ngIf"], [1, "dropdown", "bottom-right"], ["clrDropdownToggle", "", 1, "nav-icon"], ["shape", "help"], ["shape", "caret down"], [1, "dropdown-menu"], ["clrDropdownItem", "", "href", "https://github.com/levalleux-ludo/PLOT", "target", "_blank"], ["clrDropdownToggle", "", 1, "nav-icon", 2, "text-align", "right", "width", "auto"], ["src", "assets/tezos-logo-small.png", "width", "auto", "height", "80%"], ["style", "margin-right: 24px; margin-left: 6px;", 4, "ngIf"], ["style", "text-align: center;", 4, "ngIf"], ["clrDropdownItem", "", 3, "click"], [2, "margin-right", "24px", "margin-left", "6px"], [2, "text-align", "center"], ["shape", "user"], ["style", "margin-right: 60px; margin-left: 12px;", 4, "ngIf"], ["clrDropdownItem", ""], [2, "margin-right", "60px", "margin-left", "12px"]], template: function HeaderComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "header", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, HeaderComponent_clr_dropdown_3_Template, 9, 2, "clr-dropdown", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, HeaderComponent_clr_dropdown_4_Template, 11, 2, "clr-dropdown", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "clr-dropdown", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "clr-icon", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "clr-icon", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "a", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "About");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("logo-is-mobile", ctx.mobileQuery.matches);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.connectionService.isConnected);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], _clr_angular__WEBPACK_IMPORTED_MODULE_7__["ClrDropdown"], _clr_angular__WEBPACK_IMPORTED_MODULE_7__["ClrDropdownTrigger"], _clr_angular__WEBPACK_IMPORTED_MODULE_7__["ClrIconCustomTag"], _clr_angular__WEBPACK_IMPORTED_MODULE_7__["ClrDropdownItem"]], styles: [".logo[_ngcontent-%COMP%] {\n  width: 280px;\n  max-height: 100%;\n  height: auto;\n  margin-left: 24px;\n  margin-right: 24px;\n  margin-top: 6px;\n  margin-bottom: 6px;\n}\n\n.logo-is-mobile[_ngcontent-%COMP%] {\n  width: 100px;\n  max-height: 100%;\n  height: 36px;\n  margin-left: 12px;\n  margin-right: 12px;\n  margin-top: 3px;\n  margin-bottom: 3px;\n}\n\n.tezos-btn[_ngcontent-%COMP%] {\n  background-color: transparent;\n  height: 100%;\n  border: none;\n  opacity: 0.5;\n  color: white;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvaGVhZGVyL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxoZWFkZXJcXGhlYWRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0FDQ0o7O0FERUE7RUFDSSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0EsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7RUFDQSxrQkFBQTtBQ0NKOztBREVBO0VBQ0ksNkJBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5sb2dvIHtcclxuICAgIHdpZHRoOiAyODBweDtcclxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBtYXJnaW4tbGVmdDogMjRweDtcclxuICAgIG1hcmdpbi1yaWdodDogMjRweDtcclxuICAgIG1hcmdpbi10b3A6IDZweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDZweDtcclxufVxyXG5cclxuLmxvZ28taXMtbW9iaWxlIHtcclxuICAgIHdpZHRoOiAxMDBweDtcclxuICAgIG1heC1oZWlnaHQ6IDEwMCU7XHJcbiAgICBoZWlnaHQ6IDM2cHg7XHJcbiAgICBtYXJnaW4tbGVmdDogMTJweDtcclxuICAgIG1hcmdpbi1yaWdodDogMTJweDtcclxuICAgIG1hcmdpbi10b3A6IDNweDtcclxuICAgIG1hcmdpbi1ib3R0b206IDNweDtcclxufVxyXG5cclxuLnRlem9zLWJ0biB7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcclxuICAgIGhlaWdodDogMTAwJTtcclxuICAgIGJvcmRlcjogbm9uZTtcclxuICAgIG9wYWNpdHk6IDAuNTtcclxuICAgIGNvbG9yOiB3aGl0ZTtcclxuICAgIHdpZHRoOiBhdXRvO1xyXG59XHJcbiIsIi5sb2dvIHtcbiAgd2lkdGg6IDI4MHB4O1xuICBtYXgtaGVpZ2h0OiAxMDAlO1xuICBoZWlnaHQ6IGF1dG87XG4gIG1hcmdpbi1sZWZ0OiAyNHB4O1xuICBtYXJnaW4tcmlnaHQ6IDI0cHg7XG4gIG1hcmdpbi10b3A6IDZweDtcbiAgbWFyZ2luLWJvdHRvbTogNnB4O1xufVxuXG4ubG9nby1pcy1tb2JpbGUge1xuICB3aWR0aDogMTAwcHg7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG4gIGhlaWdodDogMzZweDtcbiAgbWFyZ2luLWxlZnQ6IDEycHg7XG4gIG1hcmdpbi1yaWdodDogMTJweDtcbiAgbWFyZ2luLXRvcDogM3B4O1xuICBtYXJnaW4tYm90dG9tOiAzcHg7XG59XG5cbi50ZXpvcy1idG4ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgaGVpZ2h0OiAxMDAlO1xuICBib3JkZXI6IG5vbmU7XG4gIG9wYWNpdHk6IDAuNTtcbiAgY29sb3I6IHdoaXRlO1xuICB3aWR0aDogYXV0bztcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HeaderComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-header',
                templateUrl: './header.component.html',
                styleUrls: ['./header.component.scss']
            }]
    }], function () { return [{ type: src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_1__["ConnectionService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__["TezosService"] }, { type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"] }, { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_4__["MediaMatcher"] }, { type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_5__["ModalService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/history/history.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/_components/history/history.component.ts ***!
  \**********************************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function HistoryComponent_tr_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const turn_r122 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](turn_r122.player);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](turn_r122.id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate2"]("", turn_r122.dices[0], ",", turn_r122.dices[1], "");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](turn_r122.newPosition);
} }
class HistoryComponent {
    constructor(gameService) {
        this.gameService = gameService;
    }
    ngOnInit() {
    }
}
HistoryComponent.ɵfac = function HistoryComponent_Factory(t) { return new (t || HistoryComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"])); };
HistoryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: HistoryComponent, selectors: [["app-history"]], decls: 13, vars: 1, consts: [[1, "table"], [4, "ngFor", "ngForOf"]], template: function HistoryComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Player");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "TurnID");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Dices");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "newPosition");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, HistoryComponent_tr_12_Template, 9, 5, "tr", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.gameService.turns);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL2hpc3RvcnkvaGlzdG9yeS5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HistoryComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-history',
                templateUrl: './history.component.html',
                styleUrls: ['./history.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/modal-example/modal-example.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_components/modal-example/modal-example.component.ts ***!
  \**********************************************************************/
/*! exports provided: ModalExampleComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalExampleComponent", function() { return ModalExampleComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");




class ModalExampleComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() {
    }
}
ModalExampleComponent.ɵfac = function ModalExampleComponent_Factory(t) { return new (t || ModalExampleComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"])); };
ModalExampleComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ModalExampleComponent, selectors: [["app-modal-example"]], decls: 9, vars: 2, consts: [[3, "clrModalOpen", "clrModalClosable", "clrModalOpenChange"], [1, "modal-title"], [1, "modal-body"], [1, "modal-footer"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function ModalExampleComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-modal", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("clrModalOpenChange", function ModalExampleComponent_Template_clr_modal_clrModalOpenChange_0_listener($event) { return ctx.modalService.opened = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "No \"x\" in the top-right corner");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Clicking on the backdrop doesn't do anything.");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function ModalExampleComponent_Template_button_click_7_listener() { return ctx.modalService.hideModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " I'm the only way to close the modal!\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrModalOpen", ctx.modalService.opened)("clrModalClosable", false);
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrModal"], _clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrModalBody"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL21vZGFsLWV4YW1wbGUvbW9kYWwtZXhhbXBsZS5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModalExampleComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-modal-example',
                templateUrl: './modal-example.component.html',
                styleUrls: ['./modal-example.component.scss']
            }]
    }], function () { return [{ type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/modal/modal.component.ts":
/*!******************************************************!*\
  !*** ./src/app/_components/modal/modal.component.ts ***!
  \******************************************************/
/*! exports provided: ModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalComponent", function() { return ModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_directives_modal_directive__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_directives/modal.directive */ "./src/app/_directives/modal.directive.ts");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");





function ModalComponent_ng_template_0_Template(rf, ctx) { }
class ModalComponent {
    constructor(modalService, componentFactoryResolver) {
        this.modalService = modalService;
        this.componentFactoryResolver = componentFactoryResolver;
    }
    ngOnInit() {
        this.modalService.onShow.subscribe(({ componentClass, argsMap }) => {
            const viewContainerRef = this.modalContent.viewContainerRef;
            viewContainerRef.clear();
            if (componentClass !== undefined) {
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
                const componentRef = viewContainerRef.createComponent(componentFactory);
                console.log('component created', componentRef);
                if (argsMap) {
                    try {
                        Object.assign(componentRef.instance, argsMap);
                    }
                    catch (err) {
                        console.error(`Unable to assign argsMap to modal component instance: ${err}`);
                    }
                }
            }
        });
    }
}
ModalComponent.ɵfac = function ModalComponent_Factory(t) { return new (t || ModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_2__["ModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"])); };
ModalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ModalComponent, selectors: [["app-modal"]], viewQuery: function ModalComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](src_app_directives_modal_directive__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"], true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.modalContent = _t.first);
    } }, decls: 1, vars: 0, consts: [["appModal", ""]], template: function ModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ModalComponent_ng_template_0_Template, 0, 0, "ng-template", 0);
    } }, directives: [src_app_directives_modal_directive__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL21vZGFsL21vZGFsLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-modal',
                templateUrl: './modal.component.html',
                styleUrls: ['./modal.component.scss']
            }]
    }], function () { return [{ type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_2__["ModalService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"] }]; }, { modalContent: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: [src_app_directives_modal_directive__WEBPACK_IMPORTED_MODULE_1__["ModalDirective"], { static: true }]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/nav-bar/nav-bar.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/_components/nav-bar/nav-bar.component.ts ***!
  \**********************************************************/
/*! exports provided: NavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavBarComponent", function() { return NavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class NavBarComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
NavBarComponent.ɵfac = function NavBarComponent_Factory(t) { return new (t || NavBarComponent)(); };
NavBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: NavBarComponent, selectors: [["app-nav-bar"]], decls: 2, vars: 0, template: function NavBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "nav-bar works!");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL25hdi1iYXIvbmF2LWJhci5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](NavBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-nav-bar',
                templateUrl: './nav-bar.component.html',
                styleUrls: ['./nav-bar.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_components/overview/overview.component.ts":
/*!************************************************************!*\
  !*** ./src/app/_components/overview/overview.component.ts ***!
  \************************************************************/
/*! exports provided: OverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OverviewComponent", function() { return OverviewComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/spaces.service */ "./src/app/_services/spaces.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var src_app_services_card_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/card.service */ "./src/app/_services/card.service.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var ngx_responsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-responsive */ "./node_modules/ngx-responsive/__ivy_ngcc__/fesm2015/ngx-responsive.js");
/* harmony import */ var _carousel_carousel_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../carousel/carousel.component */ "./src/app/_components/carousel/carousel.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _space_details_space_details_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../space-details/space-details.component */ "./src/app/_components/space-details/space-details.component.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../carousel/carousel-item.directive */ "./src/app/_components/carousel/carousel-item.directive.ts");












function OverviewComponent_ng_template_0_ng_container_121_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 34);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 35);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} if (rf & 2) {
    const slide_r38 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]().$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", slide_r38.src, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", slide_r38.alt);
} }
function OverviewComponent_ng_template_0_ng_container_121_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](0);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, OverviewComponent_ng_template_0_ng_container_121_ng_container_1_Template, 3, 2, "ng-container", 33);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();
} }
function OverviewComponent_ng_template_0_tr_208_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const card_r41 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](card_r41);
} }
function OverviewComponent_ng_template_0_tr_212_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td", 36);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const card_r42 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](card_r42);
} }
function OverviewComponent_ng_template_0_button_275_Template(rf, ctx) { if (rf & 1) {
    const _r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 37);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OverviewComponent_ng_template_0_button_275_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r44); const ctx_r43 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r43.router.navigate(["game"]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Get Started");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_ng_template_0_button_276_Template(rf, ctx) { if (rf & 1) {
    const _r46 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 38);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OverviewComponent_ng_template_0_button_276_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r46); const ctx_r45 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2); return ctx_r45.router.navigate(["game"]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Get Started");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function () { return ["md", "lg", "xl"]; };
const _c1 = function () { return ["sm", "xs"]; };
function OverviewComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    const _r48 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Why This Game ?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "I've developed this game with the idea that the new economical mechanisms brought by the blockchain ecosystem (namely DeFi) provide a fresh new and exciting playground, and quite funny as well (think about the DeFi lego). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "So, could a 'mainstream' game allow others (non-technical people) to discover, explore, understand, and play with these new tools and paradigms, to better assess what's going on ?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "And it became obvious that, while the so famous Monopoly game has learnt all of us about traditional capitalist economics (mortgages, investments, good/bad fortune, wealth management, etc), a similar approach could be used to educate everyone, in a playful way, with this new world of crypto-economics.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Probably the best of all: this game is implementing using smart contracts, meaning that all player actions, like payments, assets ownership management, even chances and community chest cards, are performed through the blockchain itself, leading to an (almost*) complete decentralized and trustless application, without the need for a third party (or a banker). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "i");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, "(*) Note: the current version still uses a centralized backend to create the game contracts for the session and to generate random numbers for dices and chance cards.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](16, "I've seen this game like a laboratory to check if every action in a Monopoly-like game could be decentralized through blockchain.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](17, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, " And the answer is: 'YES' !!!");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Can't wait to try it ? Just look at the description below and click 'Get Started' at the bottom to go playing.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "img", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "h1");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "Description");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](25, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](26, "\u228Frypto\u00A0\u2131anta\u1D79ia is an online board game for two to four players.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "The object of the game is to become the wealthiest player through founding and developing businesses in the crypto-space / blockchain ecosystem");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](29, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](30, "To achieve this goal, every player, playing the role of an entrepreneur, will get some opportunities to found startups and develop their products by adding new features.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Of course, all startups are related to blockchain applications in law tech, fin tech, bio tech, social medias, gaming, and more.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](34, "In addition, some specific businesses take a special role in the game, as in the real blockchain ecosystem:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "marketplace for digital assets");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](39, "exchange platform for security token");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "mining farms, validating 'Proof of Work' (PoW) consensus blockchain");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](42, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](43, "bakeries, validating 'Proof of Stake' (PoS) consensus blockchain");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, "Preparation");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "On the game connection page:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Choose a username to identify yourself towards the other players");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Choose an avatar to identify yourself on the playground: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](55, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](56, "Camel");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](57, "img", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Diamond");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](60, "img", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "Rocket");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](63, "img", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](65, "Cryptochip");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](66, "img", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "Select your ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](69, "img", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](70, "Tezos (\u00AE) wallet file (JSON format). ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](71, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "You need a small balance of XTZ to pay the transaction fees during the game. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](73, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "If you don't have any wallet yet, or your balance is empty, you can get free XTZ for testnet here: ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "a", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](76, "Testnet Faucet");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](77, " (know more ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "a", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "here");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](80, ") ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](81, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](82, "Choose if you want to ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](84, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, "join an existing session (you can only join a session that is not started yet)");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](87, "or create your own session and wait for other players to join it before you can start");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](89, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](90, "GameBoard");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](92, "The board is composed of 24 chained blocks:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](93, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](95, "1 block 'Genesis'");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, "2 blocks 'Chance'");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](98, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](99, "2 blocks 'Community'");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "1 block 'Covid-19'");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](102, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](103, "1 block 'Quarantine'");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, "and 17 blocks representing the startups to be founded and developed, including\uF9EE ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](106, "ul");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](108, "1 marketplace");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, "1 exchange platform");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](111, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](112, "2 mining farms");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "li");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, "2 bakeries");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](115, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](116, "Discover all blocks:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "div", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](118, "div", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](119, "app-carousel", 22, 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("step", function OverviewComponent_ng_template_0_Template_app_carousel_step_119_listener($event) { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r48); const ctx_r47 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r47.refreshBlockDetail($event); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](121, OverviewComponent_ng_template_0_ng_container_121_Template, 2, 0, "ng-container", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "div", 25);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](123, "app-space-details", 26);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](124, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](126, "Game Play");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](127, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](128, "At the beginning, each player is given 1500 \u2131antas (the crypto-currency of the game) and start from the Genesis block");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](130, "To play, each player takes turn one at a time.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](131, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](132, "The application tells who's going to play alternatively, as it is managed by the game's smart contract");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](134, "At his turn, the player rolls the dices, then his avatar is moved forward on the board, by the number of blocks corresponding to the sum of the 2 dices ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](136, "Depending on the block he reaches, he may have some options.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](137, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](138, " He then selects an option (if any), and submit his play to the smart contract");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](141, "clr-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](142, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](143, "Because the play submission is realized through a transaction to the Game's smart contract, the application is waiting for the transaction to be validated, before the next player can do his turn.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](145, "Genesis Block");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](146, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](147, "The starting point");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](148, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](149, "However, because the board is circular, players will pass this block at each lap and get a reward");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](150, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](151, "Founding A Startup");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](152, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](153, "When landing on a block representing a Startup that is not yet founded, the player can choose to found it, paying the specified price, or to do nothing.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](154, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](155, "If he chooses to found the startup, he will get benefits every time another player will come on this block.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](156, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](157, "He can also develop new features to increase the product prices and get more benefits.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](158, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](159, "Founding The Marketplace");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](160, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](161, "When landing on a block representing the Marketplace and if it is not yet founded, the player can choose to found it, paying the specified price, or to do nothing.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](162, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](163, "If he chooses to found the Marketplace, he will get benefits from fees every time another player will use the Marketplace to buy and sell assets.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](165, "Founding The Exchange");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](166, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](167, "When landing on a block representing the Exchange and if it is not yet founded, the player can choose to found it, paying the specified price, or to do nothing.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](169, "If he chooses to found the Exchange, he will get benefits from fees every time another player will use the Exchange to launch an ICO (primary market) and trade security tokens (secondary market).");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](171, "Founding A Mining Farm");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](172, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](173, "When landing on a block representing a Mining Farm and if it is not yet founded, the player can choose to found it, paying the specified price, or to do nothing.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](174, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](175, "If he chooses to found a Mining farm, he will get mining rewards each time a player roll the dices.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](177, "The mining reward value is computed regarding the value of the first dice (called PoW dice) and taking into account the hashrate power of the Mining Farm compared to the other Mining Farms.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, "The owner of a Mining Farm can choose to invest to increase his hashrate to maximize his rewards compared to the other miners.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](180, "div", 27);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](182, "clr-icon", 28);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](183, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](184, "When a lap is completed (all players have passed through the genesis block again, the Pow rewards is divided by 2. This is called the 'Halving'.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](186, "Founding A Bakery");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](187, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](188, "When landing on a block representing a Bakery and if it is not yet founded, the player can choose to found it, paying the specified price, or to do nothing.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](190, "If he chooses to found a Bakery, he will get staking rewards each time a player roll the dices.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "The staking reward value is computed regarding the value of the second dice (called PoS dice) and taking into account the amount staked of the Bakery compared to the other Bakery.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](193, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](194, "The owner of a Bakery can choose to stake his money to maximize his rewards compared to the other bakeries.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](196, "Buying Startup Products");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](197, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](198, "When landing on a block representing a Startup that has been founded by another player, the current player shall purchase the Startup's product for the specified price.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](200, "Note: the product price depends on the features that have been developed by the Startup owner");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](201, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](202, "Chance And Community Chest");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](204, "When landing on a block representing a Chance or Community Chest, the player will randomly get a 'magic card' and performs the instruction given.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](205, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](206, "List of Chances cards");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "table", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](208, OverviewComponent_ng_template_0_tr_208_Template, 3, 1, "tr", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](209, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](210, "List of Community Chest cards");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "table", 29);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](212, OverviewComponent_ng_template_0_tr_212_Template, 3, 1, "tr", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](214, "Visit Quarantine");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](215, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](216, "When landing on the Quarantine block, the player is \"Just Visiting\". No penalty applies");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](217, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](218, "Catch COVID-19");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](219, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](220, "When landing on the COVID-19 block, the player is moved to Quarantine block, and will miss the next lap, except if he or she has got a Immunity card from Chance or Community Chest previously.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](221, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](222, "Develop New Features");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](223, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](224, "At any time during the game, a player that owns a Startup can invest in its product.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](226, "To do that, he must pay the feature cost specified by the Startup description.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](227, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](228, " The request is realized thanks to a transaction to the Game's smart contract");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](229, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](230, " However only one feature can be bough per transaction and the total number of features can not exceed 4.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](232, "Once a product has been featured, the price is increase as specified in the Startup description, so is the revenue for the owner when another player is visiting the startup.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](233, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](234, "Increase Mining Farm HashRate");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](235, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](236, "At any time during the game, a player that owns a Mining Farm can pay to get more hashrate in order to increase his revenue from the mining rewards.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](238, "Increase Bakery Stake");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](240, "At any time during the game, a player that owns a Bakery can stake his own money in order to increase his revenue from the mining rewards.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](241, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](242, "When money is staked, it is not directly available to the player for paying purchases.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](244, "However the player can unstake some amounts from the bakery if he/she runs out of cash. In that case the bakery rewards would decrease accordingly");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](245, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](246, "Launch An ICO");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](248, "At any time, the owner of a Startup can launch an ICO (Initial Coin Offering) by using the Exchange Platform.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](249, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](250, "Launching an ICO for a Startup means issuing 10 security tokens representing each 5% of the company.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](251, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](252, " However, only 1 ICO can be launched per company.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](253, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](254, "The price of a token can be freely set by the issuer.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](256, "The other players can buy these tokens if they are interested, using the Exchange Platform.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](257, "br");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](258, " Owning security tokens of a Startup gets shares in the revenue of this company (5% per token) ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](259, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](260, "When all the tokens have been sold, the players can still trade these tokens between them through the Exchange Platform");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](262, "The owner of the Exchange is getting rewarded by 10% of the value of the transactions realized through the Exchange");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](263, "h3");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](264, "Resell A Company");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](266, "At any time, the owner of a Startup can sale this company through the Marketplace");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](268, "The other players can buy it if they are interested, or make offer for smaller price, using the Marketplace Platform.");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](269, "p");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](270, "The owner of the Marketplace is getting rewarded by 10% of the value of the transactions realized through the Marketplace");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](271, "div", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](272, "h2");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](273, "Ready to play ?");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](274, "div", 30);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](275, OverviewComponent_ng_template_0_button_275_Template, 2, 0, "button", 31);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](276, OverviewComponent_ng_template_0_button_276_Template, 2, 0, "button", 32);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r23 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](119);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showControls", true)("itemWidth", 150 - 18)("containerWidth", 300)("containerHeight", 150);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r23.slidesStore);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("space", ctx_r23.space);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](85);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r23.chances);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r23.community_chests);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](63);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c1));
} }
function OverviewComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h1", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Welcome to");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 40);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Welcome to");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 39);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Play and Educate Yourself about Blockchain & Cypto-Economics ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 41);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Play and Educate Yourself about Blockchain & Cypto-Economics ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 42);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " A Decentralized Board Game about economics (inspired by Monopoly\u00AE), but crypto-oriented, where crypto-economics mechanisms are entirely implemented powered by smart contracts on the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 43);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Tezos (\u00AE) blockchain. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 44);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " A Decentralized Board Game about economics (inspired by Monopoly\u00AE), but crypto-oriented, where crypto-economics mechanisms are entirely implemented powered by smart contracts on the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 45);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Tezos (\u00AE) blockchain. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function OverviewComponent_div_11_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function OverviewComponent_div_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 46);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, OverviewComponent_div_11_ng_container_1_Template, 1, 0, "ng-container", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r22);
} }
function OverviewComponent_div_12_ng_container_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function OverviewComponent_div_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 48);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, OverviewComponent_div_12_ng_container_1_Template, 1, 0, "ng-container", 47);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r22 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r22);
} }
class OverviewComponent {
    constructor(spacesService, router, cardService) {
        this.spacesService = spacesService;
        this.router = router;
        this.cardService = cardService;
        this.slidesStore = [];
        this.spacesMap = new Map();
        this.chances = [];
        this.community_chests = [];
    }
    ngOnInit() {
        this.cardService.getChances().then((chances) => {
            this.chances = chances.map(chance => this.cardService.computeText(chance));
        });
        this.cardService.getCommunityChests().then((community_chests) => {
            this.community_chests = community_chests.map(community_chest => this.cardService.computeText(community_chest));
        });
        this.spacesService.getSpaces().then((spaces) => {
            this.spacesMap = new Map();
            for (const space of spaces) {
                this.spacesMap.set(space.spaceId, space);
            }
            this.slidesStore = spaces.map(space => {
                return {
                    id: space.spaceId,
                    src: `assets/blocks/block_${space.image}`,
                    alt: space.title,
                    title: space.title,
                    players: []
                };
            });
            if (spaces.length > 0) {
                this.refreshBlockDetail(this.slidesStore[0].id);
            }
        });
    }
    ngAfterViewInit() {
        if (this.slidesStore.length > 0) {
            this.refreshBlockDetail(this.slidesStore[0].id);
        }
    }
    refreshBlockDetail(blockId) {
        const space = this.spacesMap.get(blockId);
        if (space === undefined) {
            console.error('Unable to get the space with id', blockId);
        }
        this.space = space;
    }
}
OverviewComponent.ɵfac = function OverviewComponent_Factory(t) { return new (t || OverviewComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_1__["SpacesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_card_service__WEBPACK_IMPORTED_MODULE_3__["CardService"])); };
OverviewComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: OverviewComponent, selectors: [["app-overview"]], decls: 13, vars: 16, consts: [["overview", ""], ["fxLayout", "column", "fxLayoutAlign", "start center", "fxLayoutGap", "24px", 1, "overview", 2, "background-image", "url('assets/background.png')"], ["class", " subtitle-large ", 4, "showItBootstrap"], ["class", " subtitle ", 4, "showItBootstrap"], ["src", "assets/banner.png", 2, "width", "30%", "min-width", "200px"], ["class", "catchphrase ", 4, "showItBootstrap"], ["class", "catchphrase-large ", 4, "showItBootstrap"], [2, "width", "60%", "min-width", "340px"], ["class", "normal ", 4, "showItBootstrap"], ["class", "large ", 4, "showItBootstrap"], ["fxLayout", "column", "fxLayoutAlign", "start center", "fxLayoutGap", "24px"], [1, "bloc"], ["src", "assets/flyer1.png", 2, "width", "80%", "max-width", "350px"], ["src", "assets/avatars/camel.png", 1, "img-avatar"], ["src", "assets/avatars/diamond.png", 1, "img-avatar"], ["src", "assets/avatars/rocket.png", 1, "img-avatar"], ["src", "assets/avatars/crypto-chip.png", 1, "img-avatar"], ["src", "assets/tezos-logo-small.png ", "height", "30\n                  ", 2, "margin", "6px"], ["href", "https://faucet.tzalpha.net", "target", "_blank"], ["href", "https://tezos.gitlab.io/introduction/howtouse.html#faucet", "target", "_blank"], ["fxLayout", "row", "fxLayout.sm", "column", "fxLayout.xs", "column", 2, "width", "100%"], ["fxFlex", "", 2, "max-width", "90%"], [3, "showControls", "itemWidth", "containerWidth", "containerHeight", "step"], ["carousel", ""], [4, "ngFor", "ngForOf"], ["fxFlex", ""], [3, "space"], ["fxLayout", "row"], ["shape", "warning-standard", 1, "is-solid", 2, "width", "36px", "height", "36px", "margin-right", "24px"], [1, "table"], ["fxLayout", "column", "fxLayoutAlign", "center center"], ["class", "btn-large btn-play btn btn-success ", 3, "click", 4, "showItBootstrap"], ["class", "btn-play btn btn-success ", 3, "click", 4, "showItBootstrap"], [4, "appCarouselItem"], [2, "margin-left", "-18px"], ["width", "150px", 3, "src", "alt"], [2, "text-align", "start"], [1, "btn-large", "btn-play", "btn", "btn-success", 3, "click"], [1, "btn-play", "btn", "btn-success", 3, "click"], [1, "subtitle-large"], [1, "welcome"], [1, "subtitle"], [1, "catchphrase"], ["src", "assets/tezos-logo-small.png ", "height", "30\n  ", 2, "margin", "6px"], [1, "catchphrase-large"], ["src", "assets/tezos-logo-small.png ", "height", "30\n", 2, "margin", "6px"], [1, "normal"], [4, "ngTemplateOutlet"], [1, "large"]], template: function OverviewComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, OverviewComponent_ng_template_0_Template, 277, 12, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, OverviewComponent_div_3_Template, 3, 0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, OverviewComponent_div_4_Template, 3, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "img", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, OverviewComponent_div_6_Template, 2, 0, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, OverviewComponent_div_7_Template, 2, 0, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, OverviewComponent_div_8_Template, 4, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, OverviewComponent_div_9_Template, 4, 0, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, OverviewComponent_div_11_Template, 2, 1, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, OverviewComponent_div_12_Template, 2, 1, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c0));
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutGapDirective"], ngx_responsive__WEBPACK_IMPORTED_MODULE_5__["ShowItBootstrapDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultFlexDirective"], _carousel_carousel_component__WEBPACK_IMPORTED_MODULE_6__["CarouselComponent"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _space_details_space_details_component__WEBPACK_IMPORTED_MODULE_8__["SpaceDetailsComponent"], _clr_angular__WEBPACK_IMPORTED_MODULE_9__["ClrIconCustomTag"], _carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_10__["CarouselItemDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgTemplateOutlet"]], styles: [".overview[_ngcontent-%COMP%] {\n  background-size: cover;\n  height: auto;\n  min-height: 100%;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: medium;\n  width: 80%;\n  min-width: 350px;\n  font-weight: bolder;\n}\n\n.subtitle-large[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: xx-large;\n  width: 50%;\n  min-width: 640px;\n  font-weight: bolder;\n}\n\n.catchphrase[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: medium;\n  width: 80%;\n  min-width: 350px;\n  line-height: 35px;\n}\n\n.catchphrase-large[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: x-large;\n  width: 50%;\n  min-width: 640px;\n  line-height: 40px;\n}\n\n.large[_ngcontent-%COMP%] {\n  font-size: large !important;\n}\n\n.large[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n  font-size: 1.5rem !important;\n}\n\n.large[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {\n  font-size: 2rem !important;\n}\n\n.large[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  font-size: 1.2rem !important;\n}\n\n.large[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%] {\n  font-size: 1rem !important;\n}\n\n.large[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  font-size: large !important;\n}\n\n.bloc[_ngcontent-%COMP%] {\n  background: #08080852;\n  opacity: 0.8;\n  padding: 24px;\n  width: 100%;\n}\n\n.btn[_ngcontent-%COMP%] {\n  font-weight: bolder;\n  font-size: large;\n  width: 200px;\n  height: 50px;\n  border-radius: 8px;\n}\n\n.btn-large[_ngcontent-%COMP%] {\n  font-weight: bolder;\n  font-size: x-large;\n  width: 320px;\n  height: 80px;\n  border-radius: 24px;\n}\n\n.img-avatar[_ngcontent-%COMP%] {\n  padding-left: 8px;\n  padding-right: 8px;\n  height: 48px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvb3ZlcnZpZXcvRTpcXEx1ZG9cXERvY3VtZW50c1xcRGV2ZWxvcHBlbWVudFxcQ3J5cHRvRmFudGFzaWFcXHd3dy9zcmNcXGFwcFxcX2NvbXBvbmVudHNcXG92ZXJ2aWV3XFxvdmVydmlldy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvb3ZlcnZpZXcvb3ZlcnZpZXcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtBQ0NKOztBREdBO0VBQ0ksa0JBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FDQUo7O0FER0E7RUFDSSxrQkFBQTtFQUNBLG1CQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNBSjs7QURHQTtFQUNJLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxpQkFBQTtBQ0FKOztBREdBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0FDQUo7O0FER0E7RUFDSSwyQkFBQTtBQ0FKOztBREdBO0VBQ0ksNEJBQUE7QUNBSjs7QURHQTtFQUNJLDBCQUFBO0FDQUo7O0FER0E7RUFDSSw0QkFBQTtBQ0FKOztBREdBO0VBQ0ksMEJBQUE7QUNBSjs7QURHQTtFQUNJLDJCQUFBO0FDQUo7O0FER0E7RUFDSSxxQkFBQTtFQUNBLFlBQUE7RUFDQSxhQUFBO0VBQ0EsV0FBQTtBQ0FKOztBREdBO0VBQ0ksbUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNBSjs7QURHQTtFQUNJLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FDQUo7O0FER0E7RUFDSSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0FKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvb3ZlcnZpZXcvb3ZlcnZpZXcuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub3ZlcnZpZXcge1xyXG4gICAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjtcclxuICAgIGhlaWdodDogYXV0bztcclxuICAgIG1pbi1oZWlnaHQ6IDEwMCU7XHJcbiAgICAvLyBiYWNrZ3JvdW5kOiBibGFjaztcclxufVxyXG5cclxuLnN1YnRpdGxlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIG1pbi13aWR0aDogMzUwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG59XHJcblxyXG4uc3VidGl0bGUtbGFyZ2Uge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiB4eC1sYXJnZTtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBtaW4td2lkdGg6IDY0MHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcclxufVxyXG5cclxuLmNhdGNocGhyYXNlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogbWVkaXVtO1xyXG4gICAgd2lkdGg6IDgwJTtcclxuICAgIG1pbi13aWR0aDogMzUwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogMzVweDtcclxufVxyXG5cclxuLmNhdGNocGhyYXNlLWxhcmdlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogeC1sYXJnZTtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBtaW4td2lkdGg6IDY0MHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDQwcHg7XHJcbn1cclxuXHJcbi5sYXJnZSB7XHJcbiAgICBmb250LXNpemU6IGxhcmdlICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5sYXJnZSBoMiB7XHJcbiAgICBmb250LXNpemU6IDEuNXJlbSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubGFyZ2UgaDEge1xyXG4gICAgZm9udC1zaXplOiAycmVtICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5sYXJnZSBoMyB7XHJcbiAgICBmb250LXNpemU6IDEuMnJlbSAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4ubGFyZ2UgaDQge1xyXG4gICAgZm9udC1zaXplOiAxcmVtICFpbXBvcnRhbnQ7XHJcbn1cclxuXHJcbi5sYXJnZSBwIHtcclxuICAgIGZvbnQtc2l6ZTogbGFyZ2UgIWltcG9ydGFudDtcclxufVxyXG5cclxuLmJsb2Mge1xyXG4gICAgYmFja2dyb3VuZDogIzA4MDgwODUyO1xyXG4gICAgb3BhY2l0eTogMC44O1xyXG4gICAgcGFkZGluZzogMjRweDtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcblxyXG4uYnRuLWxhcmdlIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICBmb250LXNpemU6IHgtbGFyZ2U7XHJcbiAgICB3aWR0aDogMzIwcHg7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNHB4O1xyXG59XHJcblxyXG4uaW1nLWF2YXRhciB7XHJcbiAgICBwYWRkaW5nLWxlZnQ6IDhweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDhweDtcclxuICAgIGhlaWdodDogNDhweDtcclxufVxyXG4iLCIub3ZlcnZpZXcge1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBoZWlnaHQ6IGF1dG87XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG59XG5cbi5zdWJ0aXRsZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiBtZWRpdW07XG4gIHdpZHRoOiA4MCU7XG4gIG1pbi13aWR0aDogMzUwcHg7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG59XG5cbi5zdWJ0aXRsZS1sYXJnZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiB4eC1sYXJnZTtcbiAgd2lkdGg6IDUwJTtcbiAgbWluLXdpZHRoOiA2NDBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLmNhdGNocGhyYXNlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgd2lkdGg6IDgwJTtcbiAgbWluLXdpZHRoOiAzNTBweDtcbiAgbGluZS1oZWlnaHQ6IDM1cHg7XG59XG5cbi5jYXRjaHBocmFzZS1sYXJnZSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiB4LWxhcmdlO1xuICB3aWR0aDogNTAlO1xuICBtaW4td2lkdGg6IDY0MHB4O1xuICBsaW5lLWhlaWdodDogNDBweDtcbn1cblxuLmxhcmdlIHtcbiAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xufVxuXG4ubGFyZ2UgaDIge1xuICBmb250LXNpemU6IDEuNXJlbSAhaW1wb3J0YW50O1xufVxuXG4ubGFyZ2UgaDEge1xuICBmb250LXNpemU6IDJyZW0gIWltcG9ydGFudDtcbn1cblxuLmxhcmdlIGgzIHtcbiAgZm9udC1zaXplOiAxLjJyZW0gIWltcG9ydGFudDtcbn1cblxuLmxhcmdlIGg0IHtcbiAgZm9udC1zaXplOiAxcmVtICFpbXBvcnRhbnQ7XG59XG5cbi5sYXJnZSBwIHtcbiAgZm9udC1zaXplOiBsYXJnZSAhaW1wb3J0YW50O1xufVxuXG4uYmxvYyB7XG4gIGJhY2tncm91bmQ6ICMwODA4MDg1MjtcbiAgb3BhY2l0eTogMC44O1xuICBwYWRkaW5nOiAyNHB4O1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmJ0biB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5idG4tbGFyZ2Uge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xuICBmb250LXNpemU6IHgtbGFyZ2U7XG4gIHdpZHRoOiAzMjBweDtcbiAgaGVpZ2h0OiA4MHB4O1xuICBib3JkZXItcmFkaXVzOiAyNHB4O1xufVxuXG4uaW1nLWF2YXRhciB7XG4gIHBhZGRpbmctbGVmdDogOHB4O1xuICBwYWRkaW5nLXJpZ2h0OiA4cHg7XG4gIGhlaWdodDogNDhweDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OverviewComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-overview',
                templateUrl: './overview.component.html',
                styleUrls: ['./overview.component.scss']
            }]
    }], function () { return [{ type: src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_1__["SpacesService"] }, { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: src_app_services_card_service__WEBPACK_IMPORTED_MODULE_3__["CardService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/player-portfolio/player-portfolio.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/_components/player-portfolio/player-portfolio.component.ts ***!
  \****************************************************************************/
/*! exports provided: PlayerPortfolioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerPortfolioComponent", function() { return PlayerPortfolioComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");






function PlayerPortfolioComponent_tr_12_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "clr-icon", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function PlayerPortfolioComponent_tr_12_clr_icon_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 20);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 21);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 22);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 23);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 24);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_13_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 25);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_14_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 26);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_15_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 27);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_16_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 28);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_17_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 29);
} }
function PlayerPortfolioComponent_tr_12_clr_icon_18_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-icon", 30);
} }
const _c0 = function () { return []; };
function PlayerPortfolioComponent_tr_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, PlayerPortfolioComponent_tr_12_div_5_Template, 2, 0, "div", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, PlayerPortfolioComponent_tr_12_clr_icon_8_Template, 1, 0, "clr-icon", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, PlayerPortfolioComponent_tr_12_clr_icon_9_Template, 1, 0, "clr-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, PlayerPortfolioComponent_tr_12_clr_icon_10_Template, 1, 0, "clr-icon", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, PlayerPortfolioComponent_tr_12_clr_icon_11_Template, 1, 0, "clr-icon", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PlayerPortfolioComponent_tr_12_clr_icon_12_Template, 1, 0, "clr-icon", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, PlayerPortfolioComponent_tr_12_clr_icon_13_Template, 1, 0, "clr-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, PlayerPortfolioComponent_tr_12_clr_icon_14_Template, 1, 0, "clr-icon", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](15, PlayerPortfolioComponent_tr_12_clr_icon_15_Template, 1, 0, "clr-icon", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](16, PlayerPortfolioComponent_tr_12_clr_icon_16_Template, 1, 0, "clr-icon", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](17, PlayerPortfolioComponent_tr_12_clr_icon_17_Template, 1, 0, "clr-icon", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](18, PlayerPortfolioComponent_tr_12_clr_icon_18_Template, 1, 0, "clr-icon", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "td", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "div", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const asset_r144 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", asset_r144.name, " ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c0).constructor(asset_r144.nbFeatures));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matTooltip", asset_r144.category);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "MINING_FARM");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "BAKERY");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "BIO_TECH");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "FIN_TECH");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "LAW_TECH");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "EDUCATION");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "HW_WALLET");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "GAME");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "SOCIAL");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "MARKETPLACE");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", asset_r144.category == "EXCHANGE");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](asset_r144.value);
} }
class PlayerPortfolioComponent {
    constructor() {
        this.portfolio = [];
    }
    ngOnInit() {
    }
    getCategoryIcon(category) {
        switch (category) {
            case 'MINING_FARM': {
                return 'cluster';
                break;
            }
            case 'BAKERY': {
                return 'factory';
                break;
            }
            case 'BIO_TECH': {
                return 'tree';
                break;
            }
            case 'FIN_TECH': {
                return 'bank';
                break;
            }
            case 'LAW_TECH': {
                return 'balance';
                break;
            }
            case 'EDUCATION': {
                return 'library';
                break;
            }
            case 'HW_WALLET': {
                return 'key';
                break;
            }
            case 'GAME': {
                return 'wand';
                break;
            }
            case 'SOCIAL': {
                return 'share';
                break;
            }
            case 'MARKETPLACE': {
                return 'shopping-cart';
                break;
            }
            case 'EXCHANGE': {
                return 'piggy-bank';
                break;
            }
        }
    }
}
PlayerPortfolioComponent.ɵfac = function PlayerPortfolioComponent_Factory(t) { return new (t || PlayerPortfolioComponent)(); };
PlayerPortfolioComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlayerPortfolioComponent, selectors: [["app-player-portfolio"]], inputs: { portfolio: "portfolio" }, decls: 21, vars: 1, consts: [[1, "table"], [1, "left", 2, "width", "150px"], [1, "left"], [4, "ngFor", "ngForOf"], [2, "text-align", "right"], [1, "fantas"], ["fxLayout", "row"], ["mat-raised-button", "", 3, "matTooltip"], ["shape", "cluster", "class", "is-solid", 4, "ngIf"], ["shape", "factory", "class", "is-solid", 4, "ngIf"], ["shape", "tree", "class", "is-solid", 4, "ngIf"], ["shape", "bank", "class", "is-solid", 4, "ngIf"], ["shape", "balance", "class", "is-solid", 4, "ngIf"], ["shape", "library", "class", "is-solid", 4, "ngIf"], ["shape", "key", "class", "is-solid", 4, "ngIf"], ["shape", "wand", "class", "is-solid", 4, "ngIf"], ["shape", "share", "class", "is-solid", 4, "ngIf"], ["shape", "shopping-cart", "class", "is-solid", 4, "ngIf"], ["shape", "piggy-bank", "class", "is-solid", 4, "ngIf"], ["shape", "block", 1, "is-solid"], ["shape", "cluster", 1, "is-solid"], ["shape", "factory", 1, "is-solid"], ["shape", "tree", 1, "is-solid"], ["shape", "bank", 1, "is-solid"], ["shape", "balance", 1, "is-solid"], ["shape", "library", 1, "is-solid"], ["shape", "key", 1, "is-solid"], ["shape", "wand", 1, "is-solid"], ["shape", "share", 1, "is-solid"], ["shape", "shopping-cart", 1, "is-solid"], ["shape", "piggy-bank", 1, "is-solid"]], template: function PlayerPortfolioComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "th", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Asset");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Features");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "th", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Category");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "th", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Value");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PlayerPortfolioComponent_tr_12_Template, 22, 16, "tr", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](14, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "th", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Total:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "th", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "900");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.portfolio);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltip"], _angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _clr_angular__WEBPACK_IMPORTED_MODULE_4__["ClrIconCustomTag"]], styles: ["@charset \"UTF-8\";\n.fantas[_ngcontent-%COMP%]::before {\n  content: \"\u2131\u00A0\";\n}\n.table[_ngcontent-%COMP%] {\n  margin-top: 0.2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvcGxheWVyLXBvcnRmb2xpby9wbGF5ZXItcG9ydGZvbGlvLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fY29tcG9uZW50cy9wbGF5ZXItcG9ydGZvbGlvL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxwbGF5ZXItcG9ydGZvbGlvXFxwbGF5ZXItcG9ydGZvbGlvLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQjtFQUNJLGFBQUE7QURFSjtBQ0NBO0VBQ0ksa0JBQUE7QURFSiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3BsYXllci1wb3J0Zm9saW8vcGxheWVyLXBvcnRmb2xpby5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBjaGFyc2V0IFwiVVRGLThcIjtcbi5mYW50YXM6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwi4oSxwqBcIjtcbn1cblxuLnRhYmxlIHtcbiAgbWFyZ2luLXRvcDogMC4ycmVtO1xufSIsIi5mYW50YXM6OmJlZm9yZSB7XHJcbiAgICBjb250ZW50OiAnXFwyMTMxIFxcMDBhMCc7XHJcbn1cclxuXHJcbi50YWJsZSB7XHJcbiAgICBtYXJnaW4tdG9wOiAwLjJyZW07XHJcbn1cclxuIl19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlayerPortfolioComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-player-portfolio',
                templateUrl: './player-portfolio.component.html',
                styleUrls: ['./player-portfolio.component.scss']
            }]
    }], function () { return []; }, { portfolio: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/player-treenode/player-treenode.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/_components/player-treenode/player-treenode.component.ts ***!
  \**************************************************************************/
/*! exports provided: PlayerTreenodeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayerTreenodeComponent", function() { return PlayerTreenodeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function PlayerTreenodeComponent_clr_tree_node_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-tree-node");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const asset_r120 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](asset_r120);
} }
class PlayerTreenodeComponent {
    constructor() {
        this.assets = [];
    }
    ngOnInit() {
    }
}
PlayerTreenodeComponent.ɵfac = function PlayerTreenodeComponent_Factory(t) { return new (t || PlayerTreenodeComponent)(); };
PlayerTreenodeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlayerTreenodeComponent, selectors: [["app-player-treenode"]], inputs: { assets: "assets", balance: "balance", position: "position", name: "name", expanded: "expanded" }, decls: 9, vars: 5, consts: [[3, "clrExpanded"], [4, "ngFor", "ngForOf"]], template: function PlayerTreenodeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-tree-node", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "clr-tree-node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "clr-tree-node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "clr-tree-node");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Assets ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, PlayerTreenodeComponent_clr_tree_node_8_Template, 2, 1, "clr-tree-node", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrExpanded", ctx.expanded);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.name, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Balance: F", ctx.balance, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Position: ", ctx.position, "");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.assets);
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrTreeNode"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3BsYXllci10cmVlbm9kZS9wbGF5ZXItdHJlZW5vZGUuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlayerTreenodeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-player-treenode',
                templateUrl: './player-treenode.component.html',
                styleUrls: ['./player-treenode.component.scss']
            }]
    }], function () { return []; }, { assets: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], balance: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], position: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], name: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], expanded: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/players-list/players-list.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/_components/players-list/players-list.component.ts ***!
  \********************************************************************/
/*! exports provided: PlayersListComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlayersListComponent", function() { return PlayersListComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _wealth_indicator_wealth_indicator_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../wealth-indicator/wealth-indicator.component */ "./src/app/_components/wealth-indicator/wealth-indicator.component.ts");
/* harmony import */ var _player_portfolio_player_portfolio_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../player-portfolio/player-portfolio.component */ "./src/app/_components/player-portfolio/player-portfolio.component.ts");









const _c0 = ["accordion"];
const _c1 = ["myPanel"];
function PlayersListComponent_ng_template_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "app-wealth-indicator", 9);
} if (rf & 2) {
    const person_r112 = ctx.person;
    const bars_r113 = ctx.bars;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](person_r112.name);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("bars", bars_r113);
} }
function PlayersListComponent_ng_template_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Current block:");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](5, "app-player-portfolio", 11);
} if (rf & 2) {
    const person_r114 = ctx.person;
    const getPortfolio_r115 = ctx.getPortfolio;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](person_r114.position);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("portfolio", getPortfolio_r115(person_r114));
} }
function PlayersListComponent_ng_container_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PlayersListComponent_ng_container_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PlayersListComponent_clr_accordion_panel_12_ng_container_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
function PlayersListComponent_clr_accordion_panel_12_ng_container_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainer"](0);
} }
const _c2 = function (a0, a1, a2) { return { person: a0, bars: a1, getPortfolio: a2 }; };
function PlayersListComponent_clr_accordion_panel_12_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-accordion-panel", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "clr-accordion-title", 5);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PlayersListComponent_clr_accordion_panel_12_ng_container_2_Template, 1, 0, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "clr-accordion-content");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, PlayersListComponent_clr_accordion_panel_12_ng_container_4_Template, 1, 0, "ng-container", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const person_r116 = ctx.$implicit;
    const ctx_r111 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    const _r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
    const _r105 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r103)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](4, _c2, person_r116.value, ctx_r111.bars.get(person_r116.value.address), ctx_r111.getPortfolio));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r105)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](8, _c2, person_r116.value, ctx_r111.bars.get(person_r116.value.address), ctx_r111.getPortfolio));
} }
class PlayersListComponent {
    constructor(gameService, tezosService, ngZone, changeDetector) {
        this.gameService = gameService;
        this.tezosService = tezosService;
        this.ngZone = ngZone;
        this.changeDetector = changeDetector;
        this.otherPlayers = new Map();
        this.players = [
            { name: 'Alice', cash: 24, assets: 26 },
            { name: 'Bob', cash: 15, assets: 36 },
            { name: 'Charlie', cash: 45, assets: 55 }
        ];
        this.needRefresh = false;
        this.bars = new Map();
        this.getPortfolio = (person) => {
            return [
                { name: 'asset #1', category: 'FIN_TECH', value: 150, nbFeatures: 1 },
                { name: 'asset #2', category: 'MINING_FARM', value: 450, nbFeatures: 4 },
                { name: 'asset #3', category: 'MARKETPLACE', value: 300, nbFeatures: 0 }
            ];
        };
    }
    ngOnInit() {
        this.gameService.players.forEach(player => {
            if (player === this.tezosService.account.account_id) {
                this.me = this.createPlayerDetail(player);
            }
            else {
                this.otherPlayers.set(player, this.createPlayerDetail(player));
            }
        });
        this.computeBars();
    }
    ngAfterViewInit() {
        this.accordion.panels.first.togglePanel();
        this.changeDetector.detectChanges();
        this.gameService.onChange.subscribe(() => {
            this.needRefresh = true;
            // this.changeDetector.detach();
            // this.ngZone.runTask(() => {
            // this.changeDetector.reattach();
            // });
        });
    }
    ngAfterViewChecked() {
        if (this.needRefresh) {
            this.gameService.players.forEach(player => {
                if (player === this.tezosService.account.account_id) {
                    this.updatePlayerDetail(player, this.me);
                }
                else {
                    if (this.otherPlayers.has(player)) {
                        this.updatePlayerDetail(player, this.otherPlayers.get(player));
                    }
                }
                this.computeBars();
            });
            // this.changeDetector.markForCheck();
            // this.changeDetector.reattach();
            // this.changeDetector.detectChanges();
        }
        this.needRefresh = false;
    }
    createPlayerDetail(player) {
        return {
            address: player,
            name: this.gameService.getUsername(player),
            cash: this.gameService.balanceOf(player),
            assets: 0,
            position: this.gameService.playersPosition.has(player) ? this.gameService.playersPosition.get(player) : -1
        };
    }
    updatePlayerDetail(player, detail) {
        detail.name = this.gameService.getUsername(player);
        detail.cash = this.gameService.balanceOf(player);
        detail.assets = 0;
        detail.position = this.gameService.playersPosition.has(player) ? this.gameService.playersPosition.get(player) : -1;
    }
    computeBars() {
        let maxWealth = Math.max(3000, this.me.cash + this.me.assets);
        for (const player of this.otherPlayers.values()) {
            maxWealth = Math.max(maxWealth, player.cash + player.assets);
        }
        this.bars.set(this.me.address, [
            {
                label: 'CASH',
                value: this.me.cash,
                style: { 'color': "black", 'background-color': "white" },
                percentage: maxWealth > 0 ? this.me.cash / maxWealth : 0
            },
            {
                label: 'ASSETS',
                value: this.me.assets,
                style: { 'color': "yellow", 'background-color': "gray" },
                percentage: maxWealth > 0 ? this.me.assets / maxWealth : 0
            }
        ]);
        for (const player of this.otherPlayers.values()) {
            this.bars.set(player.address, [
                {
                    label: 'CASH',
                    value: player.cash,
                    style: { 'color': "black", 'background-color': "white" },
                    percentage: maxWealth > 0 ? player.cash / maxWealth : 0
                },
                {
                    label: 'ASSETS',
                    value: player.assets,
                    style: { 'color': "yellow", 'background-color': "gray" },
                    percentage: maxWealth > 0 ? player.assets / maxWealth : 0
                }
            ]);
        }
    }
}
PlayersListComponent.ɵfac = function PlayersListComponent_Factory(t) { return new (t || PlayersListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"])); };
PlayersListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlayersListComponent, selectors: [["app-players-list"]], viewQuery: function PlayersListComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c1, true);
    } if (rf & 2) {
        var _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.accordion = _t.first);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.myPanel = _t.first);
    } }, decls: 14, vars: 15, consts: [["panelTitle", ""], ["panelContent", ""], ["accordion", ""], [1, "clr-accordion-content-no-padding"], ["myPanel", ""], ["fxLayout", "row", 2, "width", "calc(100% - 0.96rem)", "height", "48px"], [4, "ngTemplateOutlet", "ngTemplateOutletContext"], ["class", "clr-accordion-content-no-padding", 4, "ngFor", "ngForOf"], [2, "width", "100px"], [2, "width", "calc(100% - 100px)", "margin-top", "6px", "margin-left", "24px", 3, "bars"], ["fxLayout", "row"], [3, "portfolio"]], template: function PlayersListComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, PlayersListComponent_ng_template_0_Template, 3, 2, "ng-template", null, 0, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, PlayersListComponent_ng_template_2_Template, 6, 2, "ng-template", null, 1, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplateRefExtractor"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "clr-accordion", null, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "clr-accordion-panel", 3, 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "clr-accordion-title", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, PlayersListComponent_ng_container_9_Template, 1, 0, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "clr-accordion-content");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, PlayersListComponent_ng_container_11_Template, 1, 0, "ng-container", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, PlayersListComponent_clr_accordion_panel_12_Template, 5, 12, "clr-accordion-panel", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](13, "keyvalue");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        const _r103 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](1);
        const _r105 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r103)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](7, _c2, ctx.me, ctx.bars.get(ctx.me.address), ctx.getPortfolio));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngTemplateOutlet", _r105)("ngTemplateOutletContext", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction3"](11, _c2, ctx.me, ctx.bars.get(ctx.me.address), ctx.getPortfolio));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](13, 5, ctx.otherPlayers));
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAccordion"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ɵfc"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAccordionPanel"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ɵfb"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAccordionTitle"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgTemplateOutlet"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrAccordionContent"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _wealth_indicator_wealth_indicator_component__WEBPACK_IMPORTED_MODULE_6__["WealthIndicatorComponent"], _player_portfolio_player_portfolio_component__WEBPACK_IMPORTED_MODULE_7__["PlayerPortfolioComponent"]], pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["KeyValuePipe"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3BsYXllcnMtbGlzdC9wbGF5ZXJzLWxpc3QuY29tcG9uZW50LnNjc3MifQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlayersListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-players-list',
                templateUrl: './players-list.component.html',
                styleUrls: ['./players-list.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_1__["GameService"] }, { type: src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__["TezosService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }]; }, { accordion: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['accordion', { static: false }]
        }], myPanel: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
            args: ['myPanel', { static: false }]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/playground-page/playground-page.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/_components/playground-page/playground-page.component.ts ***!
  \**************************************************************************/
/*! exports provided: PlaygroundPageComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PlaygroundPageComponent", function() { return PlaygroundPageComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _game_status_modal_game_status_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../game-status-modal/game-status-modal.component */ "./src/app/_components/game-status-modal/game-status-modal.component.ts");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/game-controller.service */ "./src/app/_services/game-controller.service.ts");
/* harmony import */ var src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/cdk/layout */ "./node_modules/@angular/cdk/__ivy_ngcc__/fesm2015/layout.js");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _players_list_players_list_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../players-list/players-list.component */ "./src/app/_components/players-list/players-list.component.ts");
/* harmony import */ var _board_board_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../board/board.component */ "./src/app/_components/board/board.component.ts");











class PlaygroundPageComponent {
    constructor(gameService, gameController, changeDetectorRef, connectionService, media, modalService) {
        this.gameService = gameService;
        this.gameController = gameController;
        this.changeDetectorRef = changeDetectorRef;
        this.connectionService = connectionService;
        this.media = media;
        this.modalService = modalService;
        this.gameStatusVisible = false;
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    ngOnInit() {
    }
    showGameStatus() {
        this.modalService.showModal(_game_status_modal_game_status_modal_component__WEBPACK_IMPORTED_MODULE_1__["GameStatusModalComponent"]);
    }
}
PlaygroundPageComponent.ɵfac = function PlaygroundPageComponent_Factory(t) { return new (t || PlaygroundPageComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_3__["GameControllerService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_4__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["MediaMatcher"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"])); };
PlaygroundPageComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: PlaygroundPageComponent, selectors: [["app-playground-page"]], decls: 19, vars: 2, consts: [["fxLayout", "row", "fxLayout.xs", "column", "fxLayoutGap", "5px", "fxLayoutAlign", "center start", "fxLayoutAlign.xs", "start center", 1, "content-container"], [2, "width", "30%", "min-width", "340px"], [1, "sidenav-content"], [2, "text-align", "center"], [2, "margin-bottom", "24px"], [1, "btn", 2, "text-align", "right", "width", "auto", 3, "click"], ["src", "assets/logo-xs.png", "width", "auto", "height", "80%"], [2, "margin-right", "24px", "margin-left", "6px"], [1, "content-area", 2, "width", "auto", "min-height", "720px"]], template: function PlaygroundPageComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "nav", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Game Session");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function PlaygroundPageComponent_Template_button_click_6_listener() { return ctx.showGameStatus(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "p");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "section", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "h3", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Players");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](16, "app-players-list");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](18, "app-board");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.gameService.game == null ? null : ctx.gameService.game.sessionId);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("created by ", ctx.gameService.getUsername(ctx.gameService.game.creator), "");
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__["DefaultLayoutGapDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_7__["DefaultLayoutAlignDirective"], _players_list_players_list_component__WEBPACK_IMPORTED_MODULE_8__["PlayersListComponent"], _board_board_component__WEBPACK_IMPORTED_MODULE_9__["BoardComponent"]], styles: [".content-container[_ngcontent-%COMP%] {\n  overflow: auto !important;\n}\n\n.content-area[_ngcontent-%COMP%] {\n  overflow: hidden !important;\n}\n\n.game-control[_ngcontent-%COMP%] {\n  width: 72px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvcGxheWdyb3VuZC1wYWdlL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxwbGF5Z3JvdW5kLXBhZ2VcXHBsYXlncm91bmQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvcGxheWdyb3VuZC1wYWdlL3BsYXlncm91bmQtcGFnZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLHlCQUFBO0FDQ0o7O0FER0E7RUFFSSwyQkFBQTtBQ0RKOztBRElBO0VBQ0ksV0FBQTtBQ0RKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvcGxheWdyb3VuZC1wYWdlL3BsYXlncm91bmQtcGFnZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LWNvbnRhaW5lciB7XHJcbiAgICBvdmVyZmxvdzogYXV0byAhaW1wb3J0YW50O1xyXG4gICAgLy8gaGVpZ2h0OiBhdXRvO1xyXG59XHJcblxyXG4uY29udGVudC1hcmVhIHtcclxuICAgIC8vIG1pbi1oZWlnaHQ6IDc1MHB4O1xyXG4gICAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xyXG59XHJcblxyXG4uZ2FtZS1jb250cm9sIHtcclxuICAgIHdpZHRoOiA3MnB4O1xyXG59XHJcbiIsIi5jb250ZW50LWNvbnRhaW5lciB7XG4gIG92ZXJmbG93OiBhdXRvICFpbXBvcnRhbnQ7XG59XG5cbi5jb250ZW50LWFyZWEge1xuICBvdmVyZmxvdzogaGlkZGVuICFpbXBvcnRhbnQ7XG59XG5cbi5nYW1lLWNvbnRyb2wge1xuICB3aWR0aDogNzJweDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](PlaygroundPageComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-playground-page',
                templateUrl: './playground-page.component.html',
                styleUrls: ['./playground-page.component.scss']
            }]
    }], function () { return [{ type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }, { type: src_app_services_game_controller_service__WEBPACK_IMPORTED_MODULE_3__["GameControllerService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"] }, { type: src_app_services_connection_service__WEBPACK_IMPORTED_MODULE_4__["ConnectionService"] }, { type: _angular_cdk_layout__WEBPACK_IMPORTED_MODULE_5__["MediaMatcher"] }, { type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_6__["ModalService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/progress-bar/progress-bar.component.ts":
/*!********************************************************************!*\
  !*** ./src/app/_components/progress-bar/progress-bar.component.ts ***!
  \********************************************************************/
/*! exports provided: ProgressBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBarComponent", function() { return ProgressBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/progress-bar.service */ "./src/app/_services/progress-bar.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");





function ProgressBarComponent_div_0_clr_progress_bar_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-progress-bar", 4);
} if (rf & 2) {
    const ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrValue", ctx_r62.progressBarService.progressValue)("clrMax", ctx_r62.progressBarService.max)("clrDisplayval", ctx_r62.progressBarService.displayValue);
} }
function ProgressBarComponent_div_0_clr_progress_bar_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "clr-progress-bar", 5);
} }
function ProgressBarComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProgressBarComponent_div_0_clr_progress_bar_1_Template, 1, 3, "clr-progress-bar", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, ProgressBarComponent_div_0_clr_progress_bar_2_Template, 1, 0, "clr-progress-bar", 3);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r61 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r61.progressBarService.progressIsHidden);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx_r61.progressBarService.loopingIsHidden);
} }
class ProgressBarComponent {
    constructor(progressBarService) {
        this.progressBarService = progressBarService;
    }
    ngOnInit() {
    }
}
ProgressBarComponent.ɵfac = function ProgressBarComponent_Factory(t) { return new (t || ProgressBarComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_1__["ProgressBarService"])); };
ProgressBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: ProgressBarComponent, selectors: [["app-progress-bar"]], decls: 1, vars: 1, consts: [["class", "progress-bar-container", 4, "ngIf"], [1, "progress-bar-container"], ["clrLabeled", "", "clrFade", "", 3, "clrValue", "clrMax", "clrDisplayval", 4, "ngIf"], ["clrLoop", "", 4, "ngIf"], ["clrLabeled", "", "clrFade", "", 3, "clrValue", "clrMax", "clrDisplayval"], ["clrLoop", ""]], template: function ProgressBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, ProgressBarComponent_div_0_Template, 3, 2, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.progressBarService.progressIsHidden || ctx.progressBarService.loopingIsHidden);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _clr_angular__WEBPACK_IMPORTED_MODULE_3__["ClrProgressBar"]], styles: [".progress-bar-container[_ngcontent-%COMP%] {\n  margin-bottom: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvcHJvZ3Jlc3MtYmFyL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxwcm9ncmVzcy1iYXJcXHByb2dyZXNzLWJhci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvcHJvZ3Jlc3MtYmFyL3Byb2dyZXNzLWJhci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLG1CQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy9wcm9ncmVzcy1iYXIvcHJvZ3Jlc3MtYmFyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnByb2dyZXNzLWJhci1jb250YWluZXIge1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMjRweDtcclxufSIsIi5wcm9ncmVzcy1iYXItY29udGFpbmVyIHtcbiAgbWFyZ2luLWJvdHRvbTogMjRweDtcbn0iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProgressBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-progress-bar',
                templateUrl: './progress-bar.component.html',
                styleUrls: ['./progress-bar.component.scss']
            }]
    }], function () { return [{ type: src_app_services_progress_bar_service__WEBPACK_IMPORTED_MODULE_1__["ProgressBarService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/space-card/space-card.component.ts":
/*!****************************************************************!*\
  !*** ./src/app/_components/space-card/space-card.component.ts ***!
  \****************************************************************/
/*! exports provided: SpaceCardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceCardComponent", function() { return SpaceCardComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");



function SpaceCardComponent_img_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "img", 5);
} if (rf & 2) {
    const ctx_r158 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("width", ctx_r158.width);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("src", ctx_r158.space.src, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"])("alt", ctx_r158.space.alt)("title", ctx_r158.space.title);
} }
class SpaceCardComponent {
    constructor() {
        this.width = 100;
        this.space = undefined;
        this.detail = "Every player can use the marketplace to sell/buy their assets (companies).\nThe marketplace's owner earns 10% of the price of each assets sold.";
    }
    ngOnInit() {
    }
}
SpaceCardComponent.ɵfac = function SpaceCardComponent_Factory(t) { return new (t || SpaceCardComponent)(); };
SpaceCardComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpaceCardComponent, selectors: [["app-space-card"]], inputs: { width: "width", space: "space" }, decls: 11, vars: 7, consts: [[1, "card", "card-background"], [1, "card-header"], [2, "position", "relative", "height", "100%"], ["class", "card-img", 3, "src", "alt", "title", "width", 4, "ngIf"], [1, "item"], [1, "card-img", 3, "src", "alt", "title", "width"]], template: function SpaceCardComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SpaceCardComponent_img_4_Template, 1, 4, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h4");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Details:");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("width: ", ctx.width, "px;");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.space == null ? null : ctx.space.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.space != undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.space == null ? null : ctx.space.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.detail);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"]], styles: ["@charset \"UTF-8\";\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.item[_ngcontent-%COMP%] {\n  padding: 0;\n  color: #fff;\n  text-align: center;\n}\n.players[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -24px;\n  text-align: center;\n  width: 100%;\n}\n.overlap-img[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 80px;\n  top: 87px;\n  width: 160px;\n}\n.card-background[_ngcontent-%COMP%] {\n  background-color: #21333b;\n}\n.card-header[_ngcontent-%COMP%] {\n  background: #324f62;\n}\n.card[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n.card-img[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2UtY2FyZC9zcGFjZS1jYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fY29tcG9uZW50cy9zcGFjZS1jYXJkL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxzcGFjZS1jYXJkXFxzcGFjZS1jYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fY29tcG9uZW50cy9zcGFjZS1jYXJkL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvbm9kZV9tb2R1bGVzXFxAY2xyXFx1aVxcc3JjXFx1dGlsc1xcX3RoZW1lLmRhcmsuY2xhcml0eS5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQixnREFBQTtBQzhCQTs7O0VBQUE7QUFNQTs7Ozs7Ozs7RUFBQTtBQVdBOzs7Ozs7Ozs7Ozs7O0dBQUE7QUFnQkE7Ozs7OztHQUFBO0FBU0E7Ozs7Ozs7O0dBQUE7QUFlQTs7OztHQUFBO0FBT0E7Ozs7R0FBQTtBQVdBOzs7Ozs7O0dBQUE7QUFpRUE7O0dBQUE7QUFJQTs7Ozs7O0dBQUE7QUF3QkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBQUE7QUErSEE7Ozs7OztHQUFBO0FBY0E7Ozs7O0dBQUE7QUFxQkE7Ozs7OztHQUFBO0FBaUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FBQTtBQW1FQTs7Ozs7OztHQUFBO0FBa0JBOzs7OztFQUFBO0FBY0E7Ozs7Ozs7R0FBQTtBQThCQTs7Ozs7Ozs7R0FBQTtBQWFBOzs7OztHQUFBO0FBV0E7Ozs7Ozs7Ozs7Ozs7O0dBQUE7QUFvQ0E7Ozs7O0dBQUE7QUFhQTs7Ozs7O0dBQUE7QUFrQkE7Ozs7O0dBQUE7QUFXQTs7Ozs7R0FBQTtBQTBCQTs7Ozs7OztHQUFBO0FBb0JBOzs7OztHQUFBO0FBWUE7OztFQUFBO0FBaUJBOzs7OztHQUFBO0FBVUE7Ozs7OztHQUFBO0FBZUE7Ozs7Ozs7R0FBQTtBQTJCQTs7Ozs7R0FBQTtBQWlCQTs7Ozs7R0FBQTtBRHp2QkE7RUFDSSxVQUFBO0VBSUEsV0FBQTtFQUdBLGtCQUFBO0FEdVBKO0FDcFBBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0FEdVBKO0FDcFBBO0VBQ0ksa0JBQUE7RUFDQSxVQUFBO0VBQ0EsU0FBQTtFQUNBLFlBQUE7QUR1UEo7QUNwUEE7RUFFSSx5QkMwU2dCO0FGcERwQjtBQ2xQQTtFQUNJLG1CQUFBO0FEcVBKO0FDbFBBO0VBQ0ksYUFBQTtBRHFQSjtBQ2xQQTtFQUNJLGFBQUE7QURxUEoiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy9zcGFjZS1jYXJkL3NwYWNlLWNhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4vKiBNaW5pbWFsIGltcG9ydHMgdG8gZXhwb3NlIGNsYXJpdHkgdmFyaWFibGVzICovXG4vKioqKioqKioqXG4gKiBHbG9iYWwgdmFyaWFibGVzIHdpbGwgaGF2ZSBhbiBlZmZlY3Qgb24gb3IgaW4gbXVsdGlwbGUgQ2xhcml0eSBjb21wb25lbnRzLlxuICogV2hlcmUgcG9zc2libGUsIHRoZXJlIGlzIGEgbGlzdCBmaWxlcyBhZmZlY3RlZCBieSB0aGUgdmFyaWFibGUuXG4gKi9cbi8qKioqKioqKipcbiAqICRjbHItZ2xvYmFsLWFwcC1iYWNrZ3JvdW5kXG4gKiBDaGFuZ2UgdGhlIGJhY2tncm91bmQgZm9yIHRoZSBjbGFyaXR5IGFwcGxpY2F0aW9uLlxuICogVXNhZ2U6IGNsYXJpdHktcm9vdC9zcmMvY2xyLWFuZ3VsYXIvbGF5b3V0L21haW4tY29udGFpbmVyL19sYXlvdXQuY2xhcml0eS5zY3NzXG4gKiBBZmZlY3RzOlxuICogLSAkY2xyLWxvZ2luLWJhY2tncm91bmQtY29sb3JcbiAqIC0gJGNsci1zdGFjay12aWV3LWJnLWNvbG9yXG4gKiAtICRjbHItc3RhY2stdmlldy1zdGFjay1ibG9jay1sYWJlbC1hbmQtY29udGVudC1iZy1jb2xvclxuICovXG4vKioqKioqKioqXG4gICogJGNsci1nbG9iYWwtc2VsZWN0aW9uLWNvbG9yXG4gICogQ29tcG9uZW50cyB0aGF0IGhhdmUgYSBzZWxlY3RlZCAob3IgYWN0aXZlKSBzdGF0ZSB1c2UgdGhpcyB0byBjaGFuZ2UgdGhlIGJhY2tncm91bmQtY29sb3Igd2hlbiBhbiBpdGVtIG9yIGVsZW1lbnRcbiAgKiBpcyBpbiB0aGUgYWN0aXZlIHN0YXRlLlxuICAqIFVzYWdlczpcbiAgKiAtIF9sYXlvdXQuY2xhcml0eS5zY3NzXG4gICogLSBfZGF0YWdyaWQuY2xhcml0eS5zY3NzXG4gICogLSBfc2lkZW5hdi5jbGFyaXR5LnNjc3NcbiAgKlxuICAqIENvbXBvbmVudCdzIHdpdGggdmFyaWFibGVzIGFmZmVjdGVkIGluIHRoZSBkYXJrIHRoZW1lICh0aGlzIGZpbGUpXG4gICogLSBTdGFjayBWaWV3XG4gICogLSBUcmVlIFZpZXdcbiAgKiAtIERyb3Bkb3duXG4gICovXG4vKioqKioqKioqXG4gICogJGNsci1nbG9iYWwtaG92ZXItYmctY29sb3JcbiAgKiBDb21wb25lbnRzIG9yIGVsZW1lbnRzIHRoYXQgY2FuIGJlIGhvdmVyZWQgd2lsbCBoYXZlIHRoaXMgY29sb3IgYXBwbGllZCB0byB0aGVpciBiYWNrZ3JvdW5kLWNvbG9yLlxuICAqIENvbXBvbmVudCdzIHdpdGggdmFyaWFibGVzIGFmZmVjdGVkIGluIHRoZSBkYXJrIHRoZW1lICh0aGlzIGZpbGUpXG4gICogLSBEcm9wZG93blxuICAqIC0gVHJlZSBWaWV3XG4gICovXG4vKioqKioqKioqXG4gICogVGhlIGNsb3NlIGNsYXNzIGlzIGEgdXRpbGl0eSBjbGFzcyB0aGF0IGNhbiBiZSBhcHBsaWVkIHRvIGVsZW1lbnRzIHdpdGggYSBjbHItaWNvbiB0aGF0cyB1c2VkIGZvciBjbG9zaW5nIHNvbWV0aGluZy5cbiAgKiBUaGVyZSBhcmUgdHdvIHZhcmlhYmxlcyB0aGF0IGNvbnRyb2wgdGhlIG5vcm1hbCBhbmQgaG92ZXJlZCBzdGF0ZXMuXG4gICogVXNhZ2VzOlxuICAqIC0gX2Nsb3NlLmNsYXJpdHkuc2Nzc1xuICAqXG4gICogQ29tcG9uZW50J3Mgd2l0aCB2YXJpYWJsZXMgYWZmZWN0ZWQgaW4gdGhlIGRhcmsgdGhlbWUgKHRoaXMgZmlsZSlcbiAgKiAtID8/XG4gICovXG4vKioqKioqKioqXG4gICogTmFtZTogUG9wb3ZlciBib3gtc2hhZG93LWNvbG9yXG4gICogVXNhZ2VzOiAuL19kcm9wZG93bi5jbGFyaXR5LnNjc3NcbiAgKiBVc2FnZXM6IC4vX2RhdGVwaWNrZXIuY2xhcml0eS5zY3NzXG4gICovXG4vKioqKioqKioqXG4gICogTmFtZTogTGluayAoYW5kIGxpbmsgc3RhdGUgY29sb3JzKVxuICAqIERlc2NyaXB0aW9uIHRoZSBjb2xvciBmb3IgbGlua3MgYW5kIHRoZSBhY3RpdmUsIGhvdmVyZWQgYW5kIHZpc2l0ZWQgc3RhdGVcbiAgKiBVc2FnZXM6IC4vX3JlYm9vdC5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKioqKioqXG4gICogQWxlcnRzXG4gICogQWxlcnRzIGFyZSBiYW5uZXJzIHRoYXQgY29tbXVuaWNhdGUgYSBtZXNzYWdlIHdpdGggYSBzZXZlcml0eSBhdHRhY2hlZCB0byBpdC4gVGhleSBncmFiIHRoZSB1c2Vy4oCZcyBhdHRlbnRpb24gdG9cbiAgKiBwcm92aWRlIGNyaXRpY2FsIGluZm9ybWF0aW9uIG5lZWRlZCBpbiBjb250ZXh0LiBUaGVzZSB2YXJpYWJsZXMgY29udHJvbCB0aGUgYmFja2dyb3VuZC1jb2xvciBhbmQgZm9udCBjb2xvciBmb3IgZWFjaFxuICAqIG9mIHRoZSBhbGVydCB0eXBlcy5cbiAgKlxuICAqIFRoZXJlIGFyZSBzZXZlbiB0eXBlcyBvZiBhbGVydCBhbmQgd2Ugc2V0IHRoZSBiYWNrZ3JvdW5kLWNvbG9yIGFuZCBmb250IGNvbG9yIGZvciBlYWNoIGhlcmUuXG4gICovXG4vKioqKioqKioqKlxuICAqIEVORDogQWxlcnRzXG4gICovXG4vKioqKioqKioqKioqKioqKipcbiAgKiBCYWRnZVxuICAqIEJhZGdlcyBwcm92aWRlIGEgbWV0aG9kIHRvIGhpZ2hsaWdodCBhIGNvdW50IG9mIGFuIGVsZW1lbnQgZWl0aGVyIG5leHQgdG8gaXQgb3IgaW5zaWRlIHRoZSBlbGVtZW50IGl0c2VsZi5cbiAgKiBIZXJlIHlvdSBjYW4gc2V0IHRoZSBiYWNrZ3JvdW5kLWNvbG9yIGFuZCBmb250IGNvbG9yKHMpIGZvciB0aGUgdmFyaW91cyBiYWRnZSB0eXBlcy5cbiAgKiBUaGVyZSBhcmUgZml2ZSBjb2xvciBvcHRpb25zIGFuZCBmb3VyIHN0YXR1cyB0eXBlcyBhIENsYXJpdHkgbGFiZWwgbWF5IGhhdmUuXG4gICpcbiAgKi9cbi8qKioqKioqKioqKioqKioqKlxuICAqIEJ1dHRvbnNcbiAgKiBCdXR0b25zIGFsbG93IGFuIGFwcGxpY2F0aW9uIHRvIGNvbW11bmljYXRlIGFjdGlvbiBhbmQgZGlyZWN0IHVzZXIgaW50ZW50LlxuICAqIEJ1dHRvbnMgY2FuIGJlOiBzb2xpZCwgb3V0bGluZWQgb3IgZmxhdC5cbiAgKiBTb2xpZCBhbmQgb3V0bGluZSBoYXZlIGZvdXIgdHlwZXM6IHByaW1hcnksIHN1Y2Nlc3MsIHdhcm5pbmcsIGRhbmdlci5cbiAgKiBCdXR0b25zIGNhbiBiZSBkaXNhYmxlZC5cbiAgKlxuICAqIEZvciBlYWNoIGJ1dHRvbiB0eXBlLCB1c2UgdGhlc2UgdmFyaWFibGVzIHRvIGNoYW5nZSB0aGUgZm9sbG93aW5nIGJ1dHRvbiBwcm9wZXJ0aWVzOlxuICAqIC0gYmFja2dyb3VuZCBjb2xvclxuICAqIC0gYm9yZGVyXG4gICogLSAoZm9udCkgY29sb3JcbiAgKiAtIDpob3ZlciBiYWNrZ3JvdW5kLWNvbG9yXG4gICogLSA6aG92ZXIgKGZvbnQpIGNvbG9yXG4gICogLSBib3gtc2hhZG93IGNvbG9yXG4gICpcbiAgKiAgTk9URTogdGhlc2UgdmFyaWFibGVzIGFsc28gYWZmZWN0IGJ1dHRvbiBncm91cHMuXG4gICpcbiAgKi9cbi8qKioqKioqKioqXG4gICogQ2FyZFxuICAqIEEgY2FyZCBwcmVzZW50cyBoaWdoLWxldmVsIGluZm9ybWF0aW9uIGFuZCBjYW4gZ3VpZGUgdGhlIHVzZXIgdG93YXJkIHJlbGF0ZWQgYWN0aW9ucyBhbmQgZGV0YWlscy4gVXNlIHRoZXNlIHZhcmlhYmxlc1xuICAqIHRvIGNoYW5nZSB0aGUgbG9vayBhbmQgZmVlbCBvZiB5b3VyIGNhcmRzLlxuICAqXG4gICogVXNhZ2U6IC4uL2xheW91dC9fY2FyZC5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKioqKioqXG4gICogRGF0YWdyaWRcbiAgKiBEYXRhZ3JpZHMgYXJlIGZvciBvcmdhbml6aW5nIGxhcmdlIHZvbHVtZXMgb2YgZGF0YSB0aGF0IHVzZXJzIGNhbiBzY2FuLCBjb21wYXJlLCBhbmQgcGVyZm9ybSBhY3Rpb25zIG9uLlxuICAqXG4gICogVXNhZ2U6IC4uL2RhdGEvZGF0YWdyaWQvX2RhdGFncmlkLmNsYXJpdHkuc2Nzc1xuICAqL1xuLyoqKioqKioqKlxuICAqIERyb3Bkb3duXG4gICogQSBkcm9wZG93biBtZW51IGFsbG93cyB0aGUgdXNlciB0byBjaG9vc2UgYW4gb3B0aW9uIG9yIGFjdGlvbiBmcm9tIGEgY29udGV4dHVhbCBsaXN0LiBVc2UgdGhlc2UgdmFyaWFibGVzIHRvIGNoYW5nZVxuICAqIHRoZSBsb29rLW4tZmVlbCBvZiB5b3VyIGRyb3Bkb3ducy5cbiAgKlxuICAqIFVzYWdlOiAuLi9wb3BvdmVyL2Ryb3Bkb3duL19kcm9wZG93bi5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKipcbiAgKiBGb3JtczogVE9ETzogdHJhY2sgZG93biBjb21wb25lbnQgdXNhZ2VzIGFuZCBuYW1lc1xuICAqIEEgZm9ybSBpcyBhIHN0cnVjdHVyZWQgbGF5b3V0IG9mIHJlbGF0ZWQgaW5wdXQgY29tcG9uZW50cy5cbiAgKiBUaGVyZSBhcmUgYSB2YXJpZXR5IG9mIHZhcmlhYmxlcyB1c2VkIHRvIGNoYW5nZSBmb3JtIGVsZW1lbnRzLCBpbmNsdWRpbmc6XG4gICpcbiAgKiBVc2FnZTpcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX2NoZWNrYm94LmNsYXJpdHkuc2Nzc1xuICAqIC4uL2Zvcm1zL3N0eWxlcy9fY29udGFpbmVycy5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX2ZpbGUuY2xhcml0eS5zY3NzXG4gICogLi4vZm9ybXMvc3R5bGVzL19mb3JtLmNsYXJpdHkuc2Nzc1xuICAqIC4uL2Zvcm1zL3N0eWxlcy9faW5wdXQuY2xhcml0eS5zY3NzXG4gICogLi4vZm9ybXMvc3R5bGVzL19pbnB1dC1ncm91cC5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX21peGluZ3MuZm9ybXMuc2Nzc1xuICAqIC4uL2Zvcm1zL3N0eWxlcy9yYWRpby5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX3NlbGVjdC5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX3RleHRhcmVhLmNsYXJpdHkuc2Nzc1xuICAqIC4uL2Zvcm1zL3N0eWxlcy9fdmFyaWFibGVzLmNsYXJpdHkuc2Nzc1xuICAqXG4gICovXG4vKioqKioqKioqKlxuICAqIEhlYWRlclxuICAqIEhlYWRlcnMgcHJvdmlkZSBicmFuZGluZywgbmF2aWdhdGlvbiwgc2VhcmNoLCBhbmQgYWNjZXNzIHRvIGdsb2JhbCBhcHBsaWNhdGlvbiBhY3Rpb25zIHN1Y2ggYXMgc2V0dGluZ3MgYW5kXG4gICogbm90aWZpY2F0aW9ucy4gVGhlcmUgYXJlIGZpdmUgaGVhZGVyIGNvbG9ycyBpbiB0aGUgZGFyayB0aGVtZS5cbiAgKlxuICAqIFVzYWdlOiAuLi9sYXlvdXQvbmF2L19oZWFkZXIuY2xhcml0eS5zY3NzXG4gICogLVxuICAqL1xuLyoqKioqKioqKipcbiAqIEljb25zXG4gKiBJY29ucyBieSBkZWZhdWx0IGFyZSBwcmVzZW50YXRpb25hbCBvbmx5IG1lYW5pbmcgdGhleSBkbyBub3QgcHJvdmlkZSBhbnkgY29udGV4dCB0byBzY3JlZW4gcmVhZGVyc1xuICpcbiAqIFVzYWdlOiAuL19pY29ucy5jbGFyaXR5LnNjc3NcbiAqL1xuLyoqKioqKioqKioqKioqKioqXG4gICogTGFiZWxcbiAgKiBMYWJlbHMgc2hvdyBjb25jaXNlIG1ldGFkYXRhIGluIGEgY29tcGFjdCBmb3JtYXQuIEhlcmUgeW91IGNhbiBzZXQgdGhlIGJhY2tncm91bmQtY29sb3IgYW5kIGZvbnQgY29sb3IocykgZm9yIHRoZVxuICAqIGRpZmZlcmVudCB0eXBlcyBvZiBsYWJlbHMuXG4gICpcbiAgKiBUaGVyZSBhcmUgZml2ZSBjb2xvciBvcHRpb25zIGFuZCBmb3VyIHN0YXR1cyB0eXBlcyBhIENsYXJpdHkgbGFiZWwgbWF5IGhhdmUuXG5cbiAgKi9cbi8qKioqKioqKlxuICAqIExvZ2luXG4gICogVGhlIGxvZ2luIHBhZ2UgaXMgYSBwcmVkZWZpbmVkIGZvcm0gZm9yIGFwcGxpY2F0aW9ucyB0aGF0IHJlcXVpcmUgYXV0aGVudGljYXRpb24uXG4gICogdXNlIHRoZXNlIHZhcmlhYmxlcyB0byBzZXQgdGhlIGJhY2tncm91bmQtY29sb3IgYW5kIHRoZSBzdmcgdXNlZCBmb3IgdGhlIGJhY2dyb3VuZCBpbWFnZS5cbiAgKlxuICAqIFVzYWdlOlxuICAqIC0gLi4vbGF5b3V0L19sb2dpbi5jbGFyaXR5LnNjc3NcbiAgKiAtIC4uL2ltYWdlL19pY29ucy5jbGFyaXR5LnNjc3MgKGxvZ2luIGJhY2tncm91bmQgaW1hZ2UpXG4gICovXG4vKioqKioqKioqKlxuICAqIE1vZGFsXG4gICogTW9kYWxzIHByb3ZpZGUgaW5mb3JtYXRpb24gb3IgaGVscCBhIHVzZXIgY29tcGxldGUgYSB0YXNrLlxuICAqXG4gICogVXNhZ2U6IC4uL21vZGFsL19tb2RhbC5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKioqKioqKioqKipcbiAgKiBOYXZcbiAgKiBBIHNvdW5kIG5hdmlnYXRpb24gbGF5b3V0IG9mZmVycyBhIGhpZ2ggZGVncmVlIG9mIGRpc2NvdmVyYWJpbGl0eSBhbmQgZmVlZGJhY2ssIGxldHRpbmcgdXNlcnMga25vdyB3aGVyZSB0aGV5IGFyZSBhdFxuICAqIGFsbCB0aW1lcyBhbmQgZW5zdXJpbmcgdGhleSBjYW4gZWFzaWx5IGdldCB0byB3aGVyZSB0aGV5IHdhbnQgdG8gZ28uXG4gICpcbiAgKiBUaGUgdmFyaWFibGVzIGluIHRoaXMgc2VjdGlvbiBjb250cm9sIHRoZSBmb2xsb3dpbmcgbmF2aWdhdGlvbiBjb21wb25lbnRzXG4gICogLSBSZXNwb25zaXZlIG5hdlxuICAqIC0gU2lkZSBuYXZcbiAgKiAtIFN1YiBuYXZcbiAgKlxuICAqIFVzYWdlOlxuICAqIC0gLi4vbGF5b3V0L25hdi9fcmVzcG9uc2l2ZS1uYXYuY2xhcml0eS5zY3NzXG4gICogLSAuLi9sYXlvdXQvbmF2L19zaWRlbmF2LW5hdi5jbGFyaXR5LnNjc3NcbiAgKiAtIC4uL2xheW91dC9uYXYvX3N1Ym5hdi5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKioqKioqKioqKlxuICAqIFByb2dyZXNzIEJhcnNcbiAgKiBBIHByb2dyZXNzIGJhciBpcyBhIGxpbmVhciBpbmRpY2F0b3IgZm9yIHByb3ZpZGluZyBmZWVkYmFjayBhYm91dCBhbiBvbmdvaW5nLCB1c2VyLWluaXRpYXRlZCBwcm9jZXNzLlxuICAqXG4gICogVXNhZ2U6IC4uL3Byb2dyZXNzL3Byb2dyZXNzLWJhcnMvX3Byb2dyZXNzLWJhcnMuL2NsYXJpdHkuc2Nzc1xuICAqL1xuLyoqKioqKioqKlxuICAqIFNpZ25wb3N0XG4gICogVGhlIHNpZ25wb3N0IGlzIGEgY29udmVuaWVudCwgbGlnaHR3ZWlnaHQgd2F5IHRvIHNob3cgY29udGV4dHVhbCBoZWxwIG9mIGluZm9ybWF0aW9uIHdpdGhvdXQgdGFraW5nIHRoZSB1c2VyIG91dCBvZlxuICAqIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICpcbiAgKiBVc2FnZTogLi4vcG9wb3Zlci9zaWducG9zdC9zaWducG9zdHMuY2xhcml0eS5zY3NzXG4gICovXG4vKioqKioqKioqXG4gICogU3Bpbm5lclxuICAqIEEgc3Bpbm5lciBpcyB2aXN1YWwgaW5kaWNhdG9yIG9mIGFuIG9uZ29pbmcsIHVzZXItaW5pdGlhdGVkIHByb2Nlc3MuXG4gICpcbiAgKiBVc2FnZTogLi4vcHJvZ3Jlc3Mvc3Bpbm5lci9fc3Bpbm5lci5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKioqKipcbiAgKiBTdGFjayBWaWV3XG4gICogQSBzdGFjayB2aWV3IGRpc3BsYXlzIGtleS92YWx1ZSBwYWlycywgd2hpY2ggdXNlcnMgY2FuIGV4cGFuZCB0byBzaG93IG1vcmUgZGV0YWlsLlxuICAqXG4gICogVXNhZ2U6IC4uL2RhdGEvc3RhY2stdmlldy9fc3RhY2stdmlldy5jbGFyaXR5LnNjc3NcbiAgKi9cbi8qKioqKioqKioqXG4gICogVGFibGVcbiAgKiBVc2UgdGhlIHRhYmxlIHN0eWxlcyB3aGVyZXZlciB5b3UgbmVlZCB0byBwcmVzZW50IHN0YXRpYyBkYXRhIGluIGEgdGFidWxhciBmb3JtYXQuXG4gICpcbiAgKiBVc2FnZTpcbiAgKiAtIC4uL2RhdGEvX3RhYmxlcy5jbGFyaXR5LnNjc3NcbiAgKiAtIC4uL2RhdGEvZGF0YWdyaWQvX2RhdGFncmlkLmNsYXJpdHkuc2Nzc1xuICAqL1xuLyoqKioqKioqKipcbiAgKiBUYWJzXG4gICogVGFicyBkaXZpZGUgY29udGVudCBpbnRvIHNlcGFyYXRlIHZpZXdzIHdoaWNoIHVzZXJzIG5hdmlnYXRlIGJldHdlZW4uXG4gICpcbiAgKiBVc2FnZTogLi4vbGF5b3V0L25hdi9fbmF2LmNsYXJpdHkuc2Nzc1xuICAqL1xuLyoqXG4gICogVGltZWxpbmVcbiAgKiBVc2UgYSB0aW1lbGluZSB0byBzaG93IHByb2dyZXNzIG9uIGNvbmNyZXRlIHN0ZXBzIHdpdGggYSBzcGVjaWZpYyBlbmQgZ29hbC5cbiAqL1xuLyoqKioqKioqKipcbiAgKiBUb29sdGlwXG4gICogQSB0b29sdGlwIHByb3ZpZGVzIGEgc2hvcnQgZGVzY3JpcHRpb24gb2YgYSBVSSBlbGVtZW50LlxuICAqXG4gICogVXNhZ2U6IC4uL3BvcG92ZXIvdG9vbHRpcC9fdG9vbHRpcHMuY2xhcml0eS5zY3NzXG4gICovXG4vKioqKioqKioqKlxuICAqIFRyZWUgVmlld1xuICAqIEEgdHJlZSBpcyBhIGhpZXJhcmNoaWNhbCBjb21wb25lbnQgdGhhdCBzaG93cyB0aGUgdmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwYXJlbnQtY2hpbGQgcmVsYXRpb25zaGlwIGJldHdlZW5cbiAgKiBub2Rlcy5cbiAgKlxuICAqIFVzYWdlOiAuLi9kYXRhL3RyZWUtdmlldy9fdHJlZS12aWV3LmNsYXJpdHkuc2Nzc1xuICAqL1xuLyoqKioqKioqKipcbiAgKiBUeXBvZ3JhcGh5XG4gICogQ2xhcml0eSB1c2VzIHRoZSBnZW9tZXRyaWMgc2Fucy1zZXJpZiBmb250LCBNZXRyb3BvbGlzLlxuICAqXG4gICogVXNhZ2U6XG4gICogLSAuLi90eXBvZ3JhcGh5L190eXBvZ3JhcGh5LmNsYXJpdHkuc2Nzc1xuICAqIC0gLi4vZGF0YS9kYXRhZ3JpZC9fZGF0YWdyaWQuY2xhcml0eS5zY3NzXG4gICovXG4vKioqKioqKioqKlxuICAqIFZlcnRpY2FsIE5hdlxuICAqIFRoaXMgaXMgYSB2ZXJ0aWNhbGx5LWFsaWduZWQgbmF2aWdhdGlvbmFsIGNvbXBvbmVudC5cbiAgKlxuICAqIFVzYWdlOiAuLi9sYXlvdXQvdmVydGljYWwtbmF2L192ZXJ0aWNhbC1uYXYuY2xhcml0eS5zY3NzXG4gICovXG4vKioqKioqKioqKlxuICAqIFdpemFyZFxuICAqIFdpemFyZHMgcHJvdmlkZSBhIHdheSB0byBnbyB0aHJvdWdoIGEgc2VxdWVuY2Ugb2Ygc3RlcHMgdGhhdCBmb3JtIGFuIGVuZCB0byBlbmQgd29ya2Zsb3cuLlxuICAqXG4gICogVXNhZ2U6IC4uL3dpemFyZC9fd2l6YXJkLmNsYXJpdHkuc2Nzc1xuICAqL1xuLml0ZW0ge1xuICBwYWRkaW5nOiAwO1xuICBjb2xvcjogI2ZmZjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ucGxheWVycyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAtMjRweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLm92ZXJsYXAtaW1nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA4MHB4O1xuICB0b3A6IDg3cHg7XG4gIHdpZHRoOiAxNjBweDtcbn1cblxuLmNhcmQtYmFja2dyb3VuZCB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTMzM2I7XG59XG5cbi5jYXJkLWhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICMzMjRmNjI7XG59XG5cbi5jYXJkIHtcbiAgcGFkZGluZzogMTJweDtcbn1cblxuLmNhcmQtaW1nIHtcbiAgcGFkZGluZzogMTJweDtcbn0iLCIvKiBNaW5pbWFsIGltcG9ydHMgdG8gZXhwb3NlIGNsYXJpdHkgdmFyaWFibGVzICovXHJcblxyXG5AaW1wb3J0IFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjbHIvdWkvc3JjL3V0aWxzL3RoZW1lLmRhcmsuY2xhcml0eVwiO1xyXG4vLyBAaW1wb3J0IFwiLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL0BjbHIvdWkvc3JjL2NvbG9yL3V0aWxzL2NvbG9ycy5jbGFyaXR5XCI7XHJcbi8vIEBpbXBvcnQgXCIuLi9ub2RlX21vZHVsZXMvQGNsci91aS9zcmMvY29sb3IvdmFyaWFibGVzLmNvbG9yXCI7XHJcbi8vIEBpbXBvcnQgXCIuLi9ub2RlX21vZHVsZXMvQGNsci91aS9zcmMvdXRpbHMvdmFyaWFibGVzLmdsb2JhbFwiO1xyXG4vLyBAaW1wb3J0IFwiLi4vbm9kZV9tb2R1bGVzL0BjbHIvdWkvc3JjL3R5cG9ncmFwaHkvdmFyaWFibGVzLnR5cG9ncmFwaHlcIjtcclxuLml0ZW0ge1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIC8vIHdpZHRoOiAxMDBweDtcclxuICAgIC8vIGhlaWdodDogMTAwcHg7XHJcbiAgICAvLyBiYWNrZ3JvdW5kLWNvbG9yOiBjcmltc29uO1xyXG4gICAgY29sb3I6ICNmZmY7XHJcbiAgICAvLyBmb250LXNpemU6IDUwcHg7XHJcbiAgICAvLyBsaW5lLWhlaWdodDogMzAwcHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi5wbGF5ZXJzIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIHRvcDogLTI0cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICB3aWR0aDogMTAwJTtcclxufVxyXG5cclxuLm92ZXJsYXAtaW1nIHtcclxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcclxuICAgIGxlZnQ6IDgwcHg7XHJcbiAgICB0b3A6IDg3cHg7XHJcbiAgICB3aWR0aDogMTYwcHg7XHJcbn1cclxuXHJcbi5jYXJkLWJhY2tncm91bmQge1xyXG4gICAgLy8gYmFja2dyb3VuZC1jb2xvcjogLS1jbHItY2FyZC1iZy1jb2xvcjtcclxuICAgIGJhY2tncm91bmQtY29sb3I6ICRjbHItY2FyZC1iZy1jb2xvcjtcclxuICAgIC8vIGJhY2tncm91bmQtY29sb3I6IHllbGxvdztcclxufVxyXG5cclxuLmNhcmQtaGVhZGVyIHtcclxuICAgIGJhY2tncm91bmQ6ICMzMjRmNjI7XHJcbn1cclxuXHJcbi5jYXJkIHtcclxuICAgIHBhZGRpbmc6IDEycHg7XHJcbn1cclxuXHJcbi5jYXJkLWltZyB7XHJcbiAgICBwYWRkaW5nOiAxMnB4O1xyXG59IiwiLy8gQ29weXJpZ2h0IChjKSAyMDE2LTIwMTkgVk13YXJlLCBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4vLyBUaGlzIHNvZnR3YXJlIGlzIHJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlLlxuLy8gVGhlIGZ1bGwgbGljZW5zZSBpbmZvcm1hdGlvbiBjYW4gYmUgZm91bmQgaW4gTElDRU5TRSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBwcm9qZWN0LlxuXG4vLyAtIEdsb2JhbFxuLy8gLSBBbGVydHNcbi8vIC0gQmFkZ2Vcbi8vIC0gQnV0dG9uXG4vLyAtIENhcmRcbi8vIC0gRGF0YWdyaWRcbi8vIC0gRHJvcGRvd25cbi8vIC0gRm9ybSwgSW5wdXQsIENoZWNrYm94LCBSYWRpbywgVG9nZ2xlXG4vLyAtIEhlYWRlclxuLy8gLSBMYWJlbFxuLy8gLSBMb2dpblxuLy8gLSBNb2RhbFxuLy8gLSBOYXZcbi8vIC0gVGFibGVcbi8vIC0gUHJvZ3Jlc3MgQmFyc1xuLy8gLSBTaWducG9zdFxuLy8gLSBTcGlubmVyXG4vLyAtIFN0YWNrIFZpZXdcbi8vIC0gVGFibGVcbi8vIC0gVGFic1xuLy8gLSBUb29sdGlwXG4vLyAtIFRyZWUgVmlld1xuLy8gLSBUeXBvZ3JhcGh5XG4vLyAtIFZlcnRpY2FsIE5hdlxuLy8gLSBXaXphcmRcblxuLyoqKioqKioqKlxuICogR2xvYmFsIHZhcmlhYmxlcyB3aWxsIGhhdmUgYW4gZWZmZWN0IG9uIG9yIGluIG11bHRpcGxlIENsYXJpdHkgY29tcG9uZW50cy5cbiAqIFdoZXJlIHBvc3NpYmxlLCB0aGVyZSBpcyBhIGxpc3QgZmlsZXMgYWZmZWN0ZWQgYnkgdGhlIHZhcmlhYmxlLlxuICovXG4kY2xyLXVzZS1jdXN0b20tcHJvcGVydGllczogZmFsc2U7XG5cbi8qKioqKioqKipcbiAqICRjbHItZ2xvYmFsLWFwcC1iYWNrZ3JvdW5kXG4gKiBDaGFuZ2UgdGhlIGJhY2tncm91bmQgZm9yIHRoZSBjbGFyaXR5IGFwcGxpY2F0aW9uLlxuICogVXNhZ2U6IGNsYXJpdHktcm9vdC9zcmMvY2xyLWFuZ3VsYXIvbGF5b3V0L21haW4tY29udGFpbmVyL19sYXlvdXQuY2xhcml0eS5zY3NzXG4gKiBBZmZlY3RzOlxuICogLSAkY2xyLWxvZ2luLWJhY2tncm91bmQtY29sb3JcbiAqIC0gJGNsci1zdGFjay12aWV3LWJnLWNvbG9yXG4gKiAtICRjbHItc3RhY2stdmlldy1zdGFjay1ibG9jay1sYWJlbC1hbmQtY29udGVudC1iZy1jb2xvclxuICovXG4kY2xyLWdsb2JhbC1hcHAtYmFja2dyb3VuZDogaHNsKDIwMSwgMzAlLCAxNSUpO1xuXG4vKioqKioqKioqXG4gICogJGNsci1nbG9iYWwtc2VsZWN0aW9uLWNvbG9yXG4gICogQ29tcG9uZW50cyB0aGF0IGhhdmUgYSBzZWxlY3RlZCAob3IgYWN0aXZlKSBzdGF0ZSB1c2UgdGhpcyB0byBjaGFuZ2UgdGhlIGJhY2tncm91bmQtY29sb3Igd2hlbiBhbiBpdGVtIG9yIGVsZW1lbnRcbiAgKiBpcyBpbiB0aGUgYWN0aXZlIHN0YXRlLlxuICAqIFVzYWdlczpcbiAgKiAtIF9sYXlvdXQuY2xhcml0eS5zY3NzXG4gICogLSBfZGF0YWdyaWQuY2xhcml0eS5zY3NzXG4gICogLSBfc2lkZW5hdi5jbGFyaXR5LnNjc3NcbiAgKlxuICAqIENvbXBvbmVudCdzIHdpdGggdmFyaWFibGVzIGFmZmVjdGVkIGluIHRoZSBkYXJrIHRoZW1lICh0aGlzIGZpbGUpXG4gICogLSBTdGFjayBWaWV3XG4gICogLSBUcmVlIFZpZXdcbiAgKiAtIERyb3Bkb3duXG4gICovXG4kY2xyLWdsb2JhbC1zZWxlY3Rpb24tY29sb3I6IGhzbCgyMDMsIDMyJSwgMjklKTtcblxuLyoqKioqKioqKlxuICAqICRjbHItZ2xvYmFsLWhvdmVyLWJnLWNvbG9yXG4gICogQ29tcG9uZW50cyBvciBlbGVtZW50cyB0aGF0IGNhbiBiZSBob3ZlcmVkIHdpbGwgaGF2ZSB0aGlzIGNvbG9yIGFwcGxpZWQgdG8gdGhlaXIgYmFja2dyb3VuZC1jb2xvci5cbiAgKiBDb21wb25lbnQncyB3aXRoIHZhcmlhYmxlcyBhZmZlY3RlZCBpbiB0aGUgZGFyayB0aGVtZSAodGhpcyBmaWxlKVxuICAqIC0gRHJvcGRvd25cbiAgKiAtIFRyZWUgVmlld1xuICAqL1xuJGNsci1nbG9iYWwtaG92ZXItYmctY29sb3I6IGhzbCgyMDEsIDMxJSwgMjMlKTtcblxuLyoqKioqKioqKlxuICAqIFRoZSBjbG9zZSBjbGFzcyBpcyBhIHV0aWxpdHkgY2xhc3MgdGhhdCBjYW4gYmUgYXBwbGllZCB0byBlbGVtZW50cyB3aXRoIGEgY2xyLWljb24gdGhhdHMgdXNlZCBmb3IgY2xvc2luZyBzb21ldGhpbmcuXG4gICogVGhlcmUgYXJlIHR3byB2YXJpYWJsZXMgdGhhdCBjb250cm9sIHRoZSBub3JtYWwgYW5kIGhvdmVyZWQgc3RhdGVzLlxuICAqIFVzYWdlczpcbiAgKiAtIF9jbG9zZS5jbGFyaXR5LnNjc3NcbiAgKlxuICAqIENvbXBvbmVudCdzIHdpdGggdmFyaWFibGVzIGFmZmVjdGVkIGluIHRoZSBkYXJrIHRoZW1lICh0aGlzIGZpbGUpXG4gICogLSA/P1xuICAqL1xuJGNsci1jbG9zZS1jb2xvci0tbm9ybWFsOiBoc2woMjAxLCAxNyUsIDgwJSk7XG4kY2xyLWNsb3NlLWNvbG9yLS1ub3JtYWwtb3BhY2l0eTogMTtcbiRjbHItY2xvc2UtY29sb3ItLWhvdmVyOiBoc2woMjAxLCAwJSwgMTAwJSk7XG4kY2xyLWNsb3NlLWNvbG9yLS1ob3Zlci1vcGFjaXR5OiAxO1xuLy8gRU5EIGNsb3NlXG5cbi8qKioqKioqKipcbiAgKiBOYW1lOiBQb3BvdmVyIGJveC1zaGFkb3ctY29sb3JcbiAgKiBVc2FnZXM6IC4vX2Ryb3Bkb3duLmNsYXJpdHkuc2Nzc1xuICAqIFVzYWdlczogLi9fZGF0ZXBpY2tlci5jbGFyaXR5LnNjc3NcbiAgKi9cbiRjbHItcG9wb3Zlci1ib3gtc2hhZG93LWNvbG9yOiBoc2xhKDAsIDAlLCAwJSwgMC41KTtcblxuLyoqKioqKioqKlxuICAqIE5hbWU6IExpbmsgKGFuZCBsaW5rIHN0YXRlIGNvbG9ycylcbiAgKiBEZXNjcmlwdGlvbiB0aGUgY29sb3IgZm9yIGxpbmtzIGFuZCB0aGUgYWN0aXZlLCBob3ZlcmVkIGFuZCB2aXNpdGVkIHN0YXRlXG4gICogVXNhZ2VzOiAuL19yZWJvb3QuY2xhcml0eS5zY3NzXG4gICovXG4kY2xyLWxpbmstYWN0aXZlLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7XG4kY2xyLWxpbmstY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTtcbiRjbHItbGluay1ob3Zlci1jb2xvcjogaHNsKDE5OCwgNjUlLCA1NyUpO1xuJGNsci1saW5rLXZpc2l0ZWQtY29sb3I6IGhzbCgyMjgsIDU1JSwgNzUlKTtcbi8vIEVORDogR2xvYmFsIENsYXJpdHkgVmFyaWFibGVzXG5cbi8qKioqKioqKioqXG4gICogQWxlcnRzXG4gICogQWxlcnRzIGFyZSBiYW5uZXJzIHRoYXQgY29tbXVuaWNhdGUgYSBtZXNzYWdlIHdpdGggYSBzZXZlcml0eSBhdHRhY2hlZCB0byBpdC4gVGhleSBncmFiIHRoZSB1c2Vy4oCZcyBhdHRlbnRpb24gdG9cbiAgKiBwcm92aWRlIGNyaXRpY2FsIGluZm9ybWF0aW9uIG5lZWRlZCBpbiBjb250ZXh0LiBUaGVzZSB2YXJpYWJsZXMgY29udHJvbCB0aGUgYmFja2dyb3VuZC1jb2xvciBhbmQgZm9udCBjb2xvciBmb3IgZWFjaFxuICAqIG9mIHRoZSBhbGVydCB0eXBlcy5cbiAgKlxuICAqIFRoZXJlIGFyZSBzZXZlbiB0eXBlcyBvZiBhbGVydCBhbmQgd2Ugc2V0IHRoZSBiYWNrZ3JvdW5kLWNvbG9yIGFuZCBmb250IGNvbG9yIGZvciBlYWNoIGhlcmUuXG4gICovXG5cbiRjbHItdGhlbWUtYWxlcnQtZm9udC1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpO1xuJGNsci10aGVtZS1hcHAtYWxlcnQtZm9udC1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG5cbi8vIEluZm8gdHlwZVxuJGNsci1hbGVydC1pbmZvLWJnLWNvbG9yOiBoc2woMTk4LCA3OSUsIDI4JSk7XG4kY2xyLWFsZXJ0LWluZm8tZm9udC1jb2xvcjogJGNsci10aGVtZS1hbGVydC1mb250LWNvbG9yO1xuJGNsci1hbGVydC1pbmZvLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4kY2xyLWFsZXJ0LWluZm8taWNvbi1jb2xvcjogJGNsci10aGVtZS1hbGVydC1mb250LWNvbG9yO1xuXG4vLyBTdWNjZXNzIHR5cGVcbiRjbHItYWxlcnQtc3VjY2Vzcy1iZy1jb2xvcjogaHNsKDEyMiwgNDUlLCAyMyUpO1xuJGNsci1hbGVydC1zdWNjZXNzLWZvbnQtY29sb3I6ICRjbHItdGhlbWUtYWxlcnQtZm9udC1jb2xvcjtcbiRjbHItYWxlcnQtc3VjY2Vzcy1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuJGNsci1hbGVydC1zdWNjZXNzLWljb24tY29sb3I6ICRjbHItdGhlbWUtYWxlcnQtZm9udC1jb2xvcjtcblxuLy8gRGFuZ2VyIHR5cGVcbiRjbHItYWxlcnQtZGFuZ2VyLWJnLWNvbG9yOiBoc2woMzU3LCA1MCUsIDM1JSk7XG4kY2xyLWFsZXJ0LWRhbmdlci1mb250LWNvbG9yOiAkY2xyLXRoZW1lLWFsZXJ0LWZvbnQtY29sb3I7XG4kY2xyLWFsZXJ0LWRhbmdlci1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuJGNsci1hbGVydC1kYW5nZXItaWNvbi1jb2xvcjogJGNsci10aGVtZS1hbGVydC1mb250LWNvbG9yO1xuXG4vLyBXYXJuaW5nIHR5cGVcbiRjbHItYWxlcnQtd2FybmluZy1iZy1jb2xvcjogaHNsKDQ3LCA4NyUsIDI3JSk7XG4kY2xyLWFsZXJ0LXdhcm5pbmctZm9udC1jb2xvcjogJGNsci10aGVtZS1hbGVydC1mb250LWNvbG9yO1xuJGNsci1hbGVydC13YXJuaW5nLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4kY2xyLWFsZXJ0LXdhcm5pbmctaWNvbi1jb2xvcjogJGNsci10aGVtZS1hbGVydC1mb250LWNvbG9yO1xuXG4vLyBBcHAgSW5mbyB0eXBlXG4kY2xyLWFwcC1hbGVydC1pbmZvLWJnLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7XG4kY2xyLWFwcC1hbGVydC1pbmZvLWZvbnQtY29sb3I6ICRjbHItdGhlbWUtYXBwLWFsZXJ0LWZvbnQtY29sb3I7XG4kY2xyLWFwcC1hbGVydC1pbmZvLWJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4kY2xyLWFwcC1hbGVydC1pbmZvLWljb24tY29sb3I6ICRjbHItdGhlbWUtYXBwLWFsZXJ0LWZvbnQtY29sb3I7XG5cbi8vIEFwcCB3YXJuaW5nIHR5cGVcbiRjbHItYXBwLWFsZXJ0LXdhcm5pbmctYmctY29sb3I6IGhzbCg0OSwgOTglLCA1MSUpO1xuJGNsci1hcHAtYWxlcnQtd2FybmluZy1pY29uLWNvbG9yOiAkY2xyLXRoZW1lLWFwcC1hbGVydC1mb250LWNvbG9yO1xuJGNsci1hcHAtYWxlcnQtd2FybmluZy1mb250LWNvbG9yOiAkY2xyLXRoZW1lLWFwcC1hbGVydC1mb250LWNvbG9yO1xuJGNsci1hcHAtYWxlcnQtd2FybmluZy1ib3JkZXItY29sb3I6IHRyYW5zcGFyZW50O1xuXG4vLyBBcHAgZGFuZ2VyIHR5cGVcbiRjbHItYXBwLWFsZXJ0LWRhbmdlci1iZy1jb2xvcjogaHNsKDMsIDkwJSwgNjIlKTtcbiRjbHItYXBwLWFsZXJ0LWRhbmdlci1pY29uLWNvbG9yOiAkY2xyLXRoZW1lLWFwcC1hbGVydC1mb250LWNvbG9yO1xuJGNsci1hcHAtYWxlcnQtZGFuZ2VyLWZvbnQtY29sb3I6ICRjbHItdGhlbWUtYXBwLWFsZXJ0LWZvbnQtY29sb3I7XG4kY2xyLWFwcC1hbGVydC1kYW5nZXItYm9yZGVyLWNvbG9yOiB0cmFuc3BhcmVudDtcblxuJGNsci1hbGVydC1hY3Rpb24tY29sb3I6IGhzbCgwLCAwJSwgMTAwJSk7IC8vIFVzZWQgZm9yIGRyb3Bkb3ducyBvbiB0aGUgcmlnaHQgc2lkZSBvZiBhbiBhbGVydFxuJGNsci1hbGVydC1hY3Rpb24tYWN0aXZlLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpOyAvLyBBbGVydCBkcm9wZG93bnMgd2hlbiB0aGV5IGFyZSBjbGlja2VkIG9uXG4kY2xyLWFwcC1hbGVydC1jbG9zZS1pY29uLWNvbG9yOiAkY2xyLWNsb3NlLWNvbG9yLS1ub3JtYWw7IC8vIENvbG9ycyBmb3IgdGhlICdYJyBjbG9zZSBidG4gaW4gZ2xvYmFsIGFsZXJ0c1xuXG4kY2xyLWFsZXJ0LWNsb3NlLWljb24tb3BhY2l0eTogMTtcbiRjbHItYWxlcnQtY2xvc2UtaWNvbi1ob3Zlci1vcGFjaXR5OiAxO1xuXG4vLyBDbG9zZSBpY29uIGNvbG9ycyBmb3IgQVBQLUxFVkVMIEFMRVJUU1xuJGNsci1hcHAtbGV2ZWwtYWxlcnQtY29sb3I6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1hcHAtYWxlcnQtY2xvc2UtaWNvbi1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG5cbi8qKioqKioqKioqXG4gICogRU5EOiBBbGVydHNcbiAgKi9cblxuLyoqKioqKioqKioqKioqKioqXG4gICogQmFkZ2VcbiAgKiBCYWRnZXMgcHJvdmlkZSBhIG1ldGhvZCB0byBoaWdobGlnaHQgYSBjb3VudCBvZiBhbiBlbGVtZW50IGVpdGhlciBuZXh0IHRvIGl0IG9yIGluc2lkZSB0aGUgZWxlbWVudCBpdHNlbGYuXG4gICogSGVyZSB5b3UgY2FuIHNldCB0aGUgYmFja2dyb3VuZC1jb2xvciBhbmQgZm9udCBjb2xvcihzKSBmb3IgdGhlIHZhcmlvdXMgYmFkZ2UgdHlwZXMuXG4gICogVGhlcmUgYXJlIGZpdmUgY29sb3Igb3B0aW9ucyBhbmQgZm91ciBzdGF0dXMgdHlwZXMgYSBDbGFyaXR5IGxhYmVsIG1heSBoYXZlLlxuICAqXG4gICovXG4kY2xyLWJhZGdlLWZvbnQtY29sb3ItbGlnaHQ6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1iYWRnZS1mb250LWNvbG9yLWRhcms6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1iYWRnZS1pbmZvLWJnLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7XG4kY2xyLWJhZGdlLWluZm8tY29sb3I6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1iYWRnZS1zdWNjZXNzLWJnLWNvbG9yOiBoc2woOTAsIDY3JSwgMzglKTtcbiRjbHItYmFkZ2Utc3VjY2Vzcy1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG4kY2xyLWJhZGdlLXdhcm5pbmctYmctY29sb3I6IGhzbCg0OSwgOTglLCA1MSUpO1xuJGNsci1iYWRnZS13YXJuaW5nLWNvbG9yOiBoc2woMCwgMCUsIDAlKTtcbiRjbHItYmFkZ2UtZGFuZ2VyLWJnLWNvbG9yOiBoc2woMywgOTAlLCA2MiUpO1xuJGNsci1iYWRnZS1kYW5nZXItY29sb3I6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1iYWRnZS1ncmF5LWJnLWNvbG9yOiBoc2woMjExLCAxMCUsIDQ3JSk7XG4kY2xyLWJhZGdlLXB1cnBsZS1iZy1jb2xvcjogaHNsKDI4MSwgNDQlLCA2MiUpO1xuJGNsci1iYWRnZS1ibHVlLWJnLWNvbG9yOiBoc2woMjAxLCAxMDAlLCAzNiUpO1xuJGNsci1iYWRnZS1vcmFuZ2UtYmctY29sb3I6IGhzbCgzMSwgMTAwJSwgNjAlKTtcbiRjbHItYmFkZ2UtbGlnaHQtYmx1ZS1iZy1jb2xvcjogaHNsKDE5NCwgNTclLCA3MSUpO1xuLy8gRU5EOiBCYWRnZVxuXG4vKioqKioqKioqKioqKioqKipcbiAgKiBCdXR0b25zXG4gICogQnV0dG9ucyBhbGxvdyBhbiBhcHBsaWNhdGlvbiB0byBjb21tdW5pY2F0ZSBhY3Rpb24gYW5kIGRpcmVjdCB1c2VyIGludGVudC5cbiAgKiBCdXR0b25zIGNhbiBiZTogc29saWQsIG91dGxpbmVkIG9yIGZsYXQuXG4gICogU29saWQgYW5kIG91dGxpbmUgaGF2ZSBmb3VyIHR5cGVzOiBwcmltYXJ5LCBzdWNjZXNzLCB3YXJuaW5nLCBkYW5nZXIuXG4gICogQnV0dG9ucyBjYW4gYmUgZGlzYWJsZWQuXG4gICpcbiAgKiBGb3IgZWFjaCBidXR0b24gdHlwZSwgdXNlIHRoZXNlIHZhcmlhYmxlcyB0byBjaGFuZ2UgdGhlIGZvbGxvd2luZyBidXR0b24gcHJvcGVydGllczpcbiAgKiAtIGJhY2tncm91bmQgY29sb3JcbiAgKiAtIGJvcmRlclxuICAqIC0gKGZvbnQpIGNvbG9yXG4gICogLSA6aG92ZXIgYmFja2dyb3VuZC1jb2xvclxuICAqIC0gOmhvdmVyIChmb250KSBjb2xvclxuICAqIC0gYm94LXNoYWRvdyBjb2xvclxuICAqXG4gICogIE5PVEU6IHRoZXNlIHZhcmlhYmxlcyBhbHNvIGFmZmVjdCBidXR0b24gZ3JvdXBzLlxuICAqXG4gICovXG5cbi8vIFVzZSB0aGVzZSB0byBjb250cm9sIHRoZSBkaXNhYmxlZCBhcHBlYXJhbmNlIGZvciBhbGwgYnV0dG9ucy5cbiRjbHItYnRuLWRpc2FibGVkLWZvbnQtY29sb3I6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1idG4tb3V0bGluZS1kaXNhYmxlZC1mb250LWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpO1xuJGNsci1idG4tZGlzYWJsZWQtYmctY29sb3I6IGhzbCgwLCAwJSwgMTAwJSk7XG4kY2xyLWJ0bi1kaXNhYmxlZC1ib3JkZXItY29sb3I6IGhzbCgwLCAwJSwgMTAwJSk7XG5cbi8vIERpc2FibGVkIGljb24gY29sb3JcbiRjbHItYnRuLWljb24tZGlzYWJsZWQtY29sb3I6ICRjbHItYnRuLW91dGxpbmUtZGlzYWJsZWQtZm9udC1jb2xvcjtcblxuLy8gRGVmYXVsdCBidXR0b25cbiRjbHItYnRuLWRlZmF1bHQtY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTsgLy8gYm9yZGVyLWNvbG9yLCBjb2xvciwgY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1kZWZhdWx0LWJnLWNvbG9yOiB0cmFuc3BhcmVudDsgLy8gYmFja2dyb3VuZC1jb2xvciwgZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1ob3Zlci1iZy1jb2xvcjogaHNsYSgwLCAwJSwgMTAwJSwgMC4xKTsgLy8gaG92ZXItYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1ob3Zlci1jb2xvcjogaHNsKDE5NCwgNzglLCA2MyUpOyAvLyBob3Zlci1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1ib3gtc2hhZG93LWNvbG9yOiBoc2woMCwgMCUsIDAlKTsgLy8gYWN0aXZlLWJveC1zaGFkb3ctY29sb3JcbiRjbHItYnRuLWRlZmF1bHQtY2hlY2tlZC1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTsgLy8gY2hlY2tlZC1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1jaGVja2VkLWJnLWNvbG9yOiAkY2xyLWJ0bi1kZWZhdWx0LWNvbG9yO1xuJGNsci1idG4tZGVmYXVsdC1kaXNhYmxlZC1jb2xvcjogJGNsci1idG4tb3V0bGluZS1kaXNhYmxlZC1mb250LWNvbG9yOyAvLyBkaXNhYmxlZC1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG5cbi8vIERlZmF1bHQgYnV0dG9uXG4kY2xyLWJ0bi1kZWZhdWx0LW91dGxpbmUtY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTsgLy8gYm9yZGVyLWNvbG9yLCBjb2xvciwgY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1kZWZhdWx0LW91dGxpbmUtYmctY29sb3I6IHRyYW5zcGFyZW50OyAvLyBiYWNrZ3JvdW5kLWNvbG9yLCBkaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1kZWZhdWx0LW91dGxpbmUtaG92ZXItYmctY29sb3I6IGhzbGEoMCwgMCUsIDEwMCUsIDAuMSk7IC8vIGhvdmVyLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLWRlZmF1bHQtb3V0bGluZS1ob3Zlci1jb2xvcjogaHNsKDE5NCwgNzglLCA2MyUpOyAvLyBob3Zlci1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1vdXRsaW5lLWJveC1zaGFkb3ctY29sb3I6IGhzbCgwLCAwJSwgMCUpOyAvLyBhY3RpdmUtYm94LXNoYWRvdy1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1vdXRsaW5lLWNoZWNrZWQtY29sb3I6IGhzbCgwLCAwJSwgMTAwJSk7IC8vIGNoZWNrZWQtY29sb3JcbiRjbHItYnRuLWRlZmF1bHQtb3V0bGluZS1jaGVja2VkLWJnLWNvbG9yOiAkY2xyLWJ0bi1kZWZhdWx0LW91dGxpbmUtY29sb3I7IC8vIGNoZWNrZWQtY29sb3JcbiRjbHItYnRuLWRlZmF1bHQtb3V0bGluZS1kaXNhYmxlZC1jb2xvcjogJGNsci1idG4tb3V0bGluZS1kaXNhYmxlZC1mb250LWNvbG9yOyAvLyBkaXNhYmxlZC1jb2xvclxuJGNsci1idG4tZGVmYXVsdC1vdXRsaW5lLWRpc2FibGVkLWJvcmRlci1jb2xvcjogJGNsci1idG4tZGlzYWJsZWQtYm9yZGVyLWNvbG9yOyAvLyBkaXNhYmxlZC1ib3JkZXItY29sb3JcbiRjbHItYnRuLWRlZmF1bHQtb3V0bGluZS1kaXNhYmxlZC1jaGVja2VkLWNvbG9yOiAkY2xyLWJ0bi1kaXNhYmxlZC1iZy1jb2xvcjtcblxuLy8gUHJpbWFyeSBidXR0b25cbiRjbHItYnRuLXByaW1hcnktY29sb3I6IGhzbCgwLCAwJSwgMCUpOyAvLyBjb2xvciwgY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1wcmltYXJ5LWJnLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7IC8vIGJhY2tncm91bmQtY29sb3IsIGRpc2FibGVkLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLXByaW1hcnktYm9yZGVyLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7IC8vIGJvcmRlci1jb2xvclxuJGNsci1idG4tcHJpbWFyeS1ob3Zlci1iZy1jb2xvcjogaHNsKDE5NCwgNzglLCA2MyUpOyAvLyBob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1wcmltYXJ5LWhvdmVyLWNvbG9yOiBoc2woMCwgMCUsIDAlKTsgLy8gaG92ZXItY29sb3JcbiRjbHItYnRuLXByaW1hcnktYm94LXNoYWRvdy1jb2xvcjogaHNsKDIwNSwgMTAwJSwgMzQlKTsgLy8gYWN0aXZlLWJveC1zaGFkb3ctY29sb3JcbiRjbHItYnRuLXByaW1hcnktY2hlY2tlZC1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTsgLy8gY2hlY2tlZC1jb2xvclxuJGNsci1idG4tcHJpbWFyeS1kaXNhYmxlZC1jb2xvcjogJGNsci1idG4tZGlzYWJsZWQtZm9udC1jb2xvcjsgLy8gZGlzYWJsZWQtY29sb3JcbiRjbHItYnRuLXByaW1hcnktZGlzYWJsZWQtYmctY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJnLWNvbG9yOyAvLyBkaXNhYmxlZC1iZy1jb2xvclxuJGNsci1idG4tcHJpbWFyeS1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG5cbi8vIFN1Y2Nlc3MgYnV0dG9uXG4kY2xyLWJ0bi1zdWNjZXNzLWNvbG9yOiBoc2woMCwgMCUsIDAlKTsgLy8gY29sb3IsIGNoZWNrZWQtY29sb3IsXG4kY2xyLWJ0bi1zdWNjZXNzLWJnLWNvbG9yOiBoc2woOTIsIDc5JSwgNDAlKTsgLy8gYmFja2dyb3VuZC1jb2xvciwgYm9yZGVyLWNvbG9yXG4kY2xyLWJ0bi1zdWNjZXNzLWhvdmVyLWJnLWNvbG9yOiBoc2woODMsIDc3JSwgNDQlKTsgLy8gaG92ZXItYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4tc3VjY2Vzcy1ob3Zlci1jb2xvcjogJGNsci1idG4tc3VjY2Vzcy1jb2xvcjsgLy8gaG92ZXItY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3MtYm94LXNoYWRvdy1jb2xvcjogaHNsKDk4LCAxMDAlLCAyMSUpOyAvLyBhY3RpdmUtYm94LXNoYWRvdy1jb2xvclxuJGNsci1idG4tc3VjY2Vzcy1jaGVja2VkLWJnLWNvbG9yOiAkY2xyLWJ0bi1zdWNjZXNzLWhvdmVyLWJnLWNvbG9yOyAvLyBjaGVja2VkLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3MtZGlzYWJsZWQtY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWZvbnQtY29sb3I7IC8vIGRpc2FibGVkLWNvbG9yXG4kY2xyLWJ0bi1zdWNjZXNzLWRpc2FibGVkLWJnLWNvbG9yOiAkY2xyLWJ0bi1kaXNhYmxlZC1iZy1jb2xvcjsgLy8gZGlzYWJsZWQtYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4tc3VjY2Vzcy1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG5cbi8vIFN1Y2Nlc3Mgb3V0bGluZSBidXR0b25cbiRjbHItYnRuLXN1Y2Nlc3Mtb3V0bGluZS1jb2xvcjogaHNsKDkyLCA3OSUsIDQwJSk7IC8vIGNvbG9yXG4kY2xyLWJ0bi1zdWNjZXNzLW91dGxpbmUtYm9yZGVyLWNvbG9yOiBoc2woOTIsIDc5JSwgNDAlKTsgLy8gYm9yZGVyLWNvbG9yLCBjaGVja2VkLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3Mtb3V0bGluZS1ob3Zlci1iZy1jb2xvcjogaHNsYSgwLCAwJSwgMTAwJSwgMC4xKTsgLy8gaG92ZXItYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4tc3VjY2Vzcy1vdXRsaW5lLWhvdmVyLWNvbG9yOiBoc2woODMsIDc3JSwgNDQlKTsgLy8gaG92ZXItY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3Mtb3V0bGluZS1ib3gtc2hhZG93LWNvbG9yOiBoc2woMCwgMCUsIDAlKTsgLy8gYWN0aXZlLWJveC1zaGFkb3ctY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3Mtb3V0bGluZS1jaGVja2VkLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpOyAvLyBjaGVja2VkLWNvbG9yXG4kY2xyLWJ0bi1zdWNjZXNzLW91dGxpbmUtZGlzYWJsZWQtY29sb3I6ICRjbHItYnRuLW91dGxpbmUtZGlzYWJsZWQtZm9udC1jb2xvcjsgLy8gZGlzYWJsZWQtY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3Mtb3V0bGluZS1kaXNhYmxlZC1iZy1jb2xvcjogdHJhbnNwYXJlbnQ7IC8vIGRpc2FibGVkLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLXN1Y2Nlc3Mtb3V0bGluZS1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG5cbi8vIERhbmdlciBidXR0b25cbiRjbHItYnRuLWRhbmdlci1jb2xvcjogaHNsKDAsIDAlLCAwJSk7IC8vIGNvbG9yLCBjaGVja2VkLWNvbG9yLFxuJGNsci1idG4tZGFuZ2VyLWJnLWNvbG9yOiBoc2woMywgOTAlLCA2MiUpOyAvLyBiYWNrZ3JvdW5kLWNvbG9yLCBib3JkZXItY29sb3JcbiRjbHItYnRuLWRhbmdlci1ob3Zlci1iZy1jb2xvcjogaHNsKDMsIDEwMCUsIDY5JSk7IC8vIGhvdmVyLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLWRhbmdlci1ob3Zlci1jb2xvcjogJGNsci1idG4tZGFuZ2VyLWNvbG9yOyAvLyBob3Zlci1jb2xvclxuJGNsci1idG4tZGFuZ2VyLWJveC1zaGFkb3ctY29sb3I6IGhzbCgxMCwgMTAwJSwgMzklKTsgLy8gYWN0aXZlLWJveC1zaGFkb3ctY29sb3JcbiRjbHItYnRuLWRhbmdlci1jaGVja2VkLWJnLWNvbG9yOiBoc2woMTAsIDEwMCUsIDM5JSk7IC8vIGNoZWNrZWQtYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4tZGFuZ2VyLWRpc2FibGVkLWNvbG9yOiAkY2xyLWJ0bi1kaXNhYmxlZC1mb250LWNvbG9yOyAvLyBkaXNhYmxlZC1jb2xvcixcbiRjbHItYnRuLWRhbmdlci1kaXNhYmxlZC1iZy1jb2xvcjogJGNsci1idG4tZGlzYWJsZWQtYmctY29sb3I7IC8vIGRpc2FibGVkLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLWRhbmdlci1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG5cbi8vIERhbmdlciBvdXRsaW5lIGJ1dHRvblxuJGNsci1idG4tZGFuZ2VyLW91dGxpbmUtYm9yZGVyLWNvbG9yOiBoc2woMywgOTAlLCA2MiUpOyAvLyBib3JkZXItY29sb3JcbiRjbHItYnRuLWRhbmdlci1vdXRsaW5lLWNvbG9yOiBoc2woMywgOTAlLCA2MiUpOyAvLyBjb2xvclxuJGNsci1idG4tZGFuZ2VyLW91dGxpbmUtaG92ZXItYmctY29sb3I6IGhzbGEoMCwgMCUsIDEwMCUsIDAuMSk7IC8vIGhvdmVyLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLWRhbmdlci1vdXRsaW5lLWhvdmVyLWNvbG9yOiBoc2woMywgMTAwJSwgNjklKTsgLy8gaG92ZXItY29sb3JcbiRjbHItYnRuLWRhbmdlci1vdXRsaW5lLWJveC1zaGFkb3ctY29sb3I6IGhzbCgwLCAwJSwgMCUpOyAvLyBhY3RpdmUtYm94LXNoYWRvdy1jb2xvclxuJGNsci1idG4tZGFuZ2VyLW91dGxpbmUtY2hlY2tlZC1iZy1jb2xvcjogaHNsKDMsIDkwJSwgNjIlKTsgLy8gY2hlY2tlZC1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1kYW5nZXItb3V0bGluZS1jaGVja2VkLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpOyAvLyBjaGVja2VkLWNvbG9yXG4kY2xyLWJ0bi1kYW5nZXItb3V0bGluZS1kaXNhYmxlZC1jb2xvcjogJGNsci1idG4tb3V0bGluZS1kaXNhYmxlZC1mb250LWNvbG9yOyAvLyBkaXNhYmxlZC1jb2xvclxuJGNsci1idG4tZGFuZ2VyLW91dGxpbmUtZGlzYWJsZWQtYmctY29sb3I6IHRyYW5zcGFyZW50OyAvLyBkaXNhYmxlZC1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1kYW5nZXItb3V0bGluZS1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG5cbi8vIExpbmsgYnV0dG9uXG4kY2xyLWJ0bi1saW5rLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7IC8vIGNvbG9yXG4kY2xyLWJ0bi1saW5rLWhvdmVyLWNvbG9yOiBoc2woMTk0LCA3OCUsIDYzJSk7IC8vIGhvdmVyLWNvbG9yXG4kY2xyLWJ0bi1saW5rLWNoZWNrZWQtY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTsgLy8gY2hlY2tlZC1jb2xvclxuJGNsci1idG4tbGluay1kaXNhYmxlZC1jb2xvcjogJGNsci1idG4tb3V0bGluZS1kaXNhYmxlZC1mb250LWNvbG9yOyAvLyBkaXNhYmxlZC1jb2xvclxuXG4vLyBJbnZlcnNlIGJ1dHRvblxuJGNsci1idG4taW52ZXJzZS1ib3JkZXItY29sb3I6IGhzbCgyMTAsIDE2JSwgOTMlKTsgLy8gYm9yZGVyLWNvbG9yXG4kY2xyLWJ0bi1pbnZlcnNlLWJnLWNvbG9yOiB0cmFuc3BhcmVudDsgLy8gYmFja2dyb3VuZC1jb2xvclxuJGNsci1idG4taW52ZXJzZS1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpOyAvLyBjb2xvclxuJGNsci1idG4taW52ZXJzZS1ob3Zlci1iZy1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpOyAvLyBob3Zlci1iYWNrZ3JvdW5kLWNvbG9yXG4kY2xyLWJ0bi1pbnZlcnNlLWhvdmVyLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpOyAvLyBob3Zlci1jb2xvclxuJGNsci1idG4taW52ZXJzZS1ib3gtc2hhZG93LWNvbG9yOiBoc2woMjAzLCAxNCUsIDcwJSk7IC8vIGFjdGl2ZS1ib3gtc2hhZG93LWNvbG9yXG4kY2xyLWJ0bi1pbnZlcnNlLWNoZWNrZWQtYmctY29sb3I6IGhzbGEoMCwgMCUsIDEwMCUsIDAuMTUpOyAvLyBjaGVja2VkLWJhY2tncm91bmQtY29sb3JcbiRjbHItYnRuLWludmVyc2UtY2hlY2tlZC1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTsgLy8gY2hlY2tlZC1jb2xvclxuJGNsci1idG4taW52ZXJzZS1kaXNhYmxlZC1jb2xvcjogJGNsci1idG4tb3V0bGluZS1kaXNhYmxlZC1mb250LWNvbG9yOyAvLyBkaXNhYmxlZC1jb2xvclxuJGNsci1idG4taW52ZXJzZS1kaXNhYmxlZC1ib3JkZXItY29sb3I6ICRjbHItYnRuLWRpc2FibGVkLWJvcmRlci1jb2xvcjsgLy8gZGlzYWJsZWQtYm9yZGVyLWNvbG9yXG4vLyBFTkQ6IEJ1dHRvbnNcblxuLyoqKioqKioqKipcbiAgKiBDYXJkXG4gICogQSBjYXJkIHByZXNlbnRzIGhpZ2gtbGV2ZWwgaW5mb3JtYXRpb24gYW5kIGNhbiBndWlkZSB0aGUgdXNlciB0b3dhcmQgcmVsYXRlZCBhY3Rpb25zIGFuZCBkZXRhaWxzLiBVc2UgdGhlc2UgdmFyaWFibGVzXG4gICogdG8gY2hhbmdlIHRoZSBsb29rIGFuZCBmZWVsIG9mIHlvdXIgY2FyZHMuXG4gICpcbiAgKiBVc2FnZTogLi4vbGF5b3V0L19jYXJkLmNsYXJpdHkuc2Nzc1xuICAqL1xuJGNsci1jYXJkLWJnLWNvbG9yOiBoc2woMTk4LCAyOCUsIDE4JSk7XG4kY2xyLWNhcmQtYm9yZGVyLWNvbG9yOiBoc2woMjAzLCAzMCUsIDglKTtcbiRjbHItY2FyZC10aXRsZS1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpO1xuJGNsci1jYXJkLWJveC1zaGFkb3c6IDAgMC4xNXJlbSAwIDAgJGNsci1jYXJkLWJvcmRlci1jb2xvcjtcbiRjbHItY2FyZC1kaXZpZGVyLWNvbG9yOiAkY2xyLWNhcmQtYm9yZGVyLWNvbG9yO1xuLy8gRU5EOiBDYXJkXG5cbi8qKioqKioqKioqXG4gICogRGF0YWdyaWRcbiAgKiBEYXRhZ3JpZHMgYXJlIGZvciBvcmdhbml6aW5nIGxhcmdlIHZvbHVtZXMgb2YgZGF0YSB0aGF0IHVzZXJzIGNhbiBzY2FuLCBjb21wYXJlLCBhbmQgcGVyZm9ybSBhY3Rpb25zIG9uLlxuICAqXG4gICogVXNhZ2U6IC4uL2RhdGEvZGF0YWdyaWQvX2RhdGFncmlkLmNsYXJpdHkuc2Nzc1xuICAqL1xuJGNsci1kYXRhZ3JpZC1pY29uLWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLWRhdGFncmlkLXJvdy1ob3ZlcjogaHNsKDIwMSwgMzElLCAyMyUpO1xuJGNsci1kYXRhZ3JpZC1yb3ctc2VsZWN0ZWQ6IGhzbCgwLCAwJSwgMTAwJSk7XG4kY2xyLWRhdGFncmlkLXBvcG92ZXItYmctY29sb3I6IGhzbCgxOTgsIDI4JSwgMTglKTtcbiRjbHItZGF0YWdyaWQtYWN0aW9uLXRvZ2dsZTogaHNsKDIwMywgMTYlLCA3MiUpO1xuJGNsci1kYXRhZ3JpZC1wYWdpbmF0aW9uLWJ0bi1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpO1xuJGNsci1kYXRhZ3JpZC1wYWdpbmF0aW9uLWJ0bi1kaXNhYmxlZC1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpO1xuJGNsci1kYXRhZ3JpZC1wYWdpbmF0aW9uLWJ0bi1kaXNhYmxlZC1vcGFjaXR5OiAwLjQ2O1xuJGNsci1kYXRhZ3JpZC1wYWdpbmF0aW9uLWlucHV0LWJvcmRlci1jb2xvcjogaHNsKDIwOCwgMTYlLCAzNCUpO1xuJGNsci1kYXRhZ3JpZC1wYWdpbmF0aW9uLWlucHV0LWJvcmRlci1mb2N1cy1jb2xvcjogaHNsKDE5OCwgNjUlLCA1NyUpO1xuJGNsci1kYXRhZ3JpZC1wb3BvdmVyLWJvcmRlci1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG4kY2xyLWRhdGFncmlkLWFjdGlvbi1wb3BvdmVyLWhvdmVyLWNvbG9yOiAkY2xyLWRhdGFncmlkLXJvdy1ob3ZlcjtcbiRjbHItZGF0YWdyaWQtbG9hZGluZy1iYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuNSk7XG4vLyBFTkQ6IERhdGFncmlkXG5cbi8qKioqKioqKipcbiAgKiBEcm9wZG93blxuICAqIEEgZHJvcGRvd24gbWVudSBhbGxvd3MgdGhlIHVzZXIgdG8gY2hvb3NlIGFuIG9wdGlvbiBvciBhY3Rpb24gZnJvbSBhIGNvbnRleHR1YWwgbGlzdC4gVXNlIHRoZXNlIHZhcmlhYmxlcyB0byBjaGFuZ2VcbiAgKiB0aGUgbG9vay1uLWZlZWwgb2YgeW91ciBkcm9wZG93bnMuXG4gICpcbiAgKiBVc2FnZTogLi4vcG9wb3Zlci9kcm9wZG93bi9fZHJvcGRvd24uY2xhcml0eS5zY3NzXG4gICovXG4kY2xyLWRyb3Bkb3duLWFjdGl2ZS10ZXh0LWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpO1xuJGNsci1kcm9wZG93bi1iZy1jb2xvcjogaHNsKDE5OCwgMjglLCAxOCUpO1xuJGNsci1kcm9wZG93bi10ZXh0LWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLWRyb3Bkb3duLWl0ZW0tY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItZHJvcGRvd24tYm9yZGVyLWNvbG9yOiBoc2woMCwgMCUsIDAlKTtcbiRjbHItZHJvcGRvd24tY2hpbGQtYm9yZGVyLWNvbG9yOiBoc2woMCwgMCUsIDAlKTtcbiRjbHItZHJvcGRvd24tYmctYWN0aXZlLWNvbG9yOiAkY2xyLWdsb2JhbC1zZWxlY3Rpb24tY29sb3I7XG4kY2xyLWRyb3Bkb3duLWJnLWhvdmVyLWNvbG9yOiAkY2xyLWdsb2JhbC1ob3Zlci1iZy1jb2xvcjtcbiRjbHItZHJvcGRvd24tc2VsZWN0aW9uLWNvbG9yOiBoc2woMjAzLCAzMiUsIDI5JSk7XG4kY2xyLWRyb3Bkb3duLWJveC1zaGFkb3c6ICRjbHItcG9wb3Zlci1ib3gtc2hhZG93LWNvbG9yO1xuJGNsci1kcm9wZG93bi1kaXZpZGVyLWNvbG9yOiAkY2xyLWRyb3Bkb3duLWJvcmRlci1jb2xvcjtcbiRjbHItZHJvcGRvd24taGVhZGVyLWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4vLyBFTkQ6IERyb3Bkb3duIG92ZXJyaWRlc1xuXG4vLyBEYXRlcGlja2VyXG4kY2xyLWNhbGVuZGFyLWJhY2tncm91bmQtY29sb3I6IGhzbCgxOTgsIDI4JSwgMTglKTtcbiRjbHItY2FsZW5kYXItYm9yZGVyLWNvbG9yOiBoc2woMCwgMCUsIDAlKTtcbiRjbHItZGF0ZXBpY2tlci10cmlnZ2VyLWNvbG9yOiBoc2woMTk4LCA2NSUsIDU3JSk7XG4kY2xyLWRhdGVwaWNrZXItdHJpZ2dlci1ob3Zlci1jb2xvcjogaHNsKDE5NCwgNzglLCA2MyUpO1xuJGNsci1jYWxlbmRhci1idG4tY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTtcbiRjbHItY2FsZW5kYXItYnRuLWhvdmVyLWZvY3VzLWNvbG9yOiBoc2woMjAxLCAzMSUsIDIzJSk7XG4kY2xyLWNhbGVuZGFyLWFjdGl2ZS1jZWxsLWJhY2tncm91bmQtY29sb3I6IGhzbCgyMDMsIDMyJSwgMjklKTtcbiRjbHItY2FsZW5kYXItYWN0aXZlLWZvY3VzLWNlbGwtYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMywgMzIlLCAyOSUpO1xuJGNsci1jYWxlbmRhci10b2RheS1kYXRlLWNlbGwtY29sb3I6IGhzbCgwLCAwJSwgMTAwJSk7XG4kY2xyLWNhbGVuZGFyLWFjdGl2ZS1jZWxsLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpO1xuXG4vKioqKioqXG4gICogRm9ybXM6IFRPRE86IHRyYWNrIGRvd24gY29tcG9uZW50IHVzYWdlcyBhbmQgbmFtZXNcbiAgKiBBIGZvcm0gaXMgYSBzdHJ1Y3R1cmVkIGxheW91dCBvZiByZWxhdGVkIGlucHV0IGNvbXBvbmVudHMuXG4gICogVGhlcmUgYXJlIGEgdmFyaWV0eSBvZiB2YXJpYWJsZXMgdXNlZCB0byBjaGFuZ2UgZm9ybSBlbGVtZW50cywgaW5jbHVkaW5nOlxuICAqXG4gICogVXNhZ2U6XG4gICogLi4vZm9ybXMvc3R5bGVzL19jaGVja2JveC5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX2NvbnRhaW5lcnMuY2xhcml0eS5zY3NzXG4gICogLi4vZm9ybXMvc3R5bGVzL19maWxlLmNsYXJpdHkuc2Nzc1xuICAqIC4uL2Zvcm1zL3N0eWxlcy9fZm9ybS5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX2lucHV0LmNsYXJpdHkuc2Nzc1xuICAqIC4uL2Zvcm1zL3N0eWxlcy9faW5wdXQtZ3JvdXAuY2xhcml0eS5zY3NzXG4gICogLi4vZm9ybXMvc3R5bGVzL19taXhpbmdzLmZvcm1zLnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvcmFkaW8uY2xhcml0eS5zY3NzXG4gICogLi4vZm9ybXMvc3R5bGVzL19zZWxlY3QuY2xhcml0eS5zY3NzXG4gICogLi4vZm9ybXMvc3R5bGVzL190ZXh0YXJlYS5jbGFyaXR5LnNjc3NcbiAgKiAuLi9mb3Jtcy9zdHlsZXMvX3ZhcmlhYmxlcy5jbGFyaXR5LnNjc3NcbiAgKlxuICAqL1xuXG4vL0dFTkVSSUNcbiRjbHItZm9ybXMtbGFiZWwtY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItZm9ybXMtdGV4dC1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpOyAvLyBObyBsYWJlbCwgbm8gd3JhcHBlclxuJGNsci1mb3Jtcy1pbnZhbGlkLWNvbG9yOiBoc2woMywgOTAlLCA2MiUpO1xuJGNsci1mb3Jtcy1zdWJ0ZXh0LWNvbG9yOiBoc2woMCwgMCUsIDQ1JSk7XG4kY2xyLWZvcm1zLXN1YnRleHQtY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItZm9ybXMtYm9yZGVyLWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLWZvcm1zLWZvY3VzZWQtY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTsgLy8gVmVydGljYWwgbm8gd3JhcHBlciwgbm8gbGFiZWxcblxuLy8gVGV4dGFyZWFcbiRjbHItZm9ybXMtdGV4dGFyZWEtYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMSwgMzAlLCAxMyUpO1xuJGNsci1mb3Jtcy1zZWxlY3QtbXVsdGlwbGUtYmFja2dyb3VuZC1jb2xvcjogaHNsKDE5OCwgMjglLCAxOCUpO1xuJGNsci1mb3Jtcy1zZWxlY3QtbXVsdGlwbGUtYm9yZGVyLWNvbG9yOiBoc2woMCwgMCUsIDAlKTtcblxuLy8gU2VsZWN0XG4vLyBUT0RPOiBQcm9wZXJseSBtYXAgdGhlc2UgdG8gdXBkYXRlZCBkYXJrIHRoZW1lIGRlc2lnblxuLy8gTk9URTogVGhlIG5ldyBmb3JtIHNlbGVjdHMgc2VlbWVkIHRvIGJlIHdvcmtpbmcgbGlrZSB0aGUgZGVwcmVjYXRlZCBmb3JtIHNlbGVjdHMgc28gSSdtIGxlYXZpbmdcbi8vICAgICAgIHRoZXNlIGNvbW1lbnRlZCBvdXQgZm9yIG5vdy5cbi8vJGNsci1mb3Jtcy1zZWxlY3QtaG92ZXItYmFja2dyb3VuZDogcmdiYSgyMjEsIDIyMSwgMjIxLCAwLjUpOyAvLyBDQU4gV0UgS0VZIFRISVMgRlJPTSBBIEtOT1dOIENPTE9SXG4vLyRjbHItZm9ybXMtc2VsZWN0LWNhcmV0LWhvdmVyLWNvbG9yOiAkY2xyLWNvbG9yLW5ldXRyYWwtNjAwO1xuLy8kY2xyLWZvcm1zLXNlbGVjdC1jYXJldC1jb2xvcjogaHNsKDAsIDAlLCA2MCUpO1xuJGNsci1mb3Jtcy1zZWxlY3Qtb3B0aW9uLWNvbG9yOiBoc2woMjAxLCAzMCUsIDEzJSk7IC8vIE9wdGlvbiBiZyBjb2xvciBvbiBjaHJvbWUvd2luZG93cyBpcyB3aGl0ZS5cbi8vJGNsci1mb3Jtcy1zZWxlY3QtbXVsdGlwbGUtYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTtcbi8vJGNsci1mb3Jtcy1zZWxlY3QtbXVsdGlwbGUtYm9yZGVyLWNvbG9yOiAkY2xyLWNvbG9yLW5ldXRyYWwtNDAwO1xuLy8kY2xyLWZvcm1zLXNlbGVjdC1tdWx0aXBsZS1vcHRpb24tY29sb3I6ICRjbHItZm9ybXMtdGV4dC1jb2xvcjtcblxuLy8gQ2hlY2tib3hcbiRjbHItZm9ybXMtY2hlY2tib3gtbGFiZWwtY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItZm9ybXMtY2hlY2tib3gtYmFja2dyb3VuZC1jb2xvcjogaHNsKDE5OCwgNjUlLCA1NyUpOyAvLyBVc2UgY29sb3IgaGVyZVxuJGNsci1mb3Jtcy1jaGVja2JveC1jaGVja2VkLXNoYWRvdzogaW5zZXQgMCAwIDAgMC4zcmVtICRjbHItZm9ybXMtY2hlY2tib3gtYmFja2dyb3VuZC1jb2xvcjtcbiRjbHItZm9ybXMtY2hlY2tib3gtaW5kZXRlcm1pbmF0ZS1ib3JkZXItY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItZm9ybXMtY2hlY2tib3gtbWFyay1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG4kY2xyLWZvcm1zLWNoZWNrYm94LWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6IGhzbCgyMDQsIDEwJSwgNjAlKTtcbiRjbHItZm9ybXMtY2hlY2tib3gtZGlzYWJsZWQtbWFyay1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG5cbi8vIFJhZGlvXG4kY2xyLWZvcm1zLXJhZGlvLWxhYmVsLWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLWZvcm1zLXJhZGlvLXNlbGVjdGVkLXNoYWRvdzogJGNsci1mb3Jtcy1jaGVja2JveC1jaGVja2VkLXNoYWRvdztcbiRjbHItZm9ybXMtcmFkaW8tZm9jdXNlZC1zaGFkb3c6IDAgMCAwLjFyZW0gMC4xcmVtICRjbHItbGluay1hY3RpdmUtY29sb3I7XG4kY2xyLWZvcm1zLXJhZGlvLWRpc2FibGVkLWJhY2tncm91bmQtY29sb3I6IGhzbCgwLCAwJSwgMCUpO1xuJGNsci1mb3Jtcy1yYWRpby1kaXNhYmxlZC1tYXJrLWNvbG9yOiAkY2xyLWZvcm1zLWNoZWNrYm94LWRpc2FibGVkLW1hcmstY29sb3I7XG4kY2xyLWZvcm1zLXJhZGlvLWRpc2FibGVkLXNoYWRvdzogJGNsci1mb3Jtcy1jaGVja2JveC1jaGVja2VkLXNoYWRvdztcblxuLy8gUmFuZ2VcbiRjbHItZm9ybXMtcmFuZ2UtcHJvZ3Jlc3MtZmlsbC1jb2xvcjogaHNsKDE5OCwgNjUlLCA1NyUpO1xuJGNsci1mb3Jtcy1yYW5nZS10cmFjay1jb2xvcjogaHNsKDIwMCwgMjMlLCAyNSUpO1xuXG4vKioqKioqKioqKlxuICAqIEhlYWRlclxuICAqIEhlYWRlcnMgcHJvdmlkZSBicmFuZGluZywgbmF2aWdhdGlvbiwgc2VhcmNoLCBhbmQgYWNjZXNzIHRvIGdsb2JhbCBhcHBsaWNhdGlvbiBhY3Rpb25zIHN1Y2ggYXMgc2V0dGluZ3MgYW5kXG4gICogbm90aWZpY2F0aW9ucy4gVGhlcmUgYXJlIGZpdmUgaGVhZGVyIGNvbG9ycyBpbiB0aGUgZGFyayB0aGVtZS5cbiAgKlxuICAqIFVzYWdlOiAuLi9sYXlvdXQvbmF2L19oZWFkZXIuY2xhcml0eS5zY3NzXG4gICogLVxuICAqL1xuJGNsci1oZWFkZXItYmdDb2xvcjogaHNsKDIxNCwgMjAlLCAzMSUpO1xuJGNsci1oZWFkZXItZGVmYXVsdC1iZy1jb2xvcjogJGNsci1oZWFkZXItYmdDb2xvcjtcbiRjbHItaGVhZGVyLTEtYmctY29sb3I6ICRjbHItaGVhZGVyLWJnQ29sb3I7XG4kY2xyLWhlYWRlci0yLWJnLWNvbG9yOiBoc2woMTk1LCA2NSUsIDI0JSk7XG4kY2xyLWhlYWRlci0zLWJnLWNvbG9yOiBoc2woMjA2LCA2MyUsIDI3JSk7XG4kY2xyLWhlYWRlci00LWJnLWNvbG9yOiBoc2woMzE1LCAyNyUsIDI4JSk7XG4kY2xyLWhlYWRlci01LWJnLWNvbG9yOiBoc2woMjMzLCAyNiUsIDMzJSk7XG4kY2xyLWhlYWRlci02LWJnLWNvbG9yOiBoc2woMjAzLCAzMCUsIDglKTtcbi8vIEVORCBIZWFkZXIgb3ZlcnJpZGVzXG5cbi8qKioqKioqKioqXG4gKiBJY29uc1xuICogSWNvbnMgYnkgZGVmYXVsdCBhcmUgcHJlc2VudGF0aW9uYWwgb25seSBtZWFuaW5nIHRoZXkgZG8gbm90IHByb3ZpZGUgYW55IGNvbnRleHQgdG8gc2NyZWVuIHJlYWRlcnNcbiAqXG4gKiBVc2FnZTogLi9faWNvbnMuY2xhcml0eS5zY3NzXG4gKi9cbiRjbHItaWNvbi1jb2xvci1zdWNjZXNzOiBoc2woOTIsIDc5JSwgNDAlKTtcbiRjbHItaWNvbi1jb2xvci1lcnJvcjogaHNsKDMsIDkwJSwgNjIlKTtcbiRjbHItaWNvbi1jb2xvci13YXJuaW5nOiBoc2woNDksIDk4JSwgNTElKTtcbiRjbHItaWNvbi1jb2xvci1pbmZvOiBoc2woMTk4LCA2NSUsIDU3JSk7XG4kY2xyLWljb24tY29sb3ItaW52ZXJzZTogaHNsKDAsIDAlLCAxMDAlKTtcbiRjbHItaWNvbi1jb2xvci1oaWdobGlnaHQ6IGhzbCgxOTgsIDY1JSwgNTclKTtcbi8vIEVORDogSWNvbnNcblxuLyoqKioqKioqKioqKioqKioqXG4gICogTGFiZWxcbiAgKiBMYWJlbHMgc2hvdyBjb25jaXNlIG1ldGFkYXRhIGluIGEgY29tcGFjdCBmb3JtYXQuIEhlcmUgeW91IGNhbiBzZXQgdGhlIGJhY2tncm91bmQtY29sb3IgYW5kIGZvbnQgY29sb3IocykgZm9yIHRoZVxuICAqIGRpZmZlcmVudCB0eXBlcyBvZiBsYWJlbHMuXG4gICpcbiAgKiBUaGVyZSBhcmUgZml2ZSBjb2xvciBvcHRpb25zIGFuZCBmb3VyIHN0YXR1cyB0eXBlcyBhIENsYXJpdHkgbGFiZWwgbWF5IGhhdmUuXG5cbiAgKi9cbiRjbHItbGFiZWwtZm9udC1jb2xvci1saWdodDogaHNsKDAsIDAlLCAxMDAlKTtcbiRjbHItbGFiZWwtZm9udC1jb2xvci1kYXJrOiBoc2woMCwgMCUsIDAlKTtcbiRjbHItbGFiZWwtYmctaG92ZXItY29sb3I6IGhzbCgwLCAwJSwgMzQlKTtcbiRjbHItbGFiZWwtZ3JheS1iZy1jb2xvcjogaHNsKDIxMSwgMTAlLCA0NyUpO1xuJGNsci1sYWJlbC1wdXJwbGUtYmctY29sb3I6IGhzbCgyODEsIDQ0JSwgNjIlKTtcbiRjbHItbGFiZWwtYmx1ZS1iZy1jb2xvcjogaHNsKDIwMSwgMTAwJSwgMzYlKTtcbiRjbHItbGFiZWwtb3JhbmdlLWJnLWNvbG9yOiBoc2woMzEsIDEwMCUsIDYwJSk7XG4kY2xyLWxhYmVsLWxpZ2h0LWJsdWUtYmctY29sb3I6IGhzbCgxOTQsIDU3JSwgNzElKTtcbiRjbHItbGFiZWwtaW5mby1iZy1jb2xvcjogaHNsKDE5OCwgNzklLCAyOCUpO1xuJGNsci1sYWJlbC1pbmZvLWZvbnQtY29sb3I6ICRjbHItbGFiZWwtZm9udC1jb2xvci1saWdodDtcbiRjbHItbGFiZWwtaW5mby1ib3JkZXItY29sb3I6ICRjbHItbGFiZWwtaW5mby1iZy1jb2xvcjtcbiRjbHItbGFiZWwtc3VjY2Vzcy1iZy1jb2xvcjogaHNsKDEyMiwgNDUlLCAyMyUpO1xuJGNsci1sYWJlbC1zdWNjZXNzLWZvbnQtY29sb3I6ICRjbHItbGFiZWwtZm9udC1jb2xvci1saWdodDtcbiRjbHItbGFiZWwtc3VjY2Vzcy1ib3JkZXItY29sb3I6ICRjbHItbGFiZWwtc3VjY2Vzcy1iZy1jb2xvcjtcbiRjbHItbGFiZWwtZGFuZ2VyLWJnLWNvbG9yOiBoc2woMzU3LCA1MCUsIDM1JSk7XG4kY2xyLWxhYmVsLWRhbmdlci1mb250LWNvbG9yOiAkY2xyLWxhYmVsLWZvbnQtY29sb3ItbGlnaHQ7XG4kY2xyLWxhYmVsLWRhbmdlci1ib3JkZXItY29sb3I6ICRjbHItbGFiZWwtZGFuZ2VyLWJnLWNvbG9yO1xuJGNsci1sYWJlbC13YXJuaW5nLWJnLWNvbG9yOiBoc2woNDcsIDg3JSwgMjclKTtcbiRjbHItbGFiZWwtd2FybmluZy1mb250LWNvbG9yOiAkY2xyLWxhYmVsLWZvbnQtY29sb3ItbGlnaHQ7XG4kY2xyLWxhYmVsLXdhcm5pbmctYm9yZGVyLWNvbG9yOiAkY2xyLWxhYmVsLXdhcm5pbmctYmctY29sb3I7XG4vLyBFTkQ6IExhYmVsc1xuXG4vKioqKioqKipcbiAgKiBMb2dpblxuICAqIFRoZSBsb2dpbiBwYWdlIGlzIGEgcHJlZGVmaW5lZCBmb3JtIGZvciBhcHBsaWNhdGlvbnMgdGhhdCByZXF1aXJlIGF1dGhlbnRpY2F0aW9uLlxuICAqIHVzZSB0aGVzZSB2YXJpYWJsZXMgdG8gc2V0IHRoZSBiYWNrZ3JvdW5kLWNvbG9yIGFuZCB0aGUgc3ZnIHVzZWQgZm9yIHRoZSBiYWNncm91bmQgaW1hZ2UuXG4gICpcbiAgKiBVc2FnZTpcbiAgKiAtIC4uL2xheW91dC9fbG9naW4uY2xhcml0eS5zY3NzXG4gICogLSAuLi9pbWFnZS9faWNvbnMuY2xhcml0eS5zY3NzIChsb2dpbiBiYWNrZ3JvdW5kIGltYWdlKVxuICAqL1xuJGNsci1sb2dpbi1iYWNrZ3JvdW5kLWNvbG9yOiAkY2xyLWdsb2JhbC1hcHAtYmFja2dyb3VuZDtcbiRjbHItbG9naW4tYmFja2dyb3VuZDogJyUzQyUzRnhtbCUyMHZlcnNpb24lM0QlMjIxLjAlMjIlMjBlbmNvZGluZyUzRCUyMlVURi04JTIyJTIwc3RhbmRhbG9uZSUzRCUyMm5vJTIyJTNGJTNFJTNDc3ZnJTIwd2lkdGglM0QlMjI3MzZweCUyMiUyMGhlaWdodCUzRCUyMjgzOHB4JTIyJTIwdmlld0JveCUzRCUyMjAlMjAwJTIwNzM2JTIwODM4JTIyJTIwdmVyc2lvbiUzRCUyMjEuMSUyMiUyMHhtbG5zJTNEJTIyaHR0cCUzQSUyRiUyRnd3dy53My5vcmclMkYyMDAwJTJGc3ZnJTIyJTIweG1sbnMlM0F4bGluayUzRCUyMmh0dHAlM0ElMkYlMkZ3d3cudzMub3JnJTJGMTk5OSUyRnhsaW5rJTIyJTNFJTNDdGl0bGUlM0V2ZWN0b3IlMjBhcnQlM0MlMkZ0aXRsZSUzRSUzQ2Rlc2MlM0VDcmVhdGVkJTIwd2l0aCUyMFNrZXRjaC4lM0MlMkZkZXNjJTNFJTNDZGVmcyUzRSUzQyUyRmRlZnMlM0UlM0NnJTIwaWQlM0QlMjJzeW1ib2xzJTIyJTIwc3Ryb2tlJTNEJTIybm9uZSUyMiUyMHN0cm9rZS13aWR0aCUzRCUyMjElMjIlMjBmaWxsJTNEJTIybm9uZSUyMiUyMGZpbGwtcnVsZSUzRCUyMmV2ZW5vZGQlMjIlM0UlM0NnJTIwaWQlM0QlMjJMb2dpbiUyMiUyMHRyYW5zZm9ybSUzRCUyMnRyYW5zbGF0ZSgtNTA0LjAwMDAwMCUyQyUyMDAuMDAwMDAwKSUyMiUzRSUzQ2clMjBpZCUzRCUyMnJlcGxhY2VhYmxlLWltYWdlJTIyJTIwdHJhbnNmb3JtJTNEJTIydHJhbnNsYXRlKDUwNC4wMDAwMDAlMkMlMjAwLjAwMDAwMCklMjIlM0UlM0NnJTIwaWQlM0QlMjJ2ZWN0b3ItYXJ0JTIyJTIwdHJhbnNmb3JtJTNEJTIydHJhbnNsYXRlKC03OC4wMDAwMDAlMkMlMjAtODIuMDAwMDAwKSUyMiUzRSUzQ3JlY3QlMjBpZCUzRCUyMlJlY3RhbmdsZS1wYXRoJTIyJTIwZmlsbCUzRCUyMiUyMzIyMzQzRSUyMiUyMHglM0QlMjIwJTIyJTIweSUzRCUyMjAuMzglMjIlMjB3aWR0aCUzRCUyMjExMjcuNTUlMjIlMjBoZWlnaHQlM0QlMjI5MjEuNjIlMjIlM0UlM0MlMkZyZWN0JTNFJTNDcG9seWdvbiUyMGlkJTNEJTIyU2hhcGUlMjIlMjBmaWxsJTNEJTIyJTIzMkY2NTdCJTIyJTIwcG9pbnRzJTNEJTIyMCUyMDMuMDYlMjAwJTIwNTk5LjI0JTIwMjk4LjE0JTIwMzAxLjQzJTIyJTNFJTNDJTJGcG9seWdvbiUzRSUzQ3BvbHlnb24lMjBpZCUzRCUyMlNoYXBlJTIyJTIwZmlsbCUzRCUyMiUyMzQzODU5NyUyMiUyMHBvaW50cyUzRCUyMjAlMjA0MDguNjUlMjAwJTIwNTk5LjI0JTIwOTUuMjklMjA1MDQuMDYlMjIlM0UlM0MlMkZwb2x5Z29uJTNFJTNDcG9seWdvbiUyMGlkJTNEJTIyU2hhcGUlMjIlMjBmaWxsJTNEJTIyJTIzMkY2NTdCJTIyJTIwcG9pbnRzJTNEJTIyOTE4LjIxJTIwOTIxLjk1JTIwODE4LjYzJTIwODIyLjMlMjA3MTguODklMjA5MjEuOTUlMjIlM0UlM0MlMkZwb2x5Z29uJTNFJTNDcG9seWdvbiUyMGlkJTNEJTIyU2hhcGUlMjIlMjBmaWxsJTNEJTIyJTIzM0I3NThFJTIyJTIwcG9pbnRzJTNEJTIyODE4LjYzJTIwODIyLjMlMjAyOTguMTQlMjAzMDEuNDMlMjAwJTIwNTk5LjI0JTIwMCUyMDY1NS4wMiUyMDI2Ni41MSUyMDkyMS45NSUyMDcxOC44OSUyMDkyMS45NSUyMiUzRSUzQyUyRnBvbHlnb24lM0UlM0Nwb2x5Z29uJTIwaWQlM0QlMjJTaGFwZSUyMiUyMGZpbGwlM0QlMjIlMjM1NzlFQjIlMjIlMjBwb2ludHMlM0QlMjI1MTIuNjclMjA5MjEuOTUlMjA5NS4yOSUyMDUwNC4wNiUyMDAlMjA1OTkuMjQlMjAwJTIwNjU0Ljk3JTIwMjY3LjA2JTIwOTIxLjk1JTIyJTNFJTNDJTJGcG9seWdvbiUzRSUzQ3BvbHlnb24lMjBpZCUzRCUyMlNoYXBlJTIyJTIwZmlsbCUzRCUyMiUyMzM0NEI1NyUyMiUyMHBvaW50cyUzRCUyMjI2Ni41MSUyMDkyMS45NSUyMDAlMjA2NTUuMDIlMjAwJTIwOTIxLjk1JTIyJTNFJTNDJTJGcG9seWdvbiUzRSUzQ3BvbHlnb24lMjBpZCUzRCUyMlNoYXBlJTIyJTIwZmlsbCUzRCUyMiUyM0E3QzlENSUyMiUyMHBvaW50cyUzRCUyMjExMjglMjAwJTIwNzk5LjU4JTIwMCUyMDExMjglMjAzMjkuODMlMjIlM0UlM0MlMkZwb2x5Z29uJTNFJTNDcG9seWdvbiUyMGlkJTNEJTIyU2hhcGUlMjIlMjBmaWxsJTNEJTIyJTIzMzQ0QjU3JTIyJTIwcG9pbnRzJTNEJTIyMTEyOCUyMDMyOS44MyUyMDc5OS41OCUyMDAlMjA1OTkuOSUyMDAlMjAyOTguMTQlMjAzMDEuNDMlMjA4MTguNjMlMjA4MjIuMyUyMDExMjglMjA1MTMuMTglMjIlM0UlM0MlMkZwb2x5Z29uJTNFJTNDJTJGZyUzRSUzQyUyRmclM0UlM0MlMkZnJTNFJTNDJTJGZyUzRSUzQyUyRnN2ZyUzRSc7XG4vLyBFTkQgTE9HSU5cblxuLyoqKioqKioqKipcbiAgKiBNb2RhbFxuICAqIE1vZGFscyBwcm92aWRlIGluZm9ybWF0aW9uIG9yIGhlbHAgYSB1c2VyIGNvbXBsZXRlIGEgdGFzay5cbiAgKlxuICAqIFVzYWdlOiAuLi9tb2RhbC9fbW9kYWwuY2xhcml0eS5zY3NzXG4gICovXG4kY2xyLW1vZGFsLWNsb3NlLWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLW1vZGFsLWJnLWNvbG9yOiBoc2woMTk4LCAyOCUsIDE4JSk7XG4kY2xyLW1vZGFsLWJhY2tkcm9wLWNvbG9yOiBoc2xhKDAsIDAsIDAsIDAuODUpO1xuLy8gRU5EIE1vZGFsXG5cbi8qKioqKioqKioqKioqKipcbiAgKiBOYXZcbiAgKiBBIHNvdW5kIG5hdmlnYXRpb24gbGF5b3V0IG9mZmVycyBhIGhpZ2ggZGVncmVlIG9mIGRpc2NvdmVyYWJpbGl0eSBhbmQgZmVlZGJhY2ssIGxldHRpbmcgdXNlcnMga25vdyB3aGVyZSB0aGV5IGFyZSBhdFxuICAqIGFsbCB0aW1lcyBhbmQgZW5zdXJpbmcgdGhleSBjYW4gZWFzaWx5IGdldCB0byB3aGVyZSB0aGV5IHdhbnQgdG8gZ28uXG4gICpcbiAgKiBUaGUgdmFyaWFibGVzIGluIHRoaXMgc2VjdGlvbiBjb250cm9sIHRoZSBmb2xsb3dpbmcgbmF2aWdhdGlvbiBjb21wb25lbnRzXG4gICogLSBSZXNwb25zaXZlIG5hdlxuICAqIC0gU2lkZSBuYXZcbiAgKiAtIFN1YiBuYXZcbiAgKlxuICAqIFVzYWdlOlxuICAqIC0gLi4vbGF5b3V0L25hdi9fcmVzcG9uc2l2ZS1uYXYuY2xhcml0eS5zY3NzXG4gICogLSAuLi9sYXlvdXQvbmF2L19zaWRlbmF2LW5hdi5jbGFyaXR5LnNjc3NcbiAgKiAtIC4uL2xheW91dC9uYXYvX3N1Ym5hdi5jbGFyaXR5LnNjc3NcbiAgKi9cbi8vICRjbHItc2xpZGluZy1wYW5lbC13aWR0aDogJGNscl9iYXNlbGluZVJlbV8xNTtcbi8vICRjbHItc2xpZGluZy1wYW5lbC13aWR0aC1zbTogJGNscl9iYXNlbGluZVJlbV8xMjtcbiRjbHItc2xpZGluZy1wYW5lbC10ZXh0LWNvbG9yOiBoc2woMCwgMCUsIDM0JSk7XG4vLyAkY2xyLXRyaWdnZXItcG9zaXRpb246ICRjbHItc2xpZGluZy1wYW5lbC13aWR0aCArICRjbHJfYmFzZWxpbmVSZW1fMF81O1xuLy8gJGNsci10cmlnZ2VyLXBvc2l0aW9uLXNtOiAkY2xyLXNsaWRpbmctcGFuZWwtd2lkdGgtc20gKyAkY2xyX2Jhc2VsaW5lUmVtXzBfNTtcbi8vICRjbHItc2xpZGluZy1wYW5lbC16LWluZGV4OiBtYXAtZ2V0KCRjbHItbGF5ZXJzLCBzaWRlcGFuZWwpO1xuLy8gJGNsci1zbGlkaW5nLXBhbmVsLWJhY2tkcm9wLXotaW5kZXg6IG1hcC1nZXQoJGNsci1sYXllcnMsIHNpZGVwYW5lbC1iZyk7XG4vLyAkY2xyLXNsaWRpbmctdHJhbnNpdGlvbi10aW1lOiAwLjNzO1xuJGNsci10cmFuc2l0aW9uLXN0eWxlOiBlYXNlO1xuJGNsci1uYXYtYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCA5MyUpO1xuJGNsci1uYXYtYmFja2dyb3VuZC1jb2xvcjogaHNsKDIwMSwgMzAlLCAxNSUpO1xuJGNsci1yZXNwb25zaXZlLW5hdi1ob3Zlci1iZzogJGNsci1nbG9iYWwtc2VsZWN0aW9uLWNvbG9yO1xuJGNsci1zbGlkaW5nLXBhbmVsLXRleHQtY29sb3I6IGhzbCgwLCAwJSwgMTAwJSk7XG5cbiRjbHItc2lkZW5hdi1ib3JkZXItY29sb3I6IGhzbCgyMDAsIDMwJSwgMTIlKTtcbiRjbHItc2lkZW5hdi1saW5rLWhvdmVyLWNvbG9yOiAkY2xyLWdsb2JhbC1zZWxlY3Rpb24tY29sb3I7XG5cbiRjbHItc3VibmF2LWJnQ29sb3I6IGhzbCgyMDEsIDMwJSwgMTMlKTtcbiRjbHItbmF2LXNoYWRvdzogMCAtMC4wNXJlbSAwIGhzbCgyMDgsIDE2JSwgMzQlKSBpbnNldDtcbi8vIEVORCBOYXZcblxuLyoqKioqKioqKioqKioqXG4gICogUHJvZ3Jlc3MgQmFyc1xuICAqIEEgcHJvZ3Jlc3MgYmFyIGlzIGEgbGluZWFyIGluZGljYXRvciBmb3IgcHJvdmlkaW5nIGZlZWRiYWNrIGFib3V0IGFuIG9uZ29pbmcsIHVzZXItaW5pdGlhdGVkIHByb2Nlc3MuXG4gICpcbiAgKiBVc2FnZTogLi4vcHJvZ3Jlc3MvcHJvZ3Jlc3MtYmFycy9fcHJvZ3Jlc3MtYmFycy4vY2xhcml0eS5zY3NzXG4gICovXG4kY2xyLXByb2dyZXNzLWRlZmF1bHRCYXJDb2xvcjogaHNsKDE5OCwgNjUlLCA1NyUpO1xuJGNsci1wcm9ncmVzcy1zdWNjZXNzLWNvbG9yOiBoc2woOTIsIDc5JSwgNDAlKTtcbiRjbHItcHJvZ3Jlc3MtZGFuZ2VyLWNvbG9yOiBoc2woMywgOTAlLCA2MiUpO1xuJGNsci1wcm9ncmVzcy13YXJuaW5nLWNvbG9yOiAkY2xyLXByb2dyZXNzLWRhbmdlci1jb2xvcjtcbiRjbHItcHJvZ3Jlc3MtYmdDb2xvcjogaHNsKDIwMCwgMjMlLCAyNSUpO1xuLy8gRU5EIFByb2dyZXNzIEJhcnNcblxuLyoqKioqKioqKlxuICAqIFNpZ25wb3N0XG4gICogVGhlIHNpZ25wb3N0IGlzIGEgY29udmVuaWVudCwgbGlnaHR3ZWlnaHQgd2F5IHRvIHNob3cgY29udGV4dHVhbCBoZWxwIG9mIGluZm9ybWF0aW9uIHdpdGhvdXQgdGFraW5nIHRoZSB1c2VyIG91dCBvZlxuICAqIHRoZSBjdXJyZW50IGNvbnRleHQuXG4gICpcbiAgKiBVc2FnZTogLi4vcG9wb3Zlci9zaWducG9zdC9zaWducG9zdHMuY2xhcml0eS5zY3NzXG4gICovXG4kY2xyLXNpZ25wb3N0LWFjdGlvbi1jb2xvcjogaHNsKDIxMCwgMTYlLCA5MyUpO1xuJGNsci1zaWducG9zdC1hY3Rpb24taG92ZXItY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTtcbiRjbHItc2lnbnBvc3QtY29udGVudC1iZy1jb2xvcjogaHNsKDE5OCwgMjglLCAxOCUpO1xuJGNsci1zaWducG9zdC1jb250ZW50LWJvcmRlci1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG4kY2xyLXNpZ25wb3N0LWJvcmRlci1zaXplOiAwLjVyZW07XG4kY2xyLXNpZ25wb3N0LXBvaW50ZXItYm9yZGVyOiAkY2xyLXNpZ25wb3N0LWJvcmRlci1zaXplIHNvbGlkICRjbHItc2lnbnBvc3QtY29udGVudC1ib3JkZXItY29sb3I7XG4kY2xyLXNpZ25wb3N0LXBvaW50ZXItaW52aXNpYmxlLWJvcmRlcjogJGNsci1zaWducG9zdC1ib3JkZXItc2l6ZSBzb2xpZCB0cmFuc3BhcmVudDtcbiRjbHItc2lnbnBvc3QtcG9pbnRlci1wc3VlZG8tYm9yZGVyOiAkY2xyLXNpZ25wb3N0LWJvcmRlci1zaXplIHNvbGlkICRjbHItc2lnbnBvc3QtY29udGVudC1iZy1jb2xvcjtcblxuLy8gRU5EIFNpZ25wb3N0IG92ZXJyaWRlc1xuXG4vKioqKioqKioqXG4gICogU3Bpbm5lclxuICAqIEEgc3Bpbm5lciBpcyB2aXN1YWwgaW5kaWNhdG9yIG9mIGFuIG9uZ29pbmcsIHVzZXItaW5pdGlhdGVkIHByb2Nlc3MuXG4gICpcbiAgKiBVc2FnZTogLi4vcHJvZ3Jlc3Mvc3Bpbm5lci9fc3Bpbm5lci5jbGFyaXR5LnNjc3NcbiAgKi9cbiRjbHItc3Bpbm5lci1jb2xvcjogaHNsKDE5OCwgNjUlLCA1NyUpO1xuJGNsci1zcGlubmVyLWJnLWNvbG9yOiBoc2woMjAwLCAyMyUsIDI1JSk7XG4kY2xyLXNwaW5uZXItb3BhY2l0eTogMTtcbi8vIEVORCBTcGlubmVyc1xuXG4vKioqKioqKioqXG4gICogU3RhY2sgVmlld1xuICAqIEEgc3RhY2sgdmlldyBkaXNwbGF5cyBrZXkvdmFsdWUgcGFpcnMsIHdoaWNoIHVzZXJzIGNhbiBleHBhbmQgdG8gc2hvdyBtb3JlIGRldGFpbC5cbiAgKlxuICAqIFVzYWdlOiAuLi9kYXRhL3N0YWNrLXZpZXcvX3N0YWNrLXZpZXcuY2xhcml0eS5zY3NzXG4gICovXG4kY2xyLXN0YWNrLXZpZXctYm9yZGVyLWNvbG9yOiBoc2woMjA4LCAxNCUsIDM5JSk7XG4kY2xyLXN0YWNrLXZpZXctYmctY29sb3I6ICRjbHItZ2xvYmFsLWFwcC1iYWNrZ3JvdW5kO1xuJGNsci1zdGFjay12aWV3LXN0YWNrLWJsb2NrLWJvcmRlci1ib3R0b206ICRjbHItc3RhY2stdmlldy1ib3JkZXItY29sb3I7IC8vYm9yZGVyLWJvdHRvbSBmb3Igc3RhY2stdmlldyByb3dzIChub3QgbGFzdClcbiRjbHItc3RhY2stdmlldy1ib3JkZXItYm94LWNvbG9yOiAkY2xyLXN0YWNrLXZpZXctYm9yZGVyLWNvbG9yO1xuJGNsci1zdGFjay1ibG9jay1jaGFuZ2VkLWJvcmRlci10b3AtY29sb3I6IGhzbCgyMDUsIDEwMCUsIDM0JSk7IC8vIFRPRE86IEZpZ3VyZSBvdXQgd2hlcmUgdGhpcyBzaG93cyBpbiB0aGUgVUkuXG4kY2xyLXN0YWNrLXZpZXctc3RhY2stYmxvY2stbGFiZWwtYW5kLWNvbnRlbnQtYmctY29sb3I6ICRjbHItZ2xvYmFsLWFwcC1iYWNrZ3JvdW5kOyAvLyBzdGt2dyByb3cgYmcgY29sb3Igd2hlbiBub3QgZXhwYW5kZWRcbiRjbHItc3RhY2stdmlldy1zdGFjay1jaGlsZHJlbi1zdGFjay1ibG9jay1ib3JkZXItYm90dG9tLWNvbG9yOiAkY2xyLXN0YWNrLXZpZXctYm9yZGVyLWNvbG9yOyAvLyBjaGlsZHJlbiBvZiBhbiBleHBhbmRlZCByb3dcbiRjbHItc3RhY2stdmlldy1zdGFjay1jaGlsZHJlbi1zdGFjay1ibG9jay1sYWJlbC1hbmQtY29udGVudC1iZy1jb2xvcjogaHNsKFxuICAxOTgsXG4gIDI4JSxcbiAgMTglXG4pOyAvLyBjaGlsZHJlbiBvZiBhbiBleHBhbmRlZCByb3dcbiRjbHItc3RhY2stdmlldy1zdGFjay1ibG9jay1sYWJlbC10ZXh0LWNvbG9yOiBoc2woMjEyLCAxMCUsIDYxJSk7XG4kY2xyLXN0YWNrLXZpZXctc3RhY2stYmxvY2stZXhwYW5kZWQtYmctY29sb3I6IGhzbCgyMDMsIDMyJSwgMjklKTtcbiRjbHItc3RhY2stdmlldy1zdGFjay1ibG9jay1leHBhbmRhYmxlLWhvdmVyOiBoc2woMjAzLCAzMiUsIDI5JSk7XG4kY2xyLXN0YWNrLXZpZXctc3RhY2stYmxvY2stY29udGVudC10ZXh0LWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLXN0YWNrLXZpZXctc3RhY2stYmxvY2stZXhwYW5kZWQtdGV4dC1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTtcbiRjbHItc3RhY2stdmlldy1zdGFjay1ibG9jay1jYXJldC1jb2xvcjogaHNsKDAsIDAlLCA2MCUpO1xuLy8gRU5EOiBTdGFjayBWaWV3IG92ZXJyaWRlc1xuXG4vKioqKioqKioqKlxuICAqIFRhYmxlXG4gICogVXNlIHRoZSB0YWJsZSBzdHlsZXMgd2hlcmV2ZXIgeW91IG5lZWQgdG8gcHJlc2VudCBzdGF0aWMgZGF0YSBpbiBhIHRhYnVsYXIgZm9ybWF0LlxuICAqXG4gICogVXNhZ2U6XG4gICogLSAuLi9kYXRhL190YWJsZXMuY2xhcml0eS5zY3NzXG4gICogLSAuLi9kYXRhL2RhdGFncmlkL19kYXRhZ3JpZC5jbGFyaXR5LnNjc3NcbiAgKi9cbiRjbHItdGhlYWQtYmdjb2xvcjogaHNsKDIwMSwgMzAlLCAxNSUpO1xuJGNsci10YWJsZS1iZ2NvbG9yOiBoc2woMTk4LCAyOCUsIDE4JSk7XG4kY2xyLXRhYmxlLWZvbnQtY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItZGF0YWdyaWQtZGVmYXVsdC1ib3JkZXItY29sb3I6IGhzbCgyMDgsIDE2JSwgMzQlKTtcbiRjbHItdGFibGUtaGVhZGVyLWJvcmRlci1ib3R0b20tY29sb3I6ICRjbHItZGF0YWdyaWQtZGVmYXVsdC1ib3JkZXItY29sb3I7XG4kY2xyLXRhYmxlLWZvb3Rlci1ib3JkZXItdG9wLWNvbG9yOiAkY2xyLWRhdGFncmlkLWRlZmF1bHQtYm9yZGVyLWNvbG9yO1xuJGNsci10YWJsZXJvdy1ib3JkZXJjb2xvcjogJGNsci1kYXRhZ3JpZC1kZWZhdWx0LWJvcmRlci1jb2xvcjtcbiRjbHItdGFibGUtYm9yZGVyLWNvbG9yOiAkY2xyLWRhdGFncmlkLWRlZmF1bHQtYm9yZGVyLWNvbG9yO1xuJGNsci10YWJsZS1ib3JkZXJjb2xvcjogJGNsci1kYXRhZ3JpZC1kZWZhdWx0LWJvcmRlci1jb2xvcjtcbiRjbHItdGFibGUtYm9yZGVyc3R5bGU6IDAuMDVyZW0gc29saWQgJGNsci1kYXRhZ3JpZC1kZWZhdWx0LWJvcmRlci1jb2xvcjtcbi8vIEVORDogVGFibGVcblxuLyoqKioqKioqKipcbiAgKiBUYWJzXG4gICogVGFicyBkaXZpZGUgY29udGVudCBpbnRvIHNlcGFyYXRlIHZpZXdzIHdoaWNoIHVzZXJzIG5hdmlnYXRlIGJldHdlZW4uXG4gICpcbiAgKiBVc2FnZTogLi4vbGF5b3V0L25hdi9fbmF2LmNsYXJpdHkuc2Nzc1xuICAqL1xuJGNsci1uYXYtYm94LXNoYWRvdy1jb2xvcjogaHNsKDIwOCwgMTYlLCAzNCUpO1xuJGNsci1uYXYtYWN0aXZlLWJveC1zaGFkb3ctY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTtcbiRjbHItbmF2LWxpbmstYWN0aXZlLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpO1xuJGNsci1uYXYtbGluay1jb2xvcjogaHNsKDIwMywgMTYlLCA3MiUpO1xuLy8gRU5EOiBUYWJzXG5cbi8qKlxuICAqIFRpbWVsaW5lXG4gICogVXNlIGEgdGltZWxpbmUgdG8gc2hvdyBwcm9ncmVzcyBvbiBjb25jcmV0ZSBzdGVwcyB3aXRoIGEgc3BlY2lmaWMgZW5kIGdvYWwuXG4gKi9cblxuLy8gY29sb3JzXG4kY2xyLXRpbWVsaW5lLWxpbmUtY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItdGltZWxpbmUtc3RlcC1oZWFkZXItY29sb3I6IGhzbCgyMTAsIDE3JSwgOTMlKTtcbiRjbHItdGltZWxpbmUtc3RlcC10aXRsZS1jb2xvcjogaHNsKDIwMywgMTYlLCA3MiUpOyAvLyAjNTY1NjU2XG4kY2xyLXRpbWVsaW5lLXN0ZXAtZGVzY3JpcHRpb24tY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTsgLy8gIzU2NTY1NlxuXG4kY2xyLXRpbWVsaW5lLWluY29tcGxldGUtc3RlcC1jb2xvcjogaHNsKDIxMCwgMTclLCA5MyUpO1xuJGNsci10aW1lbGluZS1jdXJyZW50LXN0ZXAtY29sb3I6IGhzbCgxOTgsIDY1JSwgNTclKTtcbiRjbHItdGltZWxpbmUtc3VjY2Vzcy1zdGVwLWNvbG9yOiBoc2woOTIsIDc5JSwgNDAlKTtcbiRjbHItdGltZWxpbmUtZXJyb3Itc3RlcC1jb2xvcjogaHNsKDMsIDkwJSwgNjIlKTtcbi8vIEVORCBUaW1lbGluZVxuXG4vKioqKioqKioqKlxuICAqIFRvb2x0aXBcbiAgKiBBIHRvb2x0aXAgcHJvdmlkZXMgYSBzaG9ydCBkZXNjcmlwdGlvbiBvZiBhIFVJIGVsZW1lbnQuXG4gICpcbiAgKiBVc2FnZTogLi4vcG9wb3Zlci90b29sdGlwL190b29sdGlwcy5jbGFyaXR5LnNjc3NcbiAgKi9cbiRjbHItdG9vbHRpcC1jb2xvcjogaHNsKDAsIDAlLCAwJSk7XG4kY2xyLXRvb2x0aXAtYmFja2dyb3VuZC1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTtcbi8vIEVORDogVG9vbHRpcFxuXG4vKioqKioqKioqKlxuICAqIFRyZWUgVmlld1xuICAqIEEgdHJlZSBpcyBhIGhpZXJhcmNoaWNhbCBjb21wb25lbnQgdGhhdCBzaG93cyB0aGUgdmlzdWFsIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwYXJlbnQtY2hpbGQgcmVsYXRpb25zaGlwIGJldHdlZW5cbiAgKiBub2Rlcy5cbiAgKlxuICAqIFVzYWdlOiAuLi9kYXRhL3RyZWUtdmlldy9fdHJlZS12aWV3LmNsYXJpdHkuc2Nzc1xuICAqL1xuJGNsci10cmVlLW5vZGUtY2FyZXQtbGluay1ob3Zlci1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTtcbiRjbHItdHJlZS1saW5rLWhvdmVyLWNvbG9yOiBoc2woMCwgMCUsIDkzJSk7XG4kY2xyLXRyZWUtbGluay1ob3Zlci1jb2xvcjogJGNsci1nbG9iYWwtaG92ZXItYmctY29sb3I7XG4kY2xyLXRyZWUtbGluay1zZWxlY3Rpb24tY29sb3I6ICRjbHItZ2xvYmFsLXNlbGVjdGlvbi1jb2xvcjtcbiRjbHItdHJlZS1saW5rLXRleHQtY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItdHJlZS1ub2RlLWNhcmV0LWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4vLyBFTkQgVHJlZSBWaWV3IHZhcmlhYmxlc1xuXG4vKioqKioqKioqKlxuICAqIFR5cG9ncmFwaHlcbiAgKiBDbGFyaXR5IHVzZXMgdGhlIGdlb21ldHJpYyBzYW5zLXNlcmlmIGZvbnQsIE1ldHJvcG9saXMuXG4gICpcbiAgKiBVc2FnZTpcbiAgKiAtIC4uL3R5cG9ncmFwaHkvX3R5cG9ncmFwaHkuY2xhcml0eS5zY3NzXG4gICogLSAuLi9kYXRhL2RhdGFncmlkL19kYXRhZ3JpZC5jbGFyaXR5LnNjc3NcbiAgKi9cbiRjbHItZ2xvYmFsLWZvbnQtY29sb3I6IGhzbCgyMTAsIDE2JSwgOTMlKTtcbiRjbHItZ2xvYmFsLWZvbnQtY29sb3Itc2Vjb25kYXJ5OiBoc2woMjAzLCAxNiUsIDcyJSk7XG5cbiRjbHItaDEtY29sb3I6ICRjbHItZ2xvYmFsLWZvbnQtY29sb3I7XG4kY2xyLWgyLWNvbG9yOiAkY2xyLWdsb2JhbC1mb250LWNvbG9yO1xuJGNsci1oMy1jb2xvcjogJGNsci1nbG9iYWwtZm9udC1jb2xvcjtcbiRjbHItaDQtY29sb3I6ICRjbHItZ2xvYmFsLWZvbnQtY29sb3I7XG4kY2xyLWg1LWNvbG9yOiAkY2xyLWdsb2JhbC1mb250LWNvbG9yO1xuJGNsci1oNi1jb2xvcjogJGNsci1nbG9iYWwtZm9udC1jb2xvci1zZWNvbmRhcnk7XG5cbiRjbHItcDEtY29sb3I6ICRjbHItZ2xvYmFsLWZvbnQtY29sb3Itc2Vjb25kYXJ5O1xuJGNsci1wMi1jb2xvcjogJGNsci1nbG9iYWwtZm9udC1jb2xvci1zZWNvbmRhcnk7XG4kY2xyLXAzLWNvbG9yOiAkY2xyLWdsb2JhbC1mb250LWNvbG9yLXNlY29uZGFyeTtcbiRjbHItcDQtY29sb3I6ICRjbHItZ2xvYmFsLWZvbnQtY29sb3I7XG4kY2xyLXA1LWNvbG9yOiAkY2xyLWdsb2JhbC1mb250LWNvbG9yO1xuJGNsci1wNi1jb2xvcjogJGNsci1nbG9iYWwtZm9udC1jb2xvcjtcbiRjbHItcDctY29sb3I6ICRjbHItZ2xvYmFsLWZvbnQtY29sb3I7XG4kY2xyLXA4LWNvbG9yOiAkY2xyLWdsb2JhbC1mb250LWNvbG9yO1xuXG4vKioqKioqKioqKlxuICAqIFZlcnRpY2FsIE5hdlxuICAqIFRoaXMgaXMgYSB2ZXJ0aWNhbGx5LWFsaWduZWQgbmF2aWdhdGlvbmFsIGNvbXBvbmVudC5cbiAgKlxuICAqIFVzYWdlOiAuLi9sYXlvdXQvdmVydGljYWwtbmF2L192ZXJ0aWNhbC1uYXYuY2xhcml0eS5zY3NzXG4gICovXG4vLyAkY2xyLXZlcnRpY2FsLW5hdi1pdGVtLWhlaWdodDogJGNscl9iYXNlbGluZVJlbV8xXzU7XG4kY2xyLXZlcnRpY2FsLW5hdi1pdGVtLWNvbG9yOiBoc2woMjAzLCAxNiUsIDcyJSk7XG4kY2xyLXZlcnRpY2FsLW5hdi1pdGVtLWFjdGl2ZS1jb2xvcjogaHNsKDAsIDAlLCAxMDAlKTtcbiRjbHItdmVydGljYWwtbmF2LWJnLWNvbG9yOiBoc2woMjAxLCAzMCUsIDEzJSk7XG4kY2xyLXZlcnRpY2FsLW5hdi1hY3RpdmUtYmctY29sb3I6ICRjbHItZ2xvYmFsLXNlbGVjdGlvbi1jb2xvcjtcbiRjbHItdmVydGljYWwtbmF2LWhvdmVyLWJnLWNvbG9yOiAkY2xyLWdsb2JhbC1ob3Zlci1iZy1jb2xvcjtcbiRjbHItdmVydGljYWwtbmF2LWljb24tYWN0aXZlLWNvbG9yOiBoc2woMCwgMCUsIDEwMCUpO1xuJGNsci12ZXJ0aWNhbC1uYXYtdG9nZ2xlLWljb24tY29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItdmVydGljYWwtbmF2LXRyaWdnZXItZGl2aWRlci1ib3JkZXItY29sb3I6IGhzbCgxOTksIDE5JSwgMTclKTtcbi8vIEVORCBWZXJ0aWNhbCBOYXZcblxuLyoqKioqKioqKipcbiAgKiBXaXphcmRcbiAgKiBXaXphcmRzIHByb3ZpZGUgYSB3YXkgdG8gZ28gdGhyb3VnaCBhIHNlcXVlbmNlIG9mIHN0ZXBzIHRoYXQgZm9ybSBhbiBlbmQgdG8gZW5kIHdvcmtmbG93Li5cbiAgKlxuICAqIFVzYWdlOiAuLi93aXphcmQvX3dpemFyZC5jbGFyaXR5LnNjc3NcbiAgKi9cbiRjbHItd2l6YXJkLXNpZGVuYXYtYmdjb2xvcjogaHNsKDIwMSwgMzAlLCAxNSUpO1xuJGNsci13aXphcmQtc2lkZW5hdi10ZXh0LS1hY3RpdmU6IGhzbCgwLCAwJSwgMTAwJSk7XG4kY2xyLXdpemFyZC1zdGVwbmF2LWFjdGl2ZS1iZ2NvbG9yOiBoc2woMjAzLCAzMiUsIDI5JSk7XG4kY2xyLXdpemFyZC1zdGVwbmF2LWJvcmRlci1jb2xvcjogaHNsKDIwMSwgMTQlLCAyNyUpO1xuJGNsci13aXphcmQtc3RlcG5hdi1ib3JkZXItY29sb3ItLWFjdGl2ZTogaHNsKDkyLCA3OSUsIDQwJSk7XG4kY2xyLXdpemFyZC1zdGVwLW5hdi1ib3JkZXItY29sb3I6IGhzbCgyMDAsIDMwJSwgMTIlKTtcbiRjbHItd2l6YXJkLXNpZGVuYXYtdGV4dDogaHNsKDIwMywgMTYlLCA3MiUpO1xuJGNsci13aXphcmQtdGl0bGUtdGV4dDogaHNsKDIxMCwgMTYlLCA5MyUpO1xuJGNsci13aXphcmQtbWFpbi10ZXh0Q29sb3I6IGhzbCgyMDMsIDE2JSwgNzIlKTtcbiRjbHItd2l6YXJkLXN0ZXBuYXYtZXJyb3ItY29sb3I6IGhzbCgzLCA5MCUsIDYyJSk7XG4vLyBFTkQ6IFdpemFyZFxuXG5AaW1wb3J0ICcuLi9hY2NvcmRpb24vX3ZhcmlhYmxlcy5hY2NvcmRpb24uZGFyayc7XG4iXX0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpaceCardComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-space-card',
                templateUrl: './space-card.component.html',
                styleUrls: ['./space-card.component.scss']
            }]
    }], function () { return []; }, { width: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }], space: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/space-details-modal/space-details-modal.component.ts":
/*!**********************************************************************************!*\
  !*** ./src/app/_components/space-details-modal/space-details-modal.component.ts ***!
  \**********************************************************************************/
/*! exports provided: SpaceDetailsModalComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceDetailsModalComponent", function() { return SpaceDetailsModalComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _space_details_space_details_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../space-details/space-details.component */ "./src/app/_components/space-details/space-details.component.ts");





class SpaceDetailsModalComponent {
    constructor(modalService) {
        this.modalService = modalService;
    }
    ngOnInit() {
    }
}
SpaceDetailsModalComponent.ɵfac = function SpaceDetailsModalComponent_Factory(t) { return new (t || SpaceDetailsModalComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"])); };
SpaceDetailsModalComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpaceDetailsModalComponent, selectors: [["app-space-details-modal"]], decls: 9, vars: 3, consts: [[3, "clrModalOpen", "clrModalClosable", "clrModalOpenChange"], [1, "modal-title"], [1, "modal-body"], [3, "space"], [1, "modal-footer"], [1, "btn-group", "btn-primary"], ["type", "button", 1, "btn", "btn-primary", 3, "click"]], template: function SpaceDetailsModalComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-modal", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("clrModalOpenChange", function SpaceDetailsModalComponent_Template_clr_modal_clrModalOpenChange_0_listener($event) { return ctx.modalService.opened = $event; });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "h3", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Space Details");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "app-space-details", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SpaceDetailsModalComponent_Template_button_click_7_listener() { return ctx.modalService.hideModal(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " Close ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrModalOpen", ctx.modalService.opened)("clrModalClosable", false);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("space", ctx.space);
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrModal"], _clr_angular__WEBPACK_IMPORTED_MODULE_2__["ClrModalBody"], _space_details_space_details_component__WEBPACK_IMPORTED_MODULE_3__["SpaceDetailsComponent"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3NwYWNlLWRldGFpbHMtbW9kYWwvc3BhY2UtZGV0YWlscy1tb2RhbC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpaceDetailsModalComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-space-details-modal',
                templateUrl: './space-details-modal.component.html',
                styleUrls: ['./space-details-modal.component.scss']
            }]
    }], function () { return [{ type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_1__["ModalService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/space-details/space-details.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_components/space-details/space-details.component.ts ***!
  \**********************************************************************/
/*! exports provided: SpaceDetailsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpaceDetailsComponent", function() { return SpaceDetailsComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");




function SpaceDetailsComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r531 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("src", "./assets/spaces/", ctx_r531.space.image, "", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeUrl"]);
} }
function SpaceDetailsComponent_h4_11_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "h4");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r532 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Business Domain: ", ctx_r532.space.subtype, "");
} }
class SpaceDetailsComponent {
    constructor() {
    }
    set space(value) {
        this._space = value;
    }
    get space() {
        return this._space;
    }
    ngOnInit() {
    }
}
SpaceDetailsComponent.ɵfac = function SpaceDetailsComponent_Factory(t) { return new (t || SpaceDetailsComponent)(); };
SpaceDetailsComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpaceDetailsComponent, selectors: [["app-space-details"]], inputs: { space: "space" }, decls: 13, vars: 5, consts: [[1, "card"], [1, "card-header"], [1, "card-img"], ["style", "max-width: 100%; height: 100%;", "fxLayout", "column", "fxLayoutAlign", "center center", 4, "ngIf"], [1, "card-block"], [1, "card-title"], [1, "card-text"], [3, "innerHTML"], [4, "ngIf"], [1, "card-footer"], ["fxLayout", "column", "fxLayoutAlign", "center center", 2, "max-width", "100%", "height", "100%"], [3, "src"]], template: function SpaceDetailsComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, SpaceDetailsComponent_div_4_Template, 2, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "h3");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](10, "span", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, SpaceDetailsComponent_h4_11_Template, 2, 1, "h4", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", ctx.space == null ? null : ctx.space.type, " ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.space !== undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx.space == null ? null : ctx.space.title);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("innerHTML", ctx.space == null ? null : ctx.space.detail, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsanitizeHtml"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", (ctx.space == null ? null : ctx.space.type) === "STARTUP");
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgIf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_2__["DefaultLayoutAlignDirective"]], styles: [".card-img[_ngcontent-%COMP%] {\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: auto;\n  margin-bottom: auto;\n  background-color: white;\n  vertical-align: middle;\n  text-align: center;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 180px;\n}\n\nimg[_ngcontent-%COMP%] {\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  max-width: 100%;\n  max-height: 100%;\n}\n\n.card-block[_ngcontent-%COMP%] {\n  height: 200px;\n}\n\n.card-title[_ngcontent-%COMP%]    > h3[_ngcontent-%COMP%] {\n  margin-top: 0 !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2UtZGV0YWlscy9FOlxcTHVkb1xcRG9jdW1lbnRzXFxEZXZlbG9wcGVtZW50XFxDcnlwdG9GYW50YXNpYVxcd3d3L3NyY1xcYXBwXFxfY29tcG9uZW50c1xcc3BhY2UtZGV0YWlsc1xcc3BhY2UtZGV0YWlscy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2UtZGV0YWlscy9zcGFjZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSx1QkFBQTtFQUNBLGFBQUE7QUNDSjs7QURFQTtFQUNJLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDQ0o7O0FERUE7RUFDSSxhQUFBO0FDQ0o7O0FERUE7RUFDSSx3QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2UtZGV0YWlscy9zcGFjZS1kZXRhaWxzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNhcmQtaW1nIHtcclxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xyXG4gICAgbWFyZ2luLXRvcDogYXV0bztcclxuICAgIG1hcmdpbi1ib3R0b206IGF1dG87XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xyXG4gICAgaGVpZ2h0OiAxODBweDtcclxufVxyXG5cclxuaW1nIHtcclxuICAgIGRpc3BsYXk6IGJsb2NrO1xyXG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XHJcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XHJcbiAgICBtYXgtd2lkdGg6IDEwMCU7XHJcbiAgICBtYXgtaGVpZ2h0OiAxMDAlO1xyXG59XHJcblxyXG4uY2FyZC1ibG9jayB7XHJcbiAgICBoZWlnaHQ6IDIwMHB4O1xyXG59XHJcblxyXG4uY2FyZC10aXRsZT5oMyB7XHJcbiAgICBtYXJnaW4tdG9wOiAwICFpbXBvcnRhbnQ7XHJcbn0iLCIuY2FyZC1pbWcge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xuICBtYXJnaW4tdG9wOiBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiBhdXRvO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxODBweDtcbn1cblxuaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbi1sZWZ0OiBhdXRvO1xuICBtYXJnaW4tcmlnaHQ6IGF1dG87XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMTAwJTtcbn1cblxuLmNhcmQtYmxvY2sge1xuICBoZWlnaHQ6IDIwMHB4O1xufVxuXG4uY2FyZC10aXRsZSA+IGgzIHtcbiAgbWFyZ2luLXRvcDogMCAhaW1wb3J0YW50O1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpaceDetailsComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-space-details',
                templateUrl: './space-details.component.html',
                styleUrls: ['./space-details.component.scss']
            }]
    }], function () { return []; }, { space: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/spaces/spaces.component.ts":
/*!********************************************************!*\
  !*** ./src/app/_components/spaces/spaces.component.ts ***!
  \********************************************************/
/*! exports provided: SpacesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpacesComponent", function() { return SpacesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _space_details_modal_space_details_modal_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../space-details-modal/space-details-modal.component */ "./src/app/_components/space-details-modal/space-details-modal.component.ts");
/* harmony import */ var src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/spaces.service */ "./src/app/_services/spaces.service.ts");
/* harmony import */ var src_app_services_game_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/app/_services/modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/flex-layout/extended */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/extended.js");








const _c0 = function (a0) { return { "row-selected": a0 }; };
function SpacesComponent_tr_14_Template(rf, ctx) { if (rf & 1) {
    const _r126 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function SpacesComponent_tr_14_Template_tr_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r126); const space_r124 = ctx.$implicit; const ctx_r125 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r125.getDetails(space_r124); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "td");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "??");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const space_r124 = ctx.$implicit;
    const ctx_r123 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](5, _c0, ctx_r123.selectedSpace === space_r124));
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](space_r124.spaceId);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](space_r124.title);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](space_r124.type);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](ctx_r123.getPlayersOnSpace(space_r124.spaceId));
} }
class SpacesComponent {
    constructor(spacesService, gameService, modalService) {
        this.spacesService = spacesService;
        this.gameService = gameService;
        this.modalService = modalService;
        this.spaces = [];
        this.selectedSpace = undefined;
    }
    ngOnInit() {
        this.spacesService.getSpaces().then((spaces) => {
            this.spaces = spaces;
        });
    }
    getPlayersOnSpace(spaceId) {
        return this.gameService.players.filter(player => (this.gameService.getPlayerPosition(player) === spaceId));
    }
    getDetails(space) {
        console.log(`click on row -> show details for space ${space.spaceId}`);
        if (this.selectedSpace === space) {
            this.selectedSpace = undefined;
            // TODO: if show details window is shown, hide it
            this.modalService.hideModal();
        }
        else {
            this.selectedSpace = space;
            // TODO: show details window for selectedSpace
            this.modalService.showModal(_space_details_modal_space_details_modal_component__WEBPACK_IMPORTED_MODULE_1__["SpaceDetailsModalComponent"], { space }).then(() => {
                // modal closed
            });
        }
    }
}
SpacesComponent.ɵfac = function SpacesComponent_Factory(t) { return new (t || SpacesComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_2__["SpacesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"])); };
SpacesComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SpacesComponent, selectors: [["app-spaces"]], decls: 15, vars: 1, consts: [[1, "table"], [3, "ngClass", "click", 4, "ngFor", "ngForOf"], [3, "ngClass", "click"]], template: function SpacesComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "table", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "thead");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "tr");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "#");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Title");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Type");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "Visitors");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "th");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Owner");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "tbody");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, SpacesComponent_tr_14_Template, 11, 7, "tr", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.spaces);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgClass"], _angular_flex_layout_extended__WEBPACK_IMPORTED_MODULE_6__["DefaultClassDirective"]], styles: [".row-selected[_ngcontent-%COMP%] {\n  color: white;\n  background-color: #324f62;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2VzL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFxzcGFjZXNcXHNwYWNlcy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2VzL3NwYWNlcy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLFlBQUE7RUFDQSx5QkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvX2NvbXBvbmVudHMvc3BhY2VzL3NwYWNlcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5yb3ctc2VsZWN0ZWQge1xyXG4gICAgY29sb3I6IHdoaXRlO1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzMyNGY2MjtcclxufSIsIi5yb3ctc2VsZWN0ZWQge1xuICBjb2xvcjogd2hpdGU7XG4gIGJhY2tncm91bmQtY29sb3I6ICMzMjRmNjI7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpacesComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-spaces',
                templateUrl: './spaces.component.html',
                styleUrls: ['./spaces.component.scss']
            }]
    }], function () { return [{ type: src_app_services_spaces_service__WEBPACK_IMPORTED_MODULE_2__["SpacesService"] }, { type: src_app_services_game_service__WEBPACK_IMPORTED_MODULE_3__["GameService"] }, { type: src_app_services_modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/sub-nav-bar/sub-nav-bar.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/_components/sub-nav-bar/sub-nav-bar.component.ts ***!
  \******************************************************************/
/*! exports provided: SubNavBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubNavBarComponent", function() { return SubNavBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class SubNavBarComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
SubNavBarComponent.ɵfac = function SubNavBarComponent_Factory(t) { return new (t || SubNavBarComponent)(); };
SubNavBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: SubNavBarComponent, selectors: [["app-sub-nav-bar"]], decls: 2, vars: 0, consts: [[1, "subnav"]], template: function SubNavBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " the subnav\n");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3N1Yi1uYXYtYmFyL3N1Yi1uYXYtYmFyLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SubNavBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-sub-nav-bar',
                templateUrl: './sub-nav-bar.component.html',
                styleUrls: ['./sub-nav-bar.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_components/tezos-connect/tezos-connect.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/_components/tezos-connect/tezos-connect.component.ts ***!
  \**********************************************************************/
/*! exports provided: TezosConnectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TezosConnectComponent", function() { return TezosConnectComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/app/_services/tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/app/_services/alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/form-field */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/form-field.js");
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ngx-material-file-input */ "./node_modules/ngx-material-file-input/__ivy_ngcc__/fesm2015/ngx-material-file-input.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");













function TezosConnectComponent_div_2_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 6);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 7);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "ngx-mat-file-input", 8);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon", 9);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "vpn_key");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "p", 11);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, " Don't have a wallet? Get one ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "a", 12);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "here");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, "! ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 10);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](12, "clr-icon", 13);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("formGroup", ctx_r88.formDoc);
} }
function TezosConnectComponent_div_3_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "clr-input-container");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "label", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Your Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-form-field", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "Your Address");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](8, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r89 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r89.tezosService.account.account_id);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r89.tezosService.account.account_id);
} }
function TezosConnectComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Network");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r90 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("value", ctx_r90.tezosService.network);
} }
function TezosConnectComponent_div_6_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 14);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-form-field", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-label");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Your Balance");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](4, "input", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const ctx_r91 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate1"]("value", "", ctx_r91.tezosService.account.balance, " XTZ");
} }
function TezosConnectComponent_div_7_Template(rf, ctx) { if (rf & 1) {
    const _r94 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function TezosConnectComponent_div_7_Template_div_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r94); const ctx_r93 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r93.logout(); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-icon");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "clear");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "span");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "Disconnect");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class TezosConnectComponent {
    constructor(_fb, tezosService, alertService) {
        this._fb = _fb;
        this.tezosService = tezosService;
        this.alertService = alertService;
    }
    ngOnInit() {
        this.formDoc = this._fb.group({
            walletFile: [
                undefined,
                [_angular_forms__WEBPACK_IMPORTED_MODULE_1__["Validators"].required]
            ]
        });
        this.formDoc.get('walletFile').valueChanges.subscribe((val) => {
            console.log('onchange', val);
            const alert = this.alertService.show({ message: `Please wait for your Tezos account is activated ...` });
            this.tezosService.connect(val.files[0]).then(() => {
            }).catch((err) => {
                this.alertService.error(err);
            }).finally(() => {
                this.alertService.onClose(alert.alertId);
            });
        });
        this.tezosService.initialize();
    }
    logout() {
        this.formDoc.setValue({ walletFile: '' }, { onlySelf: true, emitEvent: false });
        this.tezosService.logout();
    }
}
TezosConnectComponent.ɵfac = function TezosConnectComponent_Factory(t) { return new (t || TezosConnectComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"])); };
TezosConnectComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: TezosConnectComponent, selectors: [["app-tezos-connect"]], decls: 8, vars: 5, consts: [["fxLayout", "row", "fxLayoutWrap", "", "fxLayoutAlign", "center start", 1, "tezos-connect"], ["fxFlex", "", "fxLayout", "column", "fxLayoutWrap", "", "fxLayoutAlign", "start center", 1, "inner-content"], ["fxFlex", "", "style", "width:350px;", 3, "formGroup", 4, "ngIf"], ["fxFlex", "", 4, "ngIf"], ["fxFlex", "", "fxLayout", "row", "fxLayoutGap", "24px"], ["fxFlex", "", "class", "button", 3, "click", 4, "ngIf"], ["fxFlex", "", 2, "width", "350px", 3, "formGroup"], [1, "clr-form-control", 2, "width", "350px", "border", "none", "color", "white"], ["formControlName", "walletFile", "accept", ".json", "placeholder", "Select your wallet file"], ["matSuffix", ""], [1, "mt-3"], [2, "text-align", "center"], ["href", "https://tokens.tezos.org/", "target", "_blank"], ["shape", "help"], ["fxFlex", ""], [1, "clr-sr-only"], ["matInput", "", "readonly", "", 3, "value"], ["appearance", "fill", 2, "width", "350px"], ["appearance", "fill", 2, "width", "163px"], ["fxFlex", "", 1, "button", 3, "click"]], template: function TezosConnectComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](2, TezosConnectComponent_div_2_Template, 13, 1, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](3, TezosConnectComponent_div_3_Template, 9, 2, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, TezosConnectComponent_div_5_Template, 5, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](6, TezosConnectComponent_div_6_Template, 5, 1, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](7, TezosConnectComponent_div_7_Template, 5, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.tezosService.isConnected && !ctx.tezosService.isConnecting);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tezosService.isConnected);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tezosService.network != undefined);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tezosService.isConnected);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tezosService.isConnected);
    } }, directives: [_angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultFlexDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutGapDirective"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormGroupDirective"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatFormField"], ngx_material_file_input__WEBPACK_IMPORTED_MODULE_7__["FileInputComponent"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormControlName"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_8__["MatIcon"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatSuffix"], _clr_angular__WEBPACK_IMPORTED_MODULE_9__["ClrIconCustomTag"], _clr_angular__WEBPACK_IMPORTED_MODULE_9__["ClrInputContainer"], _clr_angular__WEBPACK_IMPORTED_MODULE_9__["ClrLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_10__["MatInput"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_6__["MatLabel"]], styles: [".mat-form-field-appearance-legacy[_ngcontent-%COMP%]   .mat-form-field-label[_ngcontent-%COMP%] {\n  color: white !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvdGV6b3MtY29ubmVjdC9FOlxcTHVkb1xcRG9jdW1lbnRzXFxEZXZlbG9wcGVtZW50XFxDcnlwdG9GYW50YXNpYVxcd3d3L3NyY1xcYXBwXFxfY29tcG9uZW50c1xcdGV6b3MtY29ubmVjdFxcdGV6b3MtY29ubmVjdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvdGV6b3MtY29ubmVjdC90ZXpvcy1jb25uZWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksdUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3Rlem9zLWNvbm5lY3QvdGV6b3MtY29ubmVjdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xyXG4gICAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XHJcbn0iLCIubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgY29sb3I6IHdoaXRlICFpbXBvcnRhbnQ7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TezosConnectComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-tezos-connect',
                templateUrl: './tezos-connect.component.html',
                styleUrls: ['./tezos-connect.component.scss']
            }]
    }], function () { return [{ type: _angular_forms__WEBPACK_IMPORTED_MODULE_1__["FormBuilder"] }, { type: src_app_services_tezos_service__WEBPACK_IMPORTED_MODULE_2__["TezosService"] }, { type: src_app_services_alert_service__WEBPACK_IMPORTED_MODULE_3__["AlertService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/vertical-left-bar/vertical-left-bar.component.ts":
/*!******************************************************************************!*\
  !*** ./src/app/_components/vertical-left-bar/vertical-left-bar.component.ts ***!
  \******************************************************************************/
/*! exports provided: VerticalLeftBarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerticalLeftBarComponent", function() { return VerticalLeftBarComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");




function VerticalLeftBarComponent_a_10_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const person_r78 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](person_r78);
} }
const _c0 = function () { return ["Alice", "Bob", "Charlie"]; };
class VerticalLeftBarComponent {
    constructor() {
    }
    ngOnInit() {
    }
}
VerticalLeftBarComponent.ɵfac = function VerticalLeftBarComponent_Factory(t) { return new (t || VerticalLeftBarComponent)(); };
VerticalLeftBarComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: VerticalLeftBarComponent, selectors: [["app-vertical-left-bar"]], decls: 11, vars: 5, consts: [[1, "vertical-nav", 3, "clrVerticalNavCollapsible", "clrVerticalNavCollapsed", "clr-nav-level"], ["clrVerticalNavLink", ""], [1, "nav-divider"], ["clrVerticalNavLink", "", 4, "ngFor", "ngForOf"]], template: function VerticalLeftBarComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "clr-vertical-nav", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Charmander");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "a", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Credit");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](6, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "clr-vertical-nav-group");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " People ");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "clr-vertical-nav-group-children");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](10, VerticalLeftBarComponent_a_10_Template, 2, 1, "a", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("clrVerticalNavCollapsible", true)("clrVerticalNavCollapsed", false)("clr-nav-level", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](4, _c0));
    } }, directives: [_clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrVerticalNav"], _clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrNavLevel"], _clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrVerticalNavLink"], _clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrVerticalNavGroup"], _clr_angular__WEBPACK_IMPORTED_MODULE_1__["ClrVerticalNavGroupChildren"], _angular_common__WEBPACK_IMPORTED_MODULE_2__["NgForOf"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL19jb21wb25lbnRzL3ZlcnRpY2FsLWxlZnQtYmFyL3ZlcnRpY2FsLWxlZnQtYmFyLmNvbXBvbmVudC5zY3NzIn0= */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](VerticalLeftBarComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-vertical-left-bar',
                templateUrl: './vertical-left-bar.component.html',
                styleUrls: ['./vertical-left-bar.component.scss']
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_components/waiter/waiter.component.ts":
/*!********************************************************!*\
  !*** ./src/app/_components/waiter/waiter.component.ts ***!
  \********************************************************/
/*! exports provided: WaiterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterComponent", function() { return WaiterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var src_app_services_waiter_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/app/_services/waiter.service */ "./src/app/_services/waiter.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");





function WaiterComponent_div_0_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "mat-spinner", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
class WaiterComponent {
    constructor(waiterService) {
        this.waiterService = waiterService;
    }
    ngOnInit() {
    }
}
WaiterComponent.ɵfac = function WaiterComponent_Factory(t) { return new (t || WaiterComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](src_app_services_waiter_service__WEBPACK_IMPORTED_MODULE_1__["WaiterService"])); };
WaiterComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WaiterComponent, selectors: [["app-waiter"]], decls: 1, vars: 1, consts: [["class", "background", 4, "ngIf"], [1, "background"], [1, "waiter"]], template: function WaiterComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](0, WaiterComponent_div_0_Template, 2, 0, "div", 0);
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.waiterService && ctx.waiterService.isWaiting);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["NgIf"], _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_3__["MatSpinner"]], styles: [".background[_ngcontent-%COMP%] {\n  position: absolute;\n  top: 45%;\n  left: 45%;\n  background-color: white;\n  z-index: 99;\n  opacity: 33%;\n  border-radius: 60px;\n  padding: 10px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvd2FpdGVyL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFx3YWl0ZXJcXHdhaXRlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvd2FpdGVyL3dhaXRlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNJLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLFNBQUE7RUFDQSx1QkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxhQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy93YWl0ZXIvd2FpdGVyLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmJhY2tncm91bmQge1xyXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xyXG4gICAgdG9wOiA0NSU7XHJcbiAgICBsZWZ0OiA0NSU7XHJcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcclxuICAgIHotaW5kZXg6IDk5O1xyXG4gICAgb3BhY2l0eTogMzMlO1xyXG4gICAgYm9yZGVyLXJhZGl1czogNjBweDtcclxuICAgIHBhZGRpbmc6IDEwcHg7XHJcbn0iLCIuYmFja2dyb3VuZCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA0NSU7XG4gIGxlZnQ6IDQ1JTtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIHotaW5kZXg6IDk5O1xuICBvcGFjaXR5OiAzMyU7XG4gIGJvcmRlci1yYWRpdXM6IDYwcHg7XG4gIHBhZGRpbmc6IDEwcHg7XG59Il19 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WaiterComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-waiter',
                templateUrl: './waiter.component.html',
                styleUrls: ['./waiter.component.scss']
            }]
    }], function () { return [{ type: src_app_services_waiter_service__WEBPACK_IMPORTED_MODULE_1__["WaiterService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_components/wealth-indicator/wealth-indicator.component.ts":
/*!****************************************************************************!*\
  !*** ./src/app/_components/wealth-indicator/wealth-indicator.component.ts ***!
  \****************************************************************************/
/*! exports provided: WealthIndicatorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WealthIndicatorComponent", function() { return WealthIndicatorComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");




function WealthIndicatorComponent_div_1_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 2);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} if (rf & 2) {
    const bar_r160 = ctx.$implicit;
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMap"](bar_r160.style);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpropertyInterpolate"]("matTooltip", bar_r160.label);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate"](bar_r160.value);
} }
class WealthIndicatorComponent {
    constructor() {
        this.templateColumns = '';
        this._bars = [];
    }
    set bars(bars) {
        this._bars = bars;
        this.updateWrapper();
    }
    ngAfterViewChecked() {
        this.updateWrapper();
    }
    ngOnInit() {
        // tslint:disable-next-line: no-unused-expression
    }
    updateWrapper() {
        let templateColumns = '';
        for (const bar of this._bars) {
            templateColumns += `${bar.percentage * 100}% `;
        }
        this.templateColumns = templateColumns;
    }
}
WealthIndicatorComponent.ɵfac = function WealthIndicatorComponent_Factory(t) { return new (t || WealthIndicatorComponent)(); };
WealthIndicatorComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WealthIndicatorComponent, selectors: [["app-wealth-indicator"]], inputs: { bars: "bars" }, decls: 2, vars: 4, consts: [[1, "wrapper"], ["class", "fantas", 3, "style", "matTooltip", 4, "ngFor", "ngForOf"], [1, "fantas", 3, "matTooltip"]], template: function WealthIndicatorComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WealthIndicatorComponent_div_1_Template, 2, 5, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstyleMapInterpolate1"]("grid-template-columns: ", ctx.templateColumns, ";");
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx._bars);
    } }, directives: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["NgForOf"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_2__["MatTooltip"]], styles: ["@charset \"UTF-8\";\n*[_ngcontent-%COMP%] {\n  box-sizing: border-box;\n}\n.wrapper[_ngcontent-%COMP%] {\n  height: auto;\n}\n.wrapper[_ngcontent-%COMP%]    > div[_ngcontent-%COMP%] {\n  color: #d9480f;\n  height: auto;\n  padding: 0;\n  line-height: normal;\n  text-align: center;\n}\n.wrapper[_ngcontent-%COMP%] {\n  display: grid;\n  grid-auto-rows: 3em;\n  grid-template-columns: 0% 0% 0%;\n}\n.wrapper[_ngcontent-%COMP%]    > .one[_ngcontent-%COMP%] {\n  background-color: #00FF00;\n}\n.wrapper[_ngcontent-%COMP%]    > .two[_ngcontent-%COMP%] {\n  background-color: #FF0000;\n}\n.wrapper[_ngcontent-%COMP%]    > .three[_ngcontent-%COMP%] {\n  background-color: transparent;\n}\n.fantas[_ngcontent-%COMP%]::before {\n  content: \"\u2131\u00A0\";\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvd2VhbHRoLWluZGljYXRvci93ZWFsdGgtaW5kaWNhdG9yLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9fY29tcG9uZW50cy93ZWFsdGgtaW5kaWNhdG9yL0U6XFxMdWRvXFxEb2N1bWVudHNcXERldmVsb3BwZW1lbnRcXENyeXB0b0ZhbnRhc2lhXFx3d3cvc3JjXFxhcHBcXF9jb21wb25lbnRzXFx3ZWFsdGgtaW5kaWNhdG9yXFx3ZWFsdGgtaW5kaWNhdG9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGdCQUFnQjtBQ0FoQjtFQUNJLHNCQUFBO0FERUo7QUNDQTtFQUlJLFlBQUE7QURESjtBQ0lBO0VBRUksY0FBQTtFQUNBLFlBQUE7RUFDQSxVQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtBREZKO0FDS0E7RUFDSSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSwrQkFBQTtBREZKO0FDS0E7RUFHSSx5QkFBQTtBREpKO0FDT0E7RUFHSSx5QkFBQTtBRE5KO0FDU0E7RUFDSSw2QkFBQTtBRE5KO0FDU0E7RUFDSSxhQUFBO0FETkoiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy93ZWFsdGgtaW5kaWNhdG9yL3dlYWx0aC1pbmRpY2F0b3IuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAY2hhcnNldCBcIlVURi04XCI7XG4qIHtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLndyYXBwZXIge1xuICBoZWlnaHQ6IGF1dG87XG59XG5cbi53cmFwcGVyID4gZGl2IHtcbiAgY29sb3I6ICNkOTQ4MGY7XG4gIGhlaWdodDogYXV0bztcbiAgcGFkZGluZzogMDtcbiAgbGluZS1oZWlnaHQ6IG5vcm1hbDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4ud3JhcHBlciB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtYXV0by1yb3dzOiAzZW07XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogMCUgMCUgMCU7XG59XG5cbi53cmFwcGVyID4gLm9uZSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICMwMEZGMDA7XG59XG5cbi53cmFwcGVyID4gLnR3byB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNGRjAwMDA7XG59XG5cbi53cmFwcGVyID4gLnRocmVlIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG59XG5cbi5mYW50YXM6OmJlZm9yZSB7XG4gIGNvbnRlbnQ6IFwi4oSxwqBcIjtcbn0iLCIqIHtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi53cmFwcGVyIHtcclxuICAgIC8vIGJvcmRlcjogMnB4IHNvbGlkICNmZmE5NGQ7XHJcbiAgICAvLyBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAvLyB3aWR0aDogMTAwJTtcclxuICAgIGhlaWdodDogYXV0bztcclxufVxyXG5cclxuLndyYXBwZXI+ZGl2IHtcclxuICAgIC8vIHBhZGRpbmc6IDFlbTtcclxuICAgIGNvbG9yOiAjZDk0ODBmO1xyXG4gICAgaGVpZ2h0OiBhdXRvO1xyXG4gICAgcGFkZGluZzogMDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbn1cclxuXHJcbi53cmFwcGVyIHtcclxuICAgIGRpc3BsYXk6IGdyaWQ7XHJcbiAgICBncmlkLWF1dG8tcm93czogM2VtO1xyXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiAwJSAwJSAwJTtcclxufVxyXG5cclxuLndyYXBwZXI+Lm9uZSB7XHJcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCAjMDBGRjAwO1xyXG4gICAgLy8gYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwRkYwMDtcclxufVxyXG5cclxuLndyYXBwZXI+LnR3byB7XHJcbiAgICAvLyBib3JkZXI6IDJweCBzb2xpZCAjZmYwMDAwO1xyXG4gICAgLy8gYm9yZGVyLXJhZGl1czogNXB4O1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0ZGMDAwMDtcclxufVxyXG5cclxuLndyYXBwZXI+LnRocmVlIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xyXG59XHJcblxyXG4uZmFudGFzOjpiZWZvcmUge1xyXG4gICAgY29udGVudDogJ1xcMjEzMSBcXDAwYTAnO1xyXG59XHJcbiJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WealthIndicatorComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-wealth-indicator',
                templateUrl: './wealth-indicator.component.html',
                styleUrls: ['./wealth-indicator.component.scss']
            }]
    }], function () { return []; }, { bars: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"]
        }] }); })();


/***/ }),

/***/ "./src/app/_components/welcome/welcome.component.ts":
/*!**********************************************************!*\
  !*** ./src/app/_components/welcome/welcome.component.ts ***!
  \**********************************************************/
/*! exports provided: WelcomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WelcomeComponent", function() { return WelcomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/flex-layout/flex */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
/* harmony import */ var ngx_responsive__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-responsive */ "./node_modules/ngx-responsive/__ivy_ngcc__/fesm2015/ngx-responsive.js");







function WelcomeComponent_div_4_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 15);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Play and Educate Yourself about Blockchain & Cypto-Economics ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_div_5_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 16);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Play and Educate Yourself about Blockchain & Cypto-Economics ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_div_8_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " A Decentralized Board Game About Economics (Inspired By Monopoly\u00AE) But Crypto-Oriented, where crypto-economics mechanisms are entirely implemented powered by smart contracts on the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 18);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Tezos (\u00AE) blockchain. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_div_9_Template(rf, ctx) { if (rf & 1) {
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " A Decentralized Board Game About Economics (Inspired By Monopoly\u00AE) But Crypto-Oriented, where crypto-economics mechanisms are entirely implemented powered by smart contracts on the ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](2, "img", 20);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](3, "Tezos (\u00AE) blockchain. ");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_button_11_Template(rf, ctx) { if (rf & 1) {
    const _r994 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 21);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomeComponent_button_11_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r994); const ctx_r993 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r993.router.navigate(["overview"]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Learn More");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_button_12_Template(rf, ctx) { if (rf & 1) {
    const _r996 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 22);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomeComponent_button_12_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r996); const ctx_r995 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r995.router.navigate(["overview"]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Learn More");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_button_13_Template(rf, ctx) { if (rf & 1) {
    const _r998 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 23);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomeComponent_button_13_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r998); const ctx_r997 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r997.router.navigate(["game"]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Get Started");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
function WelcomeComponent_button_14_Template(rf, ctx) { if (rf & 1) {
    const _r1000 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 24);
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomeComponent_button_14_Template_button_click_0_listener() { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r1000); const ctx_r999 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"](); return ctx_r999.router.navigate(["game"]); });
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Get Started");
    _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
} }
const _c0 = function () { return ["md", "lg", "xl"]; };
const _c1 = function () { return ["sm", "xs"]; };
class WelcomeComponent {
    constructor(router, document) {
        this.router = router;
        this.document = document;
    }
    ngOnInit() {
    }
    scroll() {
        this.document.scrollingElement.scrollTo({ top: this.document.scrollingElement.clientHeight });
    }
}
WelcomeComponent.ɵfac = function WelcomeComponent_Factory(t) { return new (t || WelcomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"])); };
WelcomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: WelcomeComponent, selectors: [["app-welcome"]], decls: 15, vars: 16, consts: [["matTooltip", "Click Me", "routerLink", "/", 3, "click"], ["src", "assets/crypto-fantasia.png", 2, "width", "100%", "height", "100%"], ["fxLayout", "column", "fxLayoutAlign", "center center", "fxLayoutGap", "24px", 1, "welcome", 2, "background-image", "url('assets/background.png')"], ["src", "assets/banner.png", 2, "width", "50%", "min-width", "250px"], ["class", " subtitle-large ", 4, "showItBootstrap"], ["class", " subtitle ", 4, "showItBootstrap"], [2, "width", "100%"], ["src", "assets/flyers.gif ", 2, "width", "50%", "min-width", "250px"], ["class", "catchphrase ", 4, "showItBootstrap"], ["class", "catchphrase-large ", 4, "showItBootstrap"], ["fxLayout", "row", "fxLayout.xs", "column", "fxLayoutGap", "12px"], ["class", "btn-large btn-learn btn btn-primary ", 3, "click", 4, "showItBootstrap"], ["class", "btn-learn btn btn-primary ", 3, "click", 4, "showItBootstrap"], ["class", "btn-large btn-play btn btn-success ", 3, "click", 4, "showItBootstrap"], ["class", "btn-play btn btn-success ", 3, "click", 4, "showItBootstrap"], [1, "subtitle-large"], [1, "subtitle"], [1, "catchphrase"], ["src", "assets/tezos-logo-small.png ", "height", "30\n    ", 2, "margin", "6px"], [1, "catchphrase-large"], ["src", "assets/tezos-logo-small.png ", "height", "30\n  ", 2, "margin", "6px"], [1, "btn-large", "btn-learn", "btn", "btn-primary", 3, "click"], [1, "btn-learn", "btn", "btn-primary", 3, "click"], [1, "btn-large", "btn-play", "btn", "btn-success", 3, "click"], [1, "btn-play", "btn", "btn-success", 3, "click"]], template: function WelcomeComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "a", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function WelcomeComponent_Template_a_click_0_listener() { return ctx.scroll(); });
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "img", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](3, "img", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](4, WelcomeComponent_div_4_Template, 2, 0, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](5, WelcomeComponent_div_5_Template, 2, 0, "div", 5);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "div", 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](7, "img", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](8, WelcomeComponent_div_8_Template, 4, 0, "div", 8);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](9, WelcomeComponent_div_9_Template, 4, 0, "div", 9);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "div", 10);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](11, WelcomeComponent_button_11_Template, 2, 0, "button", 11);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](12, WelcomeComponent_button_12_Template, 2, 0, "button", 12);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](13, WelcomeComponent_button_13_Template, 2, 0, "button", 13);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](14, WelcomeComponent_button_14_Template, 2, 0, "button", 14);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
    } if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](8, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](9, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](10, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](11, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](12, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](13, _c1));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](14, _c0));
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("showItBootstrap", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](15, _c1));
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterLinkWithHref"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_3__["MatTooltip"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutAlignDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_4__["DefaultLayoutGapDirective"], ngx_responsive__WEBPACK_IMPORTED_MODULE_5__["ShowItBootstrapDirective"]], styles: [".welcome[_ngcontent-%COMP%] {\n  top: 0;\n  height: auto;\n  min-height: 100%;\n  width: 100%;\n  text-align: center;\n  background-size: cover;\n}\n\n.subtitle[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: medium;\n  width: 80%;\n  min-width: 350px;\n  font-weight: bolder;\n}\n\n.subtitle-large[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: xx-large;\n  width: 50%;\n  min-width: 640px;\n  font-weight: bolder;\n}\n\n.catchphrase[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: medium;\n  width: 80%;\n  min-width: 350px;\n}\n\n.catchphrase-large[_ngcontent-%COMP%] {\n  text-align: center;\n  font-size: x-large;\n  width: 50%;\n  min-width: 640px;\n}\n\n.btn[_ngcontent-%COMP%] {\n  font-weight: bolder;\n  font-size: large;\n  width: 200px;\n  height: 50px;\n  border-radius: 8px;\n}\n\n.btn-large[_ngcontent-%COMP%] {\n  font-weight: bolder;\n  font-size: x-large;\n  width: 320px;\n  height: 80px;\n  border-radius: 24px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvX2NvbXBvbmVudHMvd2VsY29tZS9FOlxcTHVkb1xcRG9jdW1lbnRzXFxEZXZlbG9wcGVtZW50XFxDcnlwdG9GYW50YXNpYVxcd3d3L3NyY1xcYXBwXFxfY29tcG9uZW50c1xcd2VsY29tZVxcd2VsY29tZS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvX2NvbXBvbmVudHMvd2VsY29tZS93ZWxjb21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0ksTUFBQTtFQUVBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLHNCQUFBO0FDQUo7O0FER0E7RUFDSSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsVUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7QUNBSjs7QURHQTtFQUNJLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsZ0JBQUE7RUFDQSxtQkFBQTtBQ0FKOztBREdBO0VBQ0ksa0JBQUE7RUFDQSxpQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQ0FKOztBREdBO0VBQ0ksa0JBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFDQSxnQkFBQTtBQ0FKOztBREdBO0VBQ0ksbUJBQUE7RUFDQSxnQkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0Esa0JBQUE7QUNBSjs7QURHQTtFQUNJLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLG1CQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9fY29tcG9uZW50cy93ZWxjb21lL3dlbGNvbWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIud2VsY29tZSB7XHJcbiAgICB0b3A6IDA7XHJcbiAgICAvLyBwb3NpdGlvbjogYWJzb2x1dGU7XHJcbiAgICBoZWlnaHQ6IGF1dG87XHJcbiAgICBtaW4taGVpZ2h0OiAxMDAlO1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xyXG59XHJcblxyXG4uc3VidGl0bGUge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWluLXdpZHRoOiAzNTBweDtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbn1cclxuXHJcbi5zdWJ0aXRsZS1sYXJnZSB7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcbiAgICBmb250LXNpemU6IHh4LWxhcmdlO1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIG1pbi13aWR0aDogNjQwcHg7XHJcbiAgICBmb250LXdlaWdodDogYm9sZGVyO1xyXG59XHJcblxyXG4uY2F0Y2hwaHJhc2Uge1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgZm9udC1zaXplOiBtZWRpdW07XHJcbiAgICB3aWR0aDogODAlO1xyXG4gICAgbWluLXdpZHRoOiAzNTBweDtcclxufVxyXG5cclxuLmNhdGNocGhyYXNlLWxhcmdlIHtcclxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcclxuICAgIGZvbnQtc2l6ZTogeC1sYXJnZTtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBtaW4td2lkdGg6IDY0MHB4O1xyXG59XHJcblxyXG4uYnRuIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICBmb250LXNpemU6IGxhcmdlO1xyXG4gICAgd2lkdGg6IDIwMHB4O1xyXG4gICAgaGVpZ2h0OiA1MHB4O1xyXG4gICAgYm9yZGVyLXJhZGl1czogOHB4O1xyXG59XHJcblxyXG4uYnRuLWxhcmdlIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkZXI7XHJcbiAgICBmb250LXNpemU6IHgtbGFyZ2U7XHJcbiAgICB3aWR0aDogMzIwcHg7XHJcbiAgICBoZWlnaHQ6IDgwcHg7XHJcbiAgICBib3JkZXItcmFkaXVzOiAyNHB4O1xyXG59IiwiLndlbGNvbWUge1xuICB0b3A6IDA7XG4gIGhlaWdodDogYXV0bztcbiAgbWluLWhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiBjb3Zlcjtcbn1cblxuLnN1YnRpdGxlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IG1lZGl1bTtcbiAgd2lkdGg6IDgwJTtcbiAgbWluLXdpZHRoOiAzNTBweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGRlcjtcbn1cblxuLnN1YnRpdGxlLWxhcmdlIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBmb250LXNpemU6IHh4LWxhcmdlO1xuICB3aWR0aDogNTAlO1xuICBtaW4td2lkdGg6IDY0MHB4O1xuICBmb250LXdlaWdodDogYm9sZGVyO1xufVxuXG4uY2F0Y2hwaHJhc2Uge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogbWVkaXVtO1xuICB3aWR0aDogODAlO1xuICBtaW4td2lkdGg6IDM1MHB4O1xufVxuXG4uY2F0Y2hwaHJhc2UtbGFyZ2Uge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogeC1sYXJnZTtcbiAgd2lkdGg6IDUwJTtcbiAgbWluLXdpZHRoOiA2NDBweDtcbn1cblxuLmJ0biB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkZXI7XG4gIGZvbnQtc2l6ZTogbGFyZ2U7XG4gIHdpZHRoOiAyMDBweDtcbiAgaGVpZ2h0OiA1MHB4O1xuICBib3JkZXItcmFkaXVzOiA4cHg7XG59XG5cbi5idG4tbGFyZ2Uge1xuICBmb250LXdlaWdodDogYm9sZGVyO1xuICBmb250LXNpemU6IHgtbGFyZ2U7XG4gIHdpZHRoOiAzMjBweDtcbiAgaGVpZ2h0OiA4MHB4O1xuICBib3JkZXItcmFkaXVzOiAyNHB4O1xufSJdfQ== */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WelcomeComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-welcome',
                templateUrl: './welcome.component.html',
                styleUrls: ['./welcome.component.scss']
            }]
    }], function () { return [{ type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }, { type: Document, decorators: [{
                type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"],
                args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"]]
            }] }]; }, null); })();


/***/ }),

/***/ "./src/app/_directives/modal.directive.ts":
/*!************************************************!*\
  !*** ./src/app/_directives/modal.directive.ts ***!
  \************************************************/
/*! exports provided: ModalDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalDirective", function() { return ModalDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class ModalDirective {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
ModalDirective.ɵfac = function ModalDirective_Factory(t) { return new (t || ModalDirective)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"])); };
ModalDirective.ɵdir = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineDirective"]({ type: ModalDirective, selectors: [["", "appModal", ""]] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModalDirective, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"],
        args: [{
                selector: '[appModal]'
            }]
    }], function () { return [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/alert.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/alert.service.ts ***!
  \********************************************/
/*! exports provided: IAlertType, AlertService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IAlertType", function() { return IAlertType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AlertService", function() { return AlertService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



var IAlertType;
(function (IAlertType) {
    IAlertType["INFO"] = "info";
    IAlertType["WARNING"] = "warning";
    IAlertType["SUCCESS"] = "success";
    IAlertType["DANGER"] = "danger";
})(IAlertType || (IAlertType = {}));
class AlertService {
    constructor() {
        this.alertCount = 0;
        this.defaultAlertConfig = {
            clrAlertType: IAlertType.INFO,
            message: '',
            clrAlertAppLevel: false,
            clrAlertClosable: true,
            actions: undefined
        };
        this.alertsMap = new Map();
        // alerts: IterableIterator<{alertId: number, config: IAlertConfig}>;
        this.closeMap = new Map();
        // this.alerts = this.alertsMap.values();
    }
    get alerts() {
        return Array.from(this.alertsMap.values());
    }
    show(config) {
        this.alertCount++;
        const alertConfig = Object.assign(Object.assign({}, this.defaultAlertConfig), config);
        this.alertsMap.set(this.alertCount, { alertId: this.alertCount, config: alertConfig });
        const close = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.closeMap.set(this.alertCount, close);
        // this.alerts = this.alertsMap.values();
        return { alertId: this.alertCount, onClose$: close };
    }
    error(err) {
        return this.show({
            message: err.toString(),
            clrAlertType: IAlertType.DANGER
        });
    }
    onClose(value) {
        this.alertsMap.delete(value);
        //  this.alerts = this.alertsMap.values();
        const close = this.closeMap.get(value);
        if (close) {
            this.closeMap.delete(value);
            close.next(value);
            close.complete();
        }
    }
}
AlertService.ɵfac = function AlertService_Factory(t) { return new (t || AlertService)(); };
AlertService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: AlertService, factory: AlertService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AlertService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_services/api.service.ts":
/*!******************************************!*\
  !*** ./src/app/_services/api.service.ts ***!
  \******************************************/
/*! exports provided: ApiService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ApiService", function() { return ApiService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");






class ApiService {
    constructor(http, zone) {
        this.http = http;
        this.zone = zone;
        this.hostApiUrl = src_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].api_url;
        this.port = 8080;
        this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({ 'Content-Type': 'application/json' })
        };
    }
    get(apiUrl) {
        const url = `${this.hostApiUrl}/${apiUrl}`;
        return this.http.get(url);
    }
    post(apiUrl, data) {
        const url = `${this.hostApiUrl}/${apiUrl}`;
        return this.http.post(url, data, this.httpOptions);
    }
    connectSSE(apiUrl) {
        const url = `${this.hostApiUrl}/${apiUrl}`;
        return new rxjs__WEBPACK_IMPORTED_MODULE_2__["Observable"]((observer) => {
            if (this.eventSource) {
                this.eventSource.close();
                this.eventSource = undefined;
            }
            this.eventSource = new EventSource(url);
            this.eventSource.addEventListener('message', message => {
                console.log(`on message1, data=${JSON.stringify(message)}`);
            });
            this.eventSource.onmessage = (event) => {
                console.log(`on message2, event=${JSON.stringify(event)}`);
                this.zone.run(() => observer.next(JSON.parse(event.data)));
            };
            this.eventSource.onerror = (err) => {
                observer.error(err);
            };
        });
    }
    disconnectSSE() {
        if (this.eventSource) {
            this.eventSource.close();
            this.eventSource = undefined;
        }
    }
}
ApiService.ɵfac = function ApiService_Factory(t) { return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"])); };
ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ApiService, factory: ApiService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgZone"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/card.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/card.service.ts ***!
  \*******************************************/
/*! exports provided: CardService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardService", function() { return CardService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");




class CardService {
    constructor(apiService) {
        this.apiService = apiService;
    }
    getChances() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.apiService.get('card/chance').subscribe((cards) => {
                    resolve(cards);
                }, err => reject(err));
            });
        });
    }
    getCommunityChests() {
        return new Promise((resolve, reject) => {
            this.apiService.get('card/cc').subscribe((cards) => {
                resolve(cards);
            }, err => reject(err));
        });
    }
    computeText(card) {
        let text = card.cardText;
        for (const property in card.properties) {
            if (card.properties.hasOwnProperty(property)) {
                text = text.replace(`%${property.toUpperCase()}%`, card.properties[property]);
            }
        }
        return text;
    }
}
CardService.ɵfac = function CardService_Factory(t) { return new (t || CardService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"])); };
CardService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: CardService, factory: CardService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](CardService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/connection.service.ts":
/*!*************************************************!*\
  !*** ./src/app/_services/connection.service.ts ***!
  \*************************************************/
/*! exports provided: ConnectionService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConnectionService", function() { return ConnectionService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/constants */ "./src/constants.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tezos.service */ "./src/app/_services/tezos.service.ts");







class ConnectionService {
    constructor(apiService, tezosService) {
        this.apiService = apiService;
        this.tezosService = tezosService;
        this.isConnected = false;
        this.isConnecting = false;
        this.username = '';
        this.rememberMe = false;
        this.connected = new rxjs__WEBPACK_IMPORTED_MODULE_2__["Subject"]();
        const stored = localStorage.getItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].USERNAME);
        if (stored) {
            this.username = stored;
            this.rememberMe = true;
        }
    }
    connect(data) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.isConnecting = true;
            return new Promise((resolve, reject) => {
                this.username = data.username;
                this.rememberMe = data.rememberMe;
                if (this.rememberMe) {
                    localStorage.setItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].USERNAME, data.username);
                }
                else {
                    localStorage.removeItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].USERNAME);
                }
                this.isConnected = true;
                this.isConnecting = false;
                // call apiService
                this.apiService.post('user', { userName: data.username, tezosAccountId: this.tezosService.account.account_id }).subscribe(() => {
                    this.connected.next(data);
                    resolve(data);
                }, err => reject(err));
            });
        });
    }
    disconnect() {
        this.username = '';
        this.isConnected = false;
        this.isConnecting = false;
        this.rememberMe = false;
        localStorage.removeItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].USERNAME);
        this.connected.next({
            username: this.username,
            rememberMe: this.rememberMe
        });
    }
    waitConnected$() {
        return this.connected;
    }
}
ConnectionService.ɵfac = function ConnectionService_Factory(t) { return new (t || ConnectionService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_tezos_service__WEBPACK_IMPORTED_MODULE_5__["TezosService"])); };
ConnectionService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: ConnectionService, factory: ConnectionService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ConnectionService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] }, { type: _tezos_service__WEBPACK_IMPORTED_MODULE_5__["TezosService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/game-controller.service.ts":
/*!******************************************************!*\
  !*** ./src/app/_services/game-controller.service.ts ***!
  \******************************************************/
/*! exports provided: GameControllerService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameControllerService", function() { return GameControllerService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var _waiter_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./waiter.service */ "./src/app/_services/waiter.service.ts");








class GameControllerService {
    constructor(gameService, apiService, alertService, tezosService, waiterService) {
        this.gameService = gameService;
        this.apiService = apiService;
        this.alertService = alertService;
        this.tezosService = tezosService;
        this.waiterService = waiterService;
    }
    // Tip to share the same waiterTask between gameService and gameController
    set waiterTask(value) {
        this.gameService.waiterTask = value;
    }
    get waiterTask() {
        return this.gameService.waiterTask;
    }
    start() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const sessionId = this.gameService.game.sessionId;
            this.waiterTask = this.waiterService.addTask();
            this.apiService.post(`game/${sessionId}/start`, {}).subscribe(({ txHash }) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                this.gameService.showAlert(`Game starting request in progress ... (txHash:${txHash})`);
                // DO no remove the this.waiterTask now, because the tx is not confirmed at the moment.
                // When confirmed, the GAME changes state, then the waiterTask will be removed
            }), err => {
                this.gameService.alertError(err);
                this.waiterService.removeTask(this.waiterTask);
                this.waiterTask = undefined;
            });
        });
    }
    reset() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const sessionId = this.gameService.game.sessionId;
            this.waiterTask = this.waiterService.addTask();
            this.apiService.post(`game/${sessionId}/reset`, {}).subscribe(({ txHash }) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                this.gameService.showAlert(`Game reset request in progress ... (txHash:${txHash})`);
                // DO no remove the this.waiterTask now, because the tx is not confirmed at the moment.
                // When confirmed, the GAME changes state, then the waiterTask will be removed
            }), err => {
                this.gameService.alertError(err);
            });
        });
    }
    freeze() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.gameService.contracts.game) {
                this.callContract((ks) => this.gameService.contracts.game.freeze(ks), (txHash) => {
                    this.gameService.showAlert(`game freeze requested (txHash:${txHash}) ...`);
                }, (txHash, blockId) => {
                    this.gameService.showAlert(`game successfully frozen (txHash:${txHash}, blockId:${blockId})`);
                    this.gameService.updateFromGameContract();
                });
            }
        });
    }
    resume() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.gameService.contracts.game) {
                this.callContract((ks) => this.gameService.contracts.game.resume(ks), (txHash) => {
                    this.gameService.showAlert(`game resuming requested (txHash:${txHash}) ...`);
                }, (txHash, blockId) => {
                    this.gameService.showAlert(`game successfully resumed (txHash:${txHash}, blockId:${blockId})`);
                    this.gameService.updateFromGameContract();
                });
            }
        });
    }
    end() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.gameService.contracts.game) {
                this.callContract((ks) => this.gameService.contracts.game.end(ks), (txHash) => {
                    this.gameService.showAlert(`game ending requested (txHash:${txHash}) ...`);
                }, (txHash, blockId) => {
                    this.gameService.showAlert(`game successfully ended (txHash:${txHash}, blockId:${blockId})`);
                    this.gameService.updateFromGameContract();
                });
            }
        });
    }
    rollTheDices() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const sessionId = this.gameService.game.sessionId;
                const player = this.tezosService.account.account_id;
                this.waiterTask = this.waiterService.addTask();
                this.apiService.get(`game/${sessionId}/rollDices/${player}`).subscribe((rollResult) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    console.log(`Roll Results: payload:${JSON.stringify(rollResult.payload)}, signature:${rollResult.signature}`);
                    // TODO: store rollResult.payload and rollResult.signature for later use when sending play request to game contract
                    this.rollDicesResult = rollResult;
                    this.waiterService.removeTask(this.waiterTask);
                    this.waiterTask = undefined;
                    resolve(rollResult);
                }), err => {
                    this.gameService.alertError(err);
                    this.waiterService.removeTask(this.waiterTask);
                    this.waiterTask = undefined;
                    reject();
                });
            });
        });
    }
    play(selectedOption) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            // call contract with rollDicesResult and option chosen by user
            const sessionId = this.gameService.game.sessionId;
            this.waiterTask = this.waiterService.addTask();
            if (this.rollDicesResult === undefined) {
                // Try to get from lastTurns in gamesService
                const lastTurn = this.gameService.lastTurn.get(this.tezosService.account.account_id);
                if (lastTurn && this.gameService.iAmPlaying()) {
                    this.rollDicesResult = {
                        payload: {
                            assetId: lastTurn.newPosition,
                            cardId: lastTurn.cardId,
                            dice1: lastTurn.dices[0],
                            dice2: lastTurn.dices[1],
                            newPosition: lastTurn.newPosition,
                            options: lastTurn.options
                        },
                        signature: lastTurn.signature
                    };
                }
                else {
                    this.gameService.alertError('Unable to invoke Play method because there is no rollResult recorded');
                    this.waiterService.removeTask(this.waiterTask);
                    this.waiterTask = undefined;
                    return;
                }
            }
            if (!this.gameService.contracts.game) {
                this.gameService.alertError('Unable to invoke Play method because the game contract is not set');
                this.waiterService.removeTask(this.waiterTask);
                this.waiterTask = undefined;
                return;
            }
            this.waiterService.removeTask(this.waiterTask);
            this.waiterTask = undefined;
            console.log(`Invoke PLAY transaction with parameters: option='${selectedOption}, payload='${JSON.stringify(this.rollDicesResult.payload)}, signature='${this.rollDicesResult.signature}`);
            // this.waiterTask = this.waiterService.addTask();
            // this.gameService.contracts.game.play2(
            //   this.tezosService.keyStore,
            //   selectedOption,
            //   this.rollDicesResult.payload,
            //   this.rollDicesResult.signature
            // ).then(() => {
            //     this.gameService.showAlert(`Play submitted successfully`);
            //     this.gameService.updateFromGameContract();
            //     this.rollDicesResult = undefined;
            // }).catch(err => {
            //   console.error(`Play transaction failed: ${err.message}`);
            //   this.alertService.error(err);
            // }).finally(() => {
            //   this.waiterService.removeTask(this.waiterTask);
            //   this.waiterTask = undefined;
            // });
            this.callContract((ks) => this.gameService.contracts.game.play(ks, selectedOption, this.rollDicesResult.payload, this.rollDicesResult.signature), (txHash) => {
                this.gameService.showAlert(`Play submission requested (txHash:${txHash}) ...`);
            }, (txHash, blockId) => {
                this.gameService.showAlert(`Play submitted successfully (txHash:${txHash}, blockId:${blockId})`);
                this.gameService.updateFromGameContract();
                this.rollDicesResult = undefined;
            }, () => {
                this.waiterTask = this.waiterService.addTask();
                const body = {
                    player: this.tezosService.account.account_id,
                    payload: this.rollDicesResult.payload,
                    signature: this.rollDicesResult.signature
                };
                this.apiService.post(`game/${sessionId}/played`, body).subscribe((res) => {
                    this.waiterService.removeTask(this.waiterTask);
                    this.waiterTask = undefined;
                }, err => {
                    this.gameService.alertError(err);
                    this.waiterService.removeTask(this.waiterTask);
                    this.waiterTask = undefined;
                });
            });
        });
    }
    callContract(method, onSent, onSuccess, onFailure) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.waiterTask = this.waiterService.addTask();
            method(this.tezosService.keyStore).then((resultOperation) => {
                resultOperation.onConfirmed.then((blockId) => {
                    onSuccess(resultOperation.txHash, blockId);
                }).catch(err => this.alertService.error(err)).finally(() => {
                    this.waiterService.removeTask(this.waiterTask);
                    this.waiterTask = undefined;
                });
                onSent(resultOperation.txHash);
            }).catch(err => {
                this.alertService.error((err.message) ? err.message : err);
                this.waiterService.removeTask(this.waiterTask);
                this.waiterTask = undefined;
                if (onFailure) {
                    onFailure();
                }
            });
        });
    }
}
GameControllerService.ɵfac = function GameControllerService_Factory(t) { return new (t || GameControllerService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_tezos_service__WEBPACK_IMPORTED_MODULE_5__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_waiter_service__WEBPACK_IMPORTED_MODULE_6__["WaiterService"])); };
GameControllerService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GameControllerService, factory: GameControllerService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GameControllerService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }, { type: _api_service__WEBPACK_IMPORTED_MODULE_3__["ApiService"] }, { type: _alert_service__WEBPACK_IMPORTED_MODULE_4__["AlertService"] }, { type: _tezos_service__WEBPACK_IMPORTED_MODULE_5__["TezosService"] }, { type: _waiter_service__WEBPACK_IMPORTED_MODULE_6__["WaiterService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/game.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/game.service.ts ***!
  \*******************************************/
/*! exports provided: eGameCreationStatus, eContractType, GameService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eGameCreationStatus", function() { return eGameCreationStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eContractType", function() { return eContractType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameService", function() { return GameService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _tezos_src_game_contract__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../tezos/src/game.contract */ "../tezos/src/game.contract.ts");
/* harmony import */ var _tezos_src_token_contract__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../tezos/src/token.contract */ "../tezos/src/token.contract.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _connection_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var _waiter_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./waiter.service */ "./src/app/_services/waiter.service.ts");
/* harmony import */ var _user_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./user.service */ "./src/app/_services/user.service.ts");











var eGameCreationStatus;
(function (eGameCreationStatus) {
    eGameCreationStatus["NONE"] = "NONE";
    eGameCreationStatus["IN_CREATION"] = "IN_CREATION";
    eGameCreationStatus["READY"] = "READY";
    eGameCreationStatus["PLAYING"] = "PLAYING";
    eGameCreationStatus["FAILED"] = "FAILED";
    eGameCreationStatus["ENDED"] = "ENDED";
})(eGameCreationStatus || (eGameCreationStatus = {}));
var eContractType;
(function (eContractType) {
    eContractType["GAME"] = "GAME";
    eContractType["TOKEN"] = "TOKEN";
})(eContractType || (eContractType = {}));
class GameService {
    constructor(apiService, connectionService, alertService, tezosService, waiterService, ngZone, userService) {
        this.apiService = apiService;
        this.connectionService = connectionService;
        this.alertService = alertService;
        this.tezosService = tezosService;
        this.waiterService = waiterService;
        this.ngZone = ngZone;
        this.userService = userService;
        this.creationStatus = eGameCreationStatus.NONE;
        this.playingStatus = '';
        this.isConnected = false;
        this.isRegistered = false;
        this.isRegistering = false;
        this._players = [];
        this.apiRefreshPeriod = 5000;
        this.nextPlayer = undefined;
        this.gameCreator = undefined;
        this.balances = new Map();
        this._turns = [];
        this.currentTurn = -1;
        this.playersPosition = new Map();
        this.lastTurn = new Map();
        this.usernames = new Map();
        this.updated = false;
        this._game = undefined;
        this.contracts = {
            game: undefined,
            token: undefined
        };
        this.onChange = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.onPlayerMove = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        connectionService.waitConnected$().subscribe(() => {
            if (!connectionService.isConnected && this.isConnected) {
                this.disconnect();
            }
        }, err => console.error(JSON.stringify(err)));
        setInterval(() => {
            if (this._game) {
                this.apiService.get(`game/${this._game.sessionId}`).subscribe((game) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield this.updateStatus(game);
                }), err => {
                    console.error(JSON.stringify(err));
                    this.creationStatus = eGameCreationStatus.FAILED;
                    this.disconnect();
                });
            }
        }, this.apiRefreshPeriod);
    }
    get players() {
        return this._players;
    }
    getUsername(player) {
        return this.usernames.get(player);
    }
    getAvatar(player) {
        return `assets/avatar/camel.png`;
    }
    get game() {
        return this._game;
    }
    get myBalance() {
        return this.balanceOf(this.tezosService.account.account_id);
    }
    balanceOf(player) {
        return this.balances.get(player) || 0;
    }
    get isGameMaster() {
        return (this._game
            && this.contracts.game
            && (this.gameCreator === this.tezosService.account.account_id));
    }
    // async setContract(): Promise<void> {
    //   const contract = await GameContract.retrieve(this._game.contractAddresses.game);
    //   if (this.contract && this.contract.isWatching) {
    //     this.contract.stopWatching();
    //   }
    //   this.contract = contract;
    //   this.contract.startWatching(2000);
    // }
    getContract(contractType) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this._game && contractType === eContractType.GAME && this._game.contractAddresses.game) {
                    _tezos_src_game_contract__WEBPACK_IMPORTED_MODULE_2__["GameContract"].retrieve(this._game.contractAddresses.game).then((contract) => {
                        resolve(contract);
                    }).catch(err => reject(err));
                }
                else if (this._game && contractType === eContractType.TOKEN && this._game.contractAddresses.token) {
                    _tezos_src_token_contract__WEBPACK_IMPORTED_MODULE_3__["TokenContract"].retrieve(this._game.contractAddresses.token).then((contract) => {
                        resolve(contract);
                    }).catch(err => reject(err));
                }
                else {
                    reject();
                }
            });
        });
    }
    createSession() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.disconnect();
            return new Promise((resolve, reject) => {
                const creator = this.tezosService.account.account_id;
                this.apiService.post('game/create', { creator }).subscribe((game) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    this.connectGameEvents(game.sessionId);
                    yield this.updateStatus(game);
                    resolve(game);
                }), (err) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield this.updateStatus(undefined);
                    reject(err);
                }));
            });
        });
    }
    connectGameEvents(sessionId) {
        this.apiService.connectSSE(`events/${sessionId}`).subscribe((event) => {
            console.log('on receive evnt from SSE channel:', event);
            switch (event.type) {
                case 'TURN_STARTED': {
                    this._turns.push(Object.assign({ id: event.id }, event.data));
                    this.currentTurn = Math.max(event.id, this.currentTurn);
                    if (this.currentTurn === event.id) {
                        this.currentPlayer = event.data.player;
                        const oldPosition = this.playersPosition.get(event.data.player);
                        this.playersPosition.set(event.data.player, event.data.newPosition);
                        this.lastTurn.set(event.data.player, event.data);
                        this.onPlayerMove.emit({
                            player: event.data.player,
                            newPosition: event.data.newPosition,
                            oldPosition: oldPosition
                        });
                    }
                    break;
                }
                case 'TURN_COMPLETED': {
                    if (this.currentPlayer === event.data.player) {
                        this.currentPlayer = undefined;
                    }
                    break;
                }
                case 'GAME_CREATION': {
                    this.showAlert(event.data);
                    break;
                }
                case 'FATAL_ERROR': {
                    this.alertError(event.data);
                    break;
                }
            }
        }, err => {
            // this.alertService.error(JSON.stringify(err));
        });
    }
    connectSession(sessionId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            this.disconnect();
            return new Promise((resolve, reject) => {
                this.apiService.get(`game/${sessionId}`).subscribe((game) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    this.connectGameEvents(sessionId);
                    yield this.updateStatus(game);
                    resolve(game);
                }), (err) => Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
                    yield this.updateStatus(undefined);
                    reject(err);
                }));
            });
        });
    }
    registerWhenPossible() {
        // if game contract is created, then register current player
        if (this.contracts.game) {
            this.isRegistering = true;
            this.contracts.game.isRegistered(this.tezosService.account.account_id).then((isRegistered) => {
                if (isRegistered) {
                    this.isRegistering = false;
                    this.isRegistered = true;
                }
                else {
                    this.showAlert('Game Contract has been created. Now registering current player ...');
                    this.contracts.game.register(this.tezosService.keyStore).then((txOper) => {
                        this.showAlert('returns from register call:' + txOper.txHash);
                        txOper.onConfirmed.then((blockId) => {
                            console.log('Tx confirmed', txOper.txHash, blockId);
                        }).catch(err => this.alertError('register tx failed:' + err));
                    }).catch(err => this.alertError('Error during register call:' + err));
                }
            }).catch(err => this.alertError(JSON.stringify(err)));
        }
    }
    updateStatus(game) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (game) {
                this.updated = (this._game === undefined);
                this._game = game;
                this.isConnected = true;
                if (this._game.status === 'in_creation') {
                    // get creation progress status
                    this.creationStatus = eGameCreationStatus.IN_CREATION;
                }
                else {
                    yield this.checkContracts();
                }
                yield this.updateFromGameContract();
                yield this.updateFromTokenContract();
                // await this.updatePlayers();
                if (!this.isRegistering && !this.isRegistered) {
                    this.registerWhenPossible();
                }
                if (this.updated) {
                    this.onChange.emit();
                }
            }
            else {
                this.disconnect();
            }
        });
    }
    updateFromTokenContract() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.contracts.token) {
                yield this.contracts.token.update();
                yield this.contracts.token.getBalances(this.players).then(balances => {
                    if (!this.compareMaps(balances, this.balances)) {
                        this.balances = balances;
                        this.updated = true;
                    }
                });
            }
        });
    }
    compareMaps(maps1, maps2) {
        if (maps1.size !== maps2.size) {
            return false;
        }
        for (const key of maps1.keys()) {
            if (!maps2.has(key)) {
                return false;
            }
            if (maps2.get(key) !== maps1.get(key)) {
                return false;
            }
        }
        return true;
    }
    updateFromGameContract() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            if (this.contracts.game) {
                yield this.contracts.game.update();
                const storage = this.contracts.game._storage;
                this._players = storage.playersSet;
                if (this._players.includes(this.tezosService.account.account_id)) {
                    this.isRegistered = true;
                }
                // set the player initial position if needed
                for (const player of this._players) {
                    if (!this.playersPosition.has(player)) {
                        this.updated = true;
                        this.playersPosition.set(player, 0);
                    }
                    if (!this.usernames.has(player)) {
                        yield this.userService.getUser(player).then((user) => {
                            this.updated = true;
                            this.usernames.set(player, user.userName);
                        });
                    }
                }
                this.playingStatus = storage.status;
                switch (storage.status) {
                    case 'created': {
                        if ((this.creationStatus !== eGameCreationStatus.READY) && this.waiterTask) {
                            this.waiterService.removeTask(this.waiterTask);
                            this.waiterTask = undefined;
                        }
                        if (this.creationStatus !== eGameCreationStatus.READY) {
                            this.creationStatus = eGameCreationStatus.READY;
                            this.updated = true;
                        }
                        break;
                    }
                    case 'started': {
                        if ((this.creationStatus !== eGameCreationStatus.PLAYING) && this.waiterTask) {
                            this.waiterService.removeTask(this.waiterTask);
                            this.waiterTask = undefined;
                        }
                        if (this.creationStatus !== eGameCreationStatus.PLAYING) {
                            this.creationStatus = eGameCreationStatus.PLAYING;
                            this.updated = true;
                        }
                        break;
                    }
                    case 'frozen': {
                        if (this.creationStatus !== eGameCreationStatus.PLAYING) {
                            this.creationStatus = eGameCreationStatus.PLAYING;
                            this.updated = true;
                        }
                        break;
                    }
                    case 'ended': {
                        if (this.creationStatus !== eGameCreationStatus.ENDED) {
                            this.creationStatus = eGameCreationStatus.ENDED;
                            this.updated = true;
                        }
                        break;
                    }
                }
                if (this.nextPlayer !== storage.nextPlayer) {
                    this.nextPlayer = storage.nextPlayer;
                    this.updated = true;
                }
                if (this.gameCreator !== storage.creator) {
                    this.gameCreator = storage.creator;
                    this.updated = true;
                }
            }
        });
    }
    checkContracts() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const promises = [];
            if (!this.contracts.game) {
                const p = yield this.getContract(eContractType.GAME).then((gameContract) => {
                    this.updated = true;
                    this.contracts.game = gameContract;
                    console.log('start watching game contract');
                    // this.contracts.game.startWatching(5000, (storage) => {
                    // });
                }).catch(err => { });
                promises.push(p);
            }
            if (!this.contracts.token) {
                const p = yield this.getContract(eContractType.TOKEN).then((tokenContract) => {
                    this.updated = true;
                    this.contracts.token = tokenContract;
                }).catch(err => { });
                promises.push(p);
            }
            if (promises.length > 0) {
                yield Promise.all(promises);
            }
        });
    }
    showAlert(message) {
        if (this.alert) {
            this.alertService.onClose(this.alert.alertId);
            this.alert = undefined;
        }
        this.alert = this.alertService.show({ message });
    }
    alertError(err) {
        if (this.alert) {
            this.alertService.onClose(this.alert.alertId);
            this.alert = undefined;
        }
        console.error(err);
        this.alertService.error(JSON.stringify(err));
    }
    disconnect() {
        if (this.contracts.game) {
            this.contracts.game.stopWatching();
        }
        this.apiService.disconnectSSE();
        this.isConnected = false;
        this.isRegistered = false;
        this.isRegistering = false;
        this._game = undefined;
        this.playingStatus = '';
        this.creationStatus = eGameCreationStatus.NONE;
        this.contracts = {
            game: undefined,
            token: undefined
        };
        this.balances = new Map();
        this._turns = [];
        this._players = [];
        this.playersPosition = new Map();
    }
    getAllSessions() {
        return this.apiService.get(`game`);
    }
    iAmNextPlayer() {
        return this.nextPlayer && this.nextPlayer === this.tezosService.account.account_id;
    }
    iAmPlaying() {
        return this.currentPlayer && this.currentPlayer === this.tezosService.account.account_id;
    }
    getPlayerPosition(player) {
        if (this.playersPosition.has(player)) {
            return this.playersPosition.get(player);
        }
        return -1;
    }
    get turns() {
        return this._turns;
    }
}
GameService.ɵfac = function GameService_Factory(t) { return new (t || GameService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_connection_service__WEBPACK_IMPORTED_MODULE_5__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_tezos_service__WEBPACK_IMPORTED_MODULE_7__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_waiter_service__WEBPACK_IMPORTED_MODULE_8__["WaiterService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"])); };
GameService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: GameService, factory: GameService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](GameService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _api_service__WEBPACK_IMPORTED_MODULE_4__["ApiService"] }, { type: _connection_service__WEBPACK_IMPORTED_MODULE_5__["ConnectionService"] }, { type: _alert_service__WEBPACK_IMPORTED_MODULE_6__["AlertService"] }, { type: _tezos_service__WEBPACK_IMPORTED_MODULE_7__["TezosService"] }, { type: _waiter_service__WEBPACK_IMPORTED_MODULE_8__["WaiterService"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] }, { type: _user_service__WEBPACK_IMPORTED_MODULE_9__["UserService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/modal.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/modal.service.ts ***!
  \********************************************/
/*! exports provided: ModalService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ModalService", function() { return ModalService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");



class ModalService {
    constructor() {
        this.opened = false;
        this.componentClass = undefined;
        this.onShow = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
        this.onClose = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
    }
    showModal(componentClass, argsMap) {
        this.componentClass = componentClass;
        this.onShow.emit({ componentClass: this.componentClass, argsMap });
        this.opened = true;
        return new Promise((resolve, reject) => {
            const subscription = this.onClose.subscribe((value) => {
                subscription.unsubscribe();
                resolve(value);
            }, err => reject(err));
        });
    }
    hideModal(value) {
        this.opened = false;
        this.onClose.next(value);
    }
}
ModalService.ɵfac = function ModalService_Factory(t) { return new (t || ModalService)(); };
ModalService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ModalService, factory: ModalService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ModalService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_services/progress-bar.service.ts":
/*!***************************************************!*\
  !*** ./src/app/_services/progress-bar.service.ts ***!
  \***************************************************/
/*! exports provided: ProgressBarService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProgressBarService", function() { return ProgressBarService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");


class ProgressBarService {
    constructor() {
        this.loopingIsHidden = true;
        this.progressIsHidden = true;
    }
    setProgress(progressValue, max, displayValue) {
        this.progressValue = progressValue,
            this.max = max;
        this.displayValue = displayValue ? displayValue : progressValue.toString();
        this.progressIsHidden = false;
    }
    hideProgress() {
        this.progressIsHidden = true;
    }
    showLooping() {
        this.loopingIsHidden = false;
    }
    hideLooping() {
        this.loopingIsHidden = true;
    }
}
ProgressBarService.ɵfac = function ProgressBarService_Factory(t) { return new (t || ProgressBarService)(); };
ProgressBarService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: ProgressBarService, factory: ProgressBarService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProgressBarService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/_services/spaces.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/spaces.service.ts ***!
  \*********************************************/
/*! exports provided: eSpaceType, eStartupType, SpacesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eSpaceType", function() { return eSpaceType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eStartupType", function() { return eStartupType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpacesService", function() { return SpacesService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./alert.service */ "./src/app/_services/alert.service.ts");




var eSpaceType;
(function (eSpaceType) {
    eSpaceType["GENESIS"] = "GENESIS";
    eSpaceType["COVID"] = "COVID";
    eSpaceType["QUARANTINE"] = "QUARANTINE";
    eSpaceType["CHANCE"] = "CHANCE";
    eSpaceType["COMMUNITY"] = "COMMUNITY";
    eSpaceType["MINING_FARM"] = "MINING_FARM";
    eSpaceType["BAKERY"] = "BAKERY";
    eSpaceType["MARKETPLACE"] = "MARKETPLACE";
    eSpaceType["EXCHANGE"] = "EXCHANGE";
    eSpaceType["STARTUP"] = "STARTUP";
})(eSpaceType || (eSpaceType = {}));
var eStartupType;
(function (eStartupType) {
    eStartupType["MINING_FARM"] = "MINING_FARM";
    eStartupType["BAKERY"] = "BAKERY";
    eStartupType["MARKETPLACE"] = "MARKETPLACE";
    eStartupType["EXCHANGE"] = "EXCHANGE";
    eStartupType["FIN_TECH"] = "FIN_TECH";
    eStartupType["LAW_TECH"] = "LAW_TECH";
    eStartupType["BIO_TECH"] = "BIO_TECH";
    eStartupType["EDUCATION"] = "EDUCATION";
    eStartupType["HW_WALLET"] = "HW_WALLET";
    eStartupType["GAME"] = "GAME";
    eStartupType["SOCIAL"] = "SOCIAL";
})(eStartupType || (eStartupType = {}));
class SpacesService {
    constructor(apiService, alertService) {
        this.apiService = apiService;
        this.alertService = alertService;
        this.spaces = [];
    }
    getSpaces() {
        return new Promise((resolve, reject) => {
            if (this.spaces.length === 0) {
                this.apiService.get('space').subscribe((spaces) => {
                    this.spaces = spaces;
                    resolve(this.spaces);
                }, err => reject(err));
            }
            else {
                resolve(this.spaces);
            }
        });
    }
}
SpacesService.ɵfac = function SpacesService_Factory(t) { return new (t || SpacesService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"])); };
SpacesService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: SpacesService, factory: SpacesService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](SpacesService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"] }, { type: _alert_service__WEBPACK_IMPORTED_MODULE_2__["AlertService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/tezos.service.ts":
/*!********************************************!*\
  !*** ./src/app/_services/tezos.service.ts ***!
  \********************************************/
/*! exports provided: TezosService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TezosService", function() { return TezosService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _tezos_src_tezos_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../tezos/src/tezos.service */ "../tezos/src/tezos.service.ts");
/* harmony import */ var src_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/constants */ "./src/constants.ts");
/* harmony import */ var _waiter_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./waiter.service */ "./src/app/_services/waiter.service.ts");






class TezosService {
    constructor(waiterService) {
        this.waiterService = waiterService;
        this._initialized = false;
        this._connected = false;
        this._account = undefined;
        this._networkInfo = undefined;
        this._keyStore = undefined;
        this.isConnecting = false;
    }
    get isConnected() {
        return this._connected;
    }
    get network() {
        return this._networkInfo ? this._networkInfo.network : '-';
    }
    get account() {
        return this._account;
    }
    get keyStore() {
        return this._keyStore;
    }
    initialize() {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            const waiterTask = this.waiterService.addTask();
            try {
                const networks = yield _tezos_src_tezos_service__WEBPACK_IMPORTED_MODULE_2__["tezosService"].getNetworks();
                if (networks.length === 0) {
                    throw new Error('No Tezos network found');
                }
                this._networkInfo = networks[0];
                const localStoredWallet = localStorage.getItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].WALLET);
                if (localStoredWallet) {
                    try {
                        yield this.submitWallet(JSON.parse(localStoredWallet));
                        console.log("Wallet successfully restored from loaclStorage");
                    }
                    catch (err) {
                        console.warn('Unable to restore wallet from localStorage ->  clear localStorage', err);
                        localStorage.removeItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].WALLET);
                    }
                }
                this._initialized = true;
            }
            finally {
                this.waiterService.removeTask(waiterTask);
            }
        });
    }
    connect(walletFile) {
        return new Promise((resolve, reject) => {
            this.isConnecting = true;
            const waiterTask = this.waiterService.addTask();
            new Promise((resolve2, reject2) => {
                if (!this._initialized) {
                    this.initialize().then(() => {
                        resolve2();
                    }).catch(err => reject2(err));
                }
                else {
                    resolve2();
                }
            }).then(() => {
                const fileReader = new FileReader();
                fileReader.onload = (e) => {
                    console.log('read file', fileReader.result);
                    this.submitWallet(JSON.parse(fileReader.result)).then(() => {
                        this.isConnecting = false;
                        resolve();
                    }).catch(err => {
                        reject(err);
                    }).finally(() => {
                        this.isConnecting = false;
                        this.waiterService.removeTask(waiterTask);
                    });
                };
                fileReader.readAsText(walletFile);
            }).catch(err => {
                this.isConnecting = false;
                this.waiterService.removeTask(waiterTask);
                reject(err);
            });
        });
    }
    submitWallet(wallet) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                _tezos_src_tezos_service__WEBPACK_IMPORTED_MODULE_2__["tezosService"].getAccountFromIdentity(wallet).then((keyStore) => {
                    localStorage.setItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].WALLET, JSON.stringify(wallet));
                    this.refreshInfo(keyStore);
                    resolve();
                }).catch(err => reject(err));
            });
        });
    }
    refreshInfo(keyStore) {
        if (keyStore) {
            _tezos_src_tezos_service__WEBPACK_IMPORTED_MODULE_2__["tezosService"].accountInfo(keyStore.publicKeyHash).then((accountInfos) => {
                if (accountInfos.length !== 1) {
                    throw new Error(`No account info or more than one for address ${keyStore.publicKeyHash}: nb results:${accountInfos.length}`);
                }
                this._keyStore = keyStore;
                this._account = accountInfos[0];
                this._connected = true;
            });
        }
        else {
            this._connected = false;
            this._account = undefined;
            this._keyStore = undefined;
        }
    }
    logout() {
        localStorage.removeItem(src_constants__WEBPACK_IMPORTED_MODULE_3__["eLocalStorageDataKey"].WALLET);
        this.refreshInfo(undefined);
    }
}
TezosService.ɵfac = function TezosService_Factory(t) { return new (t || TezosService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_waiter_service__WEBPACK_IMPORTED_MODULE_4__["WaiterService"])); };
TezosService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: TezosService, factory: TezosService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](TezosService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _waiter_service__WEBPACK_IMPORTED_MODULE_4__["WaiterService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/turn.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/turn.service.ts ***!
  \*******************************************/
/*! exports provided: TurnService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TurnService", function() { return TurnService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _spaces_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./spaces.service */ "./src/app/_services/spaces.service.ts");
/* harmony import */ var _game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var _tezos_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tezos.service */ "./src/app/_services/tezos.service.ts");
/* harmony import */ var _modal_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modal.service */ "./src/app/_services/modal.service.ts");
/* harmony import */ var _alert_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./alert.service */ "./src/app/_services/alert.service.ts");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");









class TurnService {
    constructor(gameService, tezosService, modalService, alertService, spaceService, apiService) {
        this.gameService = gameService;
        this.tezosService = tezosService;
        this.modalService = modalService;
        this.alertService = alertService;
        this.spaceService = spaceService;
        this.apiService = apiService;
        this.spaces = [];
        this.chances = [];
        this.community_chests = [];
        this.spaceService.getSpaces().then((spaces) => {
            this.spaces = spaces.sort((a, b) => a.spaceId - b.spaceId);
        });
        this.apiService.get('card/chance').subscribe((cards) => {
            this.chances = cards.sort((a, b) => a.cardId - b.cardId);
        }, err => alertService.error(err));
        this.apiService.get('card/cc').subscribe((cards) => {
            this.community_chests = cards.sort((a, b) => a.cardId - b.cardId);
        }, err => alertService.error(err));
        this.gameService.onPlayerMove.subscribe(({ player, newPosition, oldPosition }) => {
            if (player === tezosService.account.account_id) {
                const space = this.spaces[newPosition];
                switch (space.type) {
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].COMMUNITY:
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].CHANCE: {
                        // TODO: get the cardId from the rollDices request and get the Chance/Community card
                        // Then, display the card with 'Apply' button.
                        // modalService.showModal(CardDetailsModalComponent, {card}).then(() => {
                        // });
                        // On apply call Game smart contract that will call Card contract and complete the turn
                        break;
                    }
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].GENESIS: {
                        // display the card details with 'Apply' button.
                        // modalService.showModal(SpaceDetailsModalComponent, {space}).then(() => {
                        // });
                        // On apply, call Game smart contract, that will mint money for the player and complete the turn
                        break;
                    }
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].COVID: {
                        // display the card details with 'Apply' button.
                        // Check if the player owns immunity passport. If yes, do nothing
                        // modalService.showModal(SpaceDetailsModalComponent, {space}).then(() => {
                        // });
                        // On apply, call Game smart contract, that will move the player into quarantine and complete the turn
                        break;
                    }
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].QUARANTINE: {
                        // display the card details with 'Apply' button.
                        // modalService.showModal(SpaceDetailsModalComponent, {space}).then(() => {
                        // });
                        // On apply, just call Game contract to complete the turn
                        break;
                    }
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].BAKERY:
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].EXCHANGE:
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].MARKETPLACE:
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].MINING_FARM:
                    case _spaces_service__WEBPACK_IMPORTED_MODULE_1__["eSpaceType"].STARTUP: {
                        // display the card details with buttons:
                        // - 'Buy' if the assets is available (no owner or on sale on the marketplace) and if the player has enough money.
                        // - 'Ignore' if the assets is available (no owner or on sale on the marketplace)
                        // - 'Pay Rent' if the assets is owned (refresh the rentRate by looking into asset smart contract storage)
                        // modalService.showModal(SpaceDetailsModalComponent, {space}).then(() => {
                        // });
                        // On option chosen, call Game contract that will  to complete the turn
                        break;
                    }
                }
            }
        }, err => alertService.error(err));
    }
}
TurnService.ɵfac = function TurnService_Factory(t) { return new (t || TurnService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_tezos_service__WEBPACK_IMPORTED_MODULE_3__["TezosService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_spaces_service__WEBPACK_IMPORTED_MODULE_1__["SpacesService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"])); };
TurnService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TurnService, factory: TurnService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](TurnService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }, { type: _tezos_service__WEBPACK_IMPORTED_MODULE_3__["TezosService"] }, { type: _modal_service__WEBPACK_IMPORTED_MODULE_4__["ModalService"] }, { type: _alert_service__WEBPACK_IMPORTED_MODULE_5__["AlertService"] }, { type: _spaces_service__WEBPACK_IMPORTED_MODULE_1__["SpacesService"] }, { type: _api_service__WEBPACK_IMPORTED_MODULE_6__["ApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/user.service.ts":
/*!*******************************************!*\
  !*** ./src/app/_services/user.service.ts ***!
  \*******************************************/
/*! exports provided: UserService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserService", function() { return UserService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./api.service */ "./src/app/_services/api.service.ts");




class UserService {
    constructor(apiService) {
        this.apiService = apiService;
        this.users = new Map();
    }
    getUser(tezosAccountId) {
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (this.users.has(tezosAccountId)) {
                    resolve(this.users.get(tezosAccountId));
                }
                else {
                    this.apiService.get(`user/${tezosAccountId}`).subscribe((user) => {
                        this.users.set(tezosAccountId, user);
                        resolve(user);
                    }, err => reject(err));
                }
            });
        });
    }
}
UserService.ɵfac = function UserService_Factory(t) { return new (t || UserService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"])); };
UserService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: UserService, factory: UserService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](UserService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: _api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/_services/waiter.service.ts":
/*!*********************************************!*\
  !*** ./src/app/_services/waiter.service.ts ***!
  \*********************************************/
/*! exports provided: WaiterService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WaiterService", function() { return WaiterService; });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");



class WaiterService {
    constructor() {
        this._isWaiting = false;
        this._tasks = new Map();
    }
    get isWaiting() {
        return this._isWaiting;
    }
    init() {
        this._tasks = new Map();
    }
    addTask() {
        const id = Object(uuid__WEBPACK_IMPORTED_MODULE_0__["v4"])();
        this._tasks.set(id, id);
        if (this._tasks.size === 1) {
            this.startWaiting();
        }
        return id;
    }
    removeTask(id) {
        this._tasks.delete(id);
        console.log("ENDING TASK ", id);
        if (this._tasks.size === 0) {
            this.stopWaiting();
        }
    }
    stopWaiting() {
        console.log("STOP WAITING");
        this._isWaiting = false;
    }
    startWaiting() {
        console.log("START WAITING");
        this._isWaiting = true;
    }
}
WaiterService.ɵfac = function WaiterService_Factory(t) { return new (t || WaiterService)(); };
WaiterService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({ token: WaiterService, factory: WaiterService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](WaiterService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
/* harmony import */ var _components_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_components/welcome/welcome.component */ "./src/app/_components/welcome/welcome.component.ts");
/* harmony import */ var _components_game_game_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./_components/game/game.component */ "./src/app/_components/game/game.component.ts");
/* harmony import */ var _components_overview_overview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./_components/overview/overview.component */ "./src/app/_components/overview/overview.component.ts");







const routes = [
    { path: '', component: _components_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_2__["WelcomeComponent"] },
    { path: 'game', component: _components_game_game_component__WEBPACK_IMPORTED_MODULE_3__["GameComponent"] },
    { path: 'overview', component: _components_overview_overview_component__WEBPACK_IMPORTED_MODULE_4__["OverviewComponent"] },
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
                imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
                exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
            }]
    }], null, null); })();


/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _services_connection_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./_services/connection.service */ "./src/app/_services/connection.service.ts");
/* harmony import */ var _services_game_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./_services/game.service */ "./src/app/_services/game.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");





class AppComponent {
    constructor(connectionService, gameService) {
        this.connectionService = connectionService;
        this.gameService = gameService;
        this.title = 'Crypto &Fscr;antazia';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_connection_service__WEBPACK_IMPORTED_MODULE_1__["ConnectionService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"])); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"] });
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
                selector: 'app-root',
                templateUrl: './app.component.html',
                styleUrls: ['./app.component.scss']
            }]
    }], function () { return [{ type: _services_connection_service__WEBPACK_IMPORTED_MODULE_1__["ConnectionService"] }, { type: _services_game_service__WEBPACK_IMPORTED_MODULE_2__["GameService"] }]; }, null); })();


/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/flex-layout */ "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex-layout.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
/* harmony import */ var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material/toolbar */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/toolbar.js");
/* harmony import */ var _angular_material_input__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material/input */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/input.js");
/* harmony import */ var _angular_material_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material/card */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/card.js");
/* harmony import */ var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/material/menu */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/menu.js");
/* harmony import */ var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/material/icon */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
/* harmony import */ var _angular_material_button__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/material/button */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
/* harmony import */ var _angular_material_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material/table */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
/* harmony import */ var _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/material/divider */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/divider.js");
/* harmony import */ var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/material/slide-toggle */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/slide-toggle.js");
/* harmony import */ var _angular_material_select__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material/select */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/select.js");
/* harmony import */ var _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/progress-spinner */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/progress-spinner.js");
/* harmony import */ var ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ngx-material-file-input */ "./node_modules/ngx-material-file-input/__ivy_ngcc__/fesm2015/ngx-material-file-input.js");
/* harmony import */ var ngx_responsive__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ngx-responsive */ "./node_modules/ngx-responsive/__ivy_ngcc__/fesm2015/ngx-responsive.js");
/* harmony import */ var _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/material/sidenav */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sidenav.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _clr_angular__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @clr/angular */ "./node_modules/@clr/angular/__ivy_ngcc__/fesm2015/clr-angular.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/animations.js");
/* harmony import */ var _components_alert_alert_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./_components/alert/alert.component */ "./src/app/_components/alert/alert.component.ts");
/* harmony import */ var _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./_components/progress-bar/progress-bar.component */ "./src/app/_components/progress-bar/progress-bar.component.ts");
/* harmony import */ var _components_dock_container_dock_container_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./_components/dock-container/dock-container.component */ "./src/app/_components/dock-container/dock-container.component.ts");
/* harmony import */ var _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./_components/modal/modal.component */ "./src/app/_components/modal/modal.component.ts");
/* harmony import */ var _components_modal_example_modal_example_component__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./_components/modal-example/modal-example.component */ "./src/app/_components/modal-example/modal-example.component.ts");
/* harmony import */ var _directives_modal_directive__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./_directives/modal.directive */ "./src/app/_directives/modal.directive.ts");
/* harmony import */ var _components_dummy_content_dummy_content_component__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./_components/dummy-content/dummy-content.component */ "./src/app/_components/dummy-content/dummy-content.component.ts");
/* harmony import */ var _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./_components/footer/footer.component */ "./src/app/_components/footer/footer.component.ts");
/* harmony import */ var _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./_components/nav-bar/nav-bar.component */ "./src/app/_components/nav-bar/nav-bar.component.ts");
/* harmony import */ var _components_sub_nav_bar_sub_nav_bar_component__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./_components/sub-nav-bar/sub-nav-bar.component */ "./src/app/_components/sub-nav-bar/sub-nav-bar.component.ts");
/* harmony import */ var _components_header_header_component__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./_components/header/header.component */ "./src/app/_components/header/header.component.ts");
/* harmony import */ var _components_vertical_left_bar_vertical_left_bar_component__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./_components/vertical-left-bar/vertical-left-bar.component */ "./src/app/_components/vertical-left-bar/vertical-left-bar.component.ts");
/* harmony import */ var _components_connection_page_connection_page_component__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./_components/connection-page/connection-page.component */ "./src/app/_components/connection-page/connection-page.component.ts");
/* harmony import */ var _components_waiter_waiter_component__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./_components/waiter/waiter.component */ "./src/app/_components/waiter/waiter.component.ts");
/* harmony import */ var _components_fanta_symbol_fanta_symbol_component__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./_components/fanta-symbol/fanta-symbol.component */ "./src/app/_components/fanta-symbol/fanta-symbol.component.ts");
/* harmony import */ var _components_tezos_connect_tezos_connect_component__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./_components/tezos-connect/tezos-connect.component */ "./src/app/_components/tezos-connect/tezos-connect.component.ts");
/* harmony import */ var _components_choose_session_dialog_choose_session_dialog_component__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ./_components/choose-session-dialog/choose-session-dialog.component */ "./src/app/_components/choose-session-dialog/choose-session-dialog.component.ts");
/* harmony import */ var _components_game_status_game_status_component__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! ./_components/game-status/game-status.component */ "./src/app/_components/game-status/game-status.component.ts");
/* harmony import */ var _components_game_failure_page_game_failure_page_component__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! ./_components/game-failure-page/game-failure-page.component */ "./src/app/_components/game-failure-page/game-failure-page.component.ts");
/* harmony import */ var _components_game_creation_page_game_creation_page_component__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ./_components/game-creation-page/game-creation-page.component */ "./src/app/_components/game-creation-page/game-creation-page.component.ts");
/* harmony import */ var _components_playground_page_playground_page_component__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! ./_components/playground-page/playground-page.component */ "./src/app/_components/playground-page/playground-page.component.ts");
/* harmony import */ var _components_game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ./_components/game-over-page/game-over-page.component */ "./src/app/_components/game-over-page/game-over-page.component.ts");
/* harmony import */ var _components_players_list_players_list_component__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! ./_components/players-list/players-list.component */ "./src/app/_components/players-list/players-list.component.ts");
/* harmony import */ var _components_player_treenode_player_treenode_component__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! ./_components/player-treenode/player-treenode.component */ "./src/app/_components/player-treenode/player-treenode.component.ts");
/* harmony import */ var _components_history_history_component__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! ./_components/history/history.component */ "./src/app/_components/history/history.component.ts");
/* harmony import */ var _components_spaces_spaces_component__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! ./_components/spaces/spaces.component */ "./src/app/_components/spaces/spaces.component.ts");
/* harmony import */ var _components_space_details_space_details_component__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! ./_components/space-details/space-details.component */ "./src/app/_components/space-details/space-details.component.ts");
/* harmony import */ var _components_space_details_modal_space_details_modal_component__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! ./_components/space-details-modal/space-details-modal.component */ "./src/app/_components/space-details-modal/space-details-modal.component.ts");
/* harmony import */ var _components_dice_dice_component__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! ./_components/dice/dice.component */ "./src/app/_components/dice/dice.component.ts");
/* harmony import */ var _components_carousel_carousel_component__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! ./_components/carousel/carousel.component */ "./src/app/_components/carousel/carousel.component.ts");
/* harmony import */ var _components_player_portfolio_player_portfolio_component__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! ./_components/player-portfolio/player-portfolio.component */ "./src/app/_components/player-portfolio/player-portfolio.component.ts");
/* harmony import */ var _components_space_card_space_card_component__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! ./_components/space-card/space-card.component */ "./src/app/_components/space-card/space-card.component.ts");
/* harmony import */ var _components_wealth_indicator_wealth_indicator_component__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! ./_components/wealth-indicator/wealth-indicator.component */ "./src/app/_components/wealth-indicator/wealth-indicator.component.ts");
/* harmony import */ var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @angular/material/tooltip */ "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");
/* harmony import */ var _components_carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! ./_components/carousel/carousel-item.directive */ "./src/app/_components/carousel/carousel-item.directive.ts");
/* harmony import */ var _components_carousel_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! ./_components/carousel/carousel-item-element.directive */ "./src/app/_components/carousel/carousel-item-element.directive.ts");
/* harmony import */ var _components_board_board_component__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! ./_components/board/board.component */ "./src/app/_components/board/board.component.ts");
/* harmony import */ var _components_game_controls_game_controls_component__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! ./_components/game-controls/game-controls.component */ "./src/app/_components/game-controls/game-controls.component.ts");
/* harmony import */ var _components_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! ./_components/welcome/welcome.component */ "./src/app/_components/welcome/welcome.component.ts");
/* harmony import */ var _components_game_game_component__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! ./_components/game/game.component */ "./src/app/_components/game/game.component.ts");
/* harmony import */ var _components_overview_overview_component__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! ./_components/overview/overview.component */ "./src/app/_components/overview/overview.component.ts");
/* harmony import */ var _components_game_status_modal_game_status_modal_component__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! ./_components/game-status-modal/game-status-modal.component */ "./src/app/_components/game-status-modal/game-status-modal.component.ts");
/* harmony import */ var _services_turn_service__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! ./_services/turn.service */ "./src/app/_services/turn.service.ts");




































































class AppModule {
    constructor(turnService // to be sure the service is instantiated
    ) {
        this.turnService = turnService;
    }
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_services_turn_service__WEBPACK_IMPORTED_MODULE_65__["TurnService"])); }, providers: [], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_19__["AppRoutingModule"],
            _clr_angular__WEBPACK_IMPORTED_MODULE_21__["ClarityModule"],
            _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
            _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
            _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
            _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
            _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"],
            _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
            _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
            _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
            _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__["MatDividerModule"],
            _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"],
            _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
            _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__["MatProgressSpinnerModule"],
            ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__["MaterialFileInputModule"],
            _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_56__["MatTooltipModule"],
            ngx_responsive__WEBPACK_IMPORTED_MODULE_17__["ResponsiveModule"].forRoot(),
            _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__["MatSidenavModule"]
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"],
        _components_alert_alert_component__WEBPACK_IMPORTED_MODULE_23__["AlertComponent"],
        _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_24__["ProgressBarComponent"],
        _components_dock_container_dock_container_component__WEBPACK_IMPORTED_MODULE_25__["DockContainerComponent"],
        _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_26__["ModalComponent"],
        _components_modal_example_modal_example_component__WEBPACK_IMPORTED_MODULE_27__["ModalExampleComponent"],
        _directives_modal_directive__WEBPACK_IMPORTED_MODULE_28__["ModalDirective"],
        _components_dummy_content_dummy_content_component__WEBPACK_IMPORTED_MODULE_29__["DummyContentComponent"],
        _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_30__["FooterComponent"],
        _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_31__["NavBarComponent"],
        _components_sub_nav_bar_sub_nav_bar_component__WEBPACK_IMPORTED_MODULE_32__["SubNavBarComponent"],
        _components_header_header_component__WEBPACK_IMPORTED_MODULE_33__["HeaderComponent"],
        _components_vertical_left_bar_vertical_left_bar_component__WEBPACK_IMPORTED_MODULE_34__["VerticalLeftBarComponent"],
        _components_connection_page_connection_page_component__WEBPACK_IMPORTED_MODULE_35__["ConnectionPageComponent"],
        _components_waiter_waiter_component__WEBPACK_IMPORTED_MODULE_36__["WaiterComponent"],
        _components_fanta_symbol_fanta_symbol_component__WEBPACK_IMPORTED_MODULE_37__["FantaSymbolComponent"],
        _components_tezos_connect_tezos_connect_component__WEBPACK_IMPORTED_MODULE_38__["TezosConnectComponent"],
        _components_choose_session_dialog_choose_session_dialog_component__WEBPACK_IMPORTED_MODULE_39__["ChooseSessionDialogComponent"],
        _components_game_status_game_status_component__WEBPACK_IMPORTED_MODULE_40__["GameStatusComponent"],
        _components_game_failure_page_game_failure_page_component__WEBPACK_IMPORTED_MODULE_41__["GameFailurePageComponent"],
        _components_game_creation_page_game_creation_page_component__WEBPACK_IMPORTED_MODULE_42__["GameCreationPageComponent"],
        _components_playground_page_playground_page_component__WEBPACK_IMPORTED_MODULE_43__["PlaygroundPageComponent"],
        _components_game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_44__["GameOverPageComponent"],
        _components_players_list_players_list_component__WEBPACK_IMPORTED_MODULE_45__["PlayersListComponent"],
        _components_player_treenode_player_treenode_component__WEBPACK_IMPORTED_MODULE_46__["PlayerTreenodeComponent"],
        _components_history_history_component__WEBPACK_IMPORTED_MODULE_47__["HistoryComponent"],
        _components_spaces_spaces_component__WEBPACK_IMPORTED_MODULE_48__["SpacesComponent"],
        _components_space_details_space_details_component__WEBPACK_IMPORTED_MODULE_49__["SpaceDetailsComponent"],
        _components_space_details_modal_space_details_modal_component__WEBPACK_IMPORTED_MODULE_50__["SpaceDetailsModalComponent"],
        _components_dice_dice_component__WEBPACK_IMPORTED_MODULE_51__["DiceComponent"],
        _components_carousel_carousel_component__WEBPACK_IMPORTED_MODULE_52__["CarouselComponent"],
        _components_player_portfolio_player_portfolio_component__WEBPACK_IMPORTED_MODULE_53__["PlayerPortfolioComponent"],
        _components_space_card_space_card_component__WEBPACK_IMPORTED_MODULE_54__["SpaceCardComponent"],
        _components_wealth_indicator_wealth_indicator_component__WEBPACK_IMPORTED_MODULE_55__["WealthIndicatorComponent"],
        _components_carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_57__["CarouselItemDirective"],
        _components_carousel_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_58__["CarouselItemElementDirective"],
        _components_board_board_component__WEBPACK_IMPORTED_MODULE_59__["BoardComponent"],
        _components_game_controls_game_controls_component__WEBPACK_IMPORTED_MODULE_60__["GameControlsComponent"],
        _components_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_61__["WelcomeComponent"],
        _components_game_game_component__WEBPACK_IMPORTED_MODULE_62__["GameComponent"],
        _components_overview_overview_component__WEBPACK_IMPORTED_MODULE_63__["OverviewComponent"],
        _components_game_status_modal_game_status_modal_component__WEBPACK_IMPORTED_MODULE_64__["GameStatusModalComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _app_routing_module__WEBPACK_IMPORTED_MODULE_19__["AppRoutingModule"],
        _clr_angular__WEBPACK_IMPORTED_MODULE_21__["ClarityModule"],
        _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
        _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
        _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
        _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
        _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
        _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
        _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"],
        _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
        _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
        _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
        _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__["MatDividerModule"],
        _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"],
        _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
        _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__["MatProgressSpinnerModule"],
        ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__["MaterialFileInputModule"],
        _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_56__["MatTooltipModule"], ngx_responsive__WEBPACK_IMPORTED_MODULE_17__["ResponsiveModule"], _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__["MatSidenavModule"]] }); })();
/*@__PURE__*/ (function () { _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
                declarations: [
                    _app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"],
                    _components_alert_alert_component__WEBPACK_IMPORTED_MODULE_23__["AlertComponent"],
                    _components_progress_bar_progress_bar_component__WEBPACK_IMPORTED_MODULE_24__["ProgressBarComponent"],
                    _components_dock_container_dock_container_component__WEBPACK_IMPORTED_MODULE_25__["DockContainerComponent"],
                    _components_modal_modal_component__WEBPACK_IMPORTED_MODULE_26__["ModalComponent"],
                    _components_modal_example_modal_example_component__WEBPACK_IMPORTED_MODULE_27__["ModalExampleComponent"],
                    _directives_modal_directive__WEBPACK_IMPORTED_MODULE_28__["ModalDirective"],
                    _components_dummy_content_dummy_content_component__WEBPACK_IMPORTED_MODULE_29__["DummyContentComponent"],
                    _components_footer_footer_component__WEBPACK_IMPORTED_MODULE_30__["FooterComponent"],
                    _components_nav_bar_nav_bar_component__WEBPACK_IMPORTED_MODULE_31__["NavBarComponent"],
                    _components_sub_nav_bar_sub_nav_bar_component__WEBPACK_IMPORTED_MODULE_32__["SubNavBarComponent"],
                    _components_header_header_component__WEBPACK_IMPORTED_MODULE_33__["HeaderComponent"],
                    _components_vertical_left_bar_vertical_left_bar_component__WEBPACK_IMPORTED_MODULE_34__["VerticalLeftBarComponent"],
                    _components_connection_page_connection_page_component__WEBPACK_IMPORTED_MODULE_35__["ConnectionPageComponent"],
                    _components_waiter_waiter_component__WEBPACK_IMPORTED_MODULE_36__["WaiterComponent"],
                    _components_fanta_symbol_fanta_symbol_component__WEBPACK_IMPORTED_MODULE_37__["FantaSymbolComponent"],
                    _components_tezos_connect_tezos_connect_component__WEBPACK_IMPORTED_MODULE_38__["TezosConnectComponent"],
                    _components_choose_session_dialog_choose_session_dialog_component__WEBPACK_IMPORTED_MODULE_39__["ChooseSessionDialogComponent"],
                    _components_game_status_game_status_component__WEBPACK_IMPORTED_MODULE_40__["GameStatusComponent"],
                    _components_game_failure_page_game_failure_page_component__WEBPACK_IMPORTED_MODULE_41__["GameFailurePageComponent"],
                    _components_game_creation_page_game_creation_page_component__WEBPACK_IMPORTED_MODULE_42__["GameCreationPageComponent"],
                    _components_playground_page_playground_page_component__WEBPACK_IMPORTED_MODULE_43__["PlaygroundPageComponent"],
                    _components_game_over_page_game_over_page_component__WEBPACK_IMPORTED_MODULE_44__["GameOverPageComponent"],
                    _components_players_list_players_list_component__WEBPACK_IMPORTED_MODULE_45__["PlayersListComponent"],
                    _components_player_treenode_player_treenode_component__WEBPACK_IMPORTED_MODULE_46__["PlayerTreenodeComponent"],
                    _components_history_history_component__WEBPACK_IMPORTED_MODULE_47__["HistoryComponent"],
                    _components_spaces_spaces_component__WEBPACK_IMPORTED_MODULE_48__["SpacesComponent"],
                    _components_space_details_space_details_component__WEBPACK_IMPORTED_MODULE_49__["SpaceDetailsComponent"],
                    _components_space_details_modal_space_details_modal_component__WEBPACK_IMPORTED_MODULE_50__["SpaceDetailsModalComponent"],
                    _components_dice_dice_component__WEBPACK_IMPORTED_MODULE_51__["DiceComponent"],
                    _components_carousel_carousel_component__WEBPACK_IMPORTED_MODULE_52__["CarouselComponent"],
                    _components_player_portfolio_player_portfolio_component__WEBPACK_IMPORTED_MODULE_53__["PlayerPortfolioComponent"],
                    _components_space_card_space_card_component__WEBPACK_IMPORTED_MODULE_54__["SpaceCardComponent"],
                    _components_wealth_indicator_wealth_indicator_component__WEBPACK_IMPORTED_MODULE_55__["WealthIndicatorComponent"],
                    _components_carousel_carousel_item_directive__WEBPACK_IMPORTED_MODULE_57__["CarouselItemDirective"],
                    _components_carousel_carousel_item_element_directive__WEBPACK_IMPORTED_MODULE_58__["CarouselItemElementDirective"],
                    _components_board_board_component__WEBPACK_IMPORTED_MODULE_59__["BoardComponent"],
                    _components_game_controls_game_controls_component__WEBPACK_IMPORTED_MODULE_60__["GameControlsComponent"],
                    _components_welcome_welcome_component__WEBPACK_IMPORTED_MODULE_61__["WelcomeComponent"],
                    _components_game_game_component__WEBPACK_IMPORTED_MODULE_62__["GameComponent"],
                    _components_overview_overview_component__WEBPACK_IMPORTED_MODULE_63__["OverviewComponent"],
                    _components_game_status_modal_game_status_modal_component__WEBPACK_IMPORTED_MODULE_64__["GameStatusModalComponent"]
                ],
                imports: [
                    _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                    _app_routing_module__WEBPACK_IMPORTED_MODULE_19__["AppRoutingModule"],
                    _clr_angular__WEBPACK_IMPORTED_MODULE_21__["ClarityModule"],
                    _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_22__["BrowserAnimationsModule"],
                    _angular_flex_layout__WEBPACK_IMPORTED_MODULE_2__["FlexLayoutModule"],
                    _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClientModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
                    _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
                    _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbarModule"],
                    _angular_material_input__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                    _angular_material_card__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                    _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuModule"],
                    _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIconModule"],
                    _angular_material_button__WEBPACK_IMPORTED_MODULE_10__["MatButtonModule"],
                    _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatTableModule"],
                    _angular_material_divider__WEBPACK_IMPORTED_MODULE_12__["MatDividerModule"],
                    _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_13__["MatSlideToggleModule"],
                    _angular_material_select__WEBPACK_IMPORTED_MODULE_14__["MatSelectModule"],
                    _angular_material_progress_spinner__WEBPACK_IMPORTED_MODULE_15__["MatProgressSpinnerModule"],
                    ngx_material_file_input__WEBPACK_IMPORTED_MODULE_16__["MaterialFileInputModule"],
                    _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_56__["MatTooltipModule"],
                    ngx_responsive__WEBPACK_IMPORTED_MODULE_17__["ResponsiveModule"].forRoot(),
                    _angular_material_sidenav__WEBPACK_IMPORTED_MODULE_18__["MatSidenavModule"]
                ],
                providers: [],
                bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_20__["AppComponent"]],
                entryComponents: [
                    _components_modal_example_modal_example_component__WEBPACK_IMPORTED_MODULE_27__["ModalExampleComponent"],
                    _components_choose_session_dialog_choose_session_dialog_component__WEBPACK_IMPORTED_MODULE_39__["ChooseSessionDialogComponent"],
                    _components_space_details_modal_space_details_modal_component__WEBPACK_IMPORTED_MODULE_50__["SpaceDetailsModalComponent"],
                    _components_game_status_game_status_component__WEBPACK_IMPORTED_MODULE_40__["GameStatusComponent"]
                ]
            }]
    }], function () { return [{ type: _services_turn_service__WEBPACK_IMPORTED_MODULE_65__["TurnService"] }]; }, null); })();


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/*! exports provided: eLocalStorageDataKey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eLocalStorageDataKey", function() { return eLocalStorageDataKey; });
var eLocalStorageDataKey;
(function (eLocalStorageDataKey) {
    eLocalStorageDataKey["WALLET"] = "tezos.wallet";
    eLocalStorageDataKey["USERNAME"] = "username";
})(eLocalStorageDataKey || (eLocalStorageDataKey = {}));


/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false,
    api_url: 'http://localhost:4444'
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! hammerjs */ "./node_modules/hammerjs/hammer.js");
/* harmony import */ var hammerjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(hammerjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/__ivy_ngcc__/fesm2015/platform-browser.js");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_2__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_4__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!**********************************************************************************************************!*\
  !*** multi (webpack)-dev-server/client?http://0.0.0.0:0/sockjs-node&sockPath=/sockjs-node ./src/main.ts ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! E:\Ludo\Documents\Developpement\CryptoFantasia\www\node_modules\webpack-dev-server\client\index.js?http://0.0.0.0:0/sockjs-node&sockPath=/sockjs-node */"./node_modules/webpack-dev-server/client/index.js?http://0.0.0.0:0/sockjs-node&sockPath=/sockjs-node");
module.exports = __webpack_require__(/*! E:\Ludo\Documents\Developpement\CryptoFantasia\www\src\main.ts */"./src/main.ts");


/***/ }),

/***/ 1:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 10:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 11:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 12:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 13:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 14:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 15:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 16:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 17:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 18:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 19:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 20:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 21:
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 3:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 4:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 5:
/*!********************!*\
  !*** fs (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 6:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 7:
/*!**********************!*\
  !*** util (ignored) ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 8:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 9:
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map