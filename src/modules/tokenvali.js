
const axios = require('axios')


var PrintNearestStore; // `undefined` by default
// still `undefined`, hence `module.exports.PrintNearestStore` is `undefined`
module.exports.PrintNearestStore = PrintNearestStore;

PrintNearestStore = async function(session, lat, lon) {}
// now has a function as value, but it's too late
// exports.fun1=function(){
//     return "fun1"
// }

// module.exports.fun2=function(){
//     return "fun2"
// }



// module.exports = {
//     fun1:function() {
//         return 'fun1'
//     },
//     fun2:function() {
//         return 'fun2'
//     },
//     fun3:async function() {
//         return await abcd()
//     }
// }


// async function abcd() {
//     return 'fun3'
// }