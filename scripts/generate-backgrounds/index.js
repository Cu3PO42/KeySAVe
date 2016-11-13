var async = require('async'),
    dominant = require('dominant-color'),
    Color = require('color'),
    fs = require('fs');

var filenames = fs.readdirSync(process.argv[2]).filter(n => n.endsWith('.png')).map(n => process.argv[2] + "/" + n);

async.mapSeries(filenames, dominant, function(err, res) {
    var obj = {};
    for (var i = 0; i < filenames.length; ++i)
        obj[filenames[i].match(/sprites\/(.+?)\.png/)[1]] = Color("#"+res[i]).lighten(0.4).hexString();
    console.log(JSON.stringify(obj, null, 2));
});
