import { fetchAllBreedNames } from "./api";

const mobilenet = require("@tensorflow-models/mobilenet");

export const BreedNotFoundError = "BreedNotFoundError";
export const ClassifyError = "ClassifyError";

export type ErrorType = "BreedNotFoundError" | "ClassifyError" | "";

export const errorMap = {
    [BreedNotFoundError]: "Breed not found please upload other image",
    [ClassifyError]: "Failed to classify image",
    "": undefined,
};

export const classifyImage = async (imgEle: Element): Promise<string> => {
    let apiPath: string;
    try {
        const breeds = await fetchAllBreedNames();
        const model = await mobilenet.load();
        const predictions = await model.classify(imgEle);
        const predictionBreeds: string[] = predictions[0].className
            .split(",")[0]
            .split(" ");
        let breedNotFound = false;
        if (predictionBreeds.length === 2) {
            apiPath = `${predictionBreeds[1].toLowerCase()}/${predictionBreeds[0].toLowerCase()}`;
            breedNotFound = !breeds[predictionBreeds[1]].find(
                (breed: string) => breed === predictionBreeds[0]
            );
        } else {
            apiPath = predictionBreeds[0].toLowerCase();
            breedNotFound = !breeds[predictionBreeds[0]];
        }

        if (breedNotFound) {
            throw BreedNotFoundError;
        }
    } catch (error) {
        throw ClassifyError;
    }

    return apiPath;
};

export function uuidv4(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
        const r = (Math.random() * 16) | 0;
        const v = c == "x" ? r : (r & 0x3) | 0x8;

        return v.toString(16);
    });
}
