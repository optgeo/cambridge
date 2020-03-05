const fs = require('fs')
const express = require('express')
const cors = require('cors')
const MBTiles = require('@mapbox/mbtiles')
const morgan = require('morgan')

const docsPath = 'docs'
const mbtilesPath = 'src/OS_Open_Zoomstack.mbtiles'
const port = 80

let mbtiles

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.static(docsPath))

const getMBTiles = async () => {
  return new Promise((resolve, reject) => {
    if (mbtiles) {
      resolve(mbtiles)
    } else {
      new MBTiles(`${mbtilesPath}?mode=ro`, (err, m)=> {
        if (err) {
          reject(new Error(`Could not open ${mbtilesPath}.`))
        } else {
          mbtiles = m
          resolve(mbtiles)
        }
      })
    }
  })
}

const getTile = async (mbtiles, z, x, y) => {
  return new Promise((resolve, reject) => {
    mbtiles.getTile(z, x, y, (err, tile, headers) => {
      if (err) {
        reject()
      } else {
        resolve({tile: tile, headers: headers})
      }
    })
  })
}
        
app.get('/zxy/:z/:x/:y.pbf', async (req, res) => {
  busy = true
  const z = parseInt(req.params.z)
  const x = parseInt(req.params.x)
  const y = parseInt(req.params.y)
  getMBTiles().then(mbtiles => {
    getTile(mbtiles, z, x, y).then(r => {
      if (r.tile) {
        res.set('content-type', 'application/vnd.mapbox-vector-tile')
        res.set('content-encoding', 'gzip')
        res.set('last-modified', r.headers['Last-Modified'])
        res.set('etag', r.headers['ETag'])
        res.send(r.tile)
        busy = false
      } else {
        res.status(404).send(`tile not found: ${z}/${x}/${y}.pbf`)
        busy = false
      }
    }).catch(e => {
      res.status(404).send(`tile not found: ${z}/${x}/${y}.pbf`)
      busy = false
    })
  }).catch(e => {
    res.status(404).send(`mbtiles not found: ${mbtilesPath}`)
  })
})
app.listen(port)
