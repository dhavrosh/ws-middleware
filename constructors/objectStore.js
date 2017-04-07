function ObjectStore(options) {
    var _store;
    var data = Object(null);
    
    ObjectStore = function ObjectStore() {
        return _store;
    };

    ObjectStore.prototype = this;

    _store = new ObjectStore();
    _store.constructor = ObjectStore;
    
    _store.ttl = options.stdTTL;
    _store.checkPeriod = options.checkperiod;

    _store.startClearing = function() {
        this.worker = setInterval(this.doChecking, this.checkPeriod);
    };

    _store.stopClearing = function() {
        clearInterval(this.worker);
    };

    _store.doChecking = function() {
       for (var key in data) {
           if (data.hasOwnProperty(key)) {
                if (data[key].deadline < Date.now()) {
                    delete data[key];
                }
           }
       }
    };

    _store.has = function(key) {
        return typeof data[key] !== 'undefined';
    };

    _store.set = function(key, obj) {
        obj.deadline = Date.now() + this.ttl;
        data[key] = obj;
    };

    _store.get = function(key) {
        // TODO: return without deadline prop
        return data[key];
    };

    _store.del = function(key) {
        delete data[key];
    };

    return _store;
}

module.exports = ObjectStore;