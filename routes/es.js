const router = require('express').Router();
const { Client } = require('@elastic/elasticsearch');

// const client = new Client({
//     node: '',
// })

const client = new Client({
    cloud: { id: process.env.cloudId },
    auth: { 
        username: process.env.username,
        password: process.env.password
    }
})

router.post('/', (req, res) => {
    client.indices.create({
        index: "products",
        settings: {
            index: {
                number_of_shards: 3,
                number_of_replicas: 2
            }
        }
    })
    .then(response => {
        if(!response) {
            return res.status(400).json({
                data: response
            })
        }

        return res.status(200).json({
            product: response
        });
    })
    .catch(err => {
        return res.status(400).json({
            msg: 'error',
            err
        })
    })

})

router.get('/products', (req, res) => { //req.query
    let query = {
        index: 'products',
        body: {
            query: {
                "bool": {
                    "must": [
                        { "match": { "region.keyword": "san" } }
                    ]
                }
            },
            aggs: {
                years: { terms: { field: "year.keyword" }}
            }
        }
    }
    client.search(query)
        .then(response=>{
            if(!response){
                return res.status(404).json({
                    product: response
            });
            }
            return res.status(200).json({
                product: response
            });
        })
        .catch(err=>{
            return res.status(500).json({
                msg: 'Error not found',
                err
            });
        });
})

router.post('/products', (req, res) => {
    let query = {
        index: 'products',
        body: {
            name: "matcha cake",
            description: "kue matcha",
            price: 20000,
            quantity: 15,
            type: "item"
        }
    }
    client.index(query)
        .then(response=>{
            if(!response){
                return res.status(404).json({
                    product: response
            });
            }
            return res.status(200).json({
                product: response
            });
        })
        .catch(err=>{
            return res.status(500).json({
                msg: 'Error not found',
                err
            });
        });
})

router.put('/products', (req, res) => {
    let query = {
        index: 'products',
        id: "jII96ocBKH_HJJwu6Z3h",
        doc: {
            name: "voucher matcha cake",
            description: "kue matcha",
            price: 20000,
            quantity: 15,
            type: "item"
        }
    }
    client.update(query)
        .then(response=>{
            if(!response){
                return res.status(404).json({
                    product: response
            });
            }
            return res.status(200).json({
                product: response
            });
        })
        .catch(err=>{
            return res.status(400).json({
                msg: 'Error not found',
                err
            });
        });
})

module.exports = router