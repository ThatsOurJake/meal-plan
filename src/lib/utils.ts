export function calculateMeasurement(ingredient: App.Ingredient, recipe: App.RecipeDB, passedServings: number): number {
  const parsedMeasurement = parseFloat(ingredient.measurement);
  const measurement = parseFloat((parsedMeasurement/ recipe.servings * passedServings).toFixed(2));

  if (Math.floor(measurement) === 0) {
    return parsedMeasurement;
  }

  return Math.ceil(measurement);
}
