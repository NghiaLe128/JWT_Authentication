const User = require("../models/Users")
const bcrypt = require("bcrypt")
const { generalAccessToken, generalRefreshToken } = require("./JwtService")

/**
 * Authenticate and add new user account to the database
 * @param {*} newUser : information of the new user
 * @returns 
 */
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password } = newUser;

        try {
            const checkUser = await User.findOne({ email: email });

            if (checkUser !== null) {
                reject('The email is already in use');
            }

            const hash = bcrypt.hashSync(password, 10);

            if (checkUser === null) {
                const createUser = await User.create({
                    name,
                    email,
                    password: hash,
                });
                if (createUser) {
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: createUser,
                    });
                }
            }
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Authenticate a user's credentials to log in
 * @param {*} userLogin : login credentials
 * @returns the user id and its tokens
 */
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email: email });

            if (checkUser === null) {
                reject('The user is not defined');
            }

            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                reject('The password or username is incorrect');
            }

            const user_id = checkUser._id;
            const user_name = checkUser.name
            const access_token = await generalAccessToken({ id: checkUser.id });
            const refresh_token = await generalRefreshToken({ id: checkUser.id });

            resolve({
                status: '200',
                message: 'SUCCESS',
                user_id,
                user_name,
                access_token,
                refresh_token,
            });
        } catch (e) {
            reject(e);
        }
    });
};

/**
 * Update information of a user
 * @param {*} id : id of the user
 * @param {*} data : information to be updated
 * @returns 
 */
const updateUser = (id, data)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkUser = await User.findOne({
                _id: id
            })
            if(checkUser === null){
                reject('The user is not defined');
            }
           const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update user success',
                data: updatedUser
            })
        }catch(e){
            reject(e)
        }
    })
}

/**
 * Get all information of a user
 * @param {*} id : id of the user
 * @returns 
 */
const getDetailsUser = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const user = await User.findOne({
                _id: id
            })
            if(user === null){
                reject('The user is not defined');
            }
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: user
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    getDetailsUser,
}