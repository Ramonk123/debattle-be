const {getClient} = require('../util/Database');
const {ObjectId} = require('mongodb');


exports.updateProgress = async (req, res, next ) => {
    const dbo = getClient();
    const userId = req.params.id;
    const body = req.body;

    try {
        const result = await dbo.collection('users').updateOne(
            {"_id" : new ObjectId(userId)},
            {$set: {
                "progress" : body.progress,
                "questionsAnswered" : body.questionsAnswered
            }}
        );
        return res.status(200).json('OK')
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getProgress = async (req, res, next) => {
    const dbo = getClient();
    const userId = new ObjectId(req.params.id);
    try {
        const result = await dbo.collection('users').find({"_id" : userId}).toArray();
        console.log(result)
        if (result) {
            delete result[0].email;
            delete result[0].password;
            return res.status(200).json(result[0]);
        } else {
            throw new Error('no user found ')
        }
    } catch (error) {
        next(error);

    }

}

