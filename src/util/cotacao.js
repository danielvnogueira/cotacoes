const request = require('request')

const api_token = 'BKdz9c3S733tInBTp6rRtNBVI303S7bQ5bHovLpNrwwwO1qY3lzK7sLdoHy3'

const cotacao = (symbol, callback) => {    
    
    const url = `https://www.worldtradingdata.com/api/v1/stock?symbol=${symbol}&api_token=${api_token}`
    
    request({url: url, json: true}, (err, response) =>{
        if(err){
            callback({
                mensage : `Something went wrong: ${err}`,
                code : 500
            }, undefined)
        }        
        
        if(response.body === undefined || response.body.data === undefined){
            callback({
                mensage : `No data found`,
                code : 404
            }, undefined)
        }        
        
        const parsedJSON = response.body.data[0]
        const {symbol, price_open, price, day_high, day_low} = parsedJSON

        callback(undefined, {symbol, price_open, price, day_high, day_low})
    })
}

module.exports = cotacao