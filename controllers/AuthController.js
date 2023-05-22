const bcrypt = require('bcryptjs');
const {createToken} = require('../util/Jwt');
const {getClient} = require('../util/Database');
const InvalidCredentialsError = require('../errors/InvalidCredentialsError');

exports.login = async (req, res, next) => {
    const {email, password} = req.body;
    const dbo = getClient();

    try {
        const user = await dbo.collection('users').find({email: email}).toArray();
        if (!user[0]) {
            throw new InvalidCredentialsError('Invalid credentials', 401);
        }
        console.log(user[0])
        const isMatch = await bcrypt.compare(password, user[0].password);

        if (!isMatch) {
            console.log('2')
            throw new InvalidCredentialsError('Invalid credentials', 401);
        }

        const token = createToken({id: user._id});
        return res.status(200).json(token);

    } catch (error) {
        next(error);
    }

}

exports.createUser = async (req, res, next) => {
    const dbo = getClient();

    try {
        const {partyName, email, password} = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        await dbo.collection('users').insertOne({email: email, password: hashedPassword, party: partyName});
        return res.status(201).json('user created');
    } catch (error) {
        next(error);

    }

}
