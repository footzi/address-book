$("#get").on("click", () => {
        $("input").val(""); //очистка полей ввода
        $.ajax({
            type: "POST",
            url: "/test",
            success: data => {
                node(data);
            }
        })
    });

$("#send").on("click", () => {
    let sendObj = {};
    sendObj.firstname = document.getElementById("in-firstname").value;
    sendObj.secondname = document.getElementById("in-secondname").value;
    sendObj.age = document.getElementById("in-age").value;
    $("input").val(""); //очистка полей ввода
    if ((sendObj.firstname == "") && (sendObj.secondname == "") && (sendObj.age == "")) {
        alert("Введите данные!")
    } else {
        $.ajax({
            type: "POST",
            url: "/send",
            data: JSON.stringify(sendObj)
        });

        $.ajax({
            type: "POST",
            url: "/test",
            success: data => {
                node(data);
            }
        })
    }
})

const node = (data) => {
    $("table").empty();
    let arr = data;
    for (let i = 0; i < arr.length; i++) {
        //создание строк

        let tr = document.createElement("tr");
        document.querySelector("table").appendChild(tr);
        tr.id = "line-" + i;
        //создание кнопок

        let btn = document.createElement("button");
        btn.innerHTML = "delete";
        btn.setAttribute("del", i);

        document.getElementById("line-" + i).appendChild(btn);

        for (let prop in arr[i]) {

            //создание ячеек
            let td = document.createElement("td");
            td.innerHTML = arr[i][prop];
            document.getElementById("line-" + i).appendChild(td);

        }
    };

    $("table").on("click", "button", function() {
        let btnId = this.getAttribute("del");
        for (let i = 0; i < arr.length; i++) {
            if (btnId == i) {
                arr.splice(i, 1);
            }
        }

        $.ajax({
            type: "POST",
            url: "/test",
            data: JSON.stringify(arr),
        });

        $.ajax({
            type: "POST",
            url: "/test",
            success: data => {
                node(data);
            }
        })
    })
}
