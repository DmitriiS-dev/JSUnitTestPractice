import { run } from "../index";
import { describe, it, expect } from "vitest";
import nock from "nock";

describe("Unit Test: API Get Request", () => {
    // Test return type
    it("Should return a JSON object", async () => {
        // Arrange
        const userId = 3;
        const keyword = "eum";

        // Act
        const result = await run(userId, keyword);

        // Assert
        console.log(result);
        expect(result).toBeTypeOf("object");
    });

    // Test length of returned data
    it("Should return a length of 15", async () => {
        // Arrange
        const userId = 3;
        const keyword = "eum";

        // Act
        const result = await run(userId, keyword);

        // Assert
        expect(result.length).toBe(15);
    });

    // Test filtered posts as an array
    it("Should return filtered posts as an array", async () => {
        // Mocking API response with `nock`
        nock("https://jsonplaceholder.typicode.com")
            .get("/posts")
            .reply(200, [
                { userId: 3, id: 1, title: "mock title 1" },
                { userId: 4, id: 2, title: "other title" },
            ]);

        // Act
        const result = await run(3, "mock");

        // Assert
        expect(result).toEqual([{ userId: 3, id: 1, title: "mock title 1" }]);
    });
});
