if (process.env.NODE_ENV === "development") {
    require("babel-register");
}

require(process.argv[2]);