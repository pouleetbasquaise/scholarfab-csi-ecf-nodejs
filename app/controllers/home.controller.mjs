export function loadHomeController(app) {
    app.get('/', (req, res) => {
        const { user } = req.session
        res.render('index', { user })
    })
}
