<div class="my-2 mx-5 flex flex-col md:flex-row gap-y-2 md:gap-y-0">
  <div class="w-full md:w-1/2">
    <p class="font-bold text-lg">Shopping List</p>
    <ul class="list-inside list-disc">
      {#each render(_servings, _selectedRecipes) as ingredient}
        <ShoppingItem ingredient={ingredient}></ShoppingItem>
      {/each}
    </ul>
  </div>
  <div class="w-full md:w-1/2">
    <p class="font-bold text-lg">Recommended Recipes</p>
    <RecommendedRecipes></RecommendedRecipes>
  </div>
</div>

<script lang="ts">
  import { utils } from "$lib";

	import store from "../store";
	import ShoppingItem from "./shopping-item.svelte";
  import RecommendedRecipes from "./recommended-recipes.svelte";

  let _selectedRecipes: App.DailyRecipe = {};
  let recipes: App.RecipeDB[] = [];
  let _servings: number = 1;

  store.selectedRecipes.subscribe((value: App.DailyRecipe) => {
    _selectedRecipes = value;
  });

  store.recipes.subscribe((value) => {
    recipes = value;
  });

  store.servings.subscribe((value) => {
    _servings = value;
  });

  function render(servings: number, sr: App.DailyRecipe): App.Ingredient[] {
    const selectedRecipes = Object.keys(sr).reduce((current: App.RecipeDB[], key: string) => [...current, sr[key]], []);
    const output: App.Ingredient[] = [];
    
    selectedRecipes.forEach((r) => {
      const { ingredients } = r;
      ingredients.forEach((i) => {
        const index = output.findIndex(x => x.name.toLowerCase() === i.name.toLowerCase());

        if (index >= 0) {
          const parsedExisting = parseInt(output[index].measurement, 10);
          const parsedNew = utils.calculateMeasurement(i, r, servings)
          output[index].measurement = (parsedExisting + parsedNew).toString();
          return;
        }

        output.push({
          ...i,
          measurement: utils.calculateMeasurement(i, r, servings).toString(),
        });
      });
    });

    store.shoppingList.set(output);

    return output.sort((a, b) => a.name.localeCompare(b.name));
  }
</script>
