import {createServer} from 'net'
import {readFile, readdir} from 'fs'
import {extname, join} from 'path'
import {fileURLToPath} from 'url';

// absolute path path including filename of _this_ file (`server.mjs`)
const __filename = fileURLToPath(import.meta.url);

// absolute path of the directory that this files is in
const __dirname = fileURLToPath(new URL('.', import.meta.url));

// absolute path to the public directory (you can use this along with 
// join from the path module and a file name to craft an absolute path
// to a file in src/public
const __root = join(__dirname, 'public')


const MIMETYPES = new Map()
MIMETYPES.set('.jpg', 'image/jpg')
MIMETYPES.set('.html', 'text/html')
MIMETYPES.set('.txt', 'text/plain')
MIMETYPES.set('.css', 'text/css')
MIMETYPES.set('.md', 'text/plain')

/*
// uncomment if you prefer to use objects instead of maps
const MIMETYPES = {
  '.jpg': 'image/jpg',
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.css': 'text/css',
  '.md': 'text/plain',
}
*/

const DESCRIPTIONS = new Map()
DESCRIPTIONS.set(200, 'OK')
DESCRIPTIONS.set(404, 'Not Found')
DESCRIPTIONS.set(500 , 'Server Error')

/*
// uncomment if you prefer to use objects instead of maps
const DESCRIPTIONS = {
  200: 'OK',
  404: 'Not Found',
  500: 'Server Error',
  get: function(k) { return this[k] }
}
*/
