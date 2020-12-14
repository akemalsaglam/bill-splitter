const userService = require('./service');

const model = `

  type User {
    id: Int
    name: String
    email: String
    surname: String
    profile_photo_link: String
    is_active: Boolean
  },
  
  type PassiveUser {
    message: String
  },
 
  input UserInput {
    id: Int
    name: String
    email: String
    surname: String
    profile_photo_link: String
    is_active: Boolean
  },
  
  input RegisterInput {
    email_address: String,
    password: String!,
    repeat_password: String!
  },
  
  input LoginInput {
    email_address: String!,
    password: String!
  }
`;

const Queries = `
  getUserById(id: Int!): User,
  getAllUsers:[User]
`;

const Mutations = `
  deleteUserById(id: Int!): Boolean,
  updateUser(input: UserInput): User,
  activateUserById(id: Int!): Boolean,
  register(input: RegisterInput): User,
  login(input: LoginInput): Boolean
`;

const root = {
  getUserById: userService.getById,
  getAllUsers: userService.getAll,
  deleteUserById: userService.deleteById,
  updateUser: userService.updateUser,
  activateUserById: userService.activateUserById,
  register: userService.register,
  login: userService.login
};

module.exports.model = model;
module.exports.queries = Queries;
module.exports.mutations = Mutations;
module.exports.root = root;
