const Mock = require('mockjs')

Mock.mock('/slider', 'get', require('./json/slider.json'))
