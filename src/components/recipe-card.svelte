<div class="my-2 p-2 border border-orange-300 bg-orange-50 rounded">
  <p class="font-bold text-center">{recipe.name}</p>
  <ul class="list-inside list-disc">
    {#each recipe.ingredients as ingredient}
      <li class="truncate">{ingredient.name} [{utils.calculateMeasurement(ingredient, recipe, servings)}{ingredient.measurementType}]</li>
    {/each}
  </ul>
  <a href="/#" class="text-blue-700 hover:underline"><p class="text-center mt-2">View Recipe</p></a>
</div>

<script lang="ts">
	import store from "../store";
  import { utils } from '$lib'

  export let recipe: App.RecipeDB;
  let servings: number = recipe.servings;

  store.servings.subscribe((v) => {
    servings = v;
  });
</script>
