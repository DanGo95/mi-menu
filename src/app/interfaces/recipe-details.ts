export interface RecipeDetails {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    dairyFree:                boolean;
    weightWatcherSmartPoints: number;
    healthScore:              number;
    pricePerServing:          number;
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    image:                    string;
    summary:                  string;
}