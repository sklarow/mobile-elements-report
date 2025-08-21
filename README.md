# mobile-elements-report

Mobile Elements Report is a lightweight web tool for analyzing Appium Source Page XML. It helps you visualize the UI hierarchy, inspect locator details like XPath, and spot problems before writing automated tests.

## How it works

1. Paste the XML produced by Appium's `getPageSource` command.
2. The page parses the document entirely in your browser.
3. Potential issues are listed so you can adjust element locators.

## Types of issues detected

- Missing or duplicate `resource-id` attributes.
- Very long or brittle XPath expressions.
- Elements that cannot be uniquely identified.
- Nodes with potentially dynamic text or attributes.

## Disclaimer

This project was developed with ChatGPT Codex. I am not affiliated with Appium, Android, iOS, or any related projects or trademarks. Connect with me on [LinkedIn](https://www.linkedin.com/in/sklarow/).

