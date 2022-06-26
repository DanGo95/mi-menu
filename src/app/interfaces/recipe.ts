export interface Recipe {
    vegetarian:               boolean;
    vegan:                    boolean;
    glutenFree:               boolean;
    dairyFree:                boolean;
    veryHealthy:              boolean;
    cheap:                    boolean;
    veryPopular:              boolean;
    sustainable:              boolean;
    lowFodmap:                boolean;
    weightWatcherSmartPoints: number;
    gaps:                     Gaps;
    preparationMinutes:       number;
    cookingMinutes:           number;
    aggregateLikes:           number;
    healthScore:              number;
    pricePerServing:          number;
    id:                       number;
    title:                    string;
    readyInMinutes:           number;
    servings:                 number;
    sourceUrl:                string;
    openLicense:              number;
    image:                    string;
    imageType:                ImageType;
    summary:                  string;
    cuisines:                 Cuisine[];
    dishTypes:                DishType[];
    diets:                    string[];
    occasions:                any[];
    analyzedInstructions:     AnalyzedInstruction[];
    sourceName:               null | string;
    creditsText:              null | string;
    spoonacularSourceUrl:     string;
    author?:                  string;
    license?:                 string;
}

export interface AnalyzedInstruction {
    name:  string;
    steps: Step[];
}

export interface Step {
    number:      number;
    step:        string;
    ingredients: Ent[];
    equipment:   Ent[];
    length?:     Length;
}

export interface Ent {
    id:            number;
    name:          string;
    localizedName: string;
    image:         string;
    temperature?:  Length;
}

export interface Length {
    number: number;
    unit:   Unit;
}

export enum Unit {
    Celsius = "Celsius",
    Minutes = "minutes",
}

export enum Cuisine {
    American = "American",
    MiddleEastern = "Middle Eastern",
}

export enum DishType {
    Dinner = "dinner",
    Lunch = "lunch",
    MainCourse = "main course",
    MainDish = "main dish",
}

export enum Gaps {
    No = "no",
}

export enum ImageType {
    Jpg = "jpg",
    PNG = "png",
}
