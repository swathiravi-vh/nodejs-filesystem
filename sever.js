import fs from "fs";
import express from "express";
import dotenv from "dotenv";
const app = express();
const PORT = process.env.PORT || 3002;

app.get("/", (req, res) => {
  res.send(`<br> To create use /createFile <br> To read use /readFile`);
});

app.get("/createFile", (req, res) => {
  const { time, file } = TimeStamp();
  console.log(time, file);
  fs.writeFile(`./newFiles/${file}.txt`, time, (err) => {
    if (err) console.log(err);
    else console.log(`File created successfully`);
  });
  res.send(`File created successfully`);
});

app.get("/readFile", (req, res) => {
  fs.readdir(`./newFiles`, (err, files) => {
    if (files.length == 0) {
      res.send(`No files in the directory`);
    } else {
      let fileList = `Files in directory <br>`;
      files.forEach((file) => {
        fileList += file + "<br>";
      });
      res.send(fileList);
    }
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

function TimeStamp() {
  var d = Date.now();
  var date = new Date(d);
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var hrs = date.getHours();
  var mins = date.getMinutes();
  var secs = date.getSeconds();
  var time = `${hrs}:${mins}:${secs}`;
  var file = `${day}-${month}-${year}_${hrs}-${mins}-${secs}`;

  return { time, file };
}
