const express = require('express')
const router = express.Router()
const needle = require('needle')

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get('/', async (req, res) => {
    try {
        const { city } = req.query
        //console.log({query})
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            q: city

        })
        const apiRes = await needle('get', `${API_BASE_URL}?${params}`)

        console.log(apiRes.body)
        
        res.header("Access-Control-Allow-Origin", "*")
        res.status(200).json({data: apiRes.body})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false})
    }
})

module.exports = router