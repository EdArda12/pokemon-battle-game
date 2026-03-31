const fs = require('fs')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()
const port = 3000

const battleFilePath = path.join(__dirname, 'data', 'battles.json')
const pokemonsPath = path.join(__dirname, 'data', 'pokemons.json')

app.use(cors())
app.use(express.json())

// ✅ Pokémon listesini JSON dosyasından oku
app.get('/api/pokemons', (req, res) => {
    fs.readFile(pokemonsPath, 'utf8', (err, data) => {
        if (err) {
            console.error('❌ pokemons.json okunamadı:', err)
            return res.status(500).json({ error: 'Veri okunamadı' })
        }

        try {
            const pokemons = JSON.parse(data)
            res.json(pokemons)
        } catch (parseErr) {
            console.error('❌ JSON parse hatası:', parseErr)
            res.status(500).json({ error: 'Geçersiz JSON' })
        }
    })
})

// ✅ Savaş geçmişini getir
app.get('/api/battle-history', (req, res) => {
    fs.readFile(battleFilePath, 'utf8', (err, data) => {
        if (err) return res.json([])
        const battles = JSON.parse(data || '[]')
        res.json(battles)
    })
})

// ✅ Yeni savaş sonucu kaydet
app.post('/api/battle-log', (req, res) => {
    const newBattle = req.body

    fs.readFile(battleFilePath, 'utf8', (err, data) => {
        let battles = []
        if (!err && data) {
            try {
                battles = JSON.parse(data)
            } catch { }
        }

        battles.push(newBattle)

        fs.writeFile(battleFilePath, JSON.stringify(battles, null, 2), (err) => {
            if (err) return res.status(500).json({ error: 'Kayıt yapılamadı' })
            res.status(201).json({ message: 'Savaş kaydedildi' })
        })
    })
})

// ✅ Sunucuyu başlat
app.listen(port, () => {
    console.log(`✅ Sunucu http://localhost:${port} adresinde çalışıyor.`)
})
