import axios from "axios";
import { IImage } from "./models";
import { uuidv4 } from "./services";
export interface Message {
    [key: string]: string[];
}
interface FetchAllBreedNamesResponse {
    message: Message;
}

interface FetchImagesResponse {
    message: string[];
}

export async function fetchAllBreedNames(): Promise<Message> {
    let allBreeds = {};
    try {
        const { data }: { data: FetchAllBreedNamesResponse } = await axios.get(
            "https://dog.ceo/api/breeds/list/all"
        );
        allBreeds = data.message;
    } catch (error) {
        throw "Failed to fetch all breed names";
    }

    return allBreeds;
}

export async function fetchRandomDogs(
    breedPath: string,
    pageSize: number,
    images: IImage[] = []
): Promise<IImage[]> {
    let imgs: IImage[] = [];
    try {
        const { data }: { data: FetchImagesResponse } = await axios.get(
            `https://dog.ceo/api/breed/${breedPath}/images/random/${pageSize}`
        );
        imgs = data.message.map((item: string) => ({
            src: item,
            id: uuidv4(),
        }));
    } catch (error) {
        console.error("Failed to fetch:", error);
    }

    return [...images, ...imgs];
}
