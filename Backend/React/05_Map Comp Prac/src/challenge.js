import emojipedia from "./emojipedia";

const newText = emojipedia.map(function (len){
    return len.meaning.substring(0,100);
});

console.log(newtext);
