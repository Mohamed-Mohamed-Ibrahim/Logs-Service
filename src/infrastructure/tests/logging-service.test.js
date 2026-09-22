const { describe, test, expect, afterEach } = require("@jest/globals");
const { producer } = require("../../kafka.js");
const { recordLog } = require("../../application/services/logging-service");

describe("Logging Service Unit Tests", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should return "Log successfully created"', async () => {
    const log = {
      id: "123",
      level: "INFO",
      message: "This is a test log message",
      timestamp: Date.now(),
    };

    const mockFn = jest.spyOn(producer, "send").mockResolvedValue("");

    const result = await recordLog(log);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(result).toBe("Log successfully created");
  });
});
