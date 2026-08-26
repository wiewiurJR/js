const express = require('express');
const app = express();
const crypto = require("node:crypto");
const fs =require("fs");

const PORT = 3000;
const DATA_FILE = "links.json";

if(!fs.existsSync(DATA_FILE)){
    fs.writeFileSync(DATA_FILE,JSON.stringify({}));
}

const ReadLinks= ()=>{
    try {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        return JSON.parse(data || '{}')
    }catch(error){return {}}
};

const WriteLinks = (links) =>{
    fs.writeFileSync(DATA_FILE, JSON.stringify(links, null ,2));
}

app.set('view engine', 'ejs');
app.set('views', './view');
app.use(express.urlencoded({ extended: true}));

app.get('/', (req, res) => {

   const shortId= req.query.result;
   let fullUrl = null;
    if (shortId) {
        fullUrl = `http://localhost:${PORT}/${shortId}`;
    }

    res.render("main", { ShortUrl: fullUrl });

});

app.post('/shorten',(req, res) => {
    const {url}  = req.body;
    if(!url || url.length ===0){
        return res.status(400).send("Proszę podać poprawny adres URL");
    }

    const links = ReadLinks();
    const Exists = Object.entries(links).find(([id,originalUrl]) => originalUrl === url)

if(Exists){
    return res.redirect(`/?result=${Exists[0]}`);
}

        const ShortId = crypto.randomBytes(4).toString("hex");
        links[ShortId] = url;
        WriteLinks(links);
        res.redirect(`/?result=${ShortId}`);
})
app.get('/:shortId', (req, res) => {
    const {shortId} = req.params;
    const links = ReadLinks();
    const originalUrl = links[shortId];

    if(originalUrl){
        const redirectUrl = originalUrl.startsWith('http') ? originalUrl : `http://${originalUrl}`;
        res.redirect(redirectUrl);
    }else{
        res.status(404).send("Nie znaleziono linku");
    }
});
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));