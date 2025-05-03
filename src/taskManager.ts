// taskManager.ts
import { Task } from "./task";
import * as fs from "fs";

const FILE_PATH = "tasks.json";

// Lire les tâches depuis le fichier
export function loadTasks(): Task[] {
    if (!fs.existsSync(FILE_PATH)) return [];

    const data = fs.readFileSync(FILE_PATH, "utf-8");

    if (!data.trim()) return []; // si le fichier est vide

    try {
        return JSON.parse(data);
    } catch (err) {
        console.error("❌ Erreur JSON :", err);
        return [];
    }
}

// Sauvegarder les tâches dans le fichier
export function saveTasks(tasks: Task[]): void {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}
