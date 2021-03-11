var codegen = require('postman-code-generators');
var sdk = require('postman-collection');
module.exports = function (RED) {
  function postmancodegen(config) {
    RED.nodes.createNode(this, config);
    var self = this;
    this.language = config.language || "";
    this.variant = config.variant || "";
    this.api = config.api || "";
    this.on('input', function(msg) {
      var language = self.language || msg.language;
      var variant = self.variant || msg.variant;
      var api = self.api || msg.api;
      if(typeof msg.options === 'undefined'){
        msg.options = {
          indentCount: 3,
          indentType: 'Space',
          trimRequestBody: true,
          followRedirect: true
        };
      }
      if(api === 'getLanguageList'){
        msg.payload = codegen.getLanguageList();
        self.send(msg);
      }else if(api === 'getOptions'){
        codegen.getOptions(language, variant, function (error, options) {
          if (error) {
            msg.payload = error;
            self.send(msg);
          }else{
            msg.payload = options;
            self.send(msg);
          }

        });
      }else{
        // var request = new sdk.Request(msg.url);  //using postman sdk to create request
        var collection = new sdk.Collection(msg.collection);
        var results = [];
        // self.error(collection.items.all());

        collection.items.all().forEach(function (item) {
          if (item.request !== undefined){
            codegen.convert(language, variant, item.request, msg.options, function(error, snippet) {
              if (error) {
                msg.payload = error;
                self.send(msg);
              }else{
                results.push(snippet);
              }
            });
          }else{
            item.toJSON().item.forEach(function (item){
              if (item.request !== undefined){
                codegen.convert(language, variant, new sdk.Request(item.request), msg.options, function(error, snippet) {
                  if (error) {
                    self.error(error);
                  }else{
                    results.push(snippet);
                  }
                });
              }else{
                item.item.forEach(function (item){
                  if (item.request !== undefined){
                    codegen.convert(language, variant, new sdk.Request(item.request), msg.options, function(error, snippet) {
                      if (error) {
                        self.error(error);
                      }else{
                        results.push(snippet);
                      }
                    });
                  }else{

                  }
                });
              }
            });
          }
        });
        msg.payload = results;
        self.send(msg);
      }
    });
  }
  RED.nodes.registerType('postman-codegen', postmancodegen);
};
