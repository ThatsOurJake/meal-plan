import { json } from "@sveltejs/kit";
import prisma from "../../lib/prisma.js";

const validateIngredients = (ingredients: App.Ingredient[]): boolean => {
  return !ingredients.some(x => !x.name || !x.measurement || !x.measurementType);
};

export const POST = async ({ request }) => {
  const body: App.Recipe = await request.json();

  if (!body) {
    return json({ error: 'Body cannot be empty'}, { status: 400 });
  }

  const { ingredients, name, servings } = body;

  if (!name) {
    return json({ error: 'Body must contain name'}, { status: 400 });
  }

  if (!servings) {
    return json({ error: 'Body must contain servings'}, { status: 400 });
  }

  if (!ingredients || ingredients.length === 0) {
    return json({ error: 'Body must contain ingredients'}, { status: 400 });
  }

  if (!validateIngredients(ingredients)) {
    return json({ error: 'Body contains invalid ingredients, every ingredient must have a name, measurement and measurementType'}, { status: 400 });
  }

  const result = await prisma.recipe.create({
    data: {
      name,
      servings,
      ingredients: {
        create: ingredients
      }
    }
  });

  return json({ id: result.id, name, servings, ingredients }, { status: 201 })
};
