function notFound(req, res) {
    res.status(404)
    res.json({
        error: "Not found",
        message: "Pagina non trovata"
    })
}

module.exports = notFound