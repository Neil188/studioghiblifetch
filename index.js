const fetch = require('node-fetch');
const escapeHtml = require('escape-html');
const { accessControl } = require('@neil188/setaccesscontrol');

const URL = process.env.endPoint;
const setAccessControl = accessControl(
    process.env.defaultOrigin,
    process.env.allowLocal
);

const shorten = (str = '', len = 300, trail='...') => {
    if (str.len <=len) return str;
    const pos = str.lastIndexOf(' ', len - trail.length);

    return pos <= 0 ?
        `${str.substring(0, len-trail.lengt)}${trail}` :
        `${str.substring(0, pos)}${trail}`
}

exports.studioghiblifetch = async (req, res) => {

    // set CORS headers
    setAccessControl(res, req.get('origin'));

    // Send response to OPTIONS requests and terminate the function execution
    if (req.method == 'OPTIONS') {
        res.status(204).send('');
    }

    try {
        const response = await fetch(URL);
        const result = await response.json();

        const data  = result.map(
            ({ title, description }) =>
                ({
                    title,
                    description: escapeHtml(shorten(description)),
                }) )

        res.json(data)
    } catch(e) {
        res.sendStatus(500);
    }

};
