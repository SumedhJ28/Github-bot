const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE_PATH = './data.json';

const makeCommit = (n) => {
    if (n === 0) return simpleGit().push();

    // ✅ Define range
    const start = moment("2025-01-01");
    const end = moment("2025-04-30");

    // ✅ Random date between range
    const randomDate = moment(
        start.valueOf() + Math.random() * (end.valueOf() - start.valueOf())
    );

    const DATE = randomDate.format();

    const data = { date: DATE };

    console.log(DATE);

    jsonfile.writeFile(FILE_PATH, data, () => {
        simpleGit()
            .add([FILE_PATH])
            .commit(DATE, { '--date': DATE }, () => {
                makeCommit(n - 1);
            });
    });
};

makeCommit(100); // you can adjust count