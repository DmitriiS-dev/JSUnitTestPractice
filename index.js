const https = require("https");

function run(userId, keyword) {
    return new Promise((resolve, reject) => {
        let data = "";

        // Send the Request
        https.get("https://jsonplaceholder.typicode.com/posts", (response) => {
            response.on("data", (chunk) => {
                data += chunk;
            });

            response.on("end", () => {
                console.log("Data Grabbed!");
                try {
                    // Manipulate the Data
                    data = JSON.parse(data);
                    const filteredPosts = data.filter(
                        (item) =>
                            item.userId === userId || item.title.includes(keyword)
                    );

                    // Return only relevant fields
                    const result = filteredPosts.map(({ userId, id, title }) => ({
                        userId,
                        id,
                        title,
                    }));

                    resolve(result);
                } catch (err) {
                    reject("Error parsing data");
                }
            });
        })
            .on("error", (err) => {
                console.log("An Error Occurred:", err);
                reject(err);
            });
    });
}

module.exports = { run };
