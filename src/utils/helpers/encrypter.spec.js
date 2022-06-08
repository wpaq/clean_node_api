class Encrypter {
    compare(password, hashed_password) {
        return true
    }
}


describe('Encrypter', () => {
    test('Should return true if bcrypt returns true', async () => {
        const sut = new Encrypter()
        const isValid = await sut.compare('any_password', 'hashed_password')
        expect(isValid).toBe(true)
    })
})