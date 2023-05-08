const database = require('../util/database');
const {ObjectId} = require('mongodb');


exports.getQuestion = async (req, res) => {
    const dbo = getClient();
    try {
        const questionId = new ObjectId(req.path.substring(1));
        const question = await dbo.collection('questions').find({_id: questionId}).toArray();
        if (!question || question.length === 0) {
            throw new Error(`No question found with id: ${questionId}`);
        }
        return res.status(200).json(question)
    } catch (error) {

        console.error(error)
        return res.status(404).json(error.message);

    }
}

exports.getQuestions = async (req, res) => {
    const dbo = getClient();
    try {
        const questions = await dbo.collection('questions').find().toArray();
        if (questions.length === 0) {
            throw new Error('No questions found');
        }
        return res.status(200).json(questions);
    } catch (error) {

        return res.status(500).json('An error occurred');
    }

}

exports.addQuestion = async (req, res) => {
    const dbo = getClient();
    const body = req.body;

    try {
        if (Object.keys(body).length === 0) {
            throw new Error('Request body is empty');
        } else if (body.length === 1) {
            await dbo.collection('questions').insertOne(body[0]);
            return res.status(201).json('Question added');
        } else if (body.length > 1) {
            await dbo.collection('questions').insertMany(body);
            return res.status(201).json('Questions added');
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json(error.message);
    }
}

exports.editQuestion = async (req, res) => {
    const dbo = getClient();
    const body = req.body;
    console.log(body)

    try {
        const questionId = new ObjectId(req.path.substring(1));
        if (Object.keys(body).length === 0) {
            throw new Error('No body present');
        }
        delete body._id;
        const questionResult = await dbo.collection('questions').updateOne({_id: questionId}, {$set: body});
        if (questionResult.matchedCount === 0) {
            throw new Error('No matches found');
        }
        return res.status(200).json('Question modified');

    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
}

exports.removeQuestion = async (req, res) => {
    const dbo = getClient();
    try {
        const questionId = new ObjectId(req.path.substring(1));
        const questionResult = await dbo.collection('questions').deleteOne({_id: questionId});
        if (questionResult.deletedCount === 0) {
            throw new Error(`Question with id: ${questionId} could not be found`);
        }
        return res.status(200).json('Question has been deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json(error.message);
    }
}

const getClient = () => {
    const client = database.getClient();
    return client.db(process.env.DATABASE_NAME);
}
