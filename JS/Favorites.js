import { GitHubUser } from "./gitHubUser.js";
//classe que vai conter a lógica dos dados 
// como os serão estruturados
export class Favorites{
    constructor(root){
        this.root = document.querySelector(root)
        this.load()

       GitHubUser.sercth("igorMHJKS").then(user => console.log(user))
    }

    load(){
     const entries = localStorage.getItem("@git-favorites:")
     console.log(entries)
     this.entries = []
    }
    save(){
        localStorage.setItem("@git-favorites:", JSON.stringify(this.entries))
    }

   async add(username){

    const userExists = this.entries.find(entry => entry.login === username)
    
    if(userExists){
        throw new Error("Usúario já cadastrado")
    }

    if(userExists) {
        throw new Error("Usúario ja cadastrado")
    }
       try{
        const user =  await GitHubUser.sercth(username)

        if(user.login === undefined){
            throw new Error("Usúario não encontrado!")
           }
    
           this.entries = [user, ...this.entries]
           this.update()
           this.save()
        }
        catch(error){
            alert(error.message)
        }
    } 
        

       
    //Está deletando usúario
    delete(user){
        const filterredEntries = this.entries.filter(entry =>  entry.login !== user.login)
           this.entries = filterredEntries
           this.update()
           this.save()
        }
    }
 

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites{
    constructor(root){
        super(root)


      this.tbody = this.root.querySelector("table tbody")
        
        this.update()
        this.onadd()
    }

    onadd(){
        const addButon = this.root.querySelector(".search button")
        addButon.onclick = () => {
            const {value} = this.root.querySelector(".search input")

            this.add(value)
        }
    }
    update(){
        this.removeAllTr()

     this.entries.forEach(user => {
        const row = this.createRow()

        row.querySelector('.user img').src = `https://github.com/${user.login}.png`

        row.querySelector('.user img').alt = `Imagem de ${user.name}`
        row.querySelector('.user p').textContent = user.name
        row.querySelector('.user a').href = `https://github.com/${user.login}`

        row.querySelector('.user span').textContent = user.login
        row.querySelector('.repositories').textContent = user.public_repos
        row.querySelector('.seguidores').textContent = user.followers
        
        //Evento de click no x red para deletar usuario
        row.querySelector('.remove').onclick = () => {
           const insOk =  confirm("Tem certeza que deseja deletar essa linha?")

            if(insOk){

                this.delete(user)
            }
        }
        //-------------------------------------------------//
     this.tbody.append(row)

     })

     
    }

    //Criando tr
    createRow (){
        const tr = document.createElement("tr")
        tr.innerHTML =`
        <tr>
        <td class="user">
            <img src="https://avatars.githubusercontent.com/u/103233352?v=4" alt="Imagem de Igor">
            <a href="https://github.com/igorMHJKS" target="_blank"></a>  
            <p>Igor Nunes</p>
            <span>igor.xkz</span>
        </td>
        <td class="repositories">19</td>
        <td class="seguidores">2</td>
        <td><button class="remove">&times;</button></td>
    </tr>
                `
                return tr
    }
    //vai remover todas as linhas do tbody
    removeAllTr(){
        
        this.tbody.querySelectorAll("tr")
        .forEach((tr) => {
        tr.remove()
        })
    }
}

