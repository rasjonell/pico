#!/bin/env node

let inputData = '';

process.stdin.on('data', (chunk) => {
  inputData += chunk;
});

process.stdin.on('end', () => {
  console.log("Parsing:", inputData);
  const flag = parseFlag(inputData);
  console.log("\nFlag is:", flag);
});

process.stdin.on('error', (err) => {
  console.error('Error reading stdin:', err);
});

/**
  * @param {string} flag 
  */
function parseFlag(flag) {
  const [, firstHash] = atob(flag).split("'");
  console.log("-> Decode 64 ->", firstHash);
  const finalHash = atob(firstHash);
  console.log("-> Decode 64 ->", finalHash);
  const result = caesarDecode(finalHash);
  console.log("-> Caesar Decode (Shift = 7) ->", result);
  return result;
}

/**
  * @param {string} encodedText 
  * @param {number} [shift=7]
  */
function caesarDecode(encodedText, shift = 7) {
  return encodedText
    .split("")
    .map((char) => {
      const code = char.charCodeAt(0);

      if (code >= 65 && code <= 90) {
        return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
      }

      if (code >= 97 && code <= 122) {
        return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
      }

      return char;
    })
    .join("");
}
