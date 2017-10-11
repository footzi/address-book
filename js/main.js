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
    sendObj.firstname = document.getElementById("firstname").value;
    sendObj.secondname = document.getElementById("secondname").value;
    sendObj.city = document.getElementById("city").value;
    sendObj.address = document.getElementById("address").value;
    sendObj.email = document.getElementById("email").value;
    sendObj.phone = document.getElementById("phone").value;
    console.log(sendObj)
    $("input").val(""); //очистка полей ввода
    if ((sendObj.firstname == "") && (sendObj.secondname == "") && (sendObj.city == "") && (sendObj.address == "") && (sendObj.email == "") && (sendObj.phone == "")) {
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
    $("tbody").empty();
    let arr = data;
    for (let i = 0; i < arr.length; i++) {
        //создание строк

        let tr = document.createElement("tr");
        document.querySelector("tbody").appendChild(tr);
        tr.id = "line-" + i;


        for (let prop in arr[i]) {

            //создание ячеек
            let td = document.createElement("td");
            td.innerHTML = arr[i][prop];
            document.getElementById("line-" + i).appendChild(td);

        }
        //создание кнопок

        let btn = document.createElement("button");
        let td = document.createElement("td");

        btn.innerHTML = "Удалить";
        btn.setAttribute("del", i);
        btn.className = "btn btn-danger btn-sm";

        document.getElementById("line-" + i).appendChild(td);
        document.querySelector("#line-" + i).querySelector("td:last-child").appendChild(btn);


        //$("#line-" + i).append(btn);
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