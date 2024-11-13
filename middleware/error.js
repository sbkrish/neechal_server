const errorHandler = (err, req, res, next) => {
    if(err.status) {
        
       return res.status(err.status).json({message: err.message})

    } else {
    return res.status(500).json({message: err.message})

    }
}

const notFound = (req, res, next) => {
    const error = new Error("Page not found")
    error.status = 404
    next(error);
}

export default errorHandler
export {notFound}