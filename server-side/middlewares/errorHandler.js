const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({ message: err.errors[0].message })
            break;
        case "EmailRequired":
            res.status(400).json({ message: "Email is required" });
            break;
        case "PassRequired":
            res.status(400).json({ message: "Password is required" });
            break;
        case "InvalidLogin":
            res.status(401).json({ message: "Invalid Email/Password" });
            break;
        case "InvalidToken":
            res.status(401).json({ message: "Invalid Token" });
            break;
        case "NotFound":
            res.status(404).json({ message: "Error not found" });
            break;
        case "FileIsRequired":
            res.status(400).json({ message: "File is required" });
            break;
        default:
            console.log(err);
            res.status(500).json({ message: "Internal Server Error" });
            break;
    }
}

module.exports = { errorHandler };