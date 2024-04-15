// cross origin resource sharing
const whiteList = ['http://localhost:3000/', 'https://www.google.co.in'];
const corsOption = {
    origin: (origin, callback) => {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not Allowed By CORS"));
        }
    },
    optionsSuccessStatus: 204
}

module.exports = corsOption;