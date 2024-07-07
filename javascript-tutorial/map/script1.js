//2) npm init
//1) install the parcel library to bundle the files
//3) add script in start and build with the command called "parcel index.html" and "parcel build index.html"
//4) npm install uuid
//5) import the uuid library into the index.html
//6) run the index.html by doing "npm run start "

import { v4 } from "uuid"

console.log(v4())
