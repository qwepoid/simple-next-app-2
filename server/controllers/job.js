import { db} from '../index.js'

// GET Apis
export const getJobDetails = (req, res) => {
    const jobId = req.query.id;
    const query = `SELECT * FROM job WHERE jobId = ?`
    // const fquery = `SELECT task.taskId, test.name, task.taskStatus 
    //     FROM job 
    //     INNER JOIN task 
    //     ON job.jobId = task.jobId
    //     INNER JOIN test
    //     ON test.testId = task.testId`;


    db.query(query, [jobId], (err, result) => {
        res.send(result)
    })


    // db.query(fetchQuery, (error, result) => {
    //     if (jobId === '0') res.send(result);
    //     const detailedResult = {};
    //     detailedResult.jobData = result;

    //     const taskFetcher = `SELECT * FROM task WHERE jobId = ${jobId}`;
    //     db.query(taskFetcher, (error, result) => {
    //         detailedResult.tasks = result;
    //         res.send(detailedResult);
    //     })
    // })
}

export const getJobs = (req, res) => {
    const query = 'select * from job';
    db.query(query, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result);
        res.send(result)
    })
}

// export const getJobDetails = (req, res) => {
//     let fetchQuery = '';
//     const jobId = req.query.id;
//     if (jobId === '0') {
//         fetchQuery = "select * from job"
//     } else {
//         fetchQuery = `select * from job where jobId = ${jobId}`
//     }
//     db.query(fetchQuery, [jobId], (error, result) => {
//         console.log('error: ', error);
//         console.log('result: ', result);
//         res.send(result)
//     })
// }

// POST Apis
export const addJob = (req, res) => {
    const {stage, title, customerId} = req.body;
    const sqlInsert = "INSERT INTO job (stage, title, customerId) VALUES (?, ?, ?)";
    db.query(sqlInsert, [stage, title, customerId], (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}
export const updateJob = (req, res) => {
    const sqlInsert = "INSERT INTO job (jobId, stage, title, customerId) VALUES (1, 'Open', 'Soil testing at Bari Brahamna', 1)";
    db.query(sqlInsert, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}
export const deleteJob = (req, res) => {
    const jobId = req.query.id;
    const deleteQuery = "DELETE FROM job WHERE jobId=?";
    db.query(deleteQuery, [jobId], (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}