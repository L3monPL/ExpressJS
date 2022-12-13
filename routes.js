module.exports = function(app){
    app.route("/test")
    .get(function(req, res) {
        res.json("This is GET method")
    })

    app.route("/succes")
    .get(function (req, res, next){
        res.json(
            {
                'status': 'Sukces!'
            }
        )
    })
    .post(function(req, res){
        res.json("Hello " + req.body.name)
    })


}

