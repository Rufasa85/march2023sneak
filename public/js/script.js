const sneakForm = document.querySelector("#newSneak")

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

sneakForm.addEventListener("submit",e=>{
    e.preventDefault();
    const newShoe = {
        name:document.querySelector("#sneakName").value,
        color:document.querySelector("#sneakColor").value,
        owner:document.querySelector("#sneakOwner").value
    }
    console.log(newShoe)
    fetch("/api/sneakers",{
        method:"POST",
        body:JSON.stringify(newShoe),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.reload()
        } else {
            alert("womp womp. something went wrong!")
        }
    })
})