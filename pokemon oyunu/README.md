# Pokémon Battle Web Oyunu

Bu proje, Vue.js 3 (Vite + Composition API) ve Express.js kullanılarak geliştirilmiş basit bir Pokémon savaş oyunudur. Oyuncu, 6 Pokémon içinden birini seçerek rastgele bir rakip Pokémon'a karşı savaşır.

## 🚀 Kullanılan Teknolojiler

- Vue.js 3 (Composition API)
- Pinia (state yönetimi)
- Vue Router
- Vite
- Express.js
- Node.js
- JavaScript (ES6+)

## 📦 Projeyi Çalıştırma

### 1. Backend (Express.js)

```bash
cd server
npm install
node index.js
```

### 2. Frontend (Vue 3 + Vite)

```bash
cd client
npm install
npm run dev
```

> Not: Backend genellikle `http://localhost:3000`, frontend ise `http://localhost:5173` üzerinden çalışır.

## 📁 Klasör Yapısı

```
project-root/
├── client/            # Vue.js uygulaması
│   ├── src/components/
│   ├── src/views/
│   ├── src/stores/
│   ├── public/images/
├── server/            # Express.js backend
│   ├── data/
│   │   ├── pokemons.json
│   │   └── battles.json
│   └── index.js
```

## 🎮 Oyunun Özellikleri

- 6 farklı Pokémon seçilebilir.
- Normal ve özel saldırılar yapılabilir.
- Özel saldırılar cooldown (bekleme süresi) ile sınırlı.
- Hasar tipi Pokémon türüne göre değişir (strongAgainst / weakAgainst).
- HP barları animasyonludur.
- Saldırı ses efekti vardır.
- Savaş geçmişi son ekranda görüntülenebilir.

## 🧑‍💻 Geliştiriciler

- Arda Pehlivan - 19240001400

## 📸 Örnek Görseller

> Proje raporu PDF dosyasında detaylı ekran görüntüleri ve detaylı kod açıklama dosyası mevcuttur.