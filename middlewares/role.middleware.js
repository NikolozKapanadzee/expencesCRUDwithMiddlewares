


const isViewer = (req,res,next) => {
    const role = req.headers['role']
    if (role !== 'viewer' && role !== 'admin' && role !== 'editor') {
        return res.status(401).json({message: 'permition denied'})
    }
    next();
}
const isEditor = (req,res,next) => {
    const role = req.headers['role']
    if (role !== 'admin' && role !== 'editor') {
        return res.status(401).json({message: 'permition denied'})
    }
    next();
}
const isAdmin = (req,res,next) => {
    const role = req.headers['role']
    if (role !== 'admin') {
        return res.status(401).json({message: 'permition denied'})
    }
    next();
}

module.exports = {isViewer, isEditor, isAdmin}