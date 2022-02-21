const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;

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
    content: { type: GraphQLString },
  }),
});
