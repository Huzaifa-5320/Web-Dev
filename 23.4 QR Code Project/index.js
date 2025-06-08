/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from 'inquirer';
import fs from 'fs';
import qr from 'qr-image';


inquirer
  .prompt([
    {
      name: 'url',
      message: 'Enter the URL for which you want to generate a QR code:',
    },
  ])
  .then((answers) => {
    const url = answers.url;

    const qrCodeImage = qr.image(url);
    qrCodeImage.pipe(fs.createWriteStream('qr_image.png'));

    fs.writeFile("URL.txt", url, (err) => {
      if (err) {
        console.error("Error writing to file:", err);
      } else {
        console.log("✅ URL saved to URL.txt");
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error("Prompt couldn't be rendered in the current environment");
    } else {
      console.error("Something went wrong:", error);
    }
  });
