<div>
  <p class="text-center font-extrabold text-lg">{dayOfWeek}</p>
  <div class="p-2">
    <select class="text-center w-full border border-black rounded py-1" on:change={onRecipeChange}>
      <option value="" disabled selected>Select a recipe</option>
      {#each recipes as recipe}
        <option value={recipe.id}>{recipe.name}</option>
      {/each}
    </select>
    {#if selectedRecipe}
      <RecipeCard recipe={selectedRecipe} />
    {/if}
  </div>
</div>

<script lang="ts">
	import RecipeCard from "./recipe-card.svelte";
	import store from "../store";

  export let dayOfWeek : string;
  let parsedDayOfWeek = dayOfWeek.toLowerCase() as App.DaysOfWeek;

  let recipes: App.RecipeDB[] = [];
  let selectedRecipe: App.RecipeDB;

  function onRecipeChange(e: Event) {
    const target = e.target as HTMLSelectElement;
    const recipe = recipes.find(x => x.id === parseInt(target.value, 10));
    selectedRecipe = recipe!;

    store.selectedRecipes.update((current) => ({
      ...current,
      [parsedDayOfWeek]: selectedRecipe,
    }));
  }

  store.recipes.subscribe((value) => {
    recipes = value;
  });
</script>
