//classe que vai conter a lógica dos dados 
// como os serão estruturados
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()
    }

    load(){
     this.entries = [
            {
                login:"Igor Nunes",
                name: "igor.kzx",
                public_repos: 19,
                followers: 2
            },
            {
                login:"Gustavo",
                name: "gustagui",
                public_repos: 29,
                followers: 20
            }
         ]
    }
 }

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)

        this.tbody = this.root.querySelector("table tbody")
        this.update()
    }

    update(){
        this.removeAllTr()

     this.entries.forEach(user => {
        const row = this.createRow()
        row.querySelector(".user img").src = `https://avatars.githubusercontent.com${user.login}.png`
        row.querySelector(".user img").alt = `imagem de ${user.name}`

        row.querySelector(".user p ").textContent = user.name
        row.querySelector(".user span ").textContent = user.login
        row.querySelector(".repositories ").textContent = user.public_repos
        row.querySelector(".followers ").textContent = user.followers


     this.tbody.append(row)

     })

     
    }

    //Criando tr
    createRow (){
        const tr = document.createElement("tr")
        tr.innerHTML =`

              <td class="user">
              <img src="https://avatars.githubusercontent.com/u/103233352?v=4" alt="Imagem de Igor"
              <a href="https://github.com/igorMHJKS" target="_blank"></a>  
              <p>Igor Nunes</p>
              <span>igor.xkz</span></td>
              <td class="repositories">19</td>
              <td class="seguidores">2</td>
              <td><button class="remove">&times;</button></td> 
                `
                return tr
    }
    //vai remover todas as linhas do tbody
    removeAllTr(){
        this.tbody = this.root.querySelector("table tbody")
        
        tbody.querySelectorAll("tr")
        .forEach((tr) => {
        tr.remove()
        })
    }
}

