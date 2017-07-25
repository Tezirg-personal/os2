const request = require('request');

/**
 * @class Store
 * @desc Describes an OpenStack Object Storage API endpoint
 * @param url {String} Object storage API url
 * @constructor
 */
function Store(url = 'http://127.0.0.1') {
    // Init member vars
    this._url = url;

    // Bind member functions
    this.getURL = Store.prototype.getURL.bind(this);
    this.setURL = Store.prototype.setURL.bind(this);
    this.info = Store.prototype.info.bind(this);
}

/**
 * @fn getURL
 * @desc Getter on url member
 * @return {String} The store url
 */
Store.prototype.getURL = function() {
    return this._url;
};

/**
 * @fn setURL
 * @desc Setter on url member
 * @param url {String} New value for url member
 * @return {String} Newly assigned value
 */
Store.prototype.setURL = function(url) {
    this._url = url;
    return this._url;
};


/**
 * @fn info
 * @desc Attempts to list activated capabilities on this Store
 * @return {Promise} Resolves to the list on success, rejects top native javascript Error otherwise
 */
Store.prototype.info = function() {
    var _this = this;

    return new Promise(function(resolve, reject) {
        var options = {
            method: 'GET',
            baseUrl: _this._url,
            uri: '/info',
            json: true
        };

        request(options, function(error, __unused__response, body) {
            if (error)
                reject(error);
            else
                resolve(body);
        });
    });
};

module.exports = Store;