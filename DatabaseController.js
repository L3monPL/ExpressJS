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

module.exports.all = (db, sql, param) => {
    return new Promise((resolve, reject) => {
        db.all(sql, param, (error, rows) => {
            if (error) {
                reject(error)
            }else{
                resolve(rows)
            }
        })
    })
}

module.exports.each = (db, sql, param) => {
    return new Promise((resolve, reject) => {
        db.each(sql, param, (error, rows) => {
            if (error) {
                reject(error)
            }else{
                resolve(rows)
            }
        })
    })
}