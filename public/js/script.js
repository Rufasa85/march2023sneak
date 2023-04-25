fetch("/api/sneakers").then(res=>{
    return res.json();
}).then(data=>{
    console.log(data)
    data.forEach(shoe=>{
        const newLi = document.createElement("li");
        newLi.textContent = `${shoe.owner}'s ${shoe.color} ${shoe.name}`
        document.querySelector("#sneakList").append(newLi)
    })
})