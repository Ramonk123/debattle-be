const {getClient} = require('../util/Database');
const {ObjectId} = require('mongodb');


exports.getQuestion = async (req, res, next) => {
    const dbo = getClient();
    try {
        const questionId = new ObjectId(req.params.id);
        const question = await dbo.collection('questions').find({_id: questionId}).toArray();
        if (!question || question.length === 0) {
            const error = new Error(`No question found with id: ${questionId}`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json(question)
    } catch (error) {
        next(error);
    }
}

exports.getQuestions = async (req, res, next) => {
    const dbo = getClient();
    try {
        const questions = await dbo.collection('questions').find().toArray();
        if (questions.length === 0) {
            const error = new Error('No questions found');
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json(questions);
    } catch (error) {
        next(error);
    }

}

exports.addQuestion = async (req, res, next) => {
    const dbo = getClient();
    const body = req.body;
    try {
        validateForEmptyBody(body);
        if (body.length === 1) {
            await dbo.collection('questions').insertOne(body[0]);
            return res.status(201).json('Question added');
        } else if (body.length > 1) {
            await dbo.collection('questions').insertMany(body);
            return res.status(201).json('Questions added');
        }
    } catch (error) {
        next(error);
    }
}

exports.editQuestion = async (req, res, next) => {
    const dbo = getClient();
    const body = req.body;

    try {
        const questionId = new ObjectId(req.params.id);
        validateForEmptyBody(body);
        delete body._id;
        const questionResult = await dbo.collection('questions').updateOne({_id: questionId}, {$set: body});
        if (questionResult.matchedCount === 0) {
            const error = new Error('No matches found');
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json('Question modified');

    } catch (error) {
        next(error);
    }
}

exports.removeQuestion = async (req, res, next) => {
    const dbo = getClient();
    try {
        const questionId = new ObjectId(req.params.id);
        const questionResult = await dbo.collection('questions').deleteOne({_id: questionId});
        if (questionResult.deletedCount === 0) {
            const error = new Error(`Question with id: ${questionId} could not be found`);
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json('Question has been deleted');
    } catch (error) {
        next(error);
    }
}

const validateForEmptyBody = (body) => {
    if (Object.keys(body).length === 0) {
        const error = new Error('No body present');
        error.statusCode = 400;
        throw error;
    }

}
