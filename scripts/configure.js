const input = require("input");
const fs = require("fs");
const {Patterns} = require("@cloudrex/forge");

if (!fs.existsSync(".env.example") && !fs.existsSync(".env")) {
    console.log("Seems like the project is corrupt, try downloading a fresh copy! (.env.example is missing)");
    process.exit(0);
}

let source = fs.existsSync(".env") ? ".env" : ".env.example";

async function start() {
    console.log("\n\tPlease provide basic required information for your bot.\n\tDon't worry, you can change the configuration again later.\n\tYou can skip this process by pressing CTRL + C in your keyboard.\n");

    const token = await input.password("Token", {
        validate(token) {
            return Patterns.token.test(token);
        }
    });
    
    const prefix = await input.text("Prefix", {
        default: "!"
    });

    const owner = await input.text("Owner's ID (Your ID)", {
        validate(id) {
            return Patterns.snowflake.test(id);
        },

        default: "000000000000000000"
    });

    // Clone
    if (source !== ".env") {
        fs.copyFileSync(source, ".env");
    }

    // Read
    let data = fs.readFileSync(".env").toString();

    // Replace data
    data = data.replace(/^TOKEN="?[^"]*"?$/gm, `TOKEN="${token}"`);
    data = data.replace(/^PREFIX="?[^"]*"?$/gm, `PREFIX="${prefix}"`);
    data = data.replace(/^OWNER_ID="?[^"]*"?$/gm, `OWNER_ID="${owner}"`);

    // Write
    fs.writeFileSync(source, data);

    console.log("\n\tYou're all set! Run 'npm start' to start the bot.\n\tYou can always change the configuration of this bot using 'npm run config'\n")
}

start();