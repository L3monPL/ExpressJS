module.exports.run = (db, sql, param) => {
    return new Promise((resolve, reject) => {
        db.run(sql, param, error => {
            if (error) {
                reject(error)
            }else{
                resolve()
            }
        })
    })
}

module.exports.get = (db, sql, param) => {
    return new Promise((resolve, reject) => {
        db.get(sql, param, (error, row) => {
            if (error) {
                reject(error)
            }else{
                resolve(row)
            }
        })
    })
}