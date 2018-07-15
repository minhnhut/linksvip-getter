const {tryOrDefault} = require("tryordefault");
const getLinkVips = require("./lib/Getter");

const loginInfo = tryOrDefault(
    () => require("./login"),
    null
);

if (!loginInfo) {
    console.log("Invalid login information is provided. Please specify fshare login information inside login.json.");
    console.log('Format: {"username": "", "password": ""}');
    process.exit(1);
}

const urlToGet =  tryOrDefault(
    () => process.argv[2],
    ""
);

if (!urlToGet) {
    console.log("Please specify url to get by argument. Example: node ./index.js http://www.fshare.vn/file/Z37FAU74PZKL26E");
    process.exit(1);  
}

async function main() {
    const directLink = await getLinkVips(urlToGet, loginInfo);
    console.log(directLink);
    process.exit(0);
}

main();