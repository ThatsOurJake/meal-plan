/* eslint-disable @typescript-eslint/no-empty-interface */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}

		interface Recipe {
			name: string;
			servings: number;
			ingredients: Ingredient[];
		}

		interface RecipeDB extends Recipe {
			id: number;
		}

		interface Ingredient {
			name: string;
			measurement: string;
			measurementType: string
		}

		interface PageContent {
			recipes: RecipeDB[];
		}

		interface ScoredRecipe extends RecipeDB {
			score: number;
		}

		type DaysOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

		interface DailyRecipe {
			[dayOfWeek: string]: RecipeDB;
		}
	}
}

export {};
