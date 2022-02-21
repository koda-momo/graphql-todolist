const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;
//モデル
const Todo = require("../models/todo");
const Category = require("../models/category");

/**
 * Todo型.
 */
const TodoType = new GraphQLObjectType({
  name: "Todo",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    categoryId: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryId);
      },
    },
    content: { type: GraphQLString },
  }),
});

/**
 * Category型.
 */
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    todoList: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.findById({ categoryId: parent.id });
      },
    },
  }),
});

/**
 * 情報取得.
 */
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    /**
     * Todo情報取得.
     */
    getTodo: {
      type: TodoType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Todo.findById(args.id);
      },
    },
    /**
     * category情報取得.
     */
    getCategory: {
      type: CategoryType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        return Category.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
