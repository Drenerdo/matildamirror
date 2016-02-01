(function(){
    
    var app = angular.module('store', []);
    
    app.controller("StoreController", function(){
        this.products = clothes;
    })
    
    var imgPath = "";
    
    var clothes = [
       {
            name: "",
            description: "",
            canPurchase : true,
            image : imgPath + ""
       },
        {
            name: "",
            description: "",
            canPurchase : true,
            image : imgPath + ""
       },
        {
            name: "",
            description: "",
            canPurchase : true,
            image : imgPath + ""
       },
        {
            name: "",
            description: "",
            canPurchase : true,
            image : imgPath + ""
       },
        {
            name: "",
            description: "",
            canPurchase : true,
            image : imgPath + ""
       },
    ]
})();