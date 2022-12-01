// TODO : This is first encounter with two arrow functions
const asyncRoute = route => (req, res, next = console.error) =>
    Promise.resolve(route(req, res)).catch(next);

module.exports = asyncRoute;