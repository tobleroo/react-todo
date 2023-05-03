
import { useState, useEffect } from "react";

export default function AddTasks({savedTasks, setSavedTasks}){

    const [newTask, setNewTask] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategories(savedTasks);
    }, [savedTasks]);

    function getAllCategories(savedTasks){
        let categories = [];
        savedTasks.forEach(task => {
            categories.push(task.categoryName);
        });
        // return categories;
        setCategories(categories);
    }

    function saveToTasklist(){
        const newTask = createTaskFromInput();
        const inputCategory = document.querySelector('#category').value;

        const categoryExists = savedTasks.find((existingCategory) => existingCategory.categoryName === inputCategory);

        if (categoryExists) {
            categoryExists.tasks.push(newTask);
        } else {
            const newCategory = {
            categoryName: inputCategory,
            tasks: [newTask],
            };
            savedTasks.push(newCategory);
        }

        setSavedTasks([...savedTasks]); // create a new copy of the array to trigger re-render
    }

    function createTaskFromInput(){
        
        const taskName = document.querySelector('[name="taskName"]').value;
        const taskFrequency = document.querySelector('[name="taskFrequency"]').value;
        const taskFrequencyUnit = document.querySelector('#dropdown').value;
        const taskTimeToComplete = document.querySelector('[name="taskTimeToComplete"]').value;
        const taskDesc = document.querySelector('[name="taskDesc"]').value;

        const newTask = {
            taskName: taskName,
            taskFrequency: taskFrequency,
            taskFrequencyUnit: taskFrequencyUnit,
            timeToComplete: taskTimeToComplete,
            taskDescription: taskDesc,
            timeCompleted : 0
        }

        return newTask;
    }

    return (
        <div className="AddTaskBox">
            <h3>add new task</h3>

            <div className="addTaskInputBox">
                <div className="categoriSelectedBox">
                    <label htmlFor="category">Category</label>
                    <input type="text" id="category" name="category" list="category-list" />
                    <datalist id="category-list">
                        {categories.length ? (
                            categories.map((category, index) => {
                            return <option key={index} value={category} />;
                            })
                        ) : (
                            <option value="no data">no data</option>
                        )}
                    </datalist>
                </div>
                <div className="inputTaskName">
                    <label htmlFor="taskName">Task name</label>
                    <input type="text" name="taskName" placeholder="task name" />
                </div>
                
                <div className="addFrequencyBox">
                    <label htmlFor="dropdown">Repeated every:</label>
                    <div className="frequencyInputBox">
                        <input type="number" name="taskFrequency" placeholder="0" />
                        <select id="dropdown" name="fruit">
                            <option value="apple">Days</option>
                            <option value="banana">Weeks</option>
                            <option value="orange">Years</option>
                        </select>
                    </div>
                </div>

                <div className="addTaskTimeBox">
                    <label htmlFor="taskTimeToComplete">Time to complete task</label>
                    <input type="text" name="taskTimeToComplete" placeholder="task time to complete" />
                </div>

                <div className="addTaskDescBox">
                    <textarea name="taskDesc" placeholder="task description"></textarea>
                </div>
            </div>

            <div className="addTaskBtnBox">
                <button id="saveTaskToDbBtn" onClick={saveToTasklist}>save to DB</button>
                <button id="saveTodayTaskBtn">save to today</button>
                <button id="saveToBothBtn">Both</button>
            </div>
        </div>
    )
}