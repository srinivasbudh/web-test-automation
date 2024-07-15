## **Web-ui-automation using playwright**

This repository shows how to automate a web application using playwright and typescript

# Major decisions made during this task

* I have created simple web-ui test automation framework which can be easily scalable, re-usable and maintainable using **playwright and typescript**

* I have considered **login and logout scenarios** for automation and focused more on **functionality than visual validations**

* I have **set and remove local storage** items to replicate login and logout statuses on the web application

* I have used test fixture in fixture.ts to **extend the Playwright test object to include instances of page objects**, this makes them easily accessible within tests

* I have used **ortoni-report** rather than **allure-report**, as I have heard of it very recently and wanted to test it out, allure reporting can be better than this but I just tried this.





### Environment

<details>
  <summary>Environment setup</summary>

### Below softwares should be installed
* [Git][1]
* [Node.js][2]

To check all these items installed properly, run one by one in your terminal:
```shell

node -v; 

git --version;

Note: node version must be greater than 18 is required(v22.4.1 is latest node version I have used) as I have used latest playwright
```

You should see versions for all these items, without any errors.
</details>

***

### Installation
<details>
  <summary>How to install dependencies</summary>

1. Navigate to the folder in which you want framework to be stored, and run below command in your terminal:

```shell
git clone https://github.com/srinivasbudh/web-test-automation.git
```
2. Navigate into the downloaded "web-test-automation" repository folder
```shell
cd web-test-automation/
```
3. Install all required dependencies:
```shell
npm ci
```
</details>

***

### Test run
<details>
  <summary>How to run tests</summary>

#### Playwright run
To run all the playwright tests you can use the command:
```shell
npm run test
```
To run only smoke tests you can use the command:
```shell
npm run test:smoke
```
</details>

### Report
<details>
  <summary>How to view test reports</summary>

I have used 3 types of reporting

1) **Playwright Reporting**: This report gives all the details of tests and traces. This report is generated and stored inside playwright-report folder in the root folder.
2) **Ortoni-Report**: This is more beautified form of reporting with aggregated numbers and pictorial charts.
This report is generated and stored in the root folder with name *_ortoni-report.html_*
3) **Github Reporting** : This is for adding the summary of test results with numbers in github workflow. This is only displayed in the summary tab of github actions workflow

</details>





[1]: https://git-scm.com/downloads
[2]: https://nodejs.org/en/