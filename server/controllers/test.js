import { db }from '../index.js'


export const getTests = (req, res) => {
    // res.send('Hello');
    const sqlInsert = "select * from test";
    db.query(sqlInsert, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result);
        // res.send(JSON.stringify(result))
        res.send(result);
    })
};

export const addTest = (req, res) => {
    const testName = req.body.test
    const sqlInsert = "INSERT INTO test (name) VALUES (?)";
    db.query(sqlInsert, testName, (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}

export const deleteTest = (req, res) => {
    const taskId = req.query.id
    const deleteQuery = "DELETE FROM task WHERE taskId=?";
    db.query(deleteQuery,[taskId], (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}
export const updateTest = (req, res) => {
    const testId = req.body.id;
    const name = req.body.name;
    const updateQuery = 'UPDATE test SET name = ? WHERE testId = ?'
    db.query(updateQuery, [name, testId], (error, result) => {
        console.log('error: ', error);
        console.log('result: ', result)
        res.send(result)
    })
}