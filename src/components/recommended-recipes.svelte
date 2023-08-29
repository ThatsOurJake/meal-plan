<div>
  {#if recommendedRecipes.length === 0}
    <p>No recommendations 🍽</p>
  {/if}
  <ul class="list-inside list-disc">
    {#each recommendedRecipes as recommendation}
      <li>{recommendation.name} | Common Ingredients: {recommendation.score}</li>
    {/each}
  </ul>
</div>

<script lang="ts">
	import store from "../store";

  let recommendedRecipes: App.ScoredRecipe[] = [];
  let allRecipes: App.RecipeDB[] = [];
  let selectedRecipes: App.RecipeDB[] = [];
  
  store.shoppingList.subscribe((shoppingList) => {
    recommendedRecipes = allRecipes.filter(x => x.ingredients.some(y => shoppingList.find(z => z.name === y.name)))
      .filter(x => !selectedRecipes.find(y => x.id === y.id))
      .map((x) => {
        return {
          ...x,
          score: shoppingList.filter(y => x.ingredients.find(x => x.name === y.name)).length,
        }
      })
      .sort((a,b) => b.score - a.score);
  });

  store.recipes.subscribe((value) => {
    allRecipes = value;
  });

  store.selectedRecipes.subscribe((value) => {
    selectedRecipes = Object.keys(value).reduce((current: App.RecipeDB[], key: string) => [...current, value[key]], []);
  });
</script>
