let express = require('express')
let app = express()
app.get('/', function(req, res){
    res.send('Hellodas')
})

app.listen(3000, () => {
    console.log('Server Starting at 3000...')
})