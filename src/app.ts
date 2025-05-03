import inquirer from "inquirer";
import { loadTasks, saveTasks } from "./taskManager";
import { Task } from "./task";

let tasks: Task[] = loadTasks();

async function main() {
    const { action } = await inquirer.prompt([
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
            const { title } = await inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "Titre de la tâche :",
                },
            ]);
            tasks.push({ id: Date.now(), title, done: false });
            saveTasks(tasks);
            console.log("✅ Tâche ajoutée !");
            break;

        case "Lister les tâches":
            if (tasks.length === 0) return console.log("📭 Aucune tâche.");
            tasks.forEach((task) =>
                console.log(
                    `${task.done ? "✅" : "🕓"} [${task.id}] ${task.title}`
                )
            );
            break;

        case "Marquer comme terminée":
            const { doneId } = await inquirer.prompt([
                {
                    type: "list",
                    name: "doneId",
                    message: "Choisissez une tâche à terminer :",
                    choices: tasks
                        .filter((t) => !t.done)
                        .map((t) => ({ name: t.title, value: t.id })),
                },
            ]);
            tasks = tasks.map((t) =>
                t.id === doneId ? { ...t, done: true } : t
            );
            saveTasks(tasks);
            console.log("🎉 Tâche terminée !");
            break;

        case "Supprimer une tâche":
            const { deleteId } = await inquirer.prompt([
                {
                    type: "list",
                    name: "deleteId",
                    message: "Choisissez une tâche à supprimer :",
                    choices: tasks.map((t) => ({ name: t.title, value: t.id })),
                },
            ]);
            tasks = tasks.filter((t) => t.id !== deleteId);
            saveTasks(tasks);
            console.log("🗑️ Tâche supprimée !");
            break;

        case "Quitter":
            console.log("👋 Au revoir !");
            return;
    }

    // Recommence après action
    await main();
}

main();
