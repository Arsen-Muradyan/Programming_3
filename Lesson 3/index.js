// var os = require('os')
// //var message = 'The os is '
// function soinfo() {
//     console.log(os)
// }
// soinfo()l
let express = require('express');
var app = express();
app.get('/', (req, res) => {
    res.send("Arsen Muradyan")
})
app.listen(8000, () => {
    console.log('Server staring at 8000 ...')
})  