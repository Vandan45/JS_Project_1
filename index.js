/*
1) table = table=>tbody=>id
2) tableHtml = table.innerHTML; table's tbody's html store in variable
3) newRowH
editBtn.addEventListener('')tml = <tr><td>...; using back-tick, store new value(name) inside HTML (tr=>td-name,td-editBtn,td-deleteBtn)
4) tableHtml += newRowHtml
5) table = tableHtml; append HTML to it
*/


var editIndex = null;


// DUMMY ROWS CREATE
for (let i = 0; i < 5; i++) {
    onSaveClick("test-" + (i + 1));
}

function onSaveClick(name = "") {
    let userName = "";
    if (name) {
        userName = name;
    } else {
        userName = document.getElementById("userName").value;
    }

    if (editIndex == null) { // ADD BLOCK
        // TBODY
        let tbody = document.getElementById("tableBody");
        let createTr = document.createElement("tr");
        let createTd1 = document.createElement("td");
        let createTd2 = document.createElement("td");
        let createTd3 = document.createElement("td");
        let editBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");

        // GET ALL TR LIST
        let tr_arr = document.querySelectorAll("#tableBody tr");

        // EDIT BUTTON ATTRIBUTE
        editBtn.textContent = "Edit";
        editBtn.setAttribute("data-index", tr_arr.length);
        editBtn.onclick = onEditClickEvent;

        // DELETES BUTTON ATTRIBUTE
        deleteBtn.textContent = "Delete";
        deleteBtn.setAttribute("data-index", tr_arr.length);
        deleteBtn.onclick = onDeleteClickEvent;

        // COLUMN-1 TO TR
        createTd1.innerHTML = userName;
        createTr.appendChild(createTd1);

        // Add editBtn to TD2
        createTd2.appendChild(editBtn);
        // COLUMN-2 TO TR
        createTr.appendChild(createTd2);

        // Add deleteBtn to TD3
        createTd3.appendChild(deleteBtn);
        // COLUMN-2 TO TR
        createTr.appendChild(createTd3);

        // TR TO BODY
        tbody.appendChild(createTr);
    } else { // EDIT BLOCK

        // SET VALUE
        let _tableTr = document.querySelectorAll("#tableBody tr");
        _tableTr[editIndex].cells[0].innerHTML = userName;

        editIndex = null;
    }

    // RESET VALUE
    document.getElementById("userName").value = "";
}



function onEditClickEvent() {
    // GET INDEX OF CURRENT ROW
    let rowIndex = this.getAttribute("data-index");
    editIndex = rowIndex;

    // GET VALUE
    let _tableTr = document.querySelectorAll("#tableBody tr");
    let nameCell = _tableTr[rowIndex].cells[0];

    // SET VALUE TO INPUT
    document.getElementById("userName").value = nameCell.innerHTML;

}

function onDeleteClickEvent() {
    // GET INDEX OF CURRENT ROW
    let rowIndex = this.getAttribute("data-index");

    // REMOVE ROW
    let _tableTr = document.querySelectorAll("#tableBody tr");
    _tableTr[rowIndex].remove();

    // RESET INDEX
    for (let i = 0; i < _tableTr.length; i++) {
        const row = _tableTr[i];
        row.cells[1].getElementsByTagName("button")[0].setAttribute("data-index", i); // EDIT
        row.cells[2].getElementsByTagName("button")[0].setAttribute("data-index", i); // DELETE
    }
}