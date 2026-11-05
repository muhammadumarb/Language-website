class USERDTO{
    constructor(user){
    this._id = user._id
    this.name = user.name
    this.email = user.email
    this.created_at = user.createdAt
    }
}
module.exports = USERDTO