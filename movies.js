const btn = document.getElementById("btn");
const container  = document.getElementById("container")

async function getData(){
    const datas = await fetch("http://localhost:3000/movies");
    const responseData = await datas.json();
    console.log(responseData);
    for(i=0;i<responseData.length;i++){
        const card = document.createElement("div");
        card.className = "card";

        const movieId = document.createElement("h6");
        movieId.className= "id";
        movieId.innerHTML = "Id: " + responseData[i].id
        card.appendChild(movieId);

        const title = document.createElement("h1");
        title.className= "title";
        title.innerHTML = responseData[i].movieTitle
        card.appendChild(title);

        const year = document.createElement("h3");
        year.className = "year";
        year.innerHTML = "Year: " + responseData[i].year;
        card.appendChild(year);

        const rate = document.createElement("p");
        rate.className = "rate";
        rate.innerHTML ="Ratings: "+ responseData[i].ratings
        card.appendChild(rate);

        const gene = document.createElement("h2");
        gene.className = "genre";
        gene.innerHTML = "Genre: "+responseData[i].genre
        card.appendChild(gene);

        const updateButton = document.createElement("button");
        updateButton.className = "update";
        updateButton.innerHTML = "Update Movie";
        card.appendChild(updateButton);

        updateButton.addEventListener("click", ()=>{
            updateData();
        })

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.innerHTML = "Delete Movie";
        card.appendChild(deleteButton);

        deleteButton.addEventListener("click", ()=>{
            deleteData();
        })


        container.appendChild(card);
    }

}

async function postData(){
    const id = document.getElementById("id").value;
    const movieTitle = document.getElementById("movieTitle").value;
    const ratings = document.getElementById("ratings").value;
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;

    const movieData = {
        id: id,
        movieTitle:movieTitle,
        ratings:ratings,
        year:year,
        genre:genre
    }
    try{
        const response = await fetch("http://localhost:3000/movies",{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });
        if(response.ok){
            alert("Movie posted successfully");
        }else{
            alert("Some error has occured", response.status);
        }
    }catch(error){
        console.error("Error saving data", error);

    }

}




async function updateData(){
    const id = document.getElementById("id").value;
    const movieTitle = document.getElementById("movieTitle").value;
    const ratings = document.getElementById("ratings").value;
    const year = document.getElementById("year").value;
    const genre = document.getElementById("genre").value;

    const movieData = {
        movieTitle:movieTitle,
        ratings:ratings,
        year:year,
        genre:genre
    }

    try{
        const response = await fetch(`http://localhost:3000/movies/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieData)
        });
        if(response.ok){
            alert("Movie updated successfully");
        }else{
            alert("Some error has occured", response.status);
        }
    }catch(error){
        console.error("Error saving data", error);

    }
}

async function deleteData(){
    const id = document.getElementById("id").value;
    try{
        const response = await fetch(`http://localhost:3000/movies/${id}`,{
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        });
        if(response.ok){
            alert("Movie deleted successfully");
        }else{
            alert("Some error has occured", response.status);
        }
    }catch(error){
        console.error("Error saving data", error);

    }

}


getData()

btn.addEventListener("click", ()=>{
    postData();
})

