<dialog id={modalId} class="bg-white border rounded-md py-2 px-4 w-3/4 md:w-2/3 lg:w-1/3 max-h-3/4 md:max-h-1/2 overflow-x-auto" on:close={deleteElement}>
  <button class="absolute right-4 top-2" on:click={() => closeModal('dialog--add-recipe-modal')}>X</button>
  <p class="font-bold text-center text-lg">Add Recipe</p>
  <ul id="validation-list" class="list-disc list-inside"></ul>
  <form method="POST" class="flex gap-y-2 flex-col mt-2">
    <label>Recipe Name<span class="text-red-500 font-bold">*</span><input class="ml-2 w-1/2 border border-black px-1 rounded" name="recipe-name" type="text" maxlength="256"></label>
    <label>Default Servings<input class="ml-2 w-12 text-center border border-black rounded" name="servings" type="number" max="20" min="1" value="4"></label>
    <p class="mt-2 font-bold text-center">Ingredients</p>
    <div id="list-items" class="my-2 flex flex-col gap-y-2">
      <AddRecipeItem dataId="ingredient-1" />
    </div>
    <div class="flex flex-col md:flex-row md:justify-center md:items-center gap-y-2 md:gap-x-2">
      <button type="button" class="px-4 py-2 bg-purple-300 border rounded-md hover:underline md:w-1/3" on:click={addRecipeItem}>Add Ingredient</button>
      <button type="button" class="px-4 py-2 bg-green-300 border rounded-md hover:underline md:w-1/3 disabled:bg-gray-300" on:click={submit}>Save Recipe</button>
    </div>
  </form>
</dialog>

<script lang="ts">
	import { onMount } from "svelte";

  import AddRecipeItem from "./add-recipe-item.svelte";
  import ValidationError from "./validation-error.svelte";
	import SuccessMessage from "./success-message.svelte";
	import store from "../store";

  const modalId = 'dialog--add-recipe-modal';  

  onMount(() => {
    const dialog = document.getElementById(modalId) as HTMLDialogElement;
    dialog.showModal();
  });

  function closeModal(id: string) {
    const dialog = document.getElementById(modalId) as HTMLDialogElement;
    dialog?.close();
    deleteElement();
  }

  function deleteElement() {
    const dialog = document.getElementById(modalId) as HTMLDialogElement;
    dialog?.remove();
  }

  function addRecipeItem() {
    const target = document.querySelector(`#${modalId} #list-items`);

    if (target) {
      new AddRecipeItem({
        target,
        props: {
          dataId: crypto.randomUUID().replace(/[0-9]/g, '').replace(/-/g, ''),
        }
      });
    }
  }

  function submit(e: MouseEvent) {
    const recipeNameEle = document.querySelector<HTMLInputElement>('input[name="recipe-name"]')!;
    const defaultServingEle = document.querySelector<HTMLInputElement>('input[name="servings"]')!;
    const validationList = document.getElementById('validation-list')!;
    const btn = (e.target as HTMLButtonElement);

    const errors: string[] = [];
    const recipeName = recipeNameEle.value;
    const defaultServing = defaultServingEle.value;

    const ingredients: App.Ingredient[] = [];

    validationList.innerHTML = '';

    if (!recipeName) {
      errors.push('Recipe name cannot be blank!');
    }

    document.querySelectorAll('.ingredient-item').forEach((ele, index) => {
      const eleId = ele.id;

      const ingredientName = document.querySelector<HTMLInputElement>(`#${eleId} input[name="ingredient-name"]`)!.value;
      const measurement = document.querySelector<HTMLInputElement>(`#${eleId} input[name="ingredient-measurement"]`)!.value;
      const measurementType = document.querySelector<HTMLSelectElement>(`#${eleId} select[name="ingredient-measurement-type"]`)!.value;

      if (!ingredientName || !measurement || !measurement) {
        errors.push(`Ingredient on row ${index + 1} is not valid`);
      }

      ingredients.push({
        name: ingredientName.trim(),
        measurement,
        measurementType,
      });
    });

    if (ingredients.length === 0) {
      errors.push('Ingredients list is empty');
    }

    if (errors.length > 0) {
      errors.forEach((err) => {
        new ValidationError({
          target: validationList,
          props: {
            validationMessage: err,
          },
        });
      });

      return;
    }

    const recipe: App.Recipe = {
      name: recipeName.trim(),
      servings: parseInt(defaultServing, 10),
      ingredients,
    };

    btn.disabled = true;

    fetch('/add-recipe', {
      body: JSON.stringify(recipe),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(async res => {
      new SuccessMessage({
        target: validationList,
        props: {
          successMessage: `"${recipe.name}" added successfully!`
        }
      });

      const newRecipe: App.RecipeDB = await res.json();
      store.recipes.update((current: App.RecipeDB[]) => [...current, newRecipe]);
    }).catch(err => {
      const error = err as Error;
      new ValidationError({
        target: validationList,
        props: {
          validationMessage: error.message,
        },
      });
    })
    .finally(() => {
      setTimeout(() => {
        btn.disabled = false;
      }, 250);
      setTimeout(() => {
        validationList.innerHTML = '';
      }, 1500);
    });
  }
</script>

