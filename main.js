if (process.env.NODE_ENV === "development") {
    require("babel-register");
    require("./serversrc");
} else {
    require("./serverlib");
}
