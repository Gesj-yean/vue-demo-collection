const Mock = require('mockjs')

Mock.mock('/slider', 'get', require('./json/slider.json'))
Mock.mock('/tree', 'get', require('./json/tree.json'))
