import { writable } from "svelte/store";

export default {
  recipes: writable<App.RecipeDB[]>([]),
  servings: writable<number>(1),
  selectedRecipes: writable<App.DailyRecipe>({}),
  shoppingList: writable<App.Ingredient[]>([]),
};
