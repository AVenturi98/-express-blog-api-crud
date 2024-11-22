/*

Esercizio (P - 1)
Milestone 1

Come prima cosa, creiamo un controller per i nostri post, in una cartella controllers.

All’interno, prepariamo tutte le funzioni necessarie e copiamo in ciascuna la logica delle funzioni che attualmente si trovano nel router (al momento restituiscono solo dei messaggi).

Poi torniamo sul file delle rotte.

Qui importiamo le funzioni dichiarate nel controller e le associamo alle varie rotte, come visto in classe.

Testiamo su postman se chiamando gli endpoint riceviamo effettivamente le stesse risposte che avevamo prima.

Se tutto funziona, passiamo alla prossima milestone

Milestone 2
Per iniziare, creiamo una cartella data in cui creare un file che contenga ed esporti l’array di posts che trovate in allegato. Importiamo questo file in cima al controller.

Ora passiamo ad implementare le logiche delle nostre CRUD:

Index dovrà restituire la lista dei post in formato JSON

Show dovrà restituire un singolo post in formato JSON

Destroy dovrà eliminare un singolo post dalla lista, stampare nel terminale (console.log) la lista aggiornata, e rispondere con uno stato 204 e nessun contenuto.

Bonus

Implementare un filtro di ricerca nella index che mostri solo i post che hanno un determinato Tag

In Show e Destroy, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.

Sia per la show che per la destroy fate funzionare le due API anche quando viene inviato come parametro :id lo slug del post (senza registrare nuove rotte)

--------------------------------------------------------------------------------------

Esercizio (P - 2)

Milestone 1

Per iniziare, andiamo su Postman e prepariamo una nuova chiamata verso la nostra rotta store.

Impostiamo il verbo e l’endpoint corretti

Selezioniamo il tab body e scegliamo il formato raw e JSON

Inseriamo come corpo della nostra request un oggetto che rappresenti un nuovo post

Nota: se vogliamo avere delle immagini, inventiamole pure.
Nota: ricordiamo che non bisogna passare l’id quando si crea una nuova risorsa: sarà il server (con l’aiuto del database) a fornirlo.

Milestone 2

Impostiamo il body-parser per far sì che la nostra app riesca a decifrare il request body.

Poi, all’interno della rotta Store, stampiamo nel terminale i dati in arrivo, grazie a un console.log

Milestone 3

Implementiamo quindi la logica per aggiungere un nuovo post al nostro blog, e prepariamo la risposta adeguata.

Testiamolo con postman.

Milestone 4

Ripetiamo il procedimento per la rotta di Update, in modo da avere la possibilità di modificare le nostre risorse.

Bonus

Quelli del giorno prima, se non già fatti

In Update, controllare se il parametro si riferisce ad un post esistente, in caso contrario, rispondere con uno stato 404 e un messaggio d’errore, sempre in formato JSON.

Aggiungere un minimo di validazione nella store per evitare di creare un post con campi undefined aggiungere un minimo di validazione anche in update e modify

Buon Lavoro e buon divertimento
*/
const posts = require('../data/posts');
let lastID = posts.at(- 1).id;

function index(req, res) {

    const tag = req.query.tag;
    const post = posts.filter((post) => post.tags.includes(tag))
    
    
    if (post.length === 0) {
        res.status(404)
        return res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })
    }
    
    // console.log(`Lista dei post`)
    // res.json(posts)
    res.json(post)
}

function show(req, res) {

    const id = +req.params.id
    const post = posts.find((el) => el.id === id)

    if (!post) {
        res.status(404)
        return res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })
    }

    console.log(`Elemento del post: ${id}`)
    res.json(post)
}

function post(req, res) {
    //estrapolo il contenuto dal server
    const { title, slug, content, image, tags } = req.body
    
    const error = validate(req)

    if (error.length) {
        res.status(404)
        return  res.json({
            error: `Data required`,
            message: error
        })
    }

    //aggiungo di un unità al ID precedente
    lastID++

    const newPost = {
        id: lastID,
        title, 
        slug, 
        content, 
        image, 
        tags
    }
    // console.log(newPost)
    posts.push(newPost)
    console.log(posts)
    res.send('Un nuovo elemento del post creato')
    
}

function update(req, res) {

    const id = +req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Aggiorno l\'elemento del post: ${id}`)
    // res.json(post)

    if (!post) {
        res.status(404)
        return res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })
    }
    
    const { title, slug, content, image, tags } = req.body
    
    const postUpdate = {
        title, 
        slug, 
        content, 
        image, 
        tags
    }

    res.json(postUpdate)

}

function modify(req, res) {
    
    const id = +req.params.id
    const post = posts.find((el) => el.id === id)
    console.log(`Modifico l\'elemento del post: ${id}`)

    if (!post) {
        res.status(404)
        return res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })
    }

    const { title, slug, content, image, tags } = req.body

    if ({title, slug, content, image, tags }) {
        post.title = title
        post.slug = slug
        post.content = content
        post.image = image
        post.tags = tags
    }

        
        //     res.json(postUpdate)
    res.json(post)
}

const destroy = (req, res) => {
    
    const id = +req.params.id
    // const post = posts.find((el) => el.id === id)
    console.log(`Cancella l\'elemento del post: ${id}`)
    // res.json(post)

    const postIndex = posts.findIndex((post) => post.id === id)

    if (postIndex === -1) {
        
        res.status(404)
        return res.json({
            error: 'Post not found',
            message: 'Il post non è stato trovato'
        })

    } 

    res.sendStatus(204)

    posts.splice(postIndex, 1)
    console.log(posts)
}

module.exports =  { index, show, post, update, modify, destroy }

const validate = (req) => {
    const { title, slug, content, image, tags } = req.body

    const errors = []

    if (!title) errors.push('Title incomplete')
    if (!slug) errors.push('Slug incomplete')
    if (!content) errors.push('Content incomplete')
    if (!image) errors.push('Image incomplete')
    if (!tags) errors.push('Tags incomplete')

    return errors
}

/*

{
    "title": "Tiramisù",
    "slug": "tiramisu",
    "content": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur recusandae, dicta eos quis cum, tenetur sint accusamus voluptas iusto nobis officia assumenda, asperiores mollitia blanditiis. Laborum tempora cum placeat in.",
    "image": "tiramisu.png",
    "tags": [
        "Dolci",
        "Torte",
        "Dolci con caffè"
        ]
}

*/

//  PER MODIFICARE STRINGA : CONCATENARE IL RESTANTE ALLA MODIFICA

// * Sia per la show che per la destroy fate funzionare le due API anche quando viene inviato come parametro :id lo slug del post (senza registrare nuove rotte)