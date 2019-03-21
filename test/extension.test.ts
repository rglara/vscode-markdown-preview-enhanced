import * as assert from "assert";
import * as vscode from "vscode";

const extensionName = "markdown-preview-enhanced";
const fullExtensionName = "shd101wyy." + extensionName;

suite("Configuration Tests", () => {
  test("Ensure default enum settings are within enum set", () => {
    const ext = vscode.extensions.getExtension(fullExtensionName);
    assert.ok(ext, "Couldn't get extension: " + fullExtensionName);
    assert.ok(ext.packageJSON, "Unexpected extension JSON");
    assert.ok(ext.packageJSON.contributes, "Unexpected contributes JSON");
    assert.ok(
      ext.packageJSON.contributes.configuration,
      "Unexpected configuration JSON",
    );
    const configSettings = ext.packageJSON.contributes.configuration.properties;
    assert.ok(configSettings, "Missing properties JSON");
    const keys = Object.keys(configSettings);
    for (let i = 0; i < keys.length; ++i) {
      const key = keys[i];
      const setting = configSettings[key];
      if (setting.hasOwnProperty("enum")) {
        assert.ok(
          Array.isArray(setting.enum),
          "Setting enum should be array for " + key,
        );
        const defaultValue = setting.default;
        assert.ok(defaultValue, "Default value not set for " + key);
        assert.ok(
          setting.enum.includes(defaultValue),
          "Default value '" +
            defaultValue +
            "' is not contained in enum list for '" +
            key +
            "'",
        );
      }
    }
  });
});
