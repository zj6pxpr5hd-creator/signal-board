//connection with db
const pool = require("../db/db");

//function to create signal
const createSignal = async (title, content, userid) => {

    const result = await pool.query( //db query to create new signal
        "INSERT INTO signals (user_id, title, content) VALUES ($1, $2, $3) RETURNING id, user_id, title",// SQL Insertion query
        [userid, title, content]
    );
    return result.rows[0];
};


//function to find a signal by title
const getSignalByTitle = async (title) => {
    const result = await pool.query(
        "SELECT * FROM signals WHERE title = $1",//SQL query to find signal 
        [title]
    );
    return result.rows[0];
};



/*function to select all recent signals
    logic => created_at >= NOW() - INTERVAL '1 day'
    order by created_at DESC
    use a limit (to not have an infinite list)
*/


const getRecentSignals = async () => {
    const result = await pool.query(
        "SELECT * FROM signals WHERE created_at >= NOW() - INTERVAL '1 day' ORDER BY created_at DESC LIMIT 50"
    );
    return result;
}

//function to get all signals by user
const getSignalsByUser = async (userid) => {
    const result = await pool.query(
        "SELECT * FROM signals WHERE user_id = $1 ORDER BY created_at DESC",
        [userid]
    );
    return result.rows;
}

//DELETE
//function to delete a signal by his id
const deleteSignalById = async (signalid) => {

    const result = await pool.query(    
        "DELETE FROM signals WHERE id = $1 RETURNING *",
        [signalid]
    );

    return result;

};



//exports
module.exports = {
    createSignal,
    getSignalByTitle,
    getRecentSignals,
    getSignalsByUser,
    deleteSignalById
}
