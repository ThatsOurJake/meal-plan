import prisma from "../lib/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad<App.PageContent> = async () => {
  const recipes = await prisma.recipe.findMany({
    include: {
      ingredients: true
    },
    orderBy: {
      name: 'asc'
    }
  });

  return {
    recipes,
  }
};
