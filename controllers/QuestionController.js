const database = require('../util/database');
const {ObjectId} = require('mongodb');


exports.getQuestion = async (req, res) => {
    const dbo = getClient();
    try {
        const questionId = new ObjectId(req.path.substring(1));
        const question = await dbo.collection('questions').find({_id: questionId}).toArray();
        return res.status(200).json(question)
    } catch (error) {

        console.error(error)
        return res.status(500).json('An error occurred')

    }
}

exports.getQuestions = async (req, res) => {
    const dbo = getClient();
    try {
        const questions = await dbo.collection('questions').find().toArray();
        return res.status(200).json(questions);
    } catch (error) {

        return res.status(500).json('An error occurred');
    }

}

exports.addQuestion = async (req, res) => {
    const dbo = getClient();
    const body = req.body;

    try {
        if (!Array.isArray(body) || body.length === 0) {
            throw new Error('Request body is not an array or is empty');
        } else if (body.length === 1) {
            await dbo.collection('questions').insertOne(body[0]);
            return res.status(201).json('Question added');
        } else if (body.length > 1) {
            await dbo.collection('questions').insertMany(body);
            return res.status(201).json('Questions added');
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json('An error occurred');
    }
}

const getClient = () => {
    const client = database.getClient();
    return client.db(process.env.DATABASE_NAME);
}
