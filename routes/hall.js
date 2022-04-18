const express = require('express');
const route = express.Router();
const fromModule = require('../modules/hall')
route.get('/',fromModule.hallDetails)
route.get('/customers',fromModule.customerDetails)
route.get('/rooms',fromModule.getRooms)
route.get('/availability',fromModule.emptyRooms)
route.post('/:id/booking',fromModule.hallBooking)
route.post('/create',fromModule.createRoom)
route.delete('/:id/erase',fromModule.deleteRoom)
module.exports = route