<div class="flex flex-col md:flex-row gap-y-2 md:gap-x-2 w-full ingredient-item" id={dataId}>
  <input type="text" class="text-center border basis-1/3 border-black rounded" name="ingredient-name" placeholder="Ingredient Name">
  <input type="number" class="text-center border basis-1/3 border-black rounded" name="ingredient-measurement" min="1" placeholder="Measurement">
  <select class="text-center border basis-1/3 border-black rounded" value="g" name="ingredient-measurement-type">
    <optgroup label="Volume">
      <option value="ml">millilitre(s)</option>
      <option value="l">litre(s)</option>
      <option value="tsp">teaspoon(s)</option>
      <option value="tbsp">tablespoon(s)</option>
      <option value="c">cup(s)</option>
      <option value="pt">pint(s)</option>
    </optgroup>
    <optgroup label="Weight">
      <option value="mg">milligram(s)</option>
      <option value="g">gram(s)</option>
      <option value="kg">kilogram(s)</option>
      <option value="lb">pound(s)</option>
      <option value="oz">ounce(s)</option>
    </optgroup>
    <optgroup label="Other">
      <option value="unit">units(s)</option>
    </optgroup>
  </select>
  <button on:click={deleteItem} type="button">🗑</button>
</div>

<script lang="ts">
  export let dataId: string;

  function deleteItem() {
    document.getElementById(dataId)?.remove();
  }
</script>
