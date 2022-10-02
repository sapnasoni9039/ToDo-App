"strict mode";
let arr = [];
let flag = -1;

function add() {
    let newEle = { item: "", status: "pending" };
    newEle.item = document.querySelector("#text").value;
    arr.push(newEle);
    console.log(arr);
    showTaskList(arr);
}

function showTaskList(output = []) {
    let allEle = document.createElement("div");

    for (let i = 0; i < output.length; i++) {
        let ele = document.createElement("div");
        ele.className = "task-list";

        let taskNameEle = document.createElement("div");
        taskNameEle.className = "left-child";
        taskNameEle.appendChild(document.createTextNode(output[i].item));

        ele.appendChild(taskNameEle);

        let rightChildEle = document.createElement("div");
        rightChildEle.className = "right-child";

        let statusEle = document.createElement("span");
        statusEle.className = output[i].status;
        statusEle.appendChild(document.createTextNode(output[i].status));

        rightChildEle.appendChild(statusEle);

        let button1 = "";
        if (output[i].status == "pending") {
            button1 = document.createElement("button");
            button1.textContent = "Completed";
            button1.className =
                "p-2 lg:px-4 md:mx-2 text-center border border-solid border-indigo-600 rounded text-white bg-indigo-600 transition-colors duration-300 mt-1 md:mt-0 md:ml-1";

            button1.addEventListener("click", function() {
                console.log(i);
                completeTask(i);
            });
        }
        output[i].status == "pending" && rightChildEle.appendChild(button1);

        let button2 = document.createElement("button");
        button2.textContent = "Delete";
        button2.className =
            "p-2 lg:px-4 md:mx-2 text-center border border-solid border-indigo-600 rounded text-white bg-indigo-600 transition-colors duration-300 mt-1 md:mt-0 md:ml-1";

        button2.addEventListener("click", function() {
            console.log(i);
            deleteTask(i);
        });

        rightChildEle.appendChild(button2);
        ele.appendChild(rightChildEle);

        allEle.appendChild(ele);
    }

    document.querySelector("#listOfElement").textContent = "";
    document.querySelector("#listOfElement").appendChild(allEle);
}

function completeTask(i) {
    arr[i].status = "complete";
    console.log(arr[i]);
    showTaskList(arr);
}

function deleteTask(i) {
    arr.splice(i, 1);
    showTaskList(arr);
}

function filterTaskList(status) {
    return function() {
        let output = arr.filter(function(x) {
            return status == "all" || x.status == status;
        });
        console.log(output);
        showTaskList(output);
    };
}
document.querySelector("#add-task-btn").addEventListener("click", add);