import * as minimist from 'minimist';
import * as fs from 'fs';

/**
 * Async function to read a string from a file given its name.
 */
function read_string(filename: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, function (err: any, data: any) {
      if (err) {
        reject(err);
      } else {
        resolve(data.toString());
      }
    });
  });
}

/**
 * Read all the data from stdin as a string.
 */
function read_stdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let chunks: string[] = [];
    process.stdin.on("data", function (chunk: string) {
      chunks.push(chunk);
    }).on("end", function () {
      resolve(chunks.join(""))
    }).setEncoding("utf8");
  });
}

function main() {
  let argv = minimist(process.argv.slice(2));
  let infile = argv._[0];
  let input_promise = infile ? read_string(infile) : read_stdin();
  input_promise.then((s) => {
    console.log(s.length);
  });
  console.dir(argv);
}

main();
