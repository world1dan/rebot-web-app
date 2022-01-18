module.exports = {
    extends: ["stylelint-config-standard",
        "stylelint-config-rational-order"],
         
        
    plugins: ["stylelint-order", "stylelint-scss"],
    rules: {
        "string-quotes": "single",
        "indentation" : 4,
        "property-no-vendor-prefix": [true, { ignoreProperties: ["user-select", "backdrop-filter"] }]
    },
    
    
};