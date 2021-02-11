document.execCommand("enableObjectResizing", false, true);

function printDoc() {
  var divToPrint = document.getElementById("Editor");
  var newWin = window.open("", "Print-Window");
  newWin.document.open();
  newWin.document.write(
    '<html><body onload="window.print()">' +
      divToPrint.innerHTML +
      "<style>html {font-family: Arial;margin: 75px;}img {max-width: 100%;height: auto;}table{width:100% !important; margin-bottom:1em !important; border-collapse: collapse !important; } th{font-weight:bold !important; background-color:#ddd !important; } td {background-color:#fff !important; } th,td{padding:0.5em !important; border:1px solid #ccc !important;}blockquote {     background: #eee;     border-radius: 5px; }  blockquote p {     padding: 15px; }</style>" +
      "</body></html>"
  );
  newWin.document.close();
  setTimeout(function() {
    newWin.close();
  }, 13);
}

function GetCode() {
  var CodeToGet = document.getElementById("Editor");
  var newWin = window.open("", "");
  var code =
    "<!DOCTYPE html><html><head></head><body>" +
    CodeToGet.innerHTML +
    "<style>html {font-family: Arial;margin: 12px;}img {max-width: 100%;height: auto;box-shadow: none}</style>" +
    "</body></html>";
  newWin.document.write(
    '<!DOCTYPE html><html><head><title>Code</title></head><body><div style="padding: 1px;"></div><h1>Code : </h1><textarea id="code" disabled ></textarea><style>html {font-family: Arial; background-image: linear-gradient(90deg, DodgerBlue, lightgreen);}#code {font-size: 12px;height: 143px;width: 450px;color: black;background-color: white;overflow: auto;}img {max-width: 100%;height: auto;box-shadow: none}textarea,h1 {margin: 12px;}body{margin: 12px;}table{width:100% !important; margin-bottom:1em !important; border-collapse: collapse !important; } th{font-weight:bold !important; background-color:#ddd !important; } td {background-color:#fff !important; } th,td{padding:0.5em !important; border:1px solid #ccc !important; } </style>' +
      "</body></html>"
  );
  newWin.document.getElementById("code").innerHTML = code;
  newWin.document.close();
}

function insertImage() {
  var img = prompt("Please enter a link your image:", "https://");
  document.execCommand("insertParagraph", false, null);
  document.execCommand("justifyCenter", false, "");
  document.execCommand("justifyCenter", false, "");
  document.execCommand("insertImage", false, img);
  document.execCommand("insertParagraph", false, null);
  var reader = new FileReader();
  reader.onload = function(event) {
    var dataUri = event.target.result,
      img = document.createElement("img");

    img.src = dataUri;
    document.body.appendChild(img);
  };
}

function insertVideo() {
  document.execCommand("insertParagraph", false, null);
  var link = prompt(
    "Please enter link your video:",
    "https://www.youtube.com/"
  );
  var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = link.match(regExp);

  if (match && match[2].length == 11) {
    // var link = getId(link);
    link = match[2];
  } else {
    alert("No video ID!!");
  }
  var code =
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/' +
    link +
    '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
  document.execCommand("insertHTML", false, code);
  document.execCommand("insertParagraph", false, null);
}

function insertLink() {
  var src = prompt("Please enter your link:", "https://");
  document.execCommand("createLink", false, src);
}

function changeColor() {
  var color = document.getElementById("color").value;
  document.execCommand("foreColor", false, color);
}

function insertQuote() {
  var code = '<blockquote style="color: rgb(51, 51, 51); font-family: sans-serif; font-size: 14.4px; font-style: normal;"><p>' + window.getSelection().toString() + '</p></blockquote><cite>- Author</cite>';
  document.execCommand("insertHTML", false, code);
}

function insertTable() {
  document.execCommand("insertParagraph", false, null);
  document.execCommand(
    "insertHTML",
    false,
    "<table> <thead> <tr> <th>Lorem</th> <th>Ipsum</th> <th>Dolor</th> <th>Sit</th> </tr> </thead> <tbody> <tr> <td>Sit</td> <td>Dolor</td> <td>Ipsum</td> <td>Lorem</td> </tr> <tr> <td>Sit</td> <td>Dolor</td> <td>Ipsum</td> <td>Lorem</td> </tr> <tr> <td>Sit</td> <td>Dolor</td> <td>Ipsum</td> <td>Lorem</td> </tr> <tr> <td>Sit</td> <td>Dolor</td> <td>Ipsum</td> <td>Lorem</td> </tr> <tr> <td>Sit</td> <td>Dolor</td> <td>Ipsum</td> <td>Lorem</td> </tr> </tbody>"
  );
  document.execCommand("insertParagraph", false, null);
}

function changeSize() {
  // var h = prompt("Enter text size (1 to 7):");
  var h = prompt("Enter text size (in px) :");
  document.execCommand("fontSize", false, h*0.1875);
}

var Download = {
  click: function(node) {
    var ev = document.createEvent("MouseEvents");
    ev.initMouseEvent(
      "click",
      true,
      false,
      self,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    return node.dispatchEvent(ev);
  },
  encode: function(data) {
    return "data:application/octet-stream;windows-1251," + btoa(data);
  },
  link: function(data, name) {
    var a = document.createElement("a");
    a.download =
      name ||
      self.location.pathname.slice(self.location.pathname.lastIndexOf("/") + 1);
    a.href = data || self.location.href;
    return a;
  }
};
Download.save = function(data, name) {
  this.click(this.link(this.encode(data), name));
};

function Export2Doc(element, filename = "") {
  var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
  var postHtml = "</body></html>";
  var html = preHtml + document.getElementById(element).innerHTML + postHtml;

  var blob = new Blob(["\ufeff", html], {
    type: "application/msword"
  });

  // Specify link url
  var url = "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

  // Specify file name
  filename = filename ? filename + ".doc" : "document.doc";

  // Create download link element
  var downloadLink = document.createElement("a");

  document.body.appendChild(downloadLink);

  if (navigator.msSaveOrOpenBlob) {
    navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = url;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
  }

  document.body.removeChild(downloadLink);
}

function Save() {
  var Editor = document.getElementById("Editor");
  var fileContent = Editor.innerHTML;
  var filename = prompt("What is your file name ?");
  Export2Doc("Editor", filename);
}

function Open() {
  document.getElementById("file-input").click();

  var input = document.getElementById("file-input");
  var output = document.getElementById("Editor");

  input.addEventListener("change", function() {
    if (this.files && this.files[0]) {
      var File = this.files[0];
      var reader = new FileReader();

      reader.addEventListener("load", function(e) {
        document.getElementById("Editor").focus();
        document.execCommand("delete", false, null);
        var TextCode = e.target.result;
        var TextCode = TextCode;
        document.execCommand("selectAll", false, null);
        document.execCommand("delete", false, null);
        document.execCommand("delete", false, null);
        document.execCommand("insertHTML", false, TextCode);
      });

      reader.readAsText(File);
    }
  });
}

window.onbeforeunload = function() {
  return "Are you sure you want to close the window?";
};
