import { db } from '../index.js';

export const getJobTasks = (req, res) => {
    const sqlInsert = "select * from task where jobid is '1'";
    db.query(sqlInsert, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}

export const addJobTask = (req, res) => {
    const sqlInsert = "select * from task where jobid is '1'";
    db.query(sqlInsert, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}

export const updateJobTask = (req, res) => {
    const sqlInsert = "select * from task where jobid is '1'";
    db.query(sqlInsert, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}

export const removeJobTask = (req, res) => {
    const taskId = req.query.id
    const deleteQuery = "DELETE FROM task WHERE taskId=?";
    db.query(deleteQuery, [taskId],(error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}

