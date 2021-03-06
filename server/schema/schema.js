const graphql = require("graphql");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLBoolean,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
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
    finish: { type: GraphQLBoolean },
    category: {
      type: CategoryType,
      resolve(parent, args) {
        return Category.findById(parent.categoryId);
      },
    },
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
        return Todo.find({ categoryId: parent.id });
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
    /**
     * 全Todoリストの取得.
     */
    getAllTodo: {
      type: new GraphQLList(TodoType),
      resolve(parent, args) {
        return Todo.find({});
      },
    },
    /**
     * 全Categoryリストの取得.
     */
    getAllCategory: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return Category.find({});
      },
    },
  },
});

/**
 * データの追加.
 */
const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    /**
     * Todoの追加
     */
    addTodo: {
      type: TodoType,
      args: {
        title: { type: GraphQLString },
        categoryId: { type: GraphQLID },
        finish: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let todo = new Todo({
          title: args.title,
          categoryId: args.categoryId,
          finish: false,
        });
        return todo.save();
      },
    },
    /**
     * categoryの追加.
     */
    addCategory: {
      type: CategoryType,
      args: {
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let category = new Category({
          name: args.name,
        });
        return category.save();
      },
    },
    /**
     * Todoの更新.
     * @remarks 項目名、カテゴリ編集可能
     */
    updateTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLString },
        categoryId: { type: GraphQLID },
      },
      resolve(parent, args) {
        let updateTodo = {};
        args.title && (updateTodo.title = args.title);
        args.categoryId && (updateTodo.categoryId = args.categoryId);
        return Todo.findByIdAndUpdate(args.id, updateTodo, {
          new: true,
        });
      },
    },
    /**
     * categoryの更新.
     */
    updateCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLString },
      },
      resolve(parent, args) {
        let updateCategory = {};
        args.name && (updateCategory.name = args.name);
        return Category.findByIdAndUpdate(args.id, updateCategory, {
          new: true,
        });
      },
    },
    /**
     * Todoの完了.
     */
    finishTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        finish: { type: GraphQLBoolean },
      },
      resolve(parent, args) {
        let finishTodo = {};
        finishTodo.finish = args.finish;
        return Todo.findByIdAndUpdate(args.id, finishTodo, {
          new: true,
        });
      },
    },
    /**
     * Todoの削除.
     */
    deleteTodo: {
      type: TodoType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Todo.findByIdAndRemove(args.id);
      },
    },
    /**
     * categoryの削除.
     */
    deleteCategory: {
      type: CategoryType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        return Category.findByIdAndRemove(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
