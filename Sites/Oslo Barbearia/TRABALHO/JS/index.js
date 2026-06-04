let botao = document.getElementById("btnEntrar")

botao.addEventListener("click", entrar)

function entrar(){

    // pega o valor do input
    let nomeUsuario = document.getElementById("nome").value
    let telefoneUsuario = document.getElementById("telefone").value

    if(nomeUsuario =="" && telefoneUsuario ==""){
        alert ("Preencha os campos antes ! ")

        } else if (nomeUsuario ==""){
            alert ("Digite seu Nome !") 
        
            } else if (telefoneUsuario ==""){
                alert ("Digite seu Telefone ")
                
                } else {
                    // salva no navegador
                        localStorage.setItem("nome", nomeUsuario)
                        localStorage.setItem("telefone", telefoneUsuario)

                        // muda de página
                        window.location.href = "pagina2.html";
                        }
}

