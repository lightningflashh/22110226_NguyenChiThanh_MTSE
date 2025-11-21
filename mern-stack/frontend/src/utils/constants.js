let apiRoot = ''
if (process.env.BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8081'
} else {
    apiRoot = ''
}
export const API_ROOT = apiRoot

export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12
export const DEFAULT_ITEMS_PER_HOME_PAGE = 3