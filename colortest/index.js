#! /usr/bin/env node

const main = async () => {
require("@babel/register")({
  presets: [["@babel/preset-env"], ["@babel/preset-react"]],
});


};

main(); 
require("./App");
