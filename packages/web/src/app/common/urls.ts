export const API_URL = process.env.NODE_ENV === 'development' ? `${process.env.NX_API_HOST}:${process.env.NX_API_PORT}` : '';
export const GQL_URL = `${API_URL}/graphql`;
console.log('urls.js', 'process.env.NODE_ENV', process.env.NODE_ENV)
console.log('urls.js', 'process.env.NX_API_HOST', process.env.NX_API_HOST)
console.log('urls.js', 'GQL_URL', GQL_URL)
