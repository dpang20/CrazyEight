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

/*
const MIMETYPES = new Map()
MIMETYPES.set('.jpg', 'image/jpg')
MIMETYPES.set('.html', 'text/html')
MIMETYPES.set('.txt', 'text/plain')
MIMETYPES.set('.css', 'text/css')
MIMETYPES.set('.md', 'text/plain')
*/

// uncomment if you prefer to use objects instead of maps
const MIMETYPES = {
  '.jpg': 'image/jpg',
  '.html': 'text/html',
  '.txt': 'text/plain',
  '.css': 'text/css',
  '.md': 'text/plain',
}

/*
const DESCRIPTIONS = new Map()
DESCRIPTIONS.set(200, 'OK')
DESCRIPTIONS.set(404, 'Not Found')
DESCRIPTIONS.set(500 , 'Server Error')
*/

// uncomment if you prefer to use objects instead of maps
const DESCRIPTIONS = {
  200: 'OK',
  404: 'Not Found',
  500: 'Server Error',
  get: function(k) { return this[k] }
}

readdir('./public', (err, files) => {
  start(files)
})

readdir('./public', (err, files) => {
  start(files)
})

const start = files => {
/*
  const createResponseHead = (statusCode, headers = {}) => {
    // TODO: this constructs the response status line
    // headers
    // and a single blank line 
    // (something like "HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\n"
    // and returns as a string
  }

  const sendResponse = (sock, statusCode, headers, body) => {
    // TODO: this uses the above function to create the first part of the response
    // it then writes (sends back to client) only the status line and headers
    // then calls write again to send the body
    // and finally, ends the connection
  }

  const handleRead = (sock, fn, err, data) => {
    // TODO: attempt to read a file...
    // and then call the above function to send a response
  }

  const handleData = (sock, data) => {
    // TODO: parse the request
    // determine whether or not to:
    // 1. read a file (if the path matches the name of a file in the public dir)
    // 2. construct html as a string that contains links to urls that have path  (href)
    //    that's the same as the name of the files in public
    // 3. otherwise, 404
  }
*/
  const handleConnect = sock => {
    sock.on('data', data => handleData(sock, data))
  }

  const server = createServer(handleConnect)
  server.listen(3000, '127.0.0.1')
}
