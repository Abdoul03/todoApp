"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
const taskManager_1 = require("./taskManager");
let tasks = (0, taskManager_1.loadTasks)();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const { action } = yield inquirer_1.default.prompt([
            {
                type: "list",
                name: "action",
                message: "Que voulez-vous faire ?",
                choices: [
                    "Ajouter une tâche",
                    "Lister les tâches",
                    "Marquer comme terminée",
                    "Supprimer une tâche",
                    "Quitter",
                ],
            },
        ]);
        switch (action) {
            case "Ajouter une tâche":
                const { title } = yield inquirer_1.default.prompt([
                    {
                        type: "input",
                        name: "title",
                        message: "Titre de la tâche :",
                    },
                ]);
                tasks.push({ id: Date.now(), title, done: false });
                (0, taskManager_1.saveTasks)(tasks);
                console.log("✅ Tâche ajoutée !");
                break;
            case "Lister les tâches":
                if (tasks.length === 0)
                    return console.log("📭 Aucune tâche.");
                tasks.forEach((task) => console.log(`${task.done ? "✅" : "🕓"} [${task.id}] ${task.title}`));
                break;
            case "Marquer comme terminée":
                const { doneId } = yield inquirer_1.default.prompt([
                    {
                        type: "list",
                        name: "doneId",
                        message: "Choisissez une tâche à terminer :",
                        choices: tasks
                            .filter((t) => !t.done)
                            .map((t) => ({ name: t.title, value: t.id })),
                    },
                ]);
                tasks = tasks.map((t) => t.id === doneId ? Object.assign(Object.assign({}, t), { done: true }) : t);
                (0, taskManager_1.saveTasks)(tasks);
                console.log("🎉 Tâche terminée !");
                break;
            case "Supprimer une tâche":
                const { deleteId } = yield inquirer_1.default.prompt([
                    {
                        type: "list",
                        name: "deleteId",
                        message: "Choisissez une tâche à supprimer :",
                        choices: tasks.map((t) => ({ name: t.title, value: t.id })),
                    },
                ]);
                tasks = tasks.filter((t) => t.id !== deleteId);
                (0, taskManager_1.saveTasks)(tasks);
                console.log("🗑️ Tâche supprimée !");
                break;
            case "Quitter":
                console.log("👋 Au revoir !");
                return;
        }
        // Recommence après action
        yield main();
    });
}
main();
