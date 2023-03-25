var request = require("request");
var cheerio = require("cheerio");
var puppeteer = require("puppeteer");

async function extractData() {
  //Run npm i puppeteer

  // Function to create a browser
  var browser = await puppeteer.launch({ headless: false });

  // new web Page on the browser
  var page = await browser.newPage();

  await page.goto("https://github.com/Anshu-rai89");

  await page.waitForSelector(".repo"); // It is waiting for this element to be present in dom tree

  // All your business logic to extract data goes here
  var popular_repos = await page.evaluate(function () {
    // First we are accessing all repos element using class  and then converting them in array
    var reposElements = Array.from(document.getElementsByClassName("repo"));

    var repos = [];

    reposElements.forEach(function (repo) {
      repos.push(repo.innerText);
    });

    return repos;
  });

  console.log("Repos are ", popular_repos);

  var userName = await page.evaluate(function () {
    return document.querySelector(".p-name").textContent;
  });
  console.log(userName);

  await page.evaluate(function () {
    document.querySelector("a[href='/Anshu-rai89?tab=repositories']").click();
  });

  await page.waitForSelector("#user-repositories-list > ul > li"); // It is waiting for this element to be present in dom tree

  var all_repo = await page.evaluate(function () {
    var lis = Array.from(
      document.querySelectorAll("#user-repositories-list > ul > li")
    );

    var repo_name = [];

    lis.forEach(function (li) {
      var text = li.querySelector("a").textContent;
      repo_name.push(text);
    });

    return repo_name;
  });

  console.log("All repos", all_repo);

 await page.type("#your-repos-filter", "march", { delay: 100 });
    //await browser.close();
}

extractData();