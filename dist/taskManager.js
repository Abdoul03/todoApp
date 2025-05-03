"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadTasks = loadTasks;
exports.saveTasks = saveTasks;
const fs = require("fs");
const FILE_PATH = "tasks.json";
// Lire les tâches depuis le fichier
function loadTasks() {
    if (!fs.existsSync(FILE_PATH))
        return [];
    const data = fs.readFileSync(FILE_PATH, "utf-8");
    if (!data.trim())
        return []; // si le fichier est vide
    try {
        return JSON.parse(data);
    }
    catch (err) {
        console.error("❌ Erreur JSON :", err);
        return [];
    }
}
// Sauvegarder les tâches dans le fichier
function saveTasks(tasks) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2), "utf-8");
}
