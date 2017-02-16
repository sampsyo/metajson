MetaJSON: Parameterized JSON Documents
======================================

This is a simple tool to generate JSON based on command-line flags. The source is a JavaScript literal with code that can reference command-line option values; the result is plain JSON.

Run `metajson something.js` to execute the JavaScript code in `something.js` and pretty-print the result. The command-line arguments are provided in a variable called `$`.

For example:

    $ cat example.meta.js
    {
      "building": "shed",
      "color": $.color,
      "contents": $.contents || "bikes",
    }
    $ metajson --color blue example.meta.js
    {
      "building": "shed",
      "color": "blue",
      "contents": "bikes"
    }
