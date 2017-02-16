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

/**
 * `eval` inside a scope, in strict mode.
 */
export function scope_eval(code: string): any {
  return (function () {
    return eval("'use strict'; " + code);
  })();
}

/**
 * Make a function with the JavaScript expression given as its body and $ as
 * its only argument. The code is evaluated in strict mode.
 */
function make_expr_fun(expr: string): Function {
  return new Function('$', '"use strict"; return (' + expr + ')');
}

function main() {
  // Parse arguments.
  let args = minimist(process.argv.slice(2));
  console.dir(args);

  // Get the input from the specified filename or from stdin.
  let infile = args._[0];
  let input_promise = infile ? read_string(infile) : read_stdin();

  input_promise.then((code) => {
    // Evaluate the source expression.
    let func = make_expr_fun(code);
    let res = func(args);
    console.log(res);

  }).catch((reason) => {
    console.error(reason);
  });
}

main();
