const MongoHelper = require('../helpers/mongo-helper')
const LoadUserByEmailRepository = require('./load-user-by-email-repository')
let db

const makeSut = () => {
    const userModel = db.collection('users')
    const sut = new LoadUserByEmailRepository(userModel)
    return {
        userModel,
        sut
    }
}

describe('LoadUserByEmail Repository', () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL);
        db = await MongoHelper.db
    });

    beforeEach(async () => {
        await db.collection('users').deleteMany()
    });
    
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    test('Should return null if no user is found', async () => {
        const { sut } = makeSut()
        const user = await sut.load('invalid_email@mail.com')
        expect(user).toBeNull()
    })

    test('Should return an user if user is found', async () => {
        const { sut, userModel } = makeSut()
        const fakeUser = await userModel.insertOne({
            email: 'valid_email@mail.com'
        })
        const user = await sut.load('valid_email@mail.com')
        expect(user._id).toEqual(fakeUser.insertedId)
    })
})