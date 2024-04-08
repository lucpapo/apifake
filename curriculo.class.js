class Curriculo {
    
    request = new XMLHttpRequest();
    requestURL = "";
    constructor( id ) {
        this.requestURL = `http://localhost:3000/curriculos/${id}`;
        console.log(  this.requestURL)
    }

    getItemProjeto(projeto){
        return `<li>${projeto.descritivo}</li>`
    }

    builderProjetos(projetos){
        projetos.forEach((projeto)=>{
            $("#projetos").append(this.getItemProjeto(projeto));
        })
    }
    getItemInteresse(interesse){
        return`<li>${interesse.nome}</li>`
    }

    builderInteresses(interesses){
        interesses.forEach((interesse)=>{
            $("#interesses").append(this.getItemInteresse(interesse));
        })
    }
    getItemIdioma(idioma){
        return `<li>${idioma.nome} (${idioma.nivel})</li>`;
    }

    builderIdioma(idiomas){
        idiomas.forEach((idioma) => {
            $("#idiomas").append(this.getItemIdioma(idioma));
        })

    }

    getItemSocial(rede){
        return `<li>
                    <img href= "${rede.url}" class="iconeRede" alt="Ícone do ${rede.nome}" src="${rede.iconeUrl}"/>
                    <a class="linkRedes" href="${rede.url}">${rede.nome} (${rede.url})</a>
                </li>`
    }

    builderSocial(redes){
        redes.forEach((rede) => {
            $("#redes").append(this.getItemSocial(rede))
        })
    }

    builderProfile(urlProfile){
        if (urlProfile !== undefined){
            $("#foto").attr("src",urlProfile);
        } else{
            $("#foto").attr("src","https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png");
        }
    }

    getItemBio(bio){
        return `<p>${bio}</p>`;
    }
     
    builderBio(bio){
        $("#bio").append(this.getItemBio(bio))
    }

    getItemEscolaridade( escolaItem ) {
        return `<article>
                    <h3>${escolaItem.entidade}</h3>
                    <p><strong>Curso:</strong> ${escolaItem.curso}<p>
                    <p><strong>Período:</strong> ${escolaItem.periodo} <p>
                    <p><strong>Atividades:</strong> ${escolaItem.atividades}<p>
                    </article>`;

    }

    builderEscolaridade( dadosEscolaridade ) {
        dadosEscolaridade.forEach((element) => {
            var artigo = this.getItemEscolaridade(element);
            $("#educacao").append($(artigo));
        });
    }

    getItemExperiencia( experienciaItem ) {
        return `<article>
                        <h3>${experienciaItem.empresa}</h3>
                        <p><strong>Cargo: </strong> ${experienciaItem.cargo}</p>
                        <p><strong>Período: </strong> ${experienciaItem.periodo}</p>
                        <p><strong>Responsabilidades: </strong> ${experienciaItem.atividades}<p>
                    </article>`;

    }

    builderExperiencia( dadosExperiencia ) {
        dadosExperiencia.forEach((element) => {
            var artigo = this.getItemExperiencia(element);
            $("#experiencia").append($(artigo));
        });
    }

    getItemHabilidade( item ) {
        return "<li>"+item.titulo+"</li>";

    }

    builderHabilidade( dadosHabilidade ) {
        dadosHabilidade.forEach((element) => {
            var artigo = this.getItemHabilidade(element);
            $("#habilidades").append($(artigo));
        });
    }

    builderDadosCurriculo( dados ) {
       $("#nome").text(dados.nome);
       $("#telefone").text(`Telefone: ${dados.telefone}`);
       var textEmail = `Email: <a href="mailto:${dados.email}">${dados.email}</a>`;
       $("#email").html(textEmail);
    }


    getDados() {
        this.request.open("GET", this.requestURL);
        this.request.send();
    }

    builderRequest() {
        this.request.responseType = "json";
        var that = this;
        this.request.onload = function () {
            that.dados = this.response;
            console.log( that.dados );
            that.builderProfile(that.dados.urlProfile)
            that.builderBio(that.dados.bio);
            that.builderEscolaridade(that.dados.escolaridade);
            that.builderExperiencia(that.dados.experiencia);
            that.builderHabilidade(that.dados.habilidades);
            that.builderDadosCurriculo(that.dados);
            that.builderSocial(that.dados.redeSocial);
            that.builderIdioma(that.dados.idiomas);
            that.builderInteresses(that.dados.interesses);
            that.builderProjetos(that.dados.projetos);
        }
    }

}
