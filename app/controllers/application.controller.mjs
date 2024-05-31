import { createNote, readNote, updateNote } from "../services/note.service.mjs";


//Fonction creation note
async function CreationNote(req, res) {
    const { app, method } = req
    const db = app.get('g:db')
    console.log(req.session.user)

    const  {title, content} = req.body
    
    if(method == 'GET') { return res.render('note') }

    try {
        await createNote(db, { title, content, owner_id: req.session.user.id })
        res.redirect('/note') 
    } catch(err){
        console.log(err)
    }
}


//Fonction Read note
async function fetchNote(req, res){
    const { app } = req;
    const db = app.get('g:db');
    const { id } = req.params;
    
    console.log(id)

        
        try {
            const note = await readNote(db, { id })
            res.render('note', { note })
        } catch(err){
            console.log('ceci est une erreur :', err)
        }
    }



//Fonction Update note
async function editNote(req, res) {
    const { app, method } = req
    const db = app.get('g:db')
    const  {title, content} = req.body

    if(method == 'PUT') { return res.render('note')}

    try {
        await updateNote(db, {title, content, owner_id: req.session.user.id})
        res.redirect('/note')
    } catch(err){
            console.log(err)
            }
    }


export function loadApplicationController(app) {
    app.all('/note', CreationNote)
    app.get('/note/:id', fetchNote)
    app.all('note', editNote)
}