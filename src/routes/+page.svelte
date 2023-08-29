<div class="m-2">
  <p class="text-3xl text-center font-bold" >Meal Planner</p>
  <div class="my-4 flex justify-center items-center gap-x-2">
    <button class="px-4 py-2 bg-purple-300 border rounded-md hover:underline" on:click={showAddRecipeModal}>Add Recipe</button>
    <button class="px-4 py-2 bg-purple-300 border rounded-md hover:underline">View Recipe(s)</button>
  </div>
  <div class="mx-5">
    <div class="flex gap-x-2">
      <p>Total recipe(s) saved: <b>{recipes.length}</b></p>
      <p>|</p>
      <label>
        Servings:
        <input type="number" class="border border-black px-1 rounded" min=1 max=16 value=1 on:change={onServingChange}>
      </label>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-7 my-4">
      <DayColumn dayOfWeek="Monday" />
      <DayColumn dayOfWeek="Tuesday" />
      <DayColumn dayOfWeek="Wednesday" />
      <DayColumn dayOfWeek="Thursday" />
      <DayColumn dayOfWeek="Friday" />
      <DayColumn dayOfWeek="Saturday" />
      <DayColumn dayOfWeek="Sunday" />
    </div>
  </div>
  <ShoppingList></ShoppingList>
  <div id="modal-zone"></div>
</div>

<script lang="ts">
  import DayColumn from "../components/day-column.svelte";
  import ShoppingList from "../components/shopping-list.svelte";

  import AddRecipeModal from "../components/add-recipe-modal.svelte";
	import type { PageData } from "./$types";
	import store from "../store";

  export let data: PageData;
  let recipes: App.RecipeDB[] = [];

  store.recipes.set(data.recipes);
  store.recipes.subscribe((newRecipes) => {
    recipes = newRecipes;
  });

  function showAddRecipeModal() {
    if (document.getElementById('dialog--add-recipe-modal')) {
      return;
    }

    new AddRecipeModal({
      target: document.getElementById('modal-zone')!
    });
  }

  function onServingChange(e: Event) {
    const target = e.target as HTMLInputElement;
    store.servings.set(parseInt(target.value, 10));
  }
</script>
